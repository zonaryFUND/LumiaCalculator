# damage コンポーネント群 実装プラン

作成日: 2026-08-29（`workaround/zustand`ブランチ）。実装に着手する前に、このドキュメントに記載した
「複雑度：高」の工程については別途詳細設計を行うこと。

## このコンポーネント群の役割

ビルド・ステータスから計算される、基本攻撃・実験体スキル・武器スキル・アイテムスキル・特性・戦術スキルによる
ダメージ/回復などの効果量を算出し、表として表示する。

- シンプルモード・対戦モードともに、メインテーブルに「発生源のラベル + 効果量」のセルをカテゴリ（基本攻撃・
  実験体スキル・武器スキル・アイテムスキル・特性・戦術スキル）ごとにまとめて並べる。
- 効果量セルのうち非自明なもの（計算式が単純な固定値でないもの）はクリックでexpandし、詳細な計算式サブセルが
  並ぶ子テーブル（`InnerTable`）を表示する。
- 詳細計算式の内容はモードによって異なる：
  - シンプルモード: レシオ（`ValueRatio`）からの計算過程をそのまま示す。
  - 対戦モード: 仮想敵の防御力による軽減計算の過程を示す（`Mitigation`コンテキスト経由）。

上記はコードを実際に読んで確認した内容であり、ユーザーの説明と一致している。

## 現状の実装配置（3層構造）

`features/README.md`に記載した通り、damageは移行の実態として3層が併存している。

1. **旧実装（`components/damage/**`）** — props経由（config/status/hpのバケツリレー）。
   - `simple/subtables/{basic-attack,subject-skill,subtable}.tsx` — Simple modeで**現在実際に使われている**
     tbody単位のコンポーネント。ただし内部では新しい行コンポーネント（後述の3.）をimportして使っている。
   - `combat/**` 一式 — Combat modeの実装はすべてここにあり、新しい行コンポーネントへの移行が一切行われていない。
   - `damage-table-util.ts`・`use-{augment,item-skills,tactical-skill,weapon-skills}.ts` — config/statusを引数に
     取る純粋な計算hookで、Simple/Combat両方から共通で呼ばれている。この層はStore有無に依存しないため
     移行対象外でよい。
2. **中間実装（`features/damage/components/damage-table.tsx`）** — Simple mode用のエントリポイント。
   これ自体は`useSubjectStateStore`からconfig/status/hpRatioを取得するが、配下の実描画は1.の旧配置コンポーネントに
   丸ごと委譲している。
3. **新実装（`features/damage/features/*` + `features/damage/components/*`）** — `critical-available.tsx`・
   `standard-damage.tsx`・`unique-expression.tsx`など、行・サブ行コンポーネントは`useSubjectStateStore`を直接
   呼ぶ形に移行済み。1.の旧配置コンポーネントから呼び出されている。

## 発見した問題点

### A. Combat mode有効化に関する問題（最も複雑度が高い）

1. **Combat modeのダメージ表示は`pages/combat/index.tsx`で丸ごとコメントアウトされ、無効化されている。**
2. **Combat modeのconfig取得ソースが二重化している。** `pages/combat/index.tsx`は
   - `<Subject>`（実験体設定・スキル・ステータス表示）には`CombatModeSubjectConfigProvider`
     （Zustand、`features/subject-config/store`）を使う
   - 一方で無効化中の`<Damage>`向けには、同じ`index.tsx`内で今も`useSubjectConfigState(CombatCurrentLeftConfigKey)`
     という**旧`useLocalStorage`ベースのフック**を呼び、`left`/`right`を別途保持している

   両者は同じlocalStorageキーを別々の購読機構で読み書きしており、統合されていない。Combat modeのダメージ移植を
   進めると、この二重状態をどちらかに一本化する必要が生じる。
3. **構造上の制約:** `pages/combat/index.tsx`で`<Damage>`は、左右2つの`<CombatModeSubjectConfigProvider>`の
   **外側（兄弟要素）**に配置されている。既存の`useSubjectStateStore`は単一のReact Context
   （`SubjectConfigStoreContext`）から1つのstoreを取得する設計であるため、そのままでは`<Damage>`から
   左右両方のstoreに同時アクセスできない。Combat modeのダメージ移植に着手する前に、「1つのコンポーネントが
   左右両方のconfig/statusを同時に参照する」ための設計変更が必要（下記タスク一覧のPhase 2参照）。
4. `MitigationContext`・`CombatHPContext`（`components/damage/combat/{mitigation-context,combat-hp-context}.ts`）
   はReact Context経由でprops的に配布されており、Zustand storeとは無関係。Combat modeの軽減計算・体力比計算は
   引き続きこの2つのContextの責務でよいが、配置場所の移動と、Store統合後のProvider設置位置の見直しが必要。

### B. Simple modeの移植未完了・後片付け不足

1. **`features/damage/features/simple/basic-attack.tsx`は孤立した未完成ファイル。**
   どこからもimportされていない（リポジトリ全体をgrepして確認済み）。`export default`が存在せず、
   内部に到達不能コード（`return <CriticalAvailable .../>`の直後に到達しない`return {...}`が残っている）があり、
   計算した`unitsChunks`変数を使わず親から受け取った`props.unitsChunks`をそのまま`SubTable`に渡している
   （`SubTable`の型は`React.ReactElement[][]`を要求するため型としても不整合）。
   `components/damage/simple/subtables/basic-attack.tsx`（旧配置・実際に使われている方）を
   `features/damage`配下へ移す作業を先に試みて、途中で放棄されたものと推測される。
2. 実際にSimple modeで使われている`components/damage/simple/subtables/{basic-attack,subject-skill,subtable}.tsx`
   は、新しい行コンポーネントをimportして使っているにも関わらず、自身は旧ディレクトリ`components/damage/`に
   置かれたまま。`config`/`status`/`hp`をpropsで受け取っているが、実際に使っているのは`config`
   （`useBasicAttackRatio`用）のみで、`status`・`hp`は未使用（子コンポーネントが自分でStoreから取得するため）。
3. `features/damage/components/damage-table.tsx`（Simple modeのエントリ）はStoreから取得した`config`/`status`/
   `hpRatio`を、上記2.の関数にpropsとして再度渡しており、実質的に不要な受け渡しが残っている。

### C. 命名規則の不統一

`features/damage`だけ、他feature（subject-config・subject-skills）の`containers/`に相当する層が
`features/`と命名されている（`features/damage/features/potency-rows`等）。
`component-guidelines.md`が定める命名規則（`containers/`+`components/`）と一致しない。

### D. Combat mode側の実装バグ（無効化されているため未発覚。修正自体は低リスク）

1. `components/damage/combat/subtables/subrows/damage-dependent-heal.tsx`が、兄弟コンポーネント
   （`potency.tsx`・`heal-power.tsx`・`mitigation.tsx`）と異なり、`<tr>`でラップされない裸の`<td>`を返す。
   呼び出し先の`InnerTable`は子をそのまま`<tbody>`直下に配置する実装のため、これは不正なマークアップになる
   （現状Combat modeが無効なため実害なし。有効化すれば確実に表示崩れとして顕在化する）。
2. 同ファイル: `import React, * as Raect from "react";` — importのタイポ（`React`本体は正しく別途importされて
   おり実害はないが、`Raect`という未使用の名前空間importが残っている）。
3. `rows/standard-damage.tsx`: `{ static: props.value, dynamic: undefined　}`の末尾に全角スペースが混入
   （実害なし、コードスタイルの些細な問題）。
4. `rows/misc.tsx`が空ファイル。`type.type == "misc"`の特別扱いは`standard-damage.tsx`内に直接ハードコード
   されており、対応する専用コンポーネントは未実装のまま放置されている。

## タスク一覧

### Phase 0 — 後片付け（複雑度: 低）

- [ ] `features/damage/features/simple/basic-attack.tsx`（孤立ファイル）を削除するか、意図を確認した上で
      Phase 1の一部として完成させるかを決める。
- [ ] Combat mode側の軽微なバグを修正する（`damage-dependent-heal.tsx`の`<tr>`欠落・importタイポ、
      `standard-damage.tsx`の全角スペース）。現状無効化されているため今直しても表示への影響はなく、
      Phase 3着手時の障害を減らせる。
- [ ] `rows/misc.tsx`（空ファイル）を削除するか、`misc`タイプ専用コンポーネントとして実装するかを決める。

### Phase 1 — Simple mode完全移行（複雑度: 低〜中）

- [ ] `components/damage/simple/subtables/{basic-attack,subject-skill,subtable}.tsx`を
      `features/damage`配下（Phase 4の命名規則と整合する場所）へ移動する。
- [ ] 上記コンポーネントの`status`・`hp`props（未使用）を削除する。`config`のみで足りるか、
      あるいは`config`もStoreから直接取得する形にできるか確認する。
- [ ] `features/damage/components/damage-table.tsx`から、不要になったprops受け渡しを整理する。
- [ ] 移行完了後、`components/damage/simple/`ディレクトリを空にする。

### Phase 2 — Combat mode有効化のための土台設計（複雑度: 高。着手前に別途設計方針をすり合わせること）

左右2つのconfig/statusに1つのコンポーネントから同時アクセスするための設計変更が必要。案（優劣は要検討）:

- (a) `CombatModeSubjectConfigProvider`が生成するstoreインスタンスを`pages/combat/index.tsx`側で保持し、
      `<Damage leftStore={...} rightStore={...} />`のようにprops経由で両方渡す。
- (b) 左右のstoreをまとめて保持する上位Contextを新設し、`useSubjectStateStore`に
      「どちらのstoreを見るか（left/right）」を指定できる引数を追加する。
- (c) 対戦モードの左右を1つのstoreにまとめ、`config: {left, right}`のような構造に変更する
      （既存コードへの影響範囲が大きいため非推奨）。

いずれかの方針を決定した上で、`pages/combat/index.tsx`に残る旧`useSubjectConfigState`ベースの二重状態
（`left`/`right`）を廃止し、Zustand storeへ一本化する。

### Phase 3 — Combat modeダメージ本体の移植（複雑度: 高。Phase 2完了後に着手）

- [ ] `components/damage/combat/**`を`features/damage`配下へ移植する。
- [ ] `mitigation-context.ts`・`combat-hp-context.ts`は引き続きReact Contextでよいが、配置場所を
      `features/damage`配下に移し、Phase 2で決めたStore構成に合わせてProviderの設置位置を見直す。
- [ ] Combat mode用の行コンポーネント（`rows/standard-damage.tsx`・`rows/critical-available.tsx`）と、
      Simple mode側で既にZustand化済みの行コンポーネント（`features/damage/features/potency-rows/*`）を
      統合できないか検討する。両者の差分は基本的に「軽減計算をはさむかどうか」のみであり、共通化できれば
      Simple/Combatで二重管理されている行コンポーネントを1つに集約できる。
- [ ] Phase 0で修正したバグを踏まえて移植する。
- [ ] `pages/combat/damage.tsx`・`pages/combat/index.tsx`のコメントアウトを解除する。

### Phase 4 — 命名規則の統一（複雑度: 低。他Phase完了後にまとめて実施）

- [ ] `features/damage/features/*` → `features/damage/containers/*`へリネームする
      （Phase 1・3の移植先をこの命名に合わせて決めておくと二度手間にならない）。
- [ ] `features/README.md`のdamageセクションを更新する。

## 推奨する着手順序

Phase 0 → Phase 1 → （Phase 2の設計方針をユーザーとすり合わせ）→ Phase 2 → Phase 3 → Phase 4

## 実装前に確認が必要な事項

- Phase 2の設計方針（案a/b/c、またはそれ以外）
- `features/damage/features/simple/basic-attack.tsx`（孤立ファイル）を存続させる意図の有無
- Simple/Combatの行コンポーネントをどこまで統合するか（Phase 3、完全共通化 or 独立のまま）
- `rows/misc.tsx`を専用実装するか削除するか

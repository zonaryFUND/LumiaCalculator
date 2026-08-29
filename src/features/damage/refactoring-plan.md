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

## 現状の実装配置

**2026-08-29時点でSimple modeの移行は完了した（Phase 0・Phase 1）。** 以下は現状の配置。

- **Simple mode（完了）** — すべて`features/damage`配下。エントリポイントは
  `features/damage/features/simple/damage-table.tsx`。カテゴリごとのコンテナ
  （`features/simple/{basic-attack,subject-skill,generic-subtable}.tsx`）が生データを行コンポーネント
  （`features/potency-rows/*`）へ変換し、共通View（`components/simple/subtable.tsx`）へ渡す構成。
- **Combat mode（未着手）** — `components/damage/combat/**`一式が旧実装のまま残っている。props経由
  （config/status/hpのバケツリレー）で、Zustand・新しい行コンポーネントへの移行が一切行われていない。
  詳細は下記「A. Combat mode有効化に関する問題」を参照。
- **共通計算層** — `features/damage/damage-table-util.ts`・`use-{augment,item-skills,tactical-skill,
  weapon-skills,basic-attack-ratio}.ts`。config/statusを引数に取る純粋な計算hookで、Simple/Combat両方から
  共通で呼ばれる想定のため、Storeに依存しないこの形のまま`features/damage`直下に集約した
  （Simple mode専用の`features/simple/`配下には置いていない。Combat mode移植時にそのまま再利用するため）。

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

### B. Simple modeの移植未完了・後片付け不足（2026-08-29 対応済み）

以下はPhase 0・Phase 1着手前の状態の記録。対応内容はPhase 0・Phase 1のタスク一覧のチェック済み項目を参照。

1. **`features/damage/features/simple/basic-attack.tsx`は孤立した未完成ファイル。**
   どこからもimportされていない（リポジトリ全体をgrepして確認済み）。`export default`が存在せず、
   内部に到達不能コード（`return <CriticalAvailable .../>`の直後に到達しない`return {...}`が残っている）があり、
   計算した`unitsChunks`変数を使わず親から受け取った`props.unitsChunks`をそのまま`SubTable`に渡している
   （`SubTable`の型は`React.ReactElement[][]`を要求するため型としても不整合）。
   `components/damage/simple/subtables/basic-attack.tsx`（旧配置・実際に使われている方）を
   `features/damage`配下へ移す作業を先に試みて、途中で放棄されたものと推測される。
   → このファイルを完成させ、`damage-table.tsx`から実際に呼ばれる状態にした。
2. 実際にSimple modeで使われている`components/damage/simple/subtables/{basic-attack,subject-skill,subtable}.tsx`
   は、新しい行コンポーネントをimportして使っているにも関わらず、自身は旧ディレクトリ`components/damage/`に
   置かれたまま。`config`/`status`/`hp`をpropsで受け取っているが、実際に使っているのは`config`
   （`useBasicAttackRatio`用）のみで、`status`・`hp`は未使用（子コンポーネントが自分でStoreから取得するため）。
   → `features/damage/features/simple/{basic-attack,subject-skill,generic-subtable}.tsx`へ移植し、
   未使用propsを廃止した。
3. `features/damage/components/damage-table.tsx`（Simple modeのエントリ）はStoreから取得した`config`/`status`/
   `hpRatio`を、上記2.の関数にpropsとして再度渡しており、実質的に不要な受け渡しが残っている。
   → `features/damage/features/simple/damage-table.tsx`へ移動し、不要な受け渡しを削除した
   （`hpRatio`はどこからも使われていなかったため完全に削除）。

### C. 命名規則の不統一

`features/damage`だけ、他feature（subject-config・subject-skills）の`containers/`に相当する層が
`features/`と命名されている（`features/damage/features/potency-rows`等）。
`component-guidelines.md`が定める命名規則（`containers/`+`components/`）と一致しない。

### D. Combat mode側の実装バグ（無効化されているため未発覚。修正自体は低リスク）（2026-08-29 対応済み）

1. `components/damage/combat/subtables/subrows/damage-dependent-heal.tsx`が、兄弟コンポーネント
   （`potency.tsx`・`heal-power.tsx`・`mitigation.tsx`）と異なり、`<tr>`でラップされない裸の`<td>`を返す。
   呼び出し先の`InnerTable`は子をそのまま`<tbody>`直下に配置する実装のため、これは不正なマークアップになる
   （現状Combat modeが無効なため実害なし。有効化すれば確実に表示崩れとして顕在化する）。
   → `<tr>`でラップした（1セルで2列ぶんを占める体裁は維持するため`colSpan={2}`を付与）。
2. 同ファイル: `import React, * as Raect from "react";` — importのタイポ（`React`本体は正しく別途importされて
   おり実害はないが、`Raect`という未使用の名前空間importが残っている）。→ 修正した。
3. `rows/standard-damage.tsx`: `{ static: props.value, dynamic: undefined　}`の末尾に全角スペースが混入
   （実害なし、コードスタイルの些細な問題）。→ 修正した。
4. `rows/misc.tsx`が空ファイル。`type.type == "misc"`の特別扱いは`standard-damage.tsx`内に直接ハードコード
   されており、対応する専用コンポーネントは未実装のまま放置されている。→ ファイル自体を削除した
   （`misc`タイプの特別扱いは引き続き`standard-damage.tsx`内のハードコードのまま）。

## タスク一覧

### Phase 0 — 後片付け（複雑度: 低）

- [x] `features/damage/features/simple/basic-attack.tsx`（孤立ファイル）を完成させ、実際に呼ばれる状態にした
      （2026-08-29）。到達不能コード・`export default`漏れ・`props.unitsChunks`未使用のバグを修正し、
      `"standard"`/`"disable-critical"`マーカー処理・`damageDependentHeal`フィルタなど旧実装の挙動を移植した。
- [x] Combat mode側の軽微なバグを修正した（2026-08-29）。`damage-dependent-heal.tsx`は`<tr>`で
      ラップし（`colSpan={2}`で2列ぶんを1セルにまとめる形は維持）、importタイポ
      （`React, * as Raect`）も修正。`standard-damage.tsx`の全角スペース混入も修正。
- [x] `rows/misc.tsx`（空ファイル）を削除した（2026-08-29）。`misc`タイプの特別扱いは引き続き
      `standard-damage.tsx`内のハードコードのまま（専用コンポーネント化はしていない）。

### Phase 1 — Simple mode完全移行（複雑度: 低〜中）（2026-08-29 完了）

- [x] `components/damage/simple/subtables/{basic-attack,subject-skill,subtable}.tsx`を
      `features/damage/features/simple/{basic-attack,subject-skill,generic-subtable}.tsx`へ移動した。
      `subtable.tsx`（武器スキル/アイテムスキル/特性/戦術スキルの4箇所で共通利用）は`generic-subtable.tsx`という
      名前にした（`subject-skill`用の分岐は持たない、より単純な共通コンテナのため）。
      共通View（`components/simple/subtable.tsx`）は`label`/`labelColSpan`/`valueHeaders`（各セルに
      `colSpan`指定可）を受け取る形に一般化し、基本攻撃の「標準値/致命打/期待値」3列ヘッダーと、
      実験体スキル等の「ダメージ / 効果量」統合ヘッダーの両方を、カテゴリ固有の分岐なしで表現できるようにした。
- [x] 上記コンポーネントの`status`・`hp`props（未使用）を削除した。`config`が必要な箇所（`basic-attack.tsx`の
      `useBasicAttackRatio`用）のみStoreから直接取得する形にし、他はpropsを一切取らないコンテナにした。
- [x] `features/damage/components/damage-table.tsx`を`features/damage/features/simple/damage-table.tsx`へ
      移動し、不要なprops受け渡しを整理した（`hpRatio`はどこからも参照されていなかったため完全に削除）。
- [x] 移行完了後、`components/damage/simple/`ディレクトリを削除した（空になったため）。
- [x] （追加対応）`damage-table-util.ts`・`use-{augment,item-skills,tactical-skill,weapon-skills}.ts`を
      `components/damage/`から`features/damage/`直下へ移動した。Combat modeでも共通利用する想定のため、
      Simple mode専用の`features/simple/`配下ではなく`features/damage`直下に置いている
      （Phase 3着手時にそのまま再利用できるように）。

### Phase 2 — Combat mode有効化のための土台設計（2026-08-29 方針確定・store側の対応は完了）

対戦モードのUIは次の構造を持つ（ユーザーによる整理）。

- 左右2カラムはそれぞれ実験体のConfig/Statusで、互いに影響を受けない。シンプルモードと本質的に同じ実装で
  よく、`useSubjectStateStore`をそのまま使える。
- 中央カラムは仮想敵を想定した効果量テーブルで、「左→右」「右→左」をトグルで切り替えるだけの**読み取り専用**
  カラム。セッターは不要で、`{from: {config, status, hp}, to: {config, status, hp}}`という素の値オブジェクトを
  渡せば十分（「発生源」「仮想敵」を`from`/`to`という向きの概念で表す。旧実装の`attacker`/`defender`に相当）。

このため、中央カラム（`features/damage`配下のCombat用コンポーネント群）はZustandを一切知る必要がなく、
propsだけで完結する。純粋にpropsだけで完結する設計にすることで、以前検討していた「storeを直接受け取る
フック」（`useSubjectStateStoreOf`案）は不要になった。

**必要な変更は「両方のstoreに同時アクセスできる場所を1箇所作ること」だけ**であり、これはページ
（`pages/combat/index.tsx`）がstoreを自分で生成して保持し、`<Subject>`用のProviderにも中央カラム用の
`{from,to}`組み立てにも同じstoreインスタンスを使う、という形で解決する。

この過程で`CombatModeSubjectConfigProvider`（`features/subject-config/store.tsx`）は不要と判明し削除した。
理由:
- `pages/combat/subject.tsx`の`side`propは列見出し（「左実験体」/「右実験体」）表示にしか使われておらず、
  子孫コンポーネントは自身がどちら側かを知る必要がない。
- `CombatModeSubjectConfigProvider`が担っていた`subjectSide`のstore格納は、実は`createSubjectConfigStore`の
  実装上どこにも代入されておらず**完全にデッドパラメータだった**（`SubjectStateStore`型にはフィールドが
  あるのに、生成時に設定するコードがなかった）。
- 唯一の読み取り箇所（`features/subject-skills/containers/skill.tsx`、ツールチップの左右判別用）も、
  `TooltipPresenter`自体が現在無効化されているため機能していなかった。加えて同じ目的のための別の仕組み
  （`ingame-params/subjects/subject-side.ts`の`SubjectSideContext`、`components/item/item.tsx`が参照）も
  `.Provider`がどこにも設置されておらず同様に機能していなかった。

対応（完了）:
- [x] `store.tsx`: `CombatModeSubjectConfigProvider`を削除し、汎用の`SubjectConfigStoreProvider({store, children})`
      を追加（呼び出し元が生成済みのstoreをContext経由で公開するだけ）。`SubjectStateStore`型・
      `createSubjectConfigStore`から`subjectSide`を完全に削除した（デッドコードのため復旧せず削除する方針で確定）。
- [x] `features/subject-skills/containers/skill.tsx`: `store.subjectSide`の参照を削除し、
      ツールチップへの`subjectSide`は常に`undefined`を渡す形にした（`TooltipPresenter`復旧時に別途設計）。
- [x] `pages/combat/index.tsx`: `leftStore`/`rightStore`をページ側で生成し、`SubjectConfigStoreProvider`
      経由で`<Subject>`に渡す形に変更（`CombatModeSubjectConfigProvider`の呼び出し箇所を置き換え）。

残作業（Phase 3で対応）:
- [ ] `pages/combat/index.tsx`に残る旧`useSubjectConfigState`ベースの二重状態（`left`/`right`、
      `TooltipPresenter`向けに残っている）を、上記`leftStore`/`rightStore`から`useStore`で直接読む形へ一本化する。
- [ ] `ltr`（方向）トグルと`{from,to}`の組み立てを`pages/combat/index.tsx`（または中央カラムのすぐ外側）に実装する。
- [ ] 中央カラムのダメージ計算コンポーネント群を`{from,to}`のみを受け取る形で`features/damage`配下に実装する。

### Phase 3 — Combat modeダメージ本体の移植（2026-08-29完了）

- [x] `pages/combat/index.tsx`に残っていた旧`useSubjectConfigState`ベースの二重状態を廃止し、
      `leftStore`/`rightStore`から`zustand`の`useStore`で直接読む形へ一本化した
      （`TooltipPresenter`向けのconfig/statusも同じ読み出しに統一）。マスタリー同期エフェクトも
      `rightStore.getState().setConfig(...)`を直接呼ぶ形に書き換えた。
- [x] `ltr`（方向）トグルと`from`/`to`（`{config,status,hp}`）の組み立てを実装した。トグル切替ボタン
      （`SegmentedControl`）自体が対戦モードの中央カラム（`features/damage/features/combat/damage-table.tsx`）
      の見た目の一部として描画されるため、トグル状態もその内部で保持する形にした（旧実装からの踏襲）。
      ページ側からは`left`/`right`という素の`{config,status,hp}`だけを渡し、「どちらを`from`にするか」の
      決定はダメージカラム自身の責務とした。
- [x] `components/damage/combat/**`を`features/damage/features/combat/**`へ、ディレクトリ構造を保ったまま
      移植した（内部の相対importはほぼ無変更で済んだ。外部参照だった`damage-table.module.styl`のパスのみ
      修正——後述）。`attacker`という呼称は`from`に統一した（`defender`は元々変数名としてのみ使われており、
      呼び出し側からは`to`として渡している）。
- [x] `mitigation-context.ts`・`combat-hp-context.ts`を`features/damage/features/combat/`直下へ移した
      （Reactの素のContextのままで変更なし）。
- [x] **移植中に発見した既存バグを修正した:** 旧`components/damage/combat/damage-table.tsx`の
      `import style from "../damage-table.module.styl"`は、実際には存在しないパス
      （`components/damage/damage-table.module.styl`）を指す壊れたimportだった。実際の実体は
      `features/damage/components/potency-rows/damage-table.module.styl`（Simple mode側と共有、
      `.switch`など対戦モード専用クラスも含めて最初から用意されていた）。TypeScriptの`*.module.styl`
      ワイルドカード型宣言はファイルの実在を検証しないため`tsc`では検出されず、かつ`<Damage>`自体が
      `pages/combat/index.tsx`でコメントアウトされ未使用インポートとしてRollupにツリーシェイクされていた
      ため、`yarn build`でも顕在化していなかった。今回`<Damage>`を有効化する過程で発見し、
      正しいパスに修正した。
- [x] `pages/combat/damage.tsx`・`pages/combat/index.tsx`のコメントアウトを解除した。
- [x] `yarn build`・`vitest run`で確認済み（既存872件のスナップショット失敗以外に regressionなし）。

**保留（今回は着手しなかった）:** Combat mode用の行コンポーネント（`rows/standard-damage.tsx`・
`rows/critical-available.tsx`）と、Simple mode側で既にZustand化済みの行コンポーネント
（`features/damage/features/potency-rows/*`）の統合。Combat側は相手側ステータス（軽減計算用）も必要かつ
propsベース、Simple側はZustand直結という前提の違いがあるため、無理に完全統合はせず、計算ロジック
（`calculateValue`・`extractMultiplier`等）の共有に留める可能性が高い。着手する場合は改めて検討する。

### Phase 4 — 命名規則の統一（複雑度: 低。他Phase完了後にまとめて実施）

- [ ] `features/damage/features/*`（`potency-rows`・`potency-subrows`・Phase 1で追加した`simple`を含む）
      → `features/damage/containers/*`へリネームする（Phase 3の移植先をこの命名に合わせて決めておくと
      二度手間にならない）。
- [ ] `features/README.md`のdamageセクションを更新する（Simple mode完了・Combat mode未着手の現状を反映）。

## 推奨する着手順序

Phase 0 → Phase 1 → （Phase 2の設計方針をユーザーとすり合わせ）→ Phase 2 → Phase 3 → Phase 4

（Phase 0・Phase 1・Phase 2は2026-08-29完了〔Phase 2はstore側の土台のみ。実際の配線・`{from,to}`組み立ては
Phase 3に含めた〕。次はPhase 3）

## 実装前に確認が必要な事項

- Simple/Combatの行コンポーネントをどこまで統合するか（Phase 3、完全共通化 or 独立のまま）

# features/ ディレクトリについて

このディレクトリは `workaround/zustand` ブランチでの再構築によって作られた。目的は次の2点。

1. `components/` ディレクトリに整理されないまま置かれていた大量のコンポーネントを、機能（feature）単位に整理し、
   ロジックとViewの分離を明確にする。
2. 特にダメージ計算結果表示系で顕著だった、`SubjectConfig`・`Status` などのpropsバケツリレーをやめ、
   Zustandの専用フック経由でコンポーネントが自分で必要なデータを取得する方式に変更する。

コンテナ/ビューの分離方針そのもの（`containers/`・`components/`・`*.view.tsx`・`*.layout.tsx`の使い分け）は
[component-guidelines.md](./component-guidelines.md) を参照。このファイルでは、その方針が各featureに対して
実際にどこまで適用されているか、現状（2026-08-29時点、`workaround/zustand`ブランチ）を記録する。

## Store構成

Zustand Storeの定義は `subject-config/store.tsx` の1箇所にしかなく、他のfeature（subject-skills /
subject-status / damage）は自前のstoreを持たず、すべて `@app/features/subject-config/store` の
`useSubjectStateStore(selector)` をimportして参照する。

- `createSubjectConfigStore(storageKey)` が store インスタンスを生成する。`config`・そこから
  導出される `status`（`_updateConfig`のたびに`statusOf(config, 100)`で再計算される）・`hpRatio`を保持する。
  **statusは呼び出し側が計算するものではなく、常にstoreが持つ導出値。**
- React Contextでstoreインスタンスを配る。Providerは2種類:
  - `SimpleModeSubjectConfigProvider` — シンプルモードのページ全体を1回だけラップする。storeも内部で生成する。
  - `SubjectConfigStoreProvider({store, children})` — 呼び出し側が生成済みのstoreをContext経由で公開するだけの
    汎用Provider。対戦モードで使用（`pages/combat/index.tsx`が左右2つのstoreを自分で生成し、`<Subject>`用
    Providerにも中央のダメージ計算結果カラム用の値組み立てにも同じインスタンスを渡す。2026-08-29以前は
    `CombatModeSubjectConfigProvider`という専用Providerがあったが、`side`を保持する`subjectSide`フィールドが
    実装上どこにも代入されないデッドコードだったことが判明し、汎用Providerへ統合・削除した）。
- 永続化は `zustand/middleware` の `persist` が担う。旧 `useLocalStorage` ベースの
  `useSubjectConfigState`（`components/config/use-subject-config.tsx`）を置き換えるものだが、
  `storage/migration-v1/` （v2以前の形式）からのマイグレーションも `store.tsx` 内の `migrate()` が
  そのまま引き継いでいるため、マイグレーション処理は2世代分が積み重なっている。

## containers / components の役割分担

- `containers/*.tsx` — Storeへのアクセス（`useSubjectStateStore`）とローカルUI状態を担当し、必要なら
  `components/` のビューへpropsで橋渡しする。
- `components/*.view.tsx` — Storeに一切依存しない純粋なビュー。
- `components/*.layout.tsx` — 自身はStoreにアクセスしないが、内部で他のcontainerをimportして配置する
  「レイアウト定義」。propsを取ることもある（例: `equipments.layout.tsx`は`davidUpgradable`等をpropsで
  受け取りつつ、内部で`<EquipmentSlot slot="Weapon" />`のようなcontainerを直接並べている）。

## feature単位の現状

### subject-config/ — 完成、方針の手本

container/components/layout/viewの分離が最も整理されている状態。`component-guidelines.md`の記述は
このfeatureの実装から抽出された方針。

### subject-skills/ — 完成（ただしツールチップ機能が外部要因で停止中）

containers/components分離済み。スキルアイコン（`components/skill-icon.view.tsx`）は
`data-tooltip-id`属性を出力するのみで、実際のツールチップ描画は本featureの外、
`components/tooltip/index.tsx`（`TooltipPresenter`）が担当する。

**`TooltipPresenter`は`config`/`status`をpropsで受け取る旧方式のまま、Zustand化されていない。**
そのため`pages/simple/index.tsx`・`pages/combat/index.tsx`の両方で、呼び出し箇所ごとコメントアウトされて
いる（`pages/simple/index.tsx`ではそれに付随して`useSubjectConfigState`ベースの`configProps`/`status`計算
自体もコメントアウト済み）。**結果として、スキルアイコンへのマウスオーバー（PC）・タップ（モバイル）で
ツールチップが表示される機能は、シンプルモード・対戦モードともに現在動作しない。**
復旧するには`TooltipPresenter`をZustand対応させる（`useSubjectStateStore`から直接`config`/`status`を
取得する）か、呼び出し元で改めてconfig/statusを渡す実装に戻す必要がある。

### subject-status/ — 完成（containers/components分離パターンからやや外れる）

`containers/`ディレクトリを持たない。`chunks/*.tsx`が「Store読み取り + JSX組み立て」を1ファイルで行っており、
component-guidelines.mdでいう「コンテナ」に相当する処理を、ビューへ分離せずそのまま抱えている。
個々のセル描画は`components/column.tsx`・`components/inner-table/*`という薄い純粋ビューに委譲されている。
表示項目数が多い一覧画面という性質上、chunk単位で厳密に「薄いコンテナ + 専用View」へ割るコストが見合わなかった
ための意図的な簡略化と見られるが、断定はできない（要確認）。

### damage/ — Simple mode・Combat modeともに完成（2026-08-29更新）

詳細なタスク一覧・発見した問題点は[refactoring-plan.md](./damage/refactoring-plan.md)を参照。以下はその要約。

- **Simple mode（完了）** — すべて`features/damage`配下に移行済み。エントリポイントは
  `features/damage/features/simple/damage-table.tsx`。カテゴリ別コンテナ
  （`features/simple/{basic-attack,subject-skill,generic-subtable}.tsx`）が生データを行コンポーネント
  （`features/potency-rows/*`）に変換し、共通View（`components/simple/subtable.tsx`）へ渡す。
  `components/damage/simple/`（旧実装）は削除済み。
- **Combat mode（完了）** — `features/damage/features/combat/**`に移行済み（旧`components/damage/combat/**`は
  削除）。中央カラム（ダメージ計算結果）は読み取り専用のため、`pages/combat/index.tsx`が左右のZustand
  storeから`{config,status,hp}`を読み出し、`left`/`right`という素のオブジェクトとしてpropsで渡す設計にした。
  「どちらを発生源(`from`)にするか」を決める`ltr`方向トグルは中央カラム自身（`combat/damage-table.tsx`）が
  保持する。この層はZustandを一切知らず、propsのみで完結する。行コンポーネント（`combat/subtables/rows/*`）は
  相手側ステータス（軽減計算用）も必要なため、Simple mode側の行コンポーネント（Zustand直結）とは別実装のまま
  （計算ロジックの共有には留めている）。移植の過程で、旧実装が長らく参照していた壊れたスタイルシートimport
  （実在しないパスを指しており、`<Damage>`が無効化されていたためRollupのツリーシェイクで顕在化していなかった）
  を発見・修正した。詳細は[damage/refactoring-plan.md](./damage/refactoring-plan.md)のPhase 2・3を参照。
- **共通計算層** — `features/damage/damage-table-util.ts`・`use-{augment,item-skills,tactical-skill,
  weapon-skills,basic-attack-ratio}.ts`。Storeに依存しない純粋なフックのため、Simple/Combat両方から
  共通利用されている（`features/damage`直下に配置）。
- **命名規則の不整合は未解消。** `features/damage`のみ、Storeアクセスを担う層の名前が`containers/`ではなく
  `features/`になっている（`features/damage/features/{potency-rows,potency-subrows,simple,combat}`）。
  他のfeature（subject-config / subject-skills）の命名規則と一致しない（Phase 4で対応予定）。

## このブランチ内の未回収作業（TODOメモ）

- `TooltipPresenter`（スキル/装備アイテムのツールチップ）をZustand対応させ、呼び出しを復活させる。
- `features/damage`のみ`containers/`ではなく`features/`という命名になっている不整合を解消する
  （[damage/refactoring-plan.md](./damage/refactoring-plan.md)のPhase 4）。
- （参考）`pages/simple/index.tsx`に、コメントアウトされたまま残っている旧`useSubjectConfigState`
  呼び出しがある。これにより`components/config/use-subject-config.ts`は現在コード上どこからも
  アクティブに参照されなくなっている（対戦モード側は今回のPhase 3対応で参照をやめた）。
  削除するかどうかは未検討。

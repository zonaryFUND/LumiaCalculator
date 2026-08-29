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
- React Contextでstoreインスタンスを配る。Providerは`SubjectConfigStoreProvider({store, children})`の1種類
  のみ（呼び出し側が生成済みのstoreをContext経由で公開するだけの汎用Provider）。`pages/simple/index.tsx`・
  `pages/combat/index.tsx`とも、ページ側で`createSubjectConfigStore`を直接呼んでstoreを生成・保持し、
  `<Subject>`用のProviderにも、`TooltipPresenter`・（対戦モードの場合）中央のダメージ計算結果カラム用の
  値組み立てにも同じインスタンスを渡す。2026-08-29以前は`SimpleModeSubjectConfigProvider`・
  `CombatModeSubjectConfigProvider`というモード別の専用Providerが存在したが、いずれも「ページ側で
  storeの値を直接読む必要がある場面（`TooltipPresenter`や対戦モードの中央カラム）」に対応できず、
  最終的に汎用Providerへ統合・削除した。
- 永続化は `zustand/middleware` の `persist` が担う。旧 `useLocalStorage` ベースの
  `useSubjectConfigState`（旧`components/config/use-subject-config.tsx`。2026-08-29にデッドコードとして
  削除済み）を置き換えるものだが、`storage/migration-v1/` （v2以前の形式）からのマイグレーションも
  `store.tsx` 内の `migrate()` がそのまま引き継いでいるため、マイグレーション処理は2世代分が積み重なっている。

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

2026-08-29、`src/components/`直下にあった`item/`（装備アイコン表示）・`modal/`（装備選択・ビルド保存/読込・
実験体選択の疑似モーダル）・`config/`（デッドコード）を整理し、このfeatureへ統合した。
- `item/` → `equipment-icon.view.tsx` / `equipment-icon-blank.view.tsx`。実際には
  `equipment-slot`（常時表示の現在装備）と`equipment-list-modal`（選択モーダルの一覧）の**両方**から
  使われる共有部品のため、`-modal`は付けていない。
- `modal/`配下の4ファイルはすべて本feature専用だったと判明（他featureからの参照なし）。ファイル名に
  `-modal`サフィックスを付けて「常にモーダルの中身としてしか使われない」ことを明示した上で、
  Store（`useSubjectStateStore`）を直接読む`equipment-list-modal.tsx`は`containers/`へ、
  純粋にpropsだけで完結する`subject-list-modal.view.tsx`・`save-build-modal.view.tsx`・
  `load-build-modal.view.tsx`は`components/`へ配置した。
- `config/`（`perpetual-buffs.tsx`・`use-subject-config.ts`）はどちらも実質的に参照されていない
  デッドコードだったため削除した。

`components/`側に何を置き、`features/<name>/`側に何を置くかの判断基準は
[component-guidelines.md](./component-guidelines.md)の「componentsディレクトリとの境界」を参照。

### subject-skills/ — 完成（ツールチップ機能も復旧済み、2026-08-29）

containers/components分離済み。スキルアイコン（`components/skill-icon.view.tsx`）は
`data-tooltip-id`属性を出力するのみで、実際のツールチップ描画は本featureの外、
`src/components/tooltip/index.tsx`（`TooltipPresenter`）が担当する。

`TooltipPresenter`は`config`/`status`をpropsで受け取る設計（Zustand化はしていない）。
これは意図的な設計で、対戦モードでは`config`/`status`が`[左,右]`のペアになりうるため、`TooltipPresenter`
自体は「配列かどうか」だけを見て分岐する単純なコンポーネントのままにしている。`pages/simple/index.tsx`・
`pages/combat/index.tsx`とも、ページ側で生成したstoreから`useStore`で直接値を読み、propsとして渡している。

対戦モードでは「hoverしたアイコンがどちら側の実験体のものか」をreact-tooltipのhover描画
（DOM要素の`data-tooltip-*`属性しか参照できない）に伝える必要がある。この橋渡し役として
`src/components/tooltip/subject-side-context.ts`の`TooltipSubjectSideContext`（Reactの素のContext）を
`pages/combat/index.tsx`が左右それぞれの`<Subject>`をラップする形で提供し、`Skill`
（`features/subject-skills/containers/skill.tsx`）・`EquipmentIcon`
（`features/subject-config/components/equipment-icon.view.tsx`。2026-08-29に`components/item/item.tsx`
から移動）がこれを読んで自身のDOM要素に`data-tooltip-subject-side`属性として書き出す。シンプルモードでは
Providerを設置しないため既定値の`undefined`のままでよい（`config`/`status`が単一値のときは
`TooltipPresenter`側でsideを無視する）。

### subject-status/ — 完成（containers/components分離パターンからやや外れる）

`containers/`ディレクトリを持たない。`chunks/*.tsx`が「Store読み取り + JSX組み立て」を1ファイルで行っており、
component-guidelines.mdでいう「コンテナ」に相当する処理を、ビューへ分離せずそのまま抱えている。
個々のセル描画は`components/column.tsx`・`components/inner-table/*`という薄い純粋ビューに委譲されている。
表示項目数が多い一覧画面という性質上、chunk単位で厳密に「薄いコンテナ + 専用View」へ割るコストが見合わなかった
ための意図的な簡略化と見られるが、断定はできない（要確認）。

### damage/ — Simple mode・Combat modeともに完成（2026-08-29更新）

- **Simple mode（完了）** — すべて`features/damage`配下に移行済み。エントリポイントは
  `features/damage/containers/simple/damage-table.tsx`。カテゴリ別コンテナ
  （`containers/simple/{basic-attack,subject-skill,generic-subtable}.tsx`）が生データを行コンポーネント
  （`containers/potency-rows/*`）に変換し、共通View（`components/simple/subtable.tsx`）へ渡す。
  `components/damage/simple/`（旧実装）は削除済み。
- **Combat mode（完了）** — `features/damage/containers/combat/**`に移行済み（旧`components/damage/combat/**`は
  削除）。中央カラム（ダメージ計算結果）は読み取り専用のため、`pages/combat/index.tsx`が左右のZustand
  storeから`{config,status,hp}`を読み出し、`left`/`right`という素のオブジェクトとしてpropsで渡す設計にした。
  「どちらを発生源(`from`)にするか」を決める`ltr`方向トグルは中央カラム自身（`combat/damage-table.tsx`）が
  保持する。この層はZustandを一切知らず、propsのみで完結する。行コンポーネント（`combat/subtables/rows/*`）は
  相手側ステータス（軽減計算用）も必要なため、Simple mode側の行コンポーネント（Zustand直結）とは別実装のまま
  （未統合であることについては[既知の課題](../../docs/known-issues.md)参照）。
- **共通計算層** — `features/damage/damage-table-util.ts`・`use-{augment,item-skills,tactical-skill,
  weapon-skills,basic-attack-ratio}.ts`。Storeに依存しない純粋なフックのため、Simple/Combat両方から
  共通利用されている（`features/damage`直下に配置）。
- **命名規則の不整合は解消済み（Phase 4、2026-08-29）。** `features/damage`のStoreアクセス層は
  `features/`ではなく`containers/`に統一された（`features/damage/containers/{potency-rows,potency-subrows,
  simple,combat}`）。他のfeature（subject-config / subject-skills）の命名規則と一致している。

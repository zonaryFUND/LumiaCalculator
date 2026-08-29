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

- `createSubjectConfigStore(storageKey, side?)` が store インスタンスを生成する。`config`・そこから
  導出される `status`（`_updateConfig`のたびに`statusOf(config, 100)`で再計算される）・`hpRatio`・
  `subjectSide` を保持する。**statusは呼び出し側が計算するものではなく、常にstoreが持つ導出値。**
- React Contextでstoreインスタンスを配る。Providerは2種類:
  - `SimpleModeSubjectConfigProvider` — シンプルモードのページ全体を1回だけラップする。
  - `CombatModeSubjectConfigProvider` — 対戦モードで左右2回ラップする（`side="left"|"right"`）。
    左右それぞれ独立したstoreインスタンス・永続化キーを持つ。
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

### damage/ — 作業途上、複数の移行段階が併存

**最も未完成のfeature。** 移行の実態として次の3層が同時に存在している。

1. **旧実装（`components/damage/**`）** — 完全にprops経由（`config`/`status`/`hp`のバケツリレー）。
   Combat mode専用の`components/damage/combat/**`一式は現状これしかなく、`features/damage`側への
   置き換えがまだ存在しない。
2. **中間実装（`features/damage/components/damage-table.tsx`）** — Simple mode用のエントリポイント。
   ここ自体はZustandから`config`/`status`/`hpRatio`を取得するが、配下では依然として旧
   `components/damage/simple/subtables/*`（`basic-attack.tsx`・`subject-skill.tsx`・`subtable.tsx`）に
   props経由で受け渡している。つまりトップレベルだけがZustand化され、内側は旧方式のまま。
3. **新実装（`features/damage/features/*` + `features/damage/components/*`）** — `critical-available.tsx`
   など、一部の行・サブ行コンポーネントはここまで移行済みで、`useSubjectStateStore`を直接呼んでいる。
   ただし**このfeatureだけ、Storeアクセスを担う層の名前が`containers/`ではなく`features/`になっており**、
   他のfeature（subject-config / subject-skills）の命名規則と一致しない。今後統一するなら
   `features/damage/features/*` → `features/damage/containers/*` へのリネームが候補。

**Combat modeのダメージ表示は現在完全に無効化されている。** `pages/combat/index.tsx`内の
`<Damage leftStatus={...} ... />`（実体は`pages/combat/damage.tsx`、内部で旧
`components/damage/combat/damage-table`を使用）がまるごとコメントアウトされている。
復旧にはCombat mode用のダメージ計算・表示をfeatures/damage側へ移植する作業が必要
（Simple mode側の移行が完了してから着手する想定と見られる）。

## このブランチ内の未回収作業（TODOメモ）

- `TooltipPresenter`（スキル/装備アイテムのツールチップ）をZustand対応させ、呼び出しを復活させる。
- Combat modeのダメージテーブルを`features/damage`へ移植し、`pages/combat/index.tsx`の
  コメントアウトを解除する。
- `features/damage`のみ`containers/`ではなく`features/`という命名になっている不整合を解消する。
- `features/damage/components/damage-table.tsx`配下に残る旧`components/damage/simple/subtables/*`の
  Zustand移行を進める。

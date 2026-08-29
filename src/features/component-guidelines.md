# コンポーネント分離方針

feature内のUIコンポーネントを **コンテナ** と **ビュー** に分離する際の方針。

## ディレクトリ構成

```
features/<feature>/
├── containers/     # Storeアクセス＋ローカル状態管理を担う
├── components/     # Storeに依存しないビュー・レイアウト
├── store.tsx       # Zustand Store定義
└── index.tsx       # feature エントリポイント
```

## コンテナ (`containers/`)

- Zustand Storeへのアクセス（`useSubjectStateStore` 等）を行う
- ローカルUI状態（Modal開閉の `useToggle` 等）もコンテナが管理する
- Modalの中身がStore由来のデータに依存する場合、`<Modal>` 要素もコンテナ側に置く

### ビュー分離の判断基準

- コンテナのUI部分が十分に小さく、かつ共通コンポーネントへの委譲で済む場合は **ビューを作らずコンテナに含めてよい**
  - 例: `subject-name`（14行）、`level-pulldown`（15行）、`mastery-pulldowns`（26行）
- コンテナが複数の関心事（Store接続・ビジネスロジック・複雑なUI）を持つ場合はビューへ分離する
  - 例: `equipments`（コンテナ） → `equipments.layout`（レイアウト）

## ビュー (`components/`)

Storeに一切アクセスしない。必要なデータはすべてpropsで受け取る。2種類のビューが存在する。

### 純粋ビュー (`*.view.tsx`)

- Storeにもコンテナにも依存しない、純粋なUIコンポーネント
- 例: `storage-buttons.view`（ボタンUI）、`slider-section.view`（スライダーUI）

### レイアウト (`*.layout.tsx`)

- 内部でコンテナを組み立てて配置する「レイアウト定義」コンポーネント
- 自身はStoreにアクセスしないが、子としてコンテナをimportする
- 例: `subject-card.layout`、`equipments.layout`

#### レイアウト分離の基準

レイアウト自体が **固有のロジック** を持つ場合に分離する。

- レスポンシブ分岐、条件付きレンダリング、複雑な配置制御がある → **分離する**
- 単純な並べ替えのみ（`<h3>` + 数個の子要素を並べるだけ）→ **コンテナに含めてよい**

## 共通ビューの共有

複数のコンテナが同一のビューを共有することを推奨する。

- 例: `hp-ratio-slider` / `gauge-slider` / `stack-slider` → すべて `slider-section.view` を共有

## `src/components/`との境界

`features/<feature>/`（このfeature固有）と`src/components/`（feature横断の共通部品）のどちらに置くかは、
次の**いずれか**を満たすかで判断する。

1. **ドメイン非依存** — `SubjectConfig`・`Status`・`EquipmentID`のようなゲーム固有の型を一切知らない、
   汎用的なUI部品（ドロップダウン、スイッチ、タブ、テーブル行など）。現時点で1つのfeatureからしか
   使われていなくても、他のfeatureが将来使う可能性が普通にある部品はここに含まれる
   （例: `components/slider/`は現状`subject-config`からのみ使われているが、ドメインを一切知らない
   汎用スライダーなので`components/`のままでよい）。
2. **ドメインには依存するが、実際に複数featureから使われている** — 例: `components/tooltip/`は
   `subject-skills`（スキルアイコン）と`subject-config`（装備アイコン）の両方から呼ばれ、かつ対戦モードの
   「左右どちらの実験体か」という横断的な関心事も持つ。

どちらも満たさない場合（特定のfeatureでしか使われておらず、かつそのfeatureのドメイン型に強く依存している）は、
`components/`ではなく該当`features/<feature>/`側に置く。2026-08-29、この基準に基づいて`src/components/item/`
（装備アイコン。`subject-config`専用と判明）・`src/components/modal/`（装備選択/ビルド保存読込/実験体選択の
疑似モーダル。4ファイル全て`subject-config`専用と判明）を`features/subject-config/`へ移動し、
`src/components/config/`（デッドコード）を削除した。詳細は[README.md](./README.md)のsubject-config節を参照。

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

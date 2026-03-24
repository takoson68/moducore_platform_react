# Project 與 Module 契約

## Project 契約

一個 project 至少包含以下結構：

- `project.config.js`
- `layout/`
- `modules/`
- `styles/`
- `docs/`

`project.config.js` 範例：

```js
export default {
  name: 'react-welcome',
  tenant_id: 'react-welcome',
  uiRuntime: 'react',
  modules: ['hello-panel', 'status-panel']
}
```

規則：

- `uiRuntime` 目前固定為 `react`
- project 由 `VITE_PROJECT` 決定啟動目標
- build 輸出位置由 `vite.config.js` 統一決定
- project 的 `layout/` 負責專案外框、導航與頁面骨架
- project `layout/` 不應接管某個 module 本身的功能頁

## Module 契約

一個 module 是可獨立管理的功能單位。
module 可視需求包含：

- UI
- store
- routes
- service layer
- API access layer
- local pages
- registration entry

推薦結構：

```txt
modules/
  hello-panel/
    api/
    components/
    pages/
    store.js
    routes.js
    service.js
    index.js
```

各檔案責任：

- `index.js`：模組入口，負責聚合 module setup
- `store.js`：定義 module stores，並匯出 `stores`
- `routes.js`：定義 module route descriptors
- `service.js`：定義 module business services
- `api/`：封裝 API client 或遠端資料存取
- `pages/`：放 route pages
- `components/`：放 module-local UI 元件
- `hooks/`：放 module-local React hooks
- `utils/`：放 module-local helpers

## 模組邊界規則

這條規則是模組設計哲學的一部分：

- 模組內部可以直接引用自己模組的檔案
- 跨模組不得直接引用別的模組內部檔案
- 跨模組必須透過 world 取得已註冊能力

因此：

- module 自己的頁面，應放回自己模組的 `pages/`
- project `layout/` 只負責專案層的組裝與外框
- 如果 module 頁面要顯示別的模組能力，應透過 world 取得

## `panels` 的定位

`panels` 是 module 對 world 主動公開的跨模組 UI 能力。

它的用途不是單純匯出元件，而是讓：

- 其他 module
- project `layout/`
- project-level page

可以在需要時，透過 world 取回並使用這個 UI 區塊。

因此 `panels` 適合：

- 首頁卡片
- dashboard 區塊
- 可插拔的摘要元件
- 小型專案中方便快速取用的跨模組 UI 能力

使用原則：

- `panels` 可以保留，因為它在小專案很方便
- 大專案也能使用，但不要無限制氾濫
- 若寫 `panels`，必須加上註解：`// 提供跨模組能力`
- 每個 panel 都必須標註 `targets`
- 使用方不得直接把 `world.getPanels()` 全部畫出來，必須依 `targets` 過濾

範例：

```js
// 提供跨模組能力
panels: [
  {
    name: 'form-draft',
    targets: ['hello-welcome'],
    Component: FormDraftPanel
  }
]
```

## Module Entry 形狀

`index.js` 應輸出一個 module definition object。

範例：

```js
import { stores } from './store.js'
import { routes } from './routes.js'
import { HelloPanel } from './components/HelloPanel.jsx'

export default {
  name: 'hello-panel',
  setup: {
    stores,
    routes,
    // 提供跨模組能力
    panels: [
      {
        name: 'hello-panel',
        targets: ['hello-welcome'],
        Component: HelloPanel
      }
    ]
  }
}
```

規則：

- 所有 module registration data 都集中在 `index.js`
- `index.js` 是 project registry 載入 module 的唯一入口
- `setup` 代表 module 對世界提供的可註冊能力，例如 `stores`、`routes`、`panels`
- `store.js` 應承接實際 store 定義，不應只剩轉手或空殼
- 若同時存在首頁卡片與 route page，應清楚拆到 `components/` 與 `pages/`

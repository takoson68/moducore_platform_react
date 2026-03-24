# ModuCore Platform

ModuCore Platform 是一個以「平台 > 專案 > 模組」為核心結構的前後端整合工程。
目前前端主路徑採用 React-first，並保留原本 world / container / module registry 的組裝哲學。

## 專案定位

這個專案的重點不是單一畫面框架，而是：

- 平台層提供基礎能力與啟動機制
- 專案層決定目前世界的配置與外框
- 模組層承接實際業務功能

React 在這裡主要負責渲染層，並不推翻原本的平台結構。

## 平台 > 專案 > 模組

整體分層如下：

- `platform`
  - 提供共用基礎能力、啟動流程與底層規則
- `project`
  - 決定目前啟動哪個專案、使用哪些模組、採用什麼 layout
- `module`
  - 各自管理自己的 `store.js`、`routes.js`、`service.js`、`api/`、`pages/`、`components/`、`index.js`

這種結構可以讓：

- 專案切換時不需要推翻整個平台
- 模組可以作為完整個體獨立維護
- 畫面框架從 Vue 過渡到 React 時，仍能保留原本的組裝邏輯

## World / Container / Module Setup

`world` 是註冊與解析的容器，不是單純的全域變數集合。

在這套結構裡：

- module 透過 `index.js` 將自己的能力註冊進 world
- world 負責解析已註冊的 store、route、panel 與其他能力
- container 承接實際的註冊與 resolve 機制

`module/index.js` 的 `setup` 是模組對外公開能力的入口，常見包含：

- `stores`
- `routes`
- `panels`

原則上：

- 模組內部可以直接引用自己模組的檔案
- 跨模組不可直接引用別的模組內部檔案
- 跨模組必須透過 world 取得已註冊能力

## Store 響應與 React-first

目前前端的 React 響應能力，已包裝進平台自己的 Store 工廠中。

這代表：

- React 的響應訂閱能力由平台內建提供
- 模組在 `store.js` 中直接使用平台提供的 store factory 即可
- Store 會同時承接狀態、actions、subscribe 與 React 響應介面
- 不依賴 Redux、Zustand、Pinia 或其他第三方狀態管理框架

因此，模組層只需要專注在自己的狀態結構與業務邏輯，不需要再額外引入第三方狀態管理方案。

最小示範：

```js
// modules/counter/store.js
import { createStore } from '@/core'

export function createCounterStore() {
  return createStore({
    name: 'counterStore',
    defaultValue: {
      count: 0
    },
    actions: {
      increment(store) {
        const snapshot = store.get()
        store.set({
          ...snapshot,
          count: snapshot.count + 1
        })
      }
    }
  })
}

export const stores = {
  counterStore: createCounterStore
}
```

```jsx
// modules/counter/components/CounterPanel.jsx
export function CounterPanel({ world }) {
  const counterStore = world.store('counterStore')
  const counter = counterStore.useStore()

  return (
    <section>
      <p>Count: {counter.count}</p>
      <button type="button" onClick={() => counterStore.increment()}>
        Count +1
      </button>
    </section>
  )
}
```

上面這種寫法代表：

- store 的 state 與 actions 由平台 store factory 建立
- React 元件透過 `useStore()` 訂閱狀態
- 點擊 `increment()` 後，React 畫面會自動響應更新
- 整個流程不需要額外引入第三方狀態管理套件

Store 使用原則：

- 任何會影響專案後續行為的狀態，應進入 Store
- 父子元件間的直接傳遞使用 `props`
- 超出父子關係的資料傳遞，應使用 Store

## Panels / Routes / Stores 的角色

在模組 `setup` 中，這三者的角色不同：

- `stores`
  - 提供模組狀態能力
- `routes`
  - 提供模組頁面入口
- `panels`
  - 提供模組對外公開的跨模組 UI 能力

### `panels`

`panels` 不是單純匯出元件，而是讓其他模組、project layout 或 project-level page 能透過 world 取回並使用的 UI 區塊。

適合用在：

- 首頁卡片
- dashboard 區塊
- 可插拔的摘要元件

使用規則：

- 若寫 `panels`，必須加上註解：`// 提供跨模組能力`
- 每個 panel 都必須標註 `targets`
- 使用方不得直接把 `world.getPanels()` 全部畫出來，必須依 `targets` 過濾

範例：

```js
export default {
  name: 'notification',
  setup: {
    stores,
    routes,
    // 提供跨模組能力
    panels: [
      {
        name: 'notification-bell',
        targets: ['header-right'],
        Component: NotificationBell
      }
    ]
  }
}
```

### `routes`

`routes.js` 負責 route descriptor，並將 route metadata 留在 `routes.js` 中管理。

目前規則：

- 選單名稱使用 `meta.nav.label`
- 選單排序使用 `meta.nav.order`
- 若 route page 要延後載入，使用 `component: () => import(...)`

### `stores`

`store.js` 應承接實際 store 定義與聚合，不應只剩轉手或空殼。
store 雖然可以註冊進 world，但其業務責任仍屬於原本的 module。

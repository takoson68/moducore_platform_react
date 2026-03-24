# Store 與資料流規範

## store 的角色

在目前這套 React-first 架構裡，store 是模組狀態與共享狀態的主要承接點。

常見用途：

- module UI state
- module workflow state
- module-specific business state
- 明確設計過的跨模組共享狀態

## world 與 store 的關係

module store 可以註冊進 world，但 world 的角色是註冊與解析容器，不代表所有 store 都應被當成全域共享狀態。

比較準確的理解是：

- store 的註冊入口在 world
- store 的業務責任仍屬於原本的 module
- 多數 store 仍跟著 module / page 的使用流程進入作用範圍
- 只有明確的跨模組需求，才應主動設計成共享 store

## 模組內與跨模組的引用規則

這條規則必須固定下來：

- 模組內部可以直接引用自己模組的檔案
- 跨模組不可直接引用別的模組內部檔案
- 跨模組應透過 world 取得已註冊能力

也就是說：

- 自己模組內可以直接 `import './pages/...`、`./components/...`、`./store.js`、`./service.js`
- 如果要使用別的模組能力，應透過 world 取得它已註冊的 store、service、panel 或 route

不要直接寫成：

```js
import { something } from '../other-module/...'
```

這會破壞模組邊界。

## Props 與 Store 的分界

`props` 只用於父子元件的直接傳遞。

規則：

- 父子元件之間的直接資料傳遞使用 `props`
- 超出父子關係的資料傳遞，不應靠多層 `props`
- 跨區塊、跨頁面、跨模組的共享資料，應使用 store

## 使用判斷

如果你想表達的是：

- 「現在的值是什麼」：優先考慮 store
- 「剛剛發生了什麼事」：優先考慮 eventBus

如果跨模組只需要短暫通知，而不是持續共享狀態，就不要把所有互動都做成共享 store。

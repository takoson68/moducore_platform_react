# 前端架構總覽

## 方向

`platform/frontend` 目前以 React-first 為主。

現行原則：

- 新的前端 runtime 工作以 React 為主。
- 新的 module UI 使用 `.jsx` 或 `.js`，不再新增 `.vue`。
- project 切換由 `VITE_PROJECT` 控制。
- build 輸出位置由 `vite.config.js` 直接決定。
- 舊的 Vue 資產或描述視為 legacy；若尚未移除，應先隔離，再逐步遷移。

## React-Only 邊界

目前 frontend active runtime 是 React。

現行 React 入口：

- `platform/frontend/src/main.js`
- `platform/frontend/src/react/startReactApp.jsx`
- `platform/frontend/src/react/reactWorld.js`
- `platform/frontend/src/react/reactBoot.js`

規則：

- 不要再新增 Vue runtime entry。
- 不要為新功能新增 `.vue` 檔案。
- 不要把 Vue-specific dependencies、router pattern、store pattern 再帶回 active frontend path。
- 若 `public/` 或舊靜態資料夾裡還有 Vue 時代遺留資產，先隔離，再在確認用途後移除。

## 為什麼原本的平台 > 專案 > 模組結構仍能承接 React

目前這套「平台 > 專案 > 模組」的結構，之所以仍能承接 React，
不是單純因為最後可以把東西 render 進 app，而是因為它本質上先完成了責任分層與註冊組裝。

React 真正需要的是：

- 最後有一個可 render 的入口
- render 前可以把需要的狀態、route、layout、module 組好
- app 只負責承接最終的畫面樹

而目前這套架構剛好符合這個前提：

- 平台層提供底層能力與 world/container
- 專案層決定目前 project instance 的設定、layout 與頁面如何排列下層模組
- 模組層提供可插拔的業務單位
- 最後再由 React app 接手渲染

真正可遷移的核心不是 Vue 或 React 本身，而是下列這些框架之上的組裝概念：

- world / container
- project instance
- module registry
- store registration
- route registration
- layout injection

這代表：

- React 可以接手最後的渲染層
- 不需要推翻原本的平台世界觀
- 原本的價值不是某個框架語法，而是「先分層、再註冊、最後組裝」

所以 `app` 比較像是最終承接點，不是整個平台結構真正的核心。

補充：

- `App.jsx` 應只負責 route 判斷與最終渲染入口。
- project 首頁或 dashboard 要怎麼擺放下層模組，應由各 project 的 `layout/` 自己決定。
- 不應把某個 project 的首頁組裝邏輯硬寫在 runtime 層。

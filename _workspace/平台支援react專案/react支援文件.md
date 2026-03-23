# Codex 任務：React 平台重建第一階段修正版

## 文件定位
本文件是「React 平台重建第一階段」的工作說明文件。

它的用途是：

- 說明這一階段的目標
- 校正目前 repo 現況
- 明確指出哪些是要保留的核心
- 明確指出哪些內容屬於待移除的舊平台殘留

本文件不是現況聲明。
若本文件與實際程式碼不一致，應以實際程式碼為準，並視為工程發現。

---

## 一、現況校正

目前這個 repo 並不是「只剩 React 平台骨架」的狀態。

目前實際狀況是：

- `platform/frontend/` 仍是既有可運作前端
- 目前前端主體仍以 Vue + Vite 為主
- `platform/frontend/projects/` 內仍保留多個既有專案
- `platform/frontend/src/world.js` 已是較完整的 runtime facade
- `platform/frontend/src/app/boot/boot.js` 已包含 project 載入、可見性判定、模組註冊與 runtime 進入流程
- `platform/frontend/src/app/container/` 已存在 container register / resolve 機制
- `platform/frontend/src/core/` 目前較接近 facade，而不是完整獨立 shared core

因此，本階段任務應理解為：

> 基於現有平台，將前端重建為 React-only 平台，
> 並逐步移除 Vue 與既有舊專案殘留，
> 而不是長期維持 Vue / React 共存。

---

## 二、名詞校正

### 1. world 的三種語意衝突

目前 `world` 一詞容易混淆，至少有以下兩個已存在語意：

- 世界治理層
  - 指 `_VibeCore/world/`
  - 用於定義世界規則、邊界、生命週期與裁決

- runtime world facade
  - 指 `platform/frontend/src/world.js`
  - 用於前端執行期的啟動、能力取得與 runtime 入口

原先任務中的 `hollow world` 容易與上述兩者混淆，
因此本文件改用新稱呼：

- `歡迎頁面`

### 2. 後續稱呼規則

後續請固定用以下方式稱呼：

- 「世界治理層」：指 `_VibeCore/world/`
- 「runtime world」或「world facade」：指 `platform/frontend/src/world.js`
- 「歡迎頁面」：指原本想驗證的最小 UI 入口頁

本文件後續不再使用 `hollow world` 一詞。

---

## 三、核心判定校正

本階段要保留的，不是「所有現有平台實作」，
而是「可代表平台核心邊界、且能被 React-only 平台沿用的最小有效部分」。

### 1. 可以視為目前已存在的核心能力

- container 的 register / resolve 機制
- project config 載入概念
- world facade 作為 runtime 對外入口的概念
- boot 作為啟動協調層的概念
- module registry / module discovery 的概念
- visibility 判定先於註冊的概念
- lifecycle phase 與 runtime ready 的最小概念

### 2. 不應誤判為「應被保留」的部分

以下內容雖存在，但目前不應直接稱為乾淨的 shared core，
也不應被長期保留在 React-only 平台中：

- `platform/frontend/src/world.js`
  - 目前已直接耦合 api、auth、router 與 project 載入
- `platform/frontend/src/core/`
  - 目前較像 façade 出口，不是完整核心層
- 既有專案 layout / modules / styles
  - 屬於 project 層或既有商業內容，不是 React 平台核心
- `platform/frontend/projects/` 下的既有 Vue 專案
  - 屬於待移除對象，不是要與 React 長期共存的正式結構

### 3. 本階段真正要驗證的核心邊界

本階段應驗證與建立的是：

- React 能否成為平台唯一前端 runtime
- container / boot / module registration 概念能否被 React-only 平台沿用
- world facade 是否需要被 React 方向重整或替換
- React 專屬邏輯能否在不污染核心邊界的前提下接管前端平台

---

## 四、任務目標（修正版）

本任務不是從零建立新平台，
也不是聲稱目前 repo 已經完成 React 化。

本任務是：

> 以現有平台為基底，
> 將前端平台改造為只支援 React 的平台，
> 並逐步清除 Vue 與既有舊專案殘留。

本階段目標如下：

1. 保留可代表平台核心的最小骨架
2. 停止以 Vue / React 共存作為目標
3. 讓前端平台只支援 React
4. 規劃並逐步移除 `platform/frontend/projects/` 既有舊專案
5. 建立最小「歡迎頁面」作為 React 平台入口
6. 建立 1 到 2 個最小示範模組
7. 驗證 container / boot / module runtime / signal / lifecycle 的最小可行性

---

## 五、執行原則

### 1. 不可違反的邊界

以下概念必須保留，不可因 React 驗證而被破壞：

- container 註冊 / resolve 機制
- boot 作為共享啟動協調層的概念
- module registry / module registration 概念
- visibility 先於註冊的原則
- signal / route / lifecycle 的最小驗證能力

### 1.1 平台方向聲明

自本文件起，前端平台方向明確定義為：

> `platform/frontend/` 最終只支援 React。

因此以下方向不成立：

- Vue / React 長期共存
- 保留 Vue 作為正式替代 runtime
- 持續維護既有 Vue project 與 React project 並列存在

本階段允許暫時性相容措施，
但其性質僅為遷移過渡，
不得被視為最終架構。

### 2. 本階段禁止事項

本階段禁止加入以下內容：

- auth 新擴充
- 真實商業 API 流程整合
- mock 商業資料流擴寫
- 舊專案頁面搬運
- 舊專案資產搬運
- React Hook 直接進入 container 核心
- 為了 React 而改壞平台邊界
- 為了相容舊 Vue 專案而保留長期雙軌架構
- 將既有 `platform/frontend/projects/` 視為要永久共存的正式專案集合

### 3. React 接入規則

React 在本平台中不是附加 runtime，
而是唯一合法前端 runtime。

允許存在於：

- `reactBoot.js`
- React App 層
- React module view 層
- 必要的 framework/react adapter 層

禁止存在於：

- container 核心
- world 治理層
- shared boot 核心規則
- module runtime 核心規則中直接耦合 React Hook
- 任何「只為了讓 Vue 繼續共存」而保留的過渡殼層

### 4. 工程規章與 React 實作的優先關係

本專案既有工程文件多數以 Vue 為中心撰寫。
在 React-only 平台重建任務中，必須將「結構規章」與「框架實作規則」分開理解。

#### 4.1 必須沿用既有工程規章的部分

以下內容仍應優先遵守既有平台工程規章：

- 目錄層級
- 檔名語意
- world / project / module / layout / boot / container 的責任分層
- 模組註冊流程
- project 入口與 registry 入口
- shared core 與 project 層的邊界
- 每個 module 自行承擔自己的 route 宣告責任

也就是說：

> 結構、責任、入口、命名，仍然跟平台規章走。

#### 4.1.1 模組 routes.js 規則

在 React-only 平台中，所有 module 仍必須維持與原平台一致的責任切分：

- 每個 module 都必須有自己的 `routes.js`
- 即使該 module 目前沒有額外頁面，也必須保留 `routes.js`
- 若暫時沒有 route，則 `routes.js` 應明確輸出空陣列
- `modules/index.js` 只負責收集與安裝 module
- `modules/index.js` 不得直接取代各 module 宣告自己的 route

此規則的目的不是增加檔案數量，
而是維持模組責任一致、結構可預測、後續可擴充。

#### 4.2 必須改用 React 思考邏輯的部分

只要進入以下範圍，就必須使用 React 的合法寫法與 React 的思考模型，
不得為了貼合 Vue 文件而硬套 Vue 語法或 Vue 心智模型：

- 元件寫法
- JSX / TSX
- props / state
- effect / cleanup
- component mount / unmount
- React router 接法
- React 的畫面組裝方式

也就是說：

> 語法、生命週期、元件組合方式，跟 React 走。

#### 4.3 衝突時的判定原則

若既有 Vue 導向文件與 React 實作天然衝突，
應依以下順序判定：

1. 保留平台的結構與責任邏輯
2. 放棄 Vue 專屬語法要求
3. 改用 React 的合法實作方式完成同等責任

例如：

- 不需要沿用 `.vue`、`<script setup>`、`pug template`、`sass scoped` 這類 Vue 專屬格式要求
- 但仍需保留原本要求的模組入口、boot 分工、container 邊界、project 結構語意

#### 4.4 實務總結

本階段的執行原則可簡化為一句話：

> 結構跟平台走，框架實作跟 React 走。

---

## 六、歡迎頁面驗證範圍

本階段不再稱 `hollow world`，
改為建立最小「歡迎頁面」作為 React-only 平台入口。

歡迎頁面只負責驗證以下事項：

1. runtime world 可建立
2. container 可註冊最小能力
3. module 可被註冊
4. route 可驅動畫面切換或最小頁面切換
5. signal 可更新並反映到 UI
6. lifecycle 可驗證 mount / unmount

禁止導入任何商業流程。

---

## 七、建議實作順序

### Phase 1：先辨識真正要保留的核心與待移除項

- 盤點 `world.js`
- 盤點 `boot.js`
- 盤點 `container/`
- 盤點 `projects/modulesRegistry.js`
- 區分哪些是 shared 核心概念，哪些只是現有 Vue 專案實作
- 明確標記 `platform/frontend/projects/` 中哪些舊專案屬於待移除

### Phase 2：建立 React-only 平台入口

- 以 React 取代現有前端主入口
- 建立 React 專用 boot
- 建立最小 App
- 將 runtime world 或其替代物接入 React
- 不修改世界治理層

### Phase 3：建立歡迎頁面並替代舊前端入口

- 建立最小 welcome route
- 建立最小 welcome view
- 不接商業 API
- 不搬既有商業 layout
- 不再以 Vue project 頁面作為正式入口

### Phase 4：建立最小示範模組

- `hello-panel`
- `status-panel`
- 驗證 module register
- 驗證 mount / unmount
- 驗證 signal 更新

### Phase 5：移除舊專案並整理結果文件

輸出以下內容：

- 保留核心清單
- 待移除與已移除內容清單
- React boot 與 shared boot 分工
- 歡迎頁面驗證範圍
- 本階段刻意不做的事項

---

## 八、驗收標準（修正版）

### 1. 可啟動

- React-only 平台入口可正常執行
- React 畫面可正常 render

### 2. 可驗證

畫面至少能看出：

- 歡迎頁面已載入
- `hello-panel` 已掛載
- `status-panel` 已掛載
- signal 更新後 `status-panel` 畫面會變化
- 某個模組可切換而觸發 unmount / remount

### 3. 邊界正確

- React 不直接進入 container 核心
- shared boot 未被 React 專屬實作污染
- runtime world 與世界治理層語意未混淆
- Vue 不再作為正式前端 runtime
- 既有 `platform/frontend/projects/` 專案被視為待移除，而非共存對象

### 4. 結果可閱讀

請補一份簡短說明，至少包含：

1. 保留了哪些平台核心
2. 哪些是待移除或已移除的舊前端內容
3. shared boot 與 react boot 如何分工
4. 歡迎頁面驗證範圍是什麼
5. 本階段刻意不做哪些商業功能

---

## 九、最終判定原則

若遇到以下衝突：

- React-only 平台方向
- 平台核心邊界可能被污染

應優先遵守平台核心邊界。

本任務的成功標準不是功能多，
而是以下四件事是否成立：

- 核心邊界守住
- 平台只支援 React
- 歡迎頁面可以啟動
- module runtime / signal / lifecycle 能被驗證

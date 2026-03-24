# React 規則驗證清單

為了確認這套「平台 > 專案 > 模組 > world 註冊 > React 渲染」在目前規則下能穩定運作，
建議逐步驗證以下項目：

## 1. 跨模組共享 store

目的：

- 驗證共享 store 註冊進 world 後，其他模組可否正確讀取
- 驗證哪些模組可寫、哪些模組只讀
- 驗證共享資料邊界是否可控

## 2. eventBus 通知流

目的：

- 驗證模組 A 發送事件後，模組 B 是否能收到並做出反應
- 驗證 eventBus 與 store 的責任分工
- 驗證跨模組互動不必全部依賴共享 store

## 3. route 的同步載入與 lazy 載入

目的：

- 驗證 `Component` 與 `component: () => import(...)` 兩種寫法都能成立
- 驗證 route 註冊時機與頁面元件載入時機有被正確區分

## 4. module service 層

目的：

- 驗證 `service.js` 是否能承接業務邏輯
- 驗證 page / component 不直接承擔過重的業務流程
- 驗證 service 層能維持 module 邊界

## 5. API layer 與 module 邊界

目的：

- 驗證 `api/` 是否能乾淨承接遠端資料邏輯
- 驗證 API 邏輯不直接滲入 page / component
- 驗證 module 仍維持自我封裝

## 6. world 註冊時機

目的：

- 驗證 module store / route / panel 是否依照 install 流程進入 world
- 驗證不是所有東西都在一開始就常駐啟動

## 7. props 與 store 邊界

目的：

- 驗證父子元件資料傳遞可使用 `props`
- 驗證超出父子元件關係後，應改用 store
- 驗證可避免多層 prop drilling

## 建議驗證順序

若要逐步擴大驗證範圍，建議順序如下：

1. eventBus
2. 跨模組共享 store
3. service.js
4. api/
5. route 載入模式
6. props 與 store 邊界

這份清單可作為後續 React-first 平台驗證的路線圖。  
每完成一項，應回頭補充文件與實作經驗，讓成熟內容之後可以上升到 `_VibeCore/`。

import { StatusPanel } from '../StatusPanel.jsx'

export function StatusPage({ world }) {
  return (
    <section className="react-page">
      <header className="react-page__header">
        <div>
          <p className="react-eyebrow">status-panel route</p>
          <h1>Status Page</h1>
          <p className="react-copy">
            這是 `status-panel` 自己的 route。它直接讀取 `welcomeSharedSignal` store，專門用來驗證模組自己的 `routes.js` 與畫面輸出。
          </p>
        </div>
      </header>

      <div className="react-panel-grid">
        <StatusPanel world={world} />
      </div>
    </section>
  )
}

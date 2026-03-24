import { useObservableSnapshot } from '@/react/useObservableSnapshot.js'

function PanelMountBoundary({ panel, world }) {
  const PanelComponent = panel.Component

  return <PanelComponent world={world} />
}

export default function HelloWelcomePage({ world }) {
  const runtime = useObservableSnapshot(world)
  const signalStore = world.hasStore('welcomeSharedSignal')
    ? world.store('welcomeSharedSignal')
    : world.signalStore()
  const signal = useObservableSnapshot(signalStore)
  const panels = world
    .getPanels()
    .filter((panel) => Array.isArray(panel.targets) && panel.targets.includes('hello-welcome'))

  return (
    <section className="react-page">
      <header className="react-page__header">
        <div>
          <p className="react-eyebrow">hello-panel module</p>
          <h1>模組驗證首頁</h1>
          <p className="react-copy">
            這個頁面屬於 `hello-panel` 模組本身。若要讀取其他模組能力，應透過 world 取得已註冊的
            store、service 或 panel，而不是直接引用別的模組內部檔案。
          </p>
        </div>
        <div className="react-actions">
          <button type="button" onClick={() => signalStore.increment()}>
            測試共享 signal
          </button>
          <button
            type="button"
            className="react-actions__ghost"
            onClick={() => world.togglePanel('status-panel')}
          >
            {runtime.visiblePanels['status-panel'] ? '隱藏狀態卡片' : '顯示狀態卡片'}
          </button>
        </div>
      </header>

      <div className="react-signal-strip">
        <span>共享 signal 次數：{signal.count}</span>
        <span>{signal.message}</span>
        {'source' in signal ? <span>來源：{signal.source}</span> : null}
      </div>

      <div className="react-panel-grid">
        {panels.map((panel) => {
          if (!runtime.visiblePanels[panel.name]) {
            return null
          }

          return <PanelMountBoundary key={panel.name} panel={panel} world={world} />
        })}
      </div>
    </section>
  )
}

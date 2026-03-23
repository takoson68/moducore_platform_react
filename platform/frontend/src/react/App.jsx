import { useEffect } from 'react'
import { useObservableSnapshot } from './useObservableSnapshot.js'
import { reactWorld } from './reactWorld.js'
import { getProjectLayout } from '@project/layout/index.js'

function PanelMountBoundary({ panel }) {
  const PanelComponent = panel.Component

  useEffect(() => {
    reactWorld.recordLifecycle(`module:render-request:${panel.name}`)
  }, [panel.name])

  return <PanelComponent world={reactWorld} />
}

function WelcomePage() {
  const runtime = useObservableSnapshot(reactWorld)
  const signal = useObservableSnapshot(reactWorld.signalStore())
  const panels = reactWorld.getPanels()

  return (
    <section className="react-page">
      <header className="react-page__header">
        <div>
          <p className="react-eyebrow">React 驗證入口</p>
          <h1>歡迎頁面</h1>
          <p className="react-copy">
            這裡驗證 container、module runtime、signal 與 lifecycle 是否能在 React runtime 下運作。
          </p>
        </div>
        <div className="react-actions">
          <button type="button" onClick={() => reactWorld.signalStore().increment()}>
            更新共享 signal
          </button>
          <button
            type="button"
            className="react-actions__ghost"
            onClick={() => reactWorld.togglePanel('status-panel')}
          >
            {runtime.visiblePanels['status-panel'] ? '卸載 status-panel' : '重新掛載 status-panel'}
          </button>
        </div>
      </header>

      <div className="react-signal-strip">
        <span>共享計數：{signal.count}</span>
        <span>{signal.message}</span>
      </div>

      <div className="react-panel-grid">
        {panels.map((panel) => {
          if (!runtime.visiblePanels[panel.name]) {
            return null
          }

          return <PanelMountBoundary key={panel.name} panel={panel} />
        })}
      </div>
    </section>
  )
}

function LifecyclePage() {
  const lifecycle = useObservableSnapshot(reactWorld.lifecycleStore())
  const runtime = useObservableSnapshot(reactWorld)

  return (
    <section className="react-page">
      <header className="react-page__header">
        <div>
          <p className="react-eyebrow">Lifecycle 診斷</p>
          <h1>模組掛載紀錄</h1>
          <p className="react-copy">
            這裡顯示 React runtime 目前記錄到的 mount / unmount 與 runtime 事件。
          </p>
        </div>
      </header>

      <div className="react-diagnostics">
        <article className="react-card">
          <h2>目前 route</h2>
          <p>{runtime.route}</p>
        </article>
        <article className="react-card">
          <h2>已宣告模組</h2>
          <ul>
            {runtime.discoveredModules.map((entry) => (
              <li key={entry.name}>{entry.name}</li>
            ))}
          </ul>
        </article>
        <article className="react-card react-card--wide">
          <h2>Lifecycle Events</h2>
          <ul className="react-event-list">
            {lifecycle.events.map((entry) => (
              <li key={entry.id}>
                <strong>{entry.event}</strong>
                <span>{entry.at}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}

export default function App() {
  const runtime = useObservableSnapshot(reactWorld)
  const Layout = getProjectLayout()
  const route = reactWorld.getRouteDescriptor(runtime.route)

  let page = <WelcomePage />
  if (route?.page === 'lifecycle') {
    page = <LifecyclePage />
  }

  return <Layout world={reactWorld}>{page}</Layout>
}

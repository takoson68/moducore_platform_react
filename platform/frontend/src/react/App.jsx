import { Suspense } from 'react'
import { useObservableSnapshot } from './useObservableSnapshot.js'
import { reactWorld } from './reactWorld.js'
import { getProjectLayout, getProjectPages } from '@project/layout/index.js'

function PanelMountBoundary({ panel }) {
  const PanelComponent = panel.Component

  return <PanelComponent world={reactWorld} />
}

function WelcomePage() {
  const runtime = useObservableSnapshot(reactWorld)
  const signalStore = reactWorld.hasStore('welcomeSharedSignal')
    ? reactWorld.store('welcomeSharedSignal')
    : reactWorld.signalStore()
  const signal = useObservableSnapshot(signalStore)
  const panels = reactWorld.getPanels()

  return (
    <section className="react-page">
      <header className="react-page__header">
        <div>
          <p className="react-eyebrow">React 驗證入口</p>
          <h1>歡迎頁面</h1>
          <p className="react-copy">
            這裡只保留最小驗證：container、module runtime，以及 `_storeFactory.js` 建出的 store 是否能驅動畫面重渲染。
          </p>
        </div>
        <div className="react-actions">
          <button type="button" onClick={() => signalStore.increment()}>
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
        {'source' in signal ? <span>來源：{signal.source}</span> : null}
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

export default function App() {
  const runtime = useObservableSnapshot(reactWorld)
  const Layout = getProjectLayout()
  const pages = getProjectPages()
  const route = reactWorld.getRouteDescriptor(runtime.route)

  const defaultPages = {
    welcome: WelcomePage
  }
  const PageComponent = route?.Component || pages?.[route?.page] || defaultPages[route?.page] || defaultPages.welcome

  return (
    <Layout world={reactWorld}>
      <Suspense fallback={<section className="react-page"><p className="react-copy">頁面載入中...</p></section>}>
        <PageComponent world={reactWorld} />
      </Suspense>
    </Layout>
  )
}

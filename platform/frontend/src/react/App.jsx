import { Suspense } from 'react'
import { useObservableSnapshot } from './useObservableSnapshot.js'
import { reactWorld } from './reactWorld.js'
import { getProjectLayout, getProjectPages } from '@project/layout/index.js'

function MissingPage() {
  return (
    <section className="react-page">
      <header className="react-page__header">
        <div>
          <p className="react-eyebrow">Route Fallback</p>
          <h1>找不到對應頁面</h1>
          <p className="react-copy">
            目前 route 沒有對應到 module page 或 project page，請檢查 `routes.js` 與 project `layout/` 的頁面註冊。
          </p>
        </div>
      </header>
    </section>
  )
}

function LoadingPage() {
  return (
    <section className="react-page">
      <p className="react-copy">頁面載入中...</p>
    </section>
  )
}

export default function App() {
  const runtime = useObservableSnapshot(reactWorld)
  const Layout = getProjectLayout()
  const pages = getProjectPages()
  const route = reactWorld.getRouteDescriptor(runtime.route)
  const PageComponent = route?.Component || pages?.[route?.page] || pages?.welcome || MissingPage

  return (
    <Layout world={reactWorld}>
      <Suspense fallback={<LoadingPage />}>
        <PageComponent world={reactWorld} />
      </Suspense>
    </Layout>
  )
}

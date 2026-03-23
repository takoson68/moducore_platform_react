import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { reactWorld } from './reactWorld.js'
import '@project/styles/sass/main.sass'

export async function startReactApp({ projectConfig }) {
  await reactWorld.start({ projectConfig })

  if (typeof document !== 'undefined') {
    document.title = projectConfig?.title || 'ModuCore Platform'
    document.documentElement.lang = 'zh-Hant'
  }

  const rootElement = document.getElementById('app')
  if (!rootElement) {
    throw new Error('[ReactRuntime] #app not found')
  }

  const root = createRoot(rootElement)
  root.render(<App />)
}

import { HelloPanel } from './components/HelloPanel.jsx'
import { routes } from './routes.js'
import { stores } from './store.js'

export default {
  name: 'hello-panel',
  setup: {
    stores,
    routes,
    // 提供跨模組能力
    panels: [
      {
        name: 'hello-panel',
        title: 'Hello Panel',
        targets: ['hello-welcome'],
        Component: HelloPanel
      }
    ]
  }
}

import { StatusPanel } from './components/StatusPanel.jsx'
import { routes } from './routes.js'

export default {
  name: 'status-panel',
  setup: {
    routes,
    // 提供跨模組能力
    panels: [
      {
        name: 'status-panel',
        title: 'Status Panel',
        targets: ['hello-welcome'],
        Component: StatusPanel
      }
    ]
  }
}

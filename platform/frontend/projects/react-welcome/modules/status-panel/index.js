import { StatusPanel } from './StatusPanel.jsx'
import { routes } from './routes.js'

export default {
  name: 'status-panel',
  routes,
  panels: [
    {
      name: 'status-panel',
      title: 'Status Panel',
      Component: StatusPanel
    }
  ]
}

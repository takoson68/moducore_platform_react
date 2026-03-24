import { HelloPanel } from './HelloPanel.jsx'
import { routes } from './routes.js'
import { stores } from './store.js'

export default {
  name: 'hello-panel',
  stores,
  routes,
  panels: [
    {
      name: 'hello-panel',
      title: 'Hello Panel',
      Component: HelloPanel
    }
  ]
}

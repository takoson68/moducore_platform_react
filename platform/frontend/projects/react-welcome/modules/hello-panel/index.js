import { HelloPanel } from './HelloPanel.jsx'
import { createWelcomeSharedSignalStore } from './createWelcomeSharedSignalStore.js'
import { routes } from './routes.js'

export default {
  name: 'hello-panel',
  setup: {
    stores: {
      welcomeSharedSignal: createWelcomeSharedSignalStore
    },
    routes,
    panels: [
      {
        name: 'hello-panel',
        title: 'Hello Panel',
        Component: HelloPanel
      }
    ]
  }
}

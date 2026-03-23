import { HelloPanel } from './HelloPanel.jsx'

export default {
  name: 'hello-panel',
  setup: {
    panels: [
      {
        name: 'hello-panel',
        title: 'Hello Panel',
        Component: HelloPanel
      }
    ]
  }
}

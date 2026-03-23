import { StatusPanel } from './StatusPanel.jsx'

export default {
  name: 'status-panel',
  setup: {
    panels: [
      {
        name: 'status-panel',
        title: 'Status Panel',
        Component: StatusPanel
      }
    ]
  }
}

import { CapabilitiesPanel } from './CapabilitiesPanel.jsx'
import { routes } from './routes.js'

export default {
  name: 'platform-capabilities',
  setup: {
    routes,
    panels: [
      {
        name: 'platform-capabilities',
        title: 'Platform Capabilities',
        Component: CapabilitiesPanel
      }
    ]
  }
}

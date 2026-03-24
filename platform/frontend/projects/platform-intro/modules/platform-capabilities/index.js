import { CapabilitiesPanel } from './CapabilitiesPanel.jsx'
import { routes } from './routes.js'

export default {
  name: 'platform-capabilities',
  setup: {
    routes,
    // 提供跨模組能力
    panels: [
      {
        name: 'platform-capabilities',
        title: 'Platform Capabilities',
        targets: ['platform-intro-home'],
        Component: CapabilitiesPanel
      }
    ]
  }
}

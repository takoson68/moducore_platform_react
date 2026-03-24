import { StoryPanel } from './StoryPanel.jsx'
import { routes } from './routes.js'

export default {
  name: 'platform-story',
  setup: {
    routes,
    // 提供跨模組能力
    panels: [
      {
        name: 'platform-story',
        title: 'Platform Story',
        targets: ['platform-intro-home'],
        Component: StoryPanel
      }
    ]
  }
}

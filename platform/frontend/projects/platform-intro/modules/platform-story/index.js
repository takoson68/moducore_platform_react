import { StoryPanel } from './StoryPanel.jsx'
import { routes } from './routes.js'

export default {
  name: 'platform-story',
  routes,
  panels: [
    {
      name: 'platform-story',
      title: 'Platform Story',
      Component: StoryPanel
    }
  ]
}

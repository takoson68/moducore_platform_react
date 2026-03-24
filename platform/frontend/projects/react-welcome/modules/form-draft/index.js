import { FormDraftPanel } from './components/FormDraftPanel.jsx'
import { routes } from './routes.js'
import { stores } from './store.js'

export default {
  name: 'form-draft',
  setup: {
    stores,
    routes,
    // 提供跨模組能力
    panels: [
      {
        name: 'form-draft',
        title: 'Form Draft',
        targets: ['hello-welcome'],
        Component: FormDraftPanel
      }
    ]
  }
}

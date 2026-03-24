import { FormDraftPanel } from './FormDraftPanel.jsx'
import { routes } from './routes.js'
import { stores } from './store.js'

export default {
  name: 'form-draft',
  stores,
  routes,
  panels: [
    {
      name: 'form-draft',
      title: 'Form Draft',
      Component: FormDraftPanel
    }
  ]
}

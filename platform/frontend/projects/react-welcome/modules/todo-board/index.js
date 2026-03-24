import { TodoBoardPanel } from './TodoBoardPanel.jsx'
import { routes } from './routes.js'
import { stores } from './store.js'

export default {
  name: 'todo-board',
  stores,
  routes,
  panels: [
    {
      name: 'todo-board',
      title: 'Todo Board',
      Component: TodoBoardPanel
    }
  ]
}

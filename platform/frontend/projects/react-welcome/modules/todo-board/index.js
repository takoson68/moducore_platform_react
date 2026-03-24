import { TodoBoardPanel } from './components/TodoBoardPanel.jsx'
import { routes } from './routes.js'
import { stores } from './store.js'

export default {
  name: 'todo-board',
  setup: {
    stores,
    routes,
    // 提供跨模組能力
    panels: [
      {
        name: 'todo-board',
        title: 'Todo Board',
        targets: ['hello-welcome'],
        Component: TodoBoardPanel
      }
    ]
  }
}

export const routes = [
  {
    path: '/todos',
    page: 'todos',
    component: () => import('./pages/TodoPage.jsx'),
    meta: {
      nav: {
        label: '待辦清單',
        order: 20
      },
      access: {
        public: true,
        auth: false
      }
    }
  }
]

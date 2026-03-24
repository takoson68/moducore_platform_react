export const routes = [
  {
    path: '/status',
    page: 'status',
    component: () => import('./pages/StatusPage.jsx'),
    meta: {
      nav: {
        label: '狀態頁',
        order: 10
      },
      access: {
        public: true,
        auth: false
      }
    }
  }
]

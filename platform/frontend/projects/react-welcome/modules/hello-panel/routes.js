export const routes = [
  {
    path: '/welcome',
    page: 'welcome',
    component: () => import('./pages/HelloWelcomePage.jsx'),
    meta: {
      nav: {
        label: '模組首頁',
        order: 0
      },
      access: {
        public: true,
        auth: false
      }
    }
  }
]

export const routes = [
  {
    path: '/form-draft',
    page: 'form-draft',
    component: () => import('./pages/FormDraftPage.jsx'),
    meta: {
      nav: {
        label: '表單草稿',
        order: 30
      },
      access: {
        public: true,
        auth: false
      }
    }
  }
]

export default {
  name: 'platform-intro',
  title: 'ModuCore Platform Intro',
  tenant_id: 'platform-intro',
  uiRuntime: 'react',
  defaultRoute: '/overview',
  modules: ['platform-story', 'platform-capabilities'],
  description: '用 2 到 3 頁介紹 ModuCore Platform 特色的 React 專案。',
  scenario: '驗證 project 切換能力，同時提供平台簡介頁面。',
  skills: [],
  constraints: [
    '維持 React-only 平台',
    '內容以平台介紹為主',
    '不接商業流程'
  ]
}

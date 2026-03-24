export default {
  name: 'react-welcome',
  title: 'React Welcome Validation',
  tenant_id: 'react-welcome',
  uiRuntime: 'react',
  modules: ['hello-panel', 'status-panel', 'todo-board', 'form-draft'],
  description: 'React 驗證專案第一階段，驗證平台核心概念能否以 React runtime 接入。',
  scenario: '使用歡迎頁面驗證 module registration 與共享 store signal 更新。',
  skills: [],
  constraints: [
    '保留平台結構語意',
    'React 不直接污染 container 核心',
    '不接商業 API 與 auth 流程'
  ]
}

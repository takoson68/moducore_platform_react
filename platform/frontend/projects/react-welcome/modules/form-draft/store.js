import { createStore } from '@/core'

const defaultDraft = {
  title: '',
  description: '',
  category: 'general',
  isPublished: false
}

export function createFormDraftStore() {
  return createStore({
    name: 'formDraftStore',
    storageKey: 'react-welcome.formDraft',
    defaultValue: {
      fields: { ...defaultDraft },
      lastSavedAt: null,
      lastAction: '初始化表單草稿'
    },
    actions: {
      updateField(store, field, value) {
        const snapshot = store.get()
        store.patch({
          fields: {
            ...snapshot.fields,
            [field]: value
          },
          lastAction: `更新欄位：${field}`
        })
      },
      saveDraft(store) {
        store.patch({
          lastSavedAt: new Date().toISOString(),
          lastAction: '儲存草稿'
        })
      },
      resetDraft(store) {
        store.set({
          fields: { ...defaultDraft },
          lastSavedAt: null,
          lastAction: '重置草稿'
        })
      }
    }
  })
}

export const stores = {
  formDraft: createFormDraftStore
}

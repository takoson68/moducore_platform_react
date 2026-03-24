import { createStore } from '@/core'

function createId() {
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return `todo-${globalThis.crypto.randomUUID()}`
  }

  return `todo-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

function createTodoItem(title) {
  return {
    id: createId(),
    title,
    completed: false,
    createdAt: new Date().toISOString()
  }
}

function normalizeTitle(title) {
  return String(title || '').trim()
}

export function createTodoBoardStore() {
  return createStore({
    name: 'todoBoardStore',
    storageKey: 'react-welcome.todoBoard',
    defaultValue: {
      draft: '',
      items: [
        createTodoItem('確認 store 會驅動畫面重新渲染'),
        createTodoItem('驗證多個元件可同時訂閱同一份 store')
      ],
      lastAction: '初始化 todo store'
    },
    actions: {
      setDraft(store, draft) {
        store.patch({ draft })
      },
      addTodo(store, rawTitle) {
        const title = normalizeTitle(rawTitle ?? store.get().draft)
        if (!title) return

        const snapshot = store.get()
        store.patch({
          draft: '',
          items: [...snapshot.items, createTodoItem(title)],
          lastAction: `新增項目：${title}`
        })
      },
      toggleTodo(store, id) {
        const snapshot = store.get()
        const nextItems = snapshot.items.map((item) =>
          item.id === id ? { ...item, completed: !item.completed } : item
        )
        const target = nextItems.find((item) => item.id === id)

        store.patch({
          items: nextItems,
          lastAction: target
            ? `${target.completed ? '完成' : '取消完成'}：${target.title}`
            : snapshot.lastAction
        })
      },
      removeTodo(store, id) {
        const snapshot = store.get()
        const target = snapshot.items.find((item) => item.id === id)

        store.patch({
          items: snapshot.items.filter((item) => item.id !== id),
          lastAction: target ? `刪除項目：${target.title}` : snapshot.lastAction
        })
      },
      clearCompleted(store) {
        const snapshot = store.get()
        const completedCount = snapshot.items.filter((item) => item.completed).length

        store.patch({
          items: snapshot.items.filter((item) => !item.completed),
          lastAction: completedCount > 0 ? `清除已完成項目 ${completedCount} 筆` : '沒有可清除的已完成項目'
        })
      },
      resetDemo(store) {
        store.clear()
        store.patch({
          lastAction: '重置為預設示範資料'
        })
      }
    }
  })
}

export const stores = {
  todoBoard: createTodoBoardStore
}

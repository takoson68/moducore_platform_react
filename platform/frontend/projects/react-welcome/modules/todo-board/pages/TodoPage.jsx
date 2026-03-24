function TodoComposer({ todoStore, draft }) {
  return (
    <div className="react-card">
      <p className="react-eyebrow">store write test</p>
      <h2>新增 Todo</h2>
      <div className="react-actions">
        <input
          value={draft}
          placeholder="輸入要測試的 todo"
          onChange={(event) => todoStore.setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              todoStore.addTodo()
            }
          }}
        />
        <button type="button" onClick={() => todoStore.addTodo()}>
          新增
        </button>
      </div>
    </div>
  )
}

function TodoList({ items, todoStore }) {
  return (
    <article className="react-card">
      <p className="react-eyebrow">reactive list</p>
      <h2>Todo List</h2>
      <ul className="react-status-list">
        {items.map((item) => (
          <li key={item.id}>
            <div>
              <strong>{item.title}</strong>
              <div>{item.completed ? '已完成' : '未完成'}</div>
            </div>
            <div className="react-actions">
              <button type="button" onClick={() => todoStore.toggleTodo(item.id)}>
                {item.completed ? '取消完成' : '完成'}
              </button>
              <button
                type="button"
                className="react-actions__ghost"
                onClick={() => todoStore.removeTodo(item.id)}
              >
                刪除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </article>
  )
}

function TodoInspector({ state }) {
  const total = state.items.length
  const completed = state.items.filter((item) => item.completed).length

  return (
    <article className="react-card">
      <p className="react-eyebrow">store inspector</p>
      <h2>Store 狀態觀察</h2>
      <dl className="react-status-list">
        <div>
          <dt>總筆數</dt>
          <dd>{total}</dd>
        </div>
        <div>
          <dt>已完成</dt>
          <dd>{completed}</dd>
        </div>
        <div>
          <dt>未完成</dt>
          <dd>{total - completed}</dd>
        </div>
        <div>
          <dt>最近操作</dt>
          <dd>{state.lastAction}</dd>
        </div>
      </dl>
    </article>
  )
}

export function TodoPage({ world }) {
  const todoStore = world.store('todoBoard')
  const todoState = todoStore.useStore()

  return (
    <section className="react-page">
      <header className="react-page__header">
        <div>
          <p className="react-eyebrow">todo-board route</p>
          <h1>Todo List 測試頁</h1>
          <p className="react-copy">
            這個頁面用來驗證 `_storeFactory.js` 的 React 響應能力、`patch()` 更新、`clear()` 重置，以及 `localStorage` 持久化。
          </p>
        </div>
        <div className="react-actions">
          <button type="button" onClick={() => todoStore.clearCompleted()}>
            清除已完成
          </button>
          <button type="button" className="react-actions__ghost" onClick={() => todoStore.resetDemo()}>
            重置示範資料
          </button>
        </div>
      </header>

      <div className="react-panel-grid">
        <TodoComposer todoStore={todoStore} draft={todoState.draft} />
        <TodoInspector state={todoState} />
        <TodoList items={todoState.items} todoStore={todoStore} />
      </div>
    </section>
  )
}

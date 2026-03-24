function TodoStats({ items }) {
  const total = items.length
  const completed = items.filter((item) => item.completed).length
  const pending = total - completed

  return (
    <dl className="react-status-list">
      <div>
        <dt>總數</dt>
        <dd>{total}</dd>
      </div>
      <div>
        <dt>未完成</dt>
        <dd>{pending}</dd>
      </div>
      <div>
        <dt>已完成</dt>
        <dd>{completed}</dd>
      </div>
    </dl>
  )
}

export function TodoBoardPanel({ world }) {
  const todoStore = world.store('todoBoard')
  const todoState = todoStore.useStore()

  return (
    <article className="react-card">
      <p className="react-eyebrow">todo-board</p>
      <h2>Todo Store 摘要</h2>
      <p className="react-copy">
        這個面板與 Todo 頁面共用同一份 store。當頁面新增、切換或刪除項目時，這裡會同步更新。
      </p>

      <TodoStats items={todoState.items} />

      <div className="react-signal-strip">
        <span>Draft：{todoState.draft || '目前為空'}</span>
        <span>{todoState.lastAction}</span>
      </div>
    </article>
  )
}

export function FormDraftPanel({ world }) {
  const draftStore = world.store('formDraft')
  const draftState = draftStore.useStore()
  const { fields, lastSavedAt, lastAction } = draftState

  return (
    <article className="react-card">
      <p className="react-eyebrow">form-draft</p>
      <h2>草稿摘要</h2>
      <dl className="react-status-list">
        <div>
          <dt>標題</dt>
          <dd>{fields.title || '尚未填寫'}</dd>
        </div>
        <div>
          <dt>分類</dt>
          <dd>{fields.category}</dd>
        </div>
        <div>
          <dt>公開狀態</dt>
          <dd>{fields.isPublished ? '已公開' : '草稿中'}</dd>
        </div>
        <div>
          <dt>最近儲存</dt>
          <dd>{lastSavedAt || '尚未儲存'}</dd>
        </div>
        <div>
          <dt>最近操作</dt>
          <dd>{lastAction}</dd>
        </div>
      </dl>
    </article>
  )
}

function DraftPreview({ fields }) {
  return (
    <article className="react-card">
      <p className="react-eyebrow">live preview</p>
      <h2>即時預覽</h2>
      <dl className="react-status-list">
        <div>
          <dt>標題</dt>
          <dd>{fields.title || '尚未填寫'}</dd>
        </div>
        <div>
          <dt>內容</dt>
          <dd>{fields.description || '尚未填寫'}</dd>
        </div>
        <div>
          <dt>分類</dt>
          <dd>{fields.category}</dd>
        </div>
        <div>
          <dt>公開狀態</dt>
          <dd>{fields.isPublished ? '已公開' : '草稿中'}</dd>
        </div>
      </dl>
    </article>
  )
}

export default function FormDraftPage({ world }) {
  const draftStore = world.store('formDraft')
  const draftState = draftStore.useStore()
  const { fields, lastSavedAt, lastAction } = draftState

  return (
    <section className="react-page">
      <header className="react-page__header">
        <div>
          <p className="react-eyebrow">form-draft route</p>
          <h1>表單草稿測試頁</h1>
          <p className="react-copy">
            這個頁面用來測試 `_storeFactory.js` 的欄位局部更新、React 響應更新，以及 `storageKey` 持久化。
          </p>
        </div>
        <div className="react-actions">
          <button type="button" onClick={() => draftStore.saveDraft()}>
            儲存草稿
          </button>
          <button type="button" className="react-actions__ghost" onClick={() => draftStore.resetDraft()}>
            重置
          </button>
        </div>
      </header>

      <div className="react-panel-grid">
        <article className="react-card">
          <p className="react-eyebrow">field patching</p>
          <h2>草稿編輯</h2>
          <div className="react-status-list">
            <label>
              <div>標題</div>
              <input
                value={fields.title}
                onChange={(event) => draftStore.updateField('title', event.target.value)}
              />
            </label>
            <label>
              <div>內容</div>
              <textarea
                value={fields.description}
                onChange={(event) => draftStore.updateField('description', event.target.value)}
              />
            </label>
            <label>
              <div>分類</div>
              <select
                value={fields.category}
                onChange={(event) => draftStore.updateField('category', event.target.value)}
              >
                <option value="general">general</option>
                <option value="announcement">announcement</option>
                <option value="internal">internal</option>
              </select>
            </label>
            <label>
              <input
                type="checkbox"
                checked={fields.isPublished}
                onChange={(event) => draftStore.updateField('isPublished', event.target.checked)}
              />
              <span>設為公開</span>
            </label>
          </div>
        </article>

        <DraftPreview fields={fields} />

        <article className="react-card">
          <p className="react-eyebrow">store state</p>
          <h2>狀態觀察</h2>
          <dl className="react-status-list">
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
      </div>
    </section>
  )
}

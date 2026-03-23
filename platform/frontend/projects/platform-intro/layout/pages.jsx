function SectionCard({ title, children }) {
  return (
    <article className="intro-card">
      <h2>{title}</h2>
      <div className="intro-card__body">{children}</div>
    </article>
  )
}

export function OverviewPage() {
  return (
    <section className="intro-page">
      <SectionCard title="平台是什麼">
        <p>
          ModuCore Platform 把世界治理、工程結構與專案實例拆開管理，讓新專案不是從零堆功能，而是在既有邊界上快速生成。
        </p>
      </SectionCard>
      <SectionCard title="平台特色">
        <ul className="intro-list">
          <li>以世界規則先行，避免專案一路長歪。</li>
          <li>能力可插拔，讓 container、boot、module runtime 可以被穩定沿用。</li>
          <li>專案層只處理自己的內容，不反向污染核心與治理層。</li>
        </ul>
      </SectionCard>
    </section>
  )
}

export function CapabilitiesPage() {
  return (
    <section className="intro-page intro-page--split">
      <SectionCard title="核心能力">
        <ul className="intro-list">
          <li>Container：集中註冊與取得能力。</li>
          <li>Boot：整理啟動順序，避免專案各自亂接。</li>
          <li>Module Runtime：讓模組能獨立註冊、掛載與替換。</li>
        </ul>
      </SectionCard>
      <SectionCard title="React-only 前端">
        <p>
          現在前端平台已收斂成 React-only，project 切換只需改 `VITE_PROJECT`，不再同時維護 Vue 與 React 的雙軌邏輯。
        </p>
      </SectionCard>
    </section>
  )
}

export function WorkflowPage() {
  return (
    <section className="intro-page">
      <SectionCard title="導入流程">
        <ol className="intro-list intro-list--ordered">
          <li>先定義世界與工程規則，確認結構邊界。</li>
          <li>再建立 project instance，選擇要用的模組與頁面。</li>
          <li>最後以 React runtime 接入，完成 build 與發佈。</li>
        </ol>
      </SectionCard>
      <SectionCard title="適合的使用情境">
        <p>
          適合需要多專案、長期維護、希望 AI 與人類共同開發但又不想讓架構快速漂移的團隊。
        </p>
      </SectionCard>
    </section>
  )
}

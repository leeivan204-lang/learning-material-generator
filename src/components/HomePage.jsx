import '../styles/HomePage.css'

export default function HomePage({ onSelectDiary, onSelectWorksheet }) {
  return (
    <div className="home-page">
      <div className="container">
        <div className="header">
          <h1>📚 特教學習單與小日記產生器</h1>
          <p>幫助特教老師快速生成符合學生需求的教材</p>
        </div>

        <div className="options">
          <div className="option-card" onClick={onSelectDiary}>
            <div className="icon">📖</div>
            <h2>小日記</h2>
            <p>A4 橫切 4 等分</p>
            <p className="size">18cm × 7cm</p>
            <div className="topics">
              <span>圖像邏輯推理</span>
              <span>實用語文</span>
              <span>實用數學</span>
            </div>
            <button className="btn-select">開始製作</button>
          </div>

          <div className="option-card" onClick={onSelectWorksheet}>
            <div className="icon">📝</div>
            <h2>學習單</h2>
            <p>A4 標準尺寸</p>
            <p className="size">21cm × 29.7cm</p>
            <div className="topics">
              <span>實用語文</span>
              <span>實用數學</span>
              <span>社會適應</span>
            </div>
            <button className="btn-select">開始製作</button>
          </div>
        </div>

        <div className="info-box">
          <h3>ℹ️ 使用說明</h3>
          <ul>
            <li>所有試題均由 AI 自動生成，符合輕度至中度認知功能缺損學生需求</li>
            <li>每月更新時事相關題目，讓教材更貼近學生日常生活</li>
            <li>支援多種答題方式：選擇題、填空題、配對題等</li>
            <li>提供完整答案卷，方便批改</li>
            <li>可直接列印使用，或下載 PDF/Word 進一步編輯</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

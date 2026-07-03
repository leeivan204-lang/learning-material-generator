import { useState } from 'react'
import { generateDiaryContent } from '../lib/geminiAPI'
import { generateDiaryPDF } from '../lib/pdfGenerator'
import '../styles/Generator.css'

const DIARY_TOPICS = [
  { id: 'logic', label: '圖像邏輯推理', emoji: '🧩' },
  { id: 'language', label: '實用語文', emoji: '📖' },
  { id: 'math', label: '實用數學', emoji: '🔢' },
]

export default function DiaryGenerator({ onBack }) {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState(null)
  const [apiKey, setApiKey] = useState('')
  const [showApiModal, setShowApiModal] = useState(false)

  const handleGenerate = async () => {
    if (!apiKey.trim()) {
      setShowApiModal(true)
      return
    }

    if (!selectedTopic) {
      alert('請選擇主題')
      return
    }

    setLoading(true)
    try {
      const result = await generateDiaryContent(selectedTopic, apiKey)
      setContent(result)
    } catch (error) {
      alert('生成失敗: ' + error.message)
    }
    setLoading(false)
  }

  const handleDownloadPDF = () => {
    if (!content) return
    generateDiaryPDF(content, selectedTopic)
  }

  return (
    <div className="generator-page">
      <div className="generator-container">
        <button className="btn-back" onClick={onBack}>← 返回首頁</button>

        <h2>📖 小日記產生器</h2>
        <p>選擇主題，AI 將自動生成符合尺寸的練習內容</p>

        <div className="topic-selector">
          <p className="label">選擇主題：</p>
          <div className="topics">
            {DIARY_TOPICS.map(topic => (
              <button
                key={topic.id}
                className={`topic-btn ${selectedTopic === topic.id ? 'active' : ''}`}
                onClick={() => setSelectedTopic(topic.id)}
              >
                <span className="emoji">{topic.emoji}</span>
                <span>{topic.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="button-group">
          <button
            className="btn-primary"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? '生成中...' : '生成小日記'}
          </button>
        </div>

        {content && (
          <div className="result-box">
            <div className="result-preview">
              <h3>預覽</h3>
              <div className="preview-content">
                {content.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>

            <div className="button-group">
              <button className="btn-secondary" onClick={handleDownloadPDF}>
                📥 下載 PDF
              </button>
            </div>
          </div>
        )}

        {showApiModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>設定 Google Gemini API 金鑰</h3>
              <input
                type="password"
                placeholder="貼上你的 Google Gemini API 金鑰"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="help-text">
                如何取得金鑰？訪問 <a href="https://ai.google.dev" target="_blank" rel="noopener">ai.google.dev</a>
              </p>
              <div className="modal-buttons">
                <button className="btn-secondary" onClick={() => setShowApiModal(false)}>取消</button>
                <button className="btn-primary" onClick={() => {
                  setShowApiModal(false)
                  handleGenerate()
                }}>確認並生成</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

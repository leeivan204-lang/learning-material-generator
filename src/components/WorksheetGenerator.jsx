import { useState } from 'react'
import { generateWorksheetContent } from '../lib/geminiAPI'
import { generateWorksheetPDF, generateWorksheetWord } from '../lib/pdfGenerator'
import '../styles/Generator.css'

const SUBJECTS = [
  { id: 'language', label: '實用語文', emoji: '📖' },
  { id: 'math', label: '實用數學', emoji: '🔢' },
  { id: 'social', label: '社會適應 / 職業認知', emoji: '👨‍💼' },
]

const QUESTION_TYPES = [
  { id: 'multiple', label: '選擇題' },
  { id: 'filling', label: '填空題' },
  { id: 'matching', label: '配對題' },
  { id: 'mixed', label: '混合題型' },
]

export default function WorksheetGenerator({ onBack }) {
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedTypes, setSelectedTypes] = useState([])
  const [questionCount, setQuestionCount] = useState(5)
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState(null)
  const [apiKey, setApiKey] = useState('')
  const [showApiModal, setShowApiModal] = useState(false)

  const toggleQuestionType = (typeId) => {
    setSelectedTypes(prev =>
      prev.includes(typeId)
        ? prev.filter(t => t !== typeId)
        : [...prev, typeId]
    )
  }

  const handleGenerate = async () => {
    if (!apiKey.trim()) {
      setShowApiModal(true)
      return
    }

    if (!selectedSubject) {
      alert('請選擇科目')
      return
    }

    if (selectedTypes.length === 0) {
      alert('請選擇至少一種答題類型')
      return
    }

    setLoading(true)
    try {
      const result = await generateWorksheetContent({
        subject: selectedSubject,
        types: selectedTypes,
        count: questionCount,
        apiKey
      })
      setContent(result)
    } catch (error) {
      alert('生成失敗: ' + error.message)
    }
    setLoading(false)
  }

  const handleDownloadPDF = () => {
    if (!content) return
    generateWorksheetPDF(content, selectedSubject, selectedTypes)
  }

  const handleDownloadWord = () => {
    if (!content) return
    generateWorksheetWord(content, selectedSubject, selectedTypes)
  }

  return (
    <div className="generator-page">
      <div className="generator-container">
        <button className="btn-back" onClick={onBack}>← 返回首頁</button>

        <h2>📝 學習單產生器</h2>
        <p>自訂科目、題目數量和答題類型</p>

        <div className="form-section">
          <label className="form-label">選擇科目：*</label>
          <div className="subject-selector">
            {SUBJECTS.map(subject => (
              <button
                key={subject.id}
                className={`subject-btn ${selectedSubject === subject.id ? 'active' : ''}`}
                onClick={() => setSelectedSubject(subject.id)}
              >
                <span className="emoji">{subject.emoji}</span>
                <span>{subject.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="form-section">
          <label className="form-label">答題類型：* (可複選)</label>
          <div className="type-selector">
            {QUESTION_TYPES.map(type => (
              <label key={type.id} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type.id)}
                  onChange={() => toggleQuestionType(type.id)}
                />
                <span>{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-section">
          <label className="form-label">題目數量：</label>
          <div className="input-group">
            <button onClick={() => setQuestionCount(Math.max(1, questionCount - 1))}>−</button>
            <input
              type="number"
              min="1"
              max="20"
              value={questionCount}
              onChange={(e) => setQuestionCount(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
            />
            <button onClick={() => setQuestionCount(Math.min(20, questionCount + 1))}>+</button>
          </div>
          <p className="help-text">建議 5-10 題最適合特教生</p>
        </div>

        <button
          className="btn-primary"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? '生成中...' : '生成學習單'}
        </button>

        {content && (
          <div className="result-box">
            <div className="result-preview">
              <h3>預覽</h3>
              <div className="preview-content">
                {typeof content === 'string' ? (
                  content.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))
                ) : (
                  <pre>{JSON.stringify(content, null, 2)}</pre>
                )}
              </div>
            </div>

            <div className="download-section">
              <button className="btn-secondary" onClick={handleDownloadPDF}>
                📥 下載 PDF
              </button>
              <button className="btn-secondary" onClick={handleDownloadWord}>
                📥 下載 Word
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

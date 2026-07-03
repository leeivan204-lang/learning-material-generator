import { useState } from 'react'
import './styles/App.css'
import HomePage from './components/HomePage'
import DiaryGenerator from './components/DiaryGenerator'
import WorksheetGenerator from './components/WorksheetGenerator'

export default function App() {
  const [page, setPage] = useState('home') // 'home', 'diary', 'worksheet'

  return (
    <div className="app-container">
      {page === 'home' && (
        <HomePage onSelectDiary={() => setPage('diary')} onSelectWorksheet={() => setPage('worksheet')} />
      )}
      {page === 'diary' && (
        <DiaryGenerator onBack={() => setPage('home')} />
      )}
      {page === 'worksheet' && (
        <WorksheetGenerator onBack={() => setPage('home')} />
      )}
    </div>
  )
}

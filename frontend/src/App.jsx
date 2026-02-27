import { useState, useCallback } from 'react'
import './index.css'
import Navbar      from './components/shared/Navbar'
import Sidebar     from './components/shared/Sidebar'
import Dashboard   from './pages/Dashboard'
import Analytics   from './pages/Analytics'
import ChatbotPage from './pages/ChatbotPage'
import EnergyPage  from './pages/EnergyPage'
import WastePage   from './pages/WastePage'
import PaperPage   from './pages/PaperPage'

export default function App() {
  const [page, setPage]           = useState('dashboard')
  const [loading, setLoading]     = useState(false)
  const [lastUpdated, setUpdated] = useState(new Date().toLocaleTimeString())
  const [refreshKey, setKey]      = useState(0)

  const handleRefresh = useCallback(() => {
    setLoading(true)
    setKey(k => k + 1)
    setUpdated(new Date().toLocaleTimeString())
    setTimeout(() => setLoading(false), 1200)
  }, [])

  const pages = {
    dashboard: <Dashboard   key={refreshKey} />,
    analytics: <Analytics   key={refreshKey} />,
    chatbot:   <ChatbotPage key={refreshKey} />,
    energy:    <EnergyPage  key={refreshKey} />,
    waste:     <WastePage   key={refreshKey} />,
    paper:     <PaperPage   key={refreshKey} />,
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', minHeight:'100vh' }}>
      <Navbar onRefresh={handleRefresh} loading={loading} lastUpdated={lastUpdated} />
      <div style={{ display:'flex', flex:1 }}>
        <Sidebar active={page} onNavigate={setPage} />
        <main style={{ flex:1, overflowY:'auto', maxHeight:'calc(100vh - 64px)' }}>
          {pages[page] || <Dashboard key={refreshKey} />}
        </main>
      </div>
    </div>
  )
}
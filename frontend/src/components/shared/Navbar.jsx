import { useState } from 'react'
import { RefreshCw, Download, Bell, Leaf, Activity } from 'lucide-react'
import { downloadReport } from '../../services/api'

export default function Navbar({ onRefresh, loading, lastUpdated, alerts = 0 }) {
  const [notif, setNotif] = useState(true)

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 200,
      height: 64,
      background: 'rgba(2,12,6,0.85)',
      borderBottom: '1px solid rgba(0,255,136,0.1)',
      backdropFilter: 'blur(24px)',
      display: 'flex', alignItems: 'center',
      padding: '0 28px', gap: 20,
    }}>
      {/* Logo */}
      <div style={{ display:'flex', alignItems:'center', gap:12, marginRight:'auto' }}>
        <div style={{
          width:40, height:40, borderRadius:12,
          background:'linear-gradient(135deg,#052e16,#22c55e)',
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:'0 0 20px rgba(0,255,136,0.3)',
          position:'relative'
        }}>
          <Leaf size={20} color="#fff" />
          <div style={{ position:'absolute', inset:-1, borderRadius:12, border:'1px solid rgba(0,255,136,0.4)', animation:'borderGlow 3s ease infinite' }} />
        </div>
        <div>
          <div style={{ fontFamily:'Bebas Neue', fontSize:22, letterSpacing:3, color:'#00ff88', lineHeight:1 }}>
            GreenHealth AI
          </div>
          <div style={{ fontFamily:'JetBrains Mono', fontSize:9, color:'rgba(134,239,172,0.5)', letterSpacing:2 }}>
            SUSTAINABILITY INTELLIGENCE PLATFORM
          </div>
        </div>
      </div>

      {/* Live Indicator */}
      <div style={{ display:'flex', alignItems:'center', gap:8, padding:'6px 14px', borderRadius:20, background:'rgba(0,255,136,0.06)', border:'1px solid rgba(0,255,136,0.15)' }}>
        <div className="pulse-dot" style={{ width:7, height:7 }} />
        <span style={{ fontFamily:'JetBrains Mono', fontSize:11, color:'rgba(134,239,172,0.8)' }}>
          LIVE • {lastUpdated || '--:--'}
        </span>
      </div>

      {/* Health Score Pill */}
      <div style={{ display:'flex', alignItems:'center', gap:8, padding:'6px 16px', borderRadius:20, background:'rgba(0,255,136,0.08)', border:'1px solid rgba(0,255,136,0.2)' }}>
        <Activity size={13} color="#00ff88" />
        <span style={{ fontFamily:'JetBrains Mono', fontSize:11, color:'#00ff88' }}>SYSTEM HEALTHY</span>
      </div>

      {/* Actions */}
      <button onClick={onRefresh} className="btn btn-ghost" style={{ padding:'8px 16px', fontSize:12 }}>
        <RefreshCw size={13} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
        Refresh
      </button>

      <button onClick={downloadReport} className="btn btn-primary" style={{ padding:'8px 16px', fontSize:12 }}>
        <Download size={13} />
        Export PDF
      </button>

      <button onClick={() => setNotif(false)} style={{ position:'relative', background:'rgba(0,255,136,0.06)', border:'1px solid rgba(0,255,136,0.2)', borderRadius:10, padding:9, cursor:'pointer' }}>
        <Bell size={16} color="#4ade80" />
        {notif && <span style={{ position:'absolute', top:5, right:5, width:8, height:8, background:'#f87171', borderRadius:'50%', border:'1px solid rgba(2,12,6,0.8)' }} />}
      </button>
    </nav>
  )
}

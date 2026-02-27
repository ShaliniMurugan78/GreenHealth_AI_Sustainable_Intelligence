import { LayoutDashboard, Zap, Trash2, FileText, MessageSquare, BarChart3, Settings, ChevronRight } from 'lucide-react'

const items = [
  { id:'dashboard', icon:LayoutDashboard, label:'Dashboard',  sub:'Overview'  },
  { id:'energy',    icon:Zap,             label:'Energy',     sub:'Tracking'  },
  { id:'waste',     icon:Trash2,          label:'Waste',      sub:'Monitor'   },
  { id:'paper',     icon:FileText,        label:'Paper',      sub:'Usage'     },
  { id:'analytics', icon:BarChart3,       label:'Analytics',  sub:'Insights'  },
  { id:'chatbot',   icon:MessageSquare,   label:'AI Chat',    sub:'Assistant' },
]

export default function Sidebar({ active, onNavigate }) {
  return (
    <aside style={{
      width: 230,
      minHeight: 'calc(100vh - 64px)',
      background: 'rgba(2,8,5,0.7)',
      borderRight: '1px solid rgba(0,255,136,0.07)',
      padding: '20px 12px',
      display: 'flex', flexDirection: 'column', gap: 4,
      backdropFilter: 'blur(20px)',
      position: 'sticky', top: 64, height: 'calc(100vh - 64px)',
      overflowY: 'auto',
    }}>
      {/* Section label */}
      <div style={{ padding:'4px 14px 12px', fontFamily:'JetBrains Mono', fontSize:9, color:'rgba(0,255,136,0.3)', letterSpacing:3 }}>
        MAIN MENU
      </div>

      {items.map(({ id, icon:Icon, label, sub }, i) => (
        <button key={id} onClick={() => onNavigate(id)}
          className={`nav-item ${active === id ? 'active' : ''}`}
          style={{ border:'none', width:'100%', textAlign:'left', background:'none', animationDelay:`${i*0.05}s` }}
        >
          <div style={{
            width:34, height:34, borderRadius:10,
            background: active===id ? 'rgba(0,255,136,0.15)' : 'rgba(0,255,136,0.05)',
            display:'flex', alignItems:'center', justifyContent:'center',
            border: active===id ? '1px solid rgba(0,255,136,0.3)' : '1px solid transparent',
            flexShrink:0, transition:'all 0.2s'
          }}>
            <Icon size={16} color={active===id ? '#00ff88' : 'rgba(134,239,172,0.5)'} />
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:14, fontWeight:600, lineHeight:1.2 }}>{label}</div>
            <div style={{ fontSize:10, fontFamily:'JetBrains Mono', opacity:0.5, lineHeight:1 }}>{sub}</div>
          </div>
          {active===id && <ChevronRight size={13} color="#00ff88" />}
        </button>
      ))}

      {/* Divider */}
      <div style={{ height:1, background:'rgba(0,255,136,0.07)', margin:'12px 4px' }} />

      <button className="nav-item" style={{ border:'none', background:'none', width:'100%', textAlign:'left' }}>
        <div style={{ width:34, height:34, borderRadius:10, background:'rgba(0,255,136,0.05)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Settings size={16} color="rgba(134,239,172,0.5)" />
        </div>
        <div>
          <div style={{ fontSize:14, fontWeight:600 }}>Settings</div>
          <div style={{ fontSize:10, fontFamily:'JetBrains Mono', opacity:0.5 }}>Configure</div>
        </div>
      </button>

      {/* Bottom branding */}
      <div style={{ marginTop:'auto', padding:'16px 10px 4px' }}>
        <div style={{ borderRadius:14, padding:'12px 14px', background:'rgba(0,255,136,0.04)', border:'1px solid rgba(0,255,136,0.08)' }}>
          <div style={{ fontFamily:'Bebas Neue', fontSize:16, letterSpacing:2, color:'rgba(0,255,136,0.7)' }}>GreenHealth AI</div>
          <div style={{ fontFamily:'JetBrains Mono', fontSize:9, color:'rgba(134,239,172,0.3)', marginTop:2 }}>v2.0 • HACKATHON BUILD</div>
        </div>
      </div>
    </aside>
  )
}

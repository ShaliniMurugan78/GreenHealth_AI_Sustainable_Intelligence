import { AlertTriangle, CheckCircle2, XCircle, Bell } from 'lucide-react'

const cfg = {
  success: { icon: <CheckCircle2 size={14} color="#00ff88" />, cls:'alert-success', label:'#00ff88' },
  warning: { icon: <AlertTriangle size={14} color="#fbbf24" />, cls:'alert-warning', label:'#fbbf24' },
  danger:  { icon: <XCircle      size={14} color="#f87171" />, cls:'alert-danger',  label:'#f87171' },
}

export default function AlertPanel({ alerts }) {
  return (
    <div className="card" style={{ padding:24 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
        <div style={{ width:36, height:36, borderRadius:10, background:'rgba(248,113,113,0.1)', border:'1px solid rgba(248,113,113,0.2)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Bell size={17} color="#f87171" />
        </div>
        <div>
          <div style={{ fontFamily:'JetBrains Mono', fontSize:9, color:'rgba(0,255,136,0.4)', letterSpacing:2 }}>REAL-TIME</div>
          <div style={{ fontFamily:'Bebas Neue', fontSize:20, letterSpacing:2, color:'#e2f5e8' }}>SMART ALERTS</div>
        </div>
        <div className="badge badge-red" style={{ marginLeft:'auto' }}>{alerts?.length || 0} ACTIVE</div>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {alerts?.length ? alerts.map((a, i) => {
          const c = cfg[a.type] || cfg.success
          return (
            <div key={i} className={`alert ${c.cls} anim-fadeup`} style={{ animationDelay:`${i*0.08}s` }}>
              <div style={{ marginTop:1 }}>{c.icon}</div>
              <div>
                <div style={{ fontSize:11, fontWeight:700, color:c.label, marginBottom:2, fontFamily:'JetBrains Mono', letterSpacing:0.5 }}>{a.category?.toUpperCase()}</div>
                <div style={{ fontSize:12, color:'rgba(226,245,232,0.8)', lineHeight:1.5 }}>{a.message}</div>
              </div>
            </div>
          )
        }) : (
          <div style={{ textAlign:'center', padding:24, color:'rgba(0,255,136,0.3)', fontFamily:'JetBrains Mono', fontSize:12 }}>ALL CLEAR — NO ALERTS</div>
        )}
      </div>
    </div>
  )
}

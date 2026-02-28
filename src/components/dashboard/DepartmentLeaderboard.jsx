import { Trophy } from 'lucide-react'

const MEDALS = ['🥇','🥈','🥉']

export default function DepartmentLeaderboard({ departments }) {
  const sorted = [...(departments||[])].sort((a,b)=>b.score-a.score)

  return (
    <div className="card" style={{ padding:24 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
        <div style={{ width:36, height:36, borderRadius:10, background:'rgba(251,191,36,0.1)', border:'1px solid rgba(251,191,36,0.2)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Trophy size={17} color="#fbbf24" />
        </div>
        <div>
          <div style={{ fontFamily:'JetBrains Mono', fontSize:9, color:'rgba(0,255,136,0.4)', letterSpacing:2 }}>GREEN</div>
          <div style={{ fontFamily:'Bebas Neue', fontSize:20, letterSpacing:2, color:'#e2f5e8' }}>DEPT LEADERBOARD</div>
        </div>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {sorted.map((d, i) => {
          const color = d.score >= 80 ? '#00ff88' : d.score >= 65 ? '#fbbf24' : '#f87171'
          return (
            <div key={d.department} className="anim-fadeup" style={{ animationDelay:`${i*0.07}s`, display:'flex', alignItems:'center', gap:10,
              padding:'10px 12px', borderRadius:12,
              background: i<3 ? `${color}07` : 'rgba(0,255,136,0.02)',
              border:`1px solid ${i<3 ? color+'20' : 'rgba(0,255,136,0.06)'}`,
              transition:'all 0.2s ease', cursor:'default' }}
              onMouseEnter={e => { e.currentTarget.style.background=`${color}12`; e.currentTarget.style.transform='translateX(4px)' }}
              onMouseLeave={e => { e.currentTarget.style.background=i<3?`${color}07`:'rgba(0,255,136,0.02)'; e.currentTarget.style.transform='translateX(0)' }}
            >
              <span style={{ fontSize:18, width:26, textAlign:'center' }}>{MEDALS[i] || `${i+1}`}</span>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                  <span style={{ fontSize:13, fontWeight:600 }}>{d.department}</span>
                  <span style={{ fontFamily:'Bebas Neue', fontSize:18, letterSpacing:1, color }}>{d.score.toFixed(0)}</span>
                </div>
                <div className="progress-bar" style={{ height:4 }}>
                  <div className="progress-fill" style={{ width:`${d.score}%`, background:`linear-gradient(90deg,${color}60,${color})`, boxShadow:`0 0 6px ${color}40` }} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

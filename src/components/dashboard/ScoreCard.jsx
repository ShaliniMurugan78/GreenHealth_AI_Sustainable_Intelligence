import { useEffect, useState } from 'react'
import { Shield } from 'lucide-react'

function Ring({ score, size = 160 }) {
  const [prog, setProg] = useState(0)
  const r = 60, cx = size/2, cy = size/2
  const circ = 2 * Math.PI * r
  useEffect(() => { const t = setTimeout(() => setProg(score), 500); return () => clearTimeout(t) }, [score])
  const offset = circ - (prog / 100) * circ
  const color  = prog >= 80 ? '#00ff88' : prog >= 60 ? '#fbbf24' : '#f87171'
  const grade  = prog >= 90 ? 'A+' : prog >= 80 ? 'A' : prog >= 70 ? 'B+' : prog >= 60 ? 'B' : 'C'

  return (
    <div style={{ position:'relative', width:size, height:size }}>
      <svg width={size} height={size} style={{ transform:'rotate(-90deg)' }}>
        {/* Track */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(0,255,136,0.06)" strokeWidth={10} />
        {/* Progress */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={10}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition:'stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)', filter:`drop-shadow(0 0 10px ${color})` }}
        />
        {/* Tick marks */}
        {Array.from({length:20},(_,i)=>{
          const a = (i/20)*2*Math.PI, x1=cx+(r+16)*Math.cos(a), y1=cy+(r+16)*Math.sin(a), x2=cx+(r+20)*Math.cos(a), y2=cy+(r+20)*Math.sin(a)
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(0,255,136,0.15)" strokeWidth={1.5} />
        })}
      </svg>
      {/* Center text */}
      <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
        <div style={{ fontFamily:'Bebas Neue', fontSize:44, letterSpacing:1, color, lineHeight:1, textShadow:`0 0 20px ${color}` }}>{prog}</div>
        <div style={{ fontFamily:'JetBrains Mono', fontSize:10, color:'rgba(134,239,172,0.5)', letterSpacing:1 }}>/100</div>
        <div style={{ fontFamily:'Bebas Neue', fontSize:18, color, letterSpacing:2, marginTop:2 }}>{grade}</div>
      </div>
    </div>
  )
}

export default function ScoreCard({ score }) {
  const bars = [
    { label:'⚡ Energy', val: score?.energy_score || 0, color:'#22c55e' },
    { label:'🏥 Waste',  val: score?.waste_score  || 0, color:'#fbbf24' },
    { label:'📄 Paper',  val: score?.paper_score  || 0, color:'#60a5fa' },
  ]

  return (
    <div className="card anim-fadeup" style={{ padding:26 }}>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:22 }}>
        <Shield size={18} color="#00ff88" />
        <div>
          <div style={{ fontFamily:'JetBrains Mono', fontSize:9, color:'rgba(0,255,136,0.4)', letterSpacing:2 }}>OVERALL</div>
          <div style={{ fontFamily:'Bebas Neue', fontSize:20, letterSpacing:2, color:'#e2f5e8' }}>SUSTAINABILITY SCORE</div>
        </div>
      </div>

      <div style={{ display:'flex', alignItems:'center', gap:24 }}>
        <Ring score={score?.score || 0} />
        <div style={{ flex:1, display:'flex', flexDirection:'column', gap:14 }}>
          {bars.map(({ label, val, color }) => (
            <div key={label}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                <span style={{ fontSize:13, fontWeight:500 }}>{label}</span>
                <span style={{ fontFamily:'JetBrains Mono', fontSize:12, color, fontWeight:600 }}>{val.toFixed(1)}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width:`${val}%`, background:`linear-gradient(90deg, ${color}66, ${color})`, boxShadow:`0 0 8px ${color}40` }} />
              </div>
            </div>
          ))}
          {/* Grade badge */}
          <div style={{ marginTop:4 }}>
            <span className="badge badge-green" style={{ fontSize:12, padding:'5px 14px' }}>
              Grade: {score?.grade || '--'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

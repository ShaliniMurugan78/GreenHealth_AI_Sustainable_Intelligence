import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

function Counter({ target }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let start = 0
    const end = Number(target) || 0
    if (!end) return
    const inc = end / 60
    const t = setInterval(() => {
      start += inc
      if (start >= end) { setVal(end); clearInterval(t) }
      else setVal(Math.floor(start))
    }, 23)
    return () => clearInterval(t)
  }, [target])
  return <>{val.toLocaleString()}</>
}

export default function StatCard({ icon, label, value, unit, sub, trend, color, accent, delay = 0 }) {
  const [hovered, setHovered] = useState(false)

  // Accept both 'color' and 'accent' prop names
  const ac = color || accent || '#22c55e'
  const up = trend > 0

  return (
    <div className="card"
      style={{ padding:22, animationDelay:`${delay}ms`, cursor:'default', position:'relative', overflow:'hidden' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow blob */}
      <div style={{
        position:'absolute', top:-30, right:-30,
        width:100, height:100, borderRadius:'50%',
        background:`radial-gradient(circle, ${ac}18 0%, transparent 70%)`,
        transform: hovered ? 'scale(1.5)' : 'scale(1)',
        transition:'all 0.4s ease',
        pointerEvents:'none'
      }} />

      {/* Top row */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
        <div style={{
          width:42, height:42, borderRadius:12,
          background:`${ac}14`, border:`1px solid ${ac}30`,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:20,
          boxShadow: hovered ? `0 0 16px ${ac}30` : 'none',
          transition:'all 0.3s ease'
        }}>
          {icon}
        </div>
        {trend !== undefined && (
          <div style={{ display:'flex', alignItems:'center', gap:4, padding:'4px 10px', borderRadius:20,
            background: up ? 'rgba(248,113,113,0.1)' : 'rgba(34,197,94,0.1)',
            border:`1px solid ${up ? 'rgba(248,113,113,0.25)' : 'rgba(34,197,94,0.25)'}`
          }}>
            {up
              ? <TrendingUp  size={11} color="#f87171" />
              : <TrendingDown size={11} color="#22c55e" />
            }
            <span style={{ fontSize:11, fontFamily:'JetBrains Mono', fontWeight:600, color: up ? '#f87171' : '#22c55e' }}>
              {Math.abs(trend)}%
            </span>
          </div>
        )}
      </div>

      {/* Label */}
      <div style={{ fontFamily:'JetBrains Mono', fontSize:10, color:'rgba(134,239,172,0.45)', letterSpacing:2, marginBottom:6 }}>
        {label.toUpperCase()}
      </div>

      {/* Value */}
      <div style={{ fontFamily:'Syne', fontWeight:800, fontSize:32, color:ac, lineHeight:1, marginBottom:6,
        textShadow: hovered ? `0 0 20px ${ac}60` : 'none',
        transition:'text-shadow 0.3s'
      }}>
        <Counter target={value} />
        <span style={{ fontSize:14, fontWeight:500, marginLeft:4, opacity:0.7 }}>{unit}</span>
      </div>

      {/* Sub */}
      {sub && (
        <div style={{ fontSize:12, color:'rgba(134,239,172,0.45)' }}>{sub}</div>
      )}

      {/* Bottom accent line */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, height:2,
        background:`linear-gradient(90deg, transparent, ${ac}60, transparent)`,
        opacity: hovered ? 1 : 0.3,
        transition:'opacity 0.3s'
      }} />
    </div>
  )
}

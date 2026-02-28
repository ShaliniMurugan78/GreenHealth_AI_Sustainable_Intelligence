import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { Trash2 } from 'lucide-react'

const PALETTE = ['#f87171','#4ade80','#fbbf24']

const Tip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background:'rgba(2,12,6,0.95)', border:'1px solid rgba(0,255,136,0.2)', borderRadius:12, padding:'10px 16px' }}>
      <div style={{ fontSize:12, color: payload[0].payload.fill, fontWeight:600 }}>
        {payload[0].name}: <strong>{payload[0].value} kg</strong>
      </div>
    </div>
  )
}

export default function WasteChart({ waste }) {
  if (!waste) return null
  const data = [
    { name:'Hazardous',  value: waste.hazardous_kg  || 0 },
    { name:'Recyclable', value: waste.recyclable_kg || 0 },
    { name:'General',    value: waste.general_kg    || 0 },
  ]
  return (
    <div className="card" style={{ padding:24 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
        <div style={{ width:36, height:36, borderRadius:10, background:'rgba(251,191,36,0.1)', border:'1px solid rgba(251,191,36,0.25)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Trash2 size={17} color="#fbbf24" />
        </div>
        <div>
          <div style={{ fontFamily:'JetBrains Mono', fontSize:9, color:'rgba(0,255,136,0.4)', letterSpacing:2 }}>BREAKDOWN</div>
          <div style={{ fontFamily:'Bebas Neue', fontSize:20, letterSpacing:2, color:'#e2f5e8' }}>MEDICAL WASTE</div>
        </div>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:16 }}>
        <ResponsiveContainer width="55%" height={150}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={4} dataKey="value" strokeWidth={0}>
              {data.map((_, i) => <Cell key={i} fill={PALETTE[i]} />)}
            </Pie>
            <Tooltip content={<Tip />} />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ flex:1, display:'flex', flexDirection:'column', gap:10 }}>
          {data.map((item, i) => (
            <div key={item.name}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                  <div style={{ width:8, height:8, borderRadius:2, background:PALETTE[i] }} />
                  <span style={{ fontSize:12, color:'rgba(134,239,172,0.7)' }}>{item.name}</span>
                </div>
                <span style={{ fontFamily:'JetBrains Mono', fontSize:12, color:PALETTE[i], fontWeight:600 }}>{item.value}kg</span>
              </div>
              <div className="progress-bar" style={{ height:4 }}>
                <div className="progress-fill" style={{ width:`${(item.value / (waste.total_kg||1)) * 100}%`, background:PALETTE[i], opacity:0.7 }} />
              </div>
            </div>
          ))}
          <div style={{ borderTop:'1px solid rgba(0,255,136,0.08)', paddingTop:10, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontSize:12, color:'rgba(134,239,172,0.6)' }}>Total Today</span>
            <span style={{ fontFamily:'Bebas Neue', fontSize:20, color:'#fbbf24', letterSpacing:1 }}>{waste.total_kg}<span style={{ fontSize:13, opacity:0.7 }}>kg</span></span>
          </div>
        </div>
      </div>
    </div>
  )
}

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Zap } from 'lucide-react'

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background:'rgba(2,12,6,0.95)', border:'1px solid rgba(0,255,136,0.2)', borderRadius:12, padding:'10px 16px', boxShadow:'0 8px 32px rgba(0,0,0,0.4)' }}>
      <div style={{ fontFamily:'JetBrains Mono', fontSize:11, color:'rgba(0,255,136,0.6)', marginBottom:6 }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ display:'flex', justifyContent:'space-between', gap:20, fontSize:12, color: p.color }}>
          <span>{p.name}</span><strong>{p.value?.toLocaleString()} kWh</strong>
        </div>
      ))}
    </div>
  )
}

export default function EnergyChart({ data }) {
  return (
    <div className="card" style={{ padding:24 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
        <div style={{ width:36, height:36, borderRadius:10, background:'rgba(34,197,94,0.12)', border:'1px solid rgba(34,197,94,0.25)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Zap size={17} color="#22c55e" />
        </div>
        <div>
          <div style={{ fontFamily:'JetBrains Mono', fontSize:9, color:'rgba(0,255,136,0.4)', letterSpacing:2 }}>WEEKLY TREND</div>
          <div style={{ fontFamily:'Bebas Neue', fontSize:20, letterSpacing:2, color:'#e2f5e8' }}>ENERGY CONSUMPTION</div>
        </div>
        <div className="badge badge-green" style={{ marginLeft:'auto' }}>kWh</div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top:5, right:5, left:-25, bottom:0 }}>
          <defs>
            <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#00ff88" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#00ff88" stopOpacity={0}    />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,255,136,0.05)" />
          <XAxis dataKey="day" tick={{ fill:'rgba(134,239,172,0.5)', fontSize:11, fontFamily:'JetBrains Mono' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill:'rgba(134,239,172,0.4)', fontSize:10 }} axisLine={false} tickLine={false} />
          <Tooltip content={<Tip />} />
          <Area type="monotone" dataKey="energy" name="Energy" stroke="#00ff88" strokeWidth={2.5}
            fill="url(#energyGrad)" dot={{ fill:'#00ff88', r:4, strokeWidth:0 }}
            activeDot={{ r:6, fill:'#00ff88', boxShadow:'0 0 12px #00ff88' }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

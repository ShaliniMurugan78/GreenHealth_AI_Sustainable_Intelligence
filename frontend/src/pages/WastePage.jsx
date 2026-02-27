import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getLiveWaste } from '../services/api'
import StatCard from '../components/dashboard/StatCard'

const COLORS = ['#ef4444', '#22c55e', '#f59e0b']

export default function WastePage() {
  const [waste, setWaste]     = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getLiveWaste().then(r => setWaste(r.data)).catch(console.error).finally(() => setLoading(false))
    const t = setInterval(() => {
      getLiveWaste().then(r => setWaste(r.data)).catch(() => {})
    }, 30000)
    return () => clearInterval(t)
  }, [])

  const tipStyle = { fill:'#86efac77', fontSize:11, fontFamily:'JetBrains Mono' }

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'60vh', flexDirection:'column', gap:16 }}>
      <div style={{ width:40, height:40, border:'3px solid rgba(34,197,94,0.2)', borderTop:'3px solid #22c55e', borderRadius:'50%', animation:'spin 1s linear infinite' }} />
      <div style={{ color:'#86efac', fontFamily:'JetBrains Mono', fontSize:13 }}>Loading waste data...</div>
    </div>
  )

  const pieData = [
    { name:'Hazardous',  value: waste?.hazardous_kg  },
    { name:'Recyclable', value: waste?.recyclable_kg },
    { name:'General',    value: waste?.general_kg    },
  ]

  return (
    <div style={{ padding:24, display:'flex', flexDirection:'column', gap:20 }}>

      <div>
        <h1 style={{ fontFamily:'Syne', fontWeight:800, fontSize:24, color:'#e2f5e8' }}>🏥 Medical Waste Monitor</h1>
        <p style={{ fontSize:13, color:'#86efac77', marginTop:4 }}>Real-time hospital waste tracking and categorization</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
        <StatCard icon="🏥" label="Total Waste"   value={waste?.total_kg}      unit="kg" sub="Generated today"          color="#f59e0b" delay={0}   />
        <StatCard icon="☣️" label="Hazardous"     value={waste?.hazardous_kg}  unit="kg" sub="Special disposal needed"  color="#ef4444" delay={100} />
        <StatCard icon="♻️" label="Recyclable"    value={waste?.recyclable_kg} unit="kg" sub="Can be recycled"          color="#22c55e" delay={200} />
        <StatCard icon="🗑️" label="General Waste" value={waste?.general_kg}    unit="kg" sub="Regular disposal"         color="#94a3b8" delay={300} />
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:16 }}>
        <StatCard icon="💰" label="Disposal Cost" value={waste?.cost_usd} unit="USD" sub="Today's disposal cost" color="#22c55e" />
        <div className="card" style={{ padding:22, display:'flex', alignItems:'center', gap:16 }}>
          <div style={{ fontSize:36 }}>💡</div>
          <div>
            <div style={{ fontFamily:'Syne', fontWeight:700, fontSize:15, color:'#4ade80', marginBottom:6 }}>Waste Reduction Tip</div>
            <div style={{ fontSize:13, color:'#86efac', lineHeight:1.6 }}>
              Improving waste segregation at source can reduce hazardous waste by up to 30% and significantly cut disposal costs.
            </div>
          </div>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>

        <div className="card" style={{ padding:22 }}>
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:11, color:'#4ade8077', fontFamily:'JetBrains Mono', letterSpacing:1 }}>DISTRIBUTION</div>
            <div style={{ fontFamily:'Syne', fontWeight:700, fontSize:16, color:'#e2f5e8' }}>Waste Breakdown</div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:20 }}>
            <ResponsiveContainer width="55%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background:'rgba(6,15,10,0.95)', border:'1px solid rgba(34,197,94,0.2)', borderRadius:10, color:'#e2f5e8', fontSize:12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex:1, display:'flex', flexDirection:'column', gap:10 }}>
              {pieData.map((item, i) => (
                <div key={item.name}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                      <div style={{ width:8, height:8, borderRadius:2, background:COLORS[i] }} />
                      <span style={{ fontSize:12, color:'#86efac' }}>{item.name}</span>
                    </div>
                    <span style={{ fontSize:12, fontFamily:'JetBrains Mono', color:COLORS[i] }}>{item.value} kg</span>
                  </div>
                  <div style={{ height:4, background:'rgba(255,255,255,0.05)', borderRadius:2 }}>
                    <div style={{ height:'100%', width:`${(item.value/waste?.total_kg)*100}%`, background:COLORS[i], borderRadius:2 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card" style={{ padding:22 }}>
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:11, color:'#4ade8077', fontFamily:'JetBrains Mono', letterSpacing:1 }}>COMPARISON</div>
            <div style={{ fontFamily:'Syne', fontWeight:700, fontSize:16, color:'#e2f5e8' }}>Waste by Category</div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={pieData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,197,94,0.06)" />
              <XAxis dataKey="name" tick={tipStyle} axisLine={false} tickLine={false} />
              <YAxis tick={{ ...tipStyle, fontSize:10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background:'rgba(6,15,10,0.95)', border:'1px solid rgba(34,197,94,0.2)', borderRadius:10, color:'#e2f5e8', fontSize:12 }} />
              <Bar dataKey="value" name="kg" radius={[6,6,0,0]} fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  )
}
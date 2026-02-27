import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getLivePaper, getWeeklyEnergy } from '../services/api'
import StatCard from '../components/dashboard/StatCard'

const COLORS = ['#60a5fa', '#22c55e', '#f59e0b']

export default function PaperPage() {
  const [paper, setPaper]     = useState(null)
  const [weekly, setWeekly]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getLivePaper(), getWeeklyEnergy()])
      .then(([p, w]) => { setPaper(p.data); setWeekly(w.data) })
      .catch(console.error)
      .finally(() => setLoading(false))
    const t = setInterval(() => {
      getLivePaper().then(r => setPaper(r.data)).catch(() => {})
    }, 30000)
    return () => clearInterval(t)
  }, [])

  const tipStyle = { fill:'#86efac77', fontSize:11, fontFamily:'JetBrains Mono' }

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'60vh', flexDirection:'column', gap:16 }}>
      <div style={{ width:40, height:40, border:'3px solid rgba(34,197,94,0.2)', borderTop:'3px solid #22c55e', borderRadius:'50%', animation:'spin 1s linear infinite' }} />
      <div style={{ color:'#86efac', fontFamily:'JetBrains Mono', fontSize:13 }}>Loading paper data...</div>
    </div>
  )

  const pieData = [
    { name:'Admin',    value: paper?.admin_sheets    },
    { name:'Clinical', value: paper?.clinical_sheets },
    { name:'Lab',      value: paper?.lab_sheets      },
  ]

  return (
    <div style={{ padding:24, display:'flex', flexDirection:'column', gap:20 }}>

      <div>
        <h1 style={{ fontFamily:'Syne', fontWeight:800, fontSize:24, color:'#e2f5e8' }}>📄 Paper Usage Tracker</h1>
        <p style={{ fontSize:13, color:'#86efac77', marginTop:4 }}>Monitor and reduce paper consumption across all departments</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
        <StatCard icon="📄" label="Total Sheets"  value={paper?.total_sheets}    unit="sheets" sub="Used today"     color="#60a5fa" delay={0}   />
        <StatCard icon="🏢" label="Admin"          value={paper?.admin_sheets}    unit="sheets" sub="55% of total"  color="#22c55e" delay={100} />
        <StatCard icon="🏥" label="Clinical"       value={paper?.clinical_sheets} unit="sheets" sub="35% of total"  color="#f59e0b" delay={200} />
        <StatCard icon="🔬" label="Lab"            value={paper?.lab_sheets}      unit="sheets" sub="10% of total"  color="#a78bfa" delay={300} />
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:16 }}>
        <StatCard icon="💰" label="Paper Cost" value={paper?.cost_usd} unit="USD" sub="Today's paper cost" color="#22c55e" />
        <div className="card" style={{ padding:22 }}>
          <div style={{ fontFamily:'Syne', fontWeight:700, fontSize:15, color:'#4ade80', marginBottom:12 }}>📊 Digitization Impact</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
            {[
              { label:'Trees Saved',   value:((paper?.total_sheets||0)/8333).toFixed(2), unit:'trees/yr', icon:'🌳' },
              { label:'CO₂ Reduced',   value:((paper?.total_sheets||0)*0.005).toFixed(1), unit:'kg CO₂',  icon:'🌍' },
              { label:'Cost Savings',  value:((paper?.cost_usd||0)*0.4).toFixed(0),       unit:'USD/yr',  icon:'💵' },
            ].map(item => (
              <div key={item.label} style={{ background:'rgba(34,197,94,0.06)', borderRadius:10, padding:12, textAlign:'center' }}>
                <div style={{ fontSize:22, marginBottom:4 }}>{item.icon}</div>
                <div style={{ fontFamily:'Syne', fontWeight:700, fontSize:18, color:'#4ade80' }}>{item.value}</div>
                <div style={{ fontSize:10, color:'#86efac77' }}>{item.unit}</div>
                <div style={{ fontSize:11, color:'#86efac', marginTop:2 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>

        <div className="card" style={{ padding:22 }}>
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:11, color:'#4ade8077', fontFamily:'JetBrains Mono', letterSpacing:1 }}>DISTRIBUTION</div>
            <div style={{ fontFamily:'Syne', fontWeight:700, fontSize:16, color:'#e2f5e8' }}>Paper by Department</div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:20 }}>
            <ResponsiveContainer width="55%" height={180}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
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
                    <span style={{ fontSize:12, fontFamily:'JetBrains Mono', color:COLORS[i] }}>{item.value?.toLocaleString()}</span>
                  </div>
                  <div style={{ height:4, background:'rgba(255,255,255,0.05)', borderRadius:2 }}>
                    <div style={{ height:'100%', width:`${(item.value/paper?.total_sheets)*100}%`, background:COLORS[i], borderRadius:2 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card" style={{ padding:22 }}>
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:11, color:'#4ade8077', fontFamily:'JetBrains Mono', letterSpacing:1 }}>WEEKLY TREND</div>
            <div style={{ fontFamily:'Syne', fontWeight:700, fontSize:16, color:'#e2f5e8' }}>Paper Usage This Week</div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={weekly}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,197,94,0.06)" />
              <XAxis dataKey="day" tick={tipStyle} axisLine={false} tickLine={false} />
              <YAxis tick={{ ...tipStyle, fontSize:10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background:'rgba(6,15,10,0.95)', border:'1px solid rgba(34,197,94,0.2)', borderRadius:10, color:'#e2f5e8', fontSize:12 }} />
              <Line type="monotone" dataKey="paper" name="Sheets" stroke="#60a5fa" strokeWidth={2} dot={{ fill:'#60a5fa', r:4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  )
}
import { useState, useEffect } from 'react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getLiveEnergy, getWeeklyEnergy } from '../services/api'
import StatCard from '../components/dashboard/StatCard'

export default function EnergyPage() {
  const [energy, setEnergy]   = useState(null)
  const [weekly, setWeekly]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getLiveEnergy(), getWeeklyEnergy()])
      .then(([e, w]) => { setEnergy(e.data); setWeekly(w.data) })
      .catch(console.error)
      .finally(() => setLoading(false))
    const t = setInterval(() => {
      getLiveEnergy().then(r => setEnergy(r.data)).catch(() => {})
    }, 30000)
    return () => clearInterval(t)
  }, [])

  const tipStyle = { fill: '#86efac77', fontSize: 11, fontFamily: 'JetBrains Mono' }

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'60vh', flexDirection:'column', gap:16 }}>
      <div style={{ width:40, height:40, border:'3px solid rgba(34,197,94,0.2)', borderTop:'3px solid #22c55e', borderRadius:'50%', animation:'spin 1s linear infinite' }} />
      <div style={{ color:'#86efac', fontFamily:'JetBrains Mono', fontSize:13 }}>Loading energy data...</div>
    </div>
  )

  return (
    <div style={{ padding:24, display:'flex', flexDirection:'column', gap:20 }}>

      <div>
        <h1 style={{ fontFamily:'Syne', fontWeight:800, fontSize:24, color:'#e2f5e8' }}>⚡ Energy Monitoring</h1>
        <p style={{ fontSize:13, color:'#86efac77', marginTop:4 }}>Real-time hospital energy consumption tracking</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
        <StatCard icon="⚡" label="Total Energy"    value={energy?.total_kwh}     unit="kWh" sub="Today's consumption"  color="#22c55e" delay={0}   />
        <StatCard icon="❄️" label="HVAC"            value={energy?.hvac_kwh}      unit="kWh" sub="42% of total"         color="#60a5fa" delay={100} />
        <StatCard icon="💡" label="Lighting"        value={energy?.lighting_kwh}  unit="kWh" sub="28% of total"         color="#f59e0b" delay={200} />
        <StatCard icon="🔌" label="Equipment"       value={energy?.equipment_kwh} unit="kWh" sub="30% of total"         color="#a78bfa" delay={300} />
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:16 }}>
        <StatCard icon="💰" label="Energy Cost"     value={energy?.cost_usd}  unit="USD" sub="Today's expenditure"  color="#22c55e" />
        <StatCard icon="🌍" label="Carbon Emitted"  value={energy?.carbon_kg} unit="kg"  sub="CO₂ equivalent today" color="#f87171" />
      </div>

      <div className="card" style={{ padding:22 }}>
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:11, color:'#4ade8077', fontFamily:'JetBrains Mono', letterSpacing:1 }}>WEEKLY TREND</div>
          <div style={{ fontFamily:'Syne', fontWeight:700, fontSize:16, color:'#e2f5e8' }}>Energy Consumption This Week</div>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={weekly}>
            <defs>
              <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}   />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,197,94,0.06)" />
            <XAxis dataKey="day" tick={tipStyle} axisLine={false} tickLine={false} />
            <YAxis tick={{ ...tipStyle, fontSize:10 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background:'rgba(6,15,10,0.95)', border:'1px solid rgba(34,197,94,0.2)', borderRadius:10, color:'#e2f5e8', fontSize:12 }} />
            <Area type="monotone" dataKey="energy" name="kWh" stroke="#22c55e" strokeWidth={2} fill="url(#energyGrad)" dot={{ fill:'#22c55e', r:4 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="card" style={{ padding:22 }}>
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:11, color:'#4ade8077', fontFamily:'JetBrains Mono', letterSpacing:1 }}>BREAKDOWN</div>
          <div style={{ fontFamily:'Syne', fontWeight:700, fontSize:16, color:'#e2f5e8' }}>Energy by Category Today</div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={[
            { name:'HVAC',      value: energy?.hvac_kwh      },
            { name:'Lighting',  value: energy?.lighting_kwh  },
            { name:'Equipment', value: energy?.equipment_kwh },
          ]}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(34,197,94,0.06)" />
            <XAxis dataKey="name" tick={tipStyle} axisLine={false} tickLine={false} />
            <YAxis tick={{ ...tipStyle, fontSize:10 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background:'rgba(6,15,10,0.95)', border:'1px solid rgba(34,197,94,0.2)', borderRadius:10, color:'#e2f5e8', fontSize:12 }} />
            <Bar dataKey="value" name="kWh" radius={[6,6,0,0]} fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}

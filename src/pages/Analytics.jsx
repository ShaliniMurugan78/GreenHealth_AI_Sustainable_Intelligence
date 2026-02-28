import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts'
import DepartmentLeaderboard from '../components/dashboard/DepartmentLeaderboard'
import { getWeeklyEnergy, getScoreHistory, getDepartments } from '../services/api'

const tipStyle = { background:'rgba(2,12,6,0.95)', border:'1px solid rgba(0,255,136,0.2)', borderRadius:12, color:'#e2f5e8', fontSize:12 }

export default function Analytics() {
  const [weekly,  setWeekly]  = useState([])
  const [history, setHistory] = useState([])
  const [depts,   setDepts]   = useState([])

  useEffect(() => {
    getWeeklyEnergy().then(r  => setWeekly(r.data)).catch(()=>{})
    getScoreHistory().then(r  => setHistory(r.data.slice(0,10).reverse())).catch(()=>{})
    getDepartments().then(r   => setDepts(r.data)).catch(()=>{})
  }, [])

  const xTick = { fill:'rgba(134,239,172,0.45)', fontSize:11, fontFamily:'JetBrains Mono' }
  const yTick = { fill:'rgba(134,239,172,0.35)', fontSize:10 }

  const charts = [
    { title:'⚡ ENERGY (kWh)', key:'energy', color:'#22c55e' },
    { title:'🏥 WASTE (kg)',   key:'waste',  color:'#fbbf24' },
    { title:'📄 PAPER (sheets)', key:'paper', color:'#60a5fa' },
    { title:'🌍 SCORE TREND', key:'score',  color:'#00ff88', type:'line' },
  ]

  return (
    <div style={{ padding:'28px', display:'flex', flexDirection:'column', gap:24 }}>
      {/* Header */}
      <div>
        <div style={{ fontFamily:'JetBrains Mono', fontSize:10, color:'rgba(0,255,136,0.4)', letterSpacing:3, marginBottom:6 }}>DEEP INSIGHTS</div>
        <h1 style={{ fontFamily:'Bebas Neue', fontSize:48, letterSpacing:4, color:'#e2f5e8', lineHeight:1 }}>
          SUSTAINABILITY <span style={{ color:'#00ff88', textShadow:'0 0 30px rgba(0,255,136,0.4)' }}>ANALYTICS</span>
        </h1>
      </div>

      {/* 4 charts grid */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
        {charts.map(({ title, key, color, type }) => (
          <div key={key} className="card anim-fadeup" style={{ padding:24 }}>
            <div style={{ fontFamily:'Bebas Neue', fontSize:20, letterSpacing:2, color:'#e2f5e8', marginBottom:18 }}>{title}</div>
            <ResponsiveContainer width="100%" height={200}>
              {type === 'line' ? (
                <LineChart data={history}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,255,136,0.05)" />
                  <XAxis dataKey="id" tick={xTick} axisLine={false} tickLine={false} />
                  <YAxis domain={[0,100]} tick={yTick} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tipStyle} />
                  <Line type="monotone" dataKey="score" stroke={color} strokeWidth={2.5}
                    dot={{ fill:color, r:4, strokeWidth:0 }}
                    activeDot={{ r:7, fill:color, style:{filter:`drop-shadow(0 0 8px ${color})`} }} />
                </LineChart>
              ) : (
                <BarChart data={weekly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,255,136,0.05)" />
                  <XAxis dataKey="day" tick={xTick} axisLine={false} tickLine={false} />
                  <YAxis tick={yTick} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tipStyle} />
                  <Bar dataKey={key} fill={color} radius={[5,5,0,0]}
                    style={{ filter:`drop-shadow(0 0 4px ${color}40)` }} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        ))}
      </div>

      {/* Radar Chart + Leaderboard */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:16 }}>
        <div className="card" style={{ padding:24 }}>
          <div style={{ fontFamily:'Bebas Neue', fontSize:20, letterSpacing:2, color:'#e2f5e8', marginBottom:18 }}>📊 WEEKLY OVERVIEW</div>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={weekly}>
              <PolarGrid stroke="rgba(0,255,136,0.1)" />
              <PolarAngleAxis dataKey="day" tick={{ fill:'rgba(134,239,172,0.5)', fontSize:11, fontFamily:'JetBrains Mono' }} />
              <Radar name="Score" dataKey="score" stroke="#00ff88" fill="#00ff88" fillOpacity={0.12} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <DepartmentLeaderboard departments={depts} />
      </div>

      {/* Summary strip */}
      <div className="card" style={{ padding:'18px 24px' }}>
        <div style={{ fontFamily:'Bebas Neue', fontSize:18, letterSpacing:3, color:'rgba(0,255,136,0.5)', marginBottom:14 }}>WEEKLY AVERAGES</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0 }}>
          {[
            { label:'AVG ENERGY', val: weekly.length ? Math.round(weekly.reduce((s,d)=>s+d.energy,0)/weekly.length).toLocaleString()+' kWh' : '--', c:'#22c55e' },
            { label:'AVG WASTE',  val: weekly.length ? Math.round(weekly.reduce((s,d)=>s+d.waste,0)/weekly.length)+' kg' : '--', c:'#fbbf24' },
            { label:'AVG PAPER',  val: weekly.length ? Math.round(weekly.reduce((s,d)=>s+d.paper,0)/weekly.length).toLocaleString()+' sheets' : '--', c:'#60a5fa' },
            { label:'AVG SCORE',  val: weekly.length ? (weekly.reduce((s,d)=>s+d.score,0)/weekly.length).toFixed(1)+'/100' : '--', c:'#00ff88' },
          ].map((item,i) => (
            <div key={item.label} style={{ textAlign:'center', padding:'0 20px', borderRight:i<3?'1px solid rgba(0,255,136,0.08)':'none' }}>
              <div style={{ fontFamily:'JetBrains Mono', fontSize:9, color:'rgba(0,255,136,0.35)', letterSpacing:2, marginBottom:4 }}>{item.label}</div>
              <div style={{ fontFamily:'Bebas Neue', fontSize:26, letterSpacing:1, color:item.c }}>{item.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect, useCallback } from 'react'
import StatCard              from '../components/dashboard/StatCard'
import ScoreCard             from '../components/dashboard/ScoreCard'
import EnergyChart           from '../components/dashboard/EnergyChart'
import WasteChart            from '../components/dashboard/WasteChart'
import AlertPanel            from '../components/dashboard/AlertPanel'
import DepartmentLeaderboard from '../components/dashboard/DepartmentLeaderboard'
import { getDashboard, getWeeklyEnergy, getLiveScore, getDepartments } from '../services/api'

export default function Dashboard() {
  const [data,    setData]    = useState(null)
  const [weekly,  setWeekly]  = useState([])
  const [score,   setScore]   = useState(null)
  const [depts,   setDepts]   = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAll = useCallback(async () => {
    try {
      const [d, w, s, dp] = await Promise.all([getDashboard(), getWeeklyEnergy(), getLiveScore(), getDepartments()])
      setData(d.data); setWeekly(w.data); setScore(s.data); setDepts(dp.data)
    } catch (e) { console.error(e) }
    setLoading(false)
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])
  useEffect(() => { const t = setInterval(fetchAll, 30000); return () => clearInterval(t) }, [fetchAll])

  if (loading) return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'70vh', gap:20 }}>
      <div style={{ width:50, height:50, border:'3px solid rgba(0,255,136,0.1)', borderTop:'3px solid #00ff88', borderRadius:'50%', animation:'spin 1s linear infinite' }} />
      <div style={{ fontFamily:'Bebas Neue', fontSize:22, letterSpacing:4, color:'rgba(0,255,136,0.6)' }}>LOADING HOSPITAL DATA...</div>
    </div>
  )

  const e = data?.energy, w = data?.waste, p = data?.paper

  return (
    <div style={{ padding:'28px 28px', display:'flex', flexDirection:'column', gap:24 }}>

      {/* Page Header */}
      <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between' }}>
        <div>
          <div style={{ fontFamily:'JetBrains Mono', fontSize:10, color:'rgba(0,255,136,0.4)', letterSpacing:3, marginBottom:6 }}>
            REAL-TIME MONITORING
          </div>
          <h1 style={{ fontFamily:'Bebas Neue', fontSize:48, letterSpacing:4, color:'#e2f5e8', lineHeight:1 }}>
            SUSTAINABILITY <span style={{ color:'#00ff88', textShadow:'0 0 30px rgba(0,255,136,0.4)' }}>DASHBOARD</span>
          </h1>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <span className="badge badge-green">TODAY</span>
          <span className="badge badge-blue">LIVE DATA</span>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
        <StatCard icon="⚡" label="Energy Usage"    value={e?.total_kwh}    unit="kWh"    sub={`Cost: $${e?.cost_usd}`}           trend={12} accent="#22c55e" delay={0}   />
        <StatCard icon="🏥" label="Medical Waste"   value={w?.total_kg}     unit="kg"     sub={`Disposal: $${w?.cost_usd}`}       trend={-5} accent="#fbbf24" delay={80}  />
        <StatCard icon="📄" label="Paper Usage"     value={p?.total_sheets} unit="sheets" sub={`Cost: $${p?.cost_usd}`}           trend={-8} accent="#60a5fa" delay={160} />
        <StatCard icon="🌍" label="Carbon Footprint" value={e?.carbon_kg}   unit="kg"     sub="CO₂ equivalent today"              trend={3}  accent="#a78bfa" delay={240} />
      </div>

      {/* Middle Row */}
      <div style={{ display:'grid', gridTemplateColumns:'1.1fr 1fr 1fr', gap:16 }}>
        <ScoreCard score={score} />
        <WasteChart waste={w} />
        <AlertPanel alerts={data?.alerts} />
      </div>

      {/* Bottom Row */}
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:16 }}>
        <EnergyChart data={weekly} />
        <DepartmentLeaderboard departments={depts} />
      </div>

      {/* Footer stat strip */}
      <div className="card anim-fadeup" style={{ padding:'16px 24px', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0 }}>
        {[
          { label:'HVAC Usage',    val:`${e?.hvac_kwh} kWh`,   color:'#22c55e' },
          { label:'Hazardous Waste', val:`${w?.hazardous_kg} kg`, color:'#f87171' },
          { label:'Admin Paper',   val:`${p?.admin_sheets} sheets`, color:'#60a5fa' },
          { label:'Today Score',   val:`${score?.score}/100`,  color:'#00ff88' },
        ].map((item, i) => (
          <div key={item.label} style={{ textAlign:'center', padding:'0 20px', borderRight: i<3 ? '1px solid rgba(0,255,136,0.08)' : 'none' }}>
            <div style={{ fontFamily:'JetBrains Mono', fontSize:9, color:'rgba(0,255,136,0.35)', letterSpacing:2, marginBottom:4 }}>{item.label}</div>
            <div style={{ fontFamily:'Bebas Neue', fontSize:22, letterSpacing:1, color:item.color }}>{item.val}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

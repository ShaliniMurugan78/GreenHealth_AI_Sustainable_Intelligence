import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Zap, Sparkles } from 'lucide-react'
import { askChatbot, getRecommendations } from '../../services/api'

const SUGGESTIONS = [
  "Why is energy high today?",
  "How to reduce medical waste?",
  "Give top 3 recommendations",
  "What's our carbon footprint?",
  "Which dept needs improvement?",
  "Predict tomorrow's score",
]

export default function Chatbot() {
  const [msgs, setMsgs]       = useState([{
    role:'ai',
    text:"👋 Hello! I'm **GreenHealth AI**, your real-time sustainability assistant.\n\nI have live access to your hospital's energy, waste, and paper data. Ask me anything — I'll give you specific, actionable insights to improve your sustainability score!"
  }])
  const [input, setInput]   = useState('')
  const [loading, setLoad]  = useState(false)
  const bottomRef           = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }) }, [msgs])

  const send = async (text) => {
    const msg = (text || input).trim()
    if (!msg || loading) return
    setInput('')
    setMsgs(p => [...p, { role:'user', text:msg }])
    setLoad(true)
    try {
      const r = await askChatbot(msg)
      setMsgs(p => [...p, { role:'ai', text: r.data.answer }])
    } catch {
      setMsgs(p => [...p, { role:'ai', text:'⚠️ Backend not reachable. Make sure Flask is running on port 5000 and your GROQ_API_KEY is set in .env' }])
    }
    setLoad(false)
  }

  const autoRec = async () => {
    setLoad(true)
    setMsgs(p => [...p, { role:'user', text:'🤖 Generate AI-powered recommendations' }])
    try {
      const r = await getRecommendations()
      setMsgs(p => [...p, { role:'ai', text: r.data.recommendations }])
    } catch { setLoad(false) }
    setLoad(false)
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', gap:14 }}>
      {/* Header card */}
      <div className="card" style={{ padding:'18px 22px', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <div style={{ width:46, height:46, borderRadius:14,
            background:'linear-gradient(135deg,#052e16,#22c55e)',
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 0 20px rgba(0,255,136,0.3)', position:'relative' }}>
            <Bot size={22} color="#fff" />
            <div className="pulse-dot" style={{ position:'absolute', bottom:4, right:4, width:7, height:7 }} />
          </div>
          <div>
            <div style={{ fontFamily:'Bebas Neue', fontSize:22, letterSpacing:2, color:'#00ff88' }}>GREENHEALTH AI ASSISTANT</div>
            <div style={{ fontFamily:'JetBrains Mono', fontSize:10, color:'rgba(134,239,172,0.4)' }}>
              GROQ LLAMA3 • REAL-TIME HOSPITAL DATA • ALWAYS ON
            </div>
          </div>
        </div>
        <button onClick={autoRec} className="btn btn-primary" style={{ fontSize:13 }}>
          <Sparkles size={14} /> Auto Recommend
        </button>
      </div>

      {/* Messages */}
      <div className="card" style={{ flex:1, padding:18, overflowY:'auto', display:'flex', flexDirection:'column', gap:14, minHeight:0 }}>
        {msgs.map((m, i) => (
          <div key={i} className="anim-fadeup" style={{ display:'flex', alignItems:'flex-start', gap:10, justifyContent: m.role==='user'?'flex-end':'flex-start' }}>
            {m.role==='ai' && (
              <div style={{ width:32, height:32, borderRadius:10, background:'linear-gradient(135deg,#052e16,#22c55e)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Bot size={15} color="#fff" />
              </div>
            )}
            <div className={m.role==='user'?'chat-user':'chat-ai'} style={{ fontSize:13, lineHeight:1.7, color:'#e2f5e8', whiteSpace:'pre-wrap' }}>
              {m.text}
            </div>
            {m.role==='user' && (
              <div style={{ width:32, height:32, borderRadius:10, background:'rgba(0,255,136,0.12)', border:'1px solid rgba(0,255,136,0.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <User size={15} color="#4ade80" />
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:10, background:'linear-gradient(135deg,#052e16,#22c55e)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Bot size={15} color="#fff" />
            </div>
            <div className="chat-ai" style={{ display:'flex', gap:5, alignItems:'center' }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width:7, height:7, borderRadius:'50%', background:'#00ff88', animation:`shimmer 1s ${i*0.2}s infinite` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      <div style={{ display:'flex', gap:8, overflowX:'auto', paddingBottom:2, flexShrink:0 }}>
        {SUGGESTIONS.map(s => (
          <button key={s} onClick={() => send(s)} style={{ whiteSpace:'nowrap', fontSize:11, padding:'7px 14px', borderRadius:20, background:'rgba(0,255,136,0.06)', border:'1px solid rgba(0,255,136,0.15)', color:'rgba(134,239,172,0.8)', cursor:'pointer', fontFamily:'Outfit', transition:'all 0.2s' }}
            onMouseEnter={e => { e.target.style.background='rgba(0,255,136,0.12)'; e.target.style.color='#4ade80' }}
            onMouseLeave={e => { e.target.style.background='rgba(0,255,136,0.06)'; e.target.style.color='rgba(134,239,172,0.8)' }}>
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="card" style={{ padding:'14px 18px', display:'flex', gap:12, alignItems:'center', flexShrink:0 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==='Enter' && send()}
          placeholder="Ask anything about your hospital's sustainability..."
          style={{ flex:1, background:'transparent', border:'none', outline:'none', color:'#e2f5e8', fontSize:14, fontFamily:'Outfit' }}
        />
        <button onClick={() => send()} disabled={!input.trim() || loading} className="btn btn-primary"
          style={{ padding:'9px 18px', opacity: !input.trim()||loading ? 0.5 : 1 }}>
          <Send size={14} /> Send
        </button>
      </div>
    </div>
  )
}

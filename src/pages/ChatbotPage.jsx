import Chatbot from '../components/chatbot/Chatbot'

export default function ChatbotPage() {
  return (
    <div style={{ padding:'28px', height:'calc(100vh - 64px)', display:'flex', flexDirection:'column' }}>
      <div style={{ marginBottom:20 }}>
        <div style={{ fontFamily:'JetBrains Mono', fontSize:10, color:'rgba(0,255,136,0.4)', letterSpacing:3, marginBottom:6 }}>AI POWERED</div>
        <h1 style={{ fontFamily:'Bebas Neue', fontSize:48, letterSpacing:4, color:'#e2f5e8', lineHeight:1 }}>
          SUSTAINABILITY <span style={{ color:'#00ff88', textShadow:'0 0 30px rgba(0,255,136,0.4)' }}>ASSISTANT</span>
        </h1>
      </div>
      <div style={{ flex:1, minHeight:0 }}>
        <Chatbot />
      </div>
    </div>
  )
}

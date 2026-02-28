import axios from 'axios'

const API = axios.create({ baseURL: '/api' })

// ── Dashboard ─────────────────────────────────────────────
export const getDashboard       = ()  => API.get('/dashboard')

// ── Energy ────────────────────────────────────────────────
export const getLiveEnergy      = ()  => API.get('/energy/live')
export const getWeeklyEnergy    = ()  => API.get('/energy/weekly')
export const getEnergySummary   = ()  => API.get('/energy/summary')
export const getEnergyHistory   = ()  => API.get('/energy/history')

// ── Waste ─────────────────────────────────────────────────
export const getLiveWaste       = ()  => API.get('/waste/live')
export const getWasteSummary    = ()  => API.get('/waste/summary')
export const getWasteHistory    = ()  => API.get('/waste/history')

// ── Paper ─────────────────────────────────────────────────
export const getLivePaper       = ()  => API.get('/paper/live')
export const getPaperSummary    = ()  => API.get('/paper/summary')
export const getPaperHistory    = ()  => API.get('/paper/history')

// ── Score ─────────────────────────────────────────────────
export const getLiveScore       = ()  => API.get('/score/live')
export const getScoreHistory    = ()  => API.get('/score/history')
export const getDepartments     = ()  => API.get('/score/departments')

// ── Chatbot ───────────────────────────────────────────────
export const askChatbot         = (m) => API.post('/chat/ask', { message: m })
export const getRecommendations = ()  => API.get('/chat/recommend')
export const testGroq           = ()  => API.get('/chat/test')

// ── Report ────────────────────────────────────────────────
export const downloadReport     = ()  => window.open('/api/report/generate', '_blank')

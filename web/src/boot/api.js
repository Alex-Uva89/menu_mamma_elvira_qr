import { boot } from 'quasar/wrappers'
import axios from 'axios'

// qui metti l'endpoint del tuo backend ponte o direttamente Sanity
// es: se hai creato un express server su /api/menu
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 10000
})

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }

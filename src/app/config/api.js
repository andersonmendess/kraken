import axios from 'axios'

const BASE_URL = 'https://krakenapi.andersonmendess.now.sh'
export const api = axios.create({ baseURL: BASE_URL })

export default api
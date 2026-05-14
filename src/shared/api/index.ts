import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // cookie Domain=.osonapp.uz ishlashi uchun
})

export default api

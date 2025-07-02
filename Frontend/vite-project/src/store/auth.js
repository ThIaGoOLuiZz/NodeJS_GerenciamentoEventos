// src/store/auth.js
import { reactive } from 'vue'

export const auth = reactive({
  isLoggedIn: !!localStorage.getItem('token'),
  role: localStorage.getItem('role') || '',
  login(token, role) {
    localStorage.setItem('token', token)
    localStorage.setItem('role', role)
    this.isLoggedIn = true
    this.role = role
  },
  logout() {
    localStorage.clear()
    this.isLoggedIn = false
    this.role = ''
  }
})

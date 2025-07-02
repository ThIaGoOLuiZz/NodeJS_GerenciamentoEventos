<template>
  <div class="form-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Senha" required />
      <button type="submit">Entrar</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import api from '../services/api'
import { auth } from '../store/auth'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async login() {
      this.error = ''
      try {
        const res = await api.post('/auth/login', {
          email: this.email,
          password: this.password
        })
        const token = res.data.token
        const payload = JSON.parse(atob(token.split('.')[1]))
        auth.login(token, payload.role)
        this.$router.push('/')
      } catch (err) {
        this.error = 'Usuário ou senha inválidos.'
      }
    }
  }
}
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}
input, button {
  display: block;
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
}
button {
  background: #42b983;
  border: none;
  color: white;
  font-weight: bold;
}
.error {
  color: red;
  text-align: center;
}
</style>

<template>
  <div class="form-container">
    <h2>Cadastro</h2>
    <form @submit.prevent="register">
      <input v-model="name" placeholder="Nome" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Senha" required />
      <select v-model="role">
        <option value="guest">Visitante</option>
        <option value="organizer">Organizador</option>
      </select>
      <button type="submit">Registrar</button>
    </form>
    <p v-if="message" class="success">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      role: 'guest',
      message: '',
      error: ''
    }
  },
  methods: {
    async register() {
      this.message = ''
      this.error = ''
      try {
        await api.post('/auth/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          role: this.role
        })
        this.message = 'Cadastro realizado com sucesso!'
        this.$router.push('/login')
      } catch (err) {
        this.error = 'Erro ao registrar. Tente outro email.'
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
input, select, button {
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
.success {
  color: green;
  text-align: center;
}
.error {
  color: red;
  text-align: center;
}
</style>

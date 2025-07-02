<template>
  <div class="form-container">
    <h2>Criar Novo Evento</h2>
    <form @submit.prevent="createEvent">
      <input v-model="title" placeholder="Título do evento" required />
      <input v-model="location" placeholder="Local" required />
      <input v-model="date" type="date" required />
      <textarea v-model="description" placeholder="Descrição" rows="4"></textarea>
      <button type="submit">Salvar Evento</button>
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
      title: '',
      description: '',
      location: '',
      date: '',
      message: '',
      error: ''
    }
  },
  methods: {
    async createEvent() {
      this.message = ''
      this.error = ''
      try {
        await api.post('/events', {
          title: this.title,
          description: this.description,
          location: this.location,
          date: this.date
        })
        this.message = 'Evento criado com sucesso!'
        this.$router.push('/')
      } catch (err) {
        this.error = 'Erro ao criar evento. Verifique os campos.'
      }
    }
  }
}
</script>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}
input, textarea, button {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
}
button {
  background: #42b983;
  color: white;
  border: none;
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

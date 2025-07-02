<template>
  <div class="report">
    <h2>Relatório de Eventos</h2>
    <button @click="getReport">Gerar Relatório</button>

    <div v-if="report">
      <p><strong>Total de eventos:</strong> {{ report.total }}</p>
      <p><strong>Gerado em:</strong> {{ report.generatedAt }}</p>

      <ul>
        <li v-for="event in report.events" :key="event.id">
          {{ event.title }} - {{ event.date }} - {{ event.location }}
        </li>
      </ul>
    </div>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  data() {
    return {
      report: null,
      error: ''
    }
  },
  methods: {
    async getReport() {
      this.error = ''
      try {
        const res = await api.get('/events/report')
        this.report = res.data
      } catch (err) {
        this.error = 'Erro ao gerar relatório'
      }
    }
  }
}
</script>

<style scoped>
.report {
  max-width: 600px;
  margin: 2rem auto;
}
button {
  padding: 0.5rem 1rem;
  background: #42b983;
  color: white;
  border: none;
  font-weight: bold;
  margin-bottom: 1rem;
}
.error {
  color: red;
  margin-top: 1rem;
}
</style>

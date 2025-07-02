<template>
  <div class="container">
    <h2>Lista de Eventos</h2>

    <div class="filters">
      <input v-model="filter.date" type="date" />
      <input v-model="filter.location" placeholder="Filtrar por local" />
      <button @click="getEvents">Buscar</button>
    </div>

    <ul class="event-list">
      <li v-for="event in events" :key="event.id" class="event-card">
        <h3>{{ event.title }}</h3>
        <p><strong>Local:</strong> {{ event.location }}</p>
        <p><strong>Data:</strong> {{ event.date }}</p>
        <p><strong>Organizador:</strong> {{ event.organizer }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  data() {
    return {
      filter: {
        date: '',
        location: ''
      },
      events: []
    }
  },
  methods: {
    async getEvents() {
      try {
        const res = await api.get('/events', { params: this.filter })
        this.events = res.data
      } catch (err) {
        alert('Erro ao buscar eventos')
      }
    }
  },
  mounted() {
    this.getEvents()
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 2rem auto;
}
.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.filters input {
  flex: 1;
  padding: 0.5rem;
}
.event-list {
  list-style: none;
  padding: 0;
}
.event-card {
  padding: 1rem;
  border: 1px solid #ddd;
  margin-bottom: 1rem;
  border-radius: 4px;
}
</style>

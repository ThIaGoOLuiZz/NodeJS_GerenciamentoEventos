<template>
  <nav>
    <router-link to="/">Eventos</router-link>
    <router-link v-if="!auth.isLoggedIn" to="/login">Login</router-link>
    <router-link v-if="!auth.isLoggedIn" to="/register">Registrar</router-link>
    <router-link v-if="auth.isLoggedIn && auth.role === 'organizer'" to="/create">Criar Evento</router-link>
    <router-link v-if="auth.isLoggedIn && auth.role === 'organizer'" to="/report">Relatório</router-link>
    <button v-if="auth.isLoggedIn" @click="auth.logout(); $router.push('/login')">Sair</button>
  </nav>
</template>

<script>
import { auth } from '../store/auth'

export default {
  setup() {
    return { auth }
  }
}
</script>

<style scoped>
nav {
  padding: 1rem;
  background: #f0f0f0;
}
nav a {
  margin-right: 1rem;
  text-decoration: none;
  color: #5c2d91;
  font-weight: bold;
}
button {
  background: transparent;
  border: none;
  color: #5c2d91;
  font-weight: bold;
  cursor: pointer;
}
</style>

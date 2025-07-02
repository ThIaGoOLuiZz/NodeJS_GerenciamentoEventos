import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import EventList from '../views/EventList.vue'
import CreateEvent from '../views/CreateEvent.vue'
import Report from '../views/Report.vue'

const routes = [
  { path: '/', component: EventList },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/create', component: CreateEvent },
  { path: '/report', component: Report }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

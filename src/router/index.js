
import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'
import AuthForm from '@/views/AuthForm.vue'
import DashBoard from '@/views/DashBoard.vue'
import TicketManagement from '@/views/TicketManagement.vue'

const routes = [
  { path: '/', name: 'Landing', component: LandingPage },
  { path: '/sign-up', name: 'AuthForm', component: AuthForm },
  { path: '/dashboard', name: 'DashBoard', component: DashBoard },
  { path: '/tickets', name: 'TicketManagement', component: TicketManagement }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

// src/stores/authStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  const user = ref(JSON.parse(localStorage.getItem('ticketapp_user')) || null)
  const token = ref(localStorage.getItem('ticketapp_session') || null)

  const isAuthenticated = computed(() => !!token.value)

  const getAllUsers = () => JSON.parse(localStorage.getItem('ticketapp_users')) || []
  const saveAllUsers = (users) => localStorage.setItem('ticketapp_users', JSON.stringify(users))

  const signup = (newUser) => {
    const users = getAllUsers()
    if (users.find(u => u.email === newUser.email)) throw new Error('Email already exists. Please log in.')
    users.push(newUser)
    saveAllUsers(users)
    user.value = newUser
    token.value = newUser.token
    localStorage.setItem('ticketapp_user', JSON.stringify(newUser))
    localStorage.setItem('ticketapp_session', newUser.token)
  }

  const login = (email, password) => {
    const foundUser = getAllUsers().find(u => u.email === email && u.password === password)
    if (!foundUser) throw new Error('Invalid email or password.')
    user.value = foundUser
    token.value = foundUser.token
    localStorage.setItem('ticketapp_user', JSON.stringify(foundUser))
    localStorage.setItem('ticketapp_session', foundUser.token)
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('ticketapp_user')
    localStorage.removeItem('ticketapp_session')
    router.push('/sign-up')
  }

  return { user, token, isAuthenticated, signup, login, logout }
})

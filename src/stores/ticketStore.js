import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useAuthStore } from './authStore'

export const useTicketStore = defineStore('ticket', () => {
  const auth = useAuthStore()
  const tickets = ref([])

  const saveTickets = (updatedTickets) => {
    if (auth.user) {
      tickets.value = updatedTickets
      localStorage.setItem(
        `user_${auth.user.email}_ticket`,
        JSON.stringify(updatedTickets)
      )
    } else {
      tickets.value = []
    }
  }

  const addTicket = (newTicket) => {
    if (auth.user) {
      const updatedTickets = [...tickets.value, newTicket]
      saveTickets(updatedTickets)
    }
  }

  const updateTicket = (id, updatedFields) => {
    if (auth.user) {
      const updatedTickets = tickets.value.map(t =>
        t.id === id ? { ...t, ...updatedFields } : t
      )
      saveTickets(updatedTickets)
    }
  }

  const deleteTicket = (id) => {
    if (auth.user) {
      const updatedTickets = tickets.value.filter(t => t.id !== id)
      saveTickets(updatedTickets)
    }
  }

  // Load tickets from localStorage whenever the user changes
  watch(
    () => auth.user,
    (newUser) => {
      if (newUser) {
        const savedTickets = JSON.parse(
          localStorage.getItem(`user_${newUser.email}_ticket`)
        ) || []
        tickets.value = savedTickets
      } else {
        tickets.value = []
      }
    },
    { immediate: true }
  )

  return {
    tickets,
    addTicket,
    updateTicket,
    deleteTicket
  }
})

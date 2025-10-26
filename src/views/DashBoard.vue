<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useTicketStore } from '@/stores/ticketStore'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const ticketsStore = useTicketStore()
const router = useRouter()

const user = computed(() => auth.user)
const tickets = computed(() => ticketsStore.tickets)

const totalTickets = computed(() => tickets.value.length)
const totalOpenTickets = computed(() => tickets.value.filter(t => t.status === 'open').length)
const totalInProgressTickets = computed(() => tickets.value.filter(t => t.status === 'in_progress').length)
const totalClosedTickets = computed(() => tickets.value.filter(t => t.status === 'closed').length)

const goToTickets = () => {
  router.push('/tickets')
}
</script>

<template>
  <main class="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-(--space-lg) mt-(--space-lg)">
    <h1 class="text-4xl font-extrabold text-gray-900 mb-4 sm:mb-0">
      Welcome, {{ user.name }}
    </h1>
    <p class="text-lg text-gray-600 mt-3">
      Here you can manage your tickets, view analytics, and make adjustments
    </p>

    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <li class="bg-blue-100 hover:bg-blue-200 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105">
        <h2 class="text-xl font-semibold text-blue-800">Total Tickets</h2>
        <p class="text-shadow-gray-700 mt-2 text-xl">{{ totalTickets }}</p>
      </li>

      <li class="bg-green-100 hover:bg-green-200 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105">
        <h2 class="text-xl font-semibold text-green-800">Total Open Tickets</h2>
        <p class="text-shadow-gray-700 mt-2 text-xl">{{ totalOpenTickets }}</p>
      </li>

      <li class="bg-amber-100 hover:bg-amber-200 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105">
        <h2 class="text-xl font-semibold text-amber-800">Total Tickets In_Progress</h2>
        <p class="text-shadow-gray-700 mt-2 text-xl">{{ totalInProgressTickets }}</p>
      </li>

      <li class="bg-gray-100 hover:bg-gray-200 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105">
        <h2 class="text-xl font-semibold text-gray-800">Total Closed Tickets</h2>
        <p class="text-shadow-gray-700 mt-2 text-xl">{{ totalClosedTickets }}</p>
      </li>
    </ul>

    <button @click="goToTickets" class="bg-(--color-primary-light) text-white px-(--space-xl) py-(--space-sm) rounded-md font-semibold cursor-pointer hover:bg-(--color-primary) transition-colors">
      Manage Tickets
    </button>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useTicketStore } from '@/stores/ticketStore'
import CreateTask from '@/components/CreateTask.vue'

const auth = useAuthStore()
const ticketsStore = useTicketStore()
const router = useRouter()

if (!auth.isAuthenticated) {
   router.push('/sign-up')
}

const editId = ref(null)
const editTitle = ref('')
const editDescription = ref('')
const editStatus = ref('')
const createModal = ref(false)

const user = computed(() => auth.user)
const tickets = computed(() => ticketsStore.tickets)

function startEdit(ticket) {
  editId.value = ticket.id
  editTitle.value = ticket.title
  editDescription.value = ticket.description
  editStatus.value = ticket.status
}

function saveEdit() {
  ticketsStore.updateTicket(editId.value, {
    title: editTitle.value,
    description: editDescription.value,
    status: editStatus.value
  })
  editId.value = null
  editTitle.value = ''
  editDescription.value = ''
  editStatus.value = ''
}

function logout() {
  auth.logout()
}

function goBack() {
  router.push('/dashboard')
}
</script>

<template>
  <main v-if="auth.isAuthenticated" class="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-8 space-y-(--space-lg) mt-(--space-lg)">
    <header class="flex mt-4 justify-between items-center mb-8 relative">
      <h1 class="sm:text-4xl text-2xl font-extrabold text-gray-900 mb-4 sm:mb-0">
        {{ user.name }}'s Tickets
      </h1>
      <div class="flex items-center gap-2 sm:gap-6">
        <p
          class="text-(--color-text-light) cursor-pointer text-sm sm:text-base w-[60px] sm:w-fit hover:text-(--color-primary-light) transition-colors"
          @click="createModal = true"
        >
          + Create New Task
        </p>
        <button
          class="py-(--space-sm) w-[90px] bg-red-600 text-(--color-text-secondary) font-bold cursor-pointer rounded-md"
          @click="logout"
        >
          Log Out
        </button>
      </div>
      <p class="absolute -top-8 hover:text-black transition-colors text-(--color-text-light) text-sm cursor-pointer" @click="goBack">
        &larr; Back to Dashboard
      </p>
    </header>

    <section class="flex flex-col gap-(--space-md)">
      <p v-if="tickets.length === 0" class="text-(--color-text-light) italic">
        No tickets yet — create your first one!
      </p>

      <div v-for="ticket in tickets" :key="ticket.id">
        <div v-if="editId === ticket.id" class="w-[60%] border flex flex-col p-8 rounded-md gap-(--space-md) shadow">
          <div class="flex items-start flex-col gap-2">
            <label class="font-semibold text-xl" for="title">Title:</label>
            <input class="border-2 rounded-md p-2 w-[90%]" type="text" v-model="editTitle" />
          </div>

          <div class="flex items-start flex-col gap-2">
            <label class="font-semibold text-xl" for="description">Description:</label>
            <input class="border-2 rounded-md p-2 w-[90%]" type="text" v-model="editDescription" />
          </div>

          <div class="flex items-start flex-col gap-2">
            <label class="font-semibold text-xl" for="status">Status:</label>
            <select class="border-2 rounded-md p-2 w-[90%]" v-model="editStatus">
              <option value="open">Open</option>
              <option value="in_progress">in_progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <button
            class="bg-green-500 text-white py-2 rounded-md w-[30%] hover:bg-green-600 cursor-pointer"
            @click="saveEdit"
          >
            Save
          </button>
        </div>

        <div v-else
          :class="[
            'flex min-[400px]:w-full flex-col sm:flex-row gap-6 sm:justify-between border-l-10 rounded-md shadow-lg p-4',
            ticket.status === 'open' ? 'border-l-green-600' : ticket.status === 'in_progress' ? 'border-l-amber-600' : 'border-l-gray-600'
          ]"
        >
          <div>
            <h3 class="text-xl font-semibold mb-4">{{ ticket.title }}</h3>
            <p class="text-(--color-text-light)">{{ ticket.description }}</p>
          </div>
          <div class="flex items-center gap-(--space-sm)">
            <span
              :class="[
                'p-2 font-semibold rounded-lg',
                ticket.status === 'open' ? 'bg-green-200 text-green-700'
                  : ticket.status === 'in_progress' ? 'bg-amber-200 text-amber-700'
                  : 'bg-gray-200 text-gray-700'
              ]"
            >
              {{ ticket.status }}
            </span>
            <button
              type="button"
              class="bg-(--color-primary-light) py-(--space-sm) px-(--space-lg) text-white rounded-md cursor-pointer"
              @click="startEdit(ticket)"
            >
              Edit
            </button>
            <button
              type="button"
              class="bg-red-600 py-(--space-sm) px-(--space-lg) text-white rounded-md cursor-pointer"
              @click="ticketsStore.deleteTicket(ticket.id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>

    <CreateTask v-if="createModal" @close="createModal = false" />
  </main>
</template>

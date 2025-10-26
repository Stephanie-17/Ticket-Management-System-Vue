<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const goToSignUp = () => router.push('/sign-up')
const goToHome = () => router.push('/')
</script>

<template>
  <nav class="flex justify-between items-center p-(--space-md) mb-(--space-md)">
    <h2 @click="goToHome" class="font-bold text-3xl cursor-pointer">FlowDesk</h2>
    <div>
      <button
        v-if="auth.isAuthenticated"
        @click="auth.logout"
        class="bg-red-600 py-(--space-sm) px-(--space-md) rounded-md font-semibold text-(--color-text-secondary) cursor-pointer"
      >
        Log Out
      </button>
      <button
        v-else
        @click="goToSignUp"
        class="bg-(--color-primary-light) py-(--space-sm) px-(--space-md) rounded-md font-semibold text-(--color-text-secondary) cursor-pointer"
      >
        Sign Up
      </button>
    </div>
  </nav>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const isSignUp = ref(true)
const formData = reactive({ name: '', email: '', password: '' })
const errors = reactive({})
const success = ref(false);

// if (auth.isAuthenticated) {
//   router.push('/dashboard')
// }

const generateFakeToken = () => 'token_' + Math.random().toString(36).substring(2) + Date.now().toString(36)

const validate = () => {
  Object.keys(errors).forEach(k => errors[k] = '')
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (isSignUp.value && !formData.name.trim()) errors.name = 'Name required'
  if (!formData.email.trim() || !emailRegex.test(formData.email)) errors.email = 'Valid email required'
  if (!formData.password.trim() || formData.password.length < 6) errors.password = 'Password min 6 chars'
  return Object.keys(errors).every(k => !errors[k])
}

const handleSubmit = async (e) => {
  e.preventDefault()
  if (!validate()) return

  errors.general = ''

  try {
    if (isSignUp.value) {
      await auth.signup({ ...formData, token: generateFakeToken() })
    } else {
      await auth.login(formData.email, formData.password)
    }

    success.value = true
    formData.name = formData.email = formData.password = ''

    setTimeout(() => {
      router.push('/dashboard')
    }, 1500)

  } catch (err) {
    errors.general = err.message || 'An error occurred'
  }
}
</script>

<template>
<div class="flex flex-col items-center justify-center min-h-screen p-(--space-md) ">
  <header class="mb-(--space-lg) text-center">
    <h1 class="text-3xl font-bold mb-(--space-sm) text-(--color-text)">
      {{ isSignUp ? 'Create an Account' : 'Welcome Back!' }}
    </h1>
    <p class="italic text-(--color-text-light)">
      {{ isSignUp ? 'Sign up to get started!' : 'Log in to continue!' }}
    </p>
  </header>

  <form @submit="handleSubmit" class="w-full max-w-md bg-white p-(--space-lg) rounded-lg shadow-(--shadow-lg)">
    <div v-if="isSignUp" class="mb-(--space-md) flex flex-col">
      <label class="mb-(--space-xs) font-medium text-(--color-text)">Name:</label>
      <input
        v-model="formData.name"
        type="text"
        class="w-full p-(--space-sm) rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-(--font-family-base)"
      />
      <span v-if="errors.name" class="text-red-500 text-sm mt-(--space-xs)">{{ errors.name }}</span>
    </div>

    <div class="mb-(--space-md) flex flex-col">
      <label class="mb-(--space-xs) font-medium text-(--color-text)">Email:</label>
      <input
        v-model="formData.email"
        type="email"
        class="w-full p-(--space-sm) rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-(--font-family-base)"
      />
      <span v-if="errors.email" class="text-red-500 text-sm mt-(--space-xs)">{{ errors.email }}</span>
    </div>

    <div class="mb-(--space-md) flex flex-col">
      <label class="mb-(--space-xs) font-medium text-(--color-text)">Password:</label>
      <input
        type="password"
        v-model="formData.password"
        class="w-full p-(--space-sm) rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-(--font-family-base)"
      />
      <span v-if="errors.password" class="text-red-500 text-sm mt-(--space-xs)">{{ errors.password }}</span>
    </div>

    <button
      type="submit"
      class="w-full bg-(--color-primary-light) text-(--color-text-secondary) p-(--space-sm) rounded-md hover:bg-(--color-primary) transition font-medium "
    >
      {{ isSignUp ? 'Sign Up' : 'Log In' }}
    </button>

    <p class="mt-(--space-md) text-center text-(--color-text-light) text-sm">
      {{ isSignUp ? "Already have an account?" : "Don't have an account?" }}
      <button
        type="button"
        @click="isSignUp = !isSignUp"
        class="text-(--color-primary-light) font-bold hover:text-(--color-primary) hover:underline ml-(--space-xs)"
      >
        {{ isSignUp ? 'Log In' : 'Sign Up' }}
      </button>
    </p>

    <div v-if="errors.general" class="text-red-600 text-center mt-(--space-sm) p-(--space-sm) bg-red-50 rounded-md border border-red-200">
      {{ errors.general }}
    </div>
    <div v-if="success" class="mt-(--space-sm) p-(--space-sm) rounded-md bg-green-100 text-green-700 text-center font-medium border border-green-200">
      ✅ {{ isSignUp ? 'Account created!' : 'Logged in successfully!' }}
    </div>
  </form>
</div>
</template>

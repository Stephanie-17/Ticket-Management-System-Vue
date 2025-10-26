<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import AppFooter from '@/components/AppFooter.vue'

const route = useRoute()
const showNavBar = computed(() => route.path !== '/dashboard' && route.path !== '/tickets')
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <NavBar v-if="showNavBar" />
    <main class="flex-1">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

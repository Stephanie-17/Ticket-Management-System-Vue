<script setup>
defineProps({
  iconPath: String,
  feature: String,
  desc: String
})
</script>

<template>
  <section class="bg-white h-[200px] md:h-[270px] md:w-[400px] shadow-lg flex flex-col gap-4 items-start text-left p-4 border border-gray-200 rounded-md">
    <img :src="iconPath" alt="feature-icon" class="w-10" />
    <h3 class="text-xl font-bold">{{ feature }}</h3>
    <p class="text-gray-600">{{ desc }}</p>
  </section>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'

const tankLevel = ref(50) // Tank Level %
const valveOpen = ref(false)

const toggleValve = () => {
  valveOpen.value = !valveOpen.value
}

onMounted(() => {
  setInterval(() => {
    // Simulate tank filling or draining
    tankLevel.value = valveOpen.value
      ? Math.min(tankLevel.value + 5, 100)
      : Math.max(tankLevel.value - 5, 0)
  }, 1000)
})
</script>

<template>
  <div class="relative w-full h-80 bg-gray-100 p-4 border rounded-lg">
    <!-- Tank -->
    <svg width="300" height="200" viewBox="0 0 300 200" class="absolute">
      <!-- Tank Shape -->
      <rect
        x="100"
        y="50"
        width="100"
        height="100"
        fill="lightblue"
        stroke="black"
        stroke-width="2"
      />
      <!-- Pipe -->
      <rect x="140" y="150" width="20" height="50" fill="gray" />
      <!-- Valve Indicator -->
      <circle :cx="150" :cy="180" r="10" :fill="valveOpen ? 'green' : 'red'" />
    </svg>

    <!-- Dynamic Data -->
    <div class="absolute top-10 left-12 text-center">
      <p class="text-lg font-bold">Tank Level</p>
      <p class="text-2xl">{{ tankLevel }}%</p>
    </div>

    <!-- Valve Button -->
    <button
      @click="toggleValve"
      class="absolute bottom-5 left-10 px-4 py-2 bg-blue-500 text-white rounded-lg"
    >
      {{ valveOpen ? 'Close Valve' : 'Open Valve' }}
    </button>
  </div>
</template>

<script setup lang="ts">
// Component Imports
import reheatingFurnace from './components/ReheatingFurnace.vue'
import MachineryConnection from './components/MachineryConnection.vue';

// Utility Imports
import { onMounted } from 'vue';

// Start animation on mount
onMounted(() => {
  // animate()
})

// Animation Loop
// const animate = () => {
//   // Move slabs forward
//   slabs.value.forEach((slab) => {
//     slab.x += 1
//     if (slab.x > 700) slab.x = 50 // Loop back
//   })

//   // Simulate burner flames pulsing
//   burners.value.forEach((burner, index) => {
//     const scale = 1 + 0.1 * Math.sin(Date.now() / 200 + index)
//     burner.scaleX = scale
//     burner.scaleY = scale
//   })

//   requestAnimationFrame(animate)
// }
</script>

<template>
  <v-stage ref="stageRef" :config="{ width: 800, height: 400 }">
    <v-layer>
      <!-- First furnace at default position -->
      <reheating-furnace :x="100" :y="50"  />
    </v-layer>

    <v-layer>
      <machinery-connection :x="225" :y="70" />
    </v-layer>

    <v-layer>
      <!-- Second furnace moved to the right -->
      <reheating-furnace :x="400" :y="50" />
    </v-layer>
  </v-stage>
</template>

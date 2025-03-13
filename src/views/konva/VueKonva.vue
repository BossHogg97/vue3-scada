<script setup lang="ts">
import { ref, onMounted } from 'vue'

const slabs = ref([
  { x: 150, y: 120, width: 100, height: 30, fill: 'steelblue', stroke: 'black', strokeWidth: 2 },
  { x: 350, y: 120, width: 100, height: 30, fill: 'steelblue', stroke: 'black', strokeWidth: 2 },
  { x: 550, y: 120, width: 100, height: 30, fill: 'steelblue', stroke: 'black', strokeWidth: 2 },
])

const rollers = ref([
  { x: 100, y: 220, radius: 8, fill: 'gray' },
  { x: 200, y: 220, radius: 8, fill: 'gray' },
  { x: 300, y: 220, radius: 8, fill: 'gray' },
  { x: 400, y: 220, radius: 8, fill: 'gray' },
  { x: 500, y: 220, radius: 8, fill: 'gray' },
  { x: 600, y: 220, radius: 8, fill: 'gray' },
  { x: 700, y: 220, radius: 8, fill: 'gray' },
])

const burners = ref([
  { x: 100, y: 40, radius: 10, fill: 'orange', scaleX: 1, scaleY: 1 },
  { x: 250, y: 40, radius: 10, fill: 'orange', scaleX: 1, scaleY: 1 },
  { x: 400, y: 40, radius: 10, fill: 'orange', scaleX: 1, scaleY: 1 },
  { x: 550, y: 40, radius: 10, fill: 'orange', scaleX: 1, scaleY: 1 },
  { x: 700, y: 40, radius: 10, fill: 'orange', scaleX: 1, scaleY: 1 },
])

// Animation Loop
const animate = () => {
  // Move slabs forward
  slabs.value.forEach((slab) => {
    slab.x += 1
    if (slab.x > 700) slab.x = 50 // Loop back
  })

  // Simulate burner flames pulsing
  burners.value.forEach((burner, index) => {
    const scale = 1 + 0.1 * Math.sin(Date.now() / 200 + index)
    burner.scaleX = scale
    burner.scaleY = scale
  })

  requestAnimationFrame(animate)
}

// Start animation on mount
onMounted(() => {
  animate()
})
</script>

<template>
  <v-stage :config="{ width: 800, height: 400 }">
    <v-layer>
      <!-- Furnace Body -->
      <v-rect
        :config="{
          x: 50,
          y: 50,
          width: 700,
          height: 200,
          fillLinearGradientStartPoint: { x: 0, y: 0 },
          fillLinearGradientEndPoint: { x: 700, y: 0 },
          fillLinearGradientColorStops: [0, 'darkred', 1, 'orange'],
          stroke: 'black',
          strokeWidth: 4,
        }"
      />

      <!-- Burners (top) -->
      <v-circle v-for="(burner, index) in burners" :key="index" :config="burner" />

      <!-- Steel Slabs (moving inside furnace) -->
      <v-rect v-for="(slab, index) in slabs" :key="index" :config="slab" />

      <!-- Conveyor Rollers -->
      <v-circle v-for="(roller, index) in rollers" :key="index" :config="roller" />

      <!-- Exhaust Stack -->
      <v-line
        :config="{
          points: [700, 40, 700, 0, 750, 0, 750, 40],
          stroke: 'gray',
          strokeWidth: 6,
          closed: true,
          fill: 'lightgray',
        }"
      />
    </v-layer>
  </v-stage>
</template>

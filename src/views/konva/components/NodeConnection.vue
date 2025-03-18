<script setup lang="ts">
// Enum Imports
import { EnumEvents } from '@/enums/business'

// Utility Imports
import { useEventBus } from '@vueuse/core'

type Props = {
  x: number
  y: number
}

const props = defineProps<Props>()

// Event Definition
const evtToggleAnimation = useEventBus<IAnimation>(EnumEvents.ToggleAnimation)

// Base rectangle configuration
const baseRectConfig = {
  x: 50,
  y: 70,
  width: 150,
  height: 10,
  stroke: 'black',
  fill: 'black',
}

evtToggleAnimation.on(() => {
  animate()
})

// Animation Loop
const animate = () => {
  // Move slabs forward
  // slabs.value.forEach((slab) => {
  //   slab.x += 1
  //   if (slab.x > 700) slab.x = 50 // Loop back
  // })

  // // Simulate burner flames pulsing
  // burners.value.forEach((burner, index) => {
  //   const scale = 1 + 0.1 * Math.sin(Date.now() / 200 + index)
  //   burner.scaleX = scale
  //   burner.scaleY = scale
  // })

  requestAnimationFrame(animate)
}
</script>

<template>
  <v-group :config="{ x, y }">
    <!-- Base Rectangle -->
    <v-rect :config="baseRectConfig" />
  </v-group>
</template>

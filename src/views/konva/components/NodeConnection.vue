<script setup lang="ts">
import { ref } from 'vue'
import { useEventBus } from '@vueuse/core'
import { EnumEvents } from '@/enums/business'

// Define props
type Props = {
  x: number
  y: number
}

const props = defineProps<Props>()

// Event Bus for Animation Toggle
const evtToggleAnimation = useEventBus<IAnimation>(EnumEvents.ToggleAnimation)

// Reactive Base Rectangle Configuration
const baseRectConfig = ref({
  x: 50,
  y: 70,
  width: 150,
  height: 10,
  stroke: 'black',
  fillLinearGradientStartPoint: { x: 0, y: 0 },
  fillLinearGradientEndPoint: { x: 150, y: 0 }, // Horizontal gradient
  fillLinearGradientColorStops: [0, 'green', 1, 'darkgreen'], // Initial gradient
})

let gradientShift = 0
let animationFrameId: number | null = null

/**
 * This function will start the animation
 */
const animate = () => {
  gradientShift += 0.1 // Adjust speed of gradient shift

  // Create a pulsing effect by shifting green color stops
  const newGradientStops = [
    0,
    `rgb(${50 + 100 * Math.sin(gradientShift)}, 255, ${50 + 100 * Math.cos(gradientShift)})`,
    1,
    `rgb(${0 + 100 * Math.cos(gradientShift)}, 150, ${0 + 100 * Math.sin(gradientShift)})`,
  ]

  // Force Vue to detect the change by using Object.assign()
  Object.assign(baseRectConfig.value, {
    fillLinearGradientColorStops: newGradientStops,
  })

  animationFrameId = requestAnimationFrame(animate)
}

/**
 * Start Animation on Event Trigger
 */
evtToggleAnimation.on((data: IAnimation) => {
  if (data.startAnimation) {
    animate()
  } else {
    stopAnimation()
  }
})

/**
 * Stop Animation function
 */
const stopAnimation = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null

    // Reset gradient
    Object.assign(baseRectConfig.value, {
      fillLinearGradientColorStops: [0, 'green', 1, 'darkgreen'],
    })
  }
}
</script>

<template>
  <v-group :config="{ x, y }">
    <!-- Animated Gradient Rectangle -->
    <v-rect :config="baseRectConfig" />
  </v-group>
</template>

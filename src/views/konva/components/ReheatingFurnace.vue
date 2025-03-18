<script setup lang="ts">
import type Konva from 'konva'

type Props = {
  x: number
  y: number
}

const props = defineProps<Props>()


// Define [Node Position]
const xPos = props.x
const yPos = props.y

// Base rectangle configuration
const baseRectConfig = {
  x: 50,
  y: 70,
  width: 100,
  height: 60,
  stroke: 'black',
  strokeWidth: 5,
  cornerRadius: 10,
}

// Inner rectangles configuration
const rectsConfig = [
  { x: 60, y: 90, width: 20, height: 20, fill: 'black' },
  { x: 90, y: 90, width: 20, height: 20, fill: 'black' },
  { x: 120, y: 90, width: 20, height: 20, fill: 'black' },
]

// 🔥 Custom Flame Shape
const flameConfig = {
  sceneFunc: (context: Konva.Context, shape: Konva.Shape) => {
    context.beginPath()
    context.moveTo(30, 60)
    context.bezierCurveTo(10, 20, 40, 10, 25, 0) // Left curve
    context.bezierCurveTo(50, 10, 70, 20, 50, 60) // Right curve
    context.closePath()
    context.fillStrokeShape(shape)
  },
  fill: 'orange',
  scaleX: 1.2,
  scaleY: 1.4,
  x: 40,
  y: -20,
}
</script>

<template>
  <v-group :config="{ xPos, yPos }">
    <!-- Base Rectangle -->
    <v-rect :config="baseRectConfig" />

    <!-- Inner Rectangles -->
    <v-rect v-for="(rect, index) in rectsConfig" :key="index" :config="rect" />

    <!-- Flame Path -->
    <v-path :config="{ ...flameConfig, scaleX: 1.2, scaleY: 1.2, x: 70, y: 10 }" />
  </v-group>
</template>

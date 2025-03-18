<script setup lang="ts">
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
  width: 150,
  height: 10,
  stroke: 'black',
  fill: 'black',
}
</script>

<template>
  <v-group :config="{ xPos , yPos }">
    <!-- Base Rectangle -->
    <v-rect :config="baseRectConfig" />
  </v-group>
</template>

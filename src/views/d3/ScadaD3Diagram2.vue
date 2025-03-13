<template>
  <div ref="scadaContainer" class="scada-container">
    <svg width="800" height="400">
      <!-- Furnace -->
      <circle ref="furnace" class="furnace" cx="100" cy="200" r="50" />

      <!-- Valve -->
      <circle ref="valve" class="valve closed" cx="300" cy="200" r="20" @click="toggleValve" />

      <!-- Tank -->
      <circle ref="tank" class="tank" cx="500" cy="200" r="60" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'

// Define reactive state for furnace temperature, tank level, and valve state
const furnaceTemp = ref(0)
const tankLevel = ref(0)
const valveOpen = ref(false)

// Refs to access the SVG elements
const furnace = ref(null)
const valve = ref(null)
const tank = ref(null)

// Method to toggle valve state
const toggleValve = () => {
  valveOpen.value = !valveOpen.value
  updateValveState()
}

// Method to update valve appearance based on its state
const updateValveState = () => {
  const valveElement = d3.select(valve.value)
  if (valveOpen.value) {
    valveElement.classed('open', true).classed('closed', false)
  } else {
    valveElement.classed('closed', true).classed('open', false)
  }
}

// Simulate real-time data update
const updateRealTimeData = () => {
  furnaceTemp.value = Math.random() * 100
  tankLevel.value = Math.random() * 100

  // Update furnace color based on temperature
  const furnaceElement = d3.select(furnace.value)
  furnaceElement.attr('fill', d3.interpolateViridis(furnaceTemp.value / 100))

  // Update tank color based on level
  const tankElement = d3.select(tank.value)
  tankElement.attr('fill', d3.interpolateBlues(tankLevel.value / 100))
}

// Initialize the diagram after the component is mounted
onMounted(() => {
  updateValveState()
  setInterval(updateRealTimeData, 2000) // Simulate real-time data every 2 seconds
})
</script>

<style scoped>
.scada-container {
  margin: 20px;
}

.furnace {
  fill: #ff5733;
}

.tank {
  fill: #1f77b4;
}

.valve {
  fill: #ffeb3b;
  cursor: pointer;
}

.valve.open {
  fill: #76ff03;
}

.valve.closed {
  fill: #ffeb3b;
}
</style>

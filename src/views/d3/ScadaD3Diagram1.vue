<template>
  <div class="p-4 bg-gray-100 border rounded-lg w-200">
    <h2 class="text-lg font-bold text-center">SCADA Diagram (D3.js) - Reheating Furnace</h2>
    <svg ref="scadaSvg" width="600" height="400"></svg>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'

const scadaSvg = ref(null)
const tankLevel = ref(50)
const furnaceTemp = ref(600) // Initial furnace temperature
const valveOpen = ref(false)
const furnaceOn = ref(false)

onMounted(() => {
  const svg = d3.select(scadaSvg.value)

  // 1️⃣ Draw Tank (Fluid Storage)
  svg
    .append('rect')
    .attr('x', 100)
    .attr('y', 50)
    .attr('width', 100)
    .attr('height', 150)
    .attr('fill', 'lightblue')
    .attr('stroke', 'black')

  // Tank Level Indicator
  const liquid = svg
    .append('rect')
    .attr('x', 100)
    .attr('y', 200 - tankLevel.value * 1.5)
    .attr('width', 100)
    .attr('height', tankLevel.value * 1.5)
    .attr('fill', 'blue')

  // 2️⃣ Pipe connecting Tank to Furnace
  svg
    .append('rect')
    .attr('x', 140)
    .attr('y', 200)
    .attr('width', 20)
    .attr('height', 50)
    .attr('fill', 'gray')

  // 3️⃣ Valve (Click to Toggle)
  const valve = svg
    .append('circle')
    .attr('cx', 150)
    .attr('cy', 260)
    .attr('r', 10)
    .attr('fill', valveOpen.value ? 'green' : 'red')
    .on('click', () => {
      valveOpen.value = !valveOpen.value
      valve.attr('fill', valveOpen.value ? 'green' : 'red')
    })

  // 4️⃣ Furnace Structure
  svg
    .append('rect')
    .attr('x', 300)
    .attr('y', 150)
    .attr('width', 200)
    .attr('height', 100)
    .attr('fill', 'gray')
    .attr('stroke', 'black')

  // Furnace Fire (Dynamic Temperature Indicator)
  const fire = svg
    .append('rect')
    .attr('x', 320)
    .attr('y', 200)
    .attr('width', 160)
    .attr('height', 40)
    .attr('fill', 'orange')

  // 5️⃣ Furnace Temperature Display
  svg
    .append('text')
    .attr('x', 350)
    .attr('y', 140)
    .attr('font-size', '16px')
    .attr('fill', 'black')
    .text('Furnace Temp:')

  const tempText = svg
    .append('text')
    .attr('x', 450)
    .attr('y', 140)
    .attr('font-size', '16px')
    .attr('fill', furnaceTemp.value > 900 ? 'red' : 'black')
    .text(furnaceTemp.value + '°C')

  // Furnace Toggle Button (Simulates ON/OFF)
  svg
    .append('rect')
    .attr('x', 520)
    .attr('y', 160)
    .attr('width', 50)
    .attr('height', 30)
    .attr('fill', 'blue')
    .attr('cursor', 'pointer')
    .on('click', () => {
      furnaceOn.value = !furnaceOn.value
      fire.attr('fill', furnaceOn.value ? 'red' : 'orange')
    })

  svg
    .append('text')
    .attr('x', 530)
    .attr('y', 180)
    .attr('font-size', '14px')
    .attr('fill', 'white')
    .attr('pointer-events', 'none')
    .text('ON/OFF')

  // 6️⃣ Simulated Data Updates
  setInterval(() => {
    tankLevel.value = valveOpen.value
      ? Math.min(tankLevel.value + 5, 100)
      : Math.max(tankLevel.value - 5, 0)

    furnaceTemp.value = furnaceOn.value
      ? Math.min(furnaceTemp.value + 20, 1200)
      : Math.max(furnaceTemp.value - 10, 600)

    // Animate liquid level change
    liquid
      .transition()
      .duration(500)
      .attr('y', 200 - tankLevel.value * 1.5)
      .attr('height', tankLevel.value * 1.5)

    // Update furnace temperature text
    tempText.text(furnaceTemp.value + '°C').attr('fill', furnaceTemp.value > 900 ? 'red' : 'black')
  }, 1000)
})
</script>

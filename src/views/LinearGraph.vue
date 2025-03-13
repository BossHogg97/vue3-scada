<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Plotly from 'plotly.js-dist-min'

const chartDiv = ref<HTMLDivElement | null>(null)
const chartDiv2 = ref<HTMLDivElement | null>(null)

const xArray = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150]
const yArray = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15]

// Define Data
const data = [
  {
    x: xArray,
    y: yArray,
    mode: 'markers', // It can be [lines]
  },
]

onMounted(() => {
  if (chartDiv.value) {
    Plotly.newPlot(chartDiv.value, [
      { x: [1, 2, 3, 4, 5], y: [10, 15, 7, 12, 18], type: 'scatter' },
    ])
  }

  if (chartDiv2.value) {
    // Define Layout
    const layout = {
      xaxis: { range: [40, 160], title: 'Square Meters' },
      yaxis: { range: [5, 16], title: 'Price in Millions' },
      title: 'House Prices vs. Size',
    }

    // Display with Plotly
    Plotly.newPlot(chartDiv2.value, data, layout)
  }
})
</script>

<template>
  <div class="about flex flex-col">
    <div ref="chartDiv" style="width: 100%; height: 400px"></div>

    <div ref="chartDiv2" style="width: 100%; height: 400px"></div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

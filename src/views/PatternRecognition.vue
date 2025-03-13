<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { NButton } from 'naive-ui'

class XYPlotter {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  xMax: number
  yMax: number
  xMin: number
  yMin: number

  constructor(canvasId: string) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement
    if (!canvas) throw new Error('Canvas element not found')
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.xMax = this.canvas.width
    this.yMax = this.canvas.height
    this.xMin = 0
    this.yMin = 0
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  plotLine(x1: number, y1: number, x2: number, y2: number, color: string) {
    this.ctx.strokeStyle = color
    this.ctx.beginPath()
    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    this.ctx.stroke()
  }

  plotPoint(x: number, y: number, color: string) {
    this.ctx.fillStyle = color
    this.ctx.beginPath()
    this.ctx.arc(x, y, 3, 0, 2 * Math.PI)
    this.ctx.fill()
  }
}

const plotter = ref<XYPlotter | null>(null)

const definePlotter = () => {
  if (!plotter.value) {
    plotter.value = new XYPlotter('myCanvas')
  }

  plotter.value.clearCanvas() // Clear before redrawing

  const xMax = plotter.value.xMax
  const yMax = plotter.value.yMax
  const xMin = plotter.value.xMin
  // const yMin = plotter.value.yMin

  // Generate Random Points
  const numPoints = 500
  const xPoints: number[] = []
  const yPoints: number[] = []
  for (let i = 0; i < numPoints; i++) {
    xPoints[i] = Math.random() * xMax
    yPoints[i] = Math.random() * yMax
  }

  // Define Line Function
  function f(x: number) {
    return x * 1.2 + 50
  }

  // Plot the Line
  plotter.value.plotLine(xMin, f(xMin), xMax, f(xMax), 'black')

  // Compute and Display Points
  for (let i = 0; i < numPoints; i++) {
    const color = yPoints[i] > f(xPoints[i]) ? 'black' : 'blue'
    plotter.value.plotPoint(xPoints[i], yPoints[i], color)
  }
}

onMounted(() => {
  definePlotter()
})

const refreshPlotter = () => {
  definePlotter() // Clear & redraw
}
</script>

<template>
  <div class="flex flex-col">
    <canvas
      id="myCanvas"
      width="400px"
      height="400px"
      style="width: 100%; max-width: 400px; border: 1px solid black"
    ></canvas>

    <div class="w-10 mt-2">
      <n-button @click="refreshPlotter">Refresh Plotter</n-button>
    </div>
  </div>
</template>

const reheatingFurnace = new Konva.Stage({
  container: 'container',
  width: 200,
  height: 200,
})

const layer = new Konva.Layer()

// Create the base rectangle
const baseRect = new Konva.Rect({
  x: 50,
  y: 70,
  width: 100,
  height: 60,
  stroke: 'black',
  strokeWidth: 5,
  cornerRadius: 10,
})

// Create the inner rectangles (representing control elements)
const rect1 = new Konva.Rect({ x: 60, y: 90, width: 20, height: 20, fill: 'black' })
const rect2 = new Konva.Rect({ x: 90, y: 90, width: 20, height: 20, fill: 'black' })
const rect3 = new Konva.Rect({ x: 120, y: 90, width: 20, height: 20, fill: 'black' })

// Create a path for the flame shape
const flame = new Konva.Path({
  data: 'M100,30 C90,20 80,10 85,5 C95,-5 110,10 100,25 C110,15 120,10 125,5 C135,-5 140,10 130,25 C120,40 110,50 100,60 Z',
  fill: 'black',
})

layer.add(baseRect, rect1, rect2, rect3, flame)
reheatingFurnace.add(layer)

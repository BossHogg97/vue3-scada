import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/linearGraph',
      name: 'linearGraph',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LinearGraph.vue'),
    },
    {
      path: '/patternRecognition',
      name: 'patternRecognition',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PatternRecognition.vue'),
    },
    {
      path: '/vueKonva',
      name: 'vueKonva',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/konva/VueKonva.vue'),
    },
    {
      path: '/scada/diagram',
      name: 'scadaDiagram',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/scada/ScadaDiagram.vue'),
    },
    {
      path: '/scada/d3/diagram/v1',
      name: 'scadaD3Diagram',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/d3/ScadaD3Diagram1.vue'),
    },
    {
      path: '/scada/d3/diagram/v2',
      name: 'scadaD3DiagramV2',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/d3/ScadaD3Diagram2.vue'),
    },
  ],
})

export default router

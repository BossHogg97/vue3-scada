<script setup lang="ts">
// Component Imports
import ReheatingFurnace from './components/ReheatingFurnace.vue'
import NodeConnection from './components/NodeConnection.vue'

// Utility Imports
import { NButton } from 'naive-ui'
import { useEventBus } from '@vueuse/core'
import { ref } from 'vue'

// Enum Imports
import { EnumEvents } from '@/enums/business'

// Event definition
const evtToggleAnimation = useEventBus<IAnimation>(EnumEvents.ToggleAnimation)

const animationStatus = ref<boolean>(false)

/**
 * Utility function used for change status and toggle the animation
 */
const changeStatus = () => {
  // toggle animation status
  animationStatus.value = !animationStatus.value

  const statusEvt: IAnimation = {
    startAnimation: animationStatus.value,
  }

  evtToggleAnimation.emit(statusEvt)
}
</script>

<template>
  <div class="flex flex-col">
    <div class="border border-solid rounded-md shadow-sm">
      <v-stage ref="stageRef" :config="{ width: 1100, height: 400 }">
        <v-layer>
          <!-- First furnace at default position -->
          <reheating-furnace :x="100" :y="50" />
        </v-layer>

        <v-layer>
          <node-connection :x="225" :y="70" />
        </v-layer>

        <v-layer>
          <!-- Second furnace moved to the right -->
          <reheating-furnace :x="400" :y="50" />
        </v-layer>
      </v-stage>
    </div>

    <div class="w-30 mt-2">
      <n-button type="primary" @click="changeStatus">Change Status</n-button>
    </div>
  </div>
</template>

<template>
  <header class="app-header" data-testid="app-header">
    <h1 class="app-title">Horse Racing</h1>
    <div class="actions">
      <BaseButton
        :disabled="isRunning || hasError"
        data-testid="btn-generate"
        @click="store.dispatch('generateProgram')"
      >
        Generate
      </BaseButton>
      <BaseButton
        :disabled="!store.getters.hasProgram || hasError"
        data-testid="btn-start-pause"
        @click="onProgramTriggered"
      >
        {{ isRunning ? 'Pause' : 'Start' }}
      </BaseButton>
      <BaseButton data-testid="btn-reset" @click="onResetRace">Reset</BaseButton>
    </div>
  </header>
</template>

<script setup lang="ts">
import BaseButton from './shared/BaseButton.vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import { useRaceSimulation } from '@/composables/useRaceSimulation'

const store = useStore(key)
const { isRunning, hasError, onProgramTriggered, onResetRace } = useRaceSimulation()
</script>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  background: #2c3e50;
  color: #fff;
}

.app-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
  flex: 1;
}

.actions {
  display: flex;
  gap: 0.5rem;
}
</style>

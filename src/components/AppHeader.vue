<template>
  <header class="app-header" data-testid="app-header">
    <h1 class="app-title">Horse Racing</h1>
    <div class="actions">
      <BaseButton :disabled="isRunning" data-testid="btn-generate"> Generate </BaseButton>
      <BaseButton :disabled="!hasProgram || isFinished" data-testid="btn-start-pause">
        {{ isRunning ? 'Pause' : 'Start' }}
      </BaseButton>
      <BaseButton data-testid="btn-reset">Reset</BaseButton>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from './shared/BaseButton.vue'

const isRunning = ref(false)
const hasProgram = ref(false)
const isFinished = ref(false)
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

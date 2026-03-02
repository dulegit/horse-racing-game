<template>
  <div class="race-lane" :data-testid="`lane-${lane}`">
    <span class="lane-number">{{ lane }}</span>
    <span class="horse-name">{{ horse.name }}</span>
    <div class="lane-track">
      <RaceHorse :horse :progress />
    </div>
    <div class="finish-mark"></div>
  </div>
</template>

<script setup lang="ts">
import type { Horse } from '@/types'
import RaceHorse from './RaceHorse.vue'

defineProps<{
  lane: number
  horse: Horse
  progress: number
}>()
</script>

<style scoped>
.race-lane {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  height: 30px;
  border-bottom: 1px solid #e0e0e0;
}

.lane-number {
  width: 18px;
  font-size: 0.7rem;
  color: #888;
  text-align: center;
  flex-shrink: 0;
}

.horse-name {
  width: 70px;
  font-size: 0.7rem;
  color: #444;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-shrink: 0;
}

.lane-track {
  flex: 1;
  position: relative;
  height: 100%;
  background: #f9f9f9;
  padding-right: 32px;
}

.finish-mark {
  width: 3px;
  height: 100%;
  background: #e74c3c;
  flex-shrink: 0;
}
</style>

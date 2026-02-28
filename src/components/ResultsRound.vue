<template>
  <div class="results-round" :data-testid="`results-round-${result.roundIndex}`">
    <div class="round-header">{{ ordinal(result.roundIndex) }} Lap &mdash; {{ result.distance }}m</div>
    <ol class="placement-list">
      <li v-for="(placement, i) in result.placements" :key="placement.horseId">
        <span class="position">{{ i + 1 }}.</span>
        <span class="swatch" :style="{ backgroundColor: horsesById[placement.horseId]?.color }"></span>
        <span class="name">{{ horsesById[placement.horseId]?.name ?? `Horse ${placement.horseId}` }}</span>
        <span class="time">{{ placement.timeMs }}ms</span>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import type { RoundResult, Horse } from '@/types'

defineProps<{
  result: RoundResult
  horsesById: Record<number, Horse>
}>()

const ORDINALS = ['', '1st', '2nd', '3rd', '4th', '5th', '6th']
function ordinal(n: number): string {
  return ORDINALS[n] ?? `${n}th`
}
</script>

<style scoped>
.results-round {
  border-bottom: 1px solid #eee;
  padding: 0.4rem 0.5rem;
}

.round-header {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #555;
  margin-bottom: 0.25rem;
}

.placement-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.75rem;
  color: #444;
}

.placement-list li {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.1rem 0;
}

.position {
  width: 18px;
  color: #888;
  flex-shrink: 0;
}

.swatch {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.name {
  flex: 1;
}

.time {
  color: #888;
  font-size: 0.7rem;
}
</style>

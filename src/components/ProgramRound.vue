<template>
  <div class="program-round" :data-testid="`program-round-${round.roundIndex}`">
    <div class="round-header">{{ ordinal(round.roundIndex) }} Lap &mdash; {{ round.distance }}m</div>
    <ol class="horse-list">
      <li v-for="id in round.horseIds" :key="id">
        <span class="swatch" :style="{ backgroundColor: horsesById[id]?.color }"></span>
        {{ horsesById[id]?.name ?? `Horse ${id}` }}
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import type { RoundProgram, Horse } from '@/types'

defineProps<{
  round: RoundProgram
  horsesById: Record<number, Horse>
}>()

const ORDINALS = ['', '1st', '2nd', '3rd', '4th', '5th', '6th']
function ordinal(n: number): string {
  return ORDINALS[n] ?? `${n}th`
}
</script>

<style scoped>
.program-round {
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

.horse-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.75rem;
  color: #444;
}

.horse-list li {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.1rem 0;
}

.swatch {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
</style>

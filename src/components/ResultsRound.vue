<template>
  <div class="results-round" :data-testid="`results-round-${result.roundId}`">
    <div class="table-caption">{{ ordinal(result.roundId) }} Lap &mdash; {{ result.distance }}m</div>
    <BaseTable :columns :items>
      <template #name="{ item }">
        <span class="swatch" :style="{ backgroundColor: horses.get(item.key)?.color }"></span>
        {{ item.name }}
      </template>
    </BaseTable>
  </div>
</template>

<script setup lang="ts">
import type { RoundResult, Horse } from '@/types'
import BaseTable from './shared/BaseTable.vue'
import { computed } from 'vue'

type Props = {
  result: RoundResult
  horses: Map<Horse['id'], Horse>
}

const { result, horses } = defineProps<Props>()

const ORDINALS = ['', '1st', '2nd', '3rd', '4th', '5th', '6th']
function ordinal(n: number): string {
  return ORDINALS[n] ?? `${n}th`
}

const columns = computed(() => [
  { label: 'Position', key: 'position' },
  { label: 'Name', key: 'name' },
])

const items = computed(() =>
  result.horseIds.map((place, i) => {
    const horse = horses.get(place)
    return {
      key: place,
      position: i + 1,
      name: horse?.name ?? `Horse ${place}`,
    }
  }),
)
</script>

<style scoped>
.results-round {
  border-bottom: 1px solid #eee;
  background-color: #fff;
}

.table-caption {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
  background-color: #4a90d9;
  padding: 0.25rem;
  text-align: center;
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

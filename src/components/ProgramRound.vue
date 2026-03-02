<template>
  <div class="program-round" :data-testid="`program-round-${round.roundId}`">
    <div class="table-caption">{{ ordinal(round.roundId) }} Lap &mdash; {{ round.distance }}m</div>
    <BaseTable :columns :items>
      <template #name="{ item }">
        <span class="swatch" :style="{ backgroundColor: horses.get(item.key)?.color }"></span>
        {{ item.name }}
      </template>
    </BaseTable>
  </div>
</template>

<script setup lang="ts">
import type { RoundProgram, Horse } from '@/types'
import BaseTable from './shared/BaseTable.vue'
import { computed } from 'vue'

type Props = {
  round: RoundProgram
  horses: Map<Horse['id'], Horse>
}

const { round, horses } = defineProps<Props>()

const ORDINALS = ['', '1st', '2nd', '3rd', '4th', '5th', '6th']
function ordinal(n: number): string {
  return ORDINALS[n] ?? `${n}th`
}

const columns = computed(() => [
  { label: 'Lane', key: 'position' },
  { label: 'Name', key: 'name' },
])

const items = computed(() =>
  round.horseIds.map((id, i) => {
    const horse = horses.get(id)
    return {
      key: id,
      position: i + 1,
      name: horse?.name ?? `Horse ${id}`,
    }
  }),
)
</script>

<style scoped>
.program-round {
  background-color: #fff;
  border-bottom: 1px solid #eee;
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

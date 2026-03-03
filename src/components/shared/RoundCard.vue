<template>
  <div class="round-card" :data-testid="testid">
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
import type { RaceRound, Horse } from '@/types'
import BaseTable from '@/components/shared/BaseTable.vue'
import { computed } from 'vue'

type Props = {
  round: RaceRound
  horses: Map<Horse['id'], Horse>
  firstColumnLabel?: string
  testid?: string
}

const { round, horses, firstColumnLabel = 'Position', testid } = defineProps<Props>()

const ORDINALS = ['', '1st', '2nd', '3rd', '4th', '5th', '6th']
function ordinal(n: number): string {
  return ORDINALS[n] ?? `${n}th`
}

const columns = computed(() => [
  { label: firstColumnLabel, key: 'position' },
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
.round-card {
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

.swatch {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
</style>

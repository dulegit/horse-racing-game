<template>
  <div class="race-track-panel" data-testid="race-track">
    <SectionHeader color="#4a90d9">
      <template v-if="currentRoundProgram"> Round {{ 1 }} / {{ 6 }} &mdash; {{ 1200 }}m </template>
      <template v-else>Race Track</template>
    </SectionHeader>
    <div class="lanes" data-testid="race-lanes">
      <RaceLane
        v-for="lane in lanes"
        :key="lane.horseId"
        :lane="lane.laneNumber"
        :horse="lane.horse"
        :progress="lane.progress"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'
import SectionHeader from './shared/SectionHeader.vue'
import RaceLane from './RaceLane.vue'
import type { RoundProgram } from '@/types'

const currentRoundProgram: Ref<RoundProgram | null> = ref(null) // Placeholder for current round program data
const lanes = computed(() => {
  return [
    {
      horseId: 0,
      laneNumber: 1,
      horse: {
        id: 0,
        name: 'Horse 1',
        color: '#3498db',
        condition: 80,
      },
      progress: 0,
    },
  ]
})
</script>

<style scoped>
.race-track-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.lanes {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
}
</style>

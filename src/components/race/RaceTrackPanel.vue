<template>
  <div class="race-track-panel" data-testid="race-track">
    <SectionHeader color="#4a90d9">
      <template v-if="currentRoundProgram">
        Round {{ currentRoundProgram.roundId }} / {{ totalRounds }} &mdash; {{ currentRoundProgram.distance }}m
      </template>
      <template v-else>Race Track</template>
    </SectionHeader>
    <div class="lanes" data-testid="race-lanes">
      <RaceLane
        v-for="lane in Array.from(lanes.values())"
        :key="lane.horse.id"
        :lane="lane.laneNumber"
        :horse="lane.horse"
        :progress="lane.progress"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'
import SectionHeader from '@/components/shared/SectionHeader.vue'
import RaceLane from '@/components/race/RaceLane.vue'
import type { RaceRound } from '@/types'
import { useStore } from 'vuex'
import { key } from '@/store'

const store = useStore(key)

const currentRoundProgram: Ref<RaceRound | null> = computed(() => store.getters.currentRoundProgram)
const totalRounds = computed(() => store.state.race.program.length)
const lanes = computed(() => store.state.race.raceProgress)
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

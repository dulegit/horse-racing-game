<template>
  <div class="results-panel" data-testid="results-panel">
    <SectionHeader color="#2ecc71">Results</SectionHeader>
    <div class="rounds" data-testid="results-rounds">
      <ResultsRound v-for="result in results" :key="result.roundIndex" :result="result" :horses-by-id />
    </div>
  </div>
</template>

<script setup lang="ts">
import SectionHeader from './shared/SectionHeader.vue'
import ResultsRound from './ResultsRound.vue'
import { ref } from 'vue'

const results = ref([
  {
    roundIndex: 1,
    distance: 1200,
    placements: [{ horseId: 0, timeMs: 120 }],
  },
])
const horsesById = ref({
  0: { id: 0, name: 'Horse 1', color: '#3498db', condition: 80 },
})
</script>

<style scoped>
.results-panel {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.rounds {
  flex: 1;
  overflow-y: auto;
}
</style>

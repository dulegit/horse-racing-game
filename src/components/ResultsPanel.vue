<template>
  <div class="results-panel" data-testid="results-panel">
    <SectionHeader color="#2ecc71">Results</SectionHeader>
    <div class="rounds" data-testid="results-rounds">
      <ResultsRound v-for="result in results" :key="result.roundId" :result="result" :horses />
    </div>
  </div>
</template>

<script setup lang="ts">
import SectionHeader from './shared/SectionHeader.vue'
import ResultsRound from './ResultsRound.vue'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'

const store = useStore(key)
const results = computed(() => store.state.results.results)
const horses = computed(() => store.state.horses.horses)
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

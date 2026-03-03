<template>
  <div class="program-panel" data-testid="program-panel">
    <SectionHeader color="#f39c12">Program</SectionHeader>
    <div class="rounds" data-testid="program-rounds">
      <ProgramRound v-for="round in program" :key="round.roundId" :round :horses />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import SectionHeader from '@/components/shared/SectionHeader.vue'
import ProgramRound from '@/components/program/ProgramRound.vue'
import { key } from '@/store'

const store = useStore(key)
const program = computed(() => store.state.race.program)
const horses = computed(() => store.state.horses.horses)
</script>

<style scoped>
.program-panel {
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

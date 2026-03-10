<template>
  <div class="app">
    <AppHeader />
    <div v-if="store.state.horses.errorMessage" class="error-message">
      {{ store.state.horses.errorMessage }}
    </div>
    <main v-else class="columns">
      <aside class="col-left">
        <HorseListPanel />
      </aside>
      <section class="col-center">
        <RaceTrackPanel />
      </section>
      <aside class="col-right">
        <ProgramPanel />
        <ResultsPanel />
      </aside>
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import HorseListPanel from '@/components/horses/HorseListPanel.vue'
import RaceTrackPanel from '@/components/race/RaceTrackPanel.vue'
import ProgramPanel from '@/components/program/ProgramPanel.vue'
import ResultsPanel from '@/components/results/ResultsPanel.vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import { onMounted } from 'vue'

const store = useStore(key)

onMounted(() => store.dispatch('horses/initHorses'))
</script>
<style>
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #ecf0f1;
  color: #2c3e50;
}
</style>
<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.columns {
  display: grid;
  grid-template-columns: minmax(200px, auto) 1fr minmax(400px, auto);
  overflow: hidden;
}

.col-left {
  overflow-y: auto;
  border-right: 1px solid #ddd;
}

.col-center {
  overflow-y: auto;
  border-right: 1px solid #ddd;
}

.col-right {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.25rem;
  background-color: #ecf0f1;
  overflow: hidden;
}

.error-message {
  color: red;
  text-align: center;
  margin: 20px;
}
</style>

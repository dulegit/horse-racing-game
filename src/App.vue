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
import AppHeader from './components/AppHeader.vue'
import HorseListPanel from './components/HorseListPanel.vue'
import RaceTrackPanel from './components/RaceTrackPanel.vue'
import ProgramPanel from './components/ProgramPanel.vue'
import ResultsPanel from './components/ResultsPanel.vue'
import { useStore } from 'vuex'
import { key } from './store'
import { onMounted } from 'vue'

const store = useStore(key)

onMounted(() => store.dispatch('initHorses'))
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.columns {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.col-left {
  width: 200px;
  overflow-y: auto;
  border-right: 1px solid #ddd;
  flex-shrink: 0;
}

.col-center {
  flex: 1;
  overflow-y: auto;
  border-right: 1px solid #ddd;
}

.col-right {
  width: 260px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-shrink: 0;
}

.error-message {
  color: red;
  text-align: center;
  margin: 20px;
}
</style>

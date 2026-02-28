<template>
  <div class="horse-list-panel" data-testid="horse-list">
    <SectionHeader color="#fa8072">Horses</SectionHeader>
    <BaseTable>
      <template #head>
        <tr>
          <th>Name</th>
          <th>Condition</th>
          <th>Color</th>
        </tr>
      </template>
      <template #body>
        <HorseTableRow v-for="horse in horses" :key="horse.id" :horse="horse" />
      </template>
    </BaseTable>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import SectionHeader from './shared/SectionHeader.vue'
import BaseTable from './shared/BaseTable.vue'
import HorseTableRow from './HorseTableRow.vue'
import { key } from '@/store'

const store = useStore(key)
const horses = computed(() => store.state.horses.horses)
</script>

<style scoped>
.horse-list-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>

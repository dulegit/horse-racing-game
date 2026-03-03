<template>
  <div class="horse-list-panel" data-testid="horse-list">
    <SectionHeader color="#fa8072">Horses</SectionHeader>
    <BaseTable :columns :items>
      <template #color="{ item }">
        <span class="color-swatch" :style="{ backgroundColor: item.color }"></span>
      </template>
    </BaseTable>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import SectionHeader from '@/components/shared/SectionHeader.vue'
import BaseTable from '@/components/shared/BaseTable.vue'
import { key } from '@/store'

const store = useStore(key)

const horses = computed(() => store.state.horses.horses)

const columns = computed(() => [
  { label: 'Name', key: 'name' },
  { label: 'Condition', key: 'condition', width: 70 },
  { label: 'Color', key: 'color' },
])
const items = computed(() =>
  Array.from(horses.value.values()).map((horse) => ({
    key: horse.id,
    name: horse.name,
    condition: horse.condition,
    color: horse.color,
  })),
)
</script>

<style scoped>
.horse-list-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.color-swatch {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  vertical-align: middle;
}
</style>

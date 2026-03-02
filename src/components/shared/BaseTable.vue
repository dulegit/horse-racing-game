<template>
  <table class="base-table">
    <thead>
      <tr>
        <th v-for="column in visibleColumns" :key="column.label">{{ column.label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.key">
        <td v-for="column in visibleColumns" :key="column.key">
          <slot v-if="Object.keys($slots).includes(column['key'])" :name="column['key']" :item="item" />
          <span v-else>{{ item[column.key as keyof typeof item] }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts" generic="T">
import { computed } from 'vue'

type Column = {
  label: string
  key: string
  isHidden?: boolean
}

type Item = T & { key: string | number }

type Props = {
  columns: Column[]
  items: Item[]
}

const { columns, items } = defineProps<Props>()

const visibleColumns = computed(() => columns.filter((col) => !col.isHidden))
</script>

<style scoped>
.base-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
}

.base-table :deep(th) {
  text-align: left;
  padding: 0.3rem 0.5rem;
  background: #f0f0f0;
  border-bottom: 1px solid #ddd;
}

.base-table :deep(td) {
  padding: 0.3rem 0.5rem;
  border-bottom: 1px solid #e0e0e0;
}
</style>

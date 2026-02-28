<template>
  <tr>
    <td>{{ horse.name }}</td>
    <td>{{ horse.condition }}</td>
    <td>
      <span class="color-swatch" :style="{ backgroundColor: horse.color }"></span>
    </td>
  </tr>
</template>

<script setup lang="ts">
import type { Horse } from '@/types'
type Props = {
  horse: Horse
}
defineProps<Props>()
</script>

<style scoped>
.color-swatch {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  vertical-align: middle;
}
</style>

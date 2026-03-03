<template>
  <div
    class="race-horse"
    :data-testid="`horse-${horse.id}`"
    :style="{ left: `${progress}%`, borderColor: horse.color }"
  >
    <img src="@/assets/horse-running.svg" alt="Horse" />
  </div>
</template>

<script setup lang="ts">
import type { Horse } from '@/types'

defineProps<{ horse: Horse; progress: number }>()
</script>

<style scoped>
.race-horse {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  border-bottom: 2px solid currentColor;
  background: #fff;
  transition: left 0.08s linear;
}
</style>

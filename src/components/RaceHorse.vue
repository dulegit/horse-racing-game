<template>
  <div class="race-horse" :data-testid="`horse-${horse.id}`"></div>
</template>

<script setup lang="ts">
import type { Horse } from '@/types'

defineProps<{ horse: Horse }>()
</script>

<style scoped>
.race-horse {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 3px solid currentColor;
  background: #fff;
  transition: left 0.08s linear;
}
</style>

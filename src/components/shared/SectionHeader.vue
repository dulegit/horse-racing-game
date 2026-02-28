<template>
  <div class="section-header" :style="{ backgroundColor: color }">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  color?: string
}>()
</script>

<style scoped>
.section-header {
  padding: 0.4rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #fff;
}
</style>

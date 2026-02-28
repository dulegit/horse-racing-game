<template>
  <button type="button" class="base-button" v-bind="$attrs">
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  padding: 0.4rem 0.9rem;
  border: none;
  border-radius: 4px;
  background: #4a90d9;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.base-button:hover:not(:disabled) {
  background: #357abd;
}

.base-button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
</style>

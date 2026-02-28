<template>
  <table class="base-table">
    <thead>
      <slot name="head" />
    </thead>
    <tbody>
      <slot name="body" />
    </tbody>
  </table>
</template>

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
  border-bottom: 1px solid #eee;
}
</style>

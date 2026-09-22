<template>
  <div class="min-h-screen bg-bg text-fg">
    <AppHeader />
    <main>
      <slot />
    </main>
    <footer class="border-t">
      <div class="container-x flex flex-wrap items-center justify-between gap-3 py-6 text-sm md:text-base text-muted">
        <span class="font-semibold text-fg">Farrel Octanov R.G.</span>
        <span>© {{ year }}</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
footer {
  border-color: var(--border);
  background-color: var(--card);
}
</style>

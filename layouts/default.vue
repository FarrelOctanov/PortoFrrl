<template>
  <div class="min-h-screen bg-bg text-fg">
    <!-- Skip to main content: visible on keyboard focus, hidden otherwise. -->
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <AppHeader />
    <main id="main-content">
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

/* Skip link: sr-only until focused by keyboard. */
.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  z-index: 9999;
  padding: 0.65rem 1.25rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--primary-fg);
  background: var(--primary);
  border-radius: 0 0 0.5rem 0.5rem;
  text-decoration: none;
  transition: top 0.15s ease;
}

.skip-link:focus {
  top: 0;
}
</style>

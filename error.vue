<template>
  <div class="container-x anim-fade-in py-10 text-center">
    <img
      :src="notFoundImg"
      alt="Page not found illustration"
      class="error-img"
      width="480"
      height="360"
      loading="lazy"
    />
    <div v-if="error?.statusCode === 404">
      <h1>Oops! Halaman tidak ditemukan</h1>
      <p class="text-muted">We could not find that page you were looking for.</p>
    </div>
    <div v-else>
      <h1>An error occurred</h1>
      <p v-if="error?.message" class="text-muted">{{ error.message }}</p>
    </div>
    <div class="mt-4 flex justify-center gap-2">
      <BaseButton to="/">🏠 Go Home</BaseButton>
      <BaseButton @click="handleError">Clear error & go home</BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import notFoundImg from '~/assets/404.png'

defineProps<{
  error: { statusCode: number; message: string }
}>()

const handleError = () => clearError({ redirect: '/' })
</script>

<style scoped>
.error-img {
  width: min(100%, 420px);
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: contain;
  margin: 0 auto 1rem;
  display: block;
}
</style>

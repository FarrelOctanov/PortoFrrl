<template>
  <div ref="el" class="reveal" :class="{ 'is-visible': visible }" :style="style">
    <slot />
  </div>
</template>

<script setup lang="ts">
export interface RevealProps {
  /** Stagger ringan dalam ms; dijepit 0..250 agar tidak terasa lambat. */
  delay?: number
}

const props = withDefaults(defineProps<RevealProps>(), { delay: 0 })

const el = ref<HTMLElement | null>(null)
// Terlihat sejak SSR: konten tidak pernah bergantung pada JS/observer.
// Saat client mount (tanpa reduced-motion), sembunyikan dulu lalu reveal via observer.
const visible = ref(true)

let observer: IntersectionObserver | null = null

const clampedDelay = computed(() => Math.min(250, Math.max(0, props.delay)))
const style = computed(() => (clampedDelay.value > 0 ? { transitionDelay: `${clampedDelay.value}ms` } : undefined))

onMounted(() => {
  // Reduced motion / tanpa IO: tetap terlihat, tanpa animasi.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (!('IntersectionObserver' in window)) return
  // Persenjatai efek: sembunyikan, lalu reveal saat masuk viewport.
  visible.value = false
  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        visible.value = true
        observer?.disconnect()
        observer = null
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  )
  if (el.value) observer.observe(el.value)
})

onUnmounted(() => {
  observer?.disconnect()
  observer = null
})
</script>

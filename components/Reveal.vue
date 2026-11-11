<template>
  <div
    v-if="clampedDelay > 0"
    ref="el"
    class="reveal"
    :class="{ 'is-visible': visible }"
    :style="{ transitionDelay: `${clampedDelay}ms` }"
  >
    <slot />
  </div>
  <div
    v-else
    ref="el"
    class="reveal"
    :class="{ 'is-visible': visible }"
  >
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

onMounted(() => {
  // Reduced motion / tanpa IO: tetap terlihat, tanpa animasi.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (!('IntersectionObserver' in window)) return

  // Fix FOIC: jika elemen sudah ada di viewport saat mount (mis. Hero section),
  // jangan sembunyikan — langsung biarkan visible=true tanpa animasi.
  // Hanya sembunyikan elemen yang memang berada di luar viewport saat halaman dimuat.
  const rect = el.value?.getBoundingClientRect()
  const alreadyInView = rect && rect.top < window.innerHeight && rect.bottom > 0
  if (alreadyInView) return

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

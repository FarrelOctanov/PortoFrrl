<template>
  <NuxtLink
    v-if="to"
    ref="btnRef"
    :to="to"
    class="action-btn group"
    :class="variant === 'primary' ? 'primary' : ''"
    :style="magneticStyle"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <slot />
  </NuxtLink>
  <a
    v-else-if="href"
    ref="btnRef"
    :href="href"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    class="action-btn group"
    :class="variant === 'primary' ? 'primary' : ''"
    :style="magneticStyle"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <slot />
  </a>
  <button
    v-else
    ref="btnRef"
    :type="type"
    :disabled="disabled"
    class="action-btn group"
    :class="variant === 'primary' ? 'primary' : ''"
    :style="magneticStyle"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
export type BaseButtonVariant = 'primary' | 'outline'

export interface BaseButtonProps {
  /** Link internal (NuxtLink). Prioritas di atas href. */
  to?: string | null
  /** Link eksternal (<a> aman). */
  href?: string | null
  variant?: BaseButtonVariant
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
  to: null,
  href: null,
  variant: 'outline',
  type: 'button',
  disabled: false
})

const isExternal = computed(() => {
  if (!props.href) return false
  return !props.href.startsWith('mailto:') && !props.href.startsWith('#')
})

// Subtle Magnetic Hover Physics on Desktop
const btnRef = ref<HTMLElement | null>(null)
const magneticStyle = ref<{ transform?: string; transition?: string }>({})
let rafId: number | null = null

const isTouchOrReduced = () => {
  if (typeof window === 'undefined') return true
  return (
    window.matchMedia('(hover: none)').matches ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

const onMouseMove = (e: MouseEvent) => {
  if (isTouchOrReduced()) return
  if (rafId) cancelAnimationFrame(rafId)

  rafId = requestAnimationFrame(() => {
    const el = (btnRef.value as any)?.$el || btnRef.value
    if (!el || !(el instanceof HTMLElement)) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)

    // Subtle magnetic pull (damped to 3-4px max)
    const pullX = Math.round(x * 0.12)
    const pullY = Math.round(y * 0.12)

    magneticStyle.value = {
      transform: `translate3d(${pullX}px, ${pullY}px, 0)`,
      transition: 'transform 0.1s ease-out'
    }
  })
}

const onMouseLeave = () => {
  if (rafId) cancelAnimationFrame(rafId)
  magneticStyle.value = {
    transform: 'translate3d(0, 0, 0)',
    transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
  }
}

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

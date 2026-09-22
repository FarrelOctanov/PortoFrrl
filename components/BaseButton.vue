<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="action-btn"
    :class="variant === 'primary' ? 'primary' : ''"
  >
    <slot />
  </NuxtLink>
  <a
    v-else-if="href"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    class="action-btn"
    :class="variant === 'primary' ? 'primary' : ''"
  >
    <slot />
  </a>
  <button
    v-else
    :type="type"
    :disabled="disabled"
    class="action-btn"
    :class="variant === 'primary' ? 'primary' : ''"
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

withDefaults(defineProps<BaseButtonProps>(), {
  to: null,
  href: null,
  variant: 'outline',
  type: 'button',
  disabled: false
})
</script>

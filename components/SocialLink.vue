<template>
  <a
    v-if="to"
    :href="to"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="accessibleLabel"
  >
    <slot>{{ label }}</slot>
  </a>
</template>

<script setup lang="ts">
export interface SocialLinkProps {
  /** URL tujuan. Kosong/null -> tidak render apa pun. */
  to?: string | null
  /** Label aksesibel + fallback teks bila slot kosong. */
  label?: string | null
}

const props = withDefaults(defineProps<SocialLinkProps>(), {
  to: '',
  label: ''
})

const accessibleLabel = computed(() => props.label || props.to || 'External link')
</script>

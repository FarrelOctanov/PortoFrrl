<template>
  <div>
    <p v-if="eyebrow" class="text-xs md:text-sm font-bold uppercase tracking-widest text-accent mb-1.5">
      {{ eyebrow }}
    </p>
    <component :is="tag">
      <slot />
    </component>
  </div>
</template>

<script setup lang="ts">
export interface SectionHeadingProps {
  level?: 1 | 2 | 3
  eyebrow?: string | null
}

const props = withDefaults(defineProps<SectionHeadingProps>(), {
  level: 2,
  eyebrow: null
})

const tag = computed(() => (props.level === 1 ? 'h1' : props.level === 3 ? 'h3' : 'h2'))
</script>

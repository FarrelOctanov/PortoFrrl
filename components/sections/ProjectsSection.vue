<template>
  <div>
    <SectionHeading :level="2" eyebrow="Portofolio">Projects</SectionHeading>
    <p class="text-muted mt-2 text-base md:text-lg max-w-3xl leading-relaxed">
      Project terpilih yang saya kembangkan dalam bidang sistem informasi geospasial (GIS), machine learning, perancangan sistem, dan utilitas digital.
    </p>

    <!-- 2x2 Balanced Responsive Grid for 4 Projects -->
    <div class="mt-8 grid gap-6 md:grid-cols-2 lg:gap-8">
      <Reveal v-for="(p, i) in projects" :key="p.title" :delay="i * 70">
        <ProjectCard :project="p" />
      </Reveal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { projects } from '~/data/portfolio'
</script>

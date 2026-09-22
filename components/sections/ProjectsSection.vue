<template>
  <div>
    <SectionHeading :level="2" eyebrow="Portofolio">Projects</SectionHeading>
    <p class="text-muted mt-2 text-base md:text-lg">
      Tiga project utama yang saya kembangkan dalam bidang machine learning, perancangan sistem, dan utilitas digital.
    </p>

    <div class="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      <Reveal v-for="(p, i) in projects" :key="p.title" :delay="i * 90">
        <article class="card project-card flex h-full flex-col justify-between">
          <div>
            <!-- Visual Header -->
            <div class="project-media-wrap mb-4 overflow-hidden rounded-lg">
              <img
                v-if="p.image"
                :src="p.image"
                :alt="p.imageAlt || p.title"
                class="project-img"
                loading="lazy"
                width="640"
                height="360"
              />
              <div v-else class="project-placeholder flex flex-col items-center justify-center p-6 text-center">
                <!-- Clean Minimalist Neumorphic System Icon -->
                <div class="placeholder-icon-wrap mb-3 flex items-center justify-center">
                  <svg
                    class="h-10 w-10 text-accent opacity-90"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="1.6"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <span class="text-xs font-bold uppercase tracking-wider text-muted">Web Application</span>
                <span class="mt-0.5 text-sm font-semibold text-fg">POS & Inventory Management</span>
              </div>
            </div>

            <!-- Title & Description -->
            <h3 class="text-lg font-bold text-fg md:text-xl">{{ p.title }}</h3>
            <p class="mt-2.5 text-sm leading-relaxed text-muted md:text-base">
              {{ p.description }}
            </p>
          </div>

          <!-- Verified Tech Stack Badges -->
          <div class="mt-6 pt-4 border-t border-border/70">
            <div class="flex flex-wrap gap-1.5">
              <span v-for="tech in p.technologies" :key="tech" class="tag">
                {{ tech }}
              </span>
            </div>
          </div>
        </article>
      </Reveal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { projects } from '~/data/portfolio'
</script>

<style scoped>
.project-card {
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
}

.project-media-wrap {
  aspect-ratio: 16 / 9;
  background-color: var(--card-subtle);
  border: 1px solid var(--border);
}

.project-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.25s ease;
}

@media (hover: hover) {
  .project-card:hover .project-img {
    transform: scale(1.02);
  }
}

.project-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(145deg, var(--card), var(--card-subtle));
}

.placeholder-icon-wrap {
  width: 58px;
  height: 58px;
  border-radius: 12px;
  background: var(--card);
  border: 1px solid var(--border);
  box-shadow: var(--neu-btn);
}
</style>

<template>
  <div
    ref="el"
    class="project-card-wrap h-full"
    :style="tiltStyle"
  >
    <article
      class="card project-card group flex h-full flex-col justify-between"
      tabindex="0"
      :aria-label="`Project: ${project.title}`"
    >
      <div>
        <!-- Visual Media Header (16:9 aspect ratio) -->
        <div class="project-media-wrap mb-5 overflow-hidden rounded-lg">
          <!-- 1. Dedicated Image / SVG Preview -->
          <div v-if="project.image" class="media-container relative h-full w-full">
            <img
              :src="project.image"
              :alt="project.imageAlt || project.title"
              class="project-img"
              loading="lazy"
              width="640"
              height="360"
            />
            <!-- Ambient Category Pill Overlay -->
            <div class="media-badge-overlay" aria-hidden="true">
              <span class="media-category-pill">
                {{ project.category || 'Featured Project' }}
              </span>
            </div>
          </div>

          <!-- 2. Typographic Fallback for POS & Inventory -->
          <div v-else class="project-placeholder flex flex-col items-start justify-end p-5">
            <span class="project-placeholder-eyebrow">Web Application &amp; POS</span>
            <span class="project-placeholder-title">POS &amp;<br />Inventory</span>
            <div class="media-badge-overlay" aria-hidden="true">
              <span class="media-category-pill">
                Laravel System
              </span>
            </div>
          </div>
        </div>

        <!-- Category & Location Eyebrow -->
        <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span class="text-xs font-semibold text-accent">
            {{ project.category || 'Software Project' }}
          </span>
          <span v-if="project.location" class="inline-flex items-center text-xs font-medium text-muted">
            <MapPin :size="12" class="mr-1 inline-block shrink-0 text-accent" aria-hidden="true" /> {{ project.location }}
          </span>
        </div>

        <!-- Project Title with kinetic trailing arrow -->
        <h3 class="project-title text-lg font-bold text-fg md:text-xl">
          <span class="title-text">{{ project.title }}</span>
          <span class="trailing-arrow" aria-hidden="true">↗</span>
        </h3>

        <!-- Description -->
        <p class="mt-2.5 text-sm leading-relaxed text-muted md:text-base">
          {{ project.description }}
        </p>
      </div>

      <!-- Verified Tech Stack Badges -->
      <div class="mt-6 pt-4 border-t border-border/70">
        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="tech in project.technologies"
            :key="tech"
            class="tag transition-all duration-150 hover:border-accent/40 hover:text-accent hover:bg-[var(--surface-highlight)]"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { MapPin } from 'lucide-vue-next'
import type { Project } from '~/data/portfolio'

const props = defineProps<{
  project: Project
}>()

// 3D Perspective Tilt on Desktop
const { el, tiltStyle } = useTilt({ maxTilt: 4, perspective: 1000 })
</script>

<style scoped>
.project-card-wrap {
  transform-style: preserve-3d;
  will-change: transform;
}

.project-card {
  position: relative;
  transition: box-shadow 0.25s ease, border-color 0.25s ease;
}

.project-media-wrap {
  aspect-ratio: 16 / 9;
  background-color: var(--card-subtle);
  border: 1px solid var(--border);
  position: relative;
}

.project-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

@media (hover: hover) {
  .project-card:hover .project-img {
    transform: scale(1.035);
  }
}

.media-badge-overlay {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  pointer-events: none;
}

.media-category-pill {
  display: inline-block;
  padding: 0.25rem 0.65rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: #f8fafc;
  background: rgba(15, 23, 42, 0.78);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 9999px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.dark .media-category-pill {
  background: rgba(11, 15, 25, 0.82);
  border-color: color-mix(in srgb, var(--accent) 25%, transparent);
}

/* Typographic placeholder fallback */
.project-placeholder {
  width: 100%;
  height: 100%;
  background: #0f172a;
  border: 1px solid var(--border);
  padding: 1.25rem 1.4rem;
  position: relative;
}

.project-placeholder-eyebrow {
  display: block;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: rgba(248, 250, 252, 0.6);
  margin-bottom: 0.4rem;
}

.project-placeholder-title {
  display: block;
  font-size: clamp(1.4rem, 3.2vw, 2rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #f8fafc;
}

/* Title & kinetic arrow */
.project-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  transition: color 0.2s ease;
}

.trailing-arrow {
  display: inline-block;
  color: var(--accent-interactive);
  opacity: 0.75;
  font-size: 1.15rem;
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease;
}

@media (hover: hover) {
  .project-card:hover .project-title {
    color: var(--accent-interactive);
  }
  .project-card:hover .trailing-arrow {
    transform: translate(3px, -3px);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-card-wrap {
    transform: none !important;
  }
  .project-img {
    transform: none !important;
  }
  .trailing-arrow {
    transform: none !important;
  }
}
</style>

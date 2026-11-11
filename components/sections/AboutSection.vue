<template>
  <div>
    <SectionHeading :level="2" eyebrow="Tentang">Tentang Saya</SectionHeading>

    <!-- Top Grid: Bio Statement (Left) & Academic Timeline (Right) -->
    <div class="mt-8 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
      <!-- Left: Narrative Bio & Data Diri -->
      <Reveal>
        <div class="space-y-4 text-base leading-relaxed md:text-lg text-muted">
          <p>
            Saya <b class="text-fg font-semibold">{{ profile.name }}</b>, {{ profile.role.toLowerCase() }} dengan fokus pada
            {{ profile.focus.toLowerCase() }}. Saya tertarik pada pengembangan web, machine
            learning, desain grafis, serta perancangan sistem dan pemetaan digital.
          </p>
          <p>
            Saya terbiasa memecahkan masalah secara sistematis, berpikir analitis, dan bekerja sama
            dalam tim. Saya adaptif, komunikatif, disiplin, dan memiliki perhatian terhadap detail.
          </p>
        </div>

        <!-- Data Diri Chips -->
        <h3 class="mt-8 text-xl font-bold md:text-2xl text-fg">Data Diri</h3>
        <ul class="mt-4 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-1" role="list">
          <li class="data-chip group">
            <span class="chip-icon" aria-hidden="true">
              <UserRound :size="18" :stroke-width="1.85" class="text-accent" />
            </span>
            <div class="chip-text">
              <span class="text-muted text-xs uppercase tracking-wider block">Nama</span>
              <b class="text-fg text-sm md:text-base">{{ profile.name }}</b>
            </div>
          </li>
          <li class="data-chip group">
            <span class="chip-icon" aria-hidden="true">
              <GraduationCap :size="18" :stroke-width="1.85" class="text-accent" />
            </span>
            <div class="chip-text">
              <span class="text-muted text-xs uppercase tracking-wider block">Pendidikan</span>
              <b class="text-fg text-sm md:text-base">{{ profile.major }}, {{ profile.school }}</b>
            </div>
          </li>
          <li class="data-chip group">
            <span class="chip-icon" aria-hidden="true">
              <Compass :size="18" :stroke-width="1.85" class="text-accent" />
            </span>
            <div class="chip-text">
              <span class="text-muted text-xs uppercase tracking-wider block">Latar Belakang</span>
              <b class="text-fg text-sm md:text-base">{{ profile.focus }}</b>
            </div>
          </li>
          <li class="data-chip group">
            <span class="chip-icon" aria-hidden="true">
              <MapPin :size="18" :stroke-width="1.85" class="text-accent" />
            </span>
            <div class="chip-text">
              <span class="text-muted text-xs uppercase tracking-wider block">Lokasi</span>
              <b class="text-fg text-sm md:text-base">{{ profile.location }}</b>
            </div>
          </li>
          <li class="data-chip group">
            <span class="chip-icon" aria-hidden="true">
              <CalendarDays :size="18" :stroke-width="1.85" class="text-accent" />
            </span>
            <div class="chip-text">
              <span class="text-muted text-xs uppercase tracking-wider block">Tempat, Tanggal Lahir</span>
              <b class="text-fg text-sm md:text-base">{{ profile.birthInfo }}</b>
            </div>
          </li>
        </ul>
      </Reveal>

      <!-- Right: Academic Timeline Track -->
      <Reveal :delay="100">
        <h3 class="text-xl font-bold md:text-2xl text-fg">Pendidikan</h3>
        <div class="timeline-track mt-5 space-y-6">
          <div
            v-for="(e, idx) in education"
            :key="e.school"
            class="timeline-item relative pl-7"
          >
            <!-- Timeline Node Indicator -->
            <div class="timeline-node" aria-hidden="true">
              <span class="node-inner" />
            </div>

            <!-- Education Card -->
            <div class="card timeline-card">
              <div class="flex flex-wrap items-center justify-between gap-1 mb-1">
                <b class="text-base md:text-lg text-fg">{{ e.school }}</b>
                <span class="period-badge">{{ e.period }}</span>
              </div>
              <p class="text-sm md:text-base text-muted my-0 font-medium">
                {{ e.major }}
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>

    <!-- Middle: Experience Showcase (3 Cards) -->
    <Reveal :delay="60">
      <div class="mt-14">
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-bold md:text-2xl text-fg">Pengalaman</h3>
          <span class="text-xs uppercase tracking-wider text-accent font-semibold">Riwayat Praktik &amp; Kerja</span>
        </div>
        <div class="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="x in experience"
            :key="x.place"
            class="card flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:border-accent/40"
          >
            <div>
              <div class="flex items-center justify-between gap-2 mb-1.5">
                <h4 class="text-lg font-bold text-fg">{{ x.place }}</h4>
              </div>
              <p class="text-xs md:text-sm font-semibold text-accent mb-3">
                {{ x.role }} • <span class="text-muted font-normal">{{ x.period }}</span>
              </p>
              <ul class="list-disc space-y-2 pl-4 text-sm md:text-base text-muted">
                <li v-for="p in x.points" :key="p" class="leading-relaxed">{{ p }}</li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </Reveal>

    <!-- Bottom: Organizations (2 Cards) -->
    <Reveal :delay="80">
      <div class="mt-14">
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-bold md:text-2xl text-fg">Organisasi</h3>
          <span class="text-xs uppercase tracking-wider text-accent font-semibold">Aktivitas &amp; Kepanitiaan</span>
        </div>
        <div class="mt-5 grid gap-5 md:grid-cols-2">
          <article
            v-for="o in organizations"
            :key="o.place"
            class="card transition-all duration-200 hover:-translate-y-1 hover:border-accent/40"
          >
            <h4 class="text-lg font-bold text-fg mb-1">{{ o.place }}</h4>
            <p class="text-xs md:text-sm font-semibold text-accent mb-3">
              {{ o.role }} • <span class="text-muted font-normal">{{ o.period }}</span>
            </p>
            <ul class="list-disc space-y-2 pl-4 text-sm md:text-base text-muted">
              <li v-for="p in o.points" :key="p" class="leading-relaxed">{{ p }}</li>
            </ul>
          </article>
        </div>
      </div>
    </Reveal>

    <!-- Soft Skills: Interactive Grid of Badges -->
    <Reveal :delay="100">
      <div class="mt-14">
        <h3 class="text-xl font-bold md:text-2xl text-fg mb-4">Soft Skills</h3>
        <ul class="grid list-none gap-3 p-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" role="list">
          <li
            v-for="s in softSkills"
            :key="s"
            class="card skill-chip flex items-center justify-center gap-2 text-center font-semibold text-sm md:text-base transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:text-accent select-none"
          >
            <span class="skill-dot" aria-hidden="true" />
            <span>{{ s }}</span>
          </li>
        </ul>
      </div>
    </Reveal>
  </div>
</template>

<script setup lang="ts">
import {
  CalendarDays,
  Compass,
  GraduationCap,
  MapPin,
  UserRound
} from 'lucide-vue-next'
import { education, experience, organizations, profile, softSkills } from '~/data/portfolio'
</script>

<style scoped>
/* Timeline Rail */
.timeline-track {
  position: relative;
  border-left: 2px solid color-mix(in srgb, var(--accent) 30%, var(--border));
}

.timeline-item {
  position: relative;
}

.timeline-node {
  position: absolute;
  left: -7px;
  top: 1.25rem;
  width: 14px;
  height: 14px;
  border-radius: 9999px;
  background: var(--card);
  border: 2px solid var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 6px rgba(2, 132, 199, 0.3);
}

.dark .timeline-node {
  box-shadow: 0 0 8px rgba(56, 189, 248, 0.4);
}

.node-inner {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: var(--accent);
}

.timeline-card {
  padding: 1.15rem 1.4rem;
}

.period-badge {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
}

/* Data-diri chips */
.data-chip {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.75rem 1.15rem;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  box-shadow: var(--neu-flat);
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.data-chip:hover {
  border-color: color-mix(in srgb, var(--accent) 40%, var(--border));
  transform: translateY(-1px);
}

.chip-icon {
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background: var(--card-subtle);
  flex-shrink: 0;
}

/* Soft Skills Chips */
.skill-chip {
  padding: 0.85rem 1.25rem;
  border-radius: 0.75rem;
}

.skill-dot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background-color: var(--accent);
  opacity: 0.75;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.skill-chip:hover .skill-dot {
  transform: scale(1.4);
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .data-chip:hover,
  .skill-chip:hover {
    transform: none !important;
  }
}
</style>

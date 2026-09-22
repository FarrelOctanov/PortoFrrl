<template>
  <div>
    <SectionHeading :level="2" eyebrow="Tentang">Tentang Saya</SectionHeading>
    <div class="mt-6 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
      <Reveal>
        <div class="space-y-4 text-base leading-relaxed md:text-lg">
          <p>
            Saya {{ profile.name }}, {{ profile.role.toLowerCase() }} dengan fokus pada
            {{ profile.focus.toLowerCase() }}. Saya tertarik pada pengembangan web, machine
            learning, desain grafis, serta perancangan sistem dan pemetaan digital.
          </p>
          <p>
            Saya terbiasa memecahkan masalah secara sistematis, berpikir analitis, dan bekerja sama
            dalam tim. Saya adaptif, komunikatif, disiplin, dan memiliki perhatian terhadap detail.
          </p>
        </div>

        <h3 class="mt-8 text-xl font-bold md:text-2xl">Data Diri</h3>
        <ul class="mt-4 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-1">
          <li class="card skill-chip">
            <span class="text-muted">Nama:</span> <b class="text-fg ml-1">{{ profile.name }}</b>
          </li>
          <li class="card skill-chip">
            <span class="text-muted">Pendidikan:</span> <b class="text-fg ml-1">{{ profile.major }}, {{ profile.school }}</b>
          </li>
          <li class="card skill-chip">
            <span class="text-muted">Latar belakang:</span> <b class="text-fg ml-1">{{ profile.focus }}</b>
          </li>
          <li class="card skill-chip">
            <span class="text-muted">Lokasi:</span> <b class="text-fg ml-1">{{ profile.location }}</b>
          </li>
        </ul>
      </Reveal>

      <Reveal :delay="120">
        <h3 class="text-xl font-bold md:text-2xl">Pendidikan</h3>
        <ul class="mt-4 grid list-none gap-4 p-0">
          <li v-for="e in education" :key="e.school" class="card skill-chip">
            <b class="text-base md:text-lg text-fg">{{ e.school }}</b><br />
            <span class="text-sm md:text-base text-muted">{{ e.major }} • {{ e.period }}</span>
          </li>
        </ul>
      </Reveal>
    </div>

    <Reveal>
      <h3 class="mt-12 text-xl font-bold md:text-2xl">Pengalaman</h3>
      <div class="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <article v-for="x in experience" :key="x.place" class="card flex flex-col justify-between">
          <div>
            <h4 class="text-lg font-bold text-fg">{{ x.place }}</h4>
            <p class="mt-1 text-sm font-medium text-accent">{{ x.role }} • {{ x.period }}</p>
            <ul class="mt-3 list-disc space-y-1.5 pl-5 text-sm md:text-base text-muted">
              <li v-for="p in x.points" :key="p">{{ p }}</li>
            </ul>
          </div>
        </article>
      </div>
    </Reveal>

    <Reveal>
      <h3 class="mt-12 text-xl font-bold md:text-2xl">Organisasi</h3>
      <div class="mt-4 grid gap-5 md:grid-cols-2">
        <article v-for="o in organizations" :key="o.place" class="card">
          <h4 class="text-lg font-bold text-fg">{{ o.place }}</h4>
          <p class="mt-1 text-sm font-medium text-accent">{{ o.role }} • {{ o.period }}</p>
          <ul class="mt-3 list-disc space-y-1.5 pl-5 text-sm md:text-base text-muted">
            <li v-for="p in o.points" :key="p">{{ p }}</li>
          </ul>
        </article>
      </div>
    </Reveal>

    <Reveal>
      <h3 class="mt-12 text-xl font-bold md:text-2xl">Soft Skills</h3>
      <ul class="mt-4 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="s in softSkills" :key="s" class="card skill-chip text-center font-semibold">
          {{ s }}
        </li>
      </ul>
    </Reveal>
  </div>
</template>

<script setup lang="ts">
import { education, experience, organizations, profile, softSkills } from '~/data/portfolio'
</script>

<style scoped>
.skill-chip {
  padding: 0.85rem 1.25rem;
}
</style>

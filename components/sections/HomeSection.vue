<template>
  <div ref="heroRef" class="relative overflow-hidden" @mousemove="onHeroMouseMove" @mouseleave="onHeroMouseLeave">
    <!-- Subtle Ambient Glow Mesh Layer (GPU-accelerated, responds gently to cursor) -->
    <div
      class="hero-ambient-mesh"
      :style="{
        transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`
      }"
      aria-hidden="true"
    >
      <div class="ambient-orb ambient-orb-1" />
      <div class="ambient-orb ambient-orb-2" />
    </div>

    <Reveal>
      <div class="hero-grid relative z-10">
        <!-- Left: Interactive Avatar Frame with Double-Bezel and Perspective Depth -->
        <div class="flex flex-col items-center md:items-start">
          <div
            ref="avatarTiltEl"
            class="avatar-outer-shell group"
            :style="avatarTiltStyle"
            @mouseenter="toggleAvatar"
            @mouseleave="toggleAvatar"
            @click="toggleAvatar"
            title="Klik atau arahkan pointer untuk beralih avatar"
          >
            <div class="avatar-inner-ring">
              <img
                :src="avatar"
                class="avatar-img"
                alt="Avatar profil Farrel Octanov R.G."
                width="280"
                height="280"
                fetchpriority="high"
              />
            </div>
          </div>
        </div>

        <!-- Right: Expressive Editorial Intro -->
        <div class="hero-content">
          <!-- Status pill badge -->
          <div class="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-card px-3.5 py-1 text-xs md:text-sm font-semibold tracking-wide text-accent shadow-sm">
            <span class="status-pulse-dot" aria-hidden="true" />
            <span>{{ profile.role }}</span>
          </div>

          <h1 class="intro">
            Halo 👋,<br />saya {{ profile.name }}.
          </h1>

          <div class="info">
            Mahasiswa S1 Teknik Informatika yang berfokus pada <b>{{ profile.focus }}</b>.
          </div>

          <div class="mt-6 flex flex-wrap items-center gap-3">
            <BaseButton to="/#about">
              Tentang Saya
            </BaseButton>
            <BaseButton to="/#contact" variant="primary">
              Hubungi Saya <span class="ml-1.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
            </BaseButton>
          </div>

          <div class="social-icons">
            <SocialLink :to="contact.emailHref" label="Email">Email</SocialLink>
            <SocialLink :to="whatsappLink" label="WhatsApp">WhatsApp</SocialLink>
            <SocialLink :to="contact.instagram" label="Instagram">Instagram</SocialLink>
            <SocialLink :to="contact.kitalulus" label="Kitalulus">Kitalulus</SocialLink>
          </div>
        </div>
      </div>
    </Reveal>
  </div>
</template>

<script setup lang="ts">
import avatar1 from '~/assets/avatar-1.webp'
import avatar2 from '~/assets/avatar-2.webp'
import { contact, profile } from '~/data/portfolio'

const avatar = ref<string>(avatar1)
const toggleAvatar = () => {
  avatar.value = avatar.value === avatar1 ? avatar2 : avatar1
}

const whatsappLink = computed(
  () => `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappText)}`
)

// Subtle 3D Tilt for Avatar
const { el: avatarTiltEl, tiltStyle: avatarTiltStyle } = useTilt({ maxTilt: 6, perspective: 800 })

// Ambient Pointer Reaction for Hero Background
const heroRef = ref<HTMLElement | null>(null)
const mouseOffset = reactive({ x: 0, y: 0 })
let rafId: number | null = null

const onHeroMouseMove = (e: MouseEvent) => {
  if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (window.matchMedia('(hover: none)').matches) return

  if (rafId) cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(() => {
    if (!heroRef.value) return
    const rect = heroRef.value.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    // Gentle damping range -16px to +16px
    mouseOffset.x = Math.round(x * 16)
    mouseOffset.y = Math.round(y * 16)
  })
}

const onHeroMouseLeave = () => {
  if (rafId) cancelAnimationFrame(rafId)
  mouseOffset.x = 0
  mouseOffset.y = 0
}

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<style scoped>
/* Ambient Mesh Layer */
.hero-ambient-mesh {
  position: absolute;
  inset: -20px;
  pointer-events: none;
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 1;
}

.ambient-orb {
  position: absolute;
  border-radius: 9999px;
  filter: blur(60px);
  opacity: 0.6;
  pointer-events: none;
}

.ambient-orb-1 {
  top: 10%;
  right: 15%;
  width: 280px;
  height: 280px;
  background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
  opacity: 0.12;
}

.ambient-orb-2 {
  bottom: 10%;
  left: 10%;
  width: 220px;
  height: 220px;
  background: radial-gradient(circle, #38bdf8 0%, transparent 70%);
  opacity: 0.08;
}

.dark .ambient-orb-1 {
  opacity: 0.18;
}

.dark .ambient-orb-2 {
  opacity: 0.14;
}

/* Double-Bezel Avatar Framing */
.avatar-outer-shell {
  padding: 6px;
  border-radius: 9999px;
  background: var(--card);
  border: 1px solid var(--border);
  box-shadow: var(--neu-flat);
  cursor: pointer;
  transform-style: preserve-3d;
  will-change: transform;
}

.avatar-inner-ring {
  padding: 3px;
  border-radius: 9999px;
  background: color-mix(in srgb, var(--accent) 15%, transparent);
  transition: background-color 0.25s ease;
}

.avatar-outer-shell:hover .avatar-inner-ring {
  background: color-mix(in srgb, var(--accent) 40%, transparent);
}

.avatar-img {
  width: 190px;
  height: 190px;
  border-radius: 9999px;
  object-fit: cover;
  display: block;
  transition: transform 0.25s ease;
}

@media (min-width: 768px) {
  .avatar-img {
    width: 220px;
    height: 220px;
  }
}

@media (min-width: 1024px) {
  .avatar-img {
    width: clamp(230px, 17vw, 290px);
    height: clamp(230px, 17vw, 290px);
  }
}

@media (max-width: 420px) {
  .avatar-img {
    width: 150px;
    height: 150px;
  }
}

/* Pulsing Status Dot */
.status-pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background-color: #10b981;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.7);
  display: inline-block;
  animation: status-pulse 2s infinite ease-in-out;
}

@keyframes status-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.35);
    opacity: 0.55;
  }
}

@media (prefers-reduced-motion: reduce) {
  .status-pulse-dot {
    animation: none;
  }
  .hero-ambient-mesh {
    transform: none !important;
  }
  .avatar-outer-shell {
    transform: none !important;
  }
}
</style>

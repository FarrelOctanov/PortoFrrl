<template>
  <div class="relative">
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
          <div class="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-[var(--surface-highlight)] px-3.5 py-1 text-xs md:text-sm font-semibold tracking-wide text-accent shadow-sm">
            <span class="status-indicator-dot" aria-hidden="true" />
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
</script>

<style scoped>
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
  background: color-mix(in srgb, var(--accent-interactive) 15%, transparent);
  transition: background-color 0.25s ease;
}

.avatar-outer-shell:hover .avatar-inner-ring {
  background: color-mix(in srgb, var(--accent-interactive) 35%, transparent);
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

/* Static, Clean Status Indicator Dot (Tanpa Animasi Infinite & Tanpa Neon Glow) */
.status-indicator-dot {
  width: 7px;
  height: 7px;
  border-radius: 9999px;
  background-color: #10b981;
  display: inline-block;
}

@media (prefers-reduced-motion: reduce) {
  .avatar-outer-shell {
    transform: none !important;
  }
}
</style>

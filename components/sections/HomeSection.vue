<template>
  <Reveal>
    <div class="hero-grid">
      <div class="flex justify-center md:justify-start">
        <img
          :src="avatar"
          class="avatar-img"
          alt="Avatar profil"
          width="280"
          height="280"
          fetchpriority="high"
          @mouseenter="toggleAvatar"
          @mouseleave="toggleAvatar"
        />
      </div>
      <div>
        <p class="text-sm font-semibold uppercase tracking-widest text-accent">
          {{ profile.role }}
        </p>
        <h1 class="intro">Halo 👋,<br />saya {{ profile.name }}.</h1>
        <div class="info">
          Mahasiswa S1 Teknik Informatika yang berfokus pada <b>{{ profile.focus }}</b>.
        </div>
        <div class="mt-5 flex flex-wrap gap-1">
          <BaseButton to="/#about">Tentang Saya</BaseButton>
          <BaseButton to="/#contact" variant="primary">Hubungi Saya</BaseButton>
        </div>
        <div class="social-icons">
          <SocialLink :to="`mailto:${contact.email}`" label="Email">Email</SocialLink>
          <SocialLink :to="whatsappLink" label="WhatsApp">WhatsApp</SocialLink>
          <SocialLink :to="contact.instagram" label="Instagram">Instagram</SocialLink>
          <SocialLink :to="contact.kitalulus" label="Kitalulus">Kitalulus</SocialLink>
        </div>
      </div>
    </div>
  </Reveal>
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
</script>

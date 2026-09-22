<template>
  <div>
    <SectionHeading :level="2" eyebrow="Kontak">Hubungi Saya 📫</SectionHeading>
    <p class="text-muted mt-2 text-base md:text-lg">
      Punya pertanyaan atau ingin berkolaborasi? Silakan hubungi saya melalui salah satu saluran di bawah ini.
    </p>

    <div class="mt-8 flex max-w-xl flex-col gap-3.5">
      <!-- 1. Email -->
      <a class="action-btn text-center md:text-left" :href="emailLink">
        <span class="mr-2" aria-hidden="true">✉️</span> Kirim Email
      </a>

      <!-- 2. WhatsApp (Primary CTA) -->
      <BaseButton :href="whatsappLink" variant="primary" class="text-center md:text-left">
        <span class="mr-2" aria-hidden="true">💬</span> Chat WhatsApp
      </BaseButton>

      <!-- 3. Instagram -->
      <BaseButton :href="contact.instagram" class="text-center md:text-left">
        <span class="mr-2" aria-hidden="true">📷</span> Instagram (@_farrel.16)
      </BaseButton>

      <!-- 4. Kitalulus -->
      <BaseButton :href="contact.kitalulus" class="text-center md:text-left">
        <span class="mr-2" aria-hidden="true">💼</span> Profil Kitalulus
      </BaseButton>

      <p class="mt-2 text-sm text-muted">
        WhatsApp: <span class="font-semibold text-fg">{{ contact.whatsappDisplay }}</span> • Email: <span class="font-semibold text-fg">{{ contact.email }}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { contact } from '~/data/portfolio'

const whatsappLink = computed(
  () => `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappText)}`
)

const emailLink = computed(
  () => `mailto:${contact.email}?subject=${encodeURIComponent(contact.emailSubject)}`
)
</script>

<template>
  <div>
    <!-- Two-column layout on desktop: statement left, contact links right.
         Structurally distinct from About (grid of cards) and Projects (3-col card grid). -->
    <div class="contact-grid">
      <!-- Left: statement -->
      <Reveal>
        <SectionHeading :level="2" eyebrow="Kontak">Hubungi Saya</SectionHeading>
        <p class="text-muted mt-4 text-base md:text-lg leading-relaxed max-w-md">
          Punya pertanyaan atau ingin berkolaborasi? Silakan hubungi saya melalui salah satu saluran di bawah ini.
        </p>
        <p class="mt-5 text-sm text-muted">
          WhatsApp: <span class="font-semibold text-fg">{{ contact.whatsappDisplay }}</span> •
          Email: <span class="font-semibold text-fg" v-html="contact.emailHtml"></span>
        </p>
      </Reveal>

      <!-- Right: contact actions stacked -->
      <Reveal :delay="80">
        <div class="contact-actions">
          <!-- 1. Email -->
          <BaseButton :href="emailLink">
            <Mail :size="17" class="mr-2.5 shrink-0" aria-hidden="true" /> Kirim Email
          </BaseButton>

          <!-- 2. WhatsApp (Primary CTA) -->
          <BaseButton :href="whatsappLink" variant="primary">
            <MessageCircle :size="17" class="mr-2.5 shrink-0" aria-hidden="true" /> Chat WhatsApp
          </BaseButton>

          <!-- 3. Instagram -->
          <BaseButton :href="contact.instagram">
            <Instagram :size="17" class="mr-2.5 shrink-0" aria-hidden="true" /> Instagram (@_farrel.16)
          </BaseButton>

          <!-- 4. Kitalulus -->
          <BaseButton :href="contact.kitalulus">
            <Briefcase :size="17" class="mr-2.5 shrink-0" aria-hidden="true" /> Profil Kitalulus
          </BaseButton>
        </div>
      </Reveal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Briefcase, Instagram, Mail, MessageCircle } from 'lucide-vue-next'
import { contact } from '~/data/portfolio'

const whatsappLink = computed(
  () => `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappText)}`
)

const emailLink = computed(
  () => `${contact.emailHref}?subject=${encodeURIComponent(contact.emailSubject)}`
)
</script>

<style scoped>
.contact-grid {
  display: grid;
  gap: 3rem;
}

@media (min-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr 1fr;
    align-items: start;
    gap: clamp(3rem, 5vw, 6rem);
  }
}

.contact-actions {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  max-width: 28rem;
}
</style>

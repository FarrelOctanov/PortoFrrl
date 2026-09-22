<template>
  <main>
    <section id="home" aria-label="Home">
      <HomeSection />
    </section>
    <section id="about" class="section-block section-divider" aria-label="About">
      <div class="container-x">
        <AboutSection />
      </div>
    </section>
    <section id="projects" class="section-block section-divider" aria-label="Projects">
      <div class="container-x">
        <ProjectsSection />
      </div>
    </section>
    <section id="contact" class="section-block section-divider" aria-label="Contact">
      <div class="container-x">
        <ContactSection />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const siteUrl = ((config.public.siteUrl as string | undefined) || '').replace(/\/$/, '')
const hasSite = siteUrl.length > 0

const title = 'Farrel Octanov R.G. — Portfolio'
const description =
  'Portfolio Farrel Octanov R.G., mahasiswa Teknik Informatika dengan minat pada pengembangan web, multimedia, machine learning, dan perancangan sistem.'

// Tanpa siteUrl yang valid: hindari canonical/OG absolut palsu.
// Isi NUXT_PUBLIC_SITE_URL saat build/deploy untuk metadata penuh.
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ...(hasSite
    ? {
        ogUrl: `${siteUrl}/`,
        ogImage: `${siteUrl}/og-image.png`,
        twitterImage: `${siteUrl}/og-image.png`
      }
    : { ogImage: '/og-image.png' }),
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Farrel Octanov R.G. — Portfolio',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description
})

useHead({
  link: hasSite ? [{ rel: 'canonical', href: `${siteUrl}/` }] : []
})
</script>

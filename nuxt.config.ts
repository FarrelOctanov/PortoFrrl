// Nuxt 3 config — Tahap 5: one-page portfolio.
// Tanpa Bootstrap/Bootstrap-Vue, tanpa animate.css CDN, tanpa page transition.
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,

  modules: ['@nuxtjs/tailwindcss'],

  // sections/ dipakai tanpa prefix path (HomeSection, bukan SectionsHomeSection).
  components: [
    { path: '~/components', pathPrefix: false },
    { path: '~/components/sections', pathPrefix: false }
  ],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    viewer: false
  },

  // One-page: root + SEO statis. Server routes sitemap/robots ikut
  // diprerender agar tersedia di hosting statis (isi memakai siteUrl,
  // tanpa localhost terbakar). Redirect lama ditangani routeRules (node)
  // dan public/_redirects (statis).
  nitro: {
    prerender: {
      routes: ['/', '/sitemap.xml', '/robots.txt']
    }
  },

  // Route multi-page lama -> section anchor yang setara.
  // Hanya about/contact yang dipertahankan untuk bookmark lama.
  // Fragment (#about) dikirim sebagai Location header; browser
  // membuka "/" lalu scroll ke section. Diverifikasi via curl.
  routeRules: {
    '/about': { redirect: '/#about' },
    '/contact': { redirect: '/#contact' },
    '/skills': { redirect: '/#projects' },
    '/projects': { redirect: '/#projects' }
  },

  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      title: 'Farrel Octanov R.G. — Portfolio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Portfolio Farrel Octanov R.G., mahasiswa Teknik Informatika dengan minat pada pengembangan web, multimedia, machine learning, dan perancangan sistem.'
        },
        { name: 'color-scheme', content: 'light dark' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#ffffff' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#000000' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap'
        }
      ],
      // Cegah FOUC tema: terapkan .dark sebelum paint bila tersimpan.
      // Murni client-side, tidak menyentuh SSR.
      script: [
        {
          innerHTML:
            "(function(){try{var m=localStorage.getItem('theme-mode');if(m==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})()"
        }
      ]
    }
  },

  css: ['~/assets/css/tokens.css', '~/assets/css/main.css'],

  typescript: {
    strict: true,
    typeCheck: false
  },

  runtimeConfig: {
    public: {
      formspreeId: 'mvodbwva',
      // Base URL produksi untuk canonical/OG/sitemap fallback.
      // Default kosong agar tidak mengklaim domain template atau fiktif.
      // Isi via NUXT_PUBLIC_SITE_URL saat build/deploy.
      siteUrl: ''
    }
  }
})

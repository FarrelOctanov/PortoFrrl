<template>
  <header class="topnav">
    <div class="topnav-inner">
      <NuxtLink to="/#home" class="brand" aria-label="Beranda Farrel Octanov" @click="onBrandClick">
        Frrl.
      </NuxtLink>

      <!-- Navigasi Utama: Desktop tampil langsung horizontal, Mobile tampil via drawer toggle -->
      <nav
        id="primary-navigation"
        aria-label="Navigasi Utama"
        class="topnav-nav"
        :class="menuOpen ? 'topnav-nav-open' : 'topnav-nav-closed'"
      >
        <NuxtLink
          v-for="link in links"
          :key="link.id"
          :to="link.to"
          class="navlink"
          :class="active === link.id ? 'nav-active' : ''"
          :aria-current="active === link.id ? 'page' : undefined"
          @click="(e: Event) => onNavClick(e, link.id)"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <!-- Tombol Aksi: Theme Switcher & Menu Hamburger (Khusus Mobile) -->
      <div class="topnav-actions flex items-center gap-2">
        <button
          type="button"
          class="icon-btn inline-flex items-center justify-center"
          :aria-label="mode === 'dark' ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'"
          :title="mode === 'dark' ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'"
          @click="toggle"
        >
          <Sun v-if="mode === 'dark'" :size="18" aria-hidden="true" />
          <Moon v-else :size="18" aria-hidden="true" />
        </button>

        <button
          type="button"
          class="menu-btn inline-flex md:hidden items-center justify-center"
          aria-controls="primary-navigation"
          :aria-expanded="menuOpen ? 'true' : 'false'"
          :aria-label="menuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'"
          @click="toggleMenu"
        >
          <X v-if="menuOpen" :size="20" aria-hidden="true" />
          <Menu v-else :size="20" aria-hidden="true" />
        </button>
      </div>
    </div>
    <!-- Subtle Reading Progress Indicator -->
    <div
      class="scroll-progress-bar"
      :style="{ transform: `scaleX(${progress})` }"
      aria-hidden="true"
    />
  </header>
</template>

<script setup lang="ts">
import { Menu, Moon, Sun, X } from 'lucide-vue-next'

interface NavLink {
  id: string
  label: string
  to: string
}

const links: NavLink[] = [
  { id: 'home', label: 'Home', to: '/#home' },
  { id: 'about', label: 'About', to: '/#about' },
  { id: 'projects', label: 'Projects', to: '/#projects' },
  { id: 'contact', label: 'Contact', to: '/#contact' }
]

// State-driven, tanpa manipulasi DOM manual.
const { mode, toggle } = useTheme()
const route = useRoute()
const { active } = useActiveSection(links.map((l) => l.id))
const { progress } = useScrollProgress()

const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const scrollToSection = (id: string) => {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  history.replaceState(null, '', `#${id}`)
}

// Sudah di one-page: cegah navigasi router, scroll native yang ringan.
const onNavClick = (e: Event, id: string) => {
  if (route.path === '/') {
    e.preventDefault()
    closeMenu()
    scrollToSection(id)
  } else {
    closeMenu()
  }
}

const onBrandClick = (e: Event) => {
  if (route.path === '/') {
    e.preventDefault()
    closeMenu()
    if (prefersReducedMotion()) {
      document.getElementById('home')?.scrollIntoView({ block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    history.replaceState(null, '', '/')
  } else {
    closeMenu()
  }
}

// Tutup menu setiap pindah route.
watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  }
)

// Escape menutup menu dari keyboard.
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') menuOpen.value = false
}

// Menutup menu mobile saat jendela di-resize ke ukuran desktop (>= 768px).
const onResize = () => {
  if (typeof window !== 'undefined' && window.innerWidth >= 768 && menuOpen.value) {
    menuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
.scroll-progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--accent);
  transform-origin: left;
  will-change: transform;
  pointer-events: none;
  z-index: 30;
}
</style>

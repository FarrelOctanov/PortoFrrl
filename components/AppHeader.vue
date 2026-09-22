<template>
  <header class="topnav">
    <div class="topnav-inner">
      <NuxtLink to="/#home" class="brand" aria-label="Homepage" @click="onBrandClick">Frrl.</NuxtLink>
      <button
        type="button"
        class="menu-btn"
        aria-controls="primary-navigation"
        :aria-expanded="menuOpen ? 'true' : 'false'"
        :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
        @click="toggleMenu"
      >
        <span aria-hidden="true">{{ menuOpen ? '✕' : '☰' }}</span>
      </button>
      <nav
        id="primary-navigation"
        aria-label="Primary"
        class="topnav-nav"
        :class="menuOpen ? 'topnav-nav-open' : 'topnav-nav-closed'"
      >
        <NuxtLink
          v-for="link in links"
          :key="link.id"
          :to="link.to"
          class="navlink"
          :class="active === link.id ? 'nav-active' : ''"
          :aria-current="active === link.id ? 'true' : undefined"
          @click="(e: Event) => onNavClick(e, link.id)"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
      <button
        type="button"
        class="icon-btn"
        :aria-label="mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
        :title="mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="toggle"
      >
        <span aria-hidden="true">{{ mode === 'dark' ? '☀️' : '🌙' }}</span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
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

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

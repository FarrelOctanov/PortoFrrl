export type ThemeMode = 'light' | 'dark'

const STORAGE_KEY = 'theme-mode'

/**
 * Tahap 2 — dark mode SSR-safe + Tailwind `darkMode: 'class'`.
 * - Tidak pernah menyentuh document/localStorage saat SSR
 *   (dijaga `import.meta.client` + init di onMounted).
 * - Toggle class `dark` di <html> (target Tailwind) + <body> (kompat tokens).
 * - Persist di localStorage; inline head script di nuxt.config
 *   menerapkan class sebelum paint untuk cegah FOUC.
 */
export function useTheme() {
  const mode = useState<ThemeMode>('theme-mode', () => 'light')

  const apply = (value: ThemeMode) => {
    if (!import.meta.client) return
    const dark = value === 'dark'
    document.documentElement.classList.toggle('dark', dark)
    document.body.classList.toggle('dark', dark)
  }

  const init = () => {
    if (!import.meta.client) return
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null
    mode.value = saved === 'dark' ? 'dark' : 'light'
    apply(mode.value)
  }

  const toggle = () => {
    mode.value = mode.value === 'dark' ? 'light' : 'dark'
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, mode.value)
    }
    apply(mode.value)
  }

  onMounted(init)
  watch(mode, apply)

  return { mode, toggle, init }
}

import type { Config } from 'tailwindcss'

/**
 * Final UI Revision — Tailwind configuration with Modern Neumorphic tokens.
 */
export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    './components/**/*.{vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{ts,js}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        fg: 'var(--fg)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        card: 'var(--card)',
        'card-subtle': 'var(--card-subtle)',
        accent: 'var(--accent)',
        primary: 'var(--primary)',
        'primary-fg': 'var(--primary-fg)',
        ring: 'var(--ring)'
      },
      fontFamily: {
        sans: ['Quicksand', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      maxWidth: {
        content: 'var(--content-w)'
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.45s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.3s ease-out both'
      }
    }
  },
  plugins: []
}

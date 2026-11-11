/**
 * Composable untuk subtle 3D perspective tilt pada card desktop.
 * Murni CSS 3D transform + requestAnimationFrame (zero external dependency).
 * Otomatis dinonaktifkan pada perangkat sentuh (touch/mobile) dan prefers-reduced-motion.
 */
export function useTilt(options: { maxTilt?: number; perspective?: number } = {}) {
  const { maxTilt = 5, perspective = 1000 } = options

  const el = ref<HTMLElement | null>(null)
  const isHovered = ref(false)
  const tiltStyle = ref<{ transform?: string; transition?: string }>({})

  let rafId: number | null = null

  const isTouchDevice = () => {
    if (typeof window === 'undefined') return true
    return window.matchMedia('(hover: none) or (pointer: coarse)').matches
  }

  const isReducedMotion = () => {
    if (typeof window === 'undefined') return true
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!el.value || isTouchDevice() || isReducedMotion()) return

    if (rafId) cancelAnimationFrame(rafId)

    rafId = requestAnimationFrame(() => {
      if (!el.value) return
      const rect = el.value.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -maxTilt
      const rotateY = ((x - centerX) / centerX) * maxTilt

      tiltStyle.value = {
        transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`,
        transition: 'transform 0.1s ease-out'
      }
    })
  }

  const handleMouseEnter = () => {
    if (isTouchDevice() || isReducedMotion()) return
    isHovered.value = true
  }

  const handleMouseLeave = () => {
    isHovered.value = false
    if (rafId) cancelAnimationFrame(rafId)
    tiltStyle.value = {
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
    }
  }

  onMounted(() => {
    if (el.value && !isTouchDevice() && !isReducedMotion()) {
      el.value.addEventListener('mousemove', handleMouseMove)
      el.value.addEventListener('mouseenter', handleMouseEnter)
      el.value.addEventListener('mouseleave', handleMouseLeave)
    }
  })

  onUnmounted(() => {
    if (rafId) cancelAnimationFrame(rafId)
    if (el.value) {
      el.value.removeEventListener('mousemove', handleMouseMove)
      el.value.removeEventListener('mouseenter', handleMouseEnter)
      el.value.removeEventListener('mouseleave', handleMouseLeave)
    }
  })

  return { el, isHovered, tiltStyle }
}

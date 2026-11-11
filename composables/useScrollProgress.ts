/**
 * Composable untuk indikator progress scroll halaman.
 * SSR-safe, menggunakan requestAnimationFrame untuk update halus 60fps.
 */
export function useScrollProgress() {
  const progress = ref(0)
  let rafId: number | null = null

  const updateProgress = () => {
    if (typeof window === 'undefined') return
    const scrollY = window.scrollY
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    progress.value = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0
  }

  const onScroll = () => {
    if (rafId) cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(updateProgress)
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    updateProgress()
  })

  onUnmounted(() => {
    if (rafId) cancelAnimationFrame(rafId)
    window.removeEventListener('scroll', onScroll)
  })

  return { progress }
}

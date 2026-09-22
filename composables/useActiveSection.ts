/**
 * Tahap 5 — active section berbasis IntersectionObserver.
 * Tanpa scroll listener; SSR-safe (observer hanya dibuat di onMounted).
 * rootMargin -40%/-55% menjaga satu section aktif dalam satu waktu.
 */
export function useActiveSection(ids: string[]) {
  const active = ref<string>('')

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) active.value = entry.target.id
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )
    sections.forEach((s) => observer?.observe(s))
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })

  return { active }
}

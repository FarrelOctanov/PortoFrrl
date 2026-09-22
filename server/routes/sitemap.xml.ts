/**
 * Sitemap native tanpa module tambahan. One-page: hanya root.
 * Base URL diambil dari host request aktual (mendukung proxy via
 * x-forwarded-*), fallback ke runtimeConfig siteUrl. Tidak ada localhost
 * yang terbakar ke production selama request membawa host asli.
 */
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const fallback = ((config.public.siteUrl as string | undefined) || '').replace(/\/$/, '')

  const forwardedHost = getRequestHeader(event, 'x-forwarded-host')?.split(',')[0]?.trim()
  const forwardedProto = getRequestHeader(event, 'x-forwarded-proto')?.split(',')[0]?.trim()
  const url = getRequestURL(event)
  const requestBase = forwardedHost
    ? `${forwardedProto || url.protocol.replace(':', '')}://${forwardedHost}`
    : url.origin

  // Tanpa host asli dan tanpa siteUrl: pakai apa adanya (ditangani deploy
  // via NUXT_PUBLIC_SITE_URL). Jangan mengarang domain.
  const origin = !requestBase.includes('localhost') ? requestBase : fallback || requestBase

  setHeader(event, 'content-type', 'application/xml')
  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `  <url><loc>${origin}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>\n` +
    `</urlset>`
  )
})

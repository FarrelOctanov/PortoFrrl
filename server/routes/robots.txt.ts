/**
 * robots.txt native. Tidak memblokir halaman utama; menunjuk sitemap absolut.
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

  const origin = !requestBase.includes('localhost') ? requestBase : fallback || requestBase

  setHeader(event, 'content-type', 'text/plain')
  return `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`
})

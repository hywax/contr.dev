export default cachedEventHandler((event) => {
  const runtimeConfig = useRuntimeConfig()
  const robots = [
    'User-agent: *',
    `Disallow: ${runtimeConfig.public.allowIndexation ? '/?' : '/'}`,
    'Disallow: /_nuxt',
  ]

  setHeader(event, 'content-type', 'text/plain')

  return robots.join('\n')
}, {
  name: 'robots.txt',
  maxAge: 3600, // 1 hour
})

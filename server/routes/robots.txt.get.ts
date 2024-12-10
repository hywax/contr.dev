export default eventHandler((event) => {
  const runtimeConfig = useRuntimeConfig()

  const allowIndex = runtimeConfig.public.baseUrl === runtimeConfig.public.i18n.baseUrl
  const rules = [
    `# ${runtimeConfig.public.baseUrl}, ${runtimeConfig.public.i18n.baseUrl}, ${allowIndex ? 'same' : 'different'}`,
    'User-agent: *',
    `Disallow: ${allowIndex ? '/?' : '/'}`,
  ]

  setHeader(event, 'Content-Type', 'text/plain')

  return rules.join('\n')
})

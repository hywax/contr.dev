export default cachedEventHandler(() => {
  const appConfig = useAppConfig()

  return {
    name: appConfig.app.name,
    short_name: appConfig.app.name,
    background_color: '#ffffff',
    display: 'standalone',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}, {
  name: 'site.webmanifest',
  swr: false,
  maxAge: 3600, // 1 hour
})

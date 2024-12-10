interface GetSVGGridImageOptions {
  columns: number
  size: 'small' | 'medium' | 'large'
  shape: 'circle' | 'square'
}

interface Contributor {
  login: string
  avatar: string
}

export function getSVGPlaceholder(text: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100" height="48">
    <rect x="0" y="0" width="100" height="48" stroke="#c0c0c0" />
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">${text}</text>
  </svg>`
}

export function getSVGGridImage(contributors: Contributor[], options: GetSVGGridImageOptions) {
  const oneIconSize = 48
  const originalIconSize = 256
  const gap = 44

  const innerImageSize = originalIconSize - gap
  const innerCircleSize = innerImageSize / 2
  const scale = oneIconSize / (originalIconSize - gap)
  const widthSvg = Math.min(options.columns * originalIconSize, contributors.length * originalIconSize) - gap
  const heightSvg = Math.ceil(contributors.length / options.columns) * originalIconSize - gap
  const scaledHeight = heightSvg * scale
  const scaledWidth = widthSvg * scale

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${scaledWidth}" height="${scaledHeight}" viewBox="0 0 ${widthSvg} ${heightSvg}">
    ${contributors.map((contributor, index) => {
      const x = (index % options.columns) * originalIconSize
      const y = Math.floor(index / options.columns) * originalIconSize

      return `
        <svg x="${x}" y="${y}" width="${innerImageSize}" height="${innerImageSize}">
          ${options.shape === 'circle'
              ? `<circle cx="${innerCircleSize}" cy="${innerCircleSize}" r="${innerCircleSize}" stroke="#c0c0c0" stroke-width="1" fill="url(#fill${index})"/>`
              : `<rect rx="32" width="${innerImageSize}" height="${innerImageSize}" fill="url(#fill${index})"/>`
          }
          <defs>
            <pattern id="fill${index}" width="256" height="256" patternUnits="userSpaceOnUse">
              <image width="${innerImageSize}" height="${innerImageSize}" xlink:href="data:image/png;base64,${contributor.avatar}"/>
            </pattern>
          </defs>
        </svg>
        `
    }).join('')}
  </svg>`
}

async function enrichContributor(contributor: Contributor): Promise<Contributor> {
  const response = await fetch(contributor.avatar)
  const arrayBuffer = await response.arrayBuffer()
  const binary = String.fromCharCode(...new Uint8Array(arrayBuffer))

  return {
    login: contributor.login,
    avatar: btoa(binary),
  }
}

export const getContributors = defineCachedFunction(async (repo: string) => {
  const api = useOctokit()
  const [owner, name] = repo.split('/')

  if (!owner || !name) {
    return []
  }

  try {
    const contributors = await api.paginate('GET /repos/{owner}/{repo}/contributors', { owner, repo: name })
    const stackPromises = []

    for (const contributor of contributors) {
      stackPromises.push(enrichContributor({
        login: contributor.login || 'unknown',
        avatar: contributor.avatar_url || '',
      }))
    }

    const usersAll = await Promise.allSettled(stackPromises)

    return usersAll
      .filter((c) => c.status === 'fulfilled')
      .map((c) => c.value)
  } catch (e) {
    logger.error(e)
  }

  return []
}, {
  name: 'getContributors',
  swr: false,
  getKey: (repo) => repo,
  maxAge: 86400, // 24 hours
})

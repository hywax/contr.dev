import type { GeneratorSchema } from '#shared/schema'

type ImageOptions = Omit<GeneratorSchema, 'repo'>

function buildSVGImage(contributors: Contributor[], options: ImageOptions) {
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

export function getImageName(repo: string, options: Record<string, any>) {
  return `${repo.replace('/', '-')}-${Object.values(options).join('-')}.svg`
}

export async function generateImage(params: GeneratorSchema): Promise<void> {
  const contributors = await getContributors(params.repo)
  const svgImage = buildSVGImage(contributors, params)

  const blobStorage = useStorage('blob')
  const imageName = getImageName(params.repo, params)
  await blobStorage.setItem(imageName, svgImage)
}

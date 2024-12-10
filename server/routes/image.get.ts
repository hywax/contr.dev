import { getGeneratorSchema } from '#shared/schemas'

export default eventHandler(async (event) => {
  const t = await useTranslation(event)
  const generatorSchema = getGeneratorSchema(t)
  const { repo, ...options } = await getValidatedQuery(event, generatorSchema.parse)

  setHeader(event, 'content-type', 'image/svg+xml')

  const blobStorage = useStorage('blob')

  /**
   * Step 1: Check exists cache image
   */
  const imageName = `${repo}-${options.columns}-${options.size}-${options.shape}.svg`
  if (await blobStorage.hasItem(imageName)) {
    logger.log(`Get image from cache: ${repo}`)
    return await blobStorage.getItem(imageName)
  }

  /**
   * Step 2: Get contributors
   */
  const contributors = await getContributors(repo)
  if (contributors.length === 0) {
    return getSVGPlaceholder('test')
  }

  /**
   * Step 3: Generate image
   */
  const svg = getSVGGridImage(contributors, options)

  await blobStorage.setItem(imageName, svg)

  return svg
})

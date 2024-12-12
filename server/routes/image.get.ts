import { generatorSchema } from '#shared/schema'

export default eventHandler(async (event) => {
  setHeader(event, 'content-type', 'image/svg+xml')

  try {
    const params = await getValidatedQuery(event, generatorSchema.parse)
    const blobStorage = useStorage('blob')
    const imageName = getImageName(params.repo, params)

    if (!await blobStorage.hasItem(imageName)) {
      await generateImage(params)
    }

    return await blobStorage.getItem(imageName)
  } catch (e) {
    logger.error(e)
  }

  // todo return empty image
})

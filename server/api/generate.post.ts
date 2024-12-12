import { getImageUrl } from '#shared/image'
import { generatorSchema } from '#shared/schema'

export default eventHandler(async (event) => {
  const params = await readValidatedBody(event, generatorSchema.parse)

  try {
    await generateImage(params)

    return {
      image: getImageUrl(params),
    }
  } catch (e) {
    logger.error(e)
    throw createError({ statusCode: 500 })
  }
})

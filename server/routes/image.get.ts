import { getGeneratorSchema } from '#shared/schemas'

export default eventHandler(async (event) => {
  const t = await useTranslation(event)
  const generatorSchema = getGeneratorSchema(t)
  const query = await getValidatedQuery(event, generatorSchema.parse)

  return query
})

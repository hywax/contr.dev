import type { GeneratorSchema } from '#shared/schema'
import { generatorSchemaDefault } from '#shared/schema'

export function getImageUrl(params: GeneratorSchema) {
  const runtimeConfig = useRuntimeConfig()
  const query = new URLSearchParams()

  query.set('repo', params.repo)

  if (params.columns !== generatorSchemaDefault.columns) {
    query.set('columns', params.columns.toString())
  }

  if (params.size !== generatorSchemaDefault.size) {
    query.set('size', params.size)
  }

  if (params.shape !== generatorSchemaDefault.shape) {
    query.set('shape', params.shape)
  }

  return `${runtimeConfig.public.i18n.baseUrl}/image?${query.toString()}`
}

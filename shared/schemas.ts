import { z } from 'zod'

type TranslatorFunction = (key: string) => string

export const generatorSchemaDefault = Object.freeze({
  repo: '',
  columns: 12,
  size: 'medium',
  shape: 'circle',
})

export function getGeneratorSchema(t: TranslatorFunction) {
  return z.object({
    repo: z.string().regex(/^[\w-]+\/[\w.-]+$/, {
      message: t('generator.form.repository.validation'),
    }),

    columns: z.number({
      message: t('generator.form.columns.validation'),
    }).min(1).max(64).default(generatorSchemaDefault.columns),

    size: z.enum(['small', 'medium', 'large'], {
      message: t('generator.form.size.validation'),
    }).default(generatorSchemaDefault.size),

    shape: z.enum(['circle', 'square'], {
      message: t('generator.form.shape.validation'),
    }).default(generatorSchemaDefault.shape),
  })
}

export type GeneratorSchema = z.infer<ReturnType<typeof getGeneratorSchema>>

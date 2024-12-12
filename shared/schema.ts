import { z } from 'zod'

export const generatorSchemaDefault = Object.freeze({
  repo: '',
  columns: 12,
  size: 'medium',
  shape: 'circle',
})

export const generatorSchema = z.object({
  repo: z.string().regex(/^[\w-]+\/[\w.-]+$/),
  columns: z.preprocess((c) => Number(c), z.number().min(1).max(64)).default(generatorSchemaDefault.columns),
  size: z.enum(['small', 'medium', 'large']).default(generatorSchemaDefault.size),
  shape: z.enum(['circle', 'square']).default(generatorSchemaDefault.shape),
})

export type GeneratorSchema = z.infer<typeof generatorSchema>

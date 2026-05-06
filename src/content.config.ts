import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const programmatic = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/programmatic' }),
  schema: z.any(),
});

export const collections = { programmatic };

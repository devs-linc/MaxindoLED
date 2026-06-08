import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    name: z.string(),
    order: z.number().default(0),
  }),
});

const equipment = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/equipment' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      name: z.string(),
      category: z.string(),
      pricePerDay: z.number(),
      specs: z
        .array(z.object({ label: z.string(), value: z.string() }))
        .default([]),
      image: image(),
      sku: z.string(),
    }),
});

const eventTypes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/eventTypes' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      name: z.string(),
      image: image(),
    }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      datePublished: z.coerce.date(),
      cover: image(),
      excerpt: z.string(),
    }),
});

export const collections = { services, equipment, eventTypes, articles };

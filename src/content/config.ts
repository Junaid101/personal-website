// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const experience_collection = defineCollection({
  type: 'data', // Using data collections since we don't need markdown body content
  schema: z.object({
    title: z.string(),
    company: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    description: z.string(),
    responsibilities: z.array(z.string()),
    techStack: z.array(z.string()),
  })
});

export const collections = {
  'experience': experience_collection,
};
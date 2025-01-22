// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const experience = defineCollection({
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

const blogposts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    shortIntro: z.string(),
    publishedDate: z.string(),
    updatedDate: z.string().optional(), // Make this optional since not all posts will be updated
    tags: z.array(z.string())
  })
});


export const collections = {
  'experience': experience,
  'blogposts': blogposts,
};
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

// Define the schema for the recipe collection
const recipes = defineCollection({
  type: 'content', // 'content' for Markdown/MDX files, 'data' for JSON/YAML
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    publishedDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('You'),
    tags: z.array(z.string()).default([]),
    category: z.string().default('Uncategorized'),
    prepTime: z.string().optional(),
    cookTime: z.string().optional(),
    totalTime: z.string().optional(),
    servings: z.number(),
    personalNotes: z.string().optional(),
    featured: z.boolean().default(false),
    ingredients: z.array(z.object({
      quantity: z.number(),
      unit: z.string(),
      name: z.string(),
      notes: z.string().optional(),
    })),
    // Actual instructions will be in the MDX body
  })
});


export const collections = {
  'experience': experience,
  'blogposts': blogposts,
  'recipes': recipes
};
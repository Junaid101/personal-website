/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // A blue shade
        secondary: '#9333EA', // A purple shade
        accent: {
          100: '#FEE2E2', // Light red
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444', // Base accent color
        },
        neutral: {
          light: '#F3F4F6', // Light gray
          dark: '#1F2937', // Dark gray
        },
      },
    },
  },
  plugins: [],
}
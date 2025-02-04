---
title: "Easy Static Link Solution for My CV"
shortIntro: "Easy alternative to Bitly for your resume / CV"
publishedDate: "2025-01-21"
tags: ["bitly", "technology", "url shortening"]
---

Have you ever needed a quick way to create and manage custom links, like the ones you might use on your CV? I recently faced this challenge and found that while services like Bitly allow for custom links, updating those links often requires a paid plan. That got me thinking: is there a simpler, free alternative?

## The Problem
I needed to create a few static links for my CV—like pointing to a design system hosted on Figma—but I didn’t want to rely on services that could become paid or go offline. Self-hosting a URL shortener felt like overkill for just 4-5 links. So, I looked for a solution that was easy to manage, required no additional hosting costs, and could integrate into my existing website.

## The Solution: Using My Website
Since I already have a personal website (junaidhossein.com), I decided to use it for creating and managing these links. Here are the methods I considered:

## 1. Astro's `redirect()` Function
You can create a route like `src/pages/portfolio/design-system/external.astro`:

```astro
---
export async function get({ redirect }) {
  return redirect("https://www.figma.com/file/your-design-system-file", 301); // Permanent redirect
}
---
```

**Pros:** Simple and directly handled in code.  
**Cons:** Requires creating a file for each redirect.

## 2. Static HTML with Meta Refresh
Place a static file in `public/portfolio/design-system/external.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="refresh" content="0; url=https://www.figma.com/file/your-design-system-file" />
  </head>
  <body>
    <p>If not redirected, <a href="https://www.figma.com/file/your-design-system-file">click here</a>.</p>
  </body>
</html>
```

**Pros:** No need to touch Astro code.  
**Cons:** Not SEO-friendly, slightly slower.

## 3. Hosting-Specific Configurations
For example, on Vercel, update `vercel.json`:

```json
{
  "redirects": [
    {
      "source": "/portfolio/design-system/external",
      "destination": "https://www.figma.com/file/your-design-system-file",
      "permanent": true
    }
  ]
}
```

**Pros:** Efficient and managed by the hosting platform.  
**Cons:** Platform-specific configuration.

## 4. Astro Middleware (3.0+)
Add logic in `src/middleware.ts`:

```typescript
import { AstroMiddleware } from 'astro';

export const onRequest: AstroMiddleware = ({ request, redirect }) => {
  const redirects = {
    "/portfolio/design-system/external": "https://www.figma.com/file/your-design-system-file",
  };

  const path = new URL(request.url).pathname;
  if (redirects[path]) {
    return redirect(redirects[path], 301);
  }
};
```

**Pros:** Centralized and dynamic.  
**Cons:** Requires middleware setup.

## 5. Astro Content Collections
Define redirections in a collection like `src/content/redirects/portfolio-design-system.md`:

```markdown
---
source: "/portfolio/design-system/external"
destination: "https://www.figma.com/file/your-design-system-file"
permanent: true
---
```

Fetch these in a catch-all route like `src/pages/[...slug].astro`:

```astro
---
import { getCollection } from 'astro:content';

export async function get({ params, redirect }) {
  const redirects = await getCollection('redirects');
  const path = `/${params.slug.join('/')}`;
  const rule = redirects.find((r) => r.data.source === path);

  if (rule) {
    return redirect(rule.data.destination, rule.data.permanent ? 301 : 302);
  }

  return new Response(null, { status: 404 });
}
---
```

**Pros:** Scalable and easy to manage rules.  
**Cons:** Overhead for small projects.

### Adding a List Page for an Overview
To make things even better, I decided to build a small UI page that displays all my links. Using Astro Content Collections is ideal for this because it allows me to store redirection data in a structured format and dynamically generate both the redirect logic and a UI list page.

1. **Define the Links:** Add metadata for each link in the content collection.  
2. **Create a Catch-All Route:** Handle redirects dynamically.  
3. **Build the List Page:** Use Astro to render a page displaying all links.

### Final Thoughts
By leveraging my existing website, I now have a lightweight, free, and scalable way to manage custom links for my CV. It’s SEO-friendly, doesn’t require additional hosting, and gives me full control over my links. If you’re in a similar situation, give this approach a try—you might find it as satisfying as I did!

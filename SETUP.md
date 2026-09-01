# Niraly Blog - Setup Guide

This is a Next.js blog built with **Contentful CMS** and styled with the **Midnight Ink** design.

## Stack
- **Next.js 14** with App Router and TypeScript
- **Contentful** for content management (headless CMS)
- **Tailwind CSS** for styling
- **Vercel** for deployment

## Setup Steps

### 1. Contentful Account Setup

1. Go to [contentful.com](https://contentful.com) and create a free account
2. Create a new space (project)
3. In your space, create a new **Content Model** called "Blog Post" with these fields:
   - `title` (Text, required)
   - `slug` (Text, required)
   - `excerpt` (Text, long text)
   - `content` (Text, long text)
   - `image` (Media)
   - `createdAt` (Date & time, auto-managed)

4. Create at least one blog post in Contentful with sample content

### 2. Get Your API Keys

1. In Contentful, go to **Settings > API keys**
2. Click **Add API Key**
3. Copy:
   - **Space ID**
   - **Content Delivery API - Access Token** (for published content)
   - **Content Preview API - Access Token** (for draft preview, optional)

### 3. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your Contentful credentials:
   ```
   NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id_here
   NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_access_token_here
   NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN=your_preview_token_here
   ```

### 4. Run Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/niraly-blog.git
git push -u origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **New Project**
3. Import your GitHub repository
4. Add environment variables (same as `.env.local`)
5. Click **Deploy**

Your site is now live! 🎉

## Managing Content

- **Add posts**: Log into Contentful dashboard → Create new Blog Post entry
- **Edit posts**: Click any post → Edit fields → Save & Publish
- **Images**: Upload images through the Contentful media library
- **Preview**: Changes auto-sync to your live site (usually within 1-2 minutes)

## File Structure

```
niraly-blog/
├── app/
│   ├── page.tsx          # Homepage
│   └── blog/[slug]/page.tsx  # Blog post pages
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── PostCard.tsx
│   ├── Subscribe.tsx
│   └── Footer.tsx
├── lib/
│   └── contentful.ts     # Contentful client & helpers
└── public/               # Static assets
```

## Customization

### Change Colors
Edit Tailwind classes in components. Key colors:
- Background: `bg-gray-50`
- Text: `text-gray-900`
- Accent: `text-blue-600`
- Gradient: `from-indigo-500 to-purple-600`

### Change Typography
Edit font sizes and weights in components (e.g., `text-4xl font-bold`)

### Add New Sections
Create new components in `components/` and import them in `app/page.tsx`

### Connect Email Subscription
The Subscribe component has a TODO. Connect to:
- **Mailchimp** (free tier)
- **ConvertKit** (newsletter platform)
- **Substack** (via API)

Replace the form submission logic in `components/Subscribe.tsx`

## FAQ

**Q: Will my posts show up immediately after publishing?**
A: Usually within 1-2 minutes. The site revalidates content automatically.

**Q: How do I add an author field?**
A: In Contentful, add a new field `author` (Text) to your Blog Post model, then update `lib/contentful.ts` to fetch it.

**Q: Can I use custom fonts?**
A: Yes! Add Google Fonts in `app/layout.tsx`:
```tsx
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
```

**Q: How do I add comments to posts?**
A: Integrate **Disqus**, **Utterances**, or **Giscus** by adding the script to `app/blog/[slug]/page.tsx`

## Support

- [Next.js Docs](https://nextjs.org/docs)
- [Contentful Docs](https://www.contentful.com/developers/docs/)
- [Tailwind Docs](https://tailwindcss.com/docs)

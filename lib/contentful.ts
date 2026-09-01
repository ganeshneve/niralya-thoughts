import { createClient } from 'contentful';

export const contentfulClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
});

export const previewClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN!,
  host: 'preview.contentful.com',
});

export async function getBlogPosts() {
  const client = contentfulClient;
  const entries = await client.getEntries({
    content_type: 'blogPost',
    order: '-sys.createdAt',
  });
  return entries.items;
}

export async function getFeaturedPost() {
  const client = contentfulClient;
  const entries = await client.getEntries({
    content_type: 'blogPost',
    order: '-sys.createdAt',
    limit: 1,
  });
  return entries.items[0];
}

export async function getBlogPostBySlug(slug: string) {
  const client = contentfulClient;
  const entries = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
  });
  return entries.items[0];
}

import { createClient } from 'contentful';

let _contentfulClient: any = null;
let _previewClient: any = null;

export function getContentfulClient() {
  if (_contentfulClient) return _contentfulClient;

  const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

  if (!spaceId || !accessToken) {
    throw new Error(
      'Contentful environment variables not set. ' +
      'NEXT_PUBLIC_CONTENTFUL_SPACE_ID and NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN are required. ' +
      'See .env.local.example for setup instructions.'
    );
  }

  _contentfulClient = createClient({
    space: spaceId,
    accessToken: accessToken,
  });

  return _contentfulClient;
}

export function getPreviewClient() {
  if (_previewClient) return _previewClient;

  const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const previewToken = process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN;

  if (!spaceId) {
    throw new Error(
      'NEXT_PUBLIC_CONTENTFUL_SPACE_ID is required. ' +
      'See .env.local.example for setup instructions.'
    );
  }

  if (!previewToken) {
    return getContentfulClient();
  }

  _previewClient = createClient({
    space: spaceId,
    accessToken: previewToken,
    host: 'preview.contentful.com',
  });

  return _previewClient;
}

export async function getBlogPosts() {
  const client = getContentfulClient();
  const entries = await client.getEntries({
    content_type: 'blogPost',
    limit: 1000,
  });

  // Sort by publishDate (if available) or createdAt, newest first
  return entries.items.sort((a: any, b: any) => {
    const dateA = new Date((a.fields as any)?.publishDate || a.sys.createdAt).getTime();
    const dateB = new Date((b.fields as any)?.publishDate || b.sys.createdAt).getTime();
    return dateB - dateA;
  });
}

export async function getFeaturedPost() {
  const client = getContentfulClient();
  const entries = await client.getEntries({
    content_type: 'blogPost',
    order: ['-sys.createdAt'],
    limit: 1,
  });
  return entries.items[0];
}

export async function getBlogPostBySlug(slug: string) {
  const client = getContentfulClient();
  // Decode URL-encoded slug and normalize whitespace to hyphens
  let normalizedSlug = decodeURIComponent(slug).trim();
  // Replace spaces with hyphens (standard slug format)
  normalizedSlug = normalizedSlug.replace(/\s+/g, '-').toLowerCase();

  console.log(`[getBlogPostBySlug] Searching for: "${normalizedSlug}" (from URL: "${slug}")`);

  const entries = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': normalizedSlug,
  });

  if (entries.items[0]) {
    console.log(`[getBlogPostBySlug] Found post: ${entries.items[0].fields.title}`);
    return entries.items[0];
  }

  console.warn(`[getBlogPostBySlug] Exact match not found, trying case-insensitive...`);

  // Try alternative: case-insensitive matching
  const allPosts = await getBlogPosts();
  const post = allPosts.find((p: any) => {
    const postSlug = ((p.fields as any)?.slug || '').toLowerCase().trim();
    return postSlug === normalizedSlug || postSlug === decodeURIComponent(slug).toLowerCase();
  });

  if (post) {
    console.log(`[getBlogPostBySlug] Found with case-insensitive match: "${normalizedSlug}"`);
    return post;
  }

  console.error(`[getBlogPostBySlug] No match found for: "${normalizedSlug}"`);
  return undefined;
}

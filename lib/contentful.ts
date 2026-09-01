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
    order: ['-sys.createdAt'],
  });
  return entries.items;
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
  const entries = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
  });
  return entries.items[0];
}

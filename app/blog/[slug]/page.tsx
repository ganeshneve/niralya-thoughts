import Link from 'next/link';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Header from '@/components/Header';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/contentful';

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts();
    return posts.map((post: any) => ({
      slug: (post.fields as any).slug,
    }));
  } catch (error) {
    // If Contentful isn't configured, return empty array
    // Pages will be generated on-demand at request time instead
    console.log(
      'Contentful not configured - blog posts will be generated on-demand. ' +
      'Add environment variables to NEXT_PUBLIC_CONTENTFUL_SPACE_ID and NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN for static generation.'
    );
    return [];
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log(`[BlogPost] Loading post with slug: "${slug}"`);

  const post = await getBlogPostBySlug(slug);

  if (!post) {
    console.error(`[BlogPost] Post not found for slug: "${slug}"`);
    return (
      <>
        <Header />
        <div className="py-20 px-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Post not found</h1>
          <p className="text-gray-600 mt-2 text-sm">Slug: {slug}</p>
          <Link href="/" className="text-blue-600 hover:text-blue-700 mt-6 inline-block">
            ← Back to home
          </Link>
        </div>
      </>
    );
  }

  const fields = post.fields as any;
  const image = fields.image
    ? {
        url: `https:${fields.image.fields.file.url}`,
        width: fields.image.fields.file.details.image.width,
        height: fields.image.fields.file.details.image.height,
      }
    : undefined;

  const dateToUse = fields.publishDate || post.sys.createdAt;
  const publishDate = new Date(dateToUse).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <Header />

      <article className="bg-white py-16 px-6 md:px-10">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-gray-600 hover:text-gray-900 mb-12 inline-flex items-center gap-2 font-medium transition">
            ← Back to home
          </Link>

          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              {fields.category && (
                <span className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
                  {fields.category}
                </span>
              )}
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {fields.title}
            </h1>
            <time className="text-lg text-gray-500 font-light">{publishDate}</time>
          </header>

          {image && (
            <div className="rounded-2xl overflow-hidden mb-16 aspect-video">
              <Image
                src={image.url}
                alt={fields.title}
                width={image.width}
                height={image.height}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          )}

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <style>{`
              .prose-content > * + * {
                margin-top: 1.5rem;
              }
              .prose-content h2 {
                font-size: 1.875rem;
                font-weight: 700;
                margin-top: 2.5rem;
                margin-bottom: 1rem;
                color: #111827;
              }
              .prose-content h3 {
                font-size: 1.5rem;
                font-weight: 600;
                margin-top: 2rem;
                margin-bottom: 0.75rem;
                color: #1f2937;
              }
              .prose-content p {
                line-height: 1.75;
                margin-bottom: 1.5rem;
              }
              .prose-content ul, .prose-content ol {
                margin-left: 1.5rem;
                margin-bottom: 1.5rem;
              }
              .prose-content li {
                line-height: 1.75;
                margin-bottom: 0.5rem;
              }
              .prose-content blockquote {
                border-left: 4px solid #2563eb;
                padding-left: 1.5rem;
                font-style: italic;
                color: #6b7280;
                margin: 1.5rem 0;
              }
              .prose-content a {
                color: #2563eb;
                text-decoration: underline;
                transition: color 0.2s;
              }
              .prose-content a:hover {
                color: #1d4ed8;
              }
            `}</style>
              <div className="prose-content">
                {fields.content && (
                  typeof fields.content === 'string' ? (
                    <div dangerouslySetInnerHTML={{
                      __html: fields.content.replace(/\n/g, '<br />'),
                    }} />
                  ) : (
                    documentToReactComponents(fields.content)
                  )
                )}
              </div>
            </div>
        </div>
      </article>
    </>
  );
}

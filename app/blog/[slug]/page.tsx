import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Subscribe from '@/components/Subscribe';
import Footer from '@/components/Footer';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/contentful';

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

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return (
      <>
        <Header />
        <div className="py-20 px-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Post not found</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
            ← Back to home
          </Link>
        </div>
        <Footer />
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

  const publishDate = new Date(post.sys.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <Header />

      <article className="bg-gray-50 py-12 px-10">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-blue-600 hover:text-blue-700 mb-8 inline-block">
            ← Back to home
          </Link>

          <h1 className="text-5xl font-bold text-gray-900 mb-4">{fields.title}</h1>
          <p className="text-gray-600 mb-8">{publishDate}</p>

          {image && (
            <div className="rounded-xl overflow-hidden h-96 mb-10">
              <Image
                src={image.url}
                alt={fields.title}
                width={image.width}
                height={image.height}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none text-gray-900">
            {fields.content && (
              <div
                dangerouslySetInnerHTML={{
                  __html: fields.content.replace(/\n/g, '<br />'),
                }}
              />
            )}
          </div>
        </div>
      </article>

      <Subscribe />
      <Footer />
    </>
  );
}

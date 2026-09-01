import Header from '@/components/Header';
import PostCard from '@/components/PostCard';
import { getBlogPosts } from '@/lib/contentful';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  let allPosts: any[] = [];

  try {
    allPosts = await getBlogPosts();
  } catch (error) {
    console.error('Failed to load blog posts from Contentful:', error);
    // Continue with empty data - show placeholder UI
  }

  return (
    <>
      <Header />

      {/* All Stories */}
      <section className="bg-gray-50 py-16 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          {allPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allPosts.map((post) => {
                const fields = post.fields as any;
                const image = fields.image
                  ? {
                      url: `https:${fields.image.fields.file.url}`,
                      width: fields.image.fields.file.details.image.width,
                      height: fields.image.fields.file.details.image.height,
                    }
                  : undefined;

                return (
                  <PostCard
                    key={post.sys.id}
                    title={fields.title}
                    excerpt={fields.excerpt}
                    date={fields.publishDate || post.sys.createdAt}
                    category={fields.category}
                    image={image}
                    slug={fields.slug}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No blog posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

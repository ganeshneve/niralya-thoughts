import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PostCard from '@/components/PostCard';
import Subscribe from '@/components/Subscribe';
import Footer from '@/components/Footer';
import { getFeaturedPost, getBlogPosts } from '@/lib/contentful';

export default async function Home() {
  let featuredPost: any = null;
  let allPosts: any[] = [];

  try {
    const [featured, posts] = await Promise.all([
      getFeaturedPost(),
      getBlogPosts(),
    ]);
    featuredPost = featured;
    allPosts = posts;
  } catch (error) {
    console.error('Failed to load blog posts from Contentful:', error);
    // Continue with empty data - show placeholder UI
  }

  const posts = allPosts.filter(
    (post) => post?.sys.id !== featuredPost?.sys.id
  ).slice(0, 9);

  const featured = featuredPost?.fields as any;
  const featuredImage = featured?.image
    ? {
        url: `https:${featured.image.fields.file.url}`,
        width: featured.image.fields.file.details.image.width,
        height: featured.image.fields.file.details.image.height,
      }
    : undefined;

  return (
    <>
      <Header />

      {featured && (
        <Hero
          title={featured.title}
          excerpt={featured.excerpt}
          image={featuredImage}
          slug={featured.slug}
        />
      )}

      {/* Latest Stories */}
      <section className="bg-gray-50 py-20 px-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Latest Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
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
                  date={post.sys.createdAt}
                  image={image}
                  slug={fields.slug}
                />
              );
            })}
          </div>
        </div>
      </section>

      <Subscribe />
      <Footer />
    </>
  );
}

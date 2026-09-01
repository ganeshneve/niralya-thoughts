import Link from 'next/link';
import Image from 'next/image';

interface HeroProps {
  title: string;
  excerpt: string;
  image?: {
    url: string;
    width: number;
    height: number;
  };
  slug: string;
}

export default function Hero({ title, excerpt, image, slug }: HeroProps) {
  return (
    <section className="bg-gray-50 py-12 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          {image && (
            <div className="rounded-xl overflow-hidden h-64 md:h-80">
              <Image
                src={image.url}
                alt={title}
                width={image.width}
                height={image.height}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Featured Story</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {title}
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed line-clamp-3">
              {excerpt}
            </p>
            <Link
              href={`/blog/${slug}`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition w-fit mt-2"
            >
              Read Full Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

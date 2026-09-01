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
    <section className="bg-gray-50 py-20 px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          {image && (
            <div className="rounded-xl overflow-hidden h-96 md:h-full">
              <Image
                src={image.url}
                alt={title}
                width={image.width}
                height={image.height}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="flex flex-col gap-5">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              {title}
            </h2>
            <p className="text-xl italic text-blue-600">Featured Story</p>
            <p className="text-lg text-gray-600 leading-relaxed">
              {excerpt}
            </p>
            <Link
              href={`/blog/${slug}`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition w-fit"
            >
              Read the Full Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

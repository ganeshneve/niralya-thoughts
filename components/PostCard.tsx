import Link from 'next/link';
import Image from 'next/image';

interface PostCardProps {
  title: string;
  excerpt: string;
  date: string;
  category?: string;
  image?: {
    url: string;
    width: number;
    height: number;
  };
  slug: string;
}

export default function PostCard({ title, excerpt, date, category, image, slug }: PostCardProps) {
  const dateToUse = date || new Date().toISOString();
  const formattedDate = new Date(dateToUse).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <article className="bg-white border border-gray-200 rounded-xl overflow-hidden p-6 flex flex-col gap-4 hover:shadow-lg transition">
      {image && (
        <div className="rounded-lg overflow-hidden h-48">
          <Image
            src={image.url}
            alt={title}
            width={image.width}
            height={image.height}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="flex items-center gap-3">
        {category && (
          <span className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
            {category}
          </span>
        )}
        <p className="text-sm text-gray-500">{formattedDate}</p>
      </div>
      <Link href={`/blog/${slug}`} className="hover:text-blue-600 transition">
        <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
      </Link>
      <p className="text-gray-600 leading-relaxed">{excerpt}</p>
      <Link
        href={`/blog/${slug}`}
        className="text-blue-600 hover:text-blue-700 font-medium transition inline-block"
      >
        Read More →
      </Link>
    </article>
  );
}

import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <div className="w-10 h-10 md:w-12 md:h-12 relative">
            <Image
              src="/logo.png"
              alt="Midnight Ink"
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="hidden sm:inline text-xl md:text-2xl font-bold text-gray-900">Midnight Ink</span>
        </Link>
        <nav className="hidden md:flex gap-8 text-sm">
          <a href="/" className="hover:text-blue-600 transition">Home</a>
          <a href="#" className="hover:text-blue-600 transition">About</a>
          <a href="#" className="hover:text-blue-600 transition">Archive</a>
          <a href="#" className="hover:text-blue-600 transition">Contact</a>
        </nav>
      </div>
    </header>
  );
}

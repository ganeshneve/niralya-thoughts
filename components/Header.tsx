import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <div className="w-16 h-16 md:w-20 md:h-20">
            <img src="/logo.svg" alt="Midnight Ink" className="w-full h-full" />
          </div>
          <span className="hidden sm:inline text-xl md:text-2xl font-bold text-gray-900">Midnight Ink</span>
        </Link>
      </div>
    </header>
  );
}

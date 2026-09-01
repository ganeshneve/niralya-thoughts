import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <div className="w-10 h-10 md:w-12 md:h-12">
            <svg
              viewBox="0 0 120 120"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              alt="Midnight Ink"
            >
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#1f2937', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#374151', stopOpacity: 1}} />
                </linearGradient>
              </defs>

              <g opacity="0.7">
                <path d="M 15 45 Q 10 50 12 60 Q 14 70 20 72" stroke="#9ca3af" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                <circle cx="18" cy="48" r="2.5" fill="#9ca3af" opacity="0.6"/>
                <circle cx="15" cy="58" r="2" fill="#9ca3af" opacity="0.5"/>
                <path d="M 20 40 L 25 42 L 23 48" stroke="#d1d5db" strokeWidth="1" fill="none"/>
              </g>

              <text x="60" y="85" fontFamily="Georgia, serif" fontSize="72" fontWeight="bold" textAnchor="middle" fill="url(#logoGradient)" letterSpacing="-2">M</text>

              <g opacity="0.7">
                <path d="M 105 45 Q 110 50 108 60 Q 106 70 100 72" stroke="#9ca3af" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                <circle cx="102" cy="48" r="2.5" fill="#9ca3af" opacity="0.6"/>
                <circle cx="105" cy="58" r="2" fill="#9ca3af" opacity="0.5"/>
                <path d="M 100 40 L 95 42 L 97 48" stroke="#d1d5db" strokeWidth="1" fill="none"/>
              </g>

              <g opacity="0.5">
                <path d="M 35 20 Q 40 18 45 20" stroke="#9ca3af" strokeWidth="1" fill="none" strokeLinecap="round"/>
                <path d="M 75 20 Q 80 18 85 20" stroke="#9ca3af" strokeWidth="1" fill="none" strokeLinecap="round"/>
                <circle cx="40" cy="22" r="1.5" fill="#9ca3af"/>
                <circle cx="80" cy="22" r="1.5" fill="#9ca3af"/>
              </g>

              <g opacity="0.5">
                <path d="M 40 100 Q 45 102 50 100" stroke="#d1d5db" strokeWidth="1" fill="none" strokeLinecap="round"/>
                <path d="M 70 100 Q 75 102 80 100" stroke="#d1d5db" strokeWidth="1" fill="none" strokeLinecap="round"/>
              </g>

              <circle cx="60" cy="60" r="55" stroke="#e5e7eb" strokeWidth="0.5" fill="none" opacity="0.4"/>
            </svg>
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

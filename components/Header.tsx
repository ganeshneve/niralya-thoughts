export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-10 py-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Midnight Ink</h1>
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

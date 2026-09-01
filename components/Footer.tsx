export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-20 px-10">
      <div className="max-w-7xl mx-auto">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About */}
          <div>
            <h3 className="text-sm font-semibold mb-4">About</h3>
            <p className="text-gray-400 text-sm">
              A blog featuring essays concentrating mainly on personal reflections.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" className="hover:text-blue-400 transition">Home</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">About</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Archive</a></li>
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Subscribe</h3>
            <p className="text-gray-400 text-sm">
              Get new essays delivered to your inbox.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-gray-500 text-xs">
            © 2024 Niraly Thoughts. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

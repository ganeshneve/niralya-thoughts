'use client';

import { useState } from 'react';

export default function Subscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // TODO: Connect to your email service (Mailchimp, ConvertKit, etc.)
      // For now, just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200 py-12 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Subscribe</h3>
            <p className="text-sm text-gray-600">Get new essays delivered to your inbox.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 flex-col sm:flex-row sm:w-96">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-gray-900 text-white px-4 py-2 text-sm rounded-md font-medium hover:bg-gray-800 transition disabled:opacity-50"
            >
              {status === 'loading' ? '...' : 'Join'}
            </button>
          </form>
        </div>

        {status === 'success' && (
          <p className="text-gray-600 mt-4 text-xs">✓ Thanks for subscribing!</p>
        )}
        {status === 'error' && (
          <p className="text-gray-500 mt-4 text-xs">Error subscribing. Please try again.</p>
        )}
      </div>
    </footer>
  );
}

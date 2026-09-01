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
    <section className="bg-gradient-to-r from-indigo-500 to-purple-600 py-20 px-10 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-4">Stay Updated</h2>
        <p className="text-lg text-white/90 mb-8">
          Subscribe to receive new essays and reflections in your inbox.
        </p>

        <form onSubmit={handleSubmit} className="flex gap-3 flex-col sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition disabled:opacity-50"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {status === 'success' && (
          <p className="text-white/90 mt-3 text-sm">✓ Thanks for subscribing!</p>
        )}
        {status === 'error' && (
          <p className="text-red-200 mt-3 text-sm">Error subscribing. Please try again.</p>
        )}
      </div>
    </section>
  );
}

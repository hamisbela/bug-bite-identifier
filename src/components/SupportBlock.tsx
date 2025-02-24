import React from 'react';
import { Coffee, Bug } from 'lucide-react';

export default function SupportBlock() {
  return (
    <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-8 text-center">
      <div className="max-w-2xl mx-auto">
        <Bug className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-green-600 mb-4">Support Our Work ❤️</h2>
        <p className="text-gray-700 mb-6">
          Help us maintain and improve our free bug bite identifier by supporting us.
          Your contribution helps keep this tool free for everyone who needs it! 🩹
        </p>
        <a
          href="https://roihacks.gumroad.com/l/dselxe?utm_campaign=donation-home-page&utm_medium=website&utm_source=bug-bite-identifier"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors text-lg font-semibold"
        >
          <Coffee className="h-5 w-5" />
          Buy Us a Coffee ☕
        </a>
      </div>
    </div>
  );
}
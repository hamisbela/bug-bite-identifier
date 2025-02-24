import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Free Bug Identifier</h3>
            <p className="text-gray-600">
              Your trusted companion for insect identification and information. Powered by advanced AI technology.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Insect Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-gray-900">Bug Identifier</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-gray-900">About Our Tool</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-gray-900">Bug Information Help</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Support Our Project</h3>
            <p className="text-gray-600 mb-4">Help us maintain and improve this free bug identification tool for the community.</p>
            <a
              href="https://roihacks.gumroad.com/l/dselxe?utm_campaign=donation-footer&utm_medium=website&utm_source=bug-identifier"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-500 transition-colors"
            >
              Buy us a coffee
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Free Bug Identifier. Helping you understand the insects around you.</p>
        </div>
      </div>
    </footer>
  );
}
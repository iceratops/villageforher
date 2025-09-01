'use client';

import { MessageCircleHeart, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-pink-500 text-white p-4 rounded-full shadow-lg hover:bg-pink-600 transition-colors duration-200 z-50"
        aria-label="Open chat"
      >
        <MessageCircleHeart className="h-6 w-6" />
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <MessageCircleHeart className="h-5 w-5 text-pink-600" />
                </div>
                <h3 className="font-semibold">Healing Companion</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="text-center mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Welcome to Your Healing Journey
                </h4>
                <p className="text-gray-600 mb-6">
                  Connect with our AI-powered healing companion for guidance, reflection, and
                  emotional support.
                </p>
              </div>

              <div className="space-y-3">
                <Link
                  href="/chat"
                  className="block w-full bg-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-pink-600 transition-colors text-center"
                >
                  Start Chatting
                </Link>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

'use client';

import { useId } from 'react';

export default function ContactPage() {
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We&apos;re here to support you on your healing journey. Get in touch with any questions or
          to join our community.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-6">Get in Touch</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">hello@villageforher.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Support Hours</h3>
              <p className="text-gray-600">Monday - Friday: 9 AM - 6 PM EST</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">
                Join our supportive community of women on their healing journey.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-warm-blush rounded-lg p-8">
          <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-6">
            Send us a Message
          </h2>
          <form className="space-y-4">
            <div>
              <label htmlFor={nameId} className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id={nameId}
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-soft-terracotta focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor={emailId} className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id={emailId}
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-soft-terracotta focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor={messageId} className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id={messageId}
                name="message"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-soft-terracotta focus:border-transparent"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-soft-terracotta text-white py-3 px-6 rounded-lg font-semibold hover:bg-deep-sage transition-colors duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

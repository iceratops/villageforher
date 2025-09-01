import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services - Village For Her',
  description: 'Discover our healing services and wellness offerings for women',
  openGraph: {
    title: 'Services - Village For Her',
    description: 'Discover our healing services and wellness offerings for women',
    type: 'website',
  },
};

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">Our Services</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive healing and wellness services designed to support your journey.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">
            Healing Companion AI
          </h3>
          <p className="text-gray-600 mb-4">
            Connect with our AI-powered companion for guidance, reflection, and emotional support.
          </p>
          <a
            href="/chat"
            className="text-soft-terracotta hover:text-deep-sage font-medium transition-colors"
          >
            Start Chatting →
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">
            Shop Our Store
          </h3>
          <p className="text-gray-600 mb-4">
            Discover carefully curated wellness products on our Square Online store.
          </p>
          <a
            href="https://villageforher.square.site/s/shop?utm_source=site&utm_medium=services&utm_campaign=shop_link"
            className="text-soft-terracotta hover:text-deep-sage font-medium transition-colors"
            data-analytics="outbound-shop"
          >
            Shop Now →
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">
            Community Support
          </h3>
          <p className="text-gray-600 mb-4">
            Join a supportive community of women on their healing and growth journey.
          </p>
          <a
            href="/contact"
            className="text-soft-terracotta hover:text-deep-sage font-medium transition-colors"
          >
            Get Connected →
          </a>
        </div>
      </div>
    </div>
  );
}

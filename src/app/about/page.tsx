import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Village For Her',
  description: 'Learn about our mission to support women&apos;s healing and wellness journey',
  openGraph: {
    title: 'About - Village For Her',
    description: 'Learn about our mission to support women&apos;s healing and wellness journey',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">
          About Village For Her
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A sanctuary for healing, growth, and connection designed specifically for women.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            We believe every woman deserves a supportive space to heal, grow, and thrive. Our
            mission is to provide carefully curated services that nurture your
            well-being and support your unique journey.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Through our healing companion AI and thoughtfully selected services, we create a
            community where women can find the tools and support they need to flourish.
          </p>
        </div>
        <div className="bg-warm-blush rounded-lg p-8">
          <h3 className="text-xl font-heading font-semibold text-gray-900 mb-4">What We Offer</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-soft-terracotta mr-2">•</span>
              Healing companion AI
            </li>
            <li className="flex items-start">
              <span className="text-soft-terracotta mr-2">•</span>
              AI-powered healing companion
            </li>
            <li className="flex items-start">
              <span className="text-soft-terracotta mr-2">•</span>
              Supportive community space
            </li>
            <li className="flex items-start">
              <span className="text-soft-terracotta mr-2">•</span>
              Personalized guidance and resources
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-6">
          Join Our Community
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Whether you&apos;re beginning your healing journey or looking to deepen your practice,
          we&apos;re here to support you every step of the way.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://villageforher.square.site/s/shop?utm_source=site&utm_medium=about&utm_campaign=shop_link"
            className="inline-flex items-center px-8 py-3 rounded-full bg-soft-terracotta text-white font-semibold hover:bg-deep-sage transition-colors duration-200"
            data-analytics="outbound-shop"
          >
            Shop Now
          </a>
          <a
            href="/chat"
            className="inline-flex items-center px-8 py-3 rounded-full bg-pink-50 text-pink-700 border-2 border-pink-200 font-semibold hover:bg-pink-100 transition-colors duration-200"
          >
            Meet Your Healing Companion
          </a>
        </div>
      </div>
    </div>
  );
}

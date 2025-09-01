import { ArrowRight, Heart } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-warm-blush to-soft-terracotta/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Heart className="h-16 w-16 text-soft-terracotta" />
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-900 mb-6">
              Welcome to Village For Her
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              A sanctuary for healing, growth, and connection. Discover services
              designed to nurture your well-being and support your journey.
            </p>
            <div className="flex justify-center">
              <a
                href="https://villageforher.square.site/s/shop?utm_source=site&utm_medium=hero&utm_campaign=shop_link"
                className="inline-flex items-center px-8 py-3 rounded-full bg-soft-terracotta text-white font-semibold hover:bg-deep-sage transition-colors duration-200"
                data-analytics="outbound-shop"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>



      {/* Features Section */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-soft-terracotta/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-soft-terracotta" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
                Healing Support
              </h3>
              <p className="text-gray-600">
                Connect with our AI companion for guidance, reflection, and emotional support.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-deep-sage/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-deep-sage" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
                Community Support
              </h3>
              <p className="text-gray-600">
                Join a supportive community of women on their healing and growth journey.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-warm-blush rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-soft-terracotta" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">
                Join a supportive community of women on their healing and growth journey.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Orders & Returns - Village For Her',
  description: 'Information about order tracking, returns, and shipping policies',
  openGraph: {
    title: 'Orders & Returns - Village For Her',
    description: 'Information about order tracking, returns, and shipping policies',
    type: 'website',
  },
};

export default function OrdersReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">Orders & Returns</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Everything you need to know about your orders, shipping, and returns.
        </p>
        <div className="mt-8">
          <a
            href="https://villageforher.square.site/s/shop?utm_source=site&utm_medium=orders&utm_campaign=shop_link"
            className="inline-block bg-soft-terracotta text-white py-3 px-8 rounded-lg font-semibold hover:bg-deep-sage transition-colors duration-200 text-lg"
            data-analytics="outbound-shop"
          >
            Shop Now
          </a>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Order Updates */}
        <div className="space-y-4">
          <h2 className="text-2xl font-heading font-semibold text-gray-900">Order Updates</h2>
          <p className="text-gray-600 leading-relaxed">
            You'll receive order and shipping updates via email and SMS from our Square Online store. 
            These notifications will keep you informed about your order status, shipping confirmations, 
            and delivery updates.
          </p>
        </div>

        {/* Tracking Your Order */}
        <div className="space-y-4">
          <h2 className="text-2xl font-heading font-semibold text-gray-900">Tracking Your Order</h2>
          <p className="text-gray-600 leading-relaxed">
            When your order ships, you'll receive a tracking link in your shipping confirmation email. 
            This link will provide real-time updates on your package's location and estimated delivery date.
          </p>
        </div>

        {/* Returns & Refunds */}
        <div className="space-y-4">
          <h2 className="text-2xl font-heading font-semibold text-gray-900">Returns & Refunds</h2>
          <p className="text-gray-600 leading-relaxed">
            We want you to be completely satisfied with your purchase. If you need to return an item, 
            please review our returns policy for details on eligibility, timeframes, and the return process.
          </p>
          <a
            href="https://villageforher.square.site/returns-policy"
            className="inline-block text-soft-terracotta hover:text-deep-sage font-medium transition-colors"
            data-analytics="outbound-shop"
          >
            View Returns Policy →
          </a>
        </div>

        {/* Shipping Policy */}
        <div className="space-y-4">
          <h2 className="text-2xl font-heading font-semibold text-gray-900">Shipping Policy</h2>
          <p className="text-gray-600 leading-relaxed">
            Learn about our shipping methods, delivery timeframes, and shipping costs. We offer 
            various shipping options to meet your needs and ensure your items arrive safely.
          </p>
          <a
            href="https://villageforher.square.site/shipping-policy"
            className="inline-block text-soft-terracotta hover:text-deep-sage font-medium transition-colors"
            data-analytics="outbound-shop"
          >
            View Shipping Policy →
          </a>
        </div>
      </div>

      {/* Need Help Section */}
      <div className="mt-16 text-center bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-4">Need Help?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Can't find what you're looking for? Our support team is here to help with any questions 
          about your orders, shipping, or returns.
        </p>
        <a
          href="mailto:support@example.com"
          className="inline-block bg-soft-terracotta text-white py-3 px-8 rounded-lg font-semibold hover:bg-deep-sage transition-colors duration-200"
        >
          Contact Support
        </a>
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 text-center">
        <a
          href="https://villageforher.square.site/s/shop?utm_source=site&utm_medium=orders&utm_campaign=shop_link"
          className="inline-block bg-gray-100 text-gray-700 py-3 px-8 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 text-lg"
          data-analytics="outbound-shop"
        >
          Shop Now
        </a>
      </div>
    </div>
  );
}

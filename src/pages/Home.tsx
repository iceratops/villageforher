import React from 'react';
import { Link } from 'react-router-dom';
import { useTallyEmbed } from '../hooks/useTallyEmbed';

declare global {
  interface Window {
    Tally?: any;
  }
}

const Home = () => {
  useTallyEmbed();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-warm-blush/20 to-sage/20 py-20 lg:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-gray-900 mb-6">
            Welcome Home, Beautiful
          </h1>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Gentle support for every season of womanhood. Thoughtful essentials to nurture your heart, your faith, and your healing.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-4 bg-soft-terracotta text-white font-semibold rounded-full hover:bg-deep-sage transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Shop Our Collection
          </Link>
        </div>
      </section>

      {/* Story Block */}
      <section className="py-16 bg-warm-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-heading font-semibold text-gray-900 mb-4">
            Our Story
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            There was a time when Village For Her was all about postpartum boxes. But as life changed, so did we. We listened to the quiet needs of women, those walking through motherhood, healing, faith, or simply hard days. We realized what matters most isn’t a box, but a gentle presence.<br /><br />
            Now, Village For Her is a small collection of meaningful things. Each one is chosen to bring comfort, encouragement, and a sense of being seen. We’re here for the quiet moments, the in-betweens, and the days when you need a little extra care.<br /><br />
            You don’t have to do it all alone. We hope you feel at home here.
          </p>
        </div>
      </section>

      {/* Featured Product Section */}
      <section className="py-16 bg-gradient-to-r from-sage/10 to-warm-blush/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-heading font-semibold text-gray-900 mb-6">
            Scent Rollers, Affirmation Cards, and Journals
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Our products are simple, cozy, and made to soothe. Roll on a calming scent when the world feels heavy. Tuck an affirmation card in your pocket for a gentle reminder. Write your heart out in a journal that’s just for you.<br /><br />
            Each piece is a small way to say, “You’re not alone.”
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-sage text-white font-semibold rounded-full hover:bg-deep-sage transition-all duration-300"
          >
            See Featured Products
          </Link>
        </div>
      </section>

      {/* Email Opt-In Section */}
      <section className="py-16 bg-warm-white">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-heading font-semibold text-gray-900 mb-4">
            Stay Close
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            If you’d like gentle notes, encouragement, and first looks at new things, leave your email below. We’ll write when it matters, and only with kindness.
          </p>
          <iframe data-tally-src="https://tally.so/embed/mRepYJ?transparentBackground=1&dynamicHeight=1" loading="lazy" width="100%" height={120} frameBorder={0} marginHeight={0} marginWidth={0} title="null"></iframe>
          {/* <form className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sage w-full sm:w-auto"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-soft-terracotta text-white font-semibold rounded-full hover:bg-deep-sage transition-all duration-300"
            >
              Sign Up
            </button>
          </form> */}
        </div>
      </section>
    </div>
  );
};

export default Home;
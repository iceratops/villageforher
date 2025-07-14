import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, Package, Truck, Gift } from 'lucide-react';

const Products = () => {
  const [cart, setCart] = useState<{[key: number]: number}>({});

  const products = [
    {
      id: 1,
      name: 'New Mom Essentials Box',
      price: 89.99,
      originalPrice: 109.99,
      image: '/static/box1.jpg',
      description: 'Complete postpartum recovery kit with comfort items, self-care products, and Austin local treats.',
      features: [
        'Postpartum recovery tea blend',
        'Organic nipple balm and healing salve',
        'Cozy bamboo robe and slippers',
        'Austin local honey and snacks',
        'Inspirational journal and pen',
        'Soothing bath salts'
      ],
      rating: 4.9,
      reviews: 127,
      bestseller: true
    },
    {
      id: 2,
      name: 'Baby Care Starter Kit',
      price: 64.99,
      originalPrice: 79.99,
      image: '/static/box2.jpg',
      description: 'Everything you need for your newborn\'s first weeks, carefully selected for Austin families.',
      features: [
        'Organic cotton onesies (3-pack)',
        'Gentle baby wash and lotion',
        'Soft muslin swaddle blankets',
        'Baby thermometer and nail clippers',
        'Pacifiers and teething toys',
        'New parent guidebook'
      ],
      rating: 4.8,
      reviews: 89,
      bestseller: false
    },
    {
      id: 3,
      name: 'Comfort & Care Package',
      price: 124.99,
      originalPrice: 149.99,
      image: 'https://images.pexels.com/photos/6849164/pexels-photo-6849164.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Premium comfort package for the ultimate postpartum self-care experience.',
      features: [
        'Luxury postpartum recovery kit',
        'Aromatherapy diffuser with essential oils',
        'Weighted blanket for anxiety relief',
        'Gourmet meal delivery vouchers',
        'Professional massage gift certificate',
        'Personalized care plan consultation'
      ],
      rating: 5.0,
      reviews: 45,
      bestseller: false
    },
    {
      id: 4,
      name: 'Austin Mom\'s Survival Kit',
      price: 49.99,
      originalPrice: 64.99,
      image: 'https://images.pexels.com/photos/6849400/pexels-photo-6849400.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Local Austin favorites and practical items to help new moms navigate their first months.',
      features: [
        'Austin coffee shop gift cards',
        'Local bakery treat vouchers',
        'Reusable water bottle with infuser',
        'Energy-boosting snack bars',
        'Austin mom group directory',
        'Emergency contact cards'
      ],
      rating: 4.7,
      reviews: 156,
      bestseller: true
    },
    {
      id: 5,
      name: 'Breastfeeding Support Bundle',
      price: 79.99,
      originalPrice: 94.99,
      image: 'https://images.pexels.com/photos/1648375/pexels-photo-1648375.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Comprehensive support for your breastfeeding journey with expert-recommended products.',
      features: [
        'Lactation support tea and cookies',
        'Nursing pillow and covers',
        'Breast pump accessories',
        'Nipple cream and gel pads',
        'Nursing-friendly snacks',
        'Lactation consultant session voucher'
      ],
      rating: 4.9,
      reviews: 203,
      bestseller: false
    },
    {
      id: 6,
      name: 'Monthly Care Subscription',
      price: 39.99,
      originalPrice: null,
      image: 'https://images.pexels.com/photos/6849164/pexels-photo-6849164.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Monthly delivery of curated postpartum care items and local Austin treats.',
      features: [
        'Monthly themed care packages',
        'Rotating selection of products',
        'Austin local business features',
        'Seasonal comfort items',
        'Exclusive subscriber discounts',
        'Cancel anytime flexibility'
      ],
      rating: 4.8,
      reviews: 312,
      bestseller: true,
      subscription: true
    }
  ];

  const addToCart = (productId: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const getCartCount = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-warm-blush/20 to-sage/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6">
              Postpartum Care Products & Gift Boxes
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Thoughtfully curated care packages and products designed specifically for new mothers 
              in Austin, TX. Each item is selected to support your postpartum recovery and well-being.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Truck className="h-4 w-4" />
                <span>Free Austin Area Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Gift className="h-4 w-4" />
                <span>Custom Gift Wrapping</span>
              </div>
              <div className="flex items-center space-x-2">
                <Package className="h-4 w-4" />
                <span>Same-Day Delivery Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shopping Cart Summary */}
      {getCartCount() > 0 && (
        <div className="sticky top-16 z-40 bg-sage text-white py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5" />
                <span>{getCartCount()} item(s) in cart</span>
              </div>
              <button className="bg-white text-sage px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200">
                View Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={`${product.name} - Postpartum care package Austin TX`}
                    className="w-full h-64 object-cover"
                  />
                  {product.bestseller && (
                    <div className="absolute top-4 left-4 bg-soft-terracotta text-white px-3 py-1 rounded-full text-sm font-medium">
                      Bestseller
                    </div>
                  )}
                  {product.subscription && (
                    <div className="absolute top-4 right-4 bg-sage text-white px-3 py-1 rounded-full text-sm font-medium">
                      Subscription
                    </div>
                  )}
                  <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200">
                    <Heart className="h-5 w-5 text-gray-400 hover:text-soft-terracotta" />
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  
                  <ul className="space-y-1 mb-4">
                    {product.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-soft-terracotta rounded-full flex-shrink-0"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                    {product.features.length > 3 && (
                      <li className="text-sm text-soft-terracotta font-medium">
                        +{product.features.length - 3} more items
                      </li>
                    )}
                  </ul>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through ml-2">
                          ${product.originalPrice}
                        </span>
                      )}
                      {product.subscription && (
                        <span className="text-sm text-gray-500 block">/month</span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-soft-terracotta text-white font-medium rounded-full hover:bg-deep-sage transition-all duration-300 transform hover:scale-105"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-sage/10 to-warm-blush/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              Why Choose Our Care Packages?
            </h2>
            <p className="text-xl text-gray-600">
              Every product is carefully selected by postpartum care experts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-warm-blush/20 rounded-full mb-4">
                <Heart className="h-8 w-8 text-soft-terracotta" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Curated</h3>
              <p className="text-gray-600">
                Each item is selected by postpartum care professionals and experienced mothers 
                who understand what new moms really need.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-sage/20 rounded-full mb-4">
                <Package className="h-8 w-8 text-sage" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Austin Local</h3>
              <p className="text-gray-600">
                We feature products from local Austin businesses and include treats and items 
                that celebrate our vibrant Texas community.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-warm-blush/20 rounded-full mb-4">
                <Gift className="h-8 w-8 text-soft-terracotta" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personalized Touch</h3>
              <p className="text-gray-600">
                Every package includes a personalized note and can be customized based on 
                specific needs, preferences, or dietary restrictions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-soft-terracotta to-sage">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-6">
            Need Help Choosing the Right Package?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Our postpartum care experts are here to help you find the perfect care package 
            for your unique needs and situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-soft-terracotta font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Get Personal Recommendations
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-soft-terracotta transition-all duration-300">
              Call (512) 555-0123
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
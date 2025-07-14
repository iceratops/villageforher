import React, { useState } from 'react';
import { CreditCard, Shield, Lock, CheckCircle, DollarSign, Calendar } from 'lucide-react';

const PaymentPortal = () => {
  const [paymentType, setPaymentType] = useState<'service' | 'product'>('service');
  const [selectedService, setSelectedService] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const services = [
    { id: 'emotional-support', name: 'Emotional Support Session', price: 120 },
    { id: 'newborn-care', name: 'Newborn Care Support', price: 100 },
    { id: 'in-home-care', name: 'In-Home Postpartum Care (2 hours)', price: 70 },
    { id: 'support-group', name: 'Support Group Session', price: 25 },
    { id: 'consultation', name: 'Initial Consultation', price: 80 }
  ];

  const products = [
    { id: 'essentials-box', name: 'New Mom Essentials Box', price: 89.99 },
    { id: 'baby-starter', name: 'Baby Care Starter Kit', price: 64.99 },
    { id: 'comfort-package', name: 'Comfort & Care Package', price: 124.99 },
    { id: 'survival-kit', name: 'Austin Mom\'s Survival Kit', price: 49.99 },
    { id: 'breastfeeding-bundle', name: 'Breastfeeding Support Bundle', price: 79.99 },
    { id: 'monthly-subscription', name: 'Monthly Care Subscription', price: 39.99 }
  ];

  const getSelectedPrice = () => {
    if (paymentType === 'service') {
      const service = services.find(s => s.id === selectedService);
      return service ? service.price : 0;
    } else {
      const product = products.find(p => p.id === selectedProduct);
      return product ? product.price : 0;
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-warm-blush/20 to-sage/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6">
            Secure Payment Portal
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Safe and secure payment processing for Village For Her services and products. 
            Your information is protected with industry-standard encryption.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>SSL Encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4" />
              <span>PCI Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Secure Processing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Form */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Payment Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                Payment Information
              </h2>

              {/* Payment Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What are you paying for?
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setPaymentType('service')}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      paymentType === 'service'
                        ? 'border-soft-terracotta bg-warm-blush/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Calendar className="h-6 w-6 mx-auto mb-2 text-soft-terracotta" />
                    <span className="font-medium">Service</span>
                  </button>
                  <button
                    onClick={() => setPaymentType('product')}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      paymentType === 'product'
                        ? 'border-soft-terracotta bg-warm-blush/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <DollarSign className="h-6 w-6 mx-auto mb-2 text-soft-terracotta" />
                    <span className="font-medium">Product</span>
                  </button>
                </div>
              </div>

              {/* Service/Product Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select {paymentType === 'service' ? 'Service' : 'Product'}
                </label>
                <select
                  value={paymentType === 'service' ? selectedService : selectedProduct}
                  onChange={(e) => 
                    paymentType === 'service' 
                      ? setSelectedService(e.target.value)
                      : setSelectedProduct(e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-soft-terracotta focus:border-transparent"
                >
                  <option value="">Choose a {paymentType}</option>
                  {(paymentType === 'service' ? services : products).map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} - ${item.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* Customer Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-soft-terracotta focus:border-transparent"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-soft-terracotta focus:border-transparent"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-soft-terracotta focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-soft-terracotta focus:border-transparent"
                  placeholder="(512) 555-0123"
                />
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Method
                </label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-soft-terracotta focus:ring-soft-terracotta"
                    />
                    <CreditCard className="h-5 w-5 text-gray-400" />
                    <span>Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-soft-terracotta focus:ring-soft-terracotta"
                    />
                    <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                      P
                    </div>
                    <span>PayPal</span>
                  </label>
                </div>
              </div>

              {/* Card Details */}
              {paymentMethod === 'card' && (
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-soft-terracotta focus:border-transparent"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-soft-terracotta focus:border-transparent"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-soft-terracotta focus:border-transparent"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button className="w-full bg-soft-terracotta text-white font-semibold py-4 rounded-lg hover:bg-deep-sage transition-all duration-300 transform hover:scale-105">
                Complete Payment - ${getSelectedPrice()}
              </button>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-6">
                Order Summary
              </h3>

              {getSelectedPrice() > 0 ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-700">
                      {paymentType === 'service' 
                        ? services.find(s => s.id === selectedService)?.name
                        : products.find(p => p.id === selectedProduct)?.name
                      }
                    </span>
                    <span className="font-semibold">${getSelectedPrice()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-700">Tax</span>
                    <span className="font-semibold">${(getSelectedPrice() * 0.0825).toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 text-lg font-bold">
                    <span>Total</span>
                    <span className="text-soft-terracotta">
                      ${(getSelectedPrice() * 1.0825).toFixed(2)}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Please select a service or product to see pricing details.
                </p>
              )}

              <div className="mt-8 p-4 bg-sage/10 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Payment Security</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 256-bit SSL encryption</li>
                  <li>• PCI DSS compliant processing</li>
                  <li>• No card details stored</li>
                  <li>• Secure payment gateway</li>
                </ul>
              </div>

              <div className="mt-6 p-4 bg-warm-blush/10 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Contact our support team if you have any questions about payment.
                </p>
                <p className="text-sm font-medium text-soft-terracotta">
                  (512) 555-0123 | hello@villageforher.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentPortal;
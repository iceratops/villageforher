import React from 'react';
import { Clock, Star, Phone } from 'lucide-react';
import { services } from '../lib/services';

const Services = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-warm-blush/20 to-sage/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6">
              Postpartum Care Services for Women Everywhere
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Comprehensive support services designed to help women thrive during their postpartum journey. Professional, compassionate care tailored to your unique needs, wherever you are.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Flexible Scheduling</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4" />
                <span>Licensed Professionals</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>24/7 Support Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-r from-sage/10 to-warm-blush/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600">
              We are proud to support women across the nation and beyond. If you don't see your area listed, <span className="text-soft-terracotta font-medium">contact us</span> to discuss availability.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {services.map((service, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-warm-blush/20 rounded-full mb-4">
                  <service.icon className="h-8 w-8 text-soft-terracotta" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                <ul className="text-gray-500 text-sm mt-4 mb-2 space-y-1 text-left">
                  {service.features.map((feature, i) => (
                    <li key={i}>• {feature}</li>
                  ))}
                </ul>
                <div className="text-soft-terracotta font-semibold mt-2">{service.price}</div>
                <div className="text-gray-400 text-xs">{service.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
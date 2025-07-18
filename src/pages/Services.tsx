import React from 'react';
import { Heart, Users, Baby, Home, Phone, Gift, Clock, Star } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Heart,
      title: 'Emotional Support & Counseling',
      description: 'Professional postpartum emotional support and counseling services for women everywhere',
      features: [
        'One-on-one postpartum counseling sessions',
        'Support for postpartum depression and anxiety',
        'Emotional wellness check-ins',
        'Coping strategies and stress management',
        'Partner and family support guidance'
      ],
      price: 'Starting at $120/session',
      duration: '60-90 minutes'
    },
    {
      icon: Baby,
      title: 'Newborn Care Support',
      description: 'Expert guidance and hands-on support for caring for your new baby',
      features: [
        'Breastfeeding support and lactation guidance',
        'Newborn sleep training and routines',
        'Baby care basics and safety',
        'Feeding schedules and nutrition advice',
        'Developmental milestone tracking'
      ],
      price: 'Starting at $100/session',
      duration: '2-3 hours'
    },
    {
      icon: Home,
      title: 'In-Home Postpartum Care',
      description: 'Comprehensive in-home support for women and new mothers everywhere',
      features: [
        'Light housekeeping and meal preparation',
        'Postpartum recovery assistance',
        'Sibling care and family adjustment',
        'Errands and grocery shopping',
        'Overnight newborn care support'
      ],
      price: 'Starting at $35/hour',
      duration: 'Flexible scheduling'
    },
    {
      icon: Users,
      title: 'New Mom Support Groups',
      description: 'Connect with other mothers in supportive group settings, wherever you are',
      features: [
        'Weekly support group meetings',
        'Postpartum fitness and wellness classes',
        'Mom and baby social activities',
        'Educational workshops and seminars',
        'Peer mentorship programs'
      ],
      price: 'Starting at $25/session',
      duration: '90 minutes'
    },
    {
      icon: Phone,
      title: '24/7 Support Hotline',
      description: 'Round-the-clock emotional support and guidance when you need it most',
      features: [
        'Crisis intervention and immediate support',
        'Late-night feeding and sleep guidance',
        'Emergency postpartum care advice',
        'Resource referrals and connections',
        'Text and phone support options'
      ],
      price: 'Included with care packages',
      duration: 'Available 24/7'
    },
    {
      icon: Gift,
      title: 'Custom Care Packages',
      description: 'Thoughtfully curated gift boxes with postpartum essentials and comfort items',
      features: [
        'Postpartum recovery essentials',
        'Comfort items and self-care products',
        'Locally sourced treats and gifts',
        'Baby care necessities',
        'Personalized notes and encouragement'
      ],
      price: 'Starting at $75',
      duration: 'One-time or subscription'
    }
  ];

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
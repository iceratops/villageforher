import React from 'react';
import { Heart, Users, Baby, Home, Phone, Gift, Clock, Star } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Heart,
      title: 'Emotional Support & Counseling',
      description: 'Professional postpartum emotional support and counseling services in Austin, TX',
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
      description: 'Comprehensive in-home support for new mothers in Austin and surrounding areas',
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
      description: 'Connect with other Austin area mothers in supportive group settings',
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
        'Locally sourced Austin treats and gifts',
        'Baby care necessities',
        'Personalized notes and encouragement'
      ],
      price: 'Starting at $75',
      duration: 'One-time or subscription'
    }
  ];

  const serviceAreas = [
    'Austin, TX',
    'Pflugerville, TX',
    'Round Rock, TX',
    'Cedar Park, TX',
    'Leander, TX',
    'Georgetown, TX',
    'Lakeway, TX',
    'Bee Cave, TX'
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-warm-blush/20 to-sage/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6">
              Postpartum Care Services in Austin, TX
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Comprehensive support services designed to help new mothers thrive during their postpartum journey. 
              Professional, compassionate care tailored to your unique needs.
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
      <section className="py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-8"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-warm-blush/20 rounded-full">
                    <service.icon className="h-6 w-6 text-soft-terracotta" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-gray-900">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-soft-terracotta rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-lg font-semibold text-soft-terracotta">{service.price}</p>
                    <p className="text-sm text-gray-500">{service.duration}</p>
                  </div>
                  <button className="px-6 py-2 bg-sage text-white font-medium rounded-full hover:bg-deep-sage transition-colors duration-200">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-gradient-to-r from-sage/10 to-warm-blush/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              Areas We Serve
            </h2>
            <p className="text-xl text-gray-600">
              Providing postpartum care and support throughout the Austin metropolitan area
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {serviceAreas.map((area, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-200"
              >
                <p className="font-medium text-gray-900">{area}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Don't see your area listed? <span className="text-soft-terracotta font-medium">Contact us</span> to discuss availability.
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              How Our Postpartum Care Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to get the support you need during your postpartum journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-soft-terracotta text-white rounded-full text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Initial Consultation</h3>
              <p className="text-gray-600">
                We start with a comprehensive consultation to understand your unique needs, 
                concerns, and goals for your postpartum journey.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-sage text-white rounded-full text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personalized Care Plan</h3>
              <p className="text-gray-600">
                Based on your consultation, we create a customized care plan that addresses 
                your specific needs and preferences.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-warm-blush text-white rounded-full text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Ongoing Support</h3>
              <p className="text-gray-600">
                Receive continuous support through regular check-ins, care sessions, 
                and 24/7 availability when you need us most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-soft-terracotta to-sage">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-6">
            Ready to Get the Support You Deserve?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Don't navigate your postpartum journey alone. Our team of caring professionals 
            is here to support you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-soft-terracotta font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Schedule Consultation
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

export default Services;
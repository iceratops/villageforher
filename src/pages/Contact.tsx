import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Calendar } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email',
    urgency: 'normal'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-warm-blush/20 to-sage/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6">
              Contact Village For Her
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We're here to support you on your postpartum journey. Reach out to us for questions, 
              consultations, or immediate support. Serving Austin, TX and surrounding areas.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>24/7 Emergency Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Same-Day Response</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>Multiple Contact Options</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-soft-terracotta focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-soft-terracotta focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-soft-terracotta focus:border-transparent"
                    placeholder="(512) 555-0123"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-soft-terracotta focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="consultation">Initial Consultation</option>
                      <option value="services">Services Information</option>
                      <option value="products">Product Questions</option>
                      <option value="support">Immediate Support Needed</option>
                      <option value="billing">Billing Questions</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-2">
                      Urgency Level
                    </label>
                    <select
                      id="urgency"
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-soft-terracotta focus:border-transparent"
                    >
                      <option value="normal">Normal (24-48 hours)</option>
                      <option value="urgent">Urgent (Same day)</option>
                      <option value="emergency">Emergency (Immediate)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="preferredContact" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Contact Method
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === 'email'}
                        onChange={handleInputChange}
                        className="text-soft-terracotta focus:ring-soft-terracotta"
                      />
                      <span>Email</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === 'phone'}
                        onChange={handleInputChange}
                        className="text-soft-terracotta focus:ring-soft-terracotta"
                      />
                      <span>Phone</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="text"
                        checked={formData.preferredContact === 'text'}
                        onChange={handleInputChange}
                        className="text-soft-terracotta focus:ring-soft-terracotta"
                      />
                      <span>Text</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-soft-terracotta focus:border-transparent"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 bg-soft-terracotta text-white font-semibold py-4 rounded-lg hover:bg-deep-sage transition-all duration-300 transform hover:scale-105"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-6">
                  Get in Touch
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-warm-blush/20 rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6 text-soft-terracotta" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <p className="text-gray-600">(512) 555-0123</p>
                      <p className="text-sm text-gray-500">24/7 Emergency Support Available</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-sage" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <p className="text-gray-600">hello@villageforher.com</p>
                      <p className="text-sm text-gray-500">Response within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-warm-blush/20 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-soft-terracotta" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Service Area</p>
                      <p className="text-gray-600">Austin, TX & Surrounding Areas</p>
                      <p className="text-sm text-gray-500">Including Pflugerville, Round Rock, Cedar Park</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-sage" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Hours</p>
                      <p className="text-gray-600">Mon-Sun: 8:00 AM - 8:00 PM</p>
                      <p className="text-sm text-gray-500">Emergency support available 24/7</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-r from-sage/10 to-warm-blush/10 rounded-xl p-8">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-6">
                  Quick Actions
                </h3>
                
                <div className="space-y-4">
                  <button className="w-full flex items-center space-x-3 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                    <Calendar className="h-6 w-6 text-soft-terracotta" />
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">Schedule Consultation</p>
                      <p className="text-sm text-gray-600">Book your initial consultation</p>
                    </div>
                  </button>
                  
                  <button className="w-full flex items-center space-x-3 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                    <Phone className="h-6 w-6 text-sage" />
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">Emergency Support</p>
                      <p className="text-sm text-gray-600">Immediate help available</p>
                    </div>
                  </button>
                  
                  <button className="w-full flex items-center space-x-3 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                    <MessageCircle className="h-6 w-6 text-soft-terracotta" />
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">Join Support Group</p>
                      <p className="text-sm text-gray-600">Connect with other Austin moms</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Emergency Notice */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h4 className="font-semibold text-red-900 mb-2">Emergency Support</h4>
                <p className="text-red-700 text-sm mb-3">
                  If you're experiencing a mental health emergency or having thoughts of self-harm, 
                  please contact emergency services immediately.
                </p>
                <div className="space-y-1 text-sm">
                  <p><strong>Emergency:</strong> 911</p>
                  <p><strong>Crisis Hotline:</strong> 988 (Suicide & Crisis Lifeline)</p>
                  <p><strong>Postpartum Support International:</strong> 1-800-944-4773</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              Our Service Area
            </h2>
            <p className="text-xl text-gray-600">
              Proudly serving new mothers throughout the Austin metropolitan area
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-soft-terracotta mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Interactive Map Coming Soon</p>
                <p className="text-sm text-gray-500">
                  Currently serving Austin, Pflugerville, Round Rock, Cedar Park, 
                  Leander, Georgetown, Lakeway, and Bee Cave
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
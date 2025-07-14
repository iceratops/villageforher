import React from 'react';
import { Heart, Users, Award, Target } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Compassionate Care',
      description: 'Every mother deserves to feel supported, understood, and cared for during her postpartum journey.'
    },
    {
      icon: Users,
      title: 'Community Building',
      description: 'We believe in the power of connection and creating lasting support networks for Austin area mothers.'
    },
    {
      icon: Award,
      title: 'Quality Support',
      description: 'Professional, evidence-based postpartum care tailored to each mother\'s unique needs and circumstances.'
    },
    {
      icon: Target,
      title: 'Holistic Approach',
      description: 'Addressing emotional, physical, and practical needs to support the whole mother, not just the symptoms.'
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-warm-blush/20 to-sage/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6">
              About Village For Her
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Founded on the belief that every mother deserves a village, we provide compassionate 
              postpartum care and support to new mothers throughout Austin, TX and surrounding communities.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-6">
                Our Founder's Story
              </h2>
              <div className="space-y-4 text-lg text-gray-600">
                <p>
                  When I became a mother for the first time, I quickly realized how isolating and overwhelming 
                  the postpartum period could be. Despite living in a vibrant city like Austin, I felt alone 
                  and unprepared for the emotional and physical challenges that followed childbirth.
                </p>
                <p>
                  Like many new mothers, I didn't have family nearby to help. I struggled with breastfeeding, 
                  sleep deprivation, and the emotional rollercoaster that comes with hormonal changes. 
                  I wished for a village – a community of support that understood what I was going through.
                </p>
                <p>
                  That experience inspired me to create Village For Her. I wanted to ensure that no mother 
                  in the Austin area would have to navigate the postpartum journey alone. Every mother 
                  deserves to feel supported, celebrated, and cared for during this precious but challenging time.
                </p>
                <p>
                  Today, Village For Her serves mothers throughout Austin, Pflugerville, Round Rock, and 
                  surrounding areas, providing the village that every new mother needs and deserves.
                </p>
              </div>
              <div className="mt-8 p-6 bg-warm-blush/20 rounded-xl">
                <p className="text-lg font-medium text-gray-900 italic">
                  "It takes a village to raise a child, but it also takes a village to support the mother. 
                  We're here to be that village for you."
                </p>
                <p className="mt-2 text-soft-terracotta font-semibold">- Afreen, Founder</p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3985363/pexels-photo-3985363.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Village For Her founder with baby - Austin postpartum care"
                className="rounded-2xl shadow-xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="text-center">
                  <p className="text-2xl font-bold text-soft-terracotta">500+</p>
                  <p className="text-sm text-gray-600">Mothers Supported</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-gradient-to-r from-sage/10 to-warm-blush/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-6">
              Our Mission & Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to transforming the postpartum experience for mothers in Austin, TX 
              through compassionate care, community connection, and comprehensive support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-warm-blush/20 rounded-full mb-4">
                  <value.icon className="h-8 w-8 text-soft-terracotta" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4 text-center">
              Our Mission
            </h3>
            <p className="text-lg text-gray-600 text-center max-w-4xl mx-auto leading-relaxed">
              To provide comprehensive, compassionate postpartum care and support to new mothers in the 
              Austin, Texas area. We believe that every mother deserves to feel supported, understood, 
              and empowered during her postpartum journey. Through personalized care, community building, 
              and practical support, we help mothers navigate this transformative time with confidence and joy.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/6849400/pexels-photo-6849400.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Postpartum support group in Austin, TX"
                className="rounded-2xl shadow-xl w-full h-96 object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-6">
                Why Austin Mothers Choose Us
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-soft-terracotta rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Local Austin Expertise</h3>
                    <p className="text-gray-600">
                      Deep understanding of the Austin area healthcare system, resources, and community networks.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-soft-terracotta rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Personalized Care Plans</h3>
                    <p className="text-gray-600">
                      Every mother's journey is unique. We create customized support plans tailored to your specific needs.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-soft-terracotta rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Evidence-Based Support</h3>
                    <p className="text-gray-600">
                      Our approaches are grounded in the latest research on postpartum care and maternal mental health.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-soft-terracotta rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Ongoing Community</h3>
                    <p className="text-gray-600">
                      Connect with other Austin area mothers and build lasting friendships and support networks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
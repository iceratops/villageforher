import { Heart, Users, Baby, Home, Phone, Gift } from 'lucide-react';

export interface Service {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  features: string[];
  price: string;
  duration: string;
}

export const services: Service[] = [
  {
    icon: Heart,
    title: 'Emotional Support & Counseling',
    description: 'Professional postpartum emotional support and counseling services for women everywhere',
    features: [
      'One-on-one postpartum counseling sessions',
      'Support for postpartum depression and anxiety',
      'Emotional wellness check-ins',
      'Coping strategies and stress management',
      'Partner and family support guidance',
    ],
    price: 'Starting at $120/session',
    duration: '60-90 minutes',
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
      'Developmental milestone tracking',
    ],
    price: 'Starting at $100/session',
    duration: '2-3 hours',
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
      'Overnight newborn care support',
    ],
    price: 'Starting at $35/hour',
    duration: 'Flexible scheduling',
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
      'Peer mentorship programs',
    ],
    price: 'Starting at $25/session',
    duration: '90 minutes',
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
      'Text and phone support options',
    ],
    price: 'Included with care packages',
    duration: 'Available 24/7',
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
      'Personalized notes and encouragement',
    ],
    price: 'Starting at $75',
    duration: 'One-time or subscription',
  },
]; 
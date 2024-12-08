import React from 'react';
import { Sparkles, Truck, RefreshCw, Clock } from 'lucide-react';

const features = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Premium Quality',
    description: 'Handpicked materials for lasting comfort'
  },
  {
    icon: <Truck className="w-6 h-6" />,
    title: 'Free Shipping',
    description: 'On orders over $100'
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: 'Easy Returns',
    description: '30-day return policy'
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: '24/7 Support',
    description: 'Always here to help you'
  }
];

export default function PromoSection() {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-primary-50 rounded-lg transition-transform hover:scale-105"
            >
              <div className="text-primary-600 mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
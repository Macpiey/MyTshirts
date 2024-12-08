import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link 
      to={`/product/${product.id}`} 
      className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
    >
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
        />
        <button 
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-red-500 transition-colors duration-200"
          onClick={(e) => {
            e.preventDefault();
            // Handle wishlist
          }}
        >
          <Heart size={20} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary-600 transition-colors duration-200">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-primary-600">View Details →</span>
        </div>
      </div>
    </Link>
  );
}
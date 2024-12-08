import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { Plus, Minus, Upload, Check, AlertCircle } from 'lucide-react';

// Simulated products data - in a real app, this would come from your backend
const productsData: Record<number, Product> = {
  1: {
    id: 1,
    name: 'Classic White T-Shirt',
    description: 'Premium cotton t-shirt perfect for everyday wear',
    price: 29.99,
    category: 't-shirts',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
  },
  2: {
    id: 2,
    name: 'Slim Fit Jeans',
    description: 'Modern slim fit jeans in dark wash',
    price: 59.99,
    category: 'pants',
    imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80',
  },
  // Add more products as needed
};

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [designFile, setDesignFile] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const product = productsData[Number(id)];
  
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-gray-600">The product you're looking for doesn't exist.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: {
        ...product,
        designFile: designFile ? designFile.name : undefined
      }
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setDesignFile(file);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const isTshirt = product.category.toLowerCase() === 't-shirts';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-lg shadow-lg"
          />
          {designFile && (
            <div className="absolute top-4 right-4 bg-accent-500 text-white px-4 py-2 rounded-full shadow-md">
              Custom Design Added
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-2xl text-primary-600 font-semibold">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>

          <div className="border-t border-b border-gray-200 py-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-700 font-medium">Quantity</span>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                >
                  <Minus size={20} />
                </button>
                <span className="text-xl font-medium w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {isTshirt && (
              <div className="space-y-4">
                <span className="text-gray-700 font-medium block">Custom Design</span>
                <input
                  type="file"
                  accept=".pdf"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex items-center justify-center space-x-2 w-full py-3 px-4 rounded-md border-2 border-dashed transition-colors ${
                    designFile
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-primary-500 hover:bg-gray-50'
                  }`}
                >
                  {designFile ? (
                    <>
                      <Check size={20} />
                      <span>{designFile.name}</span>
                    </>
                  ) : (
                    <>
                      <Upload size={20} />
                      <span>Upload Design (PDF)</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="relative w-full bg-primary-600 text-white py-4 px-6 rounded-md hover:bg-primary-700 transition-colors"
          >
            {showSuccess ? (
              <span className="flex items-center justify-center space-x-2">
                <Check size={20} />
                <span>Added to Cart!</span>
              </span>
            ) : (
              'Add to Cart'
            )}
          </button>

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-4 pt-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Free Shipping</p>
              <p className="font-medium">On orders over $100</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Returns</p>
              <p className="font-medium">30-day money back</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
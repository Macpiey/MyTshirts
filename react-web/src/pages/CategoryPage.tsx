import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import FilterSection from '../components/FilterSection';
import ProductGrid from '../components/ProductGrid';
import { Product } from '../types';

// Simulated products data
const products: Product[] = [
  {
    id: 1,
    name: 'Classic White T-Shirt',
    description: 'Premium cotton t-shirt perfect for everyday wear',
    price: 29.99,
    category: 't-shirts',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
  },
  {
    id: 2,
    name: 'Slim Fit Jeans',
    description: 'Modern slim fit jeans in dark wash',
    price: 59.99,
    category: 'pants',
    imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80',
  },
  {
    id: 3,
    name: 'Comfort Sweatpants',
    description: 'Cozy sweatpants for ultimate comfort',
    price: 39.99,
    category: 'sweatpants',
    imageUrl: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8',
  },
  {
    id: 4,
    name: 'Classic Hoodie',
    description: 'Warm and comfortable hoodie for any occasion',
    price: 49.99,
    category: 'sweatshirts',
    imageUrl: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2',
  },
  {
    id: 5,
    name: 'Graphic T-Shirt',
    description: 'Unique graphic design t-shirt',
    price: 34.99,
    category: 't-shirts',
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27',
  },
  {
    id: 6,
    name: 'Cargo Pants',
    description: 'Functional cargo pants with multiple pockets',
    price: 69.99,
    category: 'pants',
    imageUrl: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7',
  }
];

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [selectedSort, setSelectedSort] = useState('newest');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');

  const categoryProducts = products.filter(
    (product) => product.category.toLowerCase() === category?.toLowerCase()
  );

  // Apply sorting
  const sortedProducts = [...categoryProducts].sort((a, b) => {
    switch (selectedSort) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'popular':
        return 0; // In a real app, would sort by popularity metric
      default:
        return 0; // Newest first would use creation date
    }
  });

  // Apply price filtering
  const filteredProducts = sortedProducts.filter((product) => {
    switch (selectedPriceRange) {
      case '0-25':
        return product.price < 25;
      case '25-50':
        return product.price >= 25 && product.price < 50;
      case '50-100':
        return product.price >= 50 && product.price < 100;
      case '100+':
        return product.price >= 100;
      default:
        return true;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 capitalize">
          {category?.replace('-', ' ')}
        </h1>
        <p className="text-gray-600">
          {filteredProducts.length} items found in {category}
        </p>
      </div>

      <FilterSection
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
        selectedPriceRange={selectedPriceRange}
        onPriceRangeChange={setSelectedPriceRange}
      />

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No products found matching your criteria.</p>
        </div>
      ) : (
        <ProductGrid products={filteredProducts} category={category || ''} />
      )}
    </div>
  );
}
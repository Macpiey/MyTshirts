import React from "react";
import HeroSection from "../components/HeroSection";
import PromoSection from "../components/PromoSection";
import CategoryCard from "../components/CategoryCard";

const categories = [
  {
    name: "Shirts",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
    description: "Classic and modern shirts for every occasion",
  },
  {
    name: "Pants",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80",
    description: "Comfortable and stylish pants for your daily needs",
  },
  {
    name: "Sweatpants",
    image: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8",
    description: "Cozy sweatpants for ultimate comfort",
  },
  {
    name: "Sweatshirts",
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2",
    description: "Warm and trendy sweatshirts for any season",
  },
  {
    name: "T-shirts",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    description: "Essential t-shirts with custom design options",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />

      <div className="py-12">
        <PromoSection />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of clothing categories, each carefully
            curated for style and comfort
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              image={category.image}
              description={category.description}
            />
          ))}
        </div>
      </div>

      <div className="bg-primary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Special Offer
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Get 20% off on your first purchase! Use code{" "}
              <span className="font-semibold text-primary-600">WELCOME20</span>
            </p>
            <div className="inline-block bg-white px-6 py-3 rounded-lg shadow-md">
              <span className="text-2xl font-bold text-primary-600">
                WELCOME20
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

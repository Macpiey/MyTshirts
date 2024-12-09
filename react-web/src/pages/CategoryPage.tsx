// src/pages/CategoryPage.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FilterSection from "../components/FilterSection";
import ProductGrid from "../components/ProductGrid";
import { Product } from "../types";
import axios from "axios";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [selectedSort, setSelectedSort] = useState("newest");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Product[]>(
          "http://localhost:8080/products"
        );
        setProducts(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products by category
    const categoryProducts = products.filter(
      (product) => product.category.toLowerCase() === category?.toLowerCase()
    );

    // Apply price filtering
    const priceFiltered = categoryProducts.filter((product) => {
      switch (selectedPriceRange) {
        case "0-25":
          return product.price < 25;
        case "25-50":
          return product.price >= 25 && product.price < 50;
        case "50-100":
          return product.price >= 50 && product.price < 100;
        case "100+":
          return product.price >= 100;
        default:
          return true;
      }
    });

    // Apply sorting
    const sortedProducts = [...priceFiltered].sort((a, b) => {
      switch (selectedSort) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "popular":
          return 0; // Implement popularity logic if available
        default:
          return 0; // Newest first would require a date field
      }
    });

    setFilteredProducts(sortedProducts);
  }, [products, category, selectedSort, selectedPriceRange]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 capitalize">
          {category?.replace("-", " ")}
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
          <p className="text-gray-600">
            No products found matching your criteria.
          </p>
        </div>
      ) : (
        <ProductGrid products={filteredProducts} category={category || ""} />
      )}
    </div>
  );
}

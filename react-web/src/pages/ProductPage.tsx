import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Product } from "../types";
import { Plus, Minus, Upload, Check, AlertCircle } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Correct import for jwtDecode

// Define the shape of your JWT payload
interface JwtPayload {
  userId: string;
  // Add other fields if necessary
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { dispatch, fetchCartFromServer } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [designFile, setDesignFile] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(
          "http://localhost:8080/products"
        );
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Find the product by ID
  const product = products ? products.find((p) => p.id === id) : null;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Product Not Found
        </h2>
        <p className="text-gray-600">
          The product you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  // Helper function to get JWT token from cookies
  const getJwtToken = (): string | null => {
    return Cookies.get("jwtToken") || null; // Replace 'jwtToken' with your actual cookie name
  };

  // Helper function to decode JWT and get userId
  const getUserIdFromToken = (token: string): string | null => {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.userId; // Corrected from decoded.username to decoded.userId
    } catch (error) {
      console.error("Failed to decode JWT:", error);
      return null;
    }
  };

  const handleAddToCart = async () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...product,
        quantity,
      },
    });

    const token = getJwtToken();
    if (token) {
      const userId = getUserIdFromToken(token);
      if (!userId) return;

      try {
        const url = `http://localhost:8080/cart/add?userId=${userId}&productId=${product.id}&quantity=${quantity}`;

        // Create the payload dynamically
        let payload;
        const headers = { Authorization: `Bearer ${token}` };

        if (designFile) {
          const formData = new FormData();
          formData.append("file", designFile);
          payload = formData;
          headers["Content-Type"] = "multipart/form-data";
        } else {
          payload = {}; // Existing payload when no file is provided
        }

        await axios.post(url, payload, { headers });
        await fetchCartFromServer(); // Refresh cart from server
      } catch (error) {
        console.error("Failed to add to cart:", error);
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setDesignFile(file);
    } else {
      alert("Please upload a PDF file");
    }
  };

  // Use the 'customizable' field instead of category to determine if custom design is available
  const isCustomizable = product.customizable;

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-2xl text-primary-600 font-semibold">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            {product.description}
          </p>

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
                <span className="text-xl font-medium w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {isCustomizable && (
              <div className="space-y-4">
                <span className="text-gray-700 font-medium block">
                  Custom Design
                </span>
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
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-gray-300 hover:border-primary-500 hover:bg-gray-50"
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
              "Add to Cart"
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

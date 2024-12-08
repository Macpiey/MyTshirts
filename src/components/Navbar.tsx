import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, ChevronDown, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { theme } from "../styles/theme";

const categories = ["Shirts", "Pants", "Sweatpants", "Sweatshirts", "T-shirts"];

export default function Navbar() {
  const { state } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const cartItemsCount = state.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const handleCatalogEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsCatalogOpen(true);
  };

  const handleCatalogLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsCatalogOpen(false);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <nav className="bg-gradient-to-r from-primary-600 to-primary-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-white text-primary-600 px-3 py-1 rounded-md">
                MT
              </span>
              <span className="text-xl font-semibold hidden sm:block">
                MyTshirt Inc.
              </span>
            </Link>

            <div
              className="ml-10 relative"
              onMouseEnter={handleCatalogEnter}
              onMouseLeave={handleCatalogLeave}
            >
              <button className="flex items-center space-x-1 text-white hover:text-primary-200 transition-colors duration-200">
                <span>Catalog</span>
                <ChevronDown
                  size={16}
                  className={`transform transition-transform duration-200 ${
                    isCatalogOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isCatalogOpen && (
                <div className="absolute z-10 w-56 mt-2 bg-white rounded-md shadow-xl animate-fadeIn">
                  <div className="py-2">
                    {categories.map((category) => (
                      <Link
                        key={category}
                        to={`/category/${category.toLowerCase()}`}
                        className="block px-4 py-3 text-gray-800 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <Link
              to="/cart"
              className="relative text-white hover:text-primary-200 transition-colors duration-200"
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs animate-bounce">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <Link
              to="/login"
              className="hidden sm:flex items-center space-x-2 text-white hover:text-primary-200 transition-colors duration-200"
            >
              <User size={24} />
              <span>Sign In</span>
            </Link>
            <button
              className="sm:hidden text-white hover:text-primary-200 transition-colors duration-200"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden bg-primary-700 py-4">
          <div className="px-4 space-y-3">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase()}`}
                className="block text-white hover:text-primary-200 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {category}
              </Link>
            ))}
            <Link
              to="/login"
              className="block text-white hover:text-primary-200 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

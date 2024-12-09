// src/components/Navbar.tsx
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, ChevronDown, Menu, X, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useCart } from "../context/CartContext";

const categories = ["Shirts", "Pants", "Sweatpants", "Sweatshirts", "T-shirts"];

interface CartItem {
  id: string;
  userId: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface JwtPayload {
  userId: string;
  // Add other fields if necessary
}

export default function Navbar() {
  const { state: authState, dispatch: authDispatch } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loadingCart, setLoadingCart] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { state: cartState } = useCart();

  const cartItemsCount = cartState.items.reduce(
    (count, item) => count + item.quantity,
    0
  );

  const userEmail = authState.user?.email;

  const handleCatalogEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsCatalogOpen(true);
  };

  const handleCatalogLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsCatalogOpen(false);
    }, 300); // Reduced delay for better UX
  };

  const handleSignOut = () => {
    Cookies.remove("jwtToken");
    authDispatch({ type: "SIGN_OUT" });
    setIsUserMenuOpen(false);
    // Optionally, clear cart items if managed here
    setCartItems([]);
  };

  // Function to decode JWT and get userId
  const getUserId = (): string | null => {
    const token = Cookies.get("jwtToken");
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.userId;
    } catch (err) {
      console.error("Invalid JWT token:", err);
      return null;
    }
  };

  // Fetch cart items from API
  const fetchCart = async () => {
    setLoadingCart(true);
    setError(null);

    const userId = getUserId();
    if (!userId) {
      setError("User not authenticated.");
      setLoadingCart(false);
      return;
    }

    try {
      const response = await axios.get<CartItem[]>(
        `http://localhost:8080/cart/${userId}`,
        {
          headers: { Authorization: `Bearer ${Cookies.get("jwtToken")}` },
        }
      );
      console.log("Fetched Cart Data:", response.data);
      setCartItems(response.data);
    } catch (err: any) {
      console.error("Failed to fetch cart:", err);
      setError(
        err.response?.data?.message ||
          "Failed to load cart. Please try again later."
      );
    } finally {
      setLoadingCart(false);
    }
  };

  // Fetch cart when userEmail changes
  useEffect(() => {
    if (userEmail) {
      fetchCart();
    } else {
      setCartItems([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail]);

  // Clean up timeout on unmount
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
          {/* Left Side */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-600 rounded-md">
                <img
                  src="src\styles\myTshirt.png"
                  alt="MyTshirt Inc. Logo"
                  className="max-h-[50px] max-w-[50px]" // Limit the height of the logo
                />
              </span>

              <span className="text-xl pl-3 font-semibold hidden sm:block">
                MyTshirt Inc.
              </span>
            </Link>

            {/* Catalog Dropdown */}
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

          {/* Right Side */}
          <div className="flex items-center space-x-6">
            {/* Shopping Cart */}
            <Link
              to="/cart"
              className="relative text-white hover:text-primary-200 transition-colors duration-200"
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {userEmail ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-white hover:text-primary-200 transition-colors duration-200"
                >
                  <User size={24} />
                  <span className="hidden sm:inline">{userEmail}</span>
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform duration-200 ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl animate-fadeIn">
                    <button
                      onClick={handleSignOut}
                      className="block px-4 py-2 text-gray-800 hover:bg-primary-50 hover:text-primary-600 w-full text-left transition-colors duration-200 flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex items-center space-x-2 text-white hover:text-primary-200 transition-colors duration-200"
              >
                <User size={24} />
                <span>Sign In</span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="sm:hidden text-white hover:text-primary-200 transition-colors duration-200"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden bg-primary-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase()}`}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-primary-600"
              >
                {category}
              </Link>
            ))}

            <Link
              to="/cart"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-primary-600"
            >
              Cart ({cartItemsCount})
            </Link>

            {userEmail ? (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-primary-600"
                >
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-primary-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-primary-600"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

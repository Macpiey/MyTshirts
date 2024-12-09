import React, { createContext, useContext, useReducer } from "react";
import { CartItem, Product } from "../types";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_CART"; payload: CartItem[] };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  fetchCartFromServer: () => Promise<void>;
} | null>(null);

const getUserIdFromToken = (): string | null => {
  const token = Cookies.get("jwtToken");
  if (!token) return null;

  try {
    const decoded = jwtDecode<{ userId: string }>(token);
    return decoded.userId;
  } catch (err) {
    console.error("Failed to decode JWT:", err);
    return null;
  }
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "SET_CART":
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const fetchCartFromServer = async () => {
    const userId = getUserIdFromToken();
    if (!userId) return;

    try {
      const response = await axios.get<CartItem[]>(
        `http://localhost:8080/cart/${userId}`,
        {
          headers: { Authorization: `Bearer ${Cookies.get("jwtToken")}` },
        }
      );
      dispatch({ type: "SET_CART", payload: response.data });
    } catch (err) {
      console.error("Failed to fetch cart from server:", err);
    }
  };

  return (
    <CartContext.Provider value={{ state, dispatch, fetchCartFromServer }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

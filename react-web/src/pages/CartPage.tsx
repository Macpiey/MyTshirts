import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { CustomerDetails } from "../types";
import { X, ShoppingBag, CreditCard, Truck, Check } from "lucide-react";

export default function CartPage() {
  const { state, dispatch } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
  });
  const [orderId] = useState(() => Math.floor(Math.random() * 1000000));

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity === 0) {
      dispatch({ type: "REMOVE_FROM_CART", payload: id });
    } else {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id, quantity },
      });
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setShowCheckout(false);
    setShowOrderConfirmation(true);
  };

  const handleFinishOrder = () => {
    setShowOrderConfirmation(false);
    dispatch({ type: "CLEAR_CART" });
  };

  if (state.items.length === 0 && !showOrderConfirmation) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-600">
          Looks like you haven't added any items yet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {state.items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center p-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1 ml-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                      {item.designFile && (
                        <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                          Custom Design: {item.designFile}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() =>
                        dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
                      }
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="flex items-center space-x-4 mt-4">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      -
                    </button>
                    <span className="font-medium">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{total > 100 ? "Free" : "$10.00"}</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${(total > 100 ? total : total + 10).toFixed(2)}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowCheckout(true)}
            className="w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
          >
            <CreditCard size={20} />
            <span>Proceed to Checkout</span>
          </button>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <form onSubmit={handleCheckout} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200"
                    value={customerDetails.firstName}
                    onChange={(e) =>
                      setCustomerDetails({
                        ...customerDetails,
                        firstName: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200"
                    value={customerDetails.lastName}
                    onChange={(e) =>
                      setCustomerDetails({
                        ...customerDetails,
                        lastName: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200"
                  value={customerDetails.email}
                  onChange={(e) =>
                    setCustomerDetails({
                      ...customerDetails,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200"
                  value={customerDetails.address}
                  onChange={(e) =>
                    setCustomerDetails({
                      ...customerDetails,
                      address: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200"
                    value={customerDetails.city}
                    onChange={(e) =>
                      setCustomerDetails({
                        ...customerDetails,
                        city: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200"
                    value={customerDetails.zipCode}
                    onChange={(e) =>
                      setCustomerDetails({
                        ...customerDetails,
                        zipCode: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCheckout(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors flex items-center space-x-2"
                >
                  <span>Place Order</span>
                  <Truck size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Confirmation Modal */}
      {showOrderConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className="relative shadow-xl max-w-md w-full bg-white"
            style={{
              // Create a subtle zigzag pattern with small increments.
              // Every 2% horizontally, alternate between baseline (0% or 100%) and a small offset (2% or 98%).
              clipPath: `
                polygon(
                  /* Top edge */
                  0% 0%,
                  2% 2%, 4% 0%, 6% 2%, 8% 0%,
                  10% 2%, 12% 0%, 14% 2%, 16% 0%,
                  18% 2%, 20% 0%, 22% 2%, 24% 0%,
                  26% 2%, 28% 0%, 30% 2%, 32% 0%,
                  34% 2%, 36% 0%, 38% 2%, 40% 0%,
                  42% 2%, 44% 0%, 46% 2%, 48% 0%,
                  50% 2%, 52% 0%, 54% 2%, 56% 0%,
                  58% 2%, 60% 0%, 62% 2%, 64% 0%,
                  66% 2%, 68% 0%, 70% 2%, 72% 0%,
                  74% 2%, 76% 0%, 78% 2%, 80% 0%,
                  82% 2%, 84% 0%, 86% 2%, 88% 0%,
                  90% 2%, 92% 0%, 94% 2%, 96% 0%,
                  98% 2%, 100% 0%,

                  /* Right edge going down */
                  100% 100%,

                  /* Bottom edge (reverse order) */
                  98% 98%, 96% 100%, 94% 98%, 92% 100%,
                  90% 98%, 88% 100%, 86% 98%, 84% 100%,
                  82% 98%, 80% 100%, 78% 98%, 76% 100%,
                  74% 98%, 72% 100%, 70% 98%, 68% 100%,
                  66% 98%, 64% 100%, 62% 98%, 60% 100%,
                  58% 98%, 56% 100%, 54% 98%, 52% 100%,
                  50% 98%, 48% 100%, 46% 98%, 44% 100%,
                  42% 98%, 40% 100%, 38% 98%, 36% 100%,
                  34% 98%, 32% 100%, 30% 98%, 28% 100%,
                  26% 98%, 24% 100%, 22% 98%, 20% 100%,
                  18% 98%, 16% 100%, 14% 98%, 12% 100%,
                  10% 98%, 8% 100%, 6% 98%, 4% 100%,
                  2% 98%, 0% 100%
                )
              `,
            }}
          >
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Order Confirmed!
                </h2>
                <p className="text-gray-600 mt-2">Order #{orderId}</p>
              </div>

              <div className="border-t border-b border-gray-200 py-4 my-6">
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                        {item.designFile && (
                          <p className="text-sm text-primary-600">
                            Custom Design: {item.designFile}
                          </p>
                        )}
                      </div>
                      <p className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{total > 100 ? "Free" : "$10.00"}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2">
                  <span>Total</span>
                  <span>${(total > 100 ? total : total + 10).toFixed(2)}</span>
                </div>
              </div>

              {/* Customer Details Section */}
              <div className="border-t border-gray-200 pt-4 mb-6">
                <h3 className="font-semibold mb-2">Customer Details</h3>
                <p className="text-sm text-gray-700">
                  {customerDetails.firstName} {customerDetails.lastName}
                </p>
                <p className="text-sm text-gray-700">{customerDetails.email}</p>
                <p className="text-sm text-gray-700">
                  {customerDetails.address}, {customerDetails.city},{" "}
                  {customerDetails.zipCode}
                </p>
              </div>

              <div className="mt-8">
                <button
                  onClick={handleFinishOrder}
                  className="w-full bg-primary-600 text-white py-3 rounded-md hover:bg-primary-700 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

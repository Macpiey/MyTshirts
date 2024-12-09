import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Loader } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { dispatch } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [redirectCountdown, setRedirectCountdown] = useState(5);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      dispatch({ type: "AUTH_START" });

      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        {
          firstname: formData.firstName,
          lastname: formData.lastName,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { message, userId } = response.data;

      if (userId) {
        dispatch({
          type: "AUTH_SUCCESS",
          payload: { jwtToken: "" }, // Empty token for now
        });

        setSuccess(`${message} Redirecting in 5 seconds...`);
        setRedirectCountdown(5); // Reset countdown
      } else {
        throw new Error("Invalid response: Missing userId.");
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        "Registration failed. Please try again later.";
      setError(errorMessage);
      dispatch({ type: "AUTH_FAILURE", payload: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (success) {
      timer = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer!); // Stop the interval
            navigate("/login"); // Redirect
          }
          return prev - 1;
        });
      }, 1000);
    }

    // Cleanup function for the interval
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [success, navigate]);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Create Account
      </h2>

      {success && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md text-sm">
          {success} ({redirectCountdown} seconds remaining)
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="block w-full py-2 border border-gray-300 rounded-md"
              placeholder="First name"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="block w-full py-2 border border-gray-300 rounded-md"
              placeholder="Last name"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="block w-full py-2 border border-gray-300 rounded-md"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="block w-full py-2 border border-gray-300 rounded-md"
            placeholder="Create a password"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-primary-600 text-white rounded-md"
        >
          {loading ? <Loader className="animate-spin" /> : "Create Account"}
        </button>
      </form>
    </div>
  );
}

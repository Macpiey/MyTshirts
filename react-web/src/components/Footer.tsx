// src/components/Footer.tsx
import React from "react";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-center space-y-8 sm:space-y-0 sm:space-x-12">
          {/* About Us */}
          <div className="flex-1">
            <h4 className="text-lg font-semibold mb-4">About Us</h4>
            <p className="text-sm text-gray-200">
              MyTshirt Inc. brings you premium quality apparel tailored to your
              unique style. Explore our wide range of products.
            </p>
          </div>

          {/* Contact Us */}
          <div className="flex-1">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-sm text-gray-200">Email: support@mytshirt.com</p>
            <p className="text-sm text-gray-200">Phone: +1-800-555-0199</p>
          </div>

          {/* Social Media */}
          <div className="flex-1">
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex justify-center space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-primary-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-primary-300"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-primary-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="mailto:support@mytshirt.com"
                className="text-gray-200 hover:text-primary-300"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} MyTshirt Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

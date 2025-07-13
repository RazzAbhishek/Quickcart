
import  { useState } from 'react';
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';
import { TbBrandMeta } from 'react-icons/tb';
import { FiPhoneCall } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) return setMessage("Please enter a valid email.");

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/subscribe`, {
        email,
      });
      setMessage(res.data.message || "Subscribed successfully!");
      setEmail('');
    } catch (error) {
      setMessage(
        error?.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <footer className="border-t py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Newsletter</h3>
          <p className="text-gray-500 mb-4">Be the first to hear about new products,</p>
          <p className="text-gray-500 mb-4">exclusive events, and online offers.</p>
          <p className="font-medium text-sm text-gray-600 mb-6">
            Sign up and get 10% off your first order.
          </p>

          {/* Newsletter Form */}
          <form onSubmit={handleSubscribe} className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="p-3 w-full text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
              required
            />
            <button
              type="submit"
              className="bg-black text-white py-3 px-6 text-sm rounded-r-md hover:bg-gray-800 transition-all"
            >
              Subscribe
            </button>
          </form>
          {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
          <ul className="space-y-2 text-gray-600">
            <li><Link to="#" className="hover:text-gray-500">Men's Top wear</Link></li>
            <li><Link to="#" className="hover:text-gray-500">Women's Top wear</Link></li>
            <li><Link to="#" className="hover:text-gray-500">Men's Bottom wear</Link></li>
            <li><Link to="#" className="hover:text-gray-500">Women's Bottom wear</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Support</h3>
          <ul className="space-y-2 text-gray-600">
            <li><Link to="#" className="hover:text-gray-500">Contact Us</Link></li>
            <li><Link to="#" className="hover:text-gray-500">About Us</Link></li>
            <li><Link to="#" className="hover:text-gray-500">FAQs</Link></li>
            <li><Link to="#" className="hover:text-gray-500">Features</Link></li>
          </ul>
        </div>

        {/* Social + Contact */}
        <div>
          <h3 className="text-lg text-gray-800">Follow Us</h3>
          <div className="flex items-center space-x-4 mb-6">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
              <TbBrandMeta className="h-5 w-6" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
              <IoLogoInstagram className="h-5 w-6" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
              <RiTwitterXLine className="h-4 w-4" />
            </a>
          </div>
          <p className="text-gray-500">Call Us</p>
          <p>
            <FiPhoneCall className="inline-block mr-2" />
            0123-456-789
          </p>
          <p className="text-gray-500 text-sm mb-4">
            © 2023 Quickcart Clothing. All rights reserved.
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
        <p className="text-gray-500 tracking-tighter text-center">
          @ 2025, compileTab. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

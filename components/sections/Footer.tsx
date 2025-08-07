'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Facebook, 
  Instagram, 
  Twitter,
  ChevronUp,
  Send
} from 'lucide-react';

export function Footer() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Restaurant Info */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-playfair font-bold text-gradient mb-4">
              Bella Vista
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Experience culinary excellence in the heart of the city. 
              Where every meal is a celebration of fine dining.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Twitter, href: '#' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="bg-gray-800 p-3 rounded-full hover:bg-yellow-500 hover:text-black transition-all duration-300"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xl font-semibold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">
                  123 Gourmet Street<br />
                  Culinary District<br />
                  New York, NY 10001
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300">info@bellavista.com</span>
              </div>
            </div>
          </motion.div>

          {/* Opening Hours */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xl font-semibold mb-6 flex items-center">
              <Clock className="w-5 h-5 text-yellow-400 mr-2" />
              Opening Hours
            </h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex justify-between">
                <span>Monday - Thursday</span>
                <span className="text-yellow-400">5:00 PM - 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Friday - Saturday</span>
                <span className="text-yellow-400">5:00 PM - 11:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="text-yellow-400">5:00 PM - 9:00 PM</span>
              </div>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-xl font-semibold mb-6">Newsletter</h4>
            <p className="text-gray-300 mb-4">
              Subscribe to receive updates about special events and seasonal menus.
            </p>
            
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-200"
                  required
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Send size={18} />
                <span>{isSubscribed ? 'Subscribed!' : 'Subscribe'}</span>
              </motion.button>
            </form>

            {isSubscribed && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-400 text-sm mt-2 text-center"
              >
                Thank you for subscribing!
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Bella Vista Restaurant. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                Terms of Service
              </a>
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                className="bg-gray-800 p-2 rounded-full hover:bg-yellow-500 hover:text-black transition-all duration-300"
              >
                <ChevronUp size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
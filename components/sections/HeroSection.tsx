'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export function HeroSection() {
  const [currentText, setCurrentText] = useState(0);
  const texts = ['Exquisite Cuisine', 'Unforgettable Experience', 'Culinary Excellence'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [texts.length]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 z-10"></div>
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold mb-6">
            Welcome to{' '}
            <span className="text-gradient block">Bella Vista</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-8"
        >
          <p className="text-xl md:text-2xl mb-4">Where every meal is a celebration of</p>
          <div className="h-12 flex items-center justify-center">
            <motion.span
              key={currentText}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-semibold text-yellow-400"
            >
              {texts[currentText]}
            </motion.span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('reservations')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-full transition-all duration-300 inline-block w-full sm:w-auto"
          >
            Reserve Your Table
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-white hover:bg-white hover:text-black text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 inline-block w-full sm:w-auto"
          >
            View Menu
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.button
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          onClick={scrollToAbout}
          className="text-white hover:text-yellow-400 transition-colors duration-300"
        >
          <ChevronDown size={32} />
        </motion.button>
      </motion.div>
    </section>
  );
}
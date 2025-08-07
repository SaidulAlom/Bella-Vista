'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Award } from 'lucide-react';

const staticTestimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Food Critic',
    content: 'Bella Vista delivers an exceptional dining experience that surpasses expectations. The attention to detail in every dish is remarkable.',
    rating: 5,
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Culinary Enthusiast',
    content: 'From the moment you walk in, you know you are in for something special. The service is impeccable and the food is extraordinary.',
    rating: 5,
    image: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Business Executive',
    content: 'Perfect for both intimate dinners and business meetings. The ambiance is sophisticated and the cuisine is world-class.',
    rating: 5,
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  },
];

const awards = [
  {
    title: 'Michelin Stars',
    count: '2',
    description: 'Excellence in Dining',
  },
  {
    title: 'James Beard Award',
    count: '1',
    description: 'Outstanding Restaurant',
  },
  {
    title: 'Wine Spectator',
    count: 'Grand',
    description: 'Award of Excellence',
  },
  {
    title: 'AAA Five Diamond',
    count: '5',
    description: 'Premium Rating',
  },
];

export function TestimonialsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [testimonials, setTestimonials] = useState(staticTestimonials);

  useEffect(() => {
    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data.map(t => ({
            ...t,
            // fallback for missing fields
            name: t.name || 'Anonymous',
            content: t.comment || t.content || '',
            rating: t.rating || 5,
            image: t.image || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
            role: t.role || '',
          })));
        }
      })
      .catch(() => {
        // fallback to staticTestimonials
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };
  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Awards Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
            Awards & Recognition
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Our commitment to culinary excellence has been recognized by the industry's most prestigious organizations.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg shimmer"
                >
                  <Award className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">{award.title}</h3>
                <div className="text-2xl font-bold text-yellow-600 mb-1">{award.count}</div>
                <p className="text-sm text-gray-600">{award.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
            What Our Guests Say
          </h2>
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
              {/* Background Decoration */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-100 rounded-full -translate-x-16 -translate-y-16 opacity-50" />
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-yellow-100 rounded-full translate-x-12 translate-y-12 opacity-50" />
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                {/* Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                {/* Quote */}
                <blockquote className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed mb-8 italic">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                {/* Author */}
                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-lg text-gray-900">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-gray-600">
                      {testimonials[currentTestimonial].role}
                    </div>
                  </div>
                </div>
              </motion.div>
              {/* Navigation Arrows */}
              <button
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-yellow-50 transition-colors duration-200"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-yellow-50 transition-colors duration-200"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-yellow-500 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Clock, Users } from 'lucide-react';

const timeline = [
  { year: '1985', event: 'Bella Vista opens its doors' },
  { year: '1992', event: 'First Michelin star awarded' },
  { year: '2005', event: 'Second Michelin star achieved' },
  { year: '2018', event: 'Restaurant renovation completed' },
];

const stats = [
  { icon: Award, value: '2', label: 'Michelin Stars' },
  { icon: Clock, value: '38', label: 'Years of Excellence' },
  { icon: Users, value: '500K+', label: 'Happy Guests' },
];

export function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
            Our Story
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            For nearly four decades, Bella Vista has been a cornerstone of culinary excellence, 
            combining traditional techniques with innovative flavors to create unforgettable dining experiences.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Story Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl font-playfair font-bold text-gray-900 mb-6">
              A Legacy of Excellence
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Founded by Chef Alessandro Rossi in 1985, Bella Vista began as a small family restaurant 
              with a simple vision: to serve authentic, high-quality cuisine that brings people together. 
              Today, we continue that tradition with the same passion and dedication.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our commitment to using only the finest ingredients, sourced locally and seasonally, 
              combined with innovative culinary techniques, has earned us recognition from critics 
              and diners alike.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Chef's Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="https://images.pexels.com/photos/887827/pexels-photo-887827.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Chef Alessandro Rossi"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="text-xl font-semibold">Chef Alessandro Rossi</h4>
                <p className="text-sm opacity-90">Executive Chef & Founder</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <h3 className="text-3xl font-playfair font-bold text-gray-900 mb-12">
            Our Journey
          </h3>
          <div className="grid md:grid-cols-4 gap-8">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="relative"
              >
                <div className="bg-yellow-500 text-black font-bold text-xl py-2 px-4 rounded-full inline-block mb-4">
                  {item.year}
                </div>
                <p className="text-gray-600 font-medium">{item.event}</p>
                {index < timeline.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-yellow-300 transform -translate-y-1/2"></div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
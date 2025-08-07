'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Calendar, Clock, Users, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';

interface ReservationForm {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  requests: string;
}

export function ReservationSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReservationForm>();

  const onSubmit = async (data: ReservationForm) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Reservation data:', data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();

    // Reset success state after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const timeSlots = [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', 
    '20:00', '20:30', '21:00', '21:30', '22:00'
  ];

  return (
    <section id="reservations" className="py-20 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6">
            Make a Reservation
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Reserve your table for an unforgettable dining experience. 
            We look forward to welcoming you to Bella Vista.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Reservation Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Reservation Confirmed!</h3>
                  <p className="text-gray-600">
                    Thank you for your reservation. We'll send a confirmation email shortly.
                  </p>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Book Your Table</h3>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name and Email */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          {...register('name', { required: 'Name is required' })}
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-200"
                          placeholder="Your full name"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          {...register('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address'
                            }
                          })}
                          type="email"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-200"
                          placeholder="your@email.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        {...register('phone', { required: 'Phone number is required' })}
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-200"
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>

                    {/* Date, Time, and Guests */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="inline w-4 h-4 mr-1" />
                          Date *
                        </label>
                        <input
                          {...register('date', { required: 'Date is required' })}
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-200"
                        />
                        {errors.date && (
                          <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Clock className="inline w-4 h-4 mr-1" />
                          Time *
                        </label>
                        <select
                          {...register('time', { required: 'Time is required' })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-200"
                        >
                          <option value="">Select time</option>
                          {timeSlots.map(time => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                        {errors.time && (
                          <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Users className="inline w-4 h-4 mr-1" />
                          Guests *
                        </label>
                        <select
                          {...register('guests', { 
                            required: 'Number of guests is required',
                            min: { value: 1, message: 'At least 1 guest required' }
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-200"
                        >
                          <option value="">Guests</option>
                          {[1,2,3,4,5,6,7,8].map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                          ))}
                        </select>
                        {errors.guests && (
                          <p className="text-red-500 text-sm mt-1">{errors.guests.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Requests
                      </label>
                      <textarea
                        {...register('requests')}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                        placeholder="Dietary restrictions, seating preferences, special occasions..."
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-black font-semibold py-4 rounded-lg transition-all duration-300 flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        'Confirm Reservation'
                      )}
                    </motion.button>
                  </form>
                </>
              )}
            </div>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Contact Info */}
            <div className="bg-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span>123 Gourmet Street, Culinary District, New York, NY 10001</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="w-5 h-5 text-yellow-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="w-5 h-5 text-yellow-400" />
                  <span>reservations@bellavista.com</span>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold text-white mb-4">Opening Hours</h4>
                <div className="space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>Monday - Thursday</span>
                    <span>5:00 PM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Friday - Saturday</span>
                    <span>5:00 PM - 11:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>5:00 PM - 9:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <MapPin className="w-12 h-12 mx-auto mb-2" />
                <p>Interactive Map</p>
                <p className="text-sm">Google Maps integration would go here</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { Leaf, Flame, Wheat } from 'lucide-react';

const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Beverages'];

const staticMenuItems = [
  {
    id: 1,
    name: 'Pan-Seared Scallops',
    description: 'Fresh scallops with cauliflower puree and crispy pancetta',
    price: 28,
    category: 'Starters',
    image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    tags: ['gluten-free'],
  },
  {
    id: 2,
    name: 'Truffle Risotto',
    description: 'Creamy arborio rice with black truffle and aged parmesan',
    price: 32,
    category: 'Mains',
    image: 'https://images.pexels.com/photos/3762075/pexels-photo-3762075.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    tags: ['vegetarian'],
  },
  {
    id: 3,
    name: 'Wagyu Beef Tenderloin',
    description: 'Premium wagyu with roasted vegetables and red wine jus',
    price: 65,
    category: 'Mains',
    image: 'https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    tags: ['premium'],
  },
  {
    id: 4,
    name: 'Chocolate Soufflé',
    description: 'Rich dark chocolate soufflé with vanilla bean ice cream',
    price: 16,
    category: 'Desserts',
    image: 'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    tags: ['vegetarian'],
  },
  {
    id: 5,
    name: 'Burrata Caprese',
    description: 'Fresh burrata with heirloom tomatoes and basil oil',
    price: 22,
    category: 'Starters',
    image: 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    tags: ['vegetarian', 'gluten-free'],
  },
  {
    id: 6,
    name: 'Sommelier Selection Wine',
    description: 'Curated wine pairing selected by our expert sommelier',
    price: 18,
    category: 'Beverages',
    image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    tags: ['premium'],
  },
];

const tagIcons = {
  vegetarian: Leaf,
  'gluten-free': Wheat,
  spicy: Flame,
  premium: null,
};

export function MenuSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState('All');
  const [menuItems, setMenuItems] = useState(staticMenuItems);

  useEffect(() => {
    fetch('/api/menu')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setMenuItems(data.map(item => ({
            ...item,
            tags: item.tags || [],
            image: item.image || staticMenuItems[0].image,
          })));
        }
      })
      .catch(() => {
        // fallback to staticMenuItems
      });
  }, []);

  const filteredItems = activeCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6">
            Our Menu
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our carefully crafted dishes, made with the finest ingredients
            and prepared with passion by our award-winning culinary team.
          </p>
        </motion.div>
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-yellow-500 text-black'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
        {/* Menu Items */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item._id ? String(item._id) : String(item.id)}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative overflow-hidden group">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Tags */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {item.tags.map((tag: string) => {
                    const Icon = tagIcons[tag as keyof typeof tagIcons];
                    return (
                      <div
                        key={tag}
                        className="bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1"
                      >
                        {Icon && <Icon size={12} />}
                        {tag}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                  <span className="text-yellow-400 font-bold text-lg">${item.price}</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-6">
            Want to see our full menu with seasonal specialties?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-full transition-all duration-300"
          >
            Download Full Menu
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
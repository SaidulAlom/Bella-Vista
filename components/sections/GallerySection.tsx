'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const staticGalleryImages = [
  {
    id: 1,
    src: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    alt: 'Elegant dining room',
    category: 'ambiance',
  },
  {
    id: 2,
    src: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    alt: 'Signature dish preparation',
    category: 'food',
  },
  {
    id: 3,
    src: 'https://images.pexels.com/photos/2467287/pexels-photo-2467287.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    alt: 'Wine cellar',
    category: 'ambiance',
  },
  {
    id: 4,
    src: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    alt: 'Fresh ingredients',
    category: 'food',
  },
  {
    id: 5,
    src: 'https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    alt: 'Private dining area',
    category: 'ambiance',
  },
  {
    id: 6,
    src: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    alt: 'Artisanal dessert',
    category: 'food',
  },
];

export function GallerySection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [galleryImages, setGalleryImages] = useState(staticGalleryImages);
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setGalleryImages(data.map(img => ({
            ...img,
            src: img.url || img.src,
            alt: img.alt || '',
            id: img._id || img.id,
          })));
        }
      })
      .catch(() => {
        // fallback to staticGalleryImages
      });
  }, []);

  const openLightbox = (imageId: number) => {
    setLightboxImage(imageId);
  };
  const closeLightbox = () => {
    setLightboxImage(null);
  };
  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (lightboxImage === null) return;
    const currentIndex = galleryImages.findIndex(img => img.id === lightboxImage);
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1;
    } else {
      newIndex = currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0;
    }
    setLightboxImage(galleryImages[newIndex].id);
  };
  const currentImage = lightboxImage ? galleryImages.find(img => img.id === lightboxImage) : null;

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
            Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take a visual journey through our restaurant, from our elegant dining spaces
            to the artistry of our culinary creations.
          </p>
        </motion.div>
        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`relative overflow-hidden rounded-2xl shadow-lg cursor-pointer group ${
                index % 3 === 0 ? 'md:row-span-2' : ''
              }`}
              onClick={() => openLightbox(image.id)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={`w-full object-cover transition-transform duration-300 group-hover:scale-110 ${
                  index % 3 === 0 ? 'h-96' : 'h-64'
                }`}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium">View Image</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Lightbox */}
      {lightboxImage && currentImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full">
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              src={currentImage.src}
              alt={currentImage.alt}
              className="w-full h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-yellow-400 transition-colors duration-200"
            >
              <X size={32} />
            </button>
            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox('prev');
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-yellow-400 transition-colors duration-200"
            >
              <ChevronLeft size={40} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox('next');
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-yellow-400 transition-colors duration-200"
            >
              <ChevronRight size={40} />
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
}
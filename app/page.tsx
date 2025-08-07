'use client';

import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { MenuSection } from '@/components/sections/MenuSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { ReservationSection } from '@/components/sections/ReservationSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { Footer } from '@/components/sections/Footer';
import { Navigation } from '@/components/Navigation';

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <GallerySection />
      <ReservationSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
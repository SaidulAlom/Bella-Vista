import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Bella Vista - Fine Dining Restaurant',
  description: 'Experience exquisite cuisine and elegant dining at Bella Vista. Reserve your table for an unforgettable culinary journey.',
  keywords: 'restaurant, fine dining, cuisine, reservations, food, bella vista',
  authors: [{ name: 'Bella Vista Restaurant' }],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'Bella Vista - Fine Dining Restaurant',
    description: 'Experience exquisite cuisine and elegant dining at Bella Vista.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
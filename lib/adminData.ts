// Mock data management for admin panel
// Simulates backend operations with localStorage persistence

export interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  available: boolean;
}

export interface Reservation {
  id: number;
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface GalleryItem {
  id: number;
  title: string;
  url: string;
  alt: string;
}

export interface Testimonial {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

// Initial mock data
const initialMenuItems: MenuItem[] = [
  { id: 1, name: 'Grilled Salmon', category: 'Main Course', price: 28.99, description: 'Fresh Atlantic salmon with herbs', available: true },
  { id: 2, name: 'Caesar Salad', category: 'Appetizer', price: 12.99, description: 'Classic Caesar with parmesan', available: true },
  { id: 3, name: 'Beef Tenderloin', category: 'Main Course', price: 34.99, description: 'Premium cut with red wine sauce', available: false },
];

const initialReservations: Reservation[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', date: '2024-01-15', time: '19:00', guests: 4, status: 'confirmed' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', date: '2024-01-16', time: '20:00', guests: 2, status: 'pending' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', date: '2024-01-17', time: '18:30', guests: 6, status: 'confirmed' },
];

const initialGallery: GalleryItem[] = [
  { id: 1, title: 'Restaurant Interior', url: '/api/placeholder/400/300', alt: 'Restaurant interior view' },
  { id: 2, title: 'Chef Special', url: '/api/placeholder/400/300', alt: 'Chef preparing special dish' },
  { id: 3, title: 'Dining Area', url: '/api/placeholder/400/300', alt: 'Elegant dining area' },
];

const initialTestimonials: Testimonial[] = [
  { id: 1, name: 'Sarah Wilson', rating: 5, comment: 'Amazing food and service!', date: '2024-01-10' },
  { id: 2, name: 'David Brown', rating: 4, comment: 'Great atmosphere and delicious food.', date: '2024-01-08' },
  { id: 3, name: 'Emily Davis', rating: 5, comment: 'Best restaurant in town!', date: '2024-01-05' },
];

// Helper function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generic localStorage functions
const getFromStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const setToStorage = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

// Menu Items API
export const menuAPI = {
  async getAll(): Promise<MenuItem[]> {
    await delay(300);
    return getFromStorage('admin_menu_items', initialMenuItems);
  },

  async create(item: Omit<MenuItem, 'id'>): Promise<MenuItem> {
    await delay(500);
    const items = await this.getAll();
    const newItem = { ...item, id: Date.now() };
    const updatedItems = [...items, newItem];
    setToStorage('admin_menu_items', updatedItems);
    return newItem;
  },

  async update(id: number, updates: Partial<MenuItem>): Promise<MenuItem> {
    await delay(400);
    const items = await this.getAll();
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    );
    setToStorage('admin_menu_items', updatedItems);
    const updatedItem = updatedItems.find(item => item.id === id);
    if (!updatedItem) throw new Error('Item not found');
    return updatedItem;
  },

  async delete(id: number): Promise<void> {
    await delay(300);
    const items = await this.getAll();
    const filteredItems = items.filter(item => item.id !== id);
    setToStorage('admin_menu_items', filteredItems);
  }
};

// Reservations API
export const reservationsAPI = {
  async getAll(): Promise<Reservation[]> {
    await delay(300);
    return getFromStorage('admin_reservations', initialReservations);
  },

  async create(reservation: Omit<Reservation, 'id'>): Promise<Reservation> {
    await delay(500);
    const reservations = await this.getAll();
    const newReservation = { ...reservation, id: Date.now() };
    const updatedReservations = [...reservations, newReservation];
    setToStorage('admin_reservations', updatedReservations);
    return newReservation;
  },

  async update(id: number, updates: Partial<Reservation>): Promise<Reservation> {
    await delay(400);
    const reservations = await this.getAll();
    const updatedReservations = reservations.map(reservation => 
      reservation.id === id ? { ...reservation, ...updates } : reservation
    );
    setToStorage('admin_reservations', updatedReservations);
    const updatedReservation = updatedReservations.find(reservation => reservation.id === id);
    if (!updatedReservation) throw new Error('Reservation not found');
    return updatedReservation;
  },

  async delete(id: number): Promise<void> {
    await delay(300);
    const reservations = await this.getAll();
    const filteredReservations = reservations.filter(reservation => reservation.id !== id);
    setToStorage('admin_reservations', filteredReservations);
  }
};

// Gallery API
export const galleryAPI = {
  async getAll(): Promise<GalleryItem[]> {
    await delay(300);
    return getFromStorage('admin_gallery', initialGallery);
  },

  async create(item: Omit<GalleryItem, 'id'>): Promise<GalleryItem> {
    await delay(500);
    const items = await this.getAll();
    const newItem = { ...item, id: Date.now() };
    const updatedItems = [...items, newItem];
    setToStorage('admin_gallery', updatedItems);
    return newItem;
  },

  async update(id: number, updates: Partial<GalleryItem>): Promise<GalleryItem> {
    await delay(400);
    const items = await this.getAll();
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    );
    setToStorage('admin_gallery', updatedItems);
    const updatedItem = updatedItems.find(item => item.id === id);
    if (!updatedItem) throw new Error('Item not found');
    return updatedItem;
  },

  async delete(id: number): Promise<void> {
    await delay(300);
    const items = await this.getAll();
    const filteredItems = items.filter(item => item.id !== id);
    setToStorage('admin_gallery', filteredItems);
  }
};

// Testimonials API
export const testimonialsAPI = {
  async getAll(): Promise<Testimonial[]> {
    await delay(300);
    return getFromStorage('admin_testimonials', initialTestimonials);
  },

  async create(testimonial: Omit<Testimonial, 'id' | 'date'>): Promise<Testimonial> {
    await delay(500);
    const testimonials = await this.getAll();
    const newTestimonial = { 
      ...testimonial, 
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    };
    const updatedTestimonials = [...testimonials, newTestimonial];
    setToStorage('admin_testimonials', updatedTestimonials);
    return newTestimonial;
  },

  async update(id: number, updates: Partial<Testimonial>): Promise<Testimonial> {
    await delay(400);
    const testimonials = await this.getAll();
    const updatedTestimonials = testimonials.map(testimonial => 
      testimonial.id === id ? { ...testimonial, ...updates } : testimonial
    );
    setToStorage('admin_testimonials', updatedTestimonials);
    const updatedTestimonial = updatedTestimonials.find(testimonial => testimonial.id === id);
    if (!updatedTestimonial) throw new Error('Testimonial not found');
    return updatedTestimonial;
  },

  async delete(id: number): Promise<void> {
    await delay(300);
    const testimonials = await this.getAll();
    const filteredTestimonials = testimonials.filter(testimonial => testimonial.id !== id);
    setToStorage('admin_testimonials', filteredTestimonials);
  }
};

// Dashboard statistics
export const getDashboardStats = async () => {
  const [menuItems, reservations, gallery, testimonials] = await Promise.all([
    menuAPI.getAll(),
    reservationsAPI.getAll(),
    galleryAPI.getAll(),
    testimonialsAPI.getAll()
  ]);

  const pendingReservations = reservations.filter(r => r.status === 'pending').length;
  const totalRevenue = menuItems.reduce((sum, item) => sum + item.price, 0) * 10; // Mock calculation

  return {
    totalReservations: reservations.length,
    pendingReservations,
    totalRevenue: Math.round(totalRevenue),
    menuItems: menuItems.length,
    galleryImages: gallery.length,
    testimonials: testimonials.length
  };
};

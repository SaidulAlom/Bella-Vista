"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Users, 
  Calendar, 
  Utensils, 
  Image, 
  MessageSquare, 
  Plus, 
  Edit, 
  Trash2,
  DollarSign,
  TrendingUp,
  LogOut
} from 'lucide-react';

const sections = [
  { key: 'dashboard', label: 'Dashboard', icon: TrendingUp },
  { key: 'menu', label: 'Menu', icon: Utensils },
  { key: 'reservations', label: 'Reservations', icon: Calendar },
  { key: 'gallery', label: 'Gallery', icon: Image },
  { key: 'testimonials', label: 'Testimonials', icon: MessageSquare },
];

function AdminPage() {
  const { userEmail, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [stats, setStats] = useState({
    totalReservations: 0,
    pendingReservations: 0,
    totalRevenue: 0,
    menuItems: 0,
    galleryImages: 0,
    testimonials: 0
  });
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Fetch all data from API endpoints
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [menuRes, reservationsRes, galleryRes, testimonialsRes] = await Promise.all([
          fetch('/api/menu'),
          fetch('/api/reservations'),
          fetch('/api/gallery'),
          fetch('/api/testimonials'),
        ]);
        const [menuData, reservationsData, galleryData, testimonialsData] = await Promise.all([
          menuRes.json(),
          reservationsRes.json(),
          galleryRes.json(),
          testimonialsRes.json(),
        ]);
        setMenuItems(menuData);
        setReservations(reservationsData);
        setGallery(galleryData);
        setTestimonials(testimonialsData);
        setStats({
          totalReservations: reservationsData.length,
          pendingReservations: reservationsData.filter((r: any) => r.status === 'pending').length,
          totalRevenue: menuData.reduce((sum: number, item: any) => sum + (item.price || 0), 0) * 10,
          menuItems: menuData.length,
          galleryImages: galleryData.length,
          testimonials: testimonialsData.length
        });
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <Button
            size="sm"
            variant="secondary"
            onClick={logout}
            className="flex items-center"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
        <div className="text-sm text-gray-300 mb-4">
          Logged in as: {userEmail}
        </div>
        <nav className="flex flex-col gap-2">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.key}
                className={`text-left px-4 py-3 rounded-lg hover:bg-gray-700 flex items-center gap-3 ${activeSection === section.key ? 'bg-gray-700' : ''}`}
                onClick={() => setActiveSection(section.key)}
              >
                <Icon size={20} />
                {section.label}
              </button>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading admin data...</p>
            </div>
          </div>
        ) : (
          <>
            {activeSection === 'dashboard' && (
              <Dashboard
                stats={stats}
                reservations={reservations}
                setActiveSection={setActiveSection}
              />
            )}
            {activeSection === 'menu' && <MenuManager menuItems={menuItems} setMenuItems={setMenuItems} />}
            {activeSection === 'reservations' && <ReservationsManager reservations={reservations} setReservations={setReservations} />}
            {activeSection === 'gallery' && <GalleryManager gallery={gallery} setGallery={setGallery} />}
            {activeSection === 'testimonials' && <TestimonialsManager testimonials={testimonials} setTestimonials={setTestimonials} />}
          </>
        )}
      </main>
    </div>
  );
}

function Dashboard({ stats, reservations, setActiveSection }: { stats: any, reservations: any[], setActiveSection: (section: string) => void }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reservations</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReservations}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reservations</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReservations}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Menu Items</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.menuItems}</div>
            <p className="text-xs text-muted-foreground">Active items</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Reservations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reservations.slice(0, 3).map((reservation) => (
                <div key={reservation._id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{reservation.name}</p>
                    <p className="text-sm text-muted-foreground">{reservation.date} at {reservation.time}</p>
                  </div>
                  <Badge variant={reservation.status === 'confirmed' ? 'default' : 'secondary'}>
                    {reservation.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full" onClick={() => setActiveSection('reservations')}>
                View All Reservations
              </Button>
              <Button className="w-full" variant="outline" onClick={() => setActiveSection('menu')}>
                Manage Menu
              </Button>
              <Button className="w-full" variant="outline" onClick={() => setActiveSection('gallery')}>
                Update Gallery
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MenuManager({ menuItems, setMenuItems }: { menuItems: any[], setMenuItems: React.Dispatch<React.SetStateAction<any[]>> }) {
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', category: '', price: '', description: '', available: true });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editingItem) {
        const updatedItem = await fetch(`/api/menu/${editingItem._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            price: parseFloat(formData.price)
          }),
        });
        const updatedData = await updatedItem.json();
        setMenuItems(menuItems.map(item => item._id === editingItem._id ? updatedData : item));
        setEditingItem(null);
      } else {
        const newItem = await fetch('/api/menu', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            price: parseFloat(formData.price)
          }),
        });
        const newData = await newItem.json();
        setMenuItems([...menuItems, newData]);
      }
      setFormData({ name: '', category: '', price: '', description: '', available: true });
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to save menu item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData(item);
    setShowAddForm(true);
  };

  const handleDelete = async (_id: string) => {
    try {
      await fetch(`/api/menu/${_id}`, { method: 'DELETE' });
      setMenuItems(menuItems.filter(item => item._id !== _id));
    } catch (error) {
      console.error('Failed to delete menu item:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Menu Management</h1>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Menu Item
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Price</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.available}
                    onChange={(e) => setFormData({...formData, available: e.target.checked})}
                  />
                  <label className="text-sm font-medium">Available</label>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : (editingItem ? 'Update' : 'Add') + ' Item'}
                </Button>
                <Button type="button" variant="outline" onClick={() => {
                  setShowAddForm(false);
                  setEditingItem(null);
                  setFormData({ name: '', category: '', price: '', description: '', available: true });
                }}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {menuItems.map((item) => (
          <Card key={item._id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <Badge variant={item.available ? 'default' : 'secondary'}>
                      {item.available ? 'Available' : 'Unavailable'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{item.category}</p>
                  <p className="text-sm mt-2">{item.description}</p>
                  <p className="text-lg font-bold text-green-600 mt-2">${item.price}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(item._id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ReservationsManager({ reservations, setReservations }: { reservations: any[], setReservations: React.Dispatch<React.SetStateAction<any[]>> }) {
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  const filteredReservations = reservations.filter(reservation => {
    if (filter === 'all') return true;
    return reservation.status === filter;
  });

  const handleStatusChange = async (_id: string, newStatus: 'confirmed' | 'cancelled') => {
    setLoading(true);
    try {
      const updatedReservation = await fetch(`/api/reservations/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const updatedData = await updatedReservation.json();
      setReservations(reservations.map(reservation =>
        reservation._id === _id ? updatedData : reservation
      ));
    } catch (error) {
      console.error('Failed to update reservation status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (_id: string) => {
    try {
      await fetch(`/api/reservations/${_id}`, { method: 'DELETE' });
      setReservations(reservations.filter(reservation => reservation._id !== _id));
    } catch (error) {
      console.error('Failed to delete reservation:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reservations</h1>
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'confirmed' ? 'default' : 'outline'}
            onClick={() => setFilter('confirmed')}
          >
            Confirmed
          </Button>
          <Button
            variant={filter === 'pending' ? 'default' : 'outline'}
            onClick={() => setFilter('pending')}
          >
            Pending
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredReservations.map((reservation) => (
          <Card key={reservation._id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{reservation.name}</h3>
                    <Badge variant={reservation.status === 'confirmed' ? 'default' : 'secondary'}>
                      {reservation.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{reservation.email}</p>
                  <p className="text-sm mt-2">
                    {reservation.date} at {reservation.time} • {reservation.guests} guests
                  </p>
                </div>
                <div className="flex gap-2">
                  {reservation.status === 'pending' && (
                    <Button 
                      size="sm" 
                      onClick={() => handleStatusChange(reservation._id, 'confirmed')}
                      disabled={loading}
                    >
                      {loading ? 'Updating...' : 'Confirm'}
                    </Button>
                  )}
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(reservation._id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function GalleryManager({ gallery, setGallery }: { gallery: any[], setGallery: React.Dispatch<React.SetStateAction<any[]>> }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: '', url: '', alt: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const newItem = await fetch('/api/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const newData = await newItem.json();
      setGallery([...gallery, newData]);
      setFormData({ title: '', url: '', alt: '' });
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to add gallery item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (_id: string) => {
    try {
      await fetch(`/api/gallery/${_id}`, { method: 'DELETE' });
      setGallery(gallery.filter(item => item._id !== _id));
    } catch (error) {
      console.error('Failed to delete gallery item:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gallery Management</h1>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Image
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Image</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Image URL</label>
                <Input
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Alt Text</label>
                <Input
                  value={formData.alt}
                  onChange={(e) => setFormData({...formData, alt: e.target.value})}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Adding...' : 'Add Image'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((item) => (
          <Card key={item._id}>
            <CardContent className="p-4">
              <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-500">Image Preview</span>
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{item.alt}</p>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(item._id)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function TestimonialsManager({ testimonials, setTestimonials }: { testimonials: any[], setTestimonials: React.Dispatch<React.SetStateAction<any[]>> }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', rating: 5, comment: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const newTestimonial = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const newData = await newTestimonial.json();
      setTestimonials([...testimonials, newData]);
      setFormData({ name: '', rating: 5, comment: '' });
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to add testimonial:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (_id: string) => {
    try {
      await fetch(`/api/testimonials/${_id}`, { method: 'DELETE' });
      setTestimonials(testimonials.filter(item => item._id !== _id));
    } catch (error) {
      console.error('Failed to delete testimonial:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Testimonials</h1>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Testimonial</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Rating</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                  className="w-full p-2 border rounded-md"
                >
                  {[1, 2, 3, 4, 5].map(rating => (
                    <option key={rating} value={rating}>{rating} Star{rating > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Comment</label>
                <Textarea
                  value={formData.comment}
                  onChange={(e) => setFormData({...formData, comment: e.target.value})}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Adding...' : 'Add Testimonial'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial._id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{testimonial.date}</p>
                  <p className="text-gray-700">{testimonial.comment}</p>
                </div>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(testimonial._id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;

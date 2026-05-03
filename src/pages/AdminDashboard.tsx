import { useState, useEffect } from 'react';
import api from '../lib/api';
import { 
  Plus, Trash2, Edit2, LayoutDashboard, Utensils, 
  BarChart3, Package, Layers, Search, X, Check, Save 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function AdminDashboard() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: '',
    category: 'Burger'
  });

  const categories = ['All', 'Burger', 'Pizza', 'Pasta', 'Drinks', 'Dessert', 'Salad'];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await api.get('/food-items');
      setItems(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: parseFloat(formData.price as string),
    };

    try {
      if (editingItem) {
        await api.put(`/food-items/${editingItem.id}`, payload);
        alert('Item updated successfully!');
      } else {
        await api.post('/food-items', payload);
        alert('Item launched successfully!');
      }
      setIsModalOpen(false);
      resetForm();
      fetchItems();
    } catch (err: any) {
      alert('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this delicious item? This action is permanent.')) {
      try {
        await api.delete(`/food-items/${id}`);
        fetchItems();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: '', price: '', description: '', imageUrl: '', category: 'Burger' });
    setEditingItem(null);
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (categoryFilter === 'All' || item.category === categoryFilter)
  );

  const stats = [
    { label: 'Total Bites', value: items.length, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Categories', value: new Set(items.map(i => i.category)).size, icon: Layers, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Avg Price', value: items.length ? `$${(items.reduce((acc, curr) => acc + curr.price, 0) / items.length).toFixed(2)}` : '$0', icon: BarChart3, color: 'text-green-600', bg: 'bg-green-50' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-brand-dark tracking-tight mb-2">Backstage Portal</h1>
            <p className="text-gray-400 font-medium">Manage your menu and track your offerings.</p>
          </div>
          <button 
            onClick={() => { resetForm(); setIsModalOpen(true); }}
            className="flex items-center justify-center space-x-2 px-8 py-4 bg-brand-red text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-brand-red/20"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Item</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center space-x-6">
              <div className={cn("p-4 rounded-2xl", stat.bg, stat.color)}>
                <stat.icon className="w-8 h-8" />
              </div>
              <div>
                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
                <div className="text-3xl font-black text-brand-dark tracking-tighter">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search food items..."
              className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-red/10"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex overflow-x-auto pb-2 md:pb-0 space-x-2 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={cn(
                  "px-6 py-4 rounded-2xl font-bold whitespace-nowrap transition-all text-sm",
                  categoryFilter === cat 
                    ? "bg-brand-dark text-white shadow-lg" 
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid/Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-20">
          <AnimatePresence>
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-white animate-pulse rounded-3xl" />
              ))
            ) : filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col md:flex-row gap-6"
                >
                  <div className="w-full md:w-32 h-32 rounded-3xl overflow-hidden flex-shrink-0">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-red">{item.category}</span>
                        <div className="flex space-x-1">
                          <button 
                            onClick={() => { setEditingItem(item); setFormData(item); setIsModalOpen(true); }}
                            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-gray-400 hover:text-brand-red hover:bg-red-50 rounded-xl transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <h4 className="font-extrabold text-brand-dark mb-1 leading-tight">{item.name}</h4>
                      <div className="text-xl font-black text-brand-red tracking-tight">${item.price.toFixed(2)}</div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-200">
                <Utensils className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-400 font-bold">No results matching your selection</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black text-brand-dark tracking-tight">
                  {editingItem ? 'Refine Item' : 'New Creation'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-gray-100 rounded-full transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleCreateOrUpdate} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Food Name</label>
                    <input 
                      type="text" required
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-brand-red/10"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Price ($)</label>
                    <input 
                      type="number" step="0.01" required
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-brand-red/10"
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Category</label>
                  <select 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-brand-red/10"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Image URL</label>
                  <input 
                    type="url" required
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-brand-red/10"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.imageUrl}
                    onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Short Description</label>
                  <textarea 
                    rows={4} required
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-brand-red/10 resize-none"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                    <button 
                        type="button" 
                        onClick={() => setIsModalOpen(false)}
                        className="flex-1 py-5 rounded-2xl font-bold bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all"
                    >
                        Discard
                    </button>
                    <button 
                        type="submit" 
                        className="flex-[2] py-5 rounded-2xl font-black bg-brand-red text-white hover:bg-brand-dark transition-all flex items-center justify-center space-x-2 shadow-xl shadow-brand-red/20"
                    >
                        {editingItem ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                        <span>{editingItem ? 'Save Changes' : 'Launch Item'}</span>
                    </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

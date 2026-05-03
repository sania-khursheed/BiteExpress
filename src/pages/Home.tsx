import { useState, useEffect } from 'react';
import api from '../lib/api';
import FoodCard from '../components/FoodCard';
import { ArrowRight, Star, ShieldCheck, Zap, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [popularItems, setPopularItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get('/food-items/popular');
        setPopularItems(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-red rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-red rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-brand-red/10 text-brand-red rounded-full text-sm font-bold tracking-wide uppercase mb-6"
              >
                <Zap className="w-4 h-4 fill-brand-red" />
                <span>Fastest Delivery in Town</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-8xl font-black text-brand-dark leading-[0.9] mb-8"
              >
                Craving <br />
                <span className="text-brand-red">Satisfaction?</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-500 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              >
                Premium fast food made with love and local ingredients. Delivered to your doorstep in minutes.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <Link to="/contact" className="btn-primary flex items-center space-x-2">
                  <span>Order Now</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/about" className="px-8 py-4 border-2 border-gray-100 text-brand-dark font-semibold rounded-full hover:bg-gray-50 transition-all">
                  View Menu
                </Link>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              className="flex-1 relative"
            >
              <div className="relative z-10 w-full h-[500px] rounded-[3rem] overflow-hidden shadow-2xl skew-x-2">
                <img 
                  src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=1000" 
                  alt="Delicious Burger"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-12 -right-12 z-20 bg-white p-6 rounded-3xl shadow-xl animate-bounce-slow">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-brand-red rounded-2xl">
                    <Heart className="w-6 h-6 text-white fill-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold">100k+</div>
                    <div className="text-xs text-gray-400 font-medium">Happy Customers</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Items */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-black text-brand-red uppercase tracking-widest mb-4">Our Classics</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-brand-dark">Most Popular Bites</h3>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-[400px] bg-white animate-pulse rounded-3xl border border-gray-200" />
              ))}
            </div>
          ) : popularItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularItems.map((item) => (
                <FoodCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
              <p className="text-gray-400 text-lg">No items found yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              {
                icon: ShieldCheck,
                title: "Quality First",
                desc: "We only use the freshest, hand-picked ingredients for every meal.",
                color: "bg-blue-50 text-blue-600"
              },
              {
                icon: Zap,
                title: "Flash Delivery",
                desc: "Average delivery time is under 20 minutes across the city.",
                color: "bg-orange-50 text-orange-600"
              },
              {
                icon: Heart,
                title: "Made with Love",
                desc: "Our chefs treat every order as if it were for their own family.",
                color: "bg-red-50 text-brand-red"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[2.5rem] bg-gray-50 border border-transparent hover:border-gray-200 transition-all text-center"
              >
                <div className={`w-16 h-16 ${feature.color} mx-auto rounded-2xl flex items-center justify-center mb-8`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold mb-4">{feature.title}</h4>
                <p className="text-gray-500 leading-relaxed italic">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-brand-dark relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <Utensils className="absolute top-10 left-10 w-40 h-40" />
          <Utensils className="absolute bottom-10 right-10 w-40 h-40" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="text-brand-red font-black tracking-widest uppercase mb-12">Social Proof</h2>
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-white text-3xl md:text-4xl font-display italic leading-relaxed mb-12"
                >
                    "The Best burger I've ever had! The bun was soft, the meat was juicy, and the delivery was so fast it was still steaming."
                </motion.div>
                <div className="flex items-center justify-center space-x-4">
                    <img 
                        src="https://i.pravatar.cc/150?u=sania" 
                        alt="Customer" 
                        className="w-16 h-16 rounded-full border-2 border-brand-red"
                    />
                    <div className="text-left">
                        <div className="text-white font-bold text-lg">Sania Khursheed</div>
                        <div className="text-gray-500 text-sm">Food Critic, NY Times</div>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}

function Utensils(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
            <path d="M7 2v20" />
            <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
        </svg>
    )
}

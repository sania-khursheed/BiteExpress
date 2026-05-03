import { Star, ShoppingCart, Clock, Flame } from 'lucide-react';
import { motion } from 'motion/react';

interface FoodItem {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
}

export default function FoodCard({ item }: { item: FoodItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-brand-red text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center space-x-1 shadow-lg">
          <Flame className="w-3 h-3 fill-white" />
          <span>{item.category}</span>
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-brand-dark text-xs font-black px-3 py-1.5 rounded-full shadow-lg">
          ${item.price.toFixed(2)}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center space-x-1 mb-2 text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-current" />
          ))}
          <span className="text-gray-400 text-xs font-medium ml-2">(4.9)</span>
        </div>
        
        <h3 className="text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-red transition-colors">
          {item.name}
        </h3>
        
        <p className="text-gray-500 text-sm line-clamp-2 mb-6 leading-relaxed">
          {item.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-400 text-xs">
            <Clock className="w-3.5 h-3.5 mr-1" />
            <span>15-20 min</span>
          </div>
          <button className="p-3 bg-brand-dark text-white rounded-2xl group-hover:bg-brand-red transition-all active:scale-90">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

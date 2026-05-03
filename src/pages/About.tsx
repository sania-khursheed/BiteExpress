import { Utensils, Zap, Users, ShoppingCart, Award, Coffee } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="py-24 bg-white">
      {/* Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 relative">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl skew-y-1">
              <img 
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1000" 
                alt="Kitchen" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 z-20 bg-brand-red p-8 rounded-[2rem] text-white shadow-xl">
              <div className="text-4xl font-black mb-1">10+</div>
              <div className="text-sm font-medium uppercase tracking-widest opacity-80">Years Excellence</div>
            </div>
          </div>
          
          <div className="flex-1">
            <h2 className="text-brand-red font-black tracking-widest uppercase mb-4">Our Journey</h2>
            <h1 className="text-5xl md:text-6xl font-black text-brand-dark tracking-tighter mb-8 max-w-md">Born from a <br />Passion for <span className="italic font-display text-brand-red">Quality.</span></h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-8 italic border-l-4 border-brand-red pl-6">
              "We didn't just want to build another burger joint. We wanted to create a revolution in fast food where convenience never compromises on craft."
            </p>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Founded in 2014 by a group of culinary renegades, BiteExpress started as a small food truck in Brooklyn. Our mission was simple: make premium food accessible to everyone, fast. Today, we're proud to serve thousands of happy customers daily across ten locations.
            </p>
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <h4 className="font-bold text-xl mb-2 italic">100% Organic</h4>
                    <p className="text-sm text-gray-400">Locally sourced vegetables and grass-fed beef only.</p>
                </div>
                <div>
                    <h4 className="font-bold text-xl mb-2 italic">Carbon Neutral</h4>
                    <p className="text-sm text-gray-400">Our delivery fleet is 100% electric and zero-emission.</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-brand-dark py-32 rounded-[4rem] mx-4 sm:mx-8 mb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red rounded-full blur-[150px] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                <div className="p-12 bg-white/5 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all">
                    <Zap className="w-12 h-12 text-brand-red mx-auto mb-8" />
                    <h3 className="text-3xl font-black text-white mb-6">Our Mission</h3>
                    <p className="text-gray-400 text-lg leading-relaxed italic">
                        To redefine the fast-food landscape by delivering gourmet-quality meals at lightning speed, empowering communities through sustainable practices.
                    </p>
                </div>
                <div className="p-12 bg-white/5 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all">
                    <Award className="w-12 h-12 text-brand-red mx-auto mb-8" />
                    <h3 className="text-3xl font-black text-white mb-6">Our Vision</h3>
                    <p className="text-gray-400 text-lg leading-relaxed italic">
                        Becoming the world's most loved and responsible fast-food brand, where every bite tells a story of craftsmanship and ethical sourcing.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-brand-red font-black tracking-widest uppercase mb-4">The Mavericks</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-brand-dark tracking-tight">Meet Our Creative Chefs</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "Marco Rossi", role: "Head Chef", img: "https://images.unsplash.com/photo-1583394060263-f30d5362ec11?auto=format&fit=crop&q=80&w=500" },
            { name: "Sarah Chen", role: "Flavor Engineer", img: "https://images.unsplash.com/photo-1595273670150-db0a3d39074f?auto=format&fit=crop&q=80&w=500" },
            { name: "David Miller", role: "Kitchen Director", img: "https://images.unsplash.com/photo-1600566752355-397921139bc0?auto=format&fit=crop&q=80&w=500" },
            { name: "Elena Gomez", role: "Pastry Specialist", img: "https://images.unsplash.com/photo-1577214714282-3e3da54cc450?auto=format&fit=crop&q=80&w=500" }
          ].map((member, i) => (
            <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="group relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-xl"
            >
              <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:from-brand-red/90 transition-colors duration-500 flex flex-col justify-end p-8">
                <h4 className="text-2xl font-bold text-white mb-1">{member.name}</h4>
                <p className="text-gray-300 font-medium tracking-widest text-xs uppercase">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

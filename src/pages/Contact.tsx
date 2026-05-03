import { Send, MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send to API
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-brand-red font-black tracking-widest uppercase mb-4">Get in Touch</h2>
          <h1 className="text-5xl md:text-7xl font-black text-brand-dark tracking-tighter">We'd Love <br />to Hear From <span className="text-brand-red italic font-display">You</span></h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Details */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { icon: MapPin, title: "Our Location", detail: "123 Fast Food Lane, New York, NY 10001" },
                { icon: Phone, title: "Phone Number", detail: "+1 (555) 000-1234" },
                { icon: Mail, title: "Email Address", detail: "hello@biteexpress.com" },
                { icon: Send, title: "Socials", detail: "@biteexpress_official" }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 hover:border-brand-red/20 transition-all group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 text-brand-red" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="h-[300px] bg-gray-100 rounded-[2rem] overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700 shadow-inner">
               <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest">
                  Google Maps Embed Here
               </div>
               <img 
                 src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" 
                 alt="Map background"
                 className="w-full h-full object-cover opacity-50"
               />
            </div>
          </div>

          {/* Form */}
          <div className="bg-brand-dark p-10 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red rounded-full blur-[100px] opacity-20" />
            <div className="relative z-10">
                <h3 className="text-white text-3xl font-bold mb-8">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2 uppercase tracking-wide">Your Name</label>
                    <input 
                    type="text" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                    placeholder="Enter your name"
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2 uppercase tracking-wide">Email Address</label>
                    <input 
                    type="email" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                    placeholder="hello@example.com"
                    value={formState.email}
                    onChange={e => setFormState({...formState, email: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2 uppercase tracking-wide">Your Message</label>
                    <textarea 
                    rows={4}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all resize-none"
                    placeholder="How can we help?"
                    value={formState.message}
                    onChange={e => setFormState({...formState, message: e.target.value})}
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={submitted}
                    className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all ${submitted ? 'bg-green-500 text-white' : 'bg-brand-red text-white hover:bg-white hover:text-brand-dark'}`}
                >
                    <Send className="w-5 h-5" />
                    <span>{submitted ? 'Message Sent!' : 'Send Message'}</span>
                </button>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

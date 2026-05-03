import { Utensils, Instagram, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="p-2 bg-brand-red rounded-xl">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight">
                Bite<span className="text-brand-red">Express</span>
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Crafting premium fast food experiences with the freshest ingredients and lightning-fast service. Your taste buds' best friend since 2024.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/" className="hover:text-brand-red transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand-red transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-brand-red transition-colors">Contact Us</Link></li>
              <li><Link to="/login" className="hover:text-brand-red transition-colors">Admin Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-brand-red" />
                <span>123 Fast Food Lane, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-brand-red" />
                <span>+1 (555) 000-1234</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-brand-red" />
                <span>hello@biteexpress.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Follow Us</h4>
            <div className="flex space-x-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-3 bg-white/5 rounded-full hover:bg-brand-red hover:scale-110 transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} BiteExpress. All rights reserved. Designed with ❤️ by AI.</p>
        </div>
      </div>
    </footer>
  );
}

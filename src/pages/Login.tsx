import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, LogIn, Lock, Mail, Eye, EyeOff, Utensils } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError('Invalid admin credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gray-50 py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-brand-red rounded-full blur-[150px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-red rounded-full blur-[150px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl border border-gray-100 relative z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-brand-red/10 rounded-2xl mb-6">
            <Utensils className="w-8 h-8 text-brand-red" />
          </div>
          <h1 className="text-3xl font-black text-brand-dark tracking-tight mb-2">Admin Portal</h1>
          <p className="text-gray-400 font-medium italic">Enter your secure credentials</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center space-x-3 border border-red-100"
          >
            <ShieldAlert className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-bold">{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 pl-2">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                placeholder="admin@biteexpress.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
            </div>
          </div>

          <div>
            <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 pl-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-brand-red transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-brand-red text-white rounded-2xl font-black text-lg flex items-center justify-center space-x-3 hover:bg-brand-dark transition-all shadow-xl shadow-brand-red/20 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
            <p className="text-gray-400 text-xs italic">Only authorized personnel may access this dashboard. All login attempts are logged for security.</p>
        </div>
      </motion.div>
    </div>
  );
}

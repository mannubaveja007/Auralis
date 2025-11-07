'use client';


import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, User } from 'lucide-react';
import RippleGrid from '@/components/Ripplegrid';
import ShinyText from '@/components/ShinyText';
import { useTheme } from '../../components/ThemeProvider';


export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);


    try {
      await signup(email, password, name);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      {/* Theme Toggle Button (top right) */}
      <div className="w-full flex justify-end p-4" style={{ pointerEvents: 'auto', position: 'fixed', top: 0, right: 0, zIndex: 50 }}>
        <button
          aria-label="Toggle dark mode"
          onClick={toggleTheme}
          className="ml-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
      </div>


      {/* RippleGrid Background - Fixed to viewport, theme-aware */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        backgroundColor: theme === 'dark' ? '#0a0a0a' : '#fff',
        transition: 'background 0.3s'
      }}>
        <RippleGrid
          enableRainbow={false}
          gridColor="#8b5cf6"
          rippleIntensity={0.05}
          gridSize={10}
          gridThickness={15}
          mouseInteraction={true}
          mouseInteractionRadius={1.2}
          opacity={0.6}
          glowIntensity={0.2}
          vignetteStrength={1.5}
        />
      </div>


      {/* Content Overlay */}
      <div className="min-h-screen flex items-center justify-center p-4" style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8 w-full max-w-md"
          style={{ pointerEvents: 'auto', background: theme === 'dark' ? 'rgba(20,20,20,0.85)' : 'rgba(255,255,255,0.85)', color: theme === 'dark' ? '#fff' : '#222', borderRadius: '1rem' }}
        >
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}


          <div className="space-y-2">
            <ShinyText
              text="Full Name"
              disabled={false}
              speed={3}
              className='text-sm font-medium text-purple-300'
            />
            <div className={`flex items-center border-b-2 ${theme === 'dark' ? 'border-white/30' : 'border-gray-300'} focus-within:border-purple-500 transition-all duration-300`}>
              <User className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mr-3`} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full bg-transparent ${theme === 'dark' ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'} py-3 outline-none`}
                placeholder="Enter your name"
                required
              />
            </div>
          </div>


          <div className="space-y-2">
            <ShinyText
              text="Email"
              disabled={false}
              speed={3}
              className='text-sm font-medium text-purple-300'
            />
            <div className={`flex items-center border-b-2 ${theme === 'dark' ? 'border-white/30' : 'border-gray-300'} focus-within:border-purple-500 transition-all duration-300`}>
              <Mail className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mr-3`} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-transparent ${theme === 'dark' ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'} py-3 outline-none`}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>


          <div className="space-y-2">
            <ShinyText
              text="Password"
              disabled={false}
              speed={3}
              className='text-sm font-medium text-purple-300'
            />
            <div className={`flex items-center border-b-2 ${theme === 'dark' ? 'border-white/30' : 'border-gray-300'} focus-within:border-purple-500 transition-all duration-300`}>
              <Lock className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mr-3`} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-transparent ${theme === 'dark' ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'} py-3 outline-none`}
                placeholder="Minimum 8 characters"
                minLength={8}
                required
              />
            </div>
          </div>


          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`w-full ${theme === 'dark' ? 'bg-black border-white/20 hover:bg-gray-900 hover:border-white/40' : 'bg-purple-600 hover:bg-purple-700'} border py-4 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? (
              <span className={theme === 'dark' ? 'text-white' : 'text-white'}>Creating account...</span>
            ) : (
              <span className={theme === 'dark' ? 'text-white' : 'text-white'}>
                {theme === 'dark' ? (
                  <ShinyText
                    text="Create Account"
                    disabled={false}
                    speed={3}
                    className='text-base font-semibold'
                  />
                ) : (
                  'Create Account'
                )}
              </span>
            )}
          </motion.button>
        </form>


        <p className={`text-center mt-6 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
          Already have an account?{' '}
          <Link href="/login" className="text-purple-400 font-medium hover:underline hover:text-purple-300">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
    </>
  );
}

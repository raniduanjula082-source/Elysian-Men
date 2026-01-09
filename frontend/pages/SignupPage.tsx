
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

const SignupPage: React.FC = () => {
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signup(formData);
      navigate('/');
    } catch (err) {
      setError('Registration failed. Please try again later.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-10">
        <div className="text-center space-y-2">
          <h1 className="text-3xl serif italic">Join Elysian</h1>
          <p className="text-xs text-stone-400 uppercase tracking-widest">Create your premium account</p>
        </div>

        <div className="space-y-6">
          <form className="space-y-4" onSubmit={handleSignup}>
            {error && (
              <div className="bg-red-50 text-red-500 text-[10px] p-3 text-center italic rounded-sm">
                {error}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">First Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-stone-200 py-2 focus:border-stone-900 outline-none transition-colors text-sm" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Last Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-stone-200 py-2 focus:border-stone-900 outline-none transition-colors text-sm" 
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Email Address</label>
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-stone-200 py-2 focus:border-stone-900 outline-none transition-colors text-sm" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Password</label>
              <input 
                type="password" 
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-stone-200 py-2 focus:border-stone-900 outline-none transition-colors text-sm" 
              />
            </div>
            <div className="flex items-center space-x-2 py-2">
              <input type="checkbox" className="accent-stone-900 w-3 h-3" id="newsletter" />
              <label htmlFor="newsletter" className="text-[10px] text-stone-400 uppercase tracking-widest cursor-pointer">Subscribe to the archive newsletter</label>
            </div>
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-stone-900 text-white font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-stone-800 transition-all rounded-sm disabled:opacity-50"
            >
              {isLoading ? 'Creating Archive...' : 'Create Account'}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
              <span className="px-2 bg-stone-50 text-stone-400">or</span>
            </div>
          </div>

          <button 
            type="button"
            className="w-full flex items-center justify-center space-x-3 py-3 border border-stone-200 rounded-sm hover:bg-stone-50 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285f4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34a853"/>
              <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.712s.102-1.172.282-1.712V4.956H.957a8.996 8.996 0 000 8.088l3.007-2.332z" fill="#fbbc05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.48 0 2.443 2.048.957 4.956L3.964 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#ea4335"/>
            </svg>
            <span className="text-[11px] font-bold uppercase tracking-widest">Sign up with Google</span>
          </button>
        </div>

        <div className="text-center pt-4">
          <p className="text-[11px] text-stone-400 uppercase tracking-widest">
            Already have an account? <Link to="/login" className="text-stone-900 font-bold border-b border-stone-900 pb-0.5 ml-1">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, User, AlertCircle, RefreshCw } from 'lucide-react';
import Logo from '../../components/Logo';

const Signup = () => {
  const { signup, user } = useAuth();
  const [searchParams] = useSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      const claim = searchParams.get('claim');
      if (claim) {
        navigate(`/dashboard/mycard?claim=${claim}`);
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, navigate, searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signup(name, email, password);
      if (result.success) {
        const claim = searchParams.get('claim');
        if (claim) {
          navigate(`/dashboard/mycard?claim=${claim}`);
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800">
      
      {/* Left Panel: Visual Mockup Showcase (Hidden on Mobile) */}
      <div className="hidden md:flex md:w-1/2 bg-slate-900 text-white flex-col justify-between p-12 relative overflow-hidden select-none">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-brand/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Brand */}
        <Link to="/" className="flex items-center relative z-10">
          <Logo className="h-8" />
        </Link>

        {/* Floating Card Mockup */}
        <div className="relative z-10 my-auto flex justify-center items-center">
          <div className="relative group w-full max-w-[340px] rotate-[-6deg] hover:rotate-0 transition-transform duration-500">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand to-violet-500 rounded-2xl blur-xl opacity-20"></div>
            
            {/* Card Graphic */}
            <div className="relative bg-slate-955 aspect-[1.58/1] rounded-2xl p-6 flex flex-col justify-between shadow-2xl text-left border border-slate-800">
              <div className="flex justify-between items-start">
                <div className="w-9 h-7 bg-gradient-to-br from-amber-300 to-amber-500 rounded-md border border-amber-400/40 relative">
                  <div className="absolute inset-x-0 top-1.5 h-0.5 bg-amber-600/30"></div>
                  <div className="absolute inset-y-0 left-3.5 w-0.5 bg-amber-600/30"></div>
                </div>
                <Logo className="h-5" />
              </div>
              <div className="flex justify-between items-end">
                <div className="space-y-0.5">
                  <p className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold font-mono">Premium NFC</p>
                  <p className="text-xs font-bold text-slate-200 tracking-wider">ONE TAP SHARE</p>
                </div>
                <svg className="w-7 h-7 text-slate-500 rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 8.5c.9-1 2.1-1.5 3.5-1.5s2.6.5 3.5 1.5M3 6c1.4-1.5 3.4-2.5 5.5-2.5S12.6 4.5 14 6" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="relative z-10 text-left space-y-2">
          <h3 className="text-2xl font-bold text-white">Your Identity. One Tap Away.</h3>
          <p className="text-sm text-slate-400 max-w-sm">
            Create your digital identity instantly and share it seamlessly with anyone.
          </p>
        </div>
      </div>

      {/* Right Panel: Signup Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 bg-white">
        <div className="mx-auto w-full max-w-sm text-left">
          
          {/* Logo (Visible on mobile only) */}
          <div className="md:hidden mb-8 flex justify-center">
            <Link to="/" className="flex items-center">
              <Logo className="h-8" />
            </Link>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create Account</h2>
            <p className="text-sm text-slate-550">Sign up for a free identity</p>
          </div>

          {error && (
            <div className="bg-red-50/80 border border-red-200 text-red-655 p-3 rounded-lg flex items-start space-x-2 text-xs mb-6 mt-4">
              <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5 text-red-550" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5 mt-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="h-4.5 w-4.5" />
                </div>
                <input
                  id="name"
                  type="text"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-slate-800 focus:outline-none focus:border-brand focus:bg-white text-xs transition-all"
                  placeholder="Rajat Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-slate-800 focus:outline-none focus:border-brand focus:bg-white text-xs transition-all"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4.5 w-4.5" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  minLength="6"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-slate-800 focus:outline-none focus:border-brand focus:bg-white text-xs transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand hover:bg-brand-hover text-white py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 text-xs shadow-sm shadow-brand/10 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Creating account...</span>
                  </>
                ) : (
                  <span>Register</span>
                )}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-xs text-slate-550 font-medium">
            Already have an account?{' '}
            <Link to={searchParams.get('claim') ? `/login?claim=${searchParams.get('claim')}` : "/login"} className="font-semibold text-brand hover:opacity-90 transition-colors">
              Login
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Signup;

import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, AlertCircle, RefreshCw } from 'lucide-react';
import Logo from '../../components/Logo';

const Login = () => {
  const { login, user } = useAuth();
  const [searchParams] = useSearchParams();
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
      const result = await login(email, password);
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

      {/* Right Panel: Login Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 bg-white">
        <div className="mx-auto w-full max-w-sm text-left">
          
          {/* Logo (Visible on mobile only) */}
          <div className="md:hidden mb-8 flex justify-center">
            <Link to="/" className="flex items-center">
              <Logo className="h-8" />
            </Link>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h2>
            <p className="text-sm text-slate-550">Login to your account</p>
          </div>

          {/* Social Signin Mockup */}
          <div className="mt-6">
            <button
              onClick={() => alert("Google sign in is simulated for MVP")}
              className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-slate-200 rounded-lg bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs transition-colors cursor-pointer"
            >
              {/* Google icon */}
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-150"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-slate-400 font-medium">or</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50/80 border border-red-200 text-red-650 p-3 rounded-lg flex items-start space-x-2 text-xs mb-6">
              <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5 text-red-550" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
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
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Password
                </label>
                <Link
                  to="/forgotpassword"
                  className="text-xs font-semibold text-brand hover:opacity-90 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4.5 w-4.5" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
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
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Login</span>
                )}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-xs text-slate-550 font-medium">
            Don't have an account?{' '}
            <Link to={searchParams.get('claim') ? `/signup?claim=${searchParams.get('claim')}` : "/signup"} className="font-semibold text-brand hover:opacity-90 transition-colors">
              Sign up
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Login;

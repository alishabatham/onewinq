import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';
import { Mail, Lock, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import Logo from '../../components/Logo';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState(''); // Simulated token returned from backend
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1); // 1 = Request Link, 2 = Set New Password, 3 = Success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRequestLink = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/auth/forgotpassword`, { email });
      if (res.data.success) {
        setToken(res.data.resetToken);
        setStep(2);
        setSuccessMsg(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate reset link.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.put(`${API_URL}/auth/resetpassword/${token}`, { password });
      if (res.data.success) {
        setStep(3);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Token is invalid or has expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      
      {/* Left Panel: Marketing Info (Hidden on mobile) */}
      <div className="hidden md:flex md:w-[420px] bg-slate-955 p-12 flex-col justify-between relative overflow-hidden shrink-0 border-r border-slate-900">
        <div className="absolute top-[-20%] left-[-20%] w-[350px] h-[350px] bg-brand/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[350px] h-[350px] bg-brand/10 rounded-full blur-3xl pointer-events-none"></div>
        
        {/* Logo */}
        <Link to="/" className="flex items-center relative z-10 text-left">
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

      {/* Right Panel: Password Recovery Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 bg-white">
        <div className="mx-auto w-full max-w-sm text-left">
          
          {/* Logo (Visible on mobile only) */}
          <div className="md:hidden mb-8 flex justify-center">
            <Link to="/" className="flex items-center">
              <Logo className="h-8" />
            </Link>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">Recover Password</h2>
            <p className="text-xs text-slate-550">Regain access to your smart NFC identity portal.</p>
          </div>

          <div className="mt-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-650 p-3 rounded-lg flex items-start space-x-2 text-xs mb-6">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-red-550" />
                <span>{error}</span>
              </div>
            )}

            {step === 1 && (
              <form onSubmit={handleRequestLink} className="space-y-5">
                <p className="text-xs text-slate-550 leading-relaxed">
                  Enter your email address and we'll generate a password recovery token for verification.
                </p>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
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
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-slate-850 focus:outline-none focus:border-brand text-sm transition-all focus:bg-white"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand hover:bg-brand-hover text-white py-3 rounded-lg font-bold shadow-xs transition-all flex items-center justify-center space-x-2 text-xs cursor-pointer"
                  >
                    {loading ? <RefreshCw className="h-4.5 w-4.5 animate-spin" /> : <span>Get Recovery Token</span>}
                  </button>
                </div>
                <div className="text-center text-xs pt-2">
                  <Link to="/login" className="text-brand hover:opacity-90 font-bold">
                    Back to Sign In
                  </Link>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleResetPassword} className="space-y-5">
                <div className="bg-brand-light border border-brand/10 text-brand p-3 rounded-lg text-xs leading-relaxed mb-4">
                  <p className="font-semibold mb-1">Simulated Email Triggered:</p>
                  <p>{successMsg}</p>
                  <p className="mt-1.5 font-mono text-[10px] break-all bg-white p-2 rounded border border-brand/20">Token: {token}</p>
                </div>

                <div>
                  <label htmlFor="new-password" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Enter New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="h-4.5 w-4.5" />
                    </div>
                    <input
                      id="new-password"
                      type="password"
                      required
                      minLength="6"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-slate-850 focus:outline-none focus:border-brand text-sm transition-all focus:bg-white"
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
                    className="w-full bg-brand hover:bg-brand-hover text-white py-3 rounded-lg font-bold shadow-xs transition-all flex items-center justify-center space-x-2 text-xs cursor-pointer"
                  >
                    {loading ? <RefreshCw className="h-4.5 w-4.5 animate-spin" /> : <span>Update Password</span>}
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="text-center py-6">
                <CheckCircle2 className="h-14 w-14 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Password Reset Successful</h3>
                <p className="text-slate-500 text-sm mb-6 font-medium">Your password has been changed. You can now log in using your new credentials.</p>
                <Link
                  to="/login"
                  className="inline-block bg-brand hover:bg-brand-hover text-white font-bold px-6 py-2.5 rounded-lg text-xs transition-all shadow-xs"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

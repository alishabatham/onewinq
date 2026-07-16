import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Zap, BarChart3, Palette, Cloud, Play } from 'lucide-react';
import Logo from '../../components/Logo';

const Home = () => {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-24 md:pb-32 bg-gradient-to-b from-brand-light/30 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center space-x-2 bg-brand-light border border-brand/20 px-3.5 py-1 rounded-full text-brand text-xs font-bold uppercase tracking-wider">
                Digital Identity, Reimagined
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                One Tap.<br />
                <span className="text-brand">Share Everything.</span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-550 max-w-2xl leading-relaxed">
                OneWinq is your premium digital business card that connects you instantly, professionally and effortlessly. Establish your network with a single tap.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <Link 
                  to="/signup" 
                  className="bg-brand hover:bg-brand-hover text-white px-6 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all text-sm cursor-pointer"
                >
                  Get Started
                </Link>
                <button 
                  onClick={() => alert("Product demo video coming soon!")}
                  className="flex items-center space-x-2 bg-white hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-xl font-bold border border-slate-205 transition-all text-sm cursor-pointer"
                >
                  <Play className="h-4 w-4 text-brand fill-brand" />
                  <span>Watch Demo</span>
                </button>
              </div>
            </div>
            
            {/* Right Card Graphic Column */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[420px] aspect-[1.58/1]">
                {/* Background ambient glowing spheres */}
                <div className="absolute -inset-4 bg-gradient-to-r from-brand/20 to-violet-500/20 rounded-[2.5rem] blur-2xl opacity-80 pointer-events-none"></div>
                
                {/* Physical Card Mockup */}
                <div className="relative bg-slate-900 aspect-[1.58/1] rounded-2xl p-6 flex flex-col justify-between shadow-2xl text-left border border-slate-800 select-none">
                  {/* Chip and logo line */}
                  <div className="flex justify-between items-start">
                    {/* Smart card contact chip mockup */}
                    <div className="w-10 h-8 bg-gradient-to-br from-amber-300 to-amber-500 rounded-md border border-amber-400/40 relative overflow-hidden">
                      <div className="absolute inset-x-0 top-2 h-0.5 bg-amber-600/30"></div>
                      <div className="absolute inset-y-0 left-4 w-0.5 bg-amber-600/30"></div>
                    </div>
                    {/* Brand */}
                    <Logo className="h-6" light={true} />
                  </div>
                  
                  {/* wireless logo and chip */}
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold font-mono">Premium Member</p>
                      <p className="text-sm font-bold text-slate-100 tracking-wider">TAP TO SCAN</p>
                    </div>
                    
                    {/* contactless waves */}
                    <svg className="w-8 h-8 text-slate-400 rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 8.5c.9-1 2.1-1.5 3.5-1.5s2.6.5 3.5 1.5M3 6c1.4-1.5 3.4-2.5 5.5-2.5S12.6 4.5 14 6M7 11c.3-.3.7-.5 1-.5s.7.2 1 .5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 Feature Cards Row */}
      <section className="py-12 bg-white border-y border-slate-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Instant Sharing */}
            <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-100 flex items-start space-x-4 text-left">
              <div className="bg-brand-light text-brand p-3 rounded-xl">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Instant Sharing</h4>
                <p className="text-slate-500 text-xs mt-1">Share your card with a simple one tap.</p>
              </div>
            </div>

            {/* Smart Analytics */}
            <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-100 flex items-start space-x-4 text-left">
              <div className="bg-brand-light text-brand p-3 rounded-xl">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Smart Analytics</h4>
                <p className="text-slate-500 text-xs mt-1">Track views, taps and engagement.</p>
              </div>
            </div>

            {/* Premium Design */}
            <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-100 flex items-start space-x-4 text-left">
              <div className="bg-brand-light text-brand p-3 rounded-xl">
                <Palette className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Premium Design</h4>
                <p className="text-slate-500 text-xs mt-1">Beautiful templates and NFC cards.</p>
              </div>
            </div>

            {/* Cloud Sync */}
            <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-100 flex items-start space-x-4 text-left">
              <div className="bg-brand-light text-brand p-3 rounded-xl">
                <Cloud className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Cloud Sync</h4>
                <p className="text-slate-500 text-xs mt-1">Access your data anywhere, anytime.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="text-slate-500 text-sm">
              Choose the perfect plan for your professional identity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            
            {/* Basic Plan */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between text-left space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Basic</h3>
                  <p className="text-xs text-slate-500 mt-1">Perfect for individuals</p>
                </div>
                
                <div className="flex items-baseline">
                  <span className="text-3xl font-extrabold text-slate-900">₹0</span>
                  <span className="text-slate-500 text-xs ml-1">/month</span>
                </div>
                
                <ul className="space-y-3 text-xs text-slate-650 border-t border-slate-100 pt-4">
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Digital Card Profile</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Basic Analytics</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Custom Profile Fields</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/signup"
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl font-semibold text-xs text-center transition-all"
              >
                Get Started
              </Link>
            </div>

            {/* Pro Plan (Popular) */}
            <div className="bg-white p-8 rounded-2xl border-2 border-brand shadow-md flex flex-col justify-between text-left space-y-6 relative">
              {/* Popular Tag */}
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand text-white font-bold text-[10px] tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
                Most Popular
              </span>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Pro</h3>
                  <p className="text-xs text-slate-500 mt-1">For professionals</p>
                </div>
                
                <div className="flex items-baseline">
                  <span className="text-3xl font-extrabold text-slate-900">₹299</span>
                  <span className="text-slate-500 text-xs ml-1">/month</span>
                </div>
                
                <ul className="space-y-3 text-xs text-slate-650 border-t border-slate-100 pt-4">
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Advanced Analytics</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Physical NFC Card (1)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Custom Branding & Logos</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Priority Support</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/signup"
                className="w-full bg-brand hover:bg-brand-hover text-white py-2.5 rounded-xl font-semibold text-xs text-center shadow-md shadow-brand/10 transition-all"
              >
                Get Started
              </Link>
            </div>

            {/* Business Plan */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between text-left space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Business</h3>
                  <p className="text-xs text-slate-500 mt-1">For teams and companies</p>
                </div>
                
                <div className="flex items-baseline">
                  <span className="text-3xl font-extrabold text-slate-900">₹999</span>
                  <span className="text-slate-500 text-xs ml-1">/month</span>
                </div>
                
                <ul className="space-y-3 text-xs text-slate-650 border-t border-slate-100 pt-4">
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Team Management</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Unlimited Cards Link</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Advanced Team Analytics</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Custom Domains</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/signup"
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl font-semibold text-xs text-center transition-all"
              >
                Get Started
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, ArrowRight, Play, Star, ChevronRight, ChevronLeft,
  User, Wifi, BarChart3, Globe, Palette, Sun, Moon,
  Briefcase, Laptop, GraduationCap, Building2, Camera, CheckCircle2,
  ExternalLink, Bell, Smartphone, Edit3, Check
} from 'lucide-react';
import Logo from '../../components/Logo';

const Home = () => {
  // State for active template filter tab and theme mode toggle
  const [activeTab, setActiveTab] = useState('Business');
  const [themeMode, setThemeMode] = useState('light');
  const [carouselIndex, setCarouselIndex] = useState(2); // Sophia Lee in middle (index 2)

  // Template profiles for carousel section matching reference image
  const templateProfiles = [
    {
      id: 'daniel',
      name: 'Daniel James',
      title: 'Founder & CEO',
      category: 'Founder',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      views: '420',
      taps: '152',
      clicks: '98'
    },
    {
      id: 'arjun',
      name: 'Arjun Mehta',
      title: 'Full Stack Developer',
      category: 'Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      views: '470',
      taps: '162',
      clicks: '92'
    },
    {
      id: 'sophia',
      name: 'Sophia Lee',
      title: 'Product Designer',
      category: 'Designer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
      views: '420',
      taps: '152',
      clicks: '98',
      isFeatured: true
    },
    {
      id: 'priya',
      name: 'Dr. Priya Sharma',
      title: 'Consultant',
      category: 'Business',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      views: '470',
      taps: '192',
      clicks: '98'
    },
    {
      id: 'michael',
      name: 'Michael Brown',
      title: 'Photographer',
      category: 'Student',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      views: '380',
      taps: '120',
      clicks: '85'
    }
  ];

  const handlePrevTemplate = () => {
    setCarouselIndex((prev) => (prev === 0 ? templateProfiles.length - 1 : prev - 1));
  };

  const handleNextTemplate = () => {
    setCarouselIndex((prev) => (prev === templateProfiles.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-[#FAF9FF] text-slate-900 min-h-screen font-sans selection:bg-[#6344F5]/10 selection:text-[#6344F5] overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-24 md:pt-16 md:pb-32 overflow-hidden bg-gradient-to-b from-[#F5F3FF] via-[#FAF9FF] to-white">
        
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-tr from-[#6344F5]/12 via-purple-300/10 to-indigo-300/10 rounded-full blur-[150px] pointer-events-none -z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* HERO LEFT COLUMN */}
            <div className="lg:col-span-6 text-left space-y-7">
              
              {/* Pill Badge */}
              <div className="inline-flex items-center space-x-2 bg-white border border-[#6344F5]/20 px-4 py-1.5 rounded-full shadow-sm">
                <Sparkles className="h-4 w-4 text-[#6344F5]" />
                <span className="text-[#6344F5] text-xs font-semibold tracking-wide">The Modern Identity Layer</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-[66px] font-extrabold tracking-tight text-slate-950 leading-[1.08] sm:leading-[1.06]">
                Everything <br />
                About You. <br />
                <span className="text-[#6344F5]">In One Tap.</span>
              </h1>

              {/* Subheading */}
              <p className="text-slate-600 text-sm sm:text-lg max-w-lg leading-relaxed font-normal">
                Create one beautiful digital identity that works everywhere. Share your profile, portfolio, business, social presence and more.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                <Link
                  to="/signup"
                  className="bg-[#6344F5] hover:bg-[#5233E0] text-white px-7 py-3.5 rounded-full font-bold shadow-lg shadow-[#6344F5]/30 transition-all text-sm sm:text-base flex items-center justify-center space-x-2.5 cursor-pointer group text-center"
                >
                  <span>Get Started – It's Free</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  onClick={() => alert("Watch Demo starting...")}
                  className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 px-6 py-3.5 rounded-full font-bold shadow-sm transition-all text-sm sm:text-base flex items-center justify-center space-x-2 cursor-pointer text-center"
                >
                  <span>Watch Demo</span>
                  <div className="w-5 h-5 rounded-full bg-slate-950 text-white flex items-center justify-center ml-1">
                    <Play className="h-2.5 w-2.5 fill-white ml-0.5" />
                  </div>
                </button>
              </div>

              {/* Social Proof Bar */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <div className="flex -space-x-2.5 overflow-hidden shrink-0">
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="User 1" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="User 2" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" alt="User 3" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80" alt="User 4" />
                </div>
                
                <div className="flex items-center space-x-1.5 text-xs text-slate-600 font-medium">
                  <div className="flex text-[#6344F5]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[#6344F5]" />
                    ))}
                  </div>
                  <span className="font-semibold text-slate-800">Loved by 10,000+ professionals</span>
                </div>
              </div>

            </div>

            {/* HERO RIGHT COLUMN - SMARTPHONE & FLOATING WIDGET CARDS */}
            <div className="lg:col-span-6 relative flex justify-center mt-6 lg:mt-0 w-full overflow-hidden sm:overflow-visible">
              
              {/* Outer Wrapper with scale and relative positioning for floating cards */}
              <div className="relative w-full max-w-[440px] min-h-[520px] sm:min-h-[580px] flex items-center justify-center py-4 sm:py-6 scale-[0.85] min-[400px]:scale-[0.92] sm:scale-100 origin-center transition-transform">
                
                {/* 1. TOP LEFT WIDGET: AI Assistant */}
                <div className="absolute -top-2 left-1 sm:-left-6 bg-white/95 backdrop-blur-md border border-slate-100/80 p-3 rounded-2xl shadow-xl z-20 flex items-center space-x-3 transition-transform hover:scale-105 duration-300">
                  <div className="w-8 h-8 rounded-xl bg-[#F4F0FF] flex items-center justify-center text-[#6344F5]">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-900 leading-none mb-1">AI Assistant</p>
                    <span className="inline-block bg-[#F4F0FF] text-[#6344F5] text-[9px] font-semibold px-2 py-0.5 rounded-full">
                      Summarize me
                    </span>
                  </div>
                </div>

                {/* 2. MIDDLE LEFT WIDGET: Analytics Chart */}
                <div className="absolute top-36 -left-1 sm:-left-10 bg-white/95 backdrop-blur-md border border-slate-100/80 p-3.5 rounded-2xl shadow-xl z-20 w-44 transition-transform hover:scale-105 duration-300">
                  <p className="text-[11px] font-bold text-slate-900 mb-0.5">Analytics</p>
                  <p className="text-[9px] text-slate-400 font-medium mb-2">Profile views</p>
                  {/* Smooth Line Chart */}
                  <div className="h-7 w-full flex items-end">
                    <svg className="w-full h-6 text-[#6344F5]" viewBox="0 0 100 30" fill="none">
                      <path d="M0 25 Q 25 15, 40 22 T 80 5 T 100 12" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="mt-2 text-right">
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      + 24% this week
                    </span>
                  </div>
                </div>

                {/* 3. BOTTOM LEFT WIDGET: Portfolio */}
                <div className="absolute bottom-6 left-1 sm:-left-6 bg-white/95 backdrop-blur-md border border-slate-100/80 p-3 rounded-2xl shadow-xl z-20 transition-transform hover:scale-105 duration-300">
                  <div className="flex items-center justify-between space-x-4 mb-2">
                    <span className="text-[10px] font-bold text-slate-900">Portfolio</span>
                    <ChevronRight className="h-3 w-3 text-slate-400" />
                  </div>
                  <div className="flex space-x-1.5">
                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-100">
                      <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80" alt="Work 1" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-100">
                      <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=100&q=80" alt="Work 2" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-100">
                      <img src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=100&q=80" alt="Work 3" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>

                {/* 4. TOP RIGHT WIDGET: NFC Card */}
                <div className="absolute top-2 right-1 sm:-right-6 bg-white/95 backdrop-blur-md border border-slate-100/80 p-3 rounded-2xl shadow-xl z-20 w-36 transition-transform hover:scale-105 duration-300">
                  <p className="text-[10px] font-bold text-slate-900 mb-1.5">NFC Card</p>
                  <div className="h-16 rounded-xl bg-gradient-to-tr from-[#6344F5] via-indigo-700 to-indigo-900 p-2 text-white flex flex-col justify-between shadow-inner relative overflow-hidden">
                    <div className="flex justify-between items-center">
                      <div className="w-3 h-3 rounded-full border border-white/40"></div>
                      <Wifi className="h-3 w-3 opacity-80" />
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-white/30 flex items-center justify-center text-[7px] font-extrabold">W</div>
                      <span className="text-[8px] font-bold tracking-wider">OneWinq</span>
                    </div>
                  </div>
                </div>

                {/* 5. MIDDLE RIGHT WIDGET: QR Code */}
                <div className="absolute top-44 right-1 sm:-right-6 bg-white/95 backdrop-blur-md border border-slate-100/80 p-3 rounded-2xl shadow-xl z-20 text-center transition-transform hover:scale-105 duration-300">
                  <p className="text-[10px] font-bold text-slate-900 mb-1.5">QR Code</p>
                  <div className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-lg p-1 flex items-center justify-center mx-auto">
                    <svg className="w-full h-full text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm9-2h8v8h-8V2zm2 2v4h4V4h-4zM2 13h8v8H2v-8zm2 2v4h4v-4H4zm13-2h4v2h-4v-2zm-4 4h2v4h-2v-4zm4 0h4v4h-4v-4zm-4-4h2v2h-2v-2z"/>
                    </svg>
                  </div>
                </div>

                {/* 6. BOTTOM RIGHT WIDGET: New Connection */}
                <div className="absolute bottom-10 right-1 sm:-right-8 bg-white/95 backdrop-blur-md border border-slate-100/80 p-2.5 rounded-2xl shadow-xl z-20 flex items-center space-x-2.5 w-44 transition-transform hover:scale-105 duration-300">
                  <img className="h-7 w-7 rounded-full object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Avatar" />
                  <div className="overflow-hidden">
                    <p className="text-[10px] font-bold text-slate-900 leading-none">New Connection</p>
                    <p className="text-[9px] text-slate-500 truncate">You've got a new connection</p>
                    <span className="text-[8px] text-emerald-600 font-semibold">2m ago</span>
                  </div>
                </div>

                {/* CENTRAL SMARTPHONE MOCKUP */}
                <div className="relative z-10 w-[275px] h-[550px] bg-slate-950 rounded-[42px] p-2.5 shadow-2xl border-4 border-slate-800 ring-1 ring-slate-900/50">
                  
                  {/* Top Notch */}
                  <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-22 h-3.5 bg-black rounded-full z-30 flex items-center justify-between px-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div>
                  </div>

                  {/* Inner Phone Screen */}
                  <div className="w-full h-full bg-white rounded-[32px] overflow-hidden flex flex-col pt-5 select-none font-sans text-slate-900">
                    
                    {/* Status bar */}
                    <div className="px-4 flex justify-between items-center text-[9px] font-bold text-slate-700">
                      <span>9:41</span>
                      <div className="flex items-center space-x-1">
                        <Wifi className="h-3 w-3" />
                        <div className="w-3.5 h-2 bg-slate-800 rounded-sm"></div>
                      </div>
                    </div>

                    {/* App Header inside phone */}
                    <div className="px-3.5 py-1.5 flex items-center justify-between">
                      <div className="flex items-center space-x-1.5">
                        <div className="w-4 h-4 rounded-md bg-[#6344F5] text-white flex items-center justify-center text-[9px] font-bold">W</div>
                        <span className="text-xs font-extrabold text-slate-900">OneWinq</span>
                      </div>
                      <Bell className="h-3.5 w-3.5 text-slate-500" />
                    </div>

                    {/* Profile Card Body */}
                    <div className="flex-1 px-3.5 pt-1 overflow-y-auto space-y-2.5 scrollbar-none text-center">
                      
                      {/* Avatar */}
                      <div className="flex flex-col items-center">
                        <div className="w-15 h-15 rounded-full overflow-hidden border-2 border-white shadow-md mb-1.5">
                          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" alt="Aisha Khan" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="font-bold text-slate-900 text-xs leading-tight">Aisha Khan</h3>
                        <p className="text-[10px] text-slate-500 font-medium">Product Designer</p>
                        <p className="text-[9px] text-slate-400 mt-0.5 px-1 leading-tight">
                          Designing meaningful experiences through minimal and intuitive UI.
                        </p>
                      </div>

                      {/* Social icons row */}
                      <div className="flex justify-center items-center space-x-2 pt-0.5">
                        <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                          <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                          <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                          <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                          <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm6.9 8.5a8.4 8.4 0 0 1-3.6 1.7 18.5 18.5 0 0 0-1.8-3.7 8.5 8.5 0 0 1 5.4 2zm-7.6-5.8a8.5 8.5 0 0 1 4.7 2.2 16.7 16.7 0 0 1 1.7 3.5 17.5 17.5 0 0 0-5.8.7 23.3 23.3 0 0 1-2.4-4.8 8.6 8.6 0 0 1 1.8-1.6zm-4 1.7a8.5 8.5 0 0 1 2.3-1.2 24.8 24.8 0 0 0 2.5 4.8 19 19 0 0 1-6-1.1 8.5 8.5 0 0 1 1.2-2.5zm-3.6 5a17.2 17.2 0 0 0 6.6 1.2h.4a23 23 0 0 1-1.3 4.2 8.4 8.4 0 0 1-5.7-5.4zm7.3 8.1a8.5 8.5 0 0 1-3.4-.7 21 21 0 0 0 1.2-3.8 19 19 0 0 0 5.4-.5 8.4 8.4 0 0 1-3.2 5zm4.8-1.8a17.5 17.5 0 0 1-5-.6 21.6 21.6 0 0 0 1.6-4.5 19 19 0 0 0 6.3-1.8 8.5 8.5 0 0 1-2.9 6.9z" /></svg>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                          <Globe className="h-3 w-3" />
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                        <button className="bg-[#6344F5] text-white py-1.5 rounded-full text-[9px] font-bold shadow-sm">
                          Save Contact
                        </button>
                        <button className="bg-slate-50 border border-slate-200 text-slate-700 py-1.5 rounded-full text-[9px] font-bold">
                          Message
                        </button>
                      </div>

                      {/* Stats bar */}
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-1.5 flex justify-between text-center shadow-sm">
                        <div>
                          <p className="text-[11px] font-bold text-slate-900">312</p>
                          <p className="text-[7px] text-slate-400">Profile Views</p>
                        </div>
                        <div className="border-x border-slate-200 px-1.5">
                          <p className="text-[11px] font-bold text-slate-900">128</p>
                          <p className="text-[7px] text-slate-400">Card Taps</p>
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-slate-900">89</p>
                          <p className="text-[7px] text-slate-400">Link Clicks</p>
                        </div>
                      </div>

                      {/* About Me */}
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-2 space-y-0.5 text-left shadow-sm">
                        <p className="text-[9px] font-bold text-slate-900">About Me</p>
                        <p className="text-[8px] text-slate-500 leading-tight">
                          Product designer with 5+ years of experience creating user-centric digital experiences. Currently building at OneWinq.
                        </p>
                      </div>

                      {/* Portfolio snippet */}
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-2 space-y-1 text-left shadow-sm">
                        <p className="text-[9px] font-bold text-slate-900">Portfolio</p>
                        <div className="grid grid-cols-3 gap-1">
                          <div className="h-8 rounded bg-slate-200 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80" alt="P1" className="w-full h-full object-cover" />
                          </div>
                          <div className="h-8 rounded bg-slate-200 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=100&q=80" alt="P2" className="w-full h-full object-cover" />
                          </div>
                          <div className="h-8 rounded bg-slate-200 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=100&q=80" alt="P3" className="w-full h-full object-cover" />
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* NOTE: TRUSTED BY SECTION IS OMITTED AS REQUESTED BY USER */}

      {/* ========================================================================= */}
      {/* 2. POWERFUL FEATURES FOR YOUR ENTIRE IDENTITY SECTION */}
      {/* ========================================================================= */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-14">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                Powerful features for your entire identity
              </h2>
            </div>
            <Link 
              to="/features" 
              className="mt-3 sm:mt-0 text-[#6344F5] hover:text-[#5233E0] font-semibold text-sm flex items-center space-x-1.5 group"
            >
              <span>Explore all features</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 6 Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. Digital Profile */}
            <div className="p-8 rounded-2xl bg-[#F8F9FA] border border-slate-100 hover:border-slate-200 transition-all text-left space-y-4 hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-[#F4F0FF] text-[#6344F5] flex items-center justify-center">
                <User className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950">Digital Profile</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Create a beautiful profile that represents you and your work.
              </p>
            </div>

            {/* 2. NFC Card */}
            <div className="p-8 rounded-2xl bg-[#F8F9FA] border border-slate-100 hover:border-slate-200 transition-all text-left space-y-4 hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-[#F4F0FF] text-[#6344F5] flex items-center justify-center">
                <Wifi className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950">NFC Card</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Share instantly with a tap. Works anywhere, on any device.
              </p>
            </div>

            {/* 3. AI Assistant */}
            <div className="p-8 rounded-2xl bg-[#F8F9FA] border border-slate-100 hover:border-slate-200 transition-all text-left space-y-4 hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-[#F4F0FF] text-[#6344F5] flex items-center justify-center">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950">AI Assistant</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Let AI write about you, create summaries and generate content.
              </p>
            </div>

            {/* 4. Analytics */}
            <div className="p-8 rounded-2xl bg-[#F8F9FA] border border-slate-100 hover:border-slate-200 transition-all text-left space-y-4 hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-[#F4F0FF] text-[#6344F5] flex items-center justify-center">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950">Analytics</h3>
              <p className="text-slate-[#64748B] text-sm leading-relaxed">
                Track views, taps, clicks and connections in real time.
              </p>
            </div>

            {/* 5. Universal Profile */}
            <div className="p-8 rounded-2xl bg-[#F8F9FA] border border-slate-100 hover:border-slate-200 transition-all text-left space-y-4 hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-[#F4F0FF] text-[#6344F5] flex items-center justify-center">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950">Universal Profile</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                One link for everything. Works globally, across every platform.
              </p>
            </div>

            {/* 6. Beautiful Templates */}
            <div className="p-8 rounded-2xl bg-[#F8F9FA] border border-slate-100 hover:border-slate-200 transition-all text-left space-y-4 hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-[#F4F0FF] text-[#6344F5] flex items-center justify-center">
                <Palette className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950">Beautiful Templates</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Professionally designed templates for every profession.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. YOUR IDENTITY. YOUR WAY. (TEMPLATES SHOWCASE) */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#FAFAFC] border-t border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Your identity. Your way.
          </h2>
          <p className="text-slate-500 text-base mt-2">
            Beautiful templates that help you stand out.
          </p>

          {/* Controls: Mode Switch & Category Filter Pills */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
            
            {/* Light / Dark Mode Toggle */}
            <div className="inline-flex bg-white border border-slate-200 rounded-full p-1 shadow-sm">
              <button 
                onClick={() => setThemeMode('light')}
                className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  themeMode === 'light' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Sun className="h-3.5 w-3.5" />
                <span>Light Mode</span>
              </button>
              <button 
                onClick={() => setThemeMode('dark')}
                className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  themeMode === 'dark' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Moon className="h-3.5 w-3.5" />
                <span>Dark Mode</span>
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center items-center gap-2">
              {['Business', 'Founder', 'Developer', 'Designer', 'Student'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === cat 
                      ? 'bg-[#6344F5] text-white shadow-md shadow-[#6344F5]/25' 
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
              
              <Link to="/features" className="text-[#6344F5] font-semibold text-xs flex items-center space-x-1 ml-2">
                <span>View all templates</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

          </div>

          {/* TEMPLATE MOCKUP CAROUSEL */}
          <div className="relative mt-10 sm:mt-14 flex items-center justify-center px-4 sm:px-0">
            
            {/* Left Navigation Arrow */}
            <button 
              onClick={handlePrevTemplate}
              className="absolute left-0 sm:left-2 lg:left-12 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-lg flex items-center justify-center text-slate-700 hover:text-[#6344F5] hover:scale-105 transition-all cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Mockups Container */}
            <div className="flex items-center justify-center space-x-4 md:space-x-6 overflow-hidden py-6 sm:py-8 max-w-full">
              {templateProfiles.map((prof, idx) => {
                const isCenter = idx === carouselIndex;

                return (
                  <div
                    key={prof.id}
                    onClick={() => setCarouselIndex(idx)}
                    className={`transition-all duration-300 cursor-pointer select-none ${
                      isCenter
                        ? 'scale-100 sm:scale-105 z-20 opacity-100 shadow-2xl ring-4 ring-[#6344F5]/30 rounded-[38px]'
                        : 'scale-90 opacity-60 hover:opacity-80 z-10 hidden sm:block'
                    }`}
                  >
                    <div className={`w-[210px] min-[360px]:w-[220px] sm:w-[245px] h-[440px] sm:h-[460px] rounded-[38px] p-2.5 border-4 border-slate-800 ${
                      themeMode === 'dark' ? 'bg-slate-900 text-white' : 'bg-slate-950'
                    } shadow-xl relative`}>
                      
                      {/* Top Notch */}
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full z-30"></div>

                      {/* Phone Screen */}
                      <div className={`w-full h-full rounded-[28px] overflow-hidden p-4 flex flex-col justify-between ${
                        themeMode === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
                      }`}>
                        
                        <div className="pt-4 text-center flex flex-col items-center space-y-2">
                          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                            <img src={prof.avatar} alt={prof.name} className="w-full h-full object-cover" />
                          </div>

                          <div>
                            <h4 className="font-bold text-sm leading-tight">{prof.name}</h4>
                            <p className="text-[10px] text-slate-400 font-medium">{prof.title}</p>
                          </div>

                          <div className="flex space-x-1.5 pt-1">
                            <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                              <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                            </div>
                            <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                              <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            </div>
                            <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                              <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                            </div>
                          </div>

                          <div className="w-full grid grid-cols-2 gap-1.5 pt-2">
                            <button className="bg-[#6344F5] text-white py-1 rounded-full text-[9px] font-bold">
                              Save Contact
                            </button>
                            <button className="border border-slate-200 py-1 rounded-full text-[9px] font-bold">
                              Message
                            </button>
                          </div>
                        </div>

                        {/* Stats inside phone */}
                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-2 flex justify-between text-center text-slate-900">
                          <div>
                            <p className="text-[11px] font-bold">{prof.views}</p>
                            <p className="text-[7px] text-slate-400">Views</p>
                          </div>
                          <div className="border-x border-slate-200 px-2">
                            <p className="text-[11px] font-bold">{prof.taps}</p>
                            <p className="text-[7px] text-slate-400">Taps</p>
                          </div>
                          <div>
                            <p className="text-[11px] font-bold">{prof.clicks}</p>
                            <p className="text-[7px] text-slate-400">Clicks</p>
                          </div>
                        </div>

                        <div className="text-left space-y-1">
                          <p className="text-[9px] font-bold">About me</p>
                          <p className="text-[8px] text-slate-400 leading-tight">
                            Passionate professional building innovative digital experiences with OneWinq identity suite.
                          </p>
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Navigation Arrow */}
            <button 
              onClick={handleNextTemplate}
              className="absolute right-0 sm:right-2 lg:right-12 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-lg flex items-center justify-center text-slate-700 hover:text-[#6344F5] hover:scale-105 transition-all cursor-pointer"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. HOW ONEWINQ WORKS */}
      {/* ========================================================================= */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            How OneWinq works
          </h2>
          <p className="text-slate-500 text-base mt-2">
            Create. Connect. Share. Grow.
          </p>

          {/* 5 Steps Flow with Horizontal Connector Line */}
          <div className="relative mt-16">
            
            {/* Horizontal Connector Line on Desktop */}
            <div className="hidden lg:block absolute top-7 left-[8%] right-[8%] h-0.5 border-t-2 border-dashed border-slate-200 z-0"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
              
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#F4F0FF] text-[#6344F5] border-4 border-white shadow-md flex items-center justify-center font-bold">
                  <User className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-950 text-sm">1. Create Profile</h3>
                <p className="text-xs text-slate-500 max-w-[180px]">
                  Build your digital identity in minutes.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#F4F0FF] text-[#6344F5] border-4 border-white shadow-md flex items-center justify-center font-bold">
                  <Edit3 className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-950 text-sm">2. Customize</h3>
                <p className="text-xs text-slate-500 max-w-[180px]">
                  Choose templates, add your links and details.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#F4F0FF] text-[#6344F5] border-4 border-white shadow-md flex items-center justify-center font-bold">
                  <Wifi className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-950 text-sm">3. Connect NFC</h3>
                <p className="text-xs text-slate-500 max-w-[180px]">
                  Link your profile with your OneWinq NFC card.
                </p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#F4F0FF] text-[#6344F5] border-4 border-white shadow-md flex items-center justify-center font-bold">
                  <Smartphone className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-950 text-sm">4. Tap to Share</h3>
                <p className="text-xs text-slate-500 max-w-[180px]">
                  Tap your card or share your link anywhere.
                </p>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#F4F0FF] text-[#6344F5] border-4 border-white shadow-md flex items-center justify-center font-bold">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-950 text-sm">5. You're Done!</h3>
                <p className="text-xs text-slate-500 max-w-[180px]">
                  Start sharing and growing your connections.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. BUILT FOR EVERY PROFESSIONAL */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#FAFAFC] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                Built for every professional
              </h2>
            </div>
            <Link 
              to="/features" 
              className="mt-3 sm:mt-0 text-[#6344F5] hover:text-[#5233E0] font-semibold text-sm flex items-center space-x-1.5 group"
            >
              <span>See all use cases</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 6 Profession Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Founder */}
            <div className="p-7 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 transition-all text-left space-y-3 shadow-sm hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-[#F4F0FF] text-[#6344F5] flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-950">Founder</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Build your personal brand and connect with investors.
              </p>
            </div>

            {/* Card 2: Freelancer */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 transition-all text-left space-y-3 shadow-sm hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-[#F4F0FF] text-[#6344F5] flex items-center justify-center">
                <Laptop className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-950">Freelancer</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Share your portfolio and get more clients.
              </p>
            </div>

            {/* Card 3: Employee */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 transition-all text-left space-y-3 shadow-sm hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-[#F4F0FF] text-[#6344F5] flex items-center justify-center">
                <Briefcase className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-950">Employee</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Network internally and represent your work.
              </p>
            </div>

            {/* Card 4: Student */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 transition-all text-left space-y-3 shadow-sm hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-[#F4F0FF] text-[#6344F5] flex items-center justify-center">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-950">Student</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Showcase your projects and achievements.
              </p>
            </div>

            {/* Card 5: Company */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 transition-all text-left space-y-3 shadow-sm hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-[#F4F0FF] text-[#6344F5] flex items-center justify-center">
                <Building2 className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-950">Company</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Manage your team and share company profile.
              </p>
            </div>

            {/* Card 6: Creator */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 transition-all text-left space-y-3 shadow-sm hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-[#F4F0FF] text-[#6344F5] flex items-center justify-center">
                <Camera className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-950">Creator</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Share your content and grow your audience.
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;

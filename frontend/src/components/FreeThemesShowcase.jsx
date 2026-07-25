import React from 'react';
import { 
  User, Mail, Phone, MessageSquare, MapPin, Download, Check, ArrowRight,
  Sparkles, ShieldCheck, BarChart2, Globe, CheckCircle2, Menu, Share2, Signal, Wifi, Battery
} from 'lucide-react';
import Logo from './Logo';

const FreeThemesShowcase = ({ onSelectTemplate, activeTemplateId }) => {
  // Demo mock profiles
  const novaProfile = {
    name: 'Alisha Batham',
    designation: 'Full Stack Developer',
    about: 'I build modern, responsive and scalable web applications with a focus on great user experience.',
    detailAbout: 'Passionate developer skilled in MERN stack. I love turning ideas into real-world products.',
    experience: '2+ Years',
    skillsCount: '12+ Skills',
    projectsCount: '6+ Projects',
    education: 'B.Tech CSE',
  };

  const obsidianProfile = {
    name: 'Rohit Sharma',
    designation: 'Full Stack Developer',
    about: 'Building digital products that solve real-world problems.',
    detailAbout: 'MERN Stack Developer who loves clean code and great design.',
    experience: '3+ Years',
    skillsCount: '15+ Skills',
    projectsCount: '8+ Projects',
    education: 'B.Tech CSE',
  };

  return (
    <div className="w-full bg-slate-950 text-white rounded-3xl p-4 sm:p-8 shadow-2xl border border-slate-800 space-y-8 font-outfit text-left">
      
      {/* Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="bg-indigo-600 text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block shadow-sm shadow-indigo-600/30">
            FREE PLAN INCLUDED
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            2 Free Themes <span className="text-indigo-400">Unlocked</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Beautiful. Minimal. Professional. Click to select & apply to your profile.
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end">
          <Logo className="h-7 text-white" />
          <span className="text-xs text-slate-400 mt-1">Your Digital Identity, Reimagined.</span>
        </div>
      </div>

      {/* 2 Themes Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Theme 1: Simple (Light & Clean) */}
        <div className={`bg-slate-900/90 border rounded-3xl p-5 sm:p-6 flex flex-col space-y-6 text-left transition-all ${
          activeTemplateId === 'nova' ? 'border-2 border-indigo-500 shadow-xl shadow-indigo-500/10' : 'border-slate-800'
        }`}>
          
          {/* Top Badge & Header */}
          <div className="flex items-center justify-between">
            <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              THEME 1 • FREE UNLOCKED
            </span>
            {onSelectTemplate && (
              <button
                onClick={() => onSelectTemplate('nova')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTemplateId === 'nova' 
                    ? 'bg-emerald-500 text-slate-950 shadow-md' 
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                }`}
              >
                {activeTemplateId === 'nova' ? '✓ Active Theme' : 'Apply Simple Theme'}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            
            {/* Phone Card Mockup (Light Mode) */}
            <div className="sm:col-span-6 flex justify-center">
              <div className="w-full max-w-[240px] bg-slate-50 text-slate-900 rounded-3xl p-3.5 shadow-2xl border border-slate-200 text-left">
                {/* Status bar */}
                <div className="flex items-center justify-between text-[9px] font-bold text-slate-700 mb-2">
                  <span>9:41</span>
                  <div className="flex items-center space-x-1">
                    <Signal className="h-2.5 w-2.5" />
                    <Wifi className="h-2.5 w-2.5" />
                    <Battery className="h-2.5 w-2.5" />
                  </div>
                </div>

                {/* Nav Header */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 mb-2.5 text-slate-700">
                  <Menu className="h-3.5 w-3.5" />
                  <Share2 className="h-3 w-3" />
                </div>

                {/* Avatar */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="h-14 w-14 rounded-full bg-slate-200 border-2 border-indigo-200 overflow-hidden shadow-sm flex items-center justify-center">
                      <User className="h-7 w-7 text-indigo-500" />
                    </div>
                    <div className="absolute bottom-0 right-0 bg-indigo-600 text-white p-0.5 rounded-full border border-white">
                      <CheckCircle2 className="h-2.5 w-2.5 fill-white text-indigo-600" />
                    </div>
                  </div>
                  
                  <h3 className="text-xs font-extrabold mt-1.5 text-slate-900">{novaProfile.name}</h3>
                  <p className="text-[9px] font-bold text-indigo-600">{novaProfile.designation}</p>
                  <p className="text-[8px] text-slate-500 mt-1 leading-tight max-w-[170px]">
                    {novaProfile.about}
                  </p>
                </div>

                {/* 4 Action Buttons */}
                <div className="grid grid-cols-4 gap-1 mt-2.5">
                  <div className="bg-slate-200/80 p-1 rounded-xl flex flex-col items-center text-[7px] font-semibold text-slate-700">
                    <Mail className="h-2.5 w-2.5 text-indigo-600 mb-0.5" />
                    <span>Email</span>
                  </div>
                  <div className="bg-slate-200/80 p-1 rounded-xl flex flex-col items-center text-[7px] font-semibold text-slate-700">
                    <Phone className="h-2.5 w-2.5 text-purple-600 mb-0.5" />
                    <span>Call</span>
                  </div>
                  <div className="bg-slate-200/80 p-1 rounded-xl flex flex-col items-center text-[7px] font-semibold text-slate-700">
                    <MessageSquare className="h-2.5 w-2.5 text-emerald-600 mb-0.5" />
                    <span>WhatsApp</span>
                  </div>
                  <div className="bg-slate-200/80 p-1 rounded-xl flex flex-col items-center text-[7px] font-semibold text-slate-700">
                    <MapPin className="h-2.5 w-2.5 text-blue-600 mb-0.5" />
                    <span>Location</span>
                  </div>
                </div>

                {/* About Me */}
                <div className="bg-white p-2 rounded-xl border border-slate-200 mt-2">
                  <div className="flex items-center justify-between text-[8px] font-bold text-slate-800">
                    <span>About Me</span>
                    <span className="text-indigo-600">View More</span>
                  </div>
                  <p className="text-[7.5px] text-slate-500 mt-0.5 leading-tight">
                    {novaProfile.detailAbout}
                  </p>
                </div>

                {/* Info Rows */}
                <div className="bg-white p-2 rounded-xl border border-slate-200 mt-2 space-y-1 text-[7.5px] text-slate-700">
                  <div className="flex justify-between">
                    <span className="opacity-75">💼 Experience</span>
                    <span className="font-bold">{novaProfile.experience}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-100 pt-0.5">
                    <span className="opacity-75">🛠️ Skills</span>
                    <span className="font-bold">{novaProfile.skillsCount}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-100 pt-0.5">
                    <span className="opacity-75">📁 Projects</span>
                    <span className="font-bold">{novaProfile.projectsCount}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-100 pt-0.5">
                    <span className="opacity-75">🎓 Education</span>
                    <span className="font-bold">{novaProfile.education}</span>
                  </div>
                </div>

                {/* Download CTA */}
                <button className="w-full bg-indigo-600 text-white font-bold text-[8px] py-1.5 rounded-xl mt-2 flex items-center justify-center space-x-1 shadow-sm">
                  <Download className="h-2 w-2" />
                  <span>Download Resume ⬇</span>
                </button>
              </div>
            </div>

            {/* Theme Meta Info */}
            <div className="sm:col-span-6 space-y-4 text-left">
              <div>
                <h3 className="text-2xl font-extrabold text-white">Simple</h3>
                <p className="text-xs font-bold text-indigo-400 mt-0.5">Light & Clean Theme</p>
              </div>
              
              <p className="text-xs text-slate-300 leading-relaxed">
                A minimal light theme with a clean layout, crisp typography, and soft indigo accents.
              </p>

              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Best For</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="bg-slate-800 text-slate-200 border border-slate-700 px-2 py-0.5 rounded-lg text-[10px] font-semibold">Students</span>
                  <span className="bg-slate-800 text-slate-200 border border-slate-700 px-2 py-0.5 rounded-lg text-[10px] font-semibold">Professionals</span>
                  <span className="bg-slate-800 text-slate-200 border border-slate-700 px-2 py-0.5 rounded-lg text-[10px] font-semibold">Freshers</span>
                  <span className="bg-slate-800 text-slate-200 border border-slate-700 px-2 py-0.5 rounded-lg text-[10px] font-semibold">Everyone</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Highlights</span>
                <ul className="space-y-1 text-xs text-slate-300">
                  <li className="flex items-center space-x-2 text-indigo-300 font-medium">
                    <Check className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                    <span>Light & Clean Design</span>
                  </li>
                  <li className="flex items-center space-x-2 text-indigo-300 font-medium">
                    <Check className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                    <span>Easy to Read</span>
                  </li>
                  <li className="flex items-center space-x-2 text-indigo-300 font-medium">
                    <Check className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                    <span>Perfect for All Professions</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>

        </div>

        {/* Theme 2: Classic (Dark & Modern) */}
        <div className={`bg-slate-900/90 border rounded-3xl p-5 sm:p-6 flex flex-col space-y-6 text-left transition-all ${
          activeTemplateId === 'classic' ? 'border-2 border-indigo-500 shadow-xl shadow-indigo-500/10' : 'border-slate-800'
        }`}>
          
          {/* Top Badge & Header */}
          <div className="flex items-center justify-between">
            <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              THEME 2 • FREE UNLOCKED
            </span>
            {onSelectTemplate && (
              <button
                onClick={() => onSelectTemplate('classic')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTemplateId === 'classic' 
                    ? 'bg-emerald-500 text-slate-950 shadow-md' 
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                }`}
              >
                {activeTemplateId === 'classic' ? '✓ Active Theme' : 'Apply Classic Theme'}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            
            {/* Phone Card Mockup (Dark Mode) */}
            <div className="sm:col-span-6 flex justify-center">
              <div className="w-full max-w-[240px] bg-slate-950 text-white rounded-3xl p-3.5 shadow-2xl border border-slate-800 text-left">
                {/* Status bar */}
                <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 mb-2">
                  <span>9:41</span>
                  <div className="flex items-center space-x-1">
                    <Signal className="h-2.5 w-2.5" />
                    <Wifi className="h-2.5 w-2.5" />
                    <Battery className="h-2.5 w-2.5" />
                  </div>
                </div>

                {/* Nav Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2.5 text-slate-400">
                  <Menu className="h-3.5 w-3.5" />
                  <Share2 className="h-3 w-3" />
                </div>

                {/* Avatar */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="h-14 w-14 rounded-full bg-slate-800 border-2 border-indigo-500/40 overflow-hidden shadow-sm flex items-center justify-center">
                      <User className="h-7 w-7 text-indigo-400" />
                    </div>
                    <div className="absolute bottom-0 right-0 bg-indigo-600 text-white p-0.5 rounded-full border border-slate-900">
                      <CheckCircle2 className="h-2.5 w-2.5 fill-white text-indigo-600" />
                    </div>
                  </div>
                  
                  <h3 className="text-xs font-extrabold mt-1.5 text-white">{obsidianProfile.name}</h3>
                  <p className="text-[9px] font-bold text-indigo-400">{obsidianProfile.designation}</p>
                  <p className="text-[8px] text-slate-400 mt-1 leading-tight max-w-[170px]">
                    {obsidianProfile.about}
                  </p>
                </div>

                {/* 4 Action Buttons */}
                <div className="grid grid-cols-4 gap-1 mt-2.5">
                  <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex flex-col items-center text-[7px] font-semibold text-slate-300">
                    <Mail className="h-2.5 w-2.5 text-indigo-400 mb-0.5" />
                    <span>Email</span>
                  </div>
                  <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex flex-col items-center text-[7px] font-semibold text-slate-300">
                    <Phone className="h-2.5 w-2.5 text-purple-400 mb-0.5" />
                    <span>Call</span>
                  </div>
                  <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex flex-col items-center text-[7px] font-semibold text-slate-300">
                    <MessageSquare className="h-2.5 w-2.5 text-emerald-400 mb-0.5" />
                    <span>WhatsApp</span>
                  </div>
                  <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex flex-col items-center text-[7px] font-semibold text-slate-300">
                    <MapPin className="h-2.5 w-2.5 text-blue-400 mb-0.5" />
                    <span>Location</span>
                  </div>
                </div>

                {/* About Me */}
                <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 mt-2">
                  <div className="flex items-center justify-between text-[8px] font-bold text-slate-200">
                    <span>About Me</span>
                    <span className="text-indigo-400">View More</span>
                  </div>
                  <p className="text-[7.5px] text-slate-400 mt-0.5 leading-tight">
                    {obsidianProfile.detailAbout}
                  </p>
                </div>

                {/* Info Rows */}
                <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 mt-2 space-y-1 text-[7.5px] text-slate-300">
                  <div className="flex justify-between">
                    <span className="opacity-75">💼 Experience</span>
                    <span className="font-bold">{obsidianProfile.experience}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-800 pt-0.5">
                    <span className="opacity-75">🛠️ Skills</span>
                    <span className="font-bold">{obsidianProfile.skillsCount}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-800 pt-0.5">
                    <span className="opacity-75">📁 Projects</span>
                    <span className="font-bold">{obsidianProfile.projectsCount}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-800 pt-0.5">
                    <span className="opacity-75">🎓 Education</span>
                    <span className="font-bold">{obsidianProfile.education}</span>
                  </div>
                </div>

                {/* Download CTA */}
                <button className="w-full bg-indigo-600 text-white font-bold text-[8px] py-1.5 rounded-xl mt-2 flex items-center justify-center space-x-1 shadow-sm">
                  <Download className="h-2 w-2" />
                  <span>Download Resume ⬇</span>
                </button>
              </div>
            </div>

            {/* Theme Meta Info */}
            <div className="sm:col-span-6 space-y-4 text-left">
              <div>
                <h3 className="text-2xl font-extrabold text-white">Classic</h3>
                <p className="text-xs font-bold text-indigo-400 mt-0.5">Dark & Modern Theme</p>
              </div>
              
              <p className="text-xs text-slate-300 leading-relaxed">
                A modern dark theme with elegant contrast, high visibility, and bold accents.
              </p>

              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Best For</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="bg-slate-800 text-slate-200 border border-slate-700 px-2 py-0.5 rounded-lg text-[10px] font-semibold">Developers</span>
                  <span className="bg-slate-800 text-slate-200 border border-slate-700 px-2 py-0.5 rounded-lg text-[10px] font-semibold">Designers</span>
                  <span className="bg-slate-800 text-slate-200 border border-slate-700 px-2 py-0.5 rounded-lg text-[10px] font-semibold">Creators</span>
                  <span className="bg-slate-800 text-slate-200 border border-slate-700 px-2 py-0.5 rounded-lg text-[10px] font-semibold">Freelancers</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Highlights</span>
                <ul className="space-y-1 text-xs text-slate-300">
                  <li className="flex items-center space-x-2 text-indigo-300 font-medium">
                    <Check className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                    <span>Dark & Elegant Design</span>
                  </li>
                  <li className="flex items-center space-x-2 text-indigo-300 font-medium">
                    <Check className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                    <span>Great Contrast</span>
                  </li>
                  <li className="flex items-center space-x-2 text-indigo-300 font-medium">
                    <Check className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                    <span>Modern & Professional</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Upgrade to Pro Banner Bar */}
      <div className="bg-gradient-to-r from-indigo-900/40 via-purple-900/40 to-slate-900 border border-indigo-500/30 rounded-2xl p-4 sm:p-6 flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* Left CTA Trigger */}
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/30">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h4 className="font-extrabold text-base text-white">Upgrade to Pro</h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Unlock premium templates, advanced features, AI tools and much more.
            </p>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
          <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl text-left">
            <h5 className="text-[11px] font-bold text-indigo-400 flex items-center space-x-1">
              <span>🎨 Premium Themes</span>
            </h5>
            <p className="text-[9px] text-slate-400 mt-0.5">Access beautiful premium templates.</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl text-left">
            <h5 className="text-[11px] font-bold text-indigo-400 flex items-center space-x-1">
              <span>✨ AI Tools</span>
            </h5>
            <p className="text-[9px] text-slate-400 mt-0.5">Unlimited AI bio & content generation.</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl text-left">
            <h5 className="text-[11px] font-bold text-indigo-400 flex items-center space-x-1">
              <span>📊 Advanced Analytics</span>
            </h5>
            <p className="text-[9px] text-slate-400 mt-0.5">Detailed visitor Insights.</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl text-left">
            <h5 className="text-[11px] font-bold text-indigo-400 flex items-center space-x-1">
              <span>🛡️ Custom Branding</span>
            </h5>
            <p className="text-[9px] text-slate-400 mt-0.5">Custom domain & zero ads.</p>
          </div>
        </div>

      </div>

      {/* Upgrade to Pro Banner Bar */}
      <div className="bg-gradient-to-r from-indigo-900/40 via-purple-900/40 to-slate-900 border border-indigo-500/30 rounded-2xl p-4 sm:p-6 flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* Left CTA Trigger */}
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/30">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h4 className="font-extrabold text-base text-white">Upgrade to Pro</h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Unlock premium templates, advanced features, AI tools and much more.
            </p>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
          <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl text-left">
            <h5 className="text-[11px] font-bold text-indigo-400 flex items-center space-x-1">
              <span>🎨 Premium Themes</span>
            </h5>
            <p className="text-[9px] text-slate-400 mt-0.5">Access beautiful premium templates.</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl text-left">
            <h5 className="text-[11px] font-bold text-indigo-400 flex items-center space-x-1">
              <span>✨ AI Tools</span>
            </h5>
            <p className="text-[9px] text-slate-400 mt-0.5">Unlimited AI bio & content generation.</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl text-left">
            <h5 className="text-[11px] font-bold text-indigo-400 flex items-center space-x-1">
              <span>📊 Advanced Analytics</span>
            </h5>
            <p className="text-[9px] text-slate-400 mt-0.5">Detailed visitor Insights.</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl text-left">
            <h5 className="text-[11px] font-bold text-indigo-400 flex items-center space-x-1">
              <span>🛡️ Custom Branding</span>
            </h5>
            <p className="text-[9px] text-slate-400 mt-0.5">Custom domain & zero ads.</p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default FreeThemesShowcase;

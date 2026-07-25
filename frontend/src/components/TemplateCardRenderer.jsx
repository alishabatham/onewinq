import React, { useState } from 'react';
import { 
  Phone, Mail, Globe, Download, User, Check,
  Share2, ArrowRight, MoreHorizontal, MapPin, Smartphone, Sparkles, Star
} from 'lucide-react';
import { usePWA } from '../context/PWAContext';

const TemplateCardRenderer = ({ 
  profile: rawProfile, 
  templateIdOverride, 
  onSaveContact,
  isPreview = false 
}) => {
  const { triggerInstall, isInstalled } = usePWA();

  const selectedTemplateId = templateIdOverride || rawProfile?.templateId || 'obsidian';
  const isLightMode = selectedTemplateId === 'nova';

  const profile = {
    name: rawProfile?.name || 'Rajat Chaturvedi',
    designation: rawProfile?.designation || 'Founder & CEO',
    companyName: rawProfile?.companyName || 'OneWinq',
    tagline: rawProfile?.tagline || 'Building digital identity solutions that help individuals and businesses connect, share and grow.',
    about: rawProfile?.about || "I'm passionate about creating meaningful digital experiences. OneWinq is my vision to make identity sharing seamless, professional and future-ready. I believe in simplicity, innovation and impact.",
    mobile: rawProfile?.mobile || '+91 12345 67890',
    email: rawProfile?.email || 'rajat@onewinq.com',
    website: rawProfile?.website || rawProfile?.company?.website || 'www.onewinq.com',
    whatsApp: rawProfile?.whatsApp || '+91 12345 67890',
    address: rawProfile?.address || 'Indore, India',
    profilePhoto: rawProfile?.profilePhoto || null,
    experience: rawProfile?.experience || '5+',
    companiesBuilt: rawProfile?.companiesBuilt || '3',
    connectionsCount: rawProfile?.connectionsCount || '10K+',
    socialLinks: {
      linkedIn: rawProfile?.socialLinks?.linkedIn || 'https://linkedin.com',
      instagram: rawProfile?.socialLinks?.instagram || 'https://instagram.com',
      twitter: rawProfile?.socialLinks?.twitter || 'https://x.com',
      youtube: rawProfile?.socialLinks?.youtube || 'https://youtube.com',
      website: rawProfile?.website || 'https://onewinq.com',
      ...rawProfile?.socialLinks
    },
    ...rawProfile
  };

  const cleanPhone = (num) => {
    if (!num) return '';
    return num.replace(/[^+\d]/g, '');
  };

  const handleShareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: `${profile.name} | OneWinq`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Profile link copied to clipboard!');
    }
  };

  // What I Do items
  const whatIDoList = (profile.services && profile.services.length > 0)
    ? profile.services
    : [
        {
          title: 'Digital Identity',
          description: 'Helping people build and share their digital identity.',
        },
        {
          title: 'Product Builder',
          description: 'Building products that solve real problems.',
        },
        {
          title: 'Speaker',
          description: 'Sharing knowledge at events and podcasts.',
        },
        {
          title: 'Mentor',
          description: 'Guiding founders and early stage startups.',
        }
      ];

  // Featured Work Items
  const defaultWork = [
    {
      title: 'OneWinq',
      subtitle: 'Digital Identity Platform',
      tag: 'Product',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      link: profile.website || 'https://onewinq.com',
    },
    {
      title: 'Campus OS',
      subtitle: 'College Management Platform',
      tag: 'Product',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      link: '',
    },
    {
      title: 'Tastyana',
      subtitle: 'All in One Delivery Platform',
      tag: 'Product',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
      link: '',
    },
  ];

  const workList = (profile.featuredWork && profile.featuredWork.some(w => w.title || w.image))
    ? profile.featuredWork.filter(w => w.title || w.image || w.description)
    : defaultWork;

  // Experience Timeline List
  const experienceTimeline = [
    {
      period: '2022 - Present',
      role: 'Founder & CEO',
      company: 'OneWinq Technologies',
      desc: 'Building digital identity solutions for individuals and businesses.',
    },
    {
      period: '2021 - 2022',
      role: 'Product Developer',
      company: 'NexiSparkX Technologies',
      desc: 'Worked on multiple digital products and client solutions.',
    },
    {
      period: '2020 - 2021',
      role: 'Frontend Developer',
      company: 'Freelance',
      desc: 'Built websites and web apps for multiple brands.',
    },
  ];

  // Achievements List
  const achievements = [
    {
      title: 'Top 30 Under 30',
      subtitle: 'Digital India',
      year: '2023',
    },
    {
      title: 'Best Startup',
      subtitle: 'Tech Summit',
      year: '2022',
    },
    {
      title: 'Featured in',
      subtitle: 'YourStory',
      year: '2022',
    },
    {
      title: '100K+ Users',
      subtitle: 'OneWinq Platform',
      year: '2024',
    }
  ];

  return (
    <div className={`min-h-screen font-outfit text-left relative ${
      isLightMode 
        ? 'bg-slate-100 text-slate-900 selection:bg-indigo-600 selection:text-white' 
        : 'bg-[#050713] text-slate-100 selection:bg-purple-600 selection:text-white'
    }`}>
      
      {/* Background Ambient Glow Effects */}
      {!isLightMode && (
        <>
          <div className="fixed top-10 left-1/3 w-96 h-96 bg-[#6344F5]/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="fixed bottom-20 right-1/4 w-80 h-80 bg-[#A855F7]/10 rounded-full blur-[100px] pointer-events-none"></div>
        </>
      )}

      {/* Outer Card Frame (Responsive Container) */}
      <div className={`w-full max-w-md sm:max-w-xl mx-auto min-h-screen relative flex flex-col justify-between space-y-5 sm:space-y-6 p-3.5 sm:p-6 transition-all ${
        isLightMode
          ? 'bg-white border-x border-slate-200 text-slate-900 shadow-xl'
          : 'bg-[#0b0e20]/90 backdrop-blur-xl border-x border-white/10 text-slate-100 shadow-[0_0_60px_rgba(0,0,0,0.9)]'
      }`}>
        
        {/* ==================== 1. TOP NAVBAR ==================== */}
        <header className="flex items-center justify-between py-2 gap-2">
          {/* Logo */}
          <div className="flex items-center space-x-1.5 shrink-0">
            <span className={`text-base sm:text-xl font-black tracking-tight ${
              isLightMode ? 'text-slate-900' : 'bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent'
            }`}>
              OneWinq
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
              PRO
            </span>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            {!isInstalled && (
              <button
                onClick={() => !isPreview && triggerInstall()}
                className={`h-8 px-2.5 sm:px-3 rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer text-xs font-semibold ${
                  isLightMode
                    ? 'bg-indigo-50 text-[#6344F5] border border-indigo-200 hover:bg-indigo-100'
                    : 'bg-[#151938] text-indigo-300 border border-indigo-500/30 hover:bg-[#1e234c] shadow-sm'
                }`}
                title="Download App Icon to Phone Home Screen"
              >
                <Smartphone className="h-3.5 w-3.5 text-[#863BFF]" />
                <span className="hidden xs:inline">App Icon</span>
              </button>
            )}

            <button
              onClick={() => {
                if (isPreview) return;
                if (onSaveContact) onSaveContact();
              }}
              className={`text-xs sm:text-sm font-extrabold px-3 sm:px-4 py-2 rounded-xl transition-all cursor-pointer shadow-md ${
                isLightMode
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'bg-gradient-to-r from-[#6344F5] via-[#863BFF] to-[#A855F7] hover:brightness-110 text-white shadow-[#6344F5]/35 hover:scale-102'
              }`}
            >
              Save Contact
            </button>

            <button
              onClick={handleShareProfile}
              className={`h-8 w-8 sm:h-9 sm:w-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                isLightMode
                  ? 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900'
                  : 'bg-[#151938] border border-white/10 text-slate-300 hover:text-white hover:bg-[#1e234c]'
              }`}
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* ==================== 2. HERO PROFILE CARD ==================== */}
        <section className={`rounded-3xl p-5 sm:p-6 relative overflow-hidden border transition-all ${
          isLightMode 
            ? 'bg-gradient-to-br from-indigo-50/70 via-slate-50 to-purple-50/50 border-slate-200 shadow-md' 
            : 'bg-gradient-to-br from-[#141838]/90 via-[#10132e]/95 to-[#0b0e24]/90 border-purple-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
        }`}>
          {/* Subtle Accent Glow */}
          {!isLightMode && (
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-full blur-2xl pointer-events-none"></div>
          )}

          {/* Profile Header Row: SQUARE Avatar + Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-5 text-center sm:text-left relative z-10">
            
            {/* SQUARE Avatar Photo with Glow Ring & Green Online Status */}
            <div className="relative shrink-0">
              <div className={`p-1 sm:p-1.5 rounded-2xl sm:rounded-3xl transition-all ${
                isLightMode
                  ? 'bg-indigo-100 border-2 border-indigo-500/40 shadow-sm'
                  : 'bg-gradient-to-tr from-[#6344F5] via-[#A855F7] to-[#EC4899] p-[2px] shadow-[0_0_30px_rgba(134,59,255,0.4)]'
              }`}>
                <div className={`h-24 w-24 sm:h-28 sm:w-28 rounded-xl sm:rounded-2xl overflow-hidden flex items-center justify-center ${
                  isLightMode ? 'bg-slate-100' : 'bg-[#090b1a]'
                }`}>
                  {profile.profilePhoto ? (
                    <img src={profile.profilePhoto} alt={profile.name} className="h-full w-full object-cover rounded-xl sm:rounded-2xl" />
                  ) : (
                    <User className={`h-12 w-12 ${isLightMode ? 'text-indigo-400' : 'text-slate-500'}`} />
                  )}
                </div>
              </div>
              {/* Online Green Indicator Dot */}
              <div className="h-4 w-4 rounded-full bg-emerald-400 border-2 border-[#0b0e24] absolute -bottom-1 -right-1 shadow-[0_0_10px_rgba(52,211,153,0.8)]"></div>
            </div>

            {/* Profile Info Details */}
            <div className="space-y-1.5 flex-1 min-w-0 pt-0.5">
              <div className="flex items-center justify-center sm:justify-start space-x-2 flex-wrap">
                <h1 className={`text-2xl sm:text-3xl font-black tracking-tight truncate ${
                  isLightMode ? 'text-slate-900' : 'text-white'
                }`}>
                  {profile.name}
                </h1>
                {/* Verified Checkmark Badge */}
                <div className="h-4 w-4 rounded-full bg-gradient-to-r from-[#6344F5] to-[#A855F7] flex items-center justify-center text-white text-[9px] shrink-0 shadow-sm">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </div>
              </div>

              <p className={`text-xs sm:text-sm font-extrabold ${
                isLightMode ? 'text-indigo-600' : 'bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent'
              }`}>
                {profile.designation}{profile.companyName ? `, ${profile.companyName}` : ''}
              </p>

              <p className={`text-xs leading-relaxed font-normal pt-1 line-clamp-3 ${
                isLightMode ? 'text-slate-600' : 'text-slate-300'
              }`}>
                {profile.tagline || profile.about}
              </p>

              {profile.address && (
                <div className="pt-1 flex items-center justify-center sm:justify-start">
                  <span className={`inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
                    isLightMode 
                      ? 'bg-slate-200/80 text-slate-700' 
                      : 'bg-white/5 border border-white/10 text-slate-300 backdrop-blur-md'
                  }`}>
                    <MapPin className={`h-3.5 w-3.5 ${isLightMode ? 'text-indigo-600' : 'text-purple-400'}`} />
                    <span>{profile.address}</span>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Social Channels Bar */}
          {profile.socialLinks && Object.values(profile.socialLinks).some(Boolean) && (
            <div className={`mt-5 p-3 sm:p-3.5 rounded-2xl border flex items-center justify-around flex-wrap gap-2 transition-all ${
              isLightMode
                ? 'bg-white/90 border-slate-200 shadow-2xs'
                : 'bg-[#15193b]/90 border-purple-500/20 backdrop-blur-md shadow-inner'
            }`}>
              {profile.socialLinks.linkedIn && (
                <a
                  href={profile.socialLinks.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  className="p-2 rounded-xl text-slate-300 hover:scale-115 transition-transform duration-200 cursor-pointer"
                >
                  <svg className="h-5 w-5 fill-current text-[#0A66C2]" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>
              )}
              {profile.socialLinks.instagram && (
                <a
                  href={profile.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram"
                  className="p-2 rounded-xl text-slate-300 hover:scale-115 transition-transform duration-200 cursor-pointer"
                >
                  <svg className="h-5 w-5 fill-current text-[#E4405F]" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
              {profile.socialLinks.twitter && (
                <a
                  href={profile.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Twitter / X"
                  className="p-2 rounded-xl text-slate-300 hover:scale-115 transition-transform duration-200 cursor-pointer"
                >
                  <svg className="h-5 w-5 fill-current text-[#1DA1F2]" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              )}
              {profile.socialLinks.youtube && (
                <a
                  href={profile.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="YouTube"
                  className="p-2 rounded-xl text-slate-300 hover:scale-115 transition-transform duration-200 cursor-pointer"
                >
                  <svg className="h-5 w-5 fill-current text-[#FF0000]" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}
              {profile.website && (
                <a
                  href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Website"
                  className="p-2 rounded-xl text-slate-300 hover:scale-115 transition-transform duration-200 cursor-pointer"
                >
                  <Globe className="h-5 w-5 text-[#38BDF8]" />
                </a>
              )}
            </div>
          )}
        </section>

        {/* ==================== 3. ABOUT ME SECTION ==================== */}
        <section className="space-y-3 pt-1">
          {/* Header Title */}
          <div className="flex items-center space-x-2">
            <h2 className={`text-base sm:text-lg font-black tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
              About Me
            </h2>
            <div className="h-1 w-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"></div>
          </div>

          {/* About Paragraph */}
          <p className={`text-xs sm:text-sm leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-300 font-normal'}`}>
            {profile.about}
          </p>

          {/* 3 Stat Cards Grid */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 pt-1">
            {/* Stat Card 1 */}
            <div className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1 ${
              isLightMode 
                ? 'bg-slate-50 border-slate-200 shadow-sm' 
                : 'bg-gradient-to-br from-[#121633] to-[#0e1129] border-purple-500/20 hover:border-purple-500/50 shadow-md hover:shadow-purple-500/20'
            }`}>
              <span className={`text-xl sm:text-2xl font-black block leading-tight ${
                isLightMode ? 'text-slate-900' : 'bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent'
              }`}>
                {profile.experience}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 block font-medium mt-0.5 truncate">
                Years of Exp.
              </span>
            </div>

            {/* Stat Card 2 */}
            <div className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1 ${
              isLightMode 
                ? 'bg-slate-50 border-slate-200 shadow-sm' 
                : 'bg-gradient-to-br from-[#121633] to-[#0e1129] border-purple-500/20 hover:border-purple-500/50 shadow-md hover:shadow-purple-500/20'
            }`}>
              <span className={`text-xl sm:text-2xl font-black block leading-tight ${
                isLightMode ? 'text-slate-900' : 'bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent'
              }`}>
                {profile.companiesBuilt}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 block font-medium mt-0.5 truncate">
                Companies Built
              </span>
            </div>

            {/* Stat Card 3 */}
            <div className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1 ${
              isLightMode 
                ? 'bg-slate-50 border-slate-200 shadow-sm' 
                : 'bg-gradient-to-br from-[#121633] to-[#0e1129] border-purple-500/20 hover:border-purple-500/50 shadow-md hover:shadow-purple-500/20'
            }`}>
              <span className={`text-xl sm:text-2xl font-black block leading-tight ${
                isLightMode ? 'text-slate-900' : 'bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent'
              }`}>
                {profile.connectionsCount}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 block font-medium mt-0.5 truncate">
                Connections
              </span>
            </div>
          </div>
        </section>

        {/* ==================== 4. WHAT I DO SECTION ==================== */}
        <section className="space-y-3 pt-1">
          {/* Header Title */}
          <div className="flex items-center space-x-2">
            <h2 className={`text-base sm:text-lg font-black tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
              What I Do
            </h2>
            <div className="h-1 w-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"></div>
          </div>

          {/* 4 Feature Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {whatIDoList.map((item, idx) => (
              <div
                key={idx}
                className={`p-3.5 sm:p-4 rounded-2xl border text-left space-y-1.5 transition-all duration-300 hover:-translate-y-1 ${
                  isLightMode
                    ? 'bg-slate-50 border-slate-200 hover:border-indigo-300'
                    : 'bg-gradient-to-br from-[#121633] to-[#0e1129] border-purple-500/20 hover:border-purple-500/50 shadow-md hover:shadow-purple-500/20'
                }`}
              >
                <h4 className={`text-xs sm:text-sm font-bold truncate ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  {item.title}
                </h4>
                <p className={`text-[11px] leading-relaxed line-clamp-3 ${isLightMode ? 'text-slate-500' : 'text-slate-300'}`}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== 5. FEATURED WORK SECTION ==================== */}
        <section className="space-y-3 pt-1">
          {/* Header Title + View All */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h2 className={`text-base sm:text-lg font-black tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                Featured Work
              </h2>
              <div className="h-1 w-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"></div>
            </div>

            <button className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center space-x-1 transition-colors cursor-pointer">
              <span>View All</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* 3 Work Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {workList.map((work, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-2xl border text-left space-y-2 flex flex-col justify-between overflow-hidden group transition-all duration-300 hover:-translate-y-1 ${
                  isLightMode
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-gradient-to-br from-[#121633] to-[#0e1129] border-purple-500/20 hover:border-purple-500/50 shadow-md hover:shadow-purple-500/20'
                }`}
              >
                <div className={`h-32 sm:h-28 rounded-xl overflow-hidden relative ${
                  isLightMode ? 'bg-slate-200' : 'bg-slate-900'
                }`}>
                  <img
                    src={work.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80'}
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-1">
                  <h4 className={`text-xs sm:text-sm font-bold truncate ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                    {work.title}
                  </h4>
                  <p className={`text-[11px] truncate ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                    {work.subtitle || work.description}
                  </p>
                  <span className="text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-0.5 rounded-full inline-block">
                    {work.tag || 'Product'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== 6. EXPERIENCE SECTION ==================== */}
        <section className="space-y-3 pt-1">
          {/* Header Title */}
          <div className="flex items-center space-x-2">
            <h2 className={`text-base sm:text-lg font-black tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
              Experience
            </h2>
            <div className="h-1 w-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"></div>
          </div>

          {/* Timeline Rows Container */}
          <div className="relative pl-4 space-y-3.5 ml-3">
            {/* Glowing Vertical Track */}
            <div className="absolute left-[3px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-purple-500 via-indigo-500 to-pink-500 rounded-full"></div>

            {experienceTimeline.map((exp, idx) => (
              <div
                key={idx}
                className={`p-3.5 sm:p-4 rounded-2xl border relative text-left space-y-1.5 transition-all duration-300 hover:-translate-y-0.5 ${
                  isLightMode
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-gradient-to-br from-[#121633] to-[#0e1129] border-purple-500/20 hover:border-purple-500/50 shadow-md'
                }`}
              >
                {/* Glowing Circle Dot on Line */}
                <div className={`absolute -left-[20px] top-4.5 h-3.5 w-3.5 rounded-full ${
                  isLightMode
                    ? 'bg-indigo-600 ring-4 ring-white'
                    : 'bg-purple-400 ring-4 ring-[#0b0e20] shadow-[0_0_12px_rgba(168,85,247,0.9)]'
                }`}></div>

                {/* Period Pill Badge */}
                <span className={`text-[10px] sm:text-xs font-mono font-extrabold px-3 py-0.5 rounded-full inline-block ${
                  isLightMode
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    : 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                }`}>
                  {exp.period}
                </span>

                {/* Role & Company */}
                <div>
                  <h4 className={`text-xs sm:text-sm font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                    {exp.role}
                  </h4>
                  <span className={`text-xs font-bold block ${isLightMode ? 'text-indigo-600' : 'text-purple-400'}`}>
                    {exp.company}
                  </span>
                </div>

                <p className={`text-xs leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
                  {exp.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== 7. ACHIEVEMENTS SECTION ==================== */}
        <section className="space-y-3 pt-1">
          {/* Header Title */}
          <div className="flex items-center space-x-2">
            <h2 className={`text-base sm:text-lg font-black tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
              Achievements
            </h2>
            <div className="h-1 w-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"></div>
          </div>

          {/* 4 Achievement Badge Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {achievements.map((item, idx) => (
              <div
                key={idx}
                className={`p-3.5 sm:p-4 rounded-2xl border text-center flex flex-col items-center justify-center space-y-1 transition-all duration-300 hover:-translate-y-1 ${
                  isLightMode
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-gradient-to-br from-[#121633] to-[#0e1129] border-purple-500/20 hover:border-purple-500/50 shadow-md hover:shadow-purple-500/20'
                }`}
              >
                <h4 className={`text-xs sm:text-sm font-bold truncate ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  {item.title}
                </h4>
                <p className={`text-[11px] leading-tight truncate ${isLightMode ? 'text-slate-500' : 'text-purple-300'}`}>
                  {item.subtitle}
                </p>
                <span className="text-[10px] font-mono text-slate-400 block pt-0.5">
                  {item.year}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== 8. FOOTER BRAND ==================== */}
        <footer className={`pt-5 pb-2 border-t flex items-center justify-between text-xs ${
          isLightMode ? 'border-slate-200 text-slate-600' : 'border-white/10 text-slate-400'
        }`}>
          <div className="flex items-center space-x-1.5">
            <Globe className={`h-3.5 w-3.5 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`} />
            <span className={`font-semibold ${isLightMode ? 'text-slate-800' : 'text-slate-300'}`}>
              {profile.website.replace(/^https?:\/\//, '')}
            </span>
          </div>

          <div>
            <span className={`font-extrabold ${
              isLightMode ? 'text-indigo-600' : 'bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent'
            }`}>
              OneWinq Digital
            </span>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default TemplateCardRenderer;

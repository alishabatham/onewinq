import React, { useState } from 'react';
import { 
  Globe, User, Check, ArrowRight, MoreHorizontal, MapPin, Smartphone,
  Star, Users, Briefcase, Folder, Fingerprint, Box, Mic, Mail, Phone
} from 'lucide-react';
import Logo from './Logo';
import { usePWA } from '../context/PWAContext';

const SocialIcon = ({ type, className = "h-4 w-4" }) => {
  switch (type) {
    case 'linkedIn':
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
        </svg>
      );
    case 'twitter':
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    case 'instagram':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      );
    case 'facebook':
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.6 13.78 5.6c1.1 0 2.25.2 2.25.2v2.48h-1.27c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 3h-2.33v6.8c4.56-.93 8-4.96 8-9.8z"/>
        </svg>
      );
    case 'gitHub':
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      );
    case 'website':
      return <Globe className={className} />;
    case 'email':
      return <Mail className={className} />;
    case 'mobile':
      return <Phone className={className} />;
    default:
      return <Globe className={className} />;
  }
};

const TemplateCardRenderer = ({ 
  profile: rawProfile, 
  templateIdOverride, 
  onSaveContact,
  isPreview = false 
}) => {
  const { triggerInstall, isInstalled } = usePWA();
  const [showFullAbout, setShowFullAbout] = useState(false);

  const selectedTemplateId = templateIdOverride || rawProfile?.templateId || 'obsidian';
  const isLightMode = selectedTemplateId === 'nova';

  const profile = {
    name: rawProfile?.name || 'Rajat Chaturvedi',
    designation: rawProfile?.designation || '',
    companyName: rawProfile?.companyName || '',
    tagline: rawProfile?.tagline || '',
    about: rawProfile?.about || '',
    mobile: rawProfile?.mobile || '',
    email: rawProfile?.email || '',
    website: rawProfile?.website || rawProfile?.company?.website || '',
    whatsApp: rawProfile?.whatsApp || '',
    address: rawProfile?.address || '',
    profilePhoto: rawProfile?.profilePhoto || null,
    socialLinks: rawProfile?.socialLinks || {},
    ...rawProfile
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

  // Highlights Metrics array (strictly conditional on user input)
  const statsList = [
    { value: rawProfile?.experience, label: rawProfile?.experienceLabel || 'Years of Experience' },
    { value: rawProfile?.connectionsCount, label: rawProfile?.connectionsLabel || 'Connections Made' },
    { value: rawProfile?.companiesBuilt, label: rawProfile?.companiesLabel || 'Countries Reached' },
  ].filter(s => s.value && s.value.trim());

  // Services (What I Do) (strictly conditional on user input)
  const whatIDoList = (rawProfile?.services && Array.isArray(rawProfile.services) && rawProfile.services.length > 0)
    ? rawProfile.services.filter(s => s && (s.title || s.description))
    : [];

  // Featured Work Items (strictly conditional on user input)
  const workList = (rawProfile?.featuredWork && Array.isArray(rawProfile.featuredWork) && rawProfile.featuredWork.length > 0)
    ? rawProfile.featuredWork.filter(w => w && (w.title || w.image || w.description))
    : [];

  // Experience Timeline List (strictly conditional on user input)
  const experienceTimeline = (rawProfile?.experienceTimeline && Array.isArray(rawProfile.experienceTimeline) && rawProfile.experienceTimeline.length > 0)
    ? rawProfile.experienceTimeline.filter(e => e && (e.role || e.company || e.period))
    : [];

  // Achievements List (strictly conditional on user input)
  const achievements = (rawProfile?.achievements && Array.isArray(rawProfile.achievements) && rawProfile.achievements.length > 0)
    ? rawProfile.achievements.filter(a => a && (a.title || a.subtitle))
    : [];

  // Skills List (strictly conditional on user input)
  const skillsList = (rawProfile?.skills && Array.isArray(rawProfile.skills) && rawProfile.skills.length > 0)
    ? rawProfile.skills.filter(s => s && s.trim())
    : [];

  // Social Links List
  const socialList = [
    { type: 'linkedIn', url: profile.socialLinks?.linkedIn, label: 'LinkedIn' },
    { type: 'twitter', url: profile.socialLinks?.twitter, label: 'Twitter / X' },
    { type: 'instagram', url: profile.socialLinks?.instagram, label: 'Instagram' },
    { type: 'facebook', url: profile.socialLinks?.facebook, label: 'Facebook' },
    { type: 'gitHub', url: profile.socialLinks?.gitHub, label: 'GitHub' },
    { type: 'website', url: profile.website, label: 'Website' },
    { type: 'email', url: profile.email ? `mailto:${profile.email}` : '', label: 'Email' },
    { type: 'mobile', url: profile.mobile ? `tel:${profile.mobile}` : '', label: 'Phone' },
  ].filter(s => s.url && typeof s.url === 'string' && s.url.trim());

  return (
    <div className={`min-h-screen font-outfit text-left relative transition-colors py-3 sm:py-4 px-2 sm:px-4 ${
      isLightMode 
        ? 'bg-[#f8fafc] text-slate-900 selection:bg-[#6344F5] selection:text-white' 
        : 'bg-[#07080e] text-slate-100 selection:bg-[#6344F5] selection:text-white'
    }`}>
      
      {/* Background Ambient Glow Effects for Dark Mode */}
      {!isLightMode && (
        <>
          <div className="fixed top-10 left-1/3 w-96 h-96 bg-[#6344F5]/15 rounded-full blur-[140px] pointer-events-none"></div>
          <div className="fixed bottom-20 right-1/4 w-80 h-80 bg-[#6344F5]/10 rounded-full blur-[120px] pointer-events-none"></div>
        </>
      )}

      {/* Outer Mobile Container Frame */}
      <div className="w-full max-w-md sm:max-w-xl mx-auto min-h-screen relative flex flex-col justify-between space-y-3 sm:space-y-3.5">
        
        {/* ==================== 1. TOP HEADER ==================== */}
        <header className={`flex items-center justify-between py-2 px-3 rounded-2xl transition-all gap-2 ${
          isLightMode
            ? 'bg-white border border-slate-100 shadow-xs'
            : 'bg-[#0e1020]/90 border border-white/10 shadow-md'
        }`}>
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Logo className="h-8 sm:h-10" light={!isLightMode} />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            {!isInstalled && (
              <button
                type="button"
                onClick={() => !isPreview && triggerInstall({ name: profile.name, photo: profile.profilePhoto })}
                className={`h-8 px-2.5 rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer text-xs font-semibold shrink-0 whitespace-nowrap ${
                  isLightMode
                    ? 'bg-[#6344F5]/10 text-[#6344F5] border border-[#6344F5]/20 hover:bg-[#6344F5]/15'
                    : 'bg-white/10 text-[#6344F5] border border-[#6344F5]/30 hover:bg-white/15'
                }`}
                title="Save Card to Phone Home Screen"
              >
                <Smartphone className="h-3.5 w-3.5 text-[#6344F5] shrink-0" />
                <span className="hidden sm:inline">Add Card</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                if (isPreview) return;
                if (onSaveContact) onSaveContact();
              }}
              className={`text-xs font-semibold px-3 sm:px-4 h-8 flex items-center justify-center rounded-xl border transition-all cursor-pointer shadow-2xs shrink-0 whitespace-nowrap ${
                isLightMode
                  ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                  : 'bg-white/10 hover:bg-white/15 border-white/15 text-white'
              }`}
            >
              Save Contact
            </button>

            <button
              type="button"
              onClick={handleShareProfile}
              className={`h-8 w-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                isLightMode
                  ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  : 'bg-white/10 border-white/15 text-slate-300 hover:text-white'
              }`}
            >
              <MoreHorizontal className="h-4 w-4 shrink-0" />
            </button>
          </div>
        </header>

        {/* ==================== 2. PROFILE HERO BOX ==================== */}
        <section className={`rounded-2xl p-4 sm:p-5 transition-all ${
          isLightMode
            ? 'bg-white border border-slate-100/90 shadow-xs'
            : 'bg-[#0e1020]/90 border border-white/10 shadow-md'
        }`}>
          <div className="flex items-center space-x-3.5 sm:space-x-5 text-left">
            
            {/* Square Avatar Photo */}
            <div className="relative shrink-0">
              <div className={`h-20 w-20 sm:h-28 sm:w-28 rounded-2xl overflow-hidden relative border ${
                isLightMode ? 'border-slate-200 bg-slate-100' : 'border-[#6344F5]/30 bg-slate-900'
              }`}>
                {profile.profilePhoto ? (
                  <img src={profile.profilePhoto} alt={profile.name} className="h-full w-full object-cover rounded-2xl" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <User className={`h-10 w-10 sm:h-12 sm:w-12 ${isLightMode ? 'text-slate-400' : 'text-slate-600'}`} />
                  </div>
                )}
              </div>
            </div>

            {/* Profile Details */}
            <div className="space-y-1 sm:space-y-1.5 flex-1 min-w-0 pt-0.5">
              <div className="flex items-center space-x-1.5 flex-wrap">
                <h1 className={`text-lg sm:text-2xl font-extrabold tracking-tight truncate ${
                  isLightMode ? 'text-slate-900' : 'text-white'
                }`}>
                  {profile.name}
                </h1>
                {/* #6344F5 Verified Checkmark Badge */}
                <div className="h-4 w-4 rounded-full bg-[#6344F5] flex items-center justify-center text-white shrink-0 shadow-xs">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </div>
              </div>

              {(profile.designation || profile.companyName) && (
                <p className="text-xs sm:text-sm font-semibold text-[#6344F5]">
                  {profile.designation}{profile.companyName ? `, ${profile.companyName}` : ''}
                </p>
              )}

              {(profile.tagline || profile.about) && (
                <p className={`text-[11px] sm:text-xs leading-relaxed font-normal pt-0.5 line-clamp-3 ${
                  isLightMode ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  {profile.tagline || profile.about}
                </p>
              )}

              {profile.address && (
                <div className="pt-0.5 flex items-center space-x-1.5 text-xs text-slate-500">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  <span className={isLightMode ? 'text-slate-600' : 'text-slate-400'}>{profile.address}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ==================== 2.5 SOCIAL LINKS ROW ==================== */}
        {socialList.length > 0 && (
          <section className={`rounded-2xl p-3 sm:p-4 text-left transition-all ${
            isLightMode
              ? 'bg-white border border-slate-100/90 shadow-xs'
              : 'bg-[#0e1020]/90 border border-white/10 shadow-md'
          }`}>
            <div className="flex items-center justify-center space-x-2.5 sm:space-x-3.5 flex-wrap gap-y-2">
              {socialList.map((item, idx) => {
                const formattedUrl = (item.url.startsWith('http') || item.url.startsWith('mailto:') || item.url.startsWith('tel:'))
                  ? item.url
                  : `https://${item.url}`;

                return (
                  <a
                    key={idx}
                    href={formattedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={item.label}
                    className={`h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-2xs border ${
                      isLightMode
                        ? 'bg-slate-50 hover:bg-[#6344F5]/10 text-slate-700 hover:text-[#6344F5] border-slate-200/80 hover:border-[#6344F5]/30'
                        : 'bg-white/5 hover:bg-[#6344F5]/20 text-slate-300 hover:text-white border-white/10 hover:border-[#6344F5]/40'
                    }`}
                  >
                    <SocialIcon type={item.type} className="h-4 w-4 sm:h-4.5 sm:w-4.5 shrink-0" />
                  </a>
                );
              })}
            </div>
          </section>
        )}

        {/* ==================== 3. HIGHLIGHTS BOX ==================== */}
        {statsList.length > 0 && (
          <section className={`rounded-2xl p-3.5 sm:p-5 text-left transition-all ${
            isLightMode
              ? 'bg-white border border-slate-100/90 shadow-xs'
              : 'bg-[#0e1020]/90 border border-white/10 shadow-md'
          }`}>
            <h3 className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-2.5">
              HIGHLIGHTS
            </h3>
            
            <div className={`grid grid-cols-${statsList.length} divide-x ${
              isLightMode ? 'divide-slate-100' : 'divide-white/10'
            }`}>
              {statsList.map((stat, idx) => (
                <div key={idx} className="text-center px-1 sm:px-2">
                  <span className="text-base sm:text-xl font-extrabold block leading-tight whitespace-nowrap text-[#6344F5]">
                    {stat.value}
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-400 block font-medium mt-0.5 leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ==================== 4. ABOUT ME BOX ==================== */}
        {profile.about && (
          <section className={`rounded-2xl p-4 sm:p-5 text-left transition-all ${
            isLightMode
              ? 'bg-white border border-slate-100/90 shadow-xs'
              : 'bg-[#0e1020]/90 border border-white/10 shadow-md'
          }`}>
            {/* Header Icon + Label */}
            <div className="flex items-center space-x-2 mb-2.5">
              <div className={`h-5 w-5 sm:h-6 sm:w-6 rounded-md sm:rounded-lg flex items-center justify-center shrink-0 ${
                isLightMode ? 'bg-[#6344F5]/10 text-[#6344F5]' : 'bg-[#6344F5]/20 text-[#6344F5]'
              }`}>
                <User className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </div>
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                ABOUT ME
              </h3>
            </div>

            {/* Paragraph Text */}
            <div className="space-y-2">
              <p className={`text-xs sm:text-sm leading-relaxed ${
                isLightMode ? 'text-slate-600' : 'text-slate-300'
              } ${!showFullAbout ? 'line-clamp-3' : ''}`}>
                {profile.about}
              </p>
              {profile.about.length > 110 && (
                <div className="flex justify-end pt-0.5">
                  <button
                    type="button"
                    onClick={() => setShowFullAbout(!showFullAbout)}
                    className="text-xs font-bold text-[#6344F5] hover:text-[#5234e5] flex items-center space-x-1 cursor-pointer"
                  >
                    <span>{showFullAbout ? 'Show Less' : 'Read More'}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ==================== 5. WHAT I DO BOX ==================== */}
        {whatIDoList.length > 0 && (
          <section className={`rounded-2xl p-4 sm:p-5 text-left transition-all ${
            isLightMode
              ? 'bg-white border border-slate-100/90 shadow-xs'
              : 'bg-[#0e1020]/90 border border-white/10 shadow-md'
          }`}>
            {/* Header Icon + Label */}
            <div className="flex items-center space-x-2 mb-3">
              <div className={`h-5 w-5 sm:h-6 sm:w-6 rounded-md sm:rounded-lg flex items-center justify-center shrink-0 ${
                isLightMode ? 'bg-[#6344F5]/10 text-[#6344F5]' : 'bg-[#6344F5]/20 text-[#6344F5]'
              }`}>
                <Briefcase className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </div>
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                WHAT I DO
              </h3>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {whatIDoList.map((item, idx) => (
                <div key={idx} className={`p-2.5 sm:p-3 rounded-xl border text-center flex flex-col items-center space-y-1 ${
                  isLightMode
                    ? 'bg-slate-50/70 border-slate-100'
                    : 'bg-white/5 border-white/10'
                }`}>
                  <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-xl flex items-center justify-center shrink-0 mb-0.5 ${
                    isLightMode ? 'bg-[#6344F5]/10 text-[#6344F5]' : 'bg-[#6344F5]/20 text-[#6344F5]'
                  }`}>
                    {idx === 0 ? <Fingerprint className="h-4 w-4 sm:h-5 sm:w-5" /> :
                     idx === 1 ? <Box className="h-4 w-4 sm:h-5 sm:w-5" /> :
                     idx === 2 ? <Mic className="h-4 w-4 sm:h-5 sm:w-5" /> :
                     <Users className="h-4 w-4 sm:h-5 sm:w-5" />}
                  </div>
                  <h4 className={`text-xs font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                    {item.title}
                  </h4>
                  <p className={`text-[10px] leading-relaxed line-clamp-3 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ==================== 6. FEATURED WORK BOX ==================== */}
        {workList.length > 0 && (
          <section className={`rounded-2xl p-4 sm:p-5 text-left transition-all ${
            isLightMode
              ? 'bg-white border border-slate-100/90 shadow-xs'
              : 'bg-[#0e1020]/90 border border-white/10 shadow-md'
          }`}>
            {/* Header Icon + Label + View All */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className={`h-5 w-5 sm:h-6 sm:w-6 rounded-md sm:rounded-lg flex items-center justify-center shrink-0 ${
                  isLightMode ? 'bg-[#6344F5]/10 text-[#6344F5]' : 'bg-[#6344F5]/20 text-[#6344F5]'
                }`}>
                  <Folder className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </div>
                <h3 className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                  FEATURED WORK
                </h3>
              </div>

              <a
                href="#all-work"
                className="text-xs font-bold text-[#6344F5] hover:text-[#5234e5] flex items-center space-x-1"
              >
                <span>View All</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Work Cards */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {workList.map((work, idx) => (
                <a
                  key={idx}
                  href={work.link || '#'}
                  target={work.link ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="group block space-y-1 text-left cursor-pointer"
                >
                  <div className={`h-20 sm:h-28 w-full rounded-xl overflow-hidden relative border transition-all ${
                    isLightMode ? 'bg-slate-100 border-slate-200/80' : 'bg-slate-900/90 border-white/10'
                  }`}>
                    {work.image ? (
                      <img
                        src={work.image}
                        alt={work.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500 text-[10px] px-1 text-center">
                        {work.title}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold truncate ${
                      isLightMode ? 'text-slate-900' : 'text-white'
                    }`}>
                      {work.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 truncate">
                      {work.subtitle || work.description}
                    </p>
                    {work.tag && (
                      <span className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md inline-block mt-0.5 ${
                        isLightMode 
                          ? 'bg-[#6344F5]/10 text-[#6344F5] border border-[#6344F5]/20' 
                          : 'bg-[#6344F5]/20 text-[#6344F5] border border-[#6344F5]/30'
                      }`}>
                        {work.tag}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* ==================== 7. EXPERIENCE BOX ==================== */}
        {experienceTimeline.length > 0 && (
          <section className={`rounded-2xl p-4 sm:p-5 text-left transition-all ${
            isLightMode
              ? 'bg-white border border-slate-100/90 shadow-xs'
              : 'bg-[#0e1020]/90 border border-white/10 shadow-md'
          }`}>
            {/* Header Icon + Label */}
            <div className="flex items-center space-x-2 mb-4">
              <div className={`h-5 w-5 sm:h-6 sm:w-6 rounded-md sm:rounded-lg flex items-center justify-center shrink-0 ${
                isLightMode ? 'bg-[#6344F5]/10 text-[#6344F5]' : 'bg-[#6344F5]/20 text-[#6344F5]'
              }`}>
                <Briefcase className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </div>
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                EXPERIENCE
              </h3>
            </div>

            {/* Vertical Timeline */}
            <div className="space-y-4 relative pl-1">
              {/* Continuous Vertical Track Line */}
              <div className="absolute left-[4px] top-2 bottom-3 w-[1.5px] bg-[#6344F5]/40"></div>

              {experienceTimeline.map((exp, idx) => (
                <div key={idx} className="flex items-start space-x-3.5 relative z-10">
                  {/* Period with #6344F5 Bullet Dot */}
                  <div className="flex items-center space-x-2 shrink-0 w-24 sm:w-28 pt-0.5">
                    <div className={`h-2.5 w-2.5 rounded-full ring-4 shrink-0 bg-[#6344F5] ${
                      isLightMode ? 'ring-white' : 'ring-[#0e1020]'
                    }`}></div>
                    <span className="text-[11px] sm:text-xs font-semibold text-[#6344F5]">
                      {exp.period}
                    </span>
                  </div>

                  {/* Role & Details */}
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <h4 className={`text-xs sm:text-sm font-bold ${
                      isLightMode ? 'text-slate-900' : 'text-white'
                    }`}>
                      {exp.role}
                    </h4>
                    {exp.company && (
                      <p className="text-xs text-slate-500 font-medium">
                        {exp.company}
                      </p>
                    )}
                    {exp.desc && (
                      <p className="text-[11px] text-slate-500 pt-0.5 leading-relaxed">
                        {exp.desc}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ==================== 8. SKILLS BOX ==================== */}
        {skillsList.length > 0 && (
          <section className={`rounded-2xl p-4 sm:p-5 text-left transition-all ${
            isLightMode
              ? 'bg-white border border-slate-100/90 shadow-xs'
              : 'bg-[#0e1020]/90 border border-white/10 shadow-md'
          }`}>
            {/* Header Icon + Label */}
            <div className="flex items-center space-x-2 mb-3">
              <div className={`h-5 w-5 sm:h-6 sm:w-6 rounded-md sm:rounded-lg flex items-center justify-center shrink-0 ${
                isLightMode ? 'bg-[#6344F5]/10 text-[#6344F5]' : 'bg-[#6344F5]/20 text-[#6344F5]'
              }`}>
                <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </div>
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                SKILLS
              </h3>
            </div>

            {/* Skills Badges */}
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {skillsList.map((skill, idx) => (
                <span
                  key={idx}
                  className={`text-[10px] sm:text-[10.5px] font-semibold px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-lg sm:rounded-full transition-all ${
                    isLightMode
                      ? 'bg-[#6344F5]/10 text-slate-800 border border-[#6344F5]/20'
                      : 'bg-[#6344F5]/15 text-slate-200 border border-[#6344F5]/30'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* ==================== 9. GET YOUR ONEWINQ CARD BANNER ==================== */}
        <section className="rounded-2xl bg-gradient-to-r from-[#110e26] via-[#1a1238] to-[#0c081d] p-3.5 sm:p-5 border border-[#6344F5]/20 text-white relative overflow-hidden shadow-md text-left">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#6344F5]/20 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex flex-row items-center justify-between gap-2.5 sm:gap-4 relative z-10">
            <div className="space-y-1 sm:space-y-1.5 flex-1 min-w-0">
              {/* Badge */}
              <span className="text-[8.5px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#6344F5]/20 text-[#6344F5] border border-[#6344F5]/30 inline-block uppercase tracking-wider">
                Your Identity. One Tap Away.
              </span>
              <h3 className="text-xs sm:text-xl font-black text-white leading-tight">
                Get Your <span className="text-[#6344F5]">OneWinq</span> Card Now
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-300 leading-tight line-clamp-2">
                Tap to share your profile instantly. Make every connection count.
              </p>
              <div className="pt-0.5 sm:pt-1">
                <a
                  href="/pricing"
                  className="inline-flex items-center space-x-1 sm:space-x-1.5 bg-white hover:bg-slate-100 text-[#6344F5] font-extrabold px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs transition-all shadow-sm cursor-pointer"
                >
                  <span>Get My Card</span>
                  <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </a>
              </div>
            </div>

            {/* NFC Card Graphic */}
            <div className="relative shrink-0">
              <div className="w-24 h-15 sm:w-36 sm:h-22 rounded-xl bg-gradient-to-br from-slate-900 via-black to-slate-950 border border-white/20 p-2 flex flex-col justify-between shadow-2xl relative overflow-hidden transform rotate-2">
                <div className="flex items-center justify-between">
                  <span className="text-[7.5px] sm:text-[8px] font-extrabold text-slate-400 tracking-wider">OneWinq</span>
                  <span className="text-[7.5px] sm:text-[8px] font-bold text-white">N</span>
                </div>
                <div className="self-end h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-[#6344F5]/30 flex items-center justify-center text-white">
                  <svg className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 10. FOOTER ==================== */}
        <footer className={`pt-3 pb-1 flex items-center justify-between text-xs px-1 ${
          isLightMode ? 'text-slate-500' : 'text-slate-400'
        }`}>
          <div className="flex items-center space-x-1.5">
            <Globe className="h-3.5 w-3.5 text-slate-400" />
            <span className="font-medium">
              {profile.website ? profile.website.replace(/^https?:\/\//, '') : 'onewinq.com'}
            </span>
          </div>

          <div>
            <span className="font-semibold text-slate-400">
              One Tap. <span className="text-[#6344F5] font-bold">Infinite Identity.</span>
            </span>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default TemplateCardRenderer;

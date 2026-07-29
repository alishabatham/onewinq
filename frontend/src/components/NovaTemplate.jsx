import React, { useState } from 'react';
import { 
  Shield, Check, MoreHorizontal, MapPin, ArrowRight, User, Code, Camera, Globe, Play,
  Glasses, QrCode, UserPlus, Smartphone, Share2, Zap, ExternalLink,
  Mail, Phone, Download, Sparkles, Box
} from 'lucide-react';
import Logo from './Logo';

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

const NovaTemplate = ({
  profile,
  onSaveContact,
  onSaveProfile,
  onOpenConnect,
  localConnCount = 0,
  isPreview = false,
  onShareProfile,
}) => {
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  // Dynamic Profile variables (STRICTLY FROM USER FORM)
  const name = profile?.name || 'Digital Card User';
  
  // Role / Designation display
  const designation = profile?.designation || '';
  const companyName = profile?.companyName || '';
  let role = '';
  if (designation && companyName) {
    role = `${designation} @ ${companyName}`.toUpperCase();
  } else if (designation) {
    role = designation.toUpperCase();
  } else if (companyName) {
    role = companyName.toUpperCase();
  } else if (profile?.tagline) {
    role = profile.tagline.toUpperCase();
  }

  const bio = profile?.tagline || '';
  const location = profile?.address || '';
  const avatar = profile?.profilePhoto || null;

  // Handle Save Profile Action
  const handleSaveProfileClick = () => {
    if (isPreview) return;
    if (onSaveProfile) {
      onSaveProfile();
    } else if (onSaveContact) {
      onSaveContact();
    } else {
      // Fallback vCard download
      const vCardData = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${name}`,
        `ORG:${profile?.companyName || ''}`,
        `TITLE:${profile?.designation || ''}`,
        `TEL;TYPE=CELL:${profile?.mobile || ''}`,
        `EMAIL;TYPE=PREF,INTERNET:${profile?.email || ''}`,
        `URL:${profile?.website || window.location.href}`,
        `NOTE:${profile?.about || bio}`,
        'END:VCARD'
      ].join('\r\n');

      const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${name.replace(/\s+/g, '_')}_contact.vcf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Helper to cleanly separate stat numbers & labels (e.g. "2+ Years" -> num: "2+", label: "YEARS EXPERIENCE")
  const parseStatItem = (rawVal, defaultLabel) => {
    if (rawVal === undefined || rawVal === null) return null;
    const str = String(rawVal).trim();
    if (!str) return null;

    // Check if input is like "2+ Years" or "6+ Projects"
    const match = str.match(/^([\d\+\-\%\,\.]+)\s*(.*)$/);
    if (match && match[1]) {
      const numPart = match[1];
      const wordPart = match[2]?.trim();
      let labelPart = defaultLabel;

      if (wordPart && !defaultLabel.toLowerCase().includes(wordPart.toLowerCase())) {
        labelPart = `${wordPart} ${defaultLabel}`;
      }
      return { num: numPart, label: labelPart.toUpperCase() };
    }

    return { num: str, label: defaultLabel.toUpperCase() };
  };

  const rawStats = [
    parseStatItem(profile?.experience, profile?.experienceLabel || 'Years Experience'),
    parseStatItem(localConnCount !== undefined ? `${localConnCount}` : profile?.connectionsCount, profile?.connectionsLabel || 'Connections'),
    parseStatItem(profile?.projectsCount || profile?.companiesBuilt, profile?.companiesLabel || profile?.projectsLabel || 'Projects Built'),
  ].filter(Boolean);

  // About Text - STRICTLY DYNAMIC FROM USER FORM
  const aboutText = profile?.about || '';

  // What I Do (Services) - STRICTLY DYNAMIC FROM USER FORM
  const whatIDoList = (profile?.services && Array.isArray(profile.services) && profile.services.length > 0)
    ? profile.services.filter(s => s && (s.title || s.description))
    : (profile?.whatIDo ? [{ title: 'What I Do', description: profile.whatIDo }] : []);

  // Featured Work - STRICTLY DYNAMIC FROM USER FORM
  const featuredWork = (profile?.featuredWork && Array.isArray(profile.featuredWork) && profile.featuredWork.length > 0)
    ? profile.featuredWork.filter(w => w && (w.title || w.image || w.description))
    : [];

  // Experience Timeline - STRICTLY DYNAMIC FROM USER FORM
  const experienceList = (profile?.experienceTimeline && Array.isArray(profile.experienceTimeline) && profile.experienceTimeline.length > 0)
    ? profile.experienceTimeline.filter(e => e && (e.role || e.company || e.period))
    : [];

  // Skills List - STRICTLY DYNAMIC FROM USER FORM
  const skillsList = (profile?.skills && Array.isArray(profile.skills) && profile.skills.length > 0)
    ? profile.skills.filter(s => s && (typeof s === 'string' ? s.trim() : s.name))
    : [];

  // Social Contact Links - STRICTLY DYNAMIC FROM USER FORM
  const socialList = [
    { type: 'linkedIn', url: profile?.socialLinks?.linkedIn, label: 'LinkedIn' },
    { type: 'twitter', url: profile?.socialLinks?.twitter, label: 'Twitter / X' },
    { type: 'instagram', url: profile?.socialLinks?.instagram, label: 'Instagram' },
    { type: 'facebook', url: profile?.socialLinks?.facebook, label: 'Facebook' },
    { type: 'gitHub', url: profile?.socialLinks?.gitHub, label: 'GitHub' },
    { type: 'website', url: profile?.website, label: 'Website' },
    { type: 'email', url: profile?.email ? `mailto:${profile.email}` : '', label: 'Email' },
    { type: 'mobile', url: profile?.mobile ? `tel:${profile.mobile}` : '', label: 'Phone' },
  ].filter(s => s.url && typeof s.url === 'string' && s.url.trim());

  return (
    <div className="min-h-screen bg-slate-100/80 text-slate-900 font-inter antialiased py-4 sm:py-8 px-3 sm:px-6 relative pb-28 selection:bg-purple-600 selection:text-white flex justify-center">
      
      {/* SINGLE MASTER CARD BOX CONTAINER */}
      <div className="w-full max-w-md bg-white rounded-[32px] p-5 sm:p-6 border border-slate-200/90 shadow-2xl shadow-slate-300/40 space-y-6 text-left relative">

        {/* 1. TOP NAVBAR HEADER */}
        <header className="flex items-center justify-between pb-3 border-b border-slate-100">
          {/* Bigger Official OneWinq Logo */}
          <div className="flex items-center shrink-0">
            <Logo className="h-10 sm:h-12" light={false} />
          </div>

          <div className="flex items-center space-x-2">
            {/* EXCHANGE IDENTITY / CONNECT BUTTON */}
            <button
              type="button"
              onClick={onOpenConnect}
              className="bg-[#6344F5] hover:bg-[#5233E0] text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full transition-all shadow-md shadow-[#6344F5]/30 cursor-pointer flex items-center space-x-1 hover:scale-105"
            >
              <UserPlus className="h-3.5 w-3.5" />
              <span>Connect</span>
            </button>

            {/* SAVE PROFILE BUTTON */}
            <button
              type="button"
              onClick={handleSaveProfileClick}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center space-x-1"
            >
              <Smartphone className="h-3.5 w-3.5 text-[#6344F5]" />
              <span className="hidden sm:inline">Save</span>
            </button>

            <button
              type="button"
              onClick={onShareProfile}
              className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* 2. HERO PROFILE HEADER */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center space-x-4">
            {/* Avatar Photo */}
            <div className="relative shrink-0">
              <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl overflow-hidden border border-slate-100 shadow-md bg-slate-100 flex items-center justify-center relative">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={name}
                    className="h-full w-full object-cover rounded-2xl"
                  />
                ) : (
                  <User className="h-12 w-12 text-slate-400" />
                )}
              </div>
            </div>

            {/* Name, Designation & Location on Right */}
            <div className="space-y-1.5 flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-jakarta font-black text-slate-950 tracking-tight leading-tight">
                {name}
              </h1>
              {role && (
                <p className="text-[10px] sm:text-[11px] font-jakarta font-extrabold uppercase tracking-wider text-[#6344F5] leading-snug">
                  {role}
                </p>
              )}
              {location && (
                <div className="flex items-center space-x-1 text-xs text-slate-400 font-medium pt-0.5">
                  <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Bio Description below */}
          {bio && (
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-1">
              {bio}
            </p>
          )}
        </div>

        {/* 3. SLEEK DARK PURPLE METRICS ROW WITH DIVIDERS */}
        {rawStats.length > 0 && (
          <div className="bg-[#13103D] text-white rounded-none p-3.5 sm:p-4 flex items-center justify-between border border-[#13103D] shadow-md divide-x divide-white/15">
            {rawStats.map((stat, idx) => (
              <div key={idx} className="flex-1 text-center px-1 flex flex-col items-center justify-center">
                <span className="text-xl sm:text-2xl font-jakarta font-black text-white tracking-tight leading-none">
                  {stat.num}
                </span>
                <span className="text-[9px] sm:text-[10px] font-jakarta font-extrabold text-slate-300 uppercase tracking-wider mt-1.5 leading-tight text-center">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* 4. ABOUT SECTION */}
        {aboutText && (
          <div className="space-y-2.5 pt-2 border-t border-slate-100">
            <div className="flex items-center space-x-2">
              <div className="w-1 h-3.5 bg-[#6344F5] rounded-full"></div>
              <h3 className="text-xs font-jakarta font-extrabold uppercase tracking-wider text-slate-900">
                About
              </h3>
            </div>
            <p className={`text-xs sm:text-sm text-slate-700 leading-relaxed ${!showFullAbout ? 'line-clamp-3' : ''}`}>
              {aboutText}
            </p>
            {aboutText.length > 100 && (
              <button
                type="button"
                onClick={() => setShowFullAbout(!showFullAbout)}
                className="text-xs font-bold text-slate-950 hover:text-[#6344F5] flex items-center space-x-1 pt-1 cursor-pointer"
              >
                <span>{showFullAbout ? 'Show Less' : 'Read More'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}

        {/* 4.5 WHAT I DO / SERVICES SECTION (MIDNIGHT VIOLET #13103D CARDS) */}
        {whatIDoList.length > 0 && (
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center space-x-2">
              <div className="w-1 h-3.5 bg-[#6344F5] rounded-full"></div>
              <h3 className="text-xs font-jakarta font-extrabold uppercase tracking-wider text-slate-900">
                What I Do
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {whatIDoList.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#13103D] text-white rounded-2xl p-4 text-left flex flex-col space-y-2 border border-[#13103D] shadow-md hover:scale-[1.02] transition-transform"
                >
                  <div className="text-[#a78bfa] mb-0.5">
                    {idx % 4 === 0 ? <Zap className="h-4.5 w-4.5 stroke-[2.2]" /> :
                     idx % 4 === 1 ? <Box className="h-4.5 w-4.5 stroke-[2.2]" /> :
                     idx % 4 === 2 ? <Sparkles className="h-4.5 w-4.5 stroke-[2.2]" /> :
                     <Code className="h-4.5 w-4.5 stroke-[2.2]" />}
                  </div>

                  <h4 className="text-xs font-bold text-white leading-tight">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-3 font-normal">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. FEATURED WORK SECTION (HORIZONTAL SLIDER WITH UNIFIED ROUNDED CARDS) */}
        {featuredWork.length > 0 && (
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-1 h-3.5 bg-[#6344F5] rounded-full"></div>
                <h3 className="text-xs font-jakarta font-extrabold uppercase tracking-wider text-slate-900">
                  Featured Work
                </h3>
              </div>
              <div className="flex items-center space-x-1 text-slate-400">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>

            {/* Horizontal Slider */}
            <div className="flex overflow-x-auto space-x-3.5 pb-2 scrollbar-none snap-x snap-mandatory">
              {featuredWork.map((work, idx) => (
                <a
                  key={idx}
                  href={work.link || '#'}
                  target={work.link && work.link !== '#' ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="w-44 sm:w-52 shrink-0 snap-start rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                >
                  {/* Top Image / Soft Lavender Graphic Container */}
                  <div className="h-32 w-full bg-gradient-to-b from-[#e8e7f5] via-[#deddf3] to-[#d6d5ee] overflow-hidden relative flex items-center justify-center">
                    {work.image ? (
                      <img
                        src={work.image}
                        alt={work.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <span className="text-slate-400 text-xs font-medium px-2 text-center select-none opacity-80">
                        {work.title}
                      </span>
                    )}
                  </div>

                  {/* Bottom Content Area inside same card */}
                  <div className="p-3.5 bg-white text-left">
                    <h4 className="text-xs font-bold text-slate-950 truncate group-hover:text-[#6344F5] transition-colors">
                      {work.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate font-normal mt-0.5">
                      {work.subtitle || work.description || 'Product Design'}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* 6. EXPERIENCE SECTION (SUBTLE & SOPHISTICATED COLORS) */}
        {experienceList.length > 0 && (
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-center space-x-2">
              <div className="w-1 h-3.5 bg-[#6344F5] rounded-full"></div>
              <h3 className="text-xs font-jakarta font-extrabold uppercase tracking-wider text-slate-900">
                Experience
              </h3>
            </div>

            <div className="relative pl-1 space-y-5">
              {/* Continuous vertical line connecting all timeline radio nodes */}
              <div className="absolute left-[9px] top-3 bottom-3 w-[1.5px] bg-slate-200 pointer-events-none"></div>

              {experienceList.map((exp, idx) => {
                const isCurrent = exp.isCurrent || (exp.period && exp.period.toUpperCase().includes('PRESENT'));
                return (
                  <div key={idx} className="flex items-start justify-between relative z-10 gap-3">
                    <div className="flex items-start space-x-3.5 min-w-0 flex-1">
                      {/* Radio Circle Node */}
                      <div className={`h-5 w-5 rounded-full border ${
                        isCurrent 
                          ? 'border-slate-800 bg-[#f8f9ff] shadow-xs ring-2 ring-slate-100' 
                          : 'border-slate-300 bg-white'
                      } flex items-center justify-center shrink-0 mt-0.5`}>
                        <div className={`rounded-full ${
                          isCurrent ? 'h-2 w-2 bg-[#6344F5]' : 'h-1.5 w-1.5 bg-slate-400'
                        }`}></div>
                      </div>

                      {/* Role & Company details */}
                      <div className="space-y-0.5 flex-1 min-w-0">
                        <h4 className={`text-xs sm:text-sm font-bold truncate ${
                          isCurrent ? 'text-slate-950' : 'text-slate-800'
                        }`}>
                          {exp.company || exp.role}
                        </h4>
                        {exp.company && exp.role && (
                          <p className={`text-xs font-semibold truncate ${
                            isCurrent ? 'text-[#4F46E5]' : 'text-[#6366F1]'
                          }`}>
                            {exp.role}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Date period pill badge */}
                    <span className={`text-[10px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-full shrink-0 ${
                      isCurrent 
                        ? 'bg-violet-50 text-[#6344F5] border border-violet-200/60' 
                        : 'bg-slate-100 text-slate-500 border border-slate-200/50'
                    }`}>
                      {exp.period}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 7. SKILLS SECTION */}
        {skillsList.length > 0 && (
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center space-x-2">
              <div className="w-1 h-3.5 bg-[#6344F5] rounded-full"></div>
              <h3 className="text-xs font-jakarta font-extrabold uppercase tracking-wider text-slate-900">
                Skills
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillsList.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-[#f4f4f7] text-slate-800 text-xs font-semibold px-4 py-2 rounded-full border border-slate-200/50"
                >
                  {typeof skill === 'string' ? skill : skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 8. QUICK CONTACT / SOCIAL ACTION ICONS BAR (PROPER SINGLE LINE NO SCROLL) */}
        {socialList.length > 0 && (
          <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-1.5 min-[380px]:gap-2.5 sm:gap-3.5 py-1 w-full max-w-full">
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
                  className="h-9 w-9 min-[380px]:h-10 min-[380px]:w-10 sm:h-11 sm:w-11 rounded-full border border-slate-200 bg-white shadow-xs flex items-center justify-center text-slate-700 hover:border-[#6344F5] hover:text-[#6344F5] hover:scale-105 transition-all cursor-pointer shrink-0"
                >
                  <SocialIcon type={item.type} className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                </a>
              );
            })}
          </div>
        )}

        {/* 9. PROMO BANNER (CLEAN MINIMAL CTA CARD) */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white rounded-3xl p-5 sm:p-6 relative overflow-hidden shadow-xl text-left space-y-3.5">
          {/* Ambient Glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#6344F5]/30 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 space-y-2">
            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
              Get Your OneWinq Card
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              Transform your professional identity into a tactile, effortless experience.
            </p>
          </div>

          <div className="relative z-10 pt-1">
            <a
              href="/pricing"
              className="bg-white text-slate-950 hover:bg-slate-100 font-extrabold text-xs px-5 py-2.5 rounded-full transition-all inline-flex items-center space-x-1.5 shadow-md cursor-pointer hover:scale-105"
            >
              <span>Get Started</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

      </div>

      {/* 10. FLOATING DOCKED BOTTOM NAV (EXCHANGE IDENTITY + SAVE PROFILE + SHARE) */}
      <nav className="fixed bottom-4 inset-x-0 mx-auto max-w-xs bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-2xl rounded-full px-5 py-2.5 flex items-center justify-between z-40">
        <button
          type="button"
          onClick={handleSaveProfileClick}
          className="flex flex-col items-center gap-0.5 text-[10px] font-bold text-slate-500 hover:text-slate-900 transition-all cursor-pointer"
        >
          <Smartphone className="h-4.5 w-4.5 text-[#6344F5]" />
          <span>Save Profile</span>
        </button>

        {/* CONNECT BUTTON */}
        <button
          type="button"
          onClick={onOpenConnect}
          className="flex items-center space-x-1.5 bg-[#6344F5] hover:bg-[#5233E0] text-white px-5 py-1.5 rounded-full text-xs font-extrabold shadow-md shadow-[#6344F5]/30 transition-all cursor-pointer hover:scale-105"
        >
          <UserPlus className="h-3.5 w-3.5" />
          <span>Connect</span>
        </button>

        <button
          type="button"
          onClick={onShareProfile}
          className="flex flex-col items-center gap-0.5 text-[10px] font-bold text-slate-500 hover:text-slate-900 transition-all cursor-pointer"
        >
          <QrCode className="h-4.5 w-4.5 text-slate-600" />
          <span>Share</span>
        </button>
      </nav>

    </div>
  );
};

export default NovaTemplate;

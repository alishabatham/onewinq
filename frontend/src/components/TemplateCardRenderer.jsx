import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Globe, User, Check, ArrowRight, MoreHorizontal, MapPin, Smartphone,
  Star, Users, Briefcase, Folder, Fingerprint, Box, Mic, Mail, Phone,
  UserPlus, X, Send, Sparkles, CheckCircle2, Zap, LogIn
} from 'lucide-react';
import Logo from './Logo';
import NovaTemplate from './NovaTemplate';
import ObsidianTemplate from './ObsidianTemplate';
import { usePWA } from '../context/PWAContext';
import { useAuth, API_URL } from '../context/AuthContext';

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
  onConnectSuccess,
  isPreview = false 
}) => {
  const { triggerInstall, isInstalled } = usePWA();
  const { user } = useAuth();
  const routeParams = useParams();
  const cardIdParam = routeParams.cardId || rawProfile?.customUsername || rawProfile?._id;

  const [showFullAbout, setShowFullAbout] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [connectSuccess, setConnectSuccess] = useState(false);
  const [connectError, setConnectError] = useState('');
  
  const [localConnCount, setLocalConnCount] = useState(
    rawProfile?.totalConnections !== undefined 
      ? Number(rawProfile.totalConnections) 
      : (parseInt(rawProfile?.connectionsCount) || 0)
  );

  useEffect(() => {
    if (rawProfile?.totalConnections !== undefined) {
      setLocalConnCount(Number(rawProfile.totalConnections));
    } else if (rawProfile?.connectionsCount) {
      setLocalConnCount(parseInt(rawProfile.connectionsCount) || 0);
    }
  }, [rawProfile?.totalConnections, rawProfile?.connectionsCount]);

  const [showGuestForm, setShowGuestForm] = useState(false);
  const [connectForm, setConnectForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: '',
    company: '',
    designation: '',
    notes: '',
  });

  const handleDirectConnect = async () => {
    if (!cardIdParam) return;
    setConnecting(true);
    setConnectError('');
    setShowConnectModal(true);
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const payload = {
        name: user?.name || user?.fullName || 'OneWinq Professional',
        email: user?.email || '',
        mobile: user?.mobile || '',
        company: user?.company || '',
        designation: user?.designation || '',
        notes: `Connected via OneWinq Card`,
        userId: user?.id || user?._id
      };
      const res = await axios.post(`${API_URL}/card/public/${cardIdParam}/connect`, payload, { headers });
      if (res.data.success) {
        const updatedCount = res.data.totalConnections;
        setLocalConnCount(updatedCount);
        if (onConnectSuccess) {
          onConnectSuccess(updatedCount);
        }
        setConnectSuccess(true);
      } else {
        setConnectError(res.data.message || 'Could not connect.');
      }
    } catch (err) {
      setConnectError(err.response?.data?.message || 'Could not send connection request. Please try again.');
    } finally {
      setConnecting(false);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('autoConnect') === 'true' && user && cardIdParam && !connectSuccess && !connecting) {
      handleDirectConnect();
    }
  }, [user, cardIdParam]);

  const handleOpenConnect = () => {
    if (isPreview) return;
    if (user) {
      // 1-TAP CONNECT FOR LOGGED-IN USERS!
      handleDirectConnect();
    } else {
      // SHOW ONE WINQ AUTH PROMPT FOR GUESTS
      setShowGuestForm(false);
      setConnectError('');
      setConnectSuccess(false);
      setShowConnectModal(true);
    }
  };

  const handleConnectSubmit = async (e) => {
    e.preventDefault();
    if (!connectForm.name.trim() || (!connectForm.email.trim() && !connectForm.mobile.trim())) {
      setConnectError('Please enter your name and email or mobile number to connect.');
      return;
    }
    setConnecting(true);
    setConnectError('');
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.post(`${API_URL}/card/public/${cardIdParam}/connect`, connectForm, { headers });
      if (res.data.success) {
        const updatedCount = res.data.totalConnections;
        setLocalConnCount(updatedCount);
        if (onConnectSuccess) {
          onConnectSuccess(updatedCount);
        }
        setConnectSuccess(true);
      }
    } catch (err) {
      setConnectError(err.response?.data?.message || 'Could not send connection request. Please try again.');
    } finally {
      setConnecting(false);
    }
  };

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
    { value: `${localConnCount}`, label: rawProfile?.connectionsLabel || 'Connections' },
    { value: rawProfile?.companiesBuilt, label: rawProfile?.companiesLabel || 'Countries Reached' },
  ].filter(s => s.value !== undefined && s.value !== null && String(s.value).trim() !== '');

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

  if (selectedTemplateId === 'nova' || selectedTemplateId === 'obsidian') {
    return (
      <>
        {selectedTemplateId === 'nova' ? (
          <NovaTemplate
            profile={profile}
            onSaveContact={onSaveContact}
            onSaveProfile={() => !isPreview && triggerInstall({ name: profile.name, photo: profile.profilePhoto })}
            onOpenConnect={handleOpenConnect}
            localConnCount={localConnCount}
            isPreview={isPreview}
            onShareProfile={handleShareProfile}
          />
        ) : (
          <ObsidianTemplate
            profile={profile}
            onSaveContact={onSaveContact}
            onSaveProfile={() => !isPreview && triggerInstall({ name: profile.name, photo: profile.profilePhoto })}
            onOpenConnect={handleOpenConnect}
            localConnCount={localConnCount}
            isPreview={isPreview}
            onShareProfile={handleShareProfile}
          />
        )}
        {/* CONNECT MODAL */}
        {showConnectModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 text-left font-outfit">
            <div className="bg-white text-slate-900 border border-slate-200 rounded-3xl max-w-md w-full p-6 text-left space-y-4 shadow-2xl relative">
              <button
                onClick={() => setShowConnectModal(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {connectSuccess ? (
                <div className="py-6 text-center space-y-4">
                  <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="h-9 w-9" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-900">Identity Exchanged Successfully! 🎉</h3>
                    <p className="text-xs text-slate-600 max-w-xs mx-auto">
                      You and <span className="font-bold text-slate-900">{profile.name}</span> are now connected.
                    </p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-2xl text-xs space-y-1.5 text-left max-w-xs mx-auto">
                    <div className="flex items-center space-x-2 text-emerald-600 font-bold">
                      <Check className="h-4 w-4" />
                      <span>Contact Saved</span>
                    </div>
                    <div className="flex items-center space-x-2 text-[#6344F5] font-bold">
                      <Zap className="h-4 w-4" />
                      <span>Identity Exchanged</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => setShowConnectModal(false)}
                      className="w-full bg-[#6344F5] hover:bg-[#5233E0] text-white font-extrabold py-3 rounded-2xl text-xs transition-all cursor-pointer shadow-md"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-3">
                    <div className="h-11 w-11 rounded-2xl bg-[#6344F5]/10 border border-[#6344F5]/20 text-[#6344F5] flex items-center justify-center shrink-0">
                      <UserPlus className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900">Connect with {profile.name}</h3>
                      <p className="text-xs text-slate-500">
                        Join <span className="font-bold text-[#6344F5]">{localConnCount}</span> connected professionals
                      </p>
                    </div>
                  </div>

                  {connectError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs">
                      {connectError}
                    </div>
                  )}

                  <form onSubmit={handleConnectSubmit} className="space-y-3 pt-1">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Morgan"
                        value={connectForm.name}
                        onChange={(e) => setConnectForm({ ...connectForm, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#6344F5] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Email *</label>
                        <input
                          type="email"
                          placeholder="alex@example.com"
                          value={connectForm.email}
                          onChange={(e) => setConnectForm({ ...connectForm, email: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#6344F5] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Mobile</label>
                        <input
                          type="tel"
                          placeholder="+1 234 567 890"
                          value={connectForm.mobile}
                          onChange={(e) => setConnectForm({ ...connectForm, mobile: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#6344F5] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Company</label>
                        <input
                          type="text"
                          placeholder="Acme Corp"
                          value={connectForm.company}
                          onChange={(e) => setConnectForm({ ...connectForm, company: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#6344F5] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Designation</label>
                        <input
                          type="text"
                          placeholder="Product Manager"
                          value={connectForm.designation}
                          onChange={(e) => setConnectForm({ ...connectForm, designation: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#6344F5] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Note (Optional)</label>
                      <textarea
                        rows="2"
                        placeholder="Glad to connect with you!"
                        value={connectForm.notes}
                        onChange={(e) => setConnectForm({ ...connectForm, notes: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#6344F5] focus:outline-none resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={connecting}
                      className="w-full bg-[#6344F5] hover:bg-[#5233E0] text-white font-extrabold py-3 rounded-xl text-xs transition-all shadow-md shadow-[#6344F5]/30 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                    >
                      {connecting ? (
                        <span>Connecting...</span>
                      ) : (
                        <>
                          <UserPlus className="h-4 w-4" />
                          <span>Connect Now</span>
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className={`min-h-screen font-outfit text-left relative transition-colors py-4 sm:py-6 px-3 sm:px-6 selection:bg-[#6344F5] selection:text-white ${
      isLightMode 
        ? 'bg-slate-100/90 text-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-100/50 via-slate-100 to-slate-100' 
        : 'bg-[#090b15] text-slate-100 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-950/30 via-[#090b15] to-[#090b15]'
    }`}>
      
      {/* Background Ambient Glow Effects */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-96 bg-gradient-to-b from-[#6344F5]/10 to-transparent blur-3xl pointer-events-none"></div>

      {/* Outer Mobile Container Frame */}
      <div className="w-full max-w-md sm:max-w-xl mx-auto min-h-screen relative flex flex-col justify-between space-y-4">
        
        {/* ==================== 1. TOP FLOATING NAVBAR ==================== */}
        <header className={`sticky top-3 z-30 flex items-center justify-between py-2.5 px-4 rounded-2xl transition-all gap-2 backdrop-blur-xl ${
          isLightMode
            ? 'bg-white/80 border border-white/60 shadow-lg shadow-slate-200/40'
            : 'bg-[#121527]/80 border border-white/10 shadow-xl shadow-black/40'
        }`}>
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Logo className="h-10 sm:h-12 py-0.5" light={!isLightMode} />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 shrink-0">
            {!isInstalled && (
              <button
                type="button"
                onClick={() => !isPreview && triggerInstall({ name: profile.name, photo: profile.profilePhoto })}
                className={`h-8.5 px-3 rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer text-xs font-semibold shrink-0 whitespace-nowrap ${
                  isLightMode
                    ? 'bg-violet-50 text-[#6344F5] border border-violet-200/60 hover:bg-violet-100'
                    : 'bg-white/10 text-violet-300 border border-white/15 hover:bg-white/20'
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
              className="text-xs font-bold px-3.5 sm:px-4 h-8.5 flex items-center justify-center rounded-xl bg-gradient-to-r from-[#6344F5] to-[#7952F5] hover:from-[#5233E0] hover:to-[#6344F5] text-white transition-all cursor-pointer shadow-md shadow-[#6344F5]/25 hover:shadow-indigo-500/40 hover:scale-[1.02] shrink-0 whitespace-nowrap space-x-1.5"
            >
              <UserPlus className="h-3.5 w-3.5" />
              <span>Save Contact</span>
            </button>

            <button
              type="button"
              onClick={handleShareProfile}
              className={`h-8.5 w-8.5 rounded-xl border flex items-center justify-center transition-all cursor-pointer shrink-0 hover:scale-105 ${
                isLightMode
                  ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  : 'bg-white/10 border-white/15 text-slate-300 hover:text-white'
              }`}
            >
              <MoreHorizontal className="h-4 w-4 shrink-0" />
            </button>
          </div>
        </header>

        {/* ==================== 2. PROFILE HERO CARD (WITH COVER) ==================== */}
        <section className={`rounded-3xl overflow-hidden transition-all text-left ${
          isLightMode
            ? 'bg-white border border-slate-200/80 shadow-xl shadow-slate-200/50'
            : 'bg-[#121527] border border-white/10 shadow-2xl'
        }`}>
          {/* Header Gradient Cover Banner */}
          <div className="h-28 sm:h-36 bg-gradient-to-r from-[#5B36F5] via-[#7B57FF] to-[#A855F7] relative overflow-hidden p-4 flex items-start justify-end">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent pointer-events-none"></div>
            
            {/* Active Status Badge */}
            <div className="inline-flex items-center space-x-1.5 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold border border-white/20">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Available for Work</span>
            </div>
          </div>

          {/* Profile Details Container */}
          <div className="px-5 sm:px-6 pb-6 relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-12 sm:-mt-14 mb-4">
              {/* Avatar Photo */}
              <div className="relative shrink-0">
                <div className={`h-24 w-24 sm:h-28 sm:w-28 rounded-2xl overflow-hidden relative border-4 shadow-xl ${
                  isLightMode ? 'border-white bg-slate-100' : 'border-[#121527] bg-slate-900'
                }`}>
                  {profile.profilePhoto ? (
                    <img src={profile.profilePhoto} alt={profile.name} className="h-full w-full object-cover rounded-xl" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <User className={`h-12 w-12 ${isLightMode ? 'text-slate-400' : 'text-slate-600'}`} />
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons Bar */}
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleOpenConnect}
                  className="flex-1 sm:flex-initial bg-[#6344F5] hover:bg-[#5233E0] text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all shadow-md shadow-[#6344F5]/30 cursor-pointer"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Connect</span>
                  <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full font-bold ml-1">
                    {localConnCount}
                  </span>
                </button>
              </div>
            </div>

            {/* Name & Identity info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 flex-wrap">
                <h1 className={`text-xl sm:text-2xl font-black tracking-tight ${
                  isLightMode ? 'text-slate-950' : 'text-white'
                }`}>
                  {profile.name}
                </h1>
                {/* Verified Badge */}
                <div className="h-5 w-5 rounded-full bg-[#6344F5] flex items-center justify-center text-white shrink-0 shadow-sm" title="Verified Profile">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
              </div>

              {(profile.designation || profile.companyName) && (
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-violet-50 text-[#6344F5] border border-violet-200/60">
                  {profile.designation}{profile.companyName ? ` @ ${profile.companyName}` : ''}
                </div>
              )}

              {(profile.tagline || profile.about) && (
                <p className={`text-xs sm:text-sm leading-relaxed font-normal pt-1 ${
                  isLightMode ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  {profile.tagline || profile.about}
                </p>
              )}

              {profile.address && (
                <div className="pt-1 flex items-center space-x-1.5 text-xs text-slate-500">
                  <MapPin className="h-4 w-4 text-[#6344F5] shrink-0" />
                  <span className={isLightMode ? 'text-slate-700 font-medium' : 'text-slate-300'}>{profile.address}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ==================== 2.5 SOCIAL LINKS ROW ==================== */}
        {socialList.length > 0 && (
          <section className={`rounded-2xl p-4 text-left transition-all ${
            isLightMode
              ? 'bg-white border border-slate-200/80 shadow-sm'
              : 'bg-[#121527] border border-white/10 shadow-lg'
          }`}>
            <div className="flex items-center justify-center space-x-3 sm:space-x-4 flex-wrap gap-y-2.5">
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
                    className={`h-10 w-10 sm:h-11 sm:w-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer shadow-xs border ${
                      isLightMode
                        ? 'bg-slate-50 hover:bg-[#6344F5] text-slate-700 hover:text-white border-slate-200 hover:border-[#6344F5] hover:scale-110 hover:shadow-md'
                        : 'bg-white/5 hover:bg-[#6344F5] text-slate-300 hover:text-white border-white/10 hover:border-[#6344F5] hover:scale-110 hover:shadow-lg'
                    }`}
                  >
                    <SocialIcon type={item.type} className="h-4.5 w-4.5 sm:h-5 sm:w-5 shrink-0" />
                  </a>
                );
              })}
            </div>
          </section>
        )}

        {/* ==================== 3. HIGHLIGHTS BOX ==================== */}
        {statsList.length > 0 && (
          <section className={`rounded-2xl p-4 sm:p-5 text-left transition-all ${
            isLightMode
              ? 'bg-white border border-slate-200/80 shadow-sm'
              : 'bg-[#121527] border border-white/10 shadow-lg'
          }`}>
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-1.5 h-4 bg-[#6344F5] rounded-full"></div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Highlights
              </h3>
            </div>
            
            <div className={`grid grid-cols-${statsList.length} divide-x ${
              isLightMode ? 'divide-slate-200' : 'divide-white/10'
            }`}>
              {statsList.map((stat, idx) => (
                <div key={idx} className="text-center px-2">
                  <span className="text-xl sm:text-2xl font-black block leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#6344F5] to-violet-600">
                    {stat.value}
                  </span>
                  <span className="text-[11px] text-slate-500 block font-medium mt-1 leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ==================== 4. ABOUT ME BOX ==================== */}
        {profile.about && (
          <section className={`rounded-2xl p-5 text-left transition-all ${
            isLightMode
              ? 'bg-white border border-slate-200/80 shadow-sm hover:border-violet-300'
              : 'bg-[#121527] border border-white/10 shadow-lg hover:border-white/20'
          }`}>
            {/* Header Icon + Label */}
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-1.5 h-4 bg-[#6344F5] rounded-full"></div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                About Me
              </h3>
            </div>

            {/* Paragraph Text */}
            <div className="space-y-2">
              <p className={`text-xs sm:text-sm leading-relaxed ${
                isLightMode ? 'text-slate-700 font-normal' : 'text-slate-300 font-normal'
              } ${!showFullAbout ? 'line-clamp-4' : ''}`}>
                {profile.about}
              </p>
              {profile.about.length > 130 && (
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => setShowFullAbout(!showFullAbout)}
                    className="text-xs font-extrabold text-[#6344F5] hover:text-[#5233E0] flex items-center space-x-1 cursor-pointer"
                  >
                    <span>{showFullAbout ? 'Show Less' : 'Read Full Bio'}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ==================== 5. WHAT I DO BOX ==================== */}
        {whatIDoList.length > 0 && (
          <section className={`rounded-2xl p-5 text-left transition-all ${
            isLightMode
              ? 'bg-white border border-slate-200/80 shadow-sm'
              : 'bg-[#121527] border border-white/10 shadow-lg'
          }`}>
            {/* Header Icon + Label */}
            <div className="flex items-center space-x-2 mb-3.5">
              <div className="w-1.5 h-4 bg-[#6344F5] rounded-full"></div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                What I Do
              </h3>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-2 gap-3">
              {whatIDoList.map((item, idx) => (
                <div key={idx} className={`p-3.5 rounded-xl border text-left flex flex-col space-y-1.5 transition-all ${
                  isLightMode
                    ? 'bg-slate-50/80 border-slate-200/60 hover:bg-violet-50/50 hover:border-violet-200'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}>
                  <div className="h-8 w-8 rounded-lg bg-violet-100 text-[#6344F5] flex items-center justify-center shrink-0 mb-1">
                    {idx === 0 ? <Fingerprint className="h-4.5 w-4.5" /> :
                     idx === 1 ? <Box className="h-4.5 w-4.5" /> :
                     idx === 2 ? <Mic className="h-4.5 w-4.5" /> :
                     <Users className="h-4.5 w-4.5" />}
                  </div>
                  <h4 className={`text-xs font-extrabold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                    {item.title}
                  </h4>
                  <p className={`text-[11px] leading-relaxed line-clamp-3 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ==================== 6. FEATURED WORK BOX ==================== */}
        {workList.length > 0 && (
          <section className={`rounded-2xl p-5 text-left transition-all ${
            isLightMode
              ? 'bg-white border border-slate-200/80 shadow-sm'
              : 'bg-[#121527] border border-white/10 shadow-lg'
          }`}>
            {/* Header Icon + Label + View All */}
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-4 bg-[#6344F5] rounded-full"></div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Featured Work
                </h3>
              </div>
            </div>

            {/* Work Cards */}
            <div className="grid grid-cols-3 gap-3">
              {workList.map((work, idx) => (
                <a
                  key={idx}
                  href={work.link || '#'}
                  target={work.link ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="group block space-y-1.5 text-left cursor-pointer"
                >
                  <div className={`h-24 sm:h-28 w-full rounded-xl overflow-hidden relative border transition-all ${
                    isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-white/10'
                  }`}>
                    {work.image ? (
                      <img
                        src={work.image}
                        alt={work.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs px-2 text-center">
                        {work.title}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold truncate ${
                      isLightMode ? 'text-slate-900 group-hover:text-[#6344F5]' : 'text-white group-hover:text-[#6344F5]'
                    }`}>
                      {work.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 truncate">
                      {work.subtitle || work.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* ==================== 7. EXPERIENCE BOX ==================== */}
        {experienceTimeline.length > 0 && (
          <section className={`rounded-2xl p-5 text-left transition-all ${
            isLightMode
              ? 'bg-white border border-slate-200/80 shadow-sm'
              : 'bg-[#121527] border border-white/10 shadow-lg'
          }`}>
            {/* Header Label */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-1.5 h-4 bg-[#6344F5] rounded-full"></div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Experience Timeline
              </h3>
            </div>

            {/* Vertical Timeline */}
            <div className="space-y-4 relative pl-1">
              <div className="absolute left-[4px] top-2 bottom-3 w-[1.5px] bg-[#6344F5]/30"></div>

              {experienceTimeline.map((exp, idx) => (
                <div key={idx} className="flex items-start space-x-3.5 relative z-10">
                  <div className="flex items-center space-x-2 shrink-0 w-24 sm:w-28 pt-0.5">
                    <div className={`h-2.5 w-2.5 rounded-full ring-4 shrink-0 bg-[#6344F5] ${
                      isLightMode ? 'ring-white' : 'ring-[#121527]'
                    }`}></div>
                    <span className="text-[11px] sm:text-xs font-extrabold text-[#6344F5]">
                      {exp.period}
                    </span>
                  </div>

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
          <section className={`rounded-2xl p-5 text-left transition-all ${
            isLightMode
              ? 'bg-white border border-slate-200/80 shadow-sm'
              : 'bg-[#121527] border border-white/10 shadow-lg'
          }`}>
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-1.5 h-4 bg-[#6344F5] rounded-full"></div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Skills & Expertise
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {skillsList.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-xs font-bold px-3 py-1 rounded-xl bg-violet-50 text-[#6344F5] border border-violet-200/60"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* ==================== 9. ONEWINQ PROMO BANNER ==================== */}
        <section className="rounded-3xl bg-gradient-to-r from-slate-950 via-[#13102b] to-slate-950 p-5 border border-[#6344F5]/30 text-white relative overflow-hidden shadow-2xl text-left">
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#6344F5]/25 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-row items-center justify-between gap-4 relative z-10">
            <div className="space-y-1.5 flex-1 min-w-0">
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#6344F5]/20 text-violet-300 border border-[#6344F5]/40 inline-block uppercase tracking-wider">
                Smart Business Identity
              </span>
              <h3 className="text-base sm:text-xl font-black text-white leading-tight">
                Get Your <span className="text-[#6344F5]">OneWinq</span> Card
              </h3>
              <p className="text-xs text-slate-300 leading-tight line-clamp-2">
                Share your digital profile instantly with a tap or scan.
              </p>
              <div className="pt-1">
                <a
                  href="/pricing"
                  className="inline-flex items-center space-x-1.5 bg-white hover:bg-slate-100 text-[#6344F5] font-extrabold px-3.5 py-1.5 rounded-xl text-xs transition-all shadow-md cursor-pointer"
                >
                  <span>Create My Card</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* NFC Card Graphic */}
            <div className="relative shrink-0">
              <div className="w-24 h-16 sm:w-32 sm:h-20 rounded-xl bg-gradient-to-br from-slate-900 via-slate-950 to-black border border-white/20 p-2.5 flex flex-col justify-between shadow-2xl transform rotate-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-extrabold text-slate-300 tracking-wider">OneWinq</span>
                  <Zap className="h-3 w-3 text-[#6344F5]" />
                </div>
                <div className="self-end h-4 w-4 rounded-full bg-[#6344F5]/40 flex items-center justify-center text-white">
                  <span className="text-[8px] font-bold">NFC</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 10. FOOTER ==================== */}
        <footer className={`py-4 flex items-center justify-between text-xs px-2 ${
          isLightMode ? 'text-slate-500' : 'text-slate-400'
        }`}>
          <div className="flex items-center space-x-1.5">
            <Globe className="h-3.5 w-3.5 text-[#6344F5]" />
            <span className="font-semibold text-slate-600">
              {profile.website ? profile.website.replace(/^https?:\/\//, '') : 'onewinq.com'}
            </span>
          </div>

          <div>
            <span className="font-semibold">
              Powered by <span className="text-[#6344F5] font-extrabold">OneWinq</span>
            </span>
          </div>
        </footer>

      </div>

      {/* CONNECT MODAL */}
      {showConnectModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 text-left font-outfit">
          <div className="bg-white text-slate-900 border border-slate-200 rounded-3xl max-w-md w-full p-6 text-left space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowConnectModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {connectSuccess ? (
              <div className="py-6 text-center space-y-3">
                <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">Connected! 🎉</h3>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  You are now connected with <span className="font-bold text-slate-900">{profile.name}</span>.
                </p>
                <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-xl text-xs font-bold text-indigo-700 inline-block">
                  ⚡ Total Connections: {localConnCount}
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setShowConnectModal(false)}
                    className="w-full bg-[#6344F5] hover:bg-[#5233E0] text-white font-bold py-3 rounded-xl text-xs transition-all cursor-pointer shadow-md"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : !user && !showGuestForm ? (
                <div className="py-2 text-center space-y-4">
                  <div className="h-14 w-14 rounded-2xl bg-[#6344F5]/10 border border-[#6344F5]/20 text-[#6344F5] flex items-center justify-center mx-auto shadow-sm">
                    <UserPlus className="h-7 w-7" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-slate-900">Join OneWinq to connect with {profile.name}</h3>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                      Create your digital identity and start building meaningful professional connections.
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <Link
                      to={`/login?redirect=${encodeURIComponent(window.location.pathname)}&autoConnect=true`}
                      className="w-full bg-[#6344F5] hover:bg-[#5233E0] text-white font-extrabold py-3 rounded-2xl text-xs transition-all shadow-md shadow-[#6344F5]/30 flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <LogIn className="h-4 w-4" />
                      <span>Login to Connect</span>
                    </Link>

                    <Link
                      to={`/signup?redirect=${encodeURIComponent(window.location.pathname)}&autoConnect=true`}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold py-3 rounded-2xl text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer border border-slate-200"
                    >
                      <UserPlus className="h-4 w-4 text-[#6344F5]" />
                      <span>Create OneWinq Account</span>
                    </Link>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setShowGuestForm(true)}
                      className="text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                    >
                      Or connect as guest →
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-3">
                    <div className="h-11 w-11 rounded-2xl bg-[#6344F5]/10 border border-[#6344F5]/20 text-[#6344F5] flex items-center justify-center shrink-0">
                      <UserPlus className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900">Connect with {profile.name}</h3>
                      <p className="text-xs text-slate-500">
                        Join <span className="font-bold text-[#6344F5]">{localConnCount}</span> connected professionals
                      </p>
                    </div>
                  </div>

                  {connectError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs">
                      {connectError}
                    </div>
                  )}

                  <form onSubmit={handleConnectSubmit} className="space-y-3 pt-1">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Morgan"
                        value={connectForm.name}
                        onChange={(e) => setConnectForm({ ...connectForm, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#6344F5] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Email *</label>
                        <input
                          type="email"
                          placeholder="alex@example.com"
                          value={connectForm.email}
                          onChange={(e) => setConnectForm({ ...connectForm, email: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#6344F5] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Mobile</label>
                        <input
                          type="tel"
                          placeholder="+1 234 567 890"
                          value={connectForm.mobile}
                          onChange={(e) => setConnectForm({ ...connectForm, mobile: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#6344F5] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Company</label>
                        <input
                          type="text"
                          placeholder="Acme Corp"
                          value={connectForm.company}
                          onChange={(e) => setConnectForm({ ...connectForm, company: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#6344F5] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Designation</label>
                        <input
                          type="text"
                          placeholder="Product Manager"
                          value={connectForm.designation}
                          onChange={(e) => setConnectForm({ ...connectForm, designation: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#6344F5] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Note (Optional)</label>
                      <textarea
                        rows="2"
                        placeholder="Glad to connect with you!"
                        value={connectForm.notes}
                        onChange={(e) => setConnectForm({ ...connectForm, notes: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#6344F5] focus:outline-none resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={connecting}
                      className="w-full bg-[#6344F5] hover:bg-[#5233E0] text-white font-extrabold py-3 rounded-xl text-xs transition-all shadow-md shadow-[#6344F5]/30 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                    >
                      {connecting ? (
                        <span>Connecting...</span>
                      ) : (
                        <>
                          <UserPlus className="h-4 w-4" />
                          <span>Connect Now</span>
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateCardRenderer;

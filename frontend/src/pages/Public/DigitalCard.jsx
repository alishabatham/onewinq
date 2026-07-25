import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth, API_URL } from '../../context/AuthContext';
import TemplateCardRenderer from '../../components/TemplateCardRenderer';
import LetsConnectSection from '../../components/LetsConnectSection';
import { getTemplateById } from '../../data/templatesData';
import { 
  Phone, MessageSquare, Mail, Globe, FileText, Download, User, AlertCircle, ShieldAlert, CreditCard, RefreshCw, Share2
} from 'lucide-react';

const DigitalCard = () => {
  const { cardId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [linked, setLinked] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cardStatus, setCardStatus] = useState('active');

  useEffect(() => {
    fetchPublicProfile();
  }, [cardId]);

  useEffect(() => {
    if (profile) {
      const profileName = profile.name || 'Digital Card';
      // Set page title to profile name
      document.title = `${profileName} | OneWinq`;

      // Set Apple Touch Icon to profile photo (for home screen bookmark icon)
      let appleIcon = document.querySelector('link[rel="apple-touch-icon"]');
      if (!appleIcon) {
        appleIcon = document.createElement('link');
        appleIcon.rel = 'apple-touch-icon';
        document.head.appendChild(appleIcon);
      }
      if (profile.profilePhoto) {
        appleIcon.href = profile.profilePhoto;
      } else {
        appleIcon.href = '/favicon.svg';
      }

      // Set mobile web app title
      let metaAppTitle = document.querySelector('meta[name="apple-mobile-web-app-title"]');
      if (!metaAppTitle) {
        metaAppTitle = document.createElement('meta');
        metaAppTitle.name = 'apple-mobile-web-app-title';
        document.head.appendChild(metaAppTitle);
      }
      metaAppTitle.content = profileName;
    }
  }, [profile]);

  const fetchPublicProfile = async () => {
    try {
      const isTap = searchParams.get('tap') === 'true' || searchParams.get('src') === 'nfc';
      const res = await axios.get(`${API_URL}/card/public/${cardId}?tap=${isTap}`);
      if (res.data.success) {
        if (res.data.linked === false) {
          setLinked(false);
        } else {
          setProfile(res.data.profile);
          setLinked(true);
        }
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 403 && err.response?.data?.status === 'paused') {
        setCardStatus('paused');
      } else {
        setError(err.response?.data?.message || 'The digital card profile you requested could not be found.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClaimCard = async () => {
    if (!user) return;
    setClaiming(true);
    setError('');
    try {
      const res = await axios.post(`${API_URL}/card/link`, { cardId });
      if (res.data.success) {
        // Link successful! Redirect to dashboard
        navigate('/dashboard/mycard?success=true');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Could not link this card to your account.');
    } finally {
      setClaiming(false);
    }
  };

  const handleSaveContact = () => {
    if (!profile) return;

    // Build vCard (VCF) format
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${profile.name || ''}`,
      `N:${profile.name?.split(' ')[1] || ''};${profile.name?.split(' ')[0] || ''};;;`,
      `ORG:${profile.companyName || ''}`,
      `TITLE:${profile.designation || ''}`,
      `TEL;TYPE=CELL:${profile.mobile || ''}`,
      `EMAIL;TYPE=PREF,INTERNET:${profile.email || ''}`,
      `URL:${profile.website || ''}`,
      `NOTE:${profile.about || ''}`,
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${profile.name?.replace(/\s+/g, '_') || 'contact'}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${profile?.name || 'Digital Identity Card'} | OneWinq`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Profile link copied to clipboard!');
    }
  };

  const cleanPhone = (num) => {
    if (!num) return '';
    return num.replace(/[^+\d]/g, ''); // strip out dashes and spaces for tel link
  };

  if (loading) {
    return (
      <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-600 mb-2"></div>
        <span className="text-sm text-slate-550">Loading digital profile...</span>
      </div>
    );
  }

  if (cardStatus === 'paused') {
    return (
      <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 max-w-sm space-y-4 shadow-sm">
          <ShieldAlert className="h-16 w-16 text-amber-500 mx-auto" />
          <h2 className="text-2xl font-bold text-slate-900">Card Paused</h2>
          <p className="text-slate-550 text-sm leading-relaxed">
            This digital card profile has been temporarily paused by its owner. Please try scanning later.
          </p>
        </div>
      </div>
    );
  }

  if (!linked) {
    return (
      <div className="bg-slate-50 text-slate-800 min-h-screen py-10 px-4 flex flex-col justify-center items-center relative font-outfit">
        {/* Background radial effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-indigo-650/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 p-8 flex flex-col items-center text-center relative overflow-hidden shadow-sm">
          {/* Accent decoration */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

          {/* Icon container */}
          <div className="h-20 w-20 rounded-2xl bg-indigo-50 border border-indigo-150 flex items-center justify-center shadow-xs mt-4 mb-6">
            <CreditCard className="h-10 w-10 text-indigo-600 animate-pulse" />
          </div>

          <h2 className="text-2xl font-bold text-slate-900 leading-tight">Activate Your Card</h2>
          <p className="text-slate-550 text-sm mt-3 leading-relaxed max-w-xs">
            This OneWinq smart business card has not been activated yet. Link it to your profile to start networking instantly.
          </p>

          <div className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 mt-6 text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Card Identifier</span>
            <span className="font-mono text-sm font-bold text-indigo-600 block">{cardId}</span>
          </div>

          {error && (
            <div className="mt-4 w-full bg-red-50 border border-red-100 text-red-650 p-3 rounded-lg text-xs flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {user ? (
            /* Logged in Claim View */
            <div className="mt-8 w-full space-y-3">
              <p className="text-xs text-slate-500">
                Logged in as <span className="font-bold text-slate-800">{user.name}</span> ({user.email})
              </p>
              <button
                onClick={handleClaimCard}
                disabled={claiming}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-xs transition-all flex items-center justify-center space-x-2 text-sm cursor-pointer disabled:opacity-50"
              >
                {claiming ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Activating Card...</span>
                  </>
                ) : (
                  <span>Link to My Profile</span>
                )}
              </button>
              <Link
                to="/dashboard"
                className="w-full block bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-xl text-sm transition-all"
              >
                Go to Dashboard
              </Link>
            </div>
          ) : (
            /* Logged out Login/Signup View */
            <div className="mt-8 w-full grid grid-cols-2 gap-3">
              <Link
                to={`/login?claim=${cardId}`}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl text-center shadow-xs transition-all text-sm flex items-center justify-center space-x-1.5"
              >
                <span>Log In</span>
              </Link>
              <Link
                to={`/signup?claim=${cardId}`}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-xl text-center transition-all text-sm flex items-center justify-center space-x-1.5"
              >
                <span>Sign Up</span>
              </Link>
            </div>
          )}

          {/* Footer Brand */}
          <div className="mt-8 text-center border-t border-slate-100 pt-5 w-full">
            <span className="text-[10px] text-slate-400 flex items-center justify-center space-x-1.5">
              <CreditCard className="h-3 w-3" />
              <span>Powered by <span className="font-bold text-slate-500">OneWinq Digital</span></span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 max-w-sm space-y-4 shadow-sm">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto" />
          <h2 className="text-2xl font-bold text-slate-900">Profile Missing</h2>
          <p className="text-slate-550 text-sm leading-relaxed">
            {error || 'The digital card profile you requested could not be found or is not linked yet.'}
          </p>
        </div>
      </div>
    );
  }

  const templatePreviewParam = searchParams.get('template');
  const selectedTemplateId = templatePreviewParam || profile?.templateId || 'nova';
  const currentTemplate = getTemplateById(selectedTemplateId);
  const isLightMode = selectedTemplateId === 'nova';

  return (
    <div className={`min-h-screen font-outfit ${isLightMode ? 'bg-slate-100 text-slate-900' : 'bg-[#090b15] text-slate-100'}`}>
      <TemplateCardRenderer
        profile={profile}
        templateIdOverride={templatePreviewParam || profile.templateId}
        onSaveContact={handleSaveContact}
        isPreview={false}
      />
    </div>
  );
};

export default DigitalCard;

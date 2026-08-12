import React, { useState } from 'react';
import { 
  Calendar, FileText, Briefcase, Globe, Video, Download, Share2, Phone, MessageSquare, Mail, MapPin,
  X, Check, ExternalLink, ChevronRight, Play, Sparkles, Smartphone
} from 'lucide-react';
import { usePWA } from '../context/PWAContext';

const LetsConnectSection = ({ profile, onSaveContact, onOpenConnect, onTapOption, isPreview = false }) => {
  const { triggerInstall, isInstalled } = usePWA();
  const [activeModal, setActiveModal] = useState(null); // 'meeting' | 'brochure' | 'services' | 'video'
  const [meetingSubmitted, setMeetingSubmitted] = useState(false);
  const [meetingForm, setMeetingForm] = useState({ name: '', email: '', notes: '' });

  const cleanPhone = (num) => {
    if (!num) return '';
    return num.replace(/[^+\d]/g, '');
  };

  const totalConnectionsCount = profile?.totalConnections !== undefined 
    ? profile.totalConnections 
    : (parseInt(profile?.connectionsCount) || 0);

  const servicesList = profile?.services && profile.services.length > 0 ? profile.services : [
    { title: 'Digital Business Solutions', description: 'NFC smart identity, enterprise web & cloud infrastructure.', icon: 'Zap' },
    { title: 'AI & Automation', description: 'Custom AI assistants, workflow automation & intelligent tools.', icon: 'Sparkles' },
    { title: 'Product Architecture', description: 'Scalable software development, UX design & cloud systems.', icon: 'Briefcase' },
  ];

  const handleShareProfile = () => {
    if (onTapOption) onTapOption('share');
    if (navigator.share) {
      navigator.share({
        title: `${profile?.name || 'Digital Profile'} | OneWinq`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Profile link copied to clipboard!');
    }
  };

  const handleMeetingSubmit = (e) => {
    e.preventDefault();
    if (onTapOption) onTapOption('meeting');
    setMeetingSubmitted(true);
    setTimeout(() => {
      setMeetingSubmitted(false);
      setActiveModal(null);
    }, 3000);
  };

  return (
    <div className="w-full space-y-4 font-outfit text-slate-900 text-left">
      {/* Top Action Buttons: Save Contact & Share Profile */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => {
            if (isPreview) return;
            if (onTapOption) onTapOption('save_contact');
            if (onSaveContact) onSaveContact();
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-3.5 px-4 rounded-2xl shadow-md shadow-indigo-500/20 flex items-center justify-center space-x-2 text-xs transition-all cursor-pointer"
        >
          <Download className="h-4 w-4" />
          <span>Save Contact</span>
        </button>

        <button
          onClick={handleShareProfile}
          className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-extrabold py-3.5 px-4 rounded-2xl flex items-center justify-center space-x-2 text-xs transition-all shadow-xs cursor-pointer"
        >
          <Share2 className="h-4 w-4 text-indigo-600" />
          <span>Share Profile</span>
        </button>
      </div>

      {/* Add App Icon to Home Screen (PWA Button) */}
      {!isInstalled && (
        <button
          onClick={() => {
            if (isPreview) return;
            if (onTapOption) onTapOption('pwa_install');
            triggerInstall();
          }}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3 px-4 rounded-2xl shadow-md flex items-center justify-center space-x-2 text-xs transition-all cursor-pointer border border-slate-700/50"
        >
          <Smartphone className="h-4 w-4 text-[#6344F5]" />
          <span>Download App Icon to Phone</span>
        </button>
      )}

      {/* Quick Communication Row (Call, WhatsApp, Email, Location) */}
      <div className="grid grid-cols-4 gap-2 bg-white border border-slate-200/90 p-3 rounded-2xl text-center shadow-xs">
        {profile?.mobile && (
          <a
            href={!isPreview ? `tel:${cleanPhone(profile.mobile)}` : '#'}
            onClick={(e) => {
              if (isPreview) e.preventDefault();
              if (onTapOption) onTapOption('call');
            }}
            className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-50 rounded-xl transition-all"
          >
            <div className="h-9 w-9 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-1">
              <Phone className="h-4 w-4" />
            </div>
            <span className="text-[10px] font-bold text-slate-700">Call</span>
          </a>
        )}

        {profile?.whatsApp && (
          <a
            href={!isPreview ? `https://wa.me/${cleanPhone(profile.whatsApp)}` : '#'}
            target={!isPreview ? "_blank" : "_self"}
            rel="noreferrer"
            onClick={(e) => {
              if (isPreview) e.preventDefault();
              if (onTapOption) onTapOption('whatsApp');
            }}
            className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-50 rounded-xl transition-all"
          >
            <div className="h-9 w-9 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-1">
              <MessageSquare className="h-4 w-4" />
            </div>
            <span className="text-[10px] font-bold text-slate-700">WhatsApp</span>
          </a>
        )}

        {profile?.email && (
          <a
            href={!isPreview ? `mailto:${profile.email}` : '#'}
            onClick={(e) => {
              if (isPreview) e.preventDefault();
              if (onTapOption) onTapOption('email');
            }}
            className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-50 rounded-xl transition-all"
          >
            <div className="h-9 w-9 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mb-1">
              <Mail className="h-4 w-4" />
            </div>
            <span className="text-[10px] font-bold text-slate-700">Email</span>
          </a>
        )}

        {profile?.address && (
          <a
            href={!isPreview ? `https://maps.google.com/?q=${encodeURIComponent(profile.address)}` : '#'}
            target={!isPreview ? "_blank" : "_self"}
            rel="noreferrer"
            onClick={(e) => {
              if (isPreview) e.preventDefault();
              if (onTapOption) onTapOption('location');
            }}
            className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-50 rounded-xl transition-all"
          >
            <div className="h-9 w-9 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center mb-1">
              <MapPin className="h-4 w-4" />
            </div>
            <span className="text-[10px] font-bold text-slate-700">Location</span>
          </a>
        )}
      </div>

      {/* LET'S CONNECT Main Interactive Options Card */}
      <div className="bg-white border border-slate-200/90 p-5 rounded-3xl space-y-3 shadow-xs">
        <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest px-1 pb-1">Let's Connect</h3>

        <div className="space-y-2.5">
          {/* Option 0: Connect & Exchange Info */}
          {onOpenConnect && (
            <button
              onClick={() => {
                if (onTapOption) onTapOption('connect');
                onOpenConnect();
              }}
              className="w-full bg-[#6344F5]/10 hover:bg-[#6344F5]/15 border border-[#6344F5]/30 p-3.5 rounded-2xl flex items-center justify-between group transition-all cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-xl bg-[#6344F5] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#6344F5]/30">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#6344F5] transition-colors">Connect with Me</h4>
                  <p className="text-[10px] text-slate-500">
                    Join <span className="font-bold text-[#6344F5]">{totalConnectionsCount}</span> connected professionals
                  </p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-[#6344F5] group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}

          {/* Option 1: Book a Meeting */}
          <button
            onClick={() => {
              if (onTapOption) onTapOption('meeting');
              setActiveModal('meeting');
            }}
            className="w-full bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200 p-3.5 rounded-2xl flex items-center justify-between group transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Book a Meeting</h4>
                <p className="text-[10px] text-slate-500">Schedule time with me</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
          </button>

          {/* Option 2: View Brochure */}
          <button
            onClick={() => {
              if (onTapOption) onTapOption('brochure');
              setActiveModal('brochure');
            }}
            className="w-full bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200 p-3.5 rounded-2xl flex items-center justify-between group transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-purple-600 transition-colors">View Brochure</h4>
                <p className="text-[10px] text-slate-500">Download Company Brochure</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-purple-600 transition-colors" />
          </button>

          {/* Option 3: Our Services */}
          <button
            onClick={() => {
              if (onTapOption) onTapOption('services');
              setActiveModal('services');
            }}
            className="w-full bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200 p-3.5 rounded-2xl flex items-center justify-between group transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Briefcase className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">Our Services</h4>
                <p className="text-[10px] text-slate-500">Explore what we offer</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
          </button>

          {/* Option 4: Visit Website */}
          {profile?.website && (
            <a
              href={!isPreview ? profile.website : '#'}
              target={!isPreview ? "_blank" : "_self"}
              rel="noreferrer"
              onClick={(e) => {
                if (isPreview) e.preventDefault();
                if (onTapOption) onTapOption('website');
              }}
              className="w-full bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200 p-3.5 rounded-2xl flex items-center justify-between group transition-all cursor-pointer block"
            >
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Globe className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Visit Website</h4>
                  <p className="text-[10px] text-slate-500 truncate max-w-[180px]">{profile.website.replace(/^https?:\/\//, '')}</p>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </a>
          )}

          {/* Option 5: Watch Video */}
          <button
            onClick={() => {
              if (onTapOption) onTapOption('video');
              setActiveModal('video');
            }}
            className="w-full bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200 p-3.5 rounded-2xl flex items-center justify-between group transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <Play className="h-5 w-5 fill-current" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-rose-600 transition-colors">Watch Video</h4>
                <p className="text-[10px] text-slate-500">Company Introduction</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-rose-600 transition-colors" />
          </button>
        </div>
      </div>


      {/* LIGHT MODE MODALS */}

      {/* 1. Meeting Modal */}
      {activeModal === 'meeting' && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 text-left space-y-4 shadow-2xl relative">
            <button onClick={() => setActiveModal(null)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700">
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Book a Meeting</h3>
                <p className="text-xs text-slate-500">Schedule time directly with {profile?.name || 'us'}</p>
              </div>
            </div>

            {profile?.meetingLink ? (
              <div className="space-y-4 pt-2">
                <p className="text-xs text-slate-600">Click below to open calendar booking page:</p>
                <a
                  href={profile.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-3 rounded-2xl flex items-center justify-center space-x-2 text-xs transition-all block text-center"
                >
                  <span>Open Calendar Schedule</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            ) : (
              <form onSubmit={handleMeetingSubmit} className="space-y-3 pt-2">
                {meetingSubmitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-2xl text-xs flex items-center space-x-2">
                    <Check className="h-5 w-5 shrink-0" />
                    <span>Meeting request sent! We will reach out shortly.</span>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={meetingForm.name}
                        onChange={(e) => setMeetingForm({ ...meetingForm, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Email / Phone *</label>
                      <input
                        type="text"
                        required
                        placeholder="john@example.com"
                        value={meetingForm.email}
                        onChange={(e) => setMeetingForm({ ...meetingForm, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Preferred Time / Notes</label>
                      <textarea
                        rows="2"
                        placeholder="Discuss digital identity setup..."
                        value={meetingForm.notes}
                        onChange={(e) => setMeetingForm({ ...meetingForm, notes: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-600 focus:outline-none"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-3 rounded-2xl text-xs transition-all cursor-pointer"
                    >
                      Submit Meeting Request
                    </button>
                  </>
                )}
              </form>
            )}
          </div>
        </div>
      )}

      {/* 2. View Brochure Modal */}
      {activeModal === 'brochure' && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 text-left space-y-4 shadow-2xl relative">
            <button onClick={() => setActiveModal(null)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700">
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Company Brochure</h3>
                <p className="text-xs text-slate-500">Download official presentation PDF</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-3">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-purple-600" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{profile?.companyName || 'NX Group'} Brochure</h4>
                  <span className="text-[10px] text-slate-500">PDF Document • 2.4 MB</span>
                </div>
              </div>

              {profile?.company?.brochure ? (
                <a
                  href={profile.company.brochure}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-extrabold py-3 rounded-2xl flex items-center justify-center space-x-2 text-xs transition-all block text-center"
                >
                  <Download className="h-4 w-4" />
                  <span>Download PDF Brochure</span>
                </a>
              ) : (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Sample Brochure PDF. Please upload your PDF brochure in profile settings.');
                  }}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-extrabold py-3 rounded-2xl flex items-center justify-center space-x-2 text-xs transition-all block text-center"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Brochure PDF</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. Our Services Modal */}
      {activeModal === 'services' && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 text-left space-y-4 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button onClick={() => setActiveModal(null)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700">
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Our Services & Solutions</h3>
                <p className="text-xs text-slate-500">Discover what we offer</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {servicesList.map((srv, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-1">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-emerald-600 shrink-0" />
                    <h4 className="text-xs font-bold text-slate-900">{srv.title}</h4>
                  </div>
                  <p className="text-[11px] text-slate-600 pl-6 leading-relaxed">{srv.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Watch Video Modal */}
      {activeModal === 'video' && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 text-left space-y-4 shadow-2xl relative">
            <button onClick={() => setActiveModal(null)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700">
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center">
                <Video className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Watch Introduction Video</h3>
                <p className="text-xs text-slate-500">Company & product introduction</p>
              </div>
            </div>

            <div className="w-full aspect-video rounded-2xl bg-slate-900 border border-slate-200 flex items-center justify-center overflow-hidden">
              {profile?.videoUrl && profile.videoUrl.includes('youtube.com') ? (
                <iframe
                  src={profile.videoUrl.replace('watch?v=', 'embed/')}
                  title="Intro Video"
                  className="w-full h-full"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="text-center space-y-2 p-6 text-white">
                  <Play className="h-12 w-12 text-rose-500 mx-auto" />
                  <p className="text-xs text-slate-200 font-semibold">Digital Identity Video Demo</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LetsConnectSection;

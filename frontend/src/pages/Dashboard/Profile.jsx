import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';
import { TEMPLATES } from '../../data/templatesData';
import TemplateCardRenderer from '../../components/TemplateCardRenderer';
import { 
  User, Link2, Building2, Upload, AlertCircle, CheckCircle2, RefreshCw, FileText, Layout, Sparkles, Eye, Check, Lock,
  Gem, Wand2, BarChart2, Globe, Shield, Ban, ArrowRight, Zap, Briefcase, Award, Plus, Trash2
} from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [proUpgradeModal, setProUpgradeModal] = useState(null);

  // Upload progress states
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingBrochure, setUploadingBrochure] = useState(false);

  const [cardId, setCardId] = useState(null);
  const [profileId, setProfileId] = useState(null);

  // Form State
  const [form, setForm] = useState({
    name: '',
    designation: '',
    companyName: '',
    about: '',
    mobile: '',
    email: '',
    website: '',
    whatsApp: '',
    address: '',
    profilePhoto: '',
    templateId: 'nova',
    customUsername: '',
    tagline: '',
    vision: '',
    techStack: '',
    experience: '2+ Years',
    skillsCount: '12+ Skills',
    projectsCount: '6+ Projects',
    education: 'B.Tech CSE',
    resume: '',
    whatIDo: '',
    roles: '',
    conversationStarters: '',
    currently: '',
    lookingFor: '',
    availability: 'Open for Opportunities',
    socialLinks: {
      linkedIn: '',
      instagram: '',
      facebook: '',
      twitter: '',
      gitHub: '',
    },
    company: {
      logo: '',
      description: '',
      website: '',
      brochure: '',
    },
  });

  useEffect(() => {
    fetchProfile();
    fetchCardDetails();
  }, []);

  const fetchCardDetails = async () => {
    try {
      const res = await axios.get(`${API_URL}/card/mycard`);
      if (res.data.success && res.data.card) {
        setCardId(res.data.card.cardId);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API_URL}/profile/me`);
      if (res.data.success && res.data.profile) {
        const p = res.data.profile;
        setProfileId(p._id);
        setForm({
          name: p.name || '',
          designation: p.designation || '',
          companyName: p.companyName || '',
          about: p.about || '',
          mobile: p.mobile || '',
          email: p.email || '',
          website: p.website || '',
          whatsApp: p.whatsApp || '',
          address: p.address || '',
          profilePhoto: p.profilePhoto || '',
          templateId: p.templateId || 'nova',
          customUsername: p.customUsername || '',
          experience: p.experience || '',
          experienceLabel: p.experienceLabel || '',
          companiesBuilt: p.companiesBuilt || '',
          companiesLabel: p.companiesLabel || '',
          connectionsCount: p.connectionsCount || '',
          connectionsLabel: p.connectionsLabel || '',
          skillsInput: Array.isArray(p.skills) ? p.skills.join(', ') : '',
          socialLinks: {
            linkedIn: p.socialLinks?.linkedIn || '',
            instagram: p.socialLinks?.instagram || '',
            facebook: p.socialLinks?.facebook || '',
            twitter: p.socialLinks?.twitter || '',
            gitHub: p.socialLinks?.gitHub || '',
          },
          company: {
            logo: p.company?.logo || '',
            description: p.company?.description || '',
            website: p.company?.website || '',
            brochure: p.company?.brochure || '',
          },
          services: Array.isArray(p.services) ? p.services : [],
          featuredWork: Array.isArray(p.featuredWork) ? p.featuredWork : [],
          experienceTimeline: Array.isArray(p.experienceTimeline) ? p.experienceTimeline : [],
          achievements: Array.isArray(p.achievements) ? p.achievements : [],
        });
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch profile details.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e, fieldType) => {
    const file = e.target.files[0];
    if (!file) return;

    // Set uploading state
    if (fieldType === 'photo') setUploadingPhoto(true);
    if (fieldType === 'logo') setUploadingLogo(true);
    if (fieldType === 'brochure') setUploadingBrochure(true);

    setError('');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(`${API_URL}/profile/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        const fileUrl = res.data.url;
        if (fieldType === 'photo') {
          setForm((prev) => ({ ...prev, profilePhoto: fileUrl }));
        } else if (fieldType === 'logo') {
          setForm((prev) => ({
            ...prev,
            company: { ...prev.company, logo: fileUrl },
          }));
        } else if (fieldType === 'brochure') {
          setForm((prev) => ({
            ...prev,
            company: { ...prev.company, brochure: fileUrl },
          }));
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'File upload failed. Only images and PDFs allowed.');
    } finally {
      if (fieldType === 'photo') setUploadingPhoto(false);
      if (fieldType === 'logo') setUploadingLogo(false);
      if (fieldType === 'brochure') setUploadingBrochure(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setSaving(true);

    try {
      const skillsArray = (form.skillsInput || '')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      const payload = {
        ...form,
        skills: skillsArray,
      };

      const res = await axios.put(`${API_URL}/profile/me`, payload);
      if (res.data.success) {
        setSuccess(true);
        // Scroll to top to see success alert
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save profile changes.');
    } finally {
      setSaving(false);
    }
  };

  const handleApplyTemplate = async (tmpl) => {
    if (!tmpl.isFree) {
      alert(`🔒 The "${tmpl.publicName}" template kit is coming soon! Stay tuned.`);
      return;
    }

    const updatedForm = { ...form, templateId: tmpl.id };
    setForm(updatedForm);
    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      const res = await axios.put(`${API_URL}/profile/me`, updatedForm);
      if (res.data.success) {
        setSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update template.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500 space-y-3">
        <RefreshCw className="h-7 w-7 text-indigo-600 animate-spin" />
        <span className="text-sm font-medium">Loading profile details...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">My Profile</h1>
          <p className="text-sm text-slate-550 mt-1">Configure your digital NFC identity presentation card details.</p>
        </div>

        <a
          href={`/u/${form.customUsername || cardId || profileId || 'me'}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md transition-all shrink-0 cursor-pointer"
        >
          <Eye className="h-4 w-4" />
          <span>View Live Digital Card</span>
        </a>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto space-x-1 scrollbar-none -mx-1 px-1">
        <button
          type="button"
          onClick={() => setActiveTab('basic')}
          className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium text-xs sm:text-sm shrink-0 transition-all cursor-pointer ${
            activeTab === 'basic' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-indigo-600'
          }`}
        >
          <User className="h-4 w-4" />
          <span>Basic Profile</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('social')}
          className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium text-xs sm:text-sm shrink-0 transition-all cursor-pointer ${
            activeTab === 'social' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-indigo-600'
          }`}
        >
          <Link2 className="h-4 w-4" />
          <span>Social Links</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('services')}
          className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium text-xs sm:text-sm shrink-0 transition-all cursor-pointer ${
            activeTab === 'services' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-indigo-600'
          }`}
        >
          <Zap className="h-4 w-4" />
          <span>Services</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('work')}
          className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium text-xs sm:text-sm shrink-0 transition-all cursor-pointer ${
            activeTab === 'work' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-indigo-600'
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span>Featured Work</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('timeline')}
          className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium text-xs sm:text-sm shrink-0 transition-all cursor-pointer ${
            activeTab === 'timeline' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-indigo-600'
          }`}
        >
          <Briefcase className="h-4 w-4" />
          <span>Experience & Achievements</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('templates')}
          className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium text-xs sm:text-sm shrink-0 transition-all cursor-pointer ${
            activeTab === 'templates' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-indigo-600'
          }`}
        >
          <Layout className="h-4 w-4" />
          <span>Templates & Design</span>
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-650 p-3 rounded-lg flex items-start space-x-2 text-xs">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-650 p-3 rounded-lg flex items-start space-x-2 text-xs">
          <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 text-emerald-500" />
          <span>Profile settings updated and saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tab 1: Basic Info */}
        {activeTab === 'basic' && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Basic Information</h3>
            
            {/* Profile Photo Uploader */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pb-6 border-b border-slate-100">
              <div className="relative group">
                <div className="h-24 w-24 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                  {form.profilePhoto ? (
                    <img src={form.profilePhoto} alt="Profile Photo" className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-10 w-10 text-slate-400" />
                  )}
                </div>
                {uploadingPhoto && (
                  <div className="absolute inset-0 bg-slate-900/60 rounded-full flex items-center justify-center">
                    <RefreshCw className="h-5 w-5 text-white animate-spin" />
                  </div>
                )}
              </div>
              <div className="text-center sm:text-left">
                <label className="cursor-pointer bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 px-4 py-2 rounded-lg text-sm font-semibold transition-all inline-flex items-center space-x-2">
                  <Upload className="h-4 w-4 text-slate-500" />
                  <span>{uploadingPhoto ? 'Uploading...' : 'Upload Photo'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, 'photo')}
                    disabled={uploadingPhoto}
                  />
                </label>
                <p className="text-xs text-slate-500 mt-2">Recommended: Square JPEG/PNG. Max size 5MB.</p>
              </div>
            </div>

            {/* Basic Grid Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Name *</label>
                <input
                  type="text"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-650 focus:bg-white text-sm transition-all"
                  placeholder="Rajat Sharma"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Designation</label>
                <input
                  type="text"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-650 focus:bg-white text-sm transition-all"
                  placeholder="Founder"
                  value={form.designation}
                  onChange={(e) => setForm({ ...form, designation: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Company Name</label>
                <input
                  type="text"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-650 focus:bg-white text-sm transition-all"
                  placeholder="NX Group"
                  value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Mobile Phone *</label>
                <input
                  type="text"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-650 focus:bg-white text-sm transition-all"
                  placeholder="+91 98765 43210"
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-650 focus:bg-white text-sm transition-all"
                  placeholder="rajat@nxgroup.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">WhatsApp Number</label>
                <input
                  type="text"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-650 focus:bg-white text-sm transition-all"
                  placeholder="+91 98765 43210"
                  value={form.whatsApp}
                  onChange={(e) => setForm({ ...form, whatsApp: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Website URL</label>
                <input
                  type="url"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-655 focus:bg-white text-sm transition-all"
                  placeholder="https://nxgroup.com"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">About / Bio</label>
                <textarea
                  rows="3"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-655 focus:bg-white text-sm transition-all"
                  placeholder="Tell clients about yourself or your company mission..."
                  value={form.about}
                  onChange={(e) => setForm({ ...form, about: e.target.value })}
                ></textarea>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Address</label>
                <input
                  type="text"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-655 focus:bg-white text-sm transition-all"
                  placeholder="Indore, Madhya Pradesh, India"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
              </div>

              {/* Stats & Metrics Highlights */}
              <div className="sm:col-span-2 border-t border-slate-100 pt-5 mt-2 space-y-4">
                <div>
                  <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Digital Card Highlights & Metrics (Optional)</h4>
                  <p className="text-xs text-slate-500 mt-1">Customize the 3 stat metrics displayed on your card (Value & Label). Leave blank if you do not want to show metrics.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Metric 1 */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-[11px] font-bold text-indigo-600 block">Metric 1</span>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 uppercase">Value</label>
                      <input
                        type="text"
                        placeholder="e.g. 5+"
                        value={form.experience}
                        onChange={(e) => setForm({ ...form, experience: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-800 text-xs focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 uppercase">Label</label>
                      <input
                        type="text"
                        placeholder="e.g. Years of Experience"
                        value={form.experienceLabel}
                        onChange={(e) => setForm({ ...form, experienceLabel: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-800 text-xs focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-[11px] font-bold text-indigo-600 block">Metric 2</span>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 uppercase">Value</label>
                      <input
                        type="text"
                        placeholder="e.g. 10K+"
                        value={form.connectionsCount}
                        onChange={(e) => setForm({ ...form, connectionsCount: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-800 text-xs focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 uppercase">Label</label>
                      <input
                        type="text"
                        placeholder="e.g. Connections Made"
                        value={form.connectionsLabel}
                        onChange={(e) => setForm({ ...form, connectionsLabel: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-800 text-xs focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-[11px] font-bold text-indigo-600 block">Metric 3</span>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 uppercase">Value</label>
                      <input
                        type="text"
                        placeholder="e.g. 25+"
                        value={form.companiesBuilt}
                        onChange={(e) => setForm({ ...form, companiesBuilt: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-800 text-xs focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 uppercase">Label</label>
                      <input
                        type="text"
                        placeholder="e.g. Countries Reached"
                        value={form.companiesLabel}
                        onChange={(e) => setForm({ ...form, companiesLabel: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-800 text-xs focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Input */}
              <div className="sm:col-span-2 border-t border-slate-100 pt-5 mt-2">
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">Skills & Badges (Optional)</label>
                <p className="text-xs text-slate-500 mb-2">Enter your skills separated by commas (e.g. UI/UX Design, React, Leadership). Leave blank if you don't want skills to show on your card.</p>
                <input
                  type="text"
                  placeholder="UI/UX Design, React, Node.js, Public Speaking, Leadership"
                  value={form.skillsInput}
                  onChange={(e) => setForm({ ...form, skillsInput: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-indigo-600"
                />
              </div>


            </div>
          </div>
        )}

        {/* Tab 2: Social Links */}
        {activeTab === 'social' && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Social Network Connections</h3>
            <p className="text-xs text-slate-500 -mt-2">Provide full URLs to your social profiles. Leave blank to hide them on your card.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">LinkedIn URL</label>
                <input
                  type="url"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-650 focus:bg-white text-sm transition-all"
                  placeholder="https://linkedin.com/in/username"
                  value={form.socialLinks.linkedIn}
                  onChange={(e) => setForm({
                    ...form,
                    socialLinks: { ...form.socialLinks, linkedIn: e.target.value }
                  })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Instagram URL</label>
                <input
                  type="url"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-650 focus:bg-white text-sm transition-all"
                  placeholder="https://instagram.com/username"
                  value={form.socialLinks.instagram}
                  onChange={(e) => setForm({
                    ...form,
                    socialLinks: { ...form.socialLinks, instagram: e.target.value }
                  })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Facebook URL</label>
                <input
                  type="url"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-650 focus:bg-white text-sm transition-all"
                  placeholder="https://facebook.com/username"
                  value={form.socialLinks.facebook}
                  onChange={(e) => setForm({
                    ...form,
                    socialLinks: { ...form.socialLinks, facebook: e.target.value }
                  })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">X / Twitter URL</label>
                <input
                  type="url"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-650 focus:bg-white text-sm transition-all"
                  placeholder="https://x.com/username"
                  value={form.socialLinks.twitter}
                  onChange={(e) => setForm({
                    ...form,
                    socialLinks: { ...form.socialLinks, twitter: e.target.value }
                  })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">GitHub URL (Optional)</label>
                <input
                  type="url"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-650 focus:bg-white text-sm transition-all"
                  placeholder="https://github.com/username"
                  value={form.socialLinks.gitHub}
                  onChange={(e) => setForm({
                    ...form,
                    socialLinks: { ...form.socialLinks, gitHub: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab: Services / What I Do */}
        {activeTab === 'services' && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-indigo-600" />
                  <span>Services & What I Do</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Add the core services or offerings you provide. Leave blank to hide this section on your card.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const updated = [...(form.services || []), { title: '', description: '' }];
                  setForm({ ...form, services: updated });
                }}
                className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer shrink-0"
              >
                <Plus className="h-4 w-4" />
                <span>Add Service</span>
              </button>
            </div>

            {(!form.services || form.services.length === 0) ? (
              <div className="bg-slate-50 border border-dashed border-slate-200 p-8 rounded-2xl text-center space-y-2">
                <Zap className="h-8 w-8 text-slate-400 mx-auto" />
                <p className="text-sm font-semibold text-slate-700">No Services Added Yet</p>
                <p className="text-xs text-slate-500">Click "Add Service" above to showcase what you do on your digital card.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {form.services.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3 relative text-left">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-xs font-bold text-indigo-600 uppercase">Service #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = form.services.filter((_, i) => i !== idx);
                          setForm({ ...form, services: updated });
                        }}
                        className="text-slate-400 hover:text-red-500 p-1 rounded transition-colors cursor-pointer"
                        title="Remove Service"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Service Title</label>
                        <input
                          type="text"
                          placeholder="e.g. Web Development, UI/UX Design, Consulting"
                          value={item.title || ''}
                          onChange={(e) => {
                            const updated = [...form.services];
                            updated[idx] = { ...updated[idx], title: e.target.value };
                            setForm({ ...form, services: updated });
                          }}
                          className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-800 text-sm focus:outline-none focus:border-indigo-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Description</label>
                        <textarea
                          rows="2"
                          placeholder="Brief summary of what this service includes..."
                          value={item.description || ''}
                          onChange={(e) => {
                            const updated = [...form.services];
                            updated[idx] = { ...updated[idx], description: e.target.value };
                            setForm({ ...form, services: updated });
                          }}
                          className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-800 text-sm focus:outline-none focus:border-indigo-600"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}



        {/* Tab 5: Featured Work & Project Images */}
        {activeTab === 'work' && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-indigo-600" />
                <span>Featured Work & Project Images</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Customize the 3 Featured Work cards displayed on your digital identity profile. You can upload custom project images or paste image URLs!
              </p>
            </div>

            <div className="space-y-6">
              {[0, 1, 2].map((idx) => {
                const item = form.featuredWork?.[idx] || { title: '', tag: '', description: '', image: '', link: '' };
                return (
                  <div key={idx} className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4 text-left">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">
                        Featured Work Card #{idx + 1}
                      </span>
                      {item.image && (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          ✓ Image Attached
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Project / Product Title</label>
                        <input
                          type="text"
                          placeholder={idx === 0 ? 'NX Signature Tap Platform' : idx === 1 ? 'Enterprise AI Assistant' : 'Global SaaS Suite'}
                          value={item.title || ''}
                          onChange={(e) => {
                            const updated = [...(form.featuredWork || [])];
                            updated[idx] = { ...item, title: e.target.value };
                            setForm({ ...form, featuredWork: updated });
                          }}
                          className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-800 text-sm focus:outline-none focus:border-indigo-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Category / Tag</label>
                        <input
                          type="text"
                          placeholder="e.g. Smart Identity, SaaS, AI Engine"
                          value={item.tag || ''}
                          onChange={(e) => {
                            const updated = [...(form.featuredWork || [])];
                            updated[idx] = { ...item, tag: e.target.value };
                            setForm({ ...form, featuredWork: updated });
                          }}
                          className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-800 text-sm focus:outline-none focus:border-indigo-600"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Card Image (Upload image file or paste URL)</label>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="url"
                            placeholder="https://images.unsplash.com/photo-..."
                            value={item.image || ''}
                            onChange={(e) => {
                              const updated = [...(form.featuredWork || [])];
                              updated[idx] = { ...item, image: e.target.value };
                              setForm({ ...form, featuredWork: updated });
                            }}
                            className="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-800 text-sm focus:outline-none focus:border-indigo-600"
                          />
                          <label className="cursor-pointer bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shrink-0">
                            <Upload className="h-3.5 w-3.5" />
                            <span>Upload Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files[0];
                                if (!file) return;
                                const formData = new FormData();
                                formData.append('file', file);
                                try {
                                  const res = await axios.post(`${API_URL}/profile/upload`, formData, {
                                    headers: { 'Content-Type': 'multipart/form-data' },
                                  });
                                  if (res.data.success) {
                                    const updated = [...(form.featuredWork || [])];
                                    updated[idx] = { ...item, image: res.data.url };
                                    setForm({ ...form, featuredWork: updated });
                                  }
                                } catch (err) {
                                  alert('Failed to upload project image.');
                                }
                              }}
                            />
                          </label>
                        </div>
                        {item.image && (
                          <div className="mt-2 h-24 w-40 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 relative">
                            <img src={item.image} alt="Card Preview" className="h-full w-full object-cover" />
                          </div>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Project Description</label>
                        <textarea
                          rows="2"
                          placeholder="Brief summary of what this product or service does..."
                          value={item.description || ''}
                          onChange={(e) => {
                            const updated = [...(form.featuredWork || [])];
                            updated[idx] = { ...item, description: e.target.value };
                            setForm({ ...form, featuredWork: updated });
                          }}
                          className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-800 text-sm focus:outline-none focus:border-indigo-600"
                        ></textarea>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Project External Link (Optional)</label>
                        <input
                          type="url"
                          placeholder="https://myproject.com"
                          value={item.link || ''}
                          onChange={(e) => {
                            const updated = [...(form.featuredWork || [])];
                            updated[idx] = { ...item, link: e.target.value };
                            setForm({ ...form, featuredWork: updated });
                          }}
                          className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-800 text-sm focus:outline-none focus:border-indigo-600"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab: Experience & Achievements */}
        {activeTab === 'timeline' && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-8">
            {/* Experience Timeline Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                    <Briefcase className="h-5 w-5 text-indigo-600" />
                    <span>Work Experience Timeline</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Add your career history or roles. Leave blank to hide this section.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const updated = [...(form.experienceTimeline || []), { period: '', role: '', company: '', desc: '' }];
                    setForm({ ...form, experienceTimeline: updated });
                  }}
                  className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer shrink-0"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Role</span>
                </button>
              </div>

              {(!form.experienceTimeline || form.experienceTimeline.length === 0) ? (
                <div className="bg-slate-50 border border-dashed border-slate-200 p-6 rounded-2xl text-center space-y-1">
                  <p className="text-xs text-slate-500">No work experience entries added yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {form.experienceTimeline.map((item, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3 relative text-left">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-xs font-bold text-indigo-600 uppercase">Experience #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = form.experienceTimeline.filter((_, i) => i !== idx);
                            setForm({ ...form, experienceTimeline: updated });
                          }}
                          className="text-slate-400 hover:text-red-500 p-1 rounded transition-colors cursor-pointer"
                          title="Remove Experience"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Time Period</label>
                          <input
                            type="text"
                            placeholder="e.g. 2022 - Present"
                            value={item.period || ''}
                            onChange={(e) => {
                              const updated = [...form.experienceTimeline];
                              updated[idx] = { ...updated[idx], period: e.target.value };
                              setForm({ ...form, experienceTimeline: updated });
                            }}
                            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-800 text-sm focus:outline-none focus:border-indigo-600"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Job Role / Title</label>
                          <input
                            type="text"
                            placeholder="e.g. Founder & CEO"
                            value={item.role || ''}
                            onChange={(e) => {
                              const updated = [...form.experienceTimeline];
                              updated[idx] = { ...updated[idx], role: e.target.value };
                              setForm({ ...form, experienceTimeline: updated });
                            }}
                            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-800 text-sm focus:outline-none focus:border-indigo-600"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Company / Organization</label>
                          <input
                            type="text"
                            placeholder="e.g. OneWinq Inc."
                            value={item.company || ''}
                            onChange={(e) => {
                              const updated = [...form.experienceTimeline];
                              updated[idx] = { ...updated[idx], company: e.target.value };
                              setForm({ ...form, experienceTimeline: updated });
                            }}
                            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-800 text-sm focus:outline-none focus:border-indigo-600"
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Description (Optional)</label>
                          <input
                            type="text"
                            placeholder="Brief details about your key achievements in this role..."
                            value={item.desc || ''}
                            onChange={(e) => {
                              const updated = [...form.experienceTimeline];
                              updated[idx] = { ...updated[idx], desc: e.target.value };
                              setForm({ ...form, experienceTimeline: updated });
                            }}
                            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-800 text-sm focus:outline-none focus:border-indigo-600"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Achievements Section */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                    <Award className="h-5 w-5 text-indigo-600" />
                    <span>Achievements & Honors</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Add awards, honors, or key recognitions. Leave blank to hide this section.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const updated = [...(form.achievements || []), { title: '', subtitle: '', year: '' }];
                    setForm({ ...form, achievements: updated });
                  }}
                  className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer shrink-0"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Achievement</span>
                </button>
              </div>

              {(!form.achievements || form.achievements.length === 0) ? (
                <div className="bg-slate-50 border border-dashed border-slate-200 p-6 rounded-2xl text-center space-y-1">
                  <p className="text-xs text-slate-500">No achievements added yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {form.achievements.map((item, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3 relative text-left">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-xs font-bold text-indigo-600 uppercase">Achievement #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = form.achievements.filter((_, i) => i !== idx);
                            setForm({ ...form, achievements: updated });
                          }}
                          className="text-slate-400 hover:text-red-500 p-1 rounded transition-colors cursor-pointer"
                          title="Remove Achievement"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Award / Title</label>
                          <input
                            type="text"
                            placeholder="e.g. Top 30 Under 30"
                            value={item.title || ''}
                            onChange={(e) => {
                              const updated = [...form.achievements];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              setForm({ ...form, achievements: updated });
                            }}
                            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-800 text-sm focus:outline-none focus:border-indigo-600"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Organization / Subtitle</label>
                          <input
                            type="text"
                            placeholder="e.g. Tech Innovation Summit"
                            value={item.subtitle || ''}
                            onChange={(e) => {
                              const updated = [...form.achievements];
                              updated[idx] = { ...updated[idx], subtitle: e.target.value };
                              setForm({ ...form, achievements: updated });
                            }}
                            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-800 text-sm focus:outline-none focus:border-indigo-600"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Year</label>
                          <input
                            type="text"
                            placeholder="e.g. 2024"
                            value={item.year || ''}
                            onChange={(e) => {
                              const updated = [...form.achievements];
                              updated[idx] = { ...updated[idx], year: e.target.value };
                              setForm({ ...form, achievements: updated });
                            }}
                            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-800 text-sm focus:outline-none focus:border-indigo-600"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Templates & Design */}
        {activeTab === 'templates' && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-indigo-600" />
                  <span>Choose Your Digital Profile Design System</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Templates change layout, typography, animations & color scheme without restricting your profile content.
                </p>
              </div>

              <div className="bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-xl text-xs font-semibold text-indigo-700 flex items-center space-x-2 shrink-0">
                <span>Active Template:</span>
                <span className="font-extrabold text-indigo-900 uppercase">
                  {TEMPLATES.find((t) => t.id === form.templateId)?.publicName || form.templateId}
                </span>
              </div>
            </div>

            {/* Upgrade to Pro Banner Box (Compact & Refined Typography) */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs mb-6 text-left relative overflow-hidden font-outfit">
              <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6">
                
                {/* Left Column */}
                <div className="flex-1 space-y-2.5">
                  {/* PRO Badge with Diamond */}
                  <div className="inline-flex items-center space-x-1.5 bg-purple-50 text-purple-600 border border-purple-100 px-2.5 py-0.5 rounded-lg text-[11px] font-semibold">
                    <Gem className="h-3 w-3 text-purple-600 fill-purple-100" />
                    <span className="tracking-wide">PRO</span>
                  </div>

                  {/* Main Headline */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight leading-snug">
                    Upgrade to Pro to Unlock <span className="text-indigo-600 font-bold">All Features</span>
                  </h3>

                  {/* Subtitle */}
                  <p className="text-xs text-slate-500 font-normal max-w-lg leading-relaxed">
                    Get advanced tools, premium templates, AI profile generation, custom domains and much more.
                  </p>

                  {/* 6 Feature Items (2 Rows x 3 Cols Grid) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                    {/* Item 1 */}
                    <div className="flex items-center space-x-2.5 bg-purple-50/30 border border-purple-100/50 p-2 rounded-xl">
                      <div className="h-7 w-7 rounded-lg bg-purple-100/70 text-purple-600 flex items-center justify-center shrink-0">
                        <Wand2 className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-700 leading-tight">Premium Templates</span>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-center space-x-2.5 bg-purple-50/30 border border-purple-100/50 p-2 rounded-xl">
                      <div className="h-7 w-7 rounded-lg bg-purple-100/70 text-purple-600 flex items-center justify-center shrink-0">
                        <Sparkles className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-700 leading-tight">AI Profile Generator</span>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-center space-x-2.5 bg-purple-50/30 border border-purple-100/50 p-2 rounded-xl">
                      <div className="h-7 w-7 rounded-lg bg-purple-100/70 text-purple-600 flex items-center justify-center shrink-0">
                        <BarChart2 className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-700 leading-tight">Advanced Analytics</span>
                    </div>

                    {/* Item 4 */}
                    <div className="flex items-center space-x-2.5 bg-purple-50/30 border border-purple-100/50 p-2 rounded-xl">
                      <div className="h-7 w-7 rounded-lg bg-purple-100/70 text-purple-600 flex items-center justify-center shrink-0">
                        <Globe className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-700 leading-tight">Custom Domain</span>
                    </div>

                    {/* Item 5 */}
                    <div className="flex items-center space-x-2.5 bg-purple-50/30 border border-purple-100/50 p-2 rounded-xl">
                      <div className="h-7 w-7 rounded-lg bg-purple-100/70 text-purple-600 flex items-center justify-center shrink-0">
                        <Shield className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-700 leading-tight">Priority Support</span>
                    </div>

                    {/* Item 6 */}
                    <div className="flex items-center space-x-2.5 bg-purple-50/30 border border-purple-100/50 p-2 rounded-xl">
                      <div className="h-7 w-7 rounded-lg bg-purple-100/70 text-purple-600 flex items-center justify-center shrink-0">
                        <Ban className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-700 leading-tight">Ad-free Experience</span>
                    </div>
                  </div>
                </div>

                {/* Vertical Divider for large screens */}
                <div className="hidden lg:block w-px bg-slate-100 self-stretch my-1"></div>

                {/* Right Pricing Column */}
                <div className="lg:w-56 flex flex-col items-center justify-center text-center p-2 lg:p-0">
                  <span className="text-[11px] font-medium text-slate-400">Starting at</span>
                  <div className="text-3xl sm:text-4xl font-bold text-indigo-600 tracking-tight my-0.5">
                    ₹999
                  </div>
                  <span className="text-[11px] font-medium text-slate-400 mb-4">/ year</span>

                  <a
                    href="/pricing"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-5 rounded-xl text-xs transition-all shadow-sm shadow-indigo-600/10 flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <span>Upgrade to Pro</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>

                  <span className="text-[10px] text-slate-400 font-normal mt-2">Cancel anytime</span>
                </div>

              </div>
            </div>

            {/* Templates Grid Header */}
            <div className="pt-2 mb-4 flex items-center justify-between">
              <h4 className="text-md font-bold text-slate-900">8 Purpose-Driven Launch Kits & Pricing</h4>
              <span className="text-xs font-semibold text-slate-500">2 Free • 6 Premium Kits</span>
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {TEMPLATES.map((tmpl) => {
                const isSelected = form.templateId === tmpl.id;
                const isLocked = !tmpl.isFree;

                return (
                  <div
                    key={tmpl.id}
                    className={`rounded-2xl border transition-all duration-300 p-5 flex flex-col justify-between relative text-left ${
                      isSelected
                        ? 'border-2 border-indigo-600 bg-indigo-50/40 shadow-md ring-2 ring-indigo-600/10'
                        : isLocked
                        ? 'border-slate-200 bg-slate-50/60 opacity-95'
                        : 'border-slate-200 bg-white hover:border-indigo-300 shadow-xs'
                    }`}
                  >
                    {/* Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 ${
                        tmpl.isFree 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                          : 'bg-amber-100 text-amber-900 border border-amber-200'
                      }`}>
                        {isLocked && <Lock className="h-3 w-3 mr-0.5 text-amber-700" />}
                        <span>{tmpl.isFree ? 'Free Unlocked' : '🔒 Coming Soon'}</span>
                      </span>
                      {isSelected && (
                        <span className="bg-indigo-600 text-white p-1 rounded-full text-xs flex items-center space-x-1 px-2.5 font-bold">
                          <Check className="h-3.5 w-3.5" />
                          <span>Active</span>
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-slate-900 flex items-center justify-between">
                        <span className="flex items-center space-x-1.5">
                          <span>{tmpl.publicName}</span>
                          {isLocked && <Lock className="h-4 w-4 text-amber-500" />}
                        </span>
                        <span className="text-xs text-slate-400 font-normal">({tmpl.internalCategory})</span>
                      </h4>
                      <p className="text-xs font-semibold text-indigo-600 mt-0.5">{tmpl.tagline}</p>
                      <p className="text-xs text-slate-550 mt-2 leading-relaxed">{tmpl.description}</p>
                      
                      <div className="mt-3 bg-white border border-slate-200 rounded-lg p-2.5 space-y-2 text-[11px] text-slate-600">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-700">Best For: {tmpl.bestFor}</span>
                          {isLocked && (
                            <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[10px]">
                              🔒 Soon
                            </span>
                          )}
                        </div>
                        {/* Exclusive Blocks Pill List (Only shown for free unlocked templates) */}
                        {!isLocked && tmpl.exclusiveBlocks && (
                          <div className="pt-1 border-t border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Exclusive Kit Blocks:</span>
                            <div className="flex flex-wrap gap-1">
                              {tmpl.exclusiveBlocks.map((block, idx) => (
                                <span key={idx} className="bg-slate-100 text-slate-700 border border-slate-200 px-1.5 py-0.5 rounded text-[10px] font-medium">
                                  ✓ {block}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className={`mt-5 pt-3 border-t border-slate-100 ${isLocked ? 'flex justify-center' : 'grid grid-cols-2 gap-2'}`}>
                      {!isLocked && (
                        <button
                          type="button"
                          onClick={() => setPreviewTemplate(tmpl)}
                          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-xl text-xs transition-all flex items-center justify-center space-x-1 cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>Live Preview</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleApplyTemplate(tmpl)}
                        className={`w-full font-bold py-2 rounded-xl text-xs transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-600 text-white cursor-default'
                            : isLocked
                            ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 shadow-xs border border-amber-500/30'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            <span>Selected</span>
                          </>
                        ) : isLocked ? (
                          <>
                            <Lock className="h-3.5 w-3.5 text-amber-400" />
                            <span>Coming Soon</span>
                          </>
                        ) : (
                          <span>Apply Template</span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Pro Upgrade & Buy Template Modal */}
        {proUpgradeModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-5 shadow-2xl font-outfit text-white relative animate-in fade-in zoom-in duration-200">
              <div className="h-16 w-16 bg-gradient-to-tr from-amber-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
                <Lock className="h-8 w-8 text-white" />
              </div>

              <div>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                  UNLOCK TEMPLATE
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-3">
                  Unlock {proUpgradeModal.publicName} Template
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Choose how you'd like to unlock the <span className="text-indigo-400 font-bold">{proUpgradeModal.publicName}</span> template ({proUpgradeModal.tagline}):
                </p>
              </div>

              {/* Purchase Options */}
              <div className="space-y-3 pt-2 text-left">
                {/* Option 1: Buy Standalone Template */}
                <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-sm text-white">Buy Template Individually</h5>
                    <p className="text-xs text-slate-400">One-time purchase for this template only.</p>
                  </div>
                  <a
                    href="/pricing"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs"
                  >
                    Buy ₹{proUpgradeModal.price}
                  </a>
                </div>

                {/* Option 2: Upgrade to Pro (All Included) */}
                <div className="bg-gradient-to-r from-amber-950/40 via-indigo-950/40 to-slate-800 border border-amber-500/40 p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <h5 className="font-extrabold text-sm text-amber-300 flex items-center space-x-1">
                      <span>Upgrade to Pro Plan</span>
                      <Sparkles className="h-3.5 w-3.5" />
                    </h5>
                    <p className="text-xs text-slate-300">Unlock ALL 7+ templates + AI tools & custom branding.</p>
                  </div>
                  <a
                    href="/pricing"
                    className="bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 text-xs font-extrabold px-3.5 py-2 rounded-xl shadow-md"
                  >
                    Upgrade Pro
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setProUpgradeModal(null)}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 rounded-xl text-xs transition-all cursor-pointer"
                >
                  Cancel & Stay Free
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Live Template Preview Modal */}
        {previewTemplate && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-4 relative shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="text-left">
                  <h3 className="text-base font-bold text-white flex items-center space-x-2">
                    <span>Previewing: {previewTemplate.publicName}</span>
                    <span className="text-xs font-semibold text-indigo-400">({previewTemplate.tagline})</span>
                  </h3>
                  <p className="text-[11px] text-slate-400">Live preview with your actual profile data</p>
                </div>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-3 py-1 rounded-xl text-xs"
                >
                  ✕ Close
                </button>
              </div>

              <div className="overflow-y-auto max-h-[70vh]">
                <TemplateCardRenderer
                  profile={form}
                  templateIdOverride={previewTemplate.id}
                  onSaveContact={() => alert('Save contact preview trigger!')}
                  isPreview={true}
                />
              </div>

              <div className="flex justify-end space-x-3 border-t border-slate-800 pt-3">
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-2 rounded-xl text-xs"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleApplyTemplate(previewTemplate);
                    setPreviewTemplate(null);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2 rounded-xl text-xs cursor-pointer"
                >
                  Apply {previewTemplate.publicName} Template
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Submit Bar */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-xl shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            {saving ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Saving profile changes...</span>
              </>
            ) : (
              <span>Save Profile Changes</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;

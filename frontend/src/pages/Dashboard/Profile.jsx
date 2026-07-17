import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';
import { 
  User, Link2, Building2, Upload, AlertCircle, CheckCircle2, RefreshCw, FileText
} from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Upload progress states
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingBrochure, setUploadingBrochure] = useState(false);

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
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API_URL}/profile/me`);
      if (res.data.success && res.data.profile) {
        const p = res.data.profile;
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
      const res = await axios.put(`${API_URL}/profile/me`, form);
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
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">My Profile</h1>
        <p className="text-sm text-slate-550 mt-1">Configure your digital NFC identity presentation card details.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto space-x-1">
        <button
          onClick={() => setActiveTab('basic')}
          className={`flex items-center space-x-2 px-5 py-3 border-b-2 font-medium text-sm shrink-0 transition-all cursor-pointer ${
            activeTab === 'basic' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-indigo-600'
          }`}
        >
          <User className="h-4 w-4" />
          <span>Basic Profile</span>
        </button>
        <button
          onClick={() => setActiveTab('social')}
          className={`flex items-center space-x-2 px-5 py-3 border-b-2 font-medium text-sm shrink-0 transition-all cursor-pointer ${
            activeTab === 'social' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-indigo-600'
          }`}
        >
          <Link2 className="h-4 w-4" />
          <span>Social Links</span>
        </button>
        <button
          onClick={() => setActiveTab('company')}
          className={`flex items-center space-x-2 px-5 py-3 border-b-2 font-medium text-sm shrink-0 transition-all cursor-pointer ${
            activeTab === 'company' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-indigo-600'
          }`}
        >
          <Building2 className="h-4 w-4" />
          <span>Company & Brochure</span>
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

        {/* Tab 3: Company details */}
        {activeTab === 'company' && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Company Profile & PDF Brochure</h3>

            {/* Company Logo Uploader */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pb-6 border-b border-slate-100">
              <div className="relative group">
                <div className="h-20 w-20 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                  {form.company.logo ? (
                    <img src={form.company.logo} alt="Company Logo" className="h-full w-full object-contain p-1" />
                  ) : (
                    <Building2 className="h-8 w-8 text-slate-400" />
                  )}
                </div>
                {uploadingLogo && (
                  <div className="absolute inset-0 bg-slate-900/60 rounded-lg flex items-center justify-center">
                    <RefreshCw className="h-5 w-5 text-white animate-spin" />
                  </div>
                )}
              </div>
              <div className="text-center sm:text-left">
                <label className="cursor-pointer bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 px-4 py-2 rounded-lg text-sm font-semibold transition-all inline-flex items-center space-x-2">
                  <Upload className="h-4 w-4 text-slate-500" />
                  <span>{uploadingLogo ? 'Uploading...' : 'Upload Corporate Logo'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, 'logo')}
                    disabled={uploadingLogo}
                  />
                </label>
                <p className="text-xs text-slate-500 mt-2">Recommended: Transparent PNG or JPEG logo.</p>
              </div>
            </div>

            {/* Company inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Company Website</label>
                <input
                  type="url"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-650 focus:bg-white text-sm transition-all"
                  placeholder="https://companywebsite.com"
                  value={form.company.website}
                  onChange={(e) => setForm({
                    ...form,
                    company: { ...form.company, website: e.target.value }
                  })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Company Description</label>
                <textarea
                  rows="3"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-650 focus:bg-white text-sm transition-all"
                  placeholder="Briefly describe what services or products your company provides..."
                  value={form.company.description}
                  onChange={(e) => setForm({
                    ...form,
                    company: { ...form.company, description: e.target.value }
                  })}
                ></textarea>
              </div>

              {/* Brochure File PDF Uploader */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Company Brochure (PDF)</label>
                <div className="flex items-center space-x-4">
                  <label className="cursor-pointer bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all inline-flex items-center space-x-2 shrink-0">
                    <FileText className="h-4 w-4 text-indigo-650" />
                    <span>{uploadingBrochure ? 'Uploading Brochure...' : 'Select PDF Brochure'}</span>
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'brochure')}
                      disabled={uploadingBrochure}
                    />
                  </label>
                  
                  {form.company.brochure && (
                    <div className="flex items-center space-x-2 bg-indigo-50 border border-indigo-100 text-indigo-600 px-3 py-1.5 rounded-lg text-xs truncate max-w-sm">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-indigo-500" />
                      <a href={form.company.brochure} target="_blank" rel="noopener noreferrer" className="hover:underline truncate font-semibold">
                        View Uploaded PDF Brochure
                      </a>
                    </div>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-2">Upload your official PDF catalog. Max size 10MB.</p>
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

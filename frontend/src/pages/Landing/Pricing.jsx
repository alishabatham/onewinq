import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, Sparkles, CreditCard, Building2, UserCheck, Shield, ChevronRight, Download, Star, ArrowRight, Zap, CheckCircle2
} from 'lucide-react';
import { TEMPLATES } from '../../data/templatesData';

const Pricing = () => {
  const [activeTab, setActiveTab] = useState('individual'); // 'individual', 'cards', 'templates', 'business'

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pt-12 pb-24 font-outfit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 px-4 py-1.5 rounded-full text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            <span>The Operating System for Digital Identity</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Transparent Pricing for <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Individuals & Enterprise</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
            From free digital profiles to custom enterprise infrastructure — choose the identity solution built for your stage of growth.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex justify-center mb-16">
          <div className="bg-slate-900 border border-slate-800 p-1.5 rounded-2xl inline-flex overflow-x-auto max-w-full space-x-1">
            <button
              onClick={() => setActiveTab('individual')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
                activeTab === 'individual'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Software Plans (Free vs Pro)
            </button>
            <button
              onClick={() => setActiveTab('cards')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
                activeTab === 'cards'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Physical Cards Lineup
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
                activeTab === 'templates'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Template Design Store
            </button>
            <button
              onClick={() => setActiveTab('business')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
                activeTab === 'business'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Business & Enterprise Tiers
            </button>
          </div>
        </div>

        {/* TAB 1: INDIVIDUAL SOFTWARE PLANS */}
        {activeTab === 'individual' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              
              {/* Free Plan */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between text-left hover:border-slate-700 transition-all">
                <div>
                  <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Free Forever
                  </span>
                  <h3 className="text-3xl font-extrabold text-white mt-4">Free Software Plan</h3>
                  <p className="text-slate-400 text-xs sm:text-sm mt-2">Essential digital profile to share your identity online.</p>

                  <div className="my-6">
                    <span className="text-5xl font-black text-white">₹0</span>
                    <span className="text-slate-500 text-sm font-medium"> / forever</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {[
                      'Digital Identity Profile (Name, Bio, Photo)',
                      'QR Code & NFC Card Compatibility',
                      'Contact details & Social links (up to 10)',
                      '2 Free Templates (Nova & Classic)',
                      '1 Resume Upload (PDF)',
                      'Basic Profile View Analytics',
                      'vCard Contact Save Trigger',
                    ].map((feat, i) => (
                      <li key={i} className="flex items-center space-x-3 text-xs sm:text-sm text-slate-300">
                        <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/signup"
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white text-center py-3.5 rounded-xl font-bold transition-all text-xs sm:text-sm cursor-pointer"
                >
                  Create Free Account
                </Link>
              </div>

              {/* Pro Plan */}
              <div className="bg-gradient-to-b from-indigo-950/80 via-slate-900 to-slate-900 border-2 border-indigo-500/80 rounded-3xl p-8 relative flex flex-col justify-between text-left shadow-2xl shadow-indigo-950/50">
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-lg">
                  Most Popular
                </div>

                <div>
                  <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Full Software Suite
                  </span>
                  <h3 className="text-3xl font-extrabold text-white mt-4">Pro Subscription</h3>
                  <p className="text-slate-400 text-xs sm:text-sm mt-2">Unlimited sections, custom domain, and all premium templates.</p>

                  <div className="my-6">
                    <span className="text-5xl font-black text-white">₹999</span>
                    <span className="text-indigo-300 text-sm font-medium"> / year</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {[
                      'Everything in Free Plan',
                      'All Premium Templates Included Forever',
                      'Custom Username (onewinq.com/yourname)',
                      'Unlimited Sections, Skills, Projects & Gallery',
                      'Advanced Analytics (Visitor Timeline & Link Clicks)',
                      'Lead Collection & Contact Form (CSV Export)',
                      'Multiple NFC Cards & QR Code Management',
                      'Custom Social Preview Image & Priority Support',
                    ].map((feat, i) => (
                      <li key={i} className="flex items-center space-x-3 text-xs sm:text-sm text-slate-200 font-medium">
                        <Check className="h-4 w-4 text-indigo-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/signup?plan=pro"
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-center py-3.5 rounded-xl font-bold transition-all text-xs sm:text-sm shadow-lg shadow-indigo-500/25 cursor-pointer"
                >
                  Upgrade to Pro (₹999/yr)
                </Link>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: PHYSICAL NFC CARDS LINEUP */}
        {activeTab === 'cards' && (
          <div className="space-y-8 max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Apple-Style Physical NFC Card Lineup</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Branded by experience and crafted from high-durability materials.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1: Essential */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between text-left hover:border-slate-700 transition-all">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full">Entry Level</span>
                  <h3 className="text-xl font-bold text-white mt-3">Essential Card</h3>
                  <p className="text-xs text-indigo-400 font-semibold mt-1">"Start Your Identity"</p>
                  <p className="text-xs text-slate-400 mt-2">Target: Students & Job Seekers</p>
                  
                  <div className="mt-4 mb-4">
                    <span className="text-3xl font-black text-white">₹499</span>
                    <span className="text-slate-500 text-xs"> / one-time</span>
                  </div>

                  <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-4">
                    <p>• Premium Matte PVC</p>
                    <p>• Colors: White, Black</p>
                    <p>• NFC + High Definition QR</p>
                    <p>• Standard Envelope Packaging</p>
                  </div>
                </div>

                <Link to="/signup" className="mt-6 w-full bg-slate-800 hover:bg-slate-700 text-white text-center py-2.5 rounded-xl font-bold text-xs transition-all">
                  Order Essential (₹499)
                </Link>
              </div>

              {/* Card 2: Signature */}
              <div className="bg-slate-900 border-2 border-indigo-500/80 rounded-3xl p-6 flex flex-col justify-between text-left relative shadow-xl shadow-indigo-950/40">
                <div className="absolute -top-3 right-4 bg-indigo-500 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                  Best Seller ⭐
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/20 px-2.5 py-1 rounded-full border border-indigo-500/30">Most Popular</span>
                  <h3 className="text-xl font-bold text-white mt-3">Signature Card ⭐</h3>
                  <p className="text-xs text-indigo-400 font-semibold mt-1">"Make Every Connection Count"</p>
                  <p className="text-xs text-slate-400 mt-2">Target: Developers & Creators</p>

                  <div className="mt-4 mb-4">
                    <span className="text-3xl font-black text-white">₹999</span>
                    <span className="text-slate-500 text-xs"> / one-time</span>
                  </div>

                  <div className="space-y-2 text-xs text-slate-200 border-t border-slate-800 pt-4">
                    <p>• Soft-Touch Premium Matte PVC</p>
                    <p>• Colors: Matte Black, White, Navy</p>
                    <p>• NFC + Custom QR Code</p>
                    <p>• Magnetic Unboxing Experience Box</p>
                  </div>
                </div>

                <Link to="/signup" className="mt-6 w-full bg-indigo-600 hover:bg-indigo-500 text-white text-center py-2.5 rounded-xl font-bold text-xs transition-all shadow-md">
                  Order Signature (₹999)
                </Link>
              </div>

              {/* Card 3: Metal */}
              <div className="bg-neutral-900 border border-amber-500/40 rounded-3xl p-6 flex flex-col justify-between text-left">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">Executive Edition</span>
                  <h3 className="text-xl font-bold text-white mt-3">Metal Card</h3>
                  <p className="text-xs text-amber-400 font-semibold mt-1">"Lead with Presence"</p>
                  <p className="text-xs text-neutral-400 mt-2">Target: Founders & CXOs</p>

                  <div className="mt-4 mb-4">
                    <span className="text-3xl font-black text-white">₹2,999</span>
                    <span className="text-neutral-500 text-xs"> / one-time</span>
                  </div>

                  <div className="space-y-2 text-xs text-neutral-300 border-t border-neutral-800 pt-4">
                    <p>• Stainless Steel Solid Metal</p>
                    <p>• Laser Precision Engraving</p>
                    <p>• Colors: Black Metal, Silver, Gold</p>
                    <p>• Luxury Magnetic Box & Thank You Card</p>
                  </div>
                </div>

                <Link to="/signup" className="mt-6 w-full bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-center py-2.5 rounded-xl text-xs transition-all shadow-md">
                  Order Metal (₹2,999)
                </Link>
              </div>

              {/* Card 4: Business Pack */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between text-left hover:border-slate-700 transition-all">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300 bg-purple-500/20 px-2.5 py-1 rounded-full">Company Team</span>
                  <h3 className="text-xl font-bold text-white mt-3">Business Pack</h3>
                  <p className="text-xs text-purple-400 font-semibold mt-1">"Your Team, One Identity"</p>
                  <p className="text-xs text-slate-400 mt-2">Target: Companies & Colleges</p>

                  <div className="mt-4 mb-4">
                    <span className="text-3xl font-black text-white">₹9,999+</span>
                    <span className="text-slate-500 text-xs"> / 10 Cards Batch</span>
                  </div>

                  <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-4">
                    <p>• 10 / 25 / 50 / 100 Card Batches</p>
                    <p>• Company Logo & Employee Branding</p>
                    <p>• One-click Bulk Activation</p>
                    <p>• Centralized Business Software Dashboard</p>
                  </div>
                </div>

                <Link to="/contact" className="mt-6 w-full bg-purple-600 hover:bg-purple-500 text-white text-center py-2.5 rounded-xl font-bold text-xs transition-all">
                  Request Business Quote
                </Link>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: TEMPLATE DESIGN STORE */}
        {activeTab === 'templates' && (
          <div className="space-y-8 max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Canva + Notion + Framer Template Model</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Templates change visual design, typography & layout without restricting core profile features.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TEMPLATES.map((tmpl) => (
                <div key={tmpl.id} className="bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 rounded-3xl p-6 text-left flex flex-col justify-between transition-all">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        {tmpl.badgeText}
                      </span>
                      <span className="text-xs font-bold text-slate-400">{tmpl.internalCategory}</span>
                    </div>

                    <h3 className="text-xl font-black text-white mt-4">{tmpl.publicName}</h3>
                    <p className="text-xs font-semibold text-indigo-400 mt-0.5">{tmpl.tagline}</p>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">{tmpl.description}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-500 block">Status</span>
                      <span className={`text-sm font-bold ${tmpl.isFree ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {tmpl.isFree ? 'Free Unlocked' : '🔒 Coming Soon'}
                      </span>
                    </div>
                    {tmpl.isFree ? (
                      <Link
                        to="/signup"
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all"
                      >
                        Use Template
                      </Link>
                    ) : (
                      <span className="bg-slate-800 border border-slate-700 text-amber-300 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center space-x-1">
                        <span>Coming Soon</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: BUSINESS & ENTERPRISE TIERS */}
        {activeTab === 'business' && (
          <div className="space-y-12 max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Employee Digital Identity Management Platform</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl mx-auto">
                Centralized SaaS dashboard for HR and IT admins to control employee profiles, cards, access, and lead collection.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Starter */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-left flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 bg-slate-800 px-3 py-1 rounded-full uppercase">Starter</span>
                  <h3 className="text-2xl font-bold text-white mt-4">₹9,999 <span className="text-xs text-slate-500">/ year</span></h3>
                  <p className="text-xs text-indigo-400 font-semibold mt-1">Up to 10 Employees</p>

                  <ul className="space-y-2.5 text-xs text-slate-300 mt-6 border-t border-slate-800 pt-4">
                    <p className="font-bold text-white">Includes Core Modules:</p>
                    <li>• Employee & Card Dashboard</li>
                    <li>• Company Branding & Locks</li>
                    <li>• Profile Analytics</li>
                    <li>• Basic Lead Collection</li>
                  </ul>
                </div>

                <Link to="/contact" className="mt-6 w-full bg-slate-800 hover:bg-slate-700 text-white text-center py-2.5 rounded-xl font-bold text-xs transition-all">
                  Get Starter
                </Link>
              </div>

              {/* Professional */}
              <div className="bg-slate-900 border-2 border-indigo-500 rounded-3xl p-6 text-left flex flex-col justify-between shadow-xl shadow-indigo-950/40">
                <div>
                  <span className="text-xs font-bold text-indigo-300 bg-indigo-500/20 px-3 py-1 rounded-full uppercase border border-indigo-500/30">Professional</span>
                  <h3 className="text-2xl font-bold text-white mt-4">₹24,999 <span className="text-xs text-slate-500">/ year</span></h3>
                  <p className="text-xs text-indigo-400 font-semibold mt-1">Up to 50 Employees</p>

                  <ul className="space-y-2.5 text-xs text-slate-300 mt-6 border-t border-slate-800 pt-4">
                    <p className="font-bold text-white">Everything in Starter plus:</p>
                    <li>• Department Management</li>
                    <li>• Role-based Access Controls</li>
                    <li>• Bulk Card Activation & Import</li>
                    <li>• Visitor Analytics & Export</li>
                  </ul>
                </div>

                <Link to="/contact" className="mt-6 w-full bg-indigo-600 hover:bg-indigo-500 text-white text-center py-2.5 rounded-xl font-bold text-xs transition-all">
                  Get Professional
                </Link>
              </div>

              {/* Growth */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-left flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full uppercase">Growth</span>
                  <h3 className="text-2xl font-bold text-white mt-4">₹49,999 <span className="text-xs text-slate-500">/ year</span></h3>
                  <p className="text-xs text-purple-400 font-semibold mt-1">Up to 200 Employees</p>

                  <ul className="space-y-2.5 text-xs text-slate-300 mt-6 border-t border-slate-800 pt-4">
                    <p className="font-bold text-white">Everything in Pro plus:</p>
                    <li>• Custom Subdomain / Domain</li>
                    <li>• Announcements Broadcast</li>
                    <li>• HubSpot & Salesforce Connectors</li>
                    <li>• Account Onboarding Manager</li>
                  </ul>
                </div>

                <Link to="/contact" className="mt-6 w-full bg-purple-600 hover:bg-purple-500 text-white text-center py-2.5 rounded-xl font-bold text-xs transition-all">
                  Get Growth
                </Link>
              </div>

            </div>

            {/* Enterprise Highlight Box */}
            <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/40 rounded-3xl p-8 text-left grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              <div className="lg:col-span-2 space-y-3">
                <span className="bg-amber-400 text-black text-[10px] font-black uppercase px-3 py-1 rounded-full">
                  Enterprise Identity Infrastructure
                </span>
                <h3 className="text-2xl font-extrabold text-white">Enterprise Tier (100–5,000+ Employees)</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Includes SSO Login (Azure AD, Google, Okta), HRMS Integrations (Zoho, SAP, Darwinbox, Keka), API Access, White-Labeling, Asset Tracking, and Dedicated Account Support.
                </p>
              </div>
              <div className="text-right flex flex-col items-end">
                <span className="text-xl font-black text-amber-400">Custom Annual Quote</span>
                <span className="text-xs text-slate-400 mb-4">(₹1.5 Lakh – ₹15 Lakh+)</span>
                <Link
                  to="/contact?inquiry=enterprise"
                  className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black font-extrabold px-6 py-3 rounded-xl text-xs transition-all shadow-lg shadow-amber-500/20"
                >
                  Contact Enterprise Sales
                </Link>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Pricing;

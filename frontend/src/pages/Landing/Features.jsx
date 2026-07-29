import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Eye, Download, ShieldCheck, ToggleLeft, Layers, ArrowRight } from 'lucide-react';

const Features = () => {
  const featureList = [
    {
      icon: <Sparkles className="h-4 w-4" />,
      title: "Beautiful Mobile Profile",
      desc: "Custom profile with photo, bio, & contact details optimized for smartphones.",
      color: "brand"
    },
    {
      icon: <Download className="h-4 w-4" />,
      title: "vCard Contact Download",
      desc: "Save details to contacts instantly with a single click .vcf download.",
      color: "violet"
    },
    {
      icon: <Layers className="h-4 w-4" />,
      title: "Brochure Integration",
      desc: "Upload company logo, description, and PDF brochure for clients.",
      color: "brand"
    },
    {
      icon: <Eye className="h-4 w-4" />,
      title: "View & Tap Analytics",
      desc: "Monitor views vs physical NFC taps and timestamp of last visits.",
      color: "violet"
    },
    {
      icon: <ToggleLeft className="h-4 w-4" />,
      title: "Pause / Resume Card",
      desc: "Toggle card status to paused in settings to hide details securely.",
      color: "brand"
    },
    {
      icon: <ShieldCheck className="h-4 w-4" />,
      title: "Secure JWT & Auth",
      desc: "Credentials encrypted safely in your private account dashboard.",
      color: "violet"
    }
  ];

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-brand-light border border-brand/20 px-3.5 py-1 rounded-full text-brand text-xs font-bold uppercase tracking-wider">
            <span>Core Ecosystem</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl leading-tight">
            Everything you need in a <span className="text-brand">Smart Card</span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 font-medium">
            A beautiful mobile landing page for your profile, instantly shared with NFC tags.
          </p>
        </div>

        {/* Grid of Features - All 6 in 1 row on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 mt-8">
          {featureList.map((f, i) => (
            <div 
              key={i} 
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-brand/45 shadow-xs hover:shadow-sm transition-all duration-300 flex flex-col justify-between text-left group"
            >
              <div>
                <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center mb-2.5 transition-colors ${
                  f.color === 'brand' 
                    ? 'bg-brand-light text-brand border border-brand/10 group-hover:bg-brand group-hover:text-white' 
                    : 'bg-violet-50 text-violet-600 border border-violet-100 group-hover:bg-violet-600 group-hover:text-white'
                }`}>
                  {f.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-brand transition-colors">
                  {f.title}
                </h3>
                <p className="text-slate-500 text-xs leading-snug">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Bottom Banner */}
        <div className="mt-20 bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-xs relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-light rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-violet-100 rounded-full blur-3xl pointer-events-none"></div>
          
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 relative z-10">Ready to transform your networking?</h3>
          <p className="text-sm text-slate-500 max-w-lg mx-auto mb-8 relative z-10 font-medium">
            Setup your free digital identity today and connect with clients via standard links or physical taps.
          </p>
          <div className="relative z-10">
            <Link
              to="/signup"
              className="inline-flex items-center space-x-2 bg-brand hover:bg-brand-hover text-white font-bold px-8 py-4 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <span>Create Your Card Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Features;

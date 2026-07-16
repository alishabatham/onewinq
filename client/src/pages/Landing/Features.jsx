import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Eye, Download, ShieldCheck, ToggleLeft, Layers, ArrowRight } from 'lucide-react';

const Features = () => {
  const featureList = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Beautiful Mobile Profile",
      desc: "A custom profile with your photo, biography, designation, and contact details. Optimized for smartphones and designed to fit any business context.",
      color: "brand"
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "vCard Contact Download",
      desc: "Let clients add your details to their contacts instantly. When they click 'Save Contact', a pre-configured .vcf card downloads directly to their smartphone.",
      color: "violet"
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Company Brochure Integration",
      desc: "Upload your company description, logo, and PDF brochure. Users can view your brochure directly on their phone, perfect for corporate clients.",
      color: "brand"
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "View & Tap Analytics",
      desc: "Understand user engagement. Monitor how many views were standard links vs actual physical NFC taps. View the exact date and time of the last visit.",
      color: "violet"
    },
    {
      icon: <ToggleLeft className="h-6 w-6" />,
      title: "Pause / Resume Card",
      desc: "Lost your card or want to hide your details temporarily? Toggle your card status to 'paused' in the settings. Taps will display a secure message.",
      color: "brand"
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Secure JWT & Auth",
      desc: "Your credentials are encrypted using industry-standard hashing. Manage your password, profile photos, and brochures safely in your private account dashboard.",
      color: "violet"
    }
  ];

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-brand-light border border-brand/20 px-3.5 py-1 rounded-full text-brand text-xs font-bold uppercase tracking-wider">
            <span>Core Ecosystem</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl leading-tight">
            Everything you need in a <span className="text-brand">Smart Card</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-500 font-medium">
            A beautiful mobile landing page for your profile, instantly shared with NFC tags.
          </p>
        </div>

        {/* Grid of Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {featureList.map((f, i) => (
            <div 
              key={i} 
              className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-brand/45 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left group hover:-translate-y-1"
            >
              <div>
                <div className={`p-3 rounded-xl shrink-0 w-fit mb-6 transition-colors ${
                  f.color === 'brand' 
                    ? 'bg-brand-light text-brand border border-brand/10 group-hover:bg-brand group-hover:text-white' 
                    : 'bg-violet-50 text-violet-600 border border-violet-100 group-hover:bg-violet-600 group-hover:text-white'
                }`}>
                  {f.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 group-hover:text-brand transition-colors">
                  {f.title}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
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

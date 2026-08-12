import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, ArrowRight, Sparkles, BarChart3, Smartphone, 
  Globe, QrCode, Cpu, Share2, CreditCard,
  Mail, Network, Database, Lock
} from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-[#FAFBFD] text-slate-900 min-h-screen font-googlesans selection:bg-purple-600/10 selection:text-purple-600 overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-gradient-to-b from-[#F8F7FD] via-[#FAFBFD] to-white">
        
        {/* Subtle background ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-500/10 rounded-full blur-[130px] pointer-events-none -z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* HERO LEFT COLUMN */}
            <div className="lg:col-span-7 text-left space-y-6">
              
              {/* Top Pill Badge */}
              <div className="inline-flex items-center space-x-2 bg-white border border-purple-100 px-3.5 py-1.5 rounded-full shadow-2xs">
                <Zap className="h-3.5 w-3.5 text-purple-600 fill-purple-600/20" />
                <span className="text-purple-700 text-xs font-semibold tracking-wide">New: AI-Powered Profiles</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Your Digital Identity. <br />
                <span className="text-purple-600 font-extrabold">One Tap Away.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed font-normal">
                The ultimate networking ecosystem. Share your professional profile, links, and contact info instantly with NFC technology and smart AI orchestration.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/signup"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-7 py-3.5 rounded-full font-semibold text-sm sm:text-base transition-all shadow-md shadow-purple-600/20 inline-flex items-center space-x-2 cursor-pointer"
                >
                  <span>Create Your Profile</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/features"
                  className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-6 py-3.5 rounded-full font-semibold text-sm sm:text-base transition-all shadow-2xs inline-flex items-center space-x-2 cursor-pointer"
                >
                  <span>Explore Features</span>
                </Link>
              </div>

              {/* Social Proof Stack */}
              <div className="flex items-center space-x-3 pt-3">
                <div className="flex -space-x-2 overflow-hidden">
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                    alt="User 1"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                    alt="User 2"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
                    alt="User 3"
                  />
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  <span className="font-semibold text-slate-900">10,000+ professionals</span> joined this week
                </p>
              </div>

            </div>

            {/* HERO RIGHT COLUMN: Sleek Phone & Card Visual */}
            <div className="lg:col-span-5 relative flex justify-center items-center py-4">
              
              {/* Outer Ambient Glow Circle */}
              <div className="absolute w-72 h-72 bg-purple-300/15 rounded-full blur-3xl -z-10"></div>

              <div className="relative w-full max-w-sm flex justify-center">
                
                {/* Smartphone Container Mockup */}
                <div className="w-64 sm:w-72 bg-slate-900 rounded-[38px] p-3 shadow-xl border-4 border-slate-900 text-slate-900 relative">
                  {/* Notch */}
                  <div className="w-20 h-3.5 bg-slate-800 rounded-full mx-auto mb-3"></div>

                  {/* Phone Screen Mockup */}
                  <div className="bg-white rounded-[28px] p-4 text-center space-y-4 shadow-2xs">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                      alt="Marcus Douglas"
                      className="w-16 h-16 rounded-full mx-auto ring-4 ring-purple-50 object-cover shadow-xs"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Marcus Douglas</h4>
                      <p className="text-[11px] text-slate-500 font-medium">Chief Operating Officer</p>
                    </div>

                    <div className="space-y-2 pt-1">
                      <div className="bg-slate-50 border border-slate-100 p-2 rounded-xl text-left flex items-center space-x-2">
                        <Mail className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                        <span className="text-[10px] font-medium text-slate-700 truncate">marcus@onewinq.com</span>
                      </div>
                      <div className="bg-slate-50 border border-slate-100 p-2 rounded-xl text-left flex items-center space-x-2">
                        <Globe className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                        <span className="text-[10px] font-medium text-slate-700 truncate">linkedin.com/in/marcus</span>
                      </div>
                    </div>

                    <button className="w-full bg-purple-600 text-white font-semibold text-[11px] py-2 rounded-xl shadow-xs">
                      + Add to Contacts
                    </button>
                  </div>
                </div>

                {/* Overlapping Floating Clean NFC Card */}
                <div className="absolute top-16 right-[-10px] sm:right-[-20px] w-52 sm:w-56 h-32 sm:h-36 bg-slate-950 rounded-2xl p-4 text-white shadow-xl transform rotate-6 border border-slate-800 flex flex-col justify-between backdrop-blur-md">
                  <div className="flex justify-between items-start">
                    <span className="font-extrabold text-xs tracking-wider text-white">onewinq</span>
                    <div className="w-5 h-5 rounded-full bg-purple-600/30 flex items-center justify-center">
                      <Zap className="h-3 w-3 text-purple-300" />
                    </div>
                  </div>

                  <div>
                    <span className="text-[8px] uppercase tracking-widest text-slate-400 block font-mono">NFC ACTIVE</span>
                    <span className="text-xs font-bold tracking-wide text-white">MARCUS REED</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SECTION: A SEAMLESS CONNECTION */}
      {/* ========================================================================= */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              A Seamless Connection
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">
              Connecting with new people should be as simple as a handshake. Here's how OneWinq makes it happen.
            </p>
          </div>

          {/* 4 Steps Circle Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Step 1: Create */}
            <div className="flex flex-col items-center text-center space-y-3 group">
              <div className="w-16 h-16 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 group-hover:scale-105 transition-all shadow-2xs">
                <QrCode className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Create</h3>
              <p className="text-xs text-slate-500 font-medium max-w-xs leading-relaxed">
                Design your high-fidelity profile in minutes.
              </p>
            </div>

            {/* Step 2: Tap */}
            <div className="flex flex-col items-center text-center space-y-3 group">
              <div className="w-16 h-16 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 group-hover:scale-105 transition-all shadow-2xs">
                <Smartphone className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Tap</h3>
              <p className="text-xs text-slate-500 font-medium max-w-xs leading-relaxed">
                Tap your smart card or share your digital code.
              </p>
            </div>

            {/* Step 3: Engage */}
            <div className="flex flex-col items-center text-center space-y-3 group">
              <div className="w-16 h-16 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 group-hover:scale-105 transition-all shadow-2xs">
                <Sparkles className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Engage</h3>
              <p className="text-xs text-slate-500 font-medium max-w-xs leading-relaxed">
                AI assistant optimizes your intro for the context.
              </p>
            </div>

            {/* Step 4: Analyze */}
            <div className="flex flex-col items-center text-center space-y-3 group">
              <div className="w-16 h-16 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 group-hover:scale-105 transition-all shadow-2xs">
                <BarChart3 className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Analyze</h3>
              <p className="text-xs text-slate-500 font-medium max-w-xs leading-relaxed">
                Track conversions and build your network CRM.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. BENTO GRID FEATURE CARDS */}
      {/* ========================================================================= */}
      <section className="py-16 bg-[#FAFBFD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Card 1: AI Profile Assistant (Top-Left Large White Card) */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-8 border border-slate-200/80 flex flex-col justify-between text-left hover:shadow-sm transition-all space-y-6">
              <div className="space-y-3">
                <span className="bg-purple-50 text-purple-700 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full inline-block border border-purple-100">
                  INTELLIGENCE
                </span>
                <h3 className="text-2xl font-bold text-slate-900">
                  AI Profile Assistant
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed max-w-lg">
                  Our AI analyzes your professional background to generate tailored bios and smart links that convert more connections into clients.
                </p>
              </div>

              <div>
                <Link
                  to="/features"
                  className="text-purple-600 font-bold text-xs inline-flex items-center space-x-1 hover:text-purple-700 transition-colors"
                >
                  <span>Learn more</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 2: Real-time Analytics (Top-Right Card) */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-8 border border-slate-200/80 flex flex-col justify-between text-left hover:shadow-sm transition-all space-y-6">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <BarChart3 className="h-4.5 w-4.5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Real-time Analytics
                </h3>
                <p className="text-slate-500 text-xs font-normal leading-relaxed">
                  See exactly who tapped your profile, when, and where.
                </p>
              </div>

              {/* Graphic Bar Chart Visual */}
              <div className="flex items-end justify-between space-x-2 h-24 pt-4 border-t border-slate-100">
                <div className="w-full bg-purple-100 rounded-t-md h-[40%]"></div>
                <div className="w-full bg-purple-200 rounded-t-md h-[65%]"></div>
                <div className="w-full bg-purple-600 rounded-t-md h-[100%] shadow-2xs"></div>
                <div className="w-full bg-purple-300 rounded-t-md h-[50%]"></div>
                <div className="w-full bg-purple-500 rounded-t-md h-[85%]"></div>
              </div>
            </div>

            {/* Card 3: Premium Smart Cards (Bottom-Left Sober Slate Card) */}
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-8 flex flex-col justify-between text-left shadow-lg space-y-6 relative overflow-hidden">
              <div className="space-y-2 relative z-10">
                <h3 className="text-2xl font-bold text-white">
                  Premium Smart Cards
                </h3>
                <p className="text-slate-400 text-xs font-normal leading-relaxed max-w-sm">
                  Sustainable, durable, and breathlessly designed hardware for your wallet.
                </p>
              </div>

              {/* Card visual icon in bottom corner */}
              <div className="pt-6 flex justify-between items-end relative z-10">
                <Link
                  to="/pricing"
                  className="bg-white text-slate-900 font-semibold px-4 py-2 rounded-xl text-xs shadow-2xs hover:bg-slate-100 transition-all inline-flex items-center space-x-1"
                >
                  <span>Order Cards</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <CreditCard className="h-12 w-12 text-slate-800" />
              </div>
            </div>

            {/* Card 4: Instant Contact Sharing (Bottom-Right Card) */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-8 border border-slate-200/80 flex flex-col justify-between text-left hover:shadow-sm transition-all space-y-6">
              <div className="space-y-2">
                <span className="bg-purple-50 text-purple-700 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full inline-block border border-purple-100">
                  CONNECTIVITY
                </span>
                <h3 className="text-2xl font-bold text-slate-900">
                  Instant Contact Sharing
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed max-w-md">
                  Save your complete contact info directly into smartphone phonebooks with a single tap. Works natively across all devices with no app installation required.
                </p>
              </div>

              {/* Labeled Feature Badges */}
              <div className="flex flex-wrap gap-2.5 pt-4 border-t border-slate-100">
                <div className="bg-purple-50/80 border border-purple-100/80 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-purple-900 flex items-center space-x-1.5">
                  <Smartphone className="h-3.5 w-3.5 text-purple-600" />
                  <span>Direct vCard Save</span>
                </div>
                <div className="bg-purple-50/80 border border-purple-100/80 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-purple-900 flex items-center space-x-1.5">
                  <Zap className="h-3.5 w-3.5 text-purple-600" />
                  <span>1-Tap NFC & QR</span>
                </div>
                <div className="bg-purple-50/80 border border-purple-100/80 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-purple-900 flex items-center space-x-1.5">
                  <Globe className="h-3.5 w-3.5 text-purple-600" />
                  <span>iOS & Android</span>
                </div>
                <div className="bg-purple-50/80 border border-purple-100/80 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-purple-900 flex items-center space-x-1.5">
                  <Lock className="h-3.5 w-3.5 text-purple-600" />
                  <span>100% Secure</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. READY TO UPGRADE CTA BANNER */}
      {/* ========================================================================= */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden text-left shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 max-w-xl relative z-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Ready to upgrade your networking game?
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-normal leading-relaxed">
              Join the elite network of professionals using OneWinq to redefine digital presence.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 relative z-10 shrink-0">
            <Link
              to="/signup"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-full text-xs sm:text-sm transition-all shadow-md shadow-purple-600/20 cursor-pointer"
            >
              Start for Free
            </Link>

            <Link
              to="/pricing"
              className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 font-semibold px-6 py-3 rounded-full text-xs sm:text-sm transition-all cursor-pointer"
            >
              Order Your Card
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;

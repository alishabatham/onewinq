import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, ShieldCheck, HeartHandshake, Compass, ArrowRight, 
  Smartphone, Share2, Award, Users2, Zap, CheckCircle2, ChevronRight
} from 'lucide-react';
import Logo from '../../components/Logo';

const Home = () => {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen font-outfit selection:bg-brand/20 selection:text-brand">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-32 md:pb-40 bg-gradient-to-b from-brand-light/40 via-white to-slate-50">
        {/* Ambient glow backgrounds */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand/10 rounded-full blur-[120px] opacity-75 pointer-events-none -translate-y-1/2"></div>
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-violet-400/10 rounded-full blur-[100px] opacity-60 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Mission-driven copy */}
            <div className="lg:col-span-7 text-left space-y-8">
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md border border-brand/15 px-4 py-1.5 rounded-full text-brand text-xs font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                <span>The Future of Professional Connection</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-extrabold tracking-tight text-slate-900 leading-[1.05]">
                Meet Once.<br />
                <span className="bg-gradient-to-r from-brand to-violet-600 bg-clip-text text-transparent">Stay Connected.</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-slate-550 max-w-2xl leading-relaxed font-light">
                OneWinq isn't about sharing links. It's about sharing your identity. We build the digital home for your professional presence, making every real-world greeting smarter, faster, and deeply meaningful.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link 
                  to="/signup" 
                  className="bg-brand hover:bg-brand-hover text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-brand/20 hover:shadow-brand/35 transition-all text-sm flex items-center space-x-2 group cursor-pointer"
                >
                  <span>Claim Your Identity</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-2xl font-bold border border-slate-200 transition-all text-sm cursor-pointer shadow-sm"
                >
                  Explore Platform
                </Link>
              </div>

              {/* Trust stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-100 max-w-md">
                <div>
                  <h4 className="text-2xl font-extrabold text-slate-900">10k+</h4>
                  <p className="text-xs text-slate-400 font-medium mt-1">Connections Built</p>
                </div>
                <div>
                  <h4 className="text-2xl font-extrabold text-slate-900">99.8%</h4>
                  <p className="text-xs text-slate-400 font-medium mt-1">Instant Delivery</p>
                </div>
                <div>
                  <h4 className="text-2xl font-extrabold text-slate-900">4.9/5</h4>
                  <p className="text-xs text-slate-400 font-medium mt-1">User Satisfaction</p>
                </div>
              </div>
            </div>
            
            {/* Right Column: Dynamic Profile Showcase */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[380px]">
                {/* Ambient glow behind card */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-brand/30 to-violet-500/20 rounded-[2.5rem] blur-3xl opacity-90 pointer-events-none"></div>
                
                {/* Premium Identity Card Showcase */}
                <div className="relative bg-white border border-slate-150 rounded-[2.5rem] p-6 shadow-2xl text-left select-none overflow-hidden">
                  
                  {/* Banner header inside mockup */}
                  <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-tr from-indigo-50 to-brand/10 border-b border-slate-100"></div>
                  
                  {/* Profile contents */}
                  <div className="relative pt-10 flex flex-col items-center text-center space-y-4">
                    <div className="h-20 w-20 rounded-full border-4 border-white bg-slate-100 shadow-md flex items-center justify-center overflow-hidden">
                      <span className="text-2xl font-extrabold text-brand">AB</span>
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="font-extrabold text-slate-900 text-lg">Alisha Batham</h3>
                      <p className="text-xs text-brand font-semibold tracking-wide uppercase">Founder, OneWinq</p>
                      <p className="text-[11px] text-slate-400 font-medium">Bhopal, MP, India</p>
                    </div>

                    <p className="text-xs text-slate-500 max-w-[240px] leading-relaxed italic">
                      "Building the future of digital identity. Networking should feel effortless."
                    </p>

                    {/* Social connection icons */}
                    <div className="grid grid-cols-4 gap-2 w-full pt-4">
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex justify-center items-center">
                        <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full"></span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex justify-center items-center">
                        <span className="w-2.5 h-2.5 bg-blue-400 rounded-full"></span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex justify-center items-center">
                        <span className="w-2.5 h-2.5 bg-red-400 rounded-full"></span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex justify-center items-center">
                        <span className="w-2.5 h-2.5 bg-slate-800 rounded-full"></span>
                      </div>
                    </div>

                    {/* Save Contact CTA */}
                    <button className="w-full bg-brand text-white py-3 rounded-xl text-xs font-bold tracking-wide shadow-md shadow-brand/10 flex items-center justify-center space-x-1.5">
                      <span>Add to Home Screen</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Philosophy Section: Feelings over Features */}
      <section className="py-24 bg-white border-y border-slate-150 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="text-brand font-bold text-xs uppercase tracking-widest bg-brand-light px-3.5 py-1 rounded-full">Our Core Philosophy</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-outfit">
              Every Connection Starts with a First Impression.
            </h2>
            <p className="text-slate-550 text-sm sm:text-base leading-relaxed">
              We live in a world of fragmented links. OneWinq consolidates your professional existence into one clean, striking identity that tells your story in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Mindset 1: Your Identity, Instantly Shared */}
            <div className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100 space-y-6 text-left hover:shadow-xl hover:shadow-slate-100/50 transition-all">
              <div className="bg-indigo-50 text-indigo-600 p-3.5 rounded-2xl w-fit border border-indigo-100">
                <Share2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Your Identity, Instantly Shared.</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                No complex business card stacks or endless URL dictation. Share your complete professional profile instantly via QR, wallet pass, or smart accessories.
              </p>
            </div>

            {/* Mindset 2: Meet Once. Stay Connected. */}
            <div className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100 space-y-6 text-left hover:shadow-xl hover:shadow-slate-100/50 transition-all">
              <div className="bg-brand-light text-brand p-3.5 rounded-2xl w-fit border border-brand/20">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Meet Once. Stay Connected.</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                When people scan your OneWinq, they don't just get text; they download a dynamic app-like profile onto their phone's home screen. You become a permanent node in their network.
              </p>
            </div>

            {/* Mindset 3: One Digital Identity. Endless Possibilities. */}
            <div className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100 space-y-6 text-left hover:shadow-xl hover:shadow-slate-100/50 transition-all">
              <div className="bg-violet-50 text-violet-600 p-3.5 rounded-2xl w-fit border border-violet-100">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">One Identity. Endless Possibilities.</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Your portfolio, LinkedIn, website, phone, email, and social networks united in a beautifully branded landing page that changes whenever your career evolves.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* The Journey Section: Real-world Connection Flow */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 text-left space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-brand bg-brand-light px-3 py-1 rounded-full">Interactive Journey</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-outfit leading-tight">
                  Networking Without Friction.
                </h2>
                <p className="text-slate-550 text-sm leading-relaxed">
                  We don't sell plastic cards or chips. We sell the feeling of a seamless connection that turns first handshakes into lifelong professional partnerships.
                </p>
              </div>

              {/* Steps progression */}
              <div className="space-y-6">
                
                {/* Step 1 */}
                <div className="flex items-start space-x-4">
                  <div className="bg-brand text-white font-extrabold h-8 w-8 rounded-full flex items-center justify-center shrink-0 shadow-sm text-xs mt-0.5">1</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">The Handshake</h4>
                    <p className="text-slate-500 text-xs sm:text-sm mt-0.5">You meet a client, peer, or investor in person. Show your custom QR or tap your connection accessory.</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start space-x-4">
                  <div className="bg-brand text-white font-extrabold h-8 w-8 rounded-full flex items-center justify-center shrink-0 shadow-sm text-xs mt-0.5">2</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">The Impression</h4>
                    <p className="text-slate-500 text-xs sm:text-sm mt-0.5">Your profile displays instantly. They see your professional profile, links, and portfolio in pristine, customized layout.</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start space-x-4">
                  <div className="bg-brand text-white font-extrabold h-8 w-8 rounded-full flex items-center justify-center shrink-0 shadow-sm text-xs mt-0.5">3</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">The Connection</h4>
                    <p className="text-slate-500 text-xs sm:text-sm mt-0.5">With a single click, they download your profile onto their home screen. No App Store downloads required.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Graphic: Abstract connections map */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="bg-white border border-slate-150 p-8 rounded-[2.5rem] shadow-xl w-full max-w-[480px] space-y-6 text-left relative">
                <div className="absolute top-4 right-4 bg-brand-light text-brand text-[10px] font-bold px-2 py-0.5 rounded">Live Preview</div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Connection Journey</h4>
                
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center space-x-3">
                    <div className="bg-indigo-50 p-2 rounded-xl text-indigo-500">
                      <Users2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">You met "Rahul Sharma"</p>
                      <p className="text-[10px] text-slate-400">Shared founder profile successfully</p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center space-x-3">
                    <div className="bg-emerald-50 p-2 rounded-xl text-emerald-500">
                      <Award className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Connection Established</p>
                      <p className="text-[10px] text-slate-400">Added to Contacts & Bookmarked</p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center space-x-3">
                    <div className="bg-brand-light p-2 rounded-xl text-brand">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Total Profile Taps</p>
                      <p className="text-[10px] text-slate-400">4 taps in last 24 hours</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium">Build your network today</span>
                  <Link to="/signup" className="text-brand font-bold flex items-center space-x-0.5 hover:underline">
                    <span>Create Profile</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pricing Section: Unlocking Identity */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          
          <div className="max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-brand font-bold text-xs uppercase tracking-widest bg-brand-light px-3.5 py-1 rounded-full">Transparent Pricing</span>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Choose the Perfect Identity Plan
            </h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Unlock a more powerful way to share your story and build relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            
            {/* Free Plan */}
            <div className="bg-slate-50/50 p-8 rounded-3xl border border-slate-150 flex flex-col justify-between text-left space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Personal</h3>
                  <p className="text-xs text-slate-400 mt-1">Perfect for individuals getting started</p>
                </div>
                
                <div className="flex items-baseline">
                  <span className="text-4xl font-extrabold text-slate-900">₹0</span>
                  <span className="text-slate-400 text-xs ml-1">/ forever</span>
                </div>
                
                <ul className="space-y-3 text-xs text-slate-600 border-t border-slate-100 pt-4">
                  <li className="flex items-center space-x-2">
                    <span className="text-brand font-bold text-sm">✓</span>
                    <span>1 Digital Profile URL</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-brand font-bold text-sm">✓</span>
                    <span>Basic Contact Links</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-brand font-bold text-sm">✓</span>
                    <span>Personal QR Code generator</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/signup"
                className="w-full bg-slate-200/60 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-bold text-xs text-center transition-all cursor-pointer"
              >
                Start Free
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-white p-8 rounded-3xl border-2 border-brand shadow-lg flex flex-col justify-between text-left space-y-6 relative">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand text-white font-bold text-[10px] tracking-wider uppercase px-3.5 py-1 rounded-full shadow-md shadow-brand/10">
                Most Popular
              </span>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Professional</h3>
                  <p className="text-xs text-slate-400 mt-1">For networking professionals & consultants</p>
                </div>
                
                <div className="flex items-baseline">
                  <span className="text-4xl font-extrabold text-slate-900">₹299</span>
                  <span className="text-slate-400 text-xs ml-1">/ month</span>
                </div>
                
                <ul className="space-y-3 text-xs text-slate-600 border-t border-slate-100 pt-4">
                  <li className="flex items-center space-x-2">
                    <span className="text-brand font-bold text-sm">✓</span>
                    <span>Advanced Profile Themes & Fonts</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-brand font-bold text-sm">✓</span>
                    <span>Custom Link Branding & Subdomains</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-brand font-bold text-sm">✓</span>
                    <span>Unlimited Profile Taps & QR Scans</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-brand font-bold text-sm">✓</span>
                    <span>Detailed Tap Analytics & Locations</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/signup"
                className="w-full bg-brand hover:bg-brand-hover text-white py-3 rounded-xl font-bold text-xs text-center shadow-md shadow-brand/10 hover:shadow-brand/25 transition-all cursor-pointer"
              >
                Go Professional
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-slate-50/50 p-8 rounded-3xl border border-slate-150 flex flex-col justify-between text-left space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Enterprise</h3>
                  <p className="text-xs text-slate-400 mt-1">For corporate teams and companies</p>
                </div>
                
                <div className="flex items-baseline">
                  <span className="text-4xl font-extrabold text-slate-900">₹999</span>
                  <span className="text-slate-400 text-xs ml-1">/ month</span>
                </div>
                
                <ul className="space-y-3 text-xs text-slate-600 border-t border-slate-100 pt-4">
                  <li className="flex items-center space-x-2">
                    <span className="text-brand font-bold text-sm">✓</span>
                    <span>Team Member Directories</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-brand font-bold text-sm">✓</span>
                    <span>Centralized Corporate Branding</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-brand font-bold text-sm">✓</span>
                    <span>Bulk Card Inventory Assigning</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-brand font-bold text-sm">✓</span>
                    <span>Custom Domain Integrations</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/signup"
                className="w-full bg-slate-200/60 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-bold text-xs text-center transition-all cursor-pointer"
              >
                Contact Sales
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA Block */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-brand/10 rounded-full blur-[140px] opacity-75 pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="max-w-4xl mx-auto text-center space-y-8 px-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-outfit">
            One Digital Identity.<br />Endless Possibilities.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto font-light leading-relaxed">
            OneWinq is building the future of digital identity, making every real-world connection smarter, faster, and more meaningful.
          </p>
          <div className="pt-2">
            <Link 
              to="/signup" 
              className="bg-white hover:bg-slate-100 text-slate-950 px-10 py-4 rounded-2xl font-bold text-sm transition-all shadow-lg inline-flex items-center space-x-2 cursor-pointer"
            >
              <span>Get Started Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

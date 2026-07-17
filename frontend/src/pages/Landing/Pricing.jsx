import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const Pricing = () => {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-brand-light border border-brand/20 px-3.5 py-1 rounded-full text-brand text-xs font-bold uppercase tracking-wider">
            <span>Simple Pricing</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl leading-tight">
            Transparent, <span className="text-brand">No Hidden Costs</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-550 font-medium">
            Start for free and create your digital profile. Upgrade only when you want a physical NFC card.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
          
          {/* Plan 1: Free Profile */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between text-left hover:border-slate-300 transition-all duration-300">
            <div>
              <div className="mb-4">
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Digital Only</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Free Profile</h3>
              <p className="text-slate-500 text-xs sm:text-sm mb-6 font-medium">Perfect for testing the waters and sharing your link online.</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-slate-900">₹0</span>
                <span className="text-slate-400 text-sm font-medium"> / forever</span>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3 text-sm text-slate-650 font-medium">
                  <Check className="h-5 w-5 text-brand shrink-0" />
                  <span>Full digital business card profile</span>
                </li>
                <li className="flex items-center space-x-3 text-sm text-slate-650 font-medium">
                  <Check className="h-5 w-5 text-brand shrink-0" />
                  <span>All social link attachments</span>
                </li>
                <li className="flex items-center space-x-3 text-sm text-slate-650 font-medium">
                  <Check className="h-5 w-5 text-brand shrink-0" />
                  <span>Company logo & description</span>
                </li>
                <li className="flex items-center space-x-3 text-sm text-slate-650 font-medium">
                  <Check className="h-5 w-5 text-brand shrink-0" />
                  <span>Basic profile view analytics</span>
                </li>
              </ul>
            </div>
            <Link
              to="/signup"
              className="w-full bg-slate-100 hover:bg-slate-200 text-center py-3 rounded-xl font-bold transition-all text-slate-700 text-xs sm:text-sm cursor-pointer"
            >
              Sign Up For Free
            </Link>
          </div>

          {/* Plan 2: NFC Smart Card */}
          <div className="bg-white p-8 rounded-2xl border-2 border-brand relative flex flex-col justify-between text-left shadow-md shadow-brand/5 hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-0 right-6 -translate-y-1/2 bg-brand text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
              Popular
            </div>
            <div>
              <div className="mb-4">
                <span className="bg-brand-light text-brand px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Physical + Digital</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Smart NFC Card</h3>
              <p className="text-slate-500 text-xs sm:text-sm mb-6 font-medium">Get a premium physical card mapped directly to your digital profile.</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-slate-900">₹999</span>
                <span className="text-slate-400 text-sm font-medium"> / one-time cost</span>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3 text-sm text-slate-700 font-bold">
                  <Check className="h-5 w-5 text-brand shrink-0" />
                  <span>Premium physical NFC card</span>
                </li>
                <li className="flex items-center space-x-3 text-sm text-slate-650 font-medium">
                  <Check className="h-5 w-5 text-brand shrink-0" />
                  <span>All digital features included</span>
                </li>
                <li className="flex items-center space-x-3 text-sm text-slate-650 font-medium">
                  <Check className="h-5 w-5 text-brand shrink-0" />
                  <span>Downloadable company brochure PDF</span>
                </li>
                <li className="flex items-center space-x-3 text-sm text-slate-650 font-medium">
                  <Check className="h-5 w-5 text-brand shrink-0" />
                  <span>Advanced tap & view analytics</span>
                </li>
                <li className="flex items-center space-x-3 text-sm text-slate-650 font-medium">
                  <Check className="h-5 w-5 text-brand shrink-0" />
                  <span>Free shipping across India</span>
                </li>
              </ul>
            </div>
            <Link
              to="/signup"
              className="w-full bg-brand hover:bg-brand-hover text-white text-center py-3 rounded-xl font-bold transition-all text-xs sm:text-sm shadow-xs cursor-pointer"
            >
              Order Smart Card
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Pricing;

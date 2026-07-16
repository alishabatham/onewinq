import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12 text-slate-500 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4 col-span-1 md:col-span-2 text-left">
            <Link to="/" className="flex items-center">
              <Logo className="h-8" />
            </Link>
            <p className="text-sm max-w-sm">
              The ultimate NFC digital card and professional identity manager. Share your details, links, documents, and company brochure with a simple tap.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-brand transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="hover:text-brand transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className="hover:text-brand transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-slate-800 font-semibold text-sm uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/features" className="hover:text-brand transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-brand transition-colors">Pricing</Link></li>
              <li><a href="#" className="hover:text-brand transition-colors">NFC Cards Shop</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">How it Works</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-slate-800 font-semibold text-sm uppercase tracking-wider mb-4">Support & Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-brand transition-colors">Contact Us</Link></li>
              <li><a href="#" className="hover:text-brand transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Terms of Service</a></li>
              <li className="flex items-center space-x-2 pt-2 text-slate-500">
                <Mail className="h-4 w-4" />
                <span className="text-xs">support@onewinq.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 mt-8 pt-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} OneWinq. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

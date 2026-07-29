import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, LayoutDashboard, LogOut, Smartphone, Download } from 'lucide-react';
import Logo from './Logo';
import { usePWA } from '../context/PWAContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { triggerInstall, isInstalled } = usePWA();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'text-[#6344F5] font-semibold' : 'text-slate-700 hover:text-[#6344F5] transition-colors';
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Main Nav Links */}
          <div className="flex items-center space-x-10">
            <Link to="/" className="flex items-center">
              <Logo className="h-12 sm:h-15" />
            </Link>
            
            <div className="hidden md:flex items-center space-x-7">
              <Link to="/" className={`${isActive('/')} text-sm font-medium`}>
                Home
              </Link>
              <Link to="/features" className={`${isActive('/features')} text-sm font-medium`}>
                Features
              </Link>
              <Link to="/pricing" className={`${isActive('/pricing')} text-sm font-medium`}>
                Pricing
              </Link>
              <Link to="/contact" className={`${isActive('/contact')} text-sm font-medium`}>
                Contact
              </Link>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* PWA Download App Button */}
            {!isInstalled && (
              <button
                onClick={triggerInstall}
                className="flex items-center space-x-1.5 bg-indigo-50 text-[#6344F5] hover:bg-indigo-100 px-3.5 py-2 rounded-full border border-indigo-200/60 transition-all font-semibold text-xs cursor-pointer shadow-sm"
                title="Download to Phone Home Screen"
              >
                <Smartphone className="h-4 w-4" />
                <span>Download App</span>
              </button>
            )}

            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 bg-slate-50 text-slate-700 hover:bg-slate-100 px-4 py-2.5 rounded-full border border-slate-200 transition-all font-semibold text-sm"
                >
                  <LayoutDashboard className="h-4 w-4 text-[#6344F5]" />
                  <span>Dashboard</span>
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="bg-[#F4F0FF] text-[#6344F5] hover:opacity-90 px-4 py-2.5 rounded-full border border-[#6344F5]/20 transition-all font-semibold text-sm"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1.5 text-slate-500 hover:text-red-500 transition-colors text-sm font-medium cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-slate-700 hover:text-[#6344F5] font-semibold text-sm transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#6344F5] hover:bg-[#5233E0] text-white px-6 py-2.5 rounded-full shadow-md shadow-[#6344F5]/25 transition-all font-semibold text-sm cursor-pointer"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 md:hidden">
            {!isInstalled && (
              <button
                onClick={triggerInstall}
                className="flex items-center space-x-1 bg-indigo-50 text-[#6344F5] px-2.5 py-1.5 rounded-full border border-indigo-200/60 font-semibold text-xs cursor-pointer shrink-0"
              >
                <Download className="h-3.5 w-3.5" />
                <span className="hidden min-[340px]:inline">App</span>
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none shrink-0"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-2 pb-6 space-y-3 shadow-lg max-h-[calc(100vh-5rem)] overflow-y-auto">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 hover:text-[#6344F5]"
          >
            Home
          </Link>
          <Link
            to="/features"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 hover:text-[#6344F5]"
          >
            Features
          </Link>
          <Link
            to="/pricing"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 hover:text-[#6344F5]"
          >
            Pricing
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 hover:text-[#6344F5]"
          >
            Contact
          </Link>

          {!isInstalled && (
            <button
              onClick={() => {
                setIsOpen(false);
                triggerInstall();
              }}
              className="w-full flex items-center justify-center space-x-2 bg-indigo-50 text-[#6344F5] border border-indigo-200 py-2.5 rounded-full text-sm font-semibold cursor-pointer"
            >
              <Smartphone className="h-4 w-4" />
              <span>Download App Icon to Phone</span>
            </button>
          )}

          <div className="pt-4 border-t border-slate-100 flex flex-col space-y-3">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-2 bg-[#6344F5] text-white py-3 rounded-full text-sm font-semibold"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Go to Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center justify-center space-x-1.5 text-slate-500 py-2 text-sm font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center py-2.5 text-slate-700 font-semibold text-sm"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="text-center bg-[#6344F5] text-white py-3 rounded-full font-semibold text-sm shadow-md shadow-[#6344F5]/20"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

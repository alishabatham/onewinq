import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, CreditCard, LayoutDashboard, LogOut } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'text-brand font-semibold' : 'text-slate-600 hover:text-brand transition-colors';
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo className="h-8" />
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-6">
                <Link to="/" className={isActive('/')}>Home</Link>
                <Link to="/features" className={isActive('/features')}>Features</Link>
                <Link to="/pricing" className={isActive('/pricing')}>Pricing</Link>
                <Link to="/contact" className={isActive('/contact')}>Contact</Link>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 bg-slate-50 text-slate-700 hover:bg-slate-100 px-4 py-2 rounded-lg border border-slate-200 transition-all font-medium text-sm"
                >
                  <LayoutDashboard className="h-4 w-4 text-slate-500" />
                  <span>Dashboard</span>
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="bg-brand-light text-brand hover:opacity-90 px-3 py-2 rounded-lg border border-brand/10 transition-all font-medium text-sm"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-slate-500 hover:text-red-650 transition-colors text-sm font-medium cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-slate-600 hover:text-brand px-3 py-2 font-medium text-sm"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-brand hover:bg-brand-hover text-white px-4.5 py-2 rounded-lg shadow-sm transition-all font-medium text-sm"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-50 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-brand hover:bg-slate-50"
            >
              Home
            </Link>
            <Link
              to="/features"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-brand hover:bg-slate-50"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-brand hover:bg-slate-50"
            >
              Pricing
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-brand hover:bg-slate-50"
            >
              Contact
            </Link>
            <div className="border-t border-slate-100 my-2 pt-2">
              {user ? (
                <div className="space-y-1 px-3">
                  <div className="text-slate-500 text-sm mb-2">Signed in as <span className="font-semibold text-slate-800">{user.name}</span></div>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 w-full text-left bg-slate-50 text-slate-700 hover:bg-slate-100 px-3 py-2 rounded-md text-base font-medium"
                  >
                    <LayoutDashboard className="h-5 w-5 text-slate-500" />
                    <span>Dashboard</span>
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center bg-brand-light text-brand hover:opacity-90 px-3 py-2 rounded-md border border-brand/10 text-base font-medium mt-1"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center space-x-2 w-full text-left text-slate-500 hover:text-red-500 py-2 text-base font-medium"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 px-3">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-center text-slate-600 hover:text-brand py-2 font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="text-center bg-brand hover:bg-brand-hover text-white py-2 rounded-md font-medium"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

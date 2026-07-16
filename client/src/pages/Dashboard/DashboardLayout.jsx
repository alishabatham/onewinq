import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  CreditCard, LayoutDashboard, User, BarChart2, Settings, LogOut, Menu, X, ArrowLeft
} from 'lucide-react';
import Logo from '../../components/Logo';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Profile', path: '/dashboard/profile', icon: User },
    { name: 'My Card', path: '/dashboard/mycard', icon: CreditCard },
    { name: 'Analytics', path: '/dashboard/analytics', icon: BarChart2 },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <Link to="/" className="flex items-center">
            <Logo className="h-7" />
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  active
                    ? 'bg-brand text-white shadow-sm shadow-brand/10'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-brand'
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center space-x-3 px-4 py-3 mb-2">
            <div className="bg-slate-100 h-9 w-9 rounded-full flex items-center justify-center font-bold text-sm text-brand border border-slate-200">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate text-slate-800">{user?.name}</p>
              <p className="text-xs text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-4 py-2 rounded-lg text-xs font-bold text-red-655 hover:bg-red-50 transition-all text-left cursor-pointer"
          >
            <LogOut className="h-4.5 w-4.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setSidebarOpen(false)}></div>
          <aside className="relative flex flex-col w-64 max-w-xs bg-white border-r border-slate-200 z-50 h-full p-4">
            <div className="flex items-center justify-between mb-8">
              <Link to="/" className="flex items-center">
                <Logo className="h-7" />
              </Link>
              <button onClick={() => setSidebarOpen(false)} className="text-slate-500 hover:text-slate-850">
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex-1 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                      active ? 'bg-brand text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-brand'
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-2 border-t border-slate-100 mt-auto">
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  handleLogout();
                }}
                className="flex items-center space-x-3 w-full px-4 py-2 rounded-lg text-xs font-bold text-red-655 hover:bg-red-50 transition-all text-left cursor-pointer"
              >
                <LogOut className="h-4.5 w-4.5" />
                <span>Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 md:hidden">
          <div className="flex items-center space-x-2">
            <button onClick={() => setSidebarOpen(true)} className="text-slate-550 hover:text-slate-800 focus:outline-none">
              <Menu className="h-6 w-6" />
            </button>
            <Logo className="h-6 ml-2" />
          </div>
          <div className="bg-brand h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs text-white border border-brand/20 shadow-xs">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </header>

        {/* Top Navbar for back to home */}
        <header className="hidden md:flex h-16 bg-white border-b border-slate-200 justify-between items-center px-8">
          <Link to="/" className="flex items-center space-x-1.5 text-xs text-slate-550 hover:text-slate-900 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to main website</span>
          </Link>
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="text-xs bg-brand-light text-brand border border-brand/10 px-3 py-1.5 rounded-lg font-semibold hover:opacity-90"
            >
              Admin Dashboard
            </Link>
          )}
        </header>

        {/* Content Outlet */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

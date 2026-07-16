import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  BarChart2, Users, CreditCard, ArrowLeft, ShieldAlert, LogOut
} from 'lucide-react';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Guard route: double check user is admin (frontend check)
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const navItems = [
    { name: 'Stats Overview', path: '/admin', icon: BarChart2 },
    { name: 'Manage Users', path: '/admin/users', icon: Users },
    { name: 'Manage Cards', path: '/admin/cards', icon: CreditCard },
  ];

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-800 justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-1.5 rounded text-white">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">Winq Admin</span>
          </div>
          <Link to="/dashboard" className="md:hidden text-xs text-slate-400 hover:text-white flex items-center space-x-1">
            <ArrowLeft className="h-3 w-3" />
            <span>Dashboard</span>
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
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'bg-indigo-650 text-white shadow-lg shadow-indigo-600/10'
                    : 'text-slate-400 hover:bg-slate-850 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 mt-auto hidden md:block">
          <Link
            to="/dashboard"
            className="flex items-center space-x-2 text-xs text-slate-400 hover:text-white transition-colors mb-4 px-4"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>User Dashboard</span>
          </Link>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="flex items-center space-x-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all text-left"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

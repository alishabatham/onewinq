import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL, useAuth } from '../../context/AuthContext';
import { 
  BarChart2, Users, CreditCard, ShoppingBag, ArrowLeft, ShieldAlert, LogOut, Bell, CheckCircle2, Clock, X
} from 'lucide-react';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [unreadCount, setUnreadCount] = useState(0);
  const [recentNotifications, setRecentNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Guard route: double check user is admin (frontend check)
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Fetch Admin Notifications periodically
  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 15000); // Check every 15s
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/notifications`);
      if (res.data.success) {
        setUnreadCount(res.data.unreadCount || 0);
        setRecentNotifications(res.data.recentOrders || []);
      }
    } catch (err) {
      console.error('Error fetching admin notifications:', err);
    }
  };

  const markAllRead = async () => {
    try {
      await axios.put(`${API_URL}/admin/notifications/mark-read`);
      setUnreadCount(0);
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const navItems = [
    { name: 'Stats Overview', path: '/admin', icon: BarChart2 },
    { name: 'Card Orders', path: '/admin/orders', icon: ShoppingBag, badge: unreadCount },
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
    <div className="bg-slate-950 text-white min-h-screen flex flex-col md:flex-row font-outfit">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-800 justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-1.5 rounded-xl text-white shadow-md shadow-indigo-600/30">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <span className="text-lg font-black tracking-tight text-white">Winq Admin</span>
          </div>
          <Link to="/dashboard" className="md:hidden text-xs text-slate-400 hover:text-white flex items-center space-x-1">
            <ArrowLeft className="h-3 w-3" />
            <span>Dashboard</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </div>

                {item.badge > 0 && (
                  <span className="bg-purple-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-bounce">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 mt-auto hidden md:block">
          <Link
            to="/dashboard"
            className="flex items-center space-x-2 text-xs text-slate-400 hover:text-white transition-colors mb-4 px-4 font-semibold"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>User Dashboard</span>
          </Link>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="flex items-center space-x-3 w-full px-4 py-2.5 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition-all text-left cursor-pointer"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Notification Bar */}
        <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="text-xs text-slate-400 font-medium hidden sm:block">
            OneWinq Super Admin Command Center
          </div>

          <div className="flex items-center space-x-4 ml-auto">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-all cursor-pointer relative shadow-xs"
                title="Notifications"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900 animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Dropdown Tray */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 text-left animate-in fade-in duration-150">
                  <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4 text-purple-400" />
                      <span className="font-bold text-sm text-white">Order Alerts</span>
                      {unreadCount > 0 && (
                        <span className="bg-purple-500/20 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllRead}
                          className="text-[11px] text-purple-400 hover:text-purple-300 font-semibold cursor-pointer"
                        >
                          Mark all read
                        </button>
                      )}
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="text-slate-400 hover:text-white p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
                    {recentNotifications.length === 0 ? (
                      <div className="p-6 text-center text-slate-500 text-xs">
                        No notifications yet.
                      </div>
                    ) : (
                      recentNotifications.map((notif) => (
                        <div
                          key={notif._id}
                          onClick={() => {
                            setShowNotifications(false);
                            navigate('/admin/orders');
                          }}
                          className={`p-3.5 hover:bg-slate-800/80 transition-colors cursor-pointer space-y-1 ${!notif.isReadByAdmin ? 'bg-purple-950/20 border-l-2 border-purple-500' : ''}`}
                        >
                          <div className="flex justify-between items-start">
                            <span className="font-bold text-white text-xs sm:text-sm">{notif.customerName}</span>
                            <span className="text-[10px] text-purple-400 font-extrabold">{notif.price}</span>
                          </div>
                          <p className="text-xs text-slate-300 font-medium">
                            Ordered: <span className="text-white font-bold">{notif.cardName}</span> ({notif.cardColor || 'Standard'})
                          </p>
                          {notif.customNameOnCard && (
                            <div className="text-[10px] text-amber-300 font-mono">
                              Print: "{notif.customNameOnCard}"
                            </div>
                          )}
                          <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1 border-t border-slate-800/60">
                            <span className="font-semibold text-emerald-400">{notif.paymentStatus || 'Paid'} ({notif.paymentMethod || 'UPI'})</span>
                            <span>{new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="p-3 bg-slate-950 border-t border-slate-800 text-center">
                    <Link
                      to="/admin/orders"
                      onClick={() => setShowNotifications(false)}
                      className="text-xs font-bold text-indigo-400 hover:text-indigo-300 block"
                    >
                      View All Card Orders →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Logged in Admin badge */}
            <div className="flex items-center space-x-2 bg-slate-800/80 border border-slate-700/60 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-200">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span>{user?.name || 'Admin'}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-3.5 sm:p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

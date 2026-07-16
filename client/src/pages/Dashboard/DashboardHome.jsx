import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';
import { 
  CreditCard, Eye, Zap, Calendar, ArrowRight, UserCheck, CheckCircle2, Clipboard, RefreshCw
} from 'lucide-react';

const DashboardHome = () => {
  const [stats, setStats] = useState({ views: 0, taps: 0, lastVisit: null });
  const [card, setCard] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [analyticsRes, cardRes, profileRes] = await Promise.all([
        axios.get(`${API_URL}/analytics`),
        axios.get(`${API_URL}/card/mycard`),
        axios.get(`${API_URL}/profile/me`),
      ]);

      if (analyticsRes.data.success && analyticsRes.data.analytics) {
        const a = analyticsRes.data.analytics;
        setStats({
          views: a.totalViews || 0,
          taps: a.totalTaps || 0,
          lastVisit: a.lastVisit ? new Date(a.lastVisit).toLocaleString() : 'No visits yet',
        });
      }

      if (cardRes.data.success) {
        setCard(cardRes.data.card);
      }

      if (profileRes.data.success) {
        setProfile(profileRes.data.profile);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const isProfileComplete = () => {
    if (!profile) return false;
    return profile.name && profile.mobile && profile.email && profile.designation;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500 space-y-3">
        <RefreshCw className="h-7 w-7 text-indigo-650 animate-spin" />
        <span className="text-sm font-medium">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 relative overflow-hidden text-left shadow-xs">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none"></div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-slate-900">Welcome Back, {profile?.name || 'User'}!</h1>
        <p className="text-sm text-slate-500 max-w-xl">
          Here is your digital identity overview. Track how many people have scanned your card or viewed your digital profile.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white border border-slate-200 p-6 rounded-xl flex items-center justify-between text-left shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Total Profile Views</span>
            <span className="text-3xl font-extrabold text-slate-900">{stats.views}</span>
          </div>
          <div className="bg-indigo-50 text-indigo-600 p-3 rounded-lg border border-indigo-100">
            <Eye className="h-5 w-5" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border border-slate-200 p-6 rounded-xl flex items-center justify-between text-left shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Total NFC Taps</span>
            <span className="text-3xl font-extrabold text-slate-900">{stats.taps}</span>
          </div>
          <div className="bg-violet-50 text-violet-600 p-3 rounded-lg border border-violet-100">
            <Zap className="h-5 w-5" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border border-slate-200 p-6 rounded-xl flex items-center justify-between text-left shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Card Status</span>
            <span className={`text-sm font-bold uppercase block mt-1 ${card?.status === 'active' ? 'text-emerald-600' : 'text-amber-600'}`}>
              {card ? (card.status === 'active' ? '● Active' : '● Paused') : 'Unlinked'}
            </span>
          </div>
          <div className="bg-slate-50 text-slate-500 p-3 rounded-lg border border-slate-200">
            <CreditCard className="h-5 w-5" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white border border-slate-200 p-6 rounded-xl flex items-center justify-between text-left shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Last Visited</span>
            <span className="text-xs font-semibold text-slate-700 block truncate mt-1.5 max-w-[170px]" title={stats.lastVisit}>
              {stats.lastVisit}
            </span>
          </div>
          <div className="bg-slate-50 text-slate-500 p-3 rounded-lg border border-slate-200">
            <Calendar className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Setup Progress */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 text-left shadow-xs">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center space-x-2">
            <Clipboard className="h-5 w-5 text-indigo-650" />
            <span>NFC Card Activation Checklist</span>
          </h3>

          <div className="space-y-4">
            {/* Step 1 */}
            <div className="flex items-start space-x-4">
              <div className="mt-1">
                {isProfileComplete() ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                ) : (
                  <span className="h-5 w-5 rounded-full border border-slate-200 bg-slate-50 text-xs font-bold text-indigo-600 flex items-center justify-center shrink-0">1</span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm text-slate-800">Complete Your Digital Profile</h4>
                  <Link to="/dashboard/profile" className="text-xs font-semibold text-indigo-600 hover:text-indigo-750 flex items-center space-x-1">
                    <span>Edit</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
                <p className="text-xs text-slate-505 mt-0.5">
                  Fill in your designation, company logo, mobile, email, and social links.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start space-x-4 border-t border-slate-100 pt-4">
              <div className="mt-1">
                {card ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                ) : (
                  <span className="h-5 w-5 rounded-full border border-slate-200 bg-slate-50 text-xs font-bold text-indigo-600 flex items-center justify-center shrink-0">2</span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm text-slate-800">Link Your Physical Card Code</h4>
                  <Link to="/dashboard/mycard" className="text-xs font-semibold text-indigo-600 hover:text-indigo-750 flex items-center space-x-1">
                    <span>Manage</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
                <p className="text-xs text-slate-505 mt-0.5">
                  Register your physical card ID printed on your NFC tag to connect it.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start space-x-4 border-t border-slate-100 pt-4">
              <div className="mt-1">
                {card && stats.views > 0 ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                ) : (
                  <span className="h-5 w-5 rounded-full border border-slate-200 bg-slate-50 text-xs font-bold text-indigo-600 flex items-center justify-center shrink-0">3</span>
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-slate-800">First NFC Card Tap!</h4>
                <p className="text-xs text-slate-505 mt-0.5">
                  Tap your card against any smartphone to open your digital business card and verify it's working.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions panel */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 text-left flex flex-col justify-between shadow-xs">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Links</h3>
            <p className="text-xs text-slate-500 mb-6">Access key sections of your NFC portal immediately.</p>

            <div className="space-y-3">
              <Link
                to="/dashboard/profile"
                className="block text-center bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 py-2 rounded-lg text-xs font-semibold transition-all"
              >
                Edit Digital Profile
              </Link>
              <Link
                to="/dashboard/mycard"
                className="block text-center bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 py-2 rounded-lg text-xs font-semibold transition-all"
              >
                View & Link Card
              </Link>
              <Link
                to="/dashboard/analytics"
                className="block text-center bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 py-2 rounded-lg text-xs font-semibold transition-all"
              >
                Detailed Analytics
              </Link>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-lg flex items-center space-x-2 text-xs text-indigo-600 mt-6 font-medium">
            <UserCheck className="h-4.5 w-4.5 shrink-0 text-indigo-500" />
            <span>Need help? Support is active for Pro/Biz.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

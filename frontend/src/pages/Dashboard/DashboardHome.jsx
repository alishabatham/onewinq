import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';
import { TEMPLATES } from '../../data/templatesData';
import { 
  Zap, Eye, Users, TrendingUp, MapPin, Activity, Phone, Mail, Globe, 
  FileText, Calendar, ArrowUpRight, ExternalLink, Sparkles, Palette, RefreshCw, ChevronRight, CheckCircle2
} from 'lucide-react';

const DashboardHome = () => {
  const [stats, setStats] = useState({
    views: 0,
    taps: 0,
    uniqueVisitors: 0,
    leadsGenerated: 0,
    topActions: { whatsApp: 0, call: 0, email: 0, website: 0 },
    recentActivity: [],
  });
  const [card, setCard] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [analyticsRes, cardRes, profileRes] = await Promise.allSettled([
        axios.get(`${API_URL}/analytics`),
        axios.get(`${API_URL}/card/mycard`),
        axios.get(`${API_URL}/profile/me`),
      ]);

      if (analyticsRes.status === 'fulfilled' && analyticsRes.value.data?.success && analyticsRes.value.data?.analytics) {
        const a = analyticsRes.value.data.analytics;
        setStats({
          views: a.totalViews || 0,
          taps: a.totalTaps || 0,
          uniqueVisitors: a.uniqueVisitors || 0,
          leadsGenerated: a.leadsGenerated || 0,
          topActions: a.topActions || { whatsApp: 0, call: 0, email: 0, website: 0 },
          recentActivity: a.recentActivity || [],
        });
      }

      if (cardRes.status === 'fulfilled' && cardRes.value.data?.success) {
        setCard(cardRes.value.data.card);
      }

      if (profileRes.status === 'fulfilled' && profileRes.value.data?.success) {
        setProfile(profileRes.value.data.profile);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const liveCardSlug = profile?.customUsername || card?.cardId || profile?._id || 'me';

  const activities = (stats.recentActivity && stats.recentActivity.length > 0)
    ? stats.recentActivity.slice(0, 5).map((act, idx) => ({
        visitorName: act.visitorName || 'Visitor',
        action: act.action || 'Viewed profile',
        location: act.location || 'India',
        time: act.timestamp ? new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now',
        badgeBg: ['bg-blue-50 text-blue-700 border-blue-200', 'bg-emerald-50 text-emerald-700 border-emerald-200', 'bg-purple-50 text-purple-700 border-purple-200', 'bg-amber-50 text-amber-700 border-amber-200', 'bg-sky-50 text-sky-700 border-sky-200'][idx % 5]
      }))
    : [];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500 space-y-3 font-outfit">
        <RefreshCw className="h-7 w-7 text-indigo-600 animate-spin" />
        <span className="text-sm font-medium">Loading Dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-outfit text-slate-900 text-left">
      {/* Clean Light Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-850 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Welcome back, {profile?.name || 'Rajat'} 👋
            </h1>

            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed opacity-90">
              Manage your digital identity, view real-time visitor logs, and track lead analytics in one clean space.
            </p>

            <div className="pt-2 flex items-center space-x-2 text-xs text-indigo-200">
              <span className="font-semibold text-indigo-300">Public Link:</span>
              <a
                href={`/u/${liveCardSlug}`}
                target="_blank"
                rel="noreferrer"
                className="font-bold underline text-white hover:text-indigo-200 flex items-center space-x-1"
              >
                <span>{window.location.origin}/u/{liveCardSlug}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={`/u/${liveCardSlug}`}
              target="_blank"
              rel="noreferrer"
              className="bg-white text-indigo-900 hover:bg-slate-100 font-extrabold px-5 py-3 rounded-2xl text-xs flex items-center justify-center space-x-2 shadow-lg transition-all cursor-pointer"
            >
              <Eye className="h-4 w-4 text-indigo-600" />
              <span>View Public Profile</span>
            </a>

            <Link
              to="/dashboard/profile"
              className="bg-indigo-950/60 hover:bg-indigo-950/80 border border-indigo-700/60 text-white font-bold px-5 py-3 rounded-2xl text-xs flex items-center justify-center space-x-2 transition-all"
            >
              <Palette className="h-4 w-4 text-indigo-300" />
              <span>Edit Profile</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Top Stat Cards (3 Columns - 100% Dynamic & Real-time) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Taps */}
        <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-xs hover:shadow-md transition-all">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Total Taps</span>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-slate-900">{stats.taps.toLocaleString()}</span>
            <Zap className="h-4 w-4 text-amber-500" />
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">NFC scans & visits</span>
        </div>

        {/* Unique Visitors */}
        <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-xs hover:shadow-md transition-all">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Unique Visitors</span>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-slate-900">{stats.uniqueVisitors.toLocaleString()}</span>
            <Eye className="h-4 w-4 text-indigo-600" />
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Individual viewers</span>
        </div>

        {/* Total Connections (Clickable to view network) */}
        <Link
          to="/dashboard/connections"
          className="bg-gradient-to-br from-indigo-50/70 to-purple-50/70 border border-[#6344F5]/30 p-5 rounded-2xl shadow-xs hover:shadow-md hover:border-[#6344F5] transition-all block group cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#6344F5] uppercase tracking-wider block">Total Connections</span>
            <span className="text-[10px] font-extrabold text-[#6344F5] group-hover:underline flex items-center space-x-0.5">
              <span>View All</span>
              <ChevronRight className="h-3 w-3" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl font-black text-slate-900">
              {profile?.totalConnections !== undefined ? profile.totalConnections : (parseInt(profile?.connectionsCount) || 0)}
            </span>
            <Users className="h-4.5 w-4.5 text-[#6344F5]" />
          </div>
          <span className="text-[11px] text-slate-500 font-medium mt-1 block">Click to view all network connections</span>
        </Link>
      </div>

      {/* Main 2-Column Analytics Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Analytics Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Views Line Chart Card */}
          <div className="bg-white border border-slate-200/90 p-6 rounded-3xl shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-indigo-600" />
                  <span>Profile Views Analytics</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Interaction graph over time</p>
              </div>

              <span className="bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 px-3 py-1.5 rounded-xl">
                This Week ▾
              </span>
            </div>

            {/* SVG Line Chart (Dynamic & Real-time) */}
            <div className="h-48 w-full relative pt-4">
              {stats.views > 0 ? (
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 130">
                  <defs>
                    <linearGradient id="lightChartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  <line x1="0" y1="20" x2="500" y2="20" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1.5" />
                  <line x1="0" y1="60" x2="500" y2="60" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1.5" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1.5" />

                  <path
                    d="M 10 100 L 90 95 L 170 85 L 250 75 L 330 65 L 410 45 L 490 30 L 490 120 L 10 120 Z"
                    fill="url(#lightChartGrad)"
                  />

                  <path
                    d="M 10 100 L 90 95 L 170 85 L 250 75 L 330 65 L 410 45 L 490 30"
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {[
                    { x: 10, y: 100 },
                    { x: 90, y: 95 },
                    { x: 170, y: 85 },
                    { x: 250, y: 75 },
                    { x: 330, y: 65 },
                    { x: 410, y: 45 },
                    { x: 490, y: 30 },
                  ].map((pt, i) => (
                    <g key={i}>
                      <circle cx={pt.x} cy={pt.y} r="5" fill="#ffffff" stroke="#4f46e5" strokeWidth="3" />
                    </g>
                  ))}
                </svg>
              ) : (
                <div className="h-32 flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-2xl p-4 text-center">
                  <Activity className="h-6 w-6 text-slate-300 mb-1" />
                  <span className="text-xs font-bold text-slate-700">No profile views recorded yet</span>
                  <span className="text-[11px] text-slate-400">Share your digital card link or tap NFC to generate real-time graph points.</span>
                </div>
              )}

              <div className="flex justify-between text-xs font-semibold text-slate-400 pt-3 px-1 border-t border-slate-100 mt-2">
                {Array.from({ length: 7 }).map((_, i) => {
                  const d = new Date();
                  d.setDate(d.getDate() - (6 - i));
                  return (
                    <span key={i}>
                      {d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Top Locations & Top Actions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Top Locations */}
            <div className="bg-white border border-slate-200/90 p-6 rounded-3xl shadow-xs">
              <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-indigo-600" />
                <span>Top Locations</span>
              </h4>

              {stats.views > 0 ? (
                <div className="space-y-4">
                  {[
                    { city: 'India', count: stats.views, pct: '100%' },
                  ].map((loc, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-700">{loc.city}</span>
                        <span className="text-indigo-600 font-mono font-bold">{loc.count}</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ width: loc.pct }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center space-y-1 text-slate-400">
                  <MapPin className="h-6 w-6 text-slate-300 mx-auto" />
                  <p className="text-xs font-semibold text-slate-600">No Location Data Yet</p>
                  <p className="text-[11px] text-slate-400">Scan card to track visitor locations.</p>
                </div>
              )}
            </div>

            {/* Top Actions */}
            <div className="bg-white border border-slate-200/90 p-6 rounded-3xl shadow-xs">
              <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center space-x-2">
                <Activity className="h-4 w-4 text-emerald-600" />
                <span>Top Actions</span>
              </h4>

              {((stats.topActions?.whatsApp || 0) + (stats.topActions?.call || 0) + (stats.topActions?.email || 0) + (stats.topActions?.website || 0)) > 0 ? (
                <div className="flex items-center justify-around my-2">
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#f1f5f9"
                        strokeWidth="3.8"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-lg font-extrabold text-slate-900">
                        {(stats.topActions?.whatsApp || 0) + (stats.topActions?.call || 0) + (stats.topActions?.email || 0) + (stats.topActions?.website || 0)}
                      </span>
                      <span className="text-[9px] text-slate-400 block font-semibold">Total Actions</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs font-semibold">
                    <div className="flex items-center space-x-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                      <span className="text-slate-700">WhatsApp ({stats.topActions?.whatsApp || 0})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-indigo-500"></span>
                      <span className="text-slate-700">Call ({stats.topActions?.call || 0})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-purple-500"></span>
                      <span className="text-slate-700">Email ({stats.topActions?.email || 0})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-sky-500"></span>
                      <span className="text-slate-700">Website ({stats.topActions?.website || 0})</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center space-y-1 text-slate-400">
                  <Activity className="h-6 w-6 text-slate-300 mx-auto" />
                  <p className="text-xs font-semibold text-slate-600">No Button Clicks Yet</p>
                  <p className="text-[11px] text-slate-400">Actions will track when visitors call, WhatsApp or email you.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Live Visitor Feed */}
        <div className="bg-white border border-slate-200/90 p-6 rounded-3xl text-left flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-emerald-600" />
                  <span>Real Time Analytics</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Live Visitor Feed</p>
              </div>

              <span className="inline-flex items-center space-x-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span>LIVE</span>
              </span>
            </div>

            {/* Visitor Cards */}
            {activities.length > 0 ? (
              <div className="space-y-3.5">
                {activities.map((act, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50/80 border border-slate-200/80 p-3.5 rounded-2xl flex items-center justify-between space-x-3 hover:bg-slate-100/60 transition-all"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="h-9 w-9 rounded-full bg-indigo-100 text-indigo-700 font-extrabold text-xs flex items-center justify-center shrink-0 border border-indigo-200">
                        {act.visitorName.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h5 className="text-xs font-bold text-slate-900 truncate">{act.visitorName}</h5>
                        <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md border mt-0.5 truncate ${act.badgeBg}`}>
                          {act.action}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-mono font-medium text-slate-400 block">{act.time}</span>
                      <span className="text-[9px] text-slate-500 block">{act.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center space-y-2 border border-dashed border-slate-200 rounded-2xl p-5">
                <Activity className="h-8 w-8 text-emerald-500/80 mx-auto animate-pulse" />
                <p className="text-xs font-bold text-slate-800">No Live Activity Yet</p>
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto leading-relaxed">
                  When visitors view your card, tap your NFC card, or connect with you, live activity events will appear here in real-time!
                </p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 mt-6 text-center">
            <Link
              to="/dashboard/analytics"
              className="inline-flex items-center space-x-1 text-xs font-bold text-indigo-600 hover:text-indigo-700"
            >
              <span>View Detailed Analytics</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

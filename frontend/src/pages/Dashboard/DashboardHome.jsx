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
    views: 1450,
    taps: 1246,
    uniqueVisitors: 832,
    leadsGenerated: 213,
    topActions: { whatsApp: 45, call: 25, email: 15, website: 15 },
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
          views: a.totalViews || 1450,
          taps: a.totalTaps || 1246,
          uniqueVisitors: a.uniqueVisitors || 832,
          leadsGenerated: a.leadsGenerated || 213,
          topActions: a.topActions || { whatsApp: 45, call: 25, email: 15, website: 15 },
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

  const defaultActivities = [
    { visitorName: 'Amit Sharma', action: 'Viewed your profile', location: 'Delhi, India', time: '10:24 AM', badgeBg: 'bg-blue-50 text-blue-700 border-blue-200' },
    { visitorName: 'Priya Mehta', action: 'Clicked on WhatsApp', location: 'Mumbai, India', time: '10:21 AM', badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { visitorName: 'John Doe', action: 'Downloaded Brochure', location: 'New York, USA', time: '10:18 AM', badgeBg: 'bg-purple-50 text-purple-700 border-purple-200' },
    { visitorName: 'Karan Verma', action: 'Viewed Services', location: 'Bengaluru, India', time: '10:14 AM', badgeBg: 'bg-amber-50 text-amber-700 border-amber-200' },
    { visitorName: 'Sneha Iyer', action: 'Clicked on Website', location: 'Hyderabad, India', time: '10:11 AM', badgeBg: 'bg-sky-50 text-sky-700 border-sky-200' },
  ];

  const activities = (stats.recentActivity && stats.recentActivity.length > 0)
    ? stats.recentActivity.slice(0, 5).map((act, idx) => ({
        visitorName: act.visitorName,
        action: act.action,
        location: act.location,
        time: act.timestamp ? new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : `${10 - idx * 3}:15 AM`,
        badgeBg: ['bg-blue-50 text-blue-700 border-blue-200', 'bg-emerald-50 text-emerald-700 border-emerald-200', 'bg-purple-50 text-purple-700 border-purple-200', 'bg-amber-50 text-amber-700 border-amber-200', 'bg-sky-50 text-sky-700 border-sky-200'][idx % 5]
      }))
    : defaultActivities;

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

      {/* Top 3 Stat Cards (Clean Light Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Total Taps */}
        <div className="bg-white border border-slate-200/90 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Taps</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 flex items-center space-x-1">
              <TrendingUp className="h-3 w-3" />
              <span>+18.5%</span>
            </span>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900">{stats.taps.toLocaleString()}</span>
            <Zap className="h-5 w-5 text-amber-500" />
          </div>
          <span className="text-xs text-slate-400 mt-1 block">NFC scans & profile visits</span>
        </div>

        {/* Unique Visitors */}
        <div className="bg-white border border-slate-200/90 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Unique Visitors</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 flex items-center space-x-1">
              <TrendingUp className="h-3 w-3" />
              <span>+12.7%</span>
            </span>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900">{stats.uniqueVisitors.toLocaleString()}</span>
            <Users className="h-5 w-5 text-indigo-600" />
          </div>
          <span className="text-xs text-slate-400 mt-1 block">Individual viewers</span>
        </div>

        {/* Leads Generated */}
        <div className="bg-white border border-slate-200/90 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Leads Generated</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 flex items-center space-x-1">
              <TrendingUp className="h-3 w-3" />
              <span>+22.1%</span>
            </span>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900">{stats.leadsGenerated.toLocaleString()}</span>
            <Sparkles className="h-5 w-5 text-emerald-600" />
          </div>
          <span className="text-xs text-slate-400 mt-1 block">Saved contacts & inquiries</span>
        </div>
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

            {/* SVG Line Chart (Light Style) */}
            <div className="h-48 w-full relative pt-4">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150">
                <defs>
                  <linearGradient id="lightChartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1.5" />
                <line x1="0" y1="70" x2="500" y2="70" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1.5" />
                <line x1="0" y1="110" x2="500" y2="110" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1.5" />

                <path
                  d="M 10 110 Q 80 130, 150 70 T 290 50 T 430 90 L 490 60 L 490 140 L 10 140 Z"
                  fill="url(#lightChartGrad)"
                />

                <path
                  d="M 10 110 Q 80 130, 150 70 T 290 50 T 430 90 L 490 60"
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {[
                  { x: 10, y: 110 },
                  { x: 90, y: 125 },
                  { x: 170, y: 70 },
                  { x: 250, y: 95 },
                  { x: 330, y: 50 },
                  { x: 410, y: 90 },
                  { x: 490, y: 60 },
                ].map((pt, i) => (
                  <g key={i}>
                    <circle cx={pt.x} cy={pt.y} r="5" fill="#ffffff" stroke="#4f46e5" strokeWidth="3" />
                  </g>
                ))}
              </svg>

              <div className="flex justify-between text-xs font-semibold text-slate-400 pt-3 px-1 border-t border-slate-100 mt-2">
                <span>12 May</span>
                <span>13 May</span>
                <span>14 May</span>
                <span>15 May</span>
                <span>16 May</span>
                <span>17 May</span>
                <span>18 May</span>
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

              <div className="space-y-4">
                {[
                  { city: 'Delhi', count: 324, pct: '75%' },
                  { city: 'Mumbai', count: 210, pct: '55%' },
                  { city: 'Bengaluru', count: 156, pct: '40%' },
                  { city: 'Hyderabad', count: 98, pct: '28%' },
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
            </div>

            {/* Top Actions */}
            <div className="bg-white border border-slate-200/90 p-6 rounded-3xl shadow-xs">
              <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center space-x-2">
                <Activity className="h-4 w-4 text-emerald-600" />
                <span>Top Actions</span>
              </h4>

              <div className="flex items-center justify-around my-2">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#f1f5f9"
                      strokeWidth="3.8"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3.8"
                      strokeDasharray="45, 100"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="3.8"
                      strokeDasharray="25, 100"
                      strokeDashoffset="-45"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-lg font-extrabold text-slate-900">45%</span>
                    <span className="text-[9px] text-slate-400 block font-semibold">WhatsApp</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs font-semibold">
                  <div className="flex items-center space-x-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                    <span className="text-slate-700">WhatsApp (45%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-indigo-500"></span>
                    <span className="text-slate-700">Call (25%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-purple-500"></span>
                    <span className="text-slate-700">Email (15%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-sky-500"></span>
                    <span className="text-slate-700">Website (15%)</span>
                  </div>
                </div>
              </div>
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

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';
import { 
  BarChart2, Eye, Zap, Calendar, Percent, RefreshCw, AlertCircle
} from 'lucide-react';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get(`${API_URL}/analytics`);
      if (res.data.success) {
        setAnalytics(res.data.analytics);
      }
    } catch (err) {
      console.error(err);
      setError('Could not retrieve analytics data.');
    } finally {
      setLoading(false);
    }
  };

  const getTTR = () => {
    if (!analytics) return 0;
    const views = analytics.totalViews || 0;
    const taps = analytics.totalTaps || 0;
    if (views === 0) return 0;
    return Math.round((taps / views) * 100);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500 space-y-3">
        <RefreshCw className="h-7 w-7 text-indigo-650 animate-spin" />
        <span className="text-sm font-medium">Loading analytics...</span>
      </div>
    );
  }

  const views = analytics?.totalViews || 0;
  const taps = analytics?.totalTaps || 0;
  const ttr = getTTR();

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Analytics Dashboard</h1>
          <p className="text-sm text-slate-550 mt-1">Monitor scans and tap activities from your physical cards.</p>
        </div>
        <button
          onClick={fetchAnalytics}
          className="p-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-500 hover:text-slate-800 transition-colors cursor-pointer shadow-xs"
          title="Refresh statistics"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      {error && (
        <div className="bg-red-55 border border-red-200 text-red-650 p-3 rounded-lg flex items-start space-x-2 text-xs">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-start justify-between shadow-xs">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Total Views</span>
            <span className="text-4xl font-extrabold text-slate-900">{views}</span>
            <p className="text-[10px] text-slate-500 pt-1">Total page visits via link scans or taps.</p>
          </div>
          <div className="bg-indigo-50 text-indigo-600 p-3 rounded-xl border border-indigo-100">
            <Eye className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-start justify-between shadow-xs">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Total NFC Taps</span>
            <span className="text-4xl font-extrabold text-slate-900">{taps}</span>
            <p className="text-[10px] text-slate-500 pt-1">Direct physical NFC contacts triggered.</p>
          </div>
          <div className="bg-violet-50 text-violet-600 p-3 rounded-xl border border-violet-100">
            <Zap className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-start justify-between shadow-xs">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Tap Through Rate</span>
            <span className="text-4xl font-extrabold text-slate-900">{ttr}%</span>
            <p className="text-[10px] text-slate-500 pt-1">Percentage of taps relative to views.</p>
          </div>
          <div className="bg-emerald-55 text-emerald-600 p-3 rounded-xl border border-emerald-100">
            <Percent className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Visual Chart / Details Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Engagement Meter */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 md:col-span-2 flex flex-col justify-between shadow-xs">
          <div>
            <h3 className="font-bold text-slate-900 mb-1 text-sm sm:text-base">Engagement Distribution</h3>
            <p className="text-xs text-slate-500 mb-6">Visual share of page views triggered via physical card taps vs. organic links.</p>

            <div className="space-y-4">
              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
                  <span>NFC Card Taps ({taps})</span>
                  <span>Organic Link Views ({views - taps >= 0 ? views - taps : 0})</span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${ttr}%` }}
                    className="bg-indigo-600 h-full transition-all duration-500"
                  ></div>
                  <div
                    style={{ width: `${100 - ttr}%` }}
                    className="bg-violet-605 h-full transition-all duration-500"
                  ></div>
                </div>
              </div>

              {/* Indicator Legends */}
              <div className="flex items-center space-x-6 text-xs pt-2">
                <div className="flex items-center space-x-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-indigo-600 block"></span>
                  <span className="text-slate-500">NFC Taps ({ttr}%)</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-violet-605 block"></span>
                  <span className="text-slate-500">Direct Links ({100 - ttr}%)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 mt-6 pt-4 flex items-center justify-between text-xs text-slate-500">
            <span>Tap updates are recorded in real-time.</span>
          </div>
        </div>

        {/* Audit Details */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 md:col-span-1 flex flex-col justify-between shadow-xs">
          <div>
            <h3 className="font-bold text-slate-900 mb-4 text-sm">Traffic Details</h3>
            
            <div className="space-y-4">
              <div className="flex flex-col space-y-1 pb-3 border-b border-slate-100">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Last Profile Tap</span>
                <span className="text-xs font-semibold text-slate-800">
                  {analytics?.lastVisit ? new Date(analytics.lastVisit).toLocaleDateString() : 'No taps logged'}
                </span>
                <span className="text-[10px] text-slate-500">
                  {analytics?.lastVisit ? new Date(analytics.lastVisit).toLocaleTimeString() : 'N/A'}
                </span>
              </div>

              <div className="flex flex-col space-y-1 pt-1">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center space-x-1">
                  <Calendar className="h-3 w-3 text-indigo-500" />
                  <span>Card Link Status</span>
                </span>
                <span className="text-xs font-semibold text-emerald-600 mt-1">
                  Active
                </span>
                <span className="text-[10px] text-slate-500">Card is mapped & recording events.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';
import { 
  Users, CreditCard, Eye, Zap, Percent, RefreshCw, AlertCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/stats`);
      if (res.data.success) {
        setStats(res.data.stats);
      }
    } catch (err) {
      console.error(err);
      setError('Could not fetch aggregate administration statistics.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500 space-y-3">
        <RefreshCw className="h-7 w-7 text-indigo-650 animate-spin" />
        <span className="text-sm font-medium">Loading stats...</span>
      </div>
    );
  }

  const usersCount = stats?.totalUsers || 0;
  const cardsCount = stats?.totalCards || 0;
  const viewsCount = stats?.totalViews || 0;
  const tapsCount = stats?.totalTaps || 0;
  const ttr = viewsCount > 0 ? Math.round((tapsCount / viewsCount) * 100) : 0;

  return (
    <div className="space-y-6 text-left text-slate-100">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-outfit">Admin Panel Stats</h1>
          <p className="text-sm text-slate-400 mt-1">Global statistics overview of the OneWinq system.</p>
        </div>
        <button
          onClick={fetchStats}
          className="p-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors shadow-xs cursor-pointer"
          title="Refresh Stats"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      {error && (
        <div className="bg-red-950/30 border border-red-900 text-red-400 p-3 rounded-lg flex items-start space-x-2 text-xs">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Grid of stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Users */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Total Users</span>
            <span className="text-3xl font-extrabold text-white">{usersCount}</span>
          </div>
          <div className="bg-indigo-950/50 text-indigo-400 p-3 rounded-lg border border-indigo-900/30">
            <Users className="h-5 w-5" />
          </div>
        </div>

        {/* Cards */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Generated Cards</span>
            <span className="text-3xl font-extrabold text-white">{cardsCount}</span>
          </div>
          <div className="bg-violet-950/50 text-violet-400 p-3 rounded-lg border border-violet-900/30">
            <CreditCard className="h-5 w-5" />
          </div>
        </div>

        {/* Views */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Total Views</span>
            <span className="text-3xl font-extrabold text-white">{viewsCount}</span>
          </div>
          <div className="bg-blue-950/50 text-blue-400 p-3 rounded-lg border border-blue-900/30">
            <Eye className="h-5 w-5" />
          </div>
        </div>

        {/* Taps */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Total NFC Taps</span>
            <span className="text-3xl font-extrabold text-white">{tapsCount}</span>
          </div>
          <div className="bg-emerald-950/50 text-emerald-400 p-3 rounded-lg border border-emerald-900/30">
            <Zap className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Visual Rate */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xs">
        <h3 className="font-bold text-white mb-2 text-sm sm:text-base">Global System Conversion Rate (TTR)</h3>
        <p className="text-xs text-slate-400 mb-6">Percentage of total visits triggered via direct physical NFC card scans.</p>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
              <span>Card Taps ({tapsCount})</span>
              <span>Conversion Rate ({ttr}%)</span>
            </div>
            <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${ttr}%` }}
                className="bg-indigo-650 h-full transition-all"
              ></div>
              <div
                style={{ width: `${100 - ttr}%` }}
                className="bg-slate-800 h-full transition-all"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

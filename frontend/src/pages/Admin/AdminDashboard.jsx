import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';
import { 
  Users, CreditCard, Eye, Zap, RefreshCw, AlertCircle, ShoppingBag, Clock, ArrowRight, ShieldCheck, DollarSign, PieChart, Sparkles, Award
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
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
      <div className="flex flex-col items-center justify-center h-64 text-slate-500 space-y-3 font-outfit">
        <RefreshCw className="h-7 w-7 text-indigo-500 animate-spin" />
        <span className="text-sm font-medium">Loading admin dashboard analytics...</span>
      </div>
    );
  }

  const usersCount = stats?.totalUsers || 0;
  const cardsCount = stats?.totalCards || 0;
  const ordersCount = stats?.totalOrders || 0;
  const pendingOrdersCount = stats?.pendingOrders || 0;
  const paidOrdersCount = stats?.paidOrders || 0;
  const pendingPaymentsCount = stats?.pendingPayments || 0;
  const totalRevenue = stats?.totalRevenue || 0;
  const cardBreakdown = stats?.cardBreakdown || { essential: 0, signature: 0, metal: 0, founder: 0 };
  const viewsCount = stats?.totalViews || 0;
  const tapsCount = stats?.totalTaps || 0;
  const ttr = viewsCount > 0 ? Math.round((tapsCount / viewsCount) * 100) : 0;

  return (
    <div className="space-y-6 text-left text-slate-100 font-outfit">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Admin Command Center</h1>
          <p className="text-sm text-slate-400 mt-1">Real-time statistics overview of revenue, physical NFC card orders, and system analytics.</p>
        </div>
        <button
          onClick={fetchStats}
          className="p-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors shadow-xs cursor-pointer"
          title="Refresh Stats"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      {error && (
        <div className="bg-red-950/30 border border-red-900 text-red-400 p-3.5 rounded-xl flex items-center space-x-2 text-xs">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Live Pending Orders Alert Banner */}
      {pendingOrdersCount > 0 && (
        <div className="bg-gradient-to-r from-purple-950/90 via-slate-900 to-slate-900 border-2 border-purple-500/60 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center space-x-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center shrink-0 animate-bounce">
              <ShoppingBag className="h-6 w-6 text-purple-300" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">
                You have {pendingOrdersCount} Pending Card {pendingOrdersCount === 1 ? 'Order' : 'Orders'}!
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                New customer orders placed from the Pricing page need fulfillment approval.
              </p>
            </div>
          </div>

          <Link
            to="/admin/orders"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-purple-600/20 inline-flex items-center space-x-2 shrink-0 cursor-pointer"
          >
            <span>Process Orders</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      {/* Grid of stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Revenue */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between shadow-xs hover:border-slate-700 transition-all">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Total Card Revenue</span>
            <span className="text-3xl font-black text-emerald-400">₹{totalRevenue.toLocaleString('en-IN')}</span>
          </div>
          <div className="bg-emerald-950/50 text-emerald-400 p-3 rounded-xl border border-emerald-900/30">
            <DollarSign className="h-5 w-5" />
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between shadow-xs hover:border-slate-700 transition-all">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Card Orders</span>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-black text-white">{ordersCount}</span>
              {paidOrdersCount > 0 && (
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                  {paidOrdersCount} paid
                </span>
              )}
            </div>
          </div>
          <div className="bg-purple-950/50 text-purple-400 p-3 rounded-xl border border-purple-900/30">
            <ShoppingBag className="h-5 w-5" />
          </div>
        </div>

        {/* Users Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between shadow-xs hover:border-slate-700 transition-all">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Registered Users</span>
            <span className="text-3xl font-black text-white">{usersCount}</span>
          </div>
          <div className="bg-indigo-950/50 text-indigo-400 p-3 rounded-xl border border-indigo-900/30">
            <Users className="h-5 w-5" />
          </div>
        </div>

        {/* Generated Cards */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between shadow-xs hover:border-slate-700 transition-all">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">NFC Inventory Generated</span>
            <span className="text-3xl font-black text-white">{cardsCount}</span>
          </div>
          <div className="bg-violet-950/50 text-violet-400 p-3 rounded-xl border border-violet-900/30">
            <CreditCard className="h-5 w-5" />
          </div>
        </div>

      </div>

      {/* Analytics Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card Popularity Breakdown */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-extrabold text-white text-base">Booked Card Variant Breakdown</h3>
              <p className="text-xs text-slate-400 mt-0.5">Distribution of card types selected by customers.</p>
            </div>
            <PieChart className="h-5 w-5 text-indigo-400" />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-xs font-semibold text-slate-400 block">Essential PVC</span>
              <span className="text-2xl font-black text-white">{cardBreakdown.essential}</span>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-xs font-semibold text-purple-400 block">Signature Matte</span>
              <span className="text-2xl font-black text-purple-300">{cardBreakdown.signature}</span>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-xs font-semibold text-amber-400 block">Metal Stainless</span>
              <span className="text-2xl font-black text-amber-300">{cardBreakdown.metal}</span>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-xs font-semibold text-amber-500 block">Founder Edition</span>
              <span className="text-2xl font-black text-amber-400">{cardBreakdown.founder}</span>
            </div>
          </div>
        </div>

        {/* Visual Conversion Rate */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-extrabold text-white text-base">NFC Tap Conversion Rate (TTR)</h3>
              <p className="text-xs text-slate-400 mt-0.5">Percentage of profile traffic generated directly via physical NFC card taps.</p>
            </div>
            <span className="text-2xl font-black text-indigo-400">{ttr}%</span>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
              <span>Direct Card Taps ({tapsCount})</span>
              <span>Total Profile Views ({viewsCount})</span>
            </div>
            <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${ttr}%` }}
                className="bg-indigo-600 h-full transition-all"
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

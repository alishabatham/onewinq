import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth, API_URL } from '../../context/AuthContext';
import { 
  Users, Search, Mail, Phone, Building, Briefcase, Calendar, 
  ExternalLink, RefreshCw, UserPlus, Sparkles, MessageSquare, CheckCircle2, User
} from 'lucide-react';

const Connections = () => {
  const { user } = useAuth();
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/profile/connections`);
      if (res.data.success) {
        setConnections(res.data.connections || []);
        setTotal(res.data.total || 0);
      }
    } catch (err) {
      console.error('Error fetching connections:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredConnections = connections.filter((conn) => {
    const query = searchQuery.toLowerCase();
    const otherUser = String(conn.cardOwner?._id) === String(user?.id || user?._id)
      ? conn.connectedUser
      : conn.cardOwner;

    const name = (otherUser?.name || conn.visitorName || '').toLowerCase();
    const email = (otherUser?.email || conn.visitorEmail || '').toLowerCase();
    const company = (otherUser?.companyName || conn.visitorCompany || '').toLowerCase();
    const designation = (otherUser?.designation || conn.visitorDesignation || '').toLowerCase();

    return name.includes(query) || email.includes(query) || company.includes(query) || designation.includes(query);
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500 space-y-3 font-outfit">
        <RefreshCw className="h-7 w-7 text-[#6344F5] animate-spin" />
        <span className="text-sm font-medium">Loading Connections...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-outfit text-slate-900 text-left">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-indigo-900 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#6344F5]/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="space-y-1.5 z-10">
          <div className="flex items-center space-x-2">
            <span className="bg-[#6344F5]/30 text-indigo-200 border border-[#6344F5]/40 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
              Professional Network
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            My Connections ({total})
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md">
            View and manage all people you have connected with on OneWinq.
          </p>
        </div>

        <div className="z-10 bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-2xl flex items-center space-x-3">
          <Users className="h-8 w-8 text-[#a78bfa]" />
          <div>
            <span className="text-2xl font-black text-white">{total}</span>
            <span className="text-[10px] text-slate-300 uppercase tracking-wider font-bold block">Network Size</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search connections by name, company, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#6344F5] focus:outline-none"
          />
        </div>

        <button
          onClick={fetchConnections}
          className="w-full sm:w-auto text-xs font-bold text-slate-600 hover:text-[#6344F5] bg-slate-50 hover:bg-slate-100 border border-slate-200 px-4 py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Connections Grid */}
      {filteredConnections.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200/90 space-y-4 max-w-md mx-auto my-8">
          <div className="h-16 w-16 bg-indigo-50 text-[#6344F5] rounded-full flex items-center justify-center mx-auto">
            <Users className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">No Connections Found</h3>
            <p className="text-xs text-slate-500">
              {searchQuery ? 'No connection matches your search query.' : 'Share your OneWinq card or tap to exchange identity and build your network!'}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredConnections.map((conn, idx) => {
            const isOwner = String(conn.cardOwner?._id) === String(user?.id || user?._id);
            const otherUser = isOwner ? conn.connectedUser : conn.cardOwner;

            const name = otherUser?.name || conn.visitorName || 'Professional Contact';
            const email = otherUser?.email || conn.visitorEmail || '';
            const mobile = conn.visitorMobile || '';
            const company = otherUser?.companyName || conn.visitorCompany || '';
            const designation = otherUser?.designation || conn.visitorDesignation || '';
            const photo = otherUser?.profilePhoto || null;
            const dateStr = conn.createdAt ? new Date(conn.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recently';

            return (
              <div
                key={conn._id || idx}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Top Avatar & Name */}
                  <div className="flex items-start space-x-3">
                    <div className="h-12 w-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                      {photo ? (
                        <img src={photo} alt={name} className="h-full w-full object-cover" />
                      ) : (
                        <User className="h-6 w-6 text-slate-400" />
                      )}
                    </div>

                    <div className="space-y-0.5 min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-slate-900 truncate">{name}</h3>
                      {(designation || company) && (
                        <p className="text-xs text-[#6344F5] font-semibold truncate">
                          {designation} {designation && company ? '@' : ''} {company}
                        </p>
                      )}
                      <span className="inline-flex items-center space-x-1 text-[10px] text-slate-400 font-medium pt-0.5">
                        <Calendar className="h-3 w-3 text-slate-400" />
                        <span>Connected {dateStr}</span>
                      </span>
                    </div>
                  </div>

                  {/* Notes / Details if available */}
                  {conn.notes && (
                    <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 italic line-clamp-2">
                      "{conn.notes}"
                    </p>
                  )}
                </div>

                {/* Contact Action Bar */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  {email ? (
                    <a
                      href={`mailto:${email}`}
                      className="flex-1 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 py-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all"
                    >
                      <Mail className="h-3.5 w-3.5 text-[#6344F5]" />
                      <span>Email</span>
                    </a>
                  ) : null}

                  {mobile ? (
                    <a
                      href={`tel:${mobile}`}
                      className="flex-1 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 py-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all"
                    >
                      <Phone className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Call</span>
                    </a>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Connections;

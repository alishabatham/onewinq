import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';
import { 
  CreditCard, Plus, HelpCircle, Link2Off, RefreshCw, AlertCircle, CheckCircle2
} from 'lucide-react';

const AdminCards = () => {
  const [cards, setCards] = useState([]);
  const [generateCount, setGenerateCount] = useState(5);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/cards`);
      if (res.data.success) {
        setCards(res.data.cards);
      }
    } catch (err) {
      console.error(err);
      setError('Could not fetch card list.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCards = async (e) => {
    e.preventDefault();
    if (generateCount < 1 || generateCount > 50) {
      setError('You can generate between 1 and 50 cards at a time');
      return;
    }

    setError('');
    setSuccess('');
    setActionLoading(true);

    try {
      const res = await axios.post(`${API_URL}/admin/cards/generate`, { count: generateCount });
      if (res.data.success) {
        setSuccess(res.data.message);
        fetchCards();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Could not generate cards.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleForceUnlink = async (cardId) => {
    if (!window.confirm(`Are you sure you want to force unlink card ${cardId}? The current owner will lose access.`)) {
      return;
    }

    setError('');
    setSuccess('');
    setActionLoading(true);

    try {
      const res = await axios.post(`${API_URL}/admin/cards/unlink/${cardId}`);
      if (res.data.success) {
        setSuccess(res.data.message || 'Card unlinked successfully.');
        fetchCards();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Could not unlink card.');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500 space-y-3">
        <RefreshCw className="h-7 w-7 text-indigo-650 animate-spin" />
        <span className="text-sm font-medium">Loading cards...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Manage Smart Cards</h1>
          <p className="text-sm text-slate-550 mt-1">Pre-generate unlinked card codes, see who is linked, or unlink cards.</p>
        </div>
        <button
          onClick={fetchCards}
          className="p-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-500 hover:text-slate-800 transition-colors shadow-xs cursor-pointer"
          title="Refresh List"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-55 border border-red-200 text-red-650 p-3 rounded-lg flex items-start space-x-2 text-xs">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-emerald-55 border border-emerald-200 text-emerald-650 p-3 rounded-lg flex items-start space-x-2 text-xs">
          <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 text-emerald-505" />
          <span>{success}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Cards Inventory */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-indigo-650" />
            <span>Cards Inventory ({cards.length})</span>
          </h3>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-800">
                <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Card ID</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Owner Account</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {cards.length > 0 ? (
                    cards.map((c) => (
                      <tr key={c._id} className="hover:bg-slate-50/50 transition-all">
                        <td className="px-6 py-4 font-mono text-xs font-bold text-indigo-600">
                          {c.cardId}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                            c.status === 'active'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : c.status === 'paused'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-slate-50 text-slate-500 border border-slate-200'
                          }`}>
                            {c.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {c.user ? (
                            <div>
                              <div className="font-bold text-slate-850 text-xs">{c.user.name}</div>
                              <div className="text-[10px] text-slate-500">{c.user.email}</div>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400 italic flex items-center space-x-1">
                              <HelpCircle className="h-3.5 w-3.5" />
                              <span>Not Linked</span>
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {c.user && (
                            <button
                              onClick={() => handleForceUnlink(c.cardId)}
                              disabled={actionLoading}
                              className="text-red-655 hover:text-red-700 p-1.5 rounded bg-red-50 border border-red-200 hover:bg-red-100 transition-all inline-flex items-center disabled:opacity-50 shadow-xs cursor-pointer"
                              title="Force Unlink Card"
                            >
                              <Link2Off className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-10 text-center text-slate-400 font-medium">
                        No cards registered in the system database yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side: Generate Cards Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6 shadow-xs">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-50 text-indigo-600 p-2.5 rounded-lg border border-indigo-100">
                <Plus className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Generate Card Codes</h3>
                <p className="text-xs text-slate-500">Create new unlinked physical card keys.</p>
              </div>
            </div>

            <form onSubmit={handleGenerateCards} className="space-y-4 pt-4 border-t border-slate-100">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Number of Cards</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:border-indigo-650 focus:bg-white text-sm transition-all font-mono"
                  value={generateCount}
                  onChange={(e) => setGenerateCount(parseInt(e.target.value) || '')}
                />
                <p className="text-[10px] text-slate-500 mt-2">Creates unique codes prefixing with WINQ-XXXXXX.</p>
              </div>

              <button
                type="submit"
                disabled={actionLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-lg shadow-xs transition-all flex items-center justify-center space-x-1.5 text-xs disabled:opacity-50 cursor-pointer"
              >
                {actionLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                <span>Generate Cards Inventory</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCards;

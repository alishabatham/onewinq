import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';
import { 
  CreditCard, Plus, HelpCircle, Link2Off, RefreshCw, AlertCircle, CheckCircle2, Copy, ExternalLink
} from 'lucide-react';

const AdminCards = () => {
  const [cards, setCards] = useState([]);
  const [generateCount, setGenerateCount] = useState(5);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [recentlyGenerated, setRecentlyGenerated] = useState([]);
  const [copiedCardId, setCopiedCardId] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCardId(id);
    setTimeout(() => {
      setCopiedCardId(null);
    }, 2000);
  };

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
        if (res.data.cards) {
          setRecentlyGenerated(res.data.cards);
        }
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
    <div className="space-y-6 text-left text-slate-100">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-outfit">Manage Smart Cards</h1>
          <p className="text-sm text-slate-400 mt-1">Pre-generate unlinked card codes, see who is linked, or unlink cards.</p>
        </div>
        <button
          onClick={fetchCards}
          className="p-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors shadow-xs cursor-pointer"
          title="Refresh List"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-950/30 border border-red-900 text-red-400 p-3 rounded-lg flex items-start space-x-2 text-xs">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-emerald-950/30 border border-emerald-900 text-emerald-400 p-3 rounded-lg flex items-start space-x-2 text-xs">
          <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 text-emerald-400" />
          <span>{success}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Cards Inventory */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-indigo-400" />
            <span>Cards Inventory ({cards.length})</span>
          </h3>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-950 text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Card ID</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Owner Account</th>
                    <th className="px-6 py-4">Card URL / Activation Link</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {cards.length > 0 ? (
                    cards.map((c) => (
                      <tr key={c._id} className="hover:bg-slate-850/30 transition-all">
                        <td className="px-6 py-4 font-mono text-xs font-bold text-indigo-400">
                          {c.cardId}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                            c.status === 'active'
                              ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/30'
                              : c.status === 'paused'
                              ? 'bg-amber-950/40 text-amber-400 border border-amber-900/30'
                              : 'bg-slate-950 text-slate-400 border border-slate-850'
                          }`}>
                            {c.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {c.user ? (
                            <div>
                              <div className="font-bold text-white text-xs">{c.user.name}</div>
                              <div className="text-[10px] text-slate-400 mt-0.5">{c.user.email}</div>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-500 italic flex items-center space-x-1">
                              <HelpCircle className="h-3.5 w-3.5 text-slate-600" />
                              <span>Not Linked</span>
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <span className="font-mono text-xs text-slate-400 select-all max-w-[220px] truncate" title={`${window.location.origin}/c/${c.cardId}`}>
                              {`${window.location.origin}/c/${c.cardId}`}
                            </span>
                            <button
                              onClick={() => handleCopy(`${window.location.origin}/c/${c.cardId}`, c.cardId)}
                              className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                              title="Copy URL"
                            >
                              {copiedCardId === c.cardId ? (
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="h-3.5 w-3.5" />
                              )}
                            </button>
                            <a
                              href={`/c/${c.cardId}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                              title="Open URL"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {c.user && (
                            <button
                              onClick={() => handleForceUnlink(c.cardId)}
                              disabled={actionLoading}
                              className="text-red-400 hover:text-red-300 p-1.5 rounded bg-red-950/20 border border-red-900/30 hover:bg-red-900/30 transition-all inline-flex items-center disabled:opacity-50 shadow-xs cursor-pointer"
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
                      <td colSpan="5" className="px-6 py-10 text-center text-slate-500 font-medium">
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
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6 shadow-xs">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-950/40 text-indigo-400 p-2.5 rounded-lg border border-indigo-900/30">
                <Plus className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Generate Card Codes</h3>
                <p className="text-xs text-slate-400">Create new unlinked physical card keys.</p>
              </div>
            </div>

            <form onSubmit={handleGenerateCards} className="space-y-4 pt-4 border-t border-slate-800">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Number of Cards</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-650 focus:bg-slate-950 text-sm transition-all font-mono placeholder-slate-500"
                  value={generateCount}
                  onChange={(e) => setGenerateCount(parseInt(e.target.value) || '')}
                />
                <p className="text-[10px] text-slate-550 mt-2">Creates unique codes prefixing with WINQ-XXXXXX.</p>
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

          {/* Recently Generated Cards Section */}
          {recentlyGenerated.length > 0 && (
            <div className="bg-slate-900 p-6 rounded-2xl border border-indigo-950/40 space-y-4 shadow-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600"></div>
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider">Recently Generated</h4>
                <button 
                  onClick={() => {
                    const allUrls = recentlyGenerated.map(c => `${window.location.origin}/c/${c.cardId}`).join('\n');
                    handleCopy(allUrls, 'all-generated');
                  }}
                  className="text-[10px] bg-indigo-950 hover:bg-indigo-900 border border-indigo-900 text-indigo-300 font-bold px-2.5 py-1 rounded transition-all cursor-pointer flex items-center space-x-1"
                >
                  {copiedCardId === 'all-generated' ? (
                    <>
                      <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                      <span>Copied All!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy All URLs</span>
                    </>
                  )}
                </button>
              </div>
              
              <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                {recentlyGenerated.map((c) => {
                  const url = `${window.location.origin}/c/${c.cardId}`;
                  return (
                    <div key={c._id} className="bg-slate-950 p-2.5 rounded-lg border border-slate-850 flex flex-col space-y-1 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-mono font-bold text-indigo-400 text-[11px]">{c.cardId}</span>
                        <div className="flex items-center space-x-1.5">
                          <button
                            onClick={() => handleCopy(url, c._id)}
                            className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                            title="Copy URL"
                          >
                            {copiedCardId === c._id ? (
                              <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </button>
                          <a
                            href={`/c/${c.cardId}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                            title="Open URL"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                      <div className="font-mono text-[10px] text-slate-500 truncate select-all">{url}</div>
                    </div>
                  );
                })}
              </div>
              <button 
                onClick={() => setRecentlyGenerated([])}
                className="w-full text-center text-[10px] text-slate-500 hover:text-slate-300 transition-colors pt-2 border-t border-slate-850 block cursor-pointer"
              >
                Clear List
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCards;

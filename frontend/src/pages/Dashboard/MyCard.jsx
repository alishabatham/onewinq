import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';
import { useSearchParams } from 'react-router-dom';
import { 
  CreditCard, ToggleLeft, ToggleRight, Copy, Check, QrCode, LogOut, RefreshCw, AlertCircle, CheckCircle2
} from 'lucide-react';

const MyCard = () => {
  const [card, setCard] = useState(null);
  const [cardIdInput, setCardIdInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [linking, setLinking] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchCard();
    const claim = searchParams.get('claim');
    if (claim) {
      setCardIdInput(claim);
      setSuccess(`Ready to claim card: ${claim}. Click Link Smart Card to activate.`);
    }
    if (searchParams.get('success') === 'true') {
      setSuccess('Your card was successfully activated!');
    }
  }, [searchParams]);

  const fetchCard = async () => {
    try {
      const res = await axios.get(`${API_URL}/card/mycard`);
      if (res.data.success) {
        setCard(res.data.card);
      }
    } catch (err) {
      console.error(err);
      setError('Could not fetch card status.');
    } finally {
      setLoading(false);
    }
  };

  const handleLinkCard = async (e) => {
    e.preventDefault();
    if (!cardIdInput.trim()) return;

    setError('');
    setSuccess('');
    setLinking(true);

    try {
      const res = await axios.post(`${API_URL}/card/link`, { cardId: cardIdInput.trim() });
      if (res.data.success) {
        setCard(res.data.card);
        setSuccess(res.data.message);
        setCardIdInput('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to link card. Ensure the ID is valid.');
    } finally {
      setLinking(false);
    }
  };

  const handleToggleStatus = async () => {
    if (!card) return;

    setError('');
    setSuccess('');
    setUpdating(true);

    const newStatus = card.status === 'active' ? 'paused' : 'active';

    try {
      const res = await axios.put(`${API_URL}/card/status`, { status: newStatus });
      if (res.data.success) {
        setCard(res.data.card);
        setSuccess(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update status.');
    } finally {
      setUpdating(false);
    }
  };

  const handleUnlinkCard = async () => {
    if (!window.confirm('Are you sure you want to unlink this card? It will stop responding to NFC taps until linked again.')) {
      return;
    }

    setError('');
    setSuccess('');
    setUpdating(true);

    try {
      const res = await axios.post(`${API_URL}/card/unlink`);
      if (res.data.success) {
        setCard(null);
        setSuccess('Card unlinked successfully.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Could not unlink card.');
    } finally {
      setUpdating(false);
    }
  };

  const getPublicUrl = () => {
    if (!card) return '';
    return `${window.location.origin}/u/${card.cardId}`;
  };

  const handleCopyLink = () => {
    const url = getPublicUrl();
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500 space-y-3">
        <RefreshCw className="h-7 w-7 text-indigo-650 animate-spin" />
        <span className="text-sm font-medium">Loading card details...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">My Smart NFC Card</h1>
        <p className="text-sm text-slate-550 mt-1">Manage your physical NFC card link, status signals, and QR profiles.</p>
      </div>

      {/* Message alerts */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-650 p-3 rounded-lg flex items-start space-x-2 text-xs">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-650 p-3 rounded-lg flex items-start space-x-2 text-xs">
          <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 text-emerald-500" />
          <span>{success}</span>
        </div>
      )}

      {card ? (
        /* Card Active Dashboard View */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card status details */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-indigo-50 text-indigo-600 p-2.5 rounded-lg border border-indigo-100">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">Linked Card</h3>
                    <p className="text-xs text-slate-500 font-mono">Code: {card.cardId}</p>
                  </div>
                </div>
                
                {/* Active/Paused status Pill */}
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  card.status === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                }`}>
                  {card.status}
                </span>
              </div>

              {/* Status Toggles */}
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-800">NFC Profile Signal</h4>
                    <p className="text-[11px] text-slate-550 mt-1">Temporarily pause card responses when lost or away.</p>
                  </div>
                  <button
                    onClick={handleToggleStatus}
                    disabled={updating}
                    className="text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                  >
                    {card.status === 'active' ? (
                      <ToggleRight className="h-10 w-10 text-indigo-600" />
                    ) : (
                      <ToggleLeft className="h-10 w-10 text-slate-400" />
                    )}
                  </button>
                </div>

                {/* Public profile sharing link */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-800">Public Profile Link</h4>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      readOnly
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-550 font-mono text-xs focus:outline-none"
                      value={getPublicUrl()}
                    />
                    <button
                      onClick={handleCopyLink}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg transition-all shrink-0 cursor-pointer shadow-xs"
                      title="Copy Card link"
                    >
                      {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-500">This URL opens when someone scans your NFC tag or taps your card.</p>
                </div>
              </div>

              {/* Unlink trigger */}
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={handleUnlinkCard}
                  disabled={updating}
                  className="bg-red-50 text-red-600 border border-red-100 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-red-100 transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Unlink Card Code</span>
                </button>
              </div>
            </div>
          </div>

          {/* QR Code Column */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-center space-y-4 shadow-xs">
              <div className="bg-indigo-50 text-indigo-600 p-2.5 rounded-lg border border-indigo-100">
                <QrCode className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Profile QR Code</h3>
              <p className="text-xs text-slate-500">Scan this QR code to view your digital card profile.</p>

              {/* QR Image using standard qrserver API */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-md">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(getPublicUrl())}`}
                  alt="NFC Card QR Code"
                  className="h-[180px] w-[180px]"
                />
              </div>
              
              <a
                href={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(getPublicUrl())}`}
                target="_blank"
                rel="noreferrer"
                download="onewinq-qrcode.png"
                className="text-xs text-indigo-650 hover:text-indigo-750 hover:underline font-semibold"
              >
                Download QR Code Image
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* Card Registration Form */
        <div className="max-w-xl bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6 shadow-xs">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-50 text-indigo-600 p-2.5 rounded-lg border border-indigo-100">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Link Your Smart Card</h3>
              <p className="text-xs text-slate-500">Bind your physical NFC card identifier to start networking.</p>
            </div>
          </div>

          <form onSubmit={handleLinkCard} className="space-y-4 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Card ID Code *</label>
              <input
                type="text"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-850 focus:outline-none focus:border-indigo-650 focus:bg-white text-sm transition-all font-mono"
                placeholder="WINQ-XXXXXX"
                value={cardIdInput}
                onChange={(e) => setCardIdInput(e.target.value)}
              />
              <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                Enter the unique Card ID printed on your physical OneWinq card.
              </p>
            </div>

            <button
              type="submit"
              disabled={linking}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-lg transition-all flex items-center justify-center space-x-2 text-xs disabled:opacity-50 cursor-pointer shadow-xs"
            >
              {linking ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Linking your card...</span>
                </>
              ) : (
                <span>Link Smart Card</span>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyCard;

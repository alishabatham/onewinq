import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';
import { useSearchParams } from 'react-router-dom';
import { 
  CreditCard, Copy, Check, ExternalLink, RefreshCw, AlertCircle, CheckCircle2, QrCode, Link2, Download, ShieldCheck
} from 'lucide-react';

const MyCard = () => {
  const [card, setCard] = useState(null);
  const [profile, setProfile] = useState(null);
  const [cardIdInput, setCardIdInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [linking, setLinking] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchData();
    const claim = searchParams.get('claim');
    if (claim) {
      setCardIdInput(claim);
      setSuccess(`Ready to claim card: ${claim}. Click Link Smart Card to activate.`);
    }
    if (searchParams.get('success') === 'true') {
      setSuccess('Your card was successfully activated!');
    }
  }, [searchParams]);

  const fetchData = async () => {
    try {
      const [cardRes, profileRes] = await Promise.all([
        axios.get(`${API_URL}/card/mycard`),
        axios.get(`${API_URL}/profile/me`)
      ]);

      if (cardRes.data.success) {
        setCard(cardRes.data.card);
      }
      if (profileRes.data.success && profileRes.data.profile) {
        setProfile(profileRes.data.profile);
      }
    } catch (err) {
      console.error(err);
      setError('Could not fetch card data.');
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

  const liveCardSlug = profile?.customUsername || card?.cardId || profile?._id || 'me';
  const fullPublicUrl = `${window.location.origin}/u/${liveCardSlug}`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(fullPublicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3500);
  };

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(fullPublicUrl)}`;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500 space-y-3 font-outfit">
        <RefreshCw className="h-7 w-7 text-indigo-600 animate-spin" />
        <span className="text-sm font-medium">Loading Card Link & QR Details...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-outfit text-slate-900 text-left">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-3">
            <CreditCard className="h-7 w-7 text-indigo-600" />
            <span>Digital Card Link & Hardware</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Access your shareable digital card URL, download your QR code, and manage physical NFC pairing.
          </p>
        </div>

        {card && (
          <div className="flex items-center space-x-3">
            <span className={`text-xs font-bold uppercase px-3 py-1.5 rounded-full border ${card.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
              ● {card.status}
            </span>
            <button
              onClick={handleToggleStatus}
              disabled={updating}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
            >
              {card.status === 'active' ? 'Pause NFC Tap' : 'Activate NFC Tap'}
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-xs flex items-center space-x-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-2xl text-xs flex items-center space-x-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* ==================== 1. DIGITAL CARD PUBLIC URL SECTION ==================== */}
      <div className="bg-white border border-slate-200/90 p-6 sm:p-8 rounded-3xl shadow-xs space-y-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
            <Link2 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Your Shareable Digital Card URL</h2>
            <p className="text-xs text-slate-500">Share this link directly on social media, email signatures, or WhatsApp</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
          {/* Public Link Box */}
          <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-mono text-slate-800 font-bold flex items-center justify-between select-all">
            <span className="truncate">{fullPublicUrl}</span>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopyUrl}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold px-5 py-3 rounded-2xl text-xs flex items-center justify-center space-x-2 shadow-md shadow-indigo-500/20 cursor-pointer transition-all shrink-0"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-white" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy URL</span>
              </>
            )}
          </button>

          {/* Open Link Button */}
          <a
            href={fullPublicUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold px-5 py-3 rounded-2xl text-xs flex items-center justify-center space-x-2 cursor-pointer transition-all shrink-0"
          >
            <ExternalLink className="h-4 w-4 text-indigo-600" />
            <span>Open Link</span>
          </a>
        </div>
      </div>

      {/* Main 2-Column Section: QR Code & NFC Hardware Pairing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ==================== 2. SHAREABLE QR CODE ==================== */}
        <div className="bg-white border border-slate-200/90 p-6 rounded-3xl shadow-xs space-y-4">
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
            <div className="h-10 w-10 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center shrink-0">
              <QrCode className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Digital Card QR Code</h3>
              <p className="text-xs text-slate-500">Scan to open digital identity profile</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-2 space-y-4">
            <div className="bg-white p-3 border border-slate-200 rounded-2xl shadow-md">
              <img
                src={qrImageUrl}
                alt="Digital Card QR Code"
                className="w-44 h-44 rounded-lg object-contain"
              />
            </div>

            <a
              href={qrImageUrl}
              download="onewinq_digital_card_qr.png"
              target="_blank"
              rel="noreferrer"
              className="bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition-all"
            >
              <Download className="h-4 w-4" />
              <span>Download QR Code Image</span>
            </a>
          </div>
        </div>

        {/* ==================== 3. PHYSICAL NFC HARDWARE PAIRING ==================== */}
        <div className="bg-white border border-slate-200/90 p-6 rounded-3xl shadow-xs space-y-4">
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Physical NFC Hardware Pairing</h3>
              <p className="text-xs text-slate-500">Link your physical NFC card serial ID</p>
            </div>
          </div>

          {card ? (
            <div className="space-y-4 pt-2">
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Linked NFC Serial</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-[10px]">
                    Active & Connected
                  </span>
                </div>
                <span className="font-mono font-extrabold text-indigo-600 text-base block">{card.cardId}</span>
              </div>

              <div className="text-xs text-slate-500 leading-relaxed pt-1">
                Tapping your physical NFC card against any smartphone will automatically open your digital identity link: <span className="font-mono text-slate-700 font-bold">{fullPublicUrl}</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4 pt-2">
              <p className="text-xs text-slate-500 leading-relaxed">
                Enter the physical card serial printed on your OneWinq NFC card tag to pair it with your account.
              </p>

              <form onSubmit={handleLinkCard} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Card Serial ID *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NX-CARD-7849"
                    value={cardIdInput}
                    onChange={(e) => setCardIdInput(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-mono placeholder-slate-400 focus:border-indigo-600 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={linking}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-3 rounded-xl text-xs transition-all cursor-pointer shadow-md shadow-indigo-500/20"
                >
                  {linking ? 'Linking Card...' : 'Link Smart NFC Card'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCard;

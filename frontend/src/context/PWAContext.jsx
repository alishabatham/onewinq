import React, { createContext, useContext, useState, useEffect } from 'react';
import { Smartphone, Download, Share, PlusSquare, X } from 'lucide-react';

const PWAContext = createContext();

export const PWAProvider = ({ children }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Service Worker Registration
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((reg) => {
            console.log('OneWinq PWA ServiceWorker registered successfully:', reg.scope);
          })
          .catch((err) => {
            console.warn('PWA ServiceWorker registration notice:', err);
          });
      });
    }

    // Check if app is already running as standalone PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                          window.navigator.standalone === true;
    if (isStandalone) {
      setIsInstalled(true);
    }

    // Detect iOS device
    const userAgent = window.navigator.userAgent.toLowerCase();
    const iosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(iosDevice);

    // Listen for beforeinstallprompt event (Android & Chrome/Edge)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      setShowInstallModal(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const triggerInstall = async () => {
    if (isInstalled) {
      alert('OneWinq App is already installed on your home screen!');
      return;
    }

    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult && choiceResult.outcome === 'accepted') {
          setIsInstalled(true);
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.error('Error triggering PWA prompt:', err);
        setShowInstallModal(true);
      }
    } else {
      setShowInstallModal(true);
    }
  };

  return (
    <PWAContext.Provider
      value={{
        isInstallable,
        isInstalled,
        isIOS,
        triggerInstall,
        openInstallModal: () => setShowInstallModal(true),
        closeInstallModal: () => setShowInstallModal(false)
      }}
    >
      {children}

      {/* PWA Download / Add to Home Screen Modal */}
      {showInstallModal && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative text-slate-800 transform transition-all animate-scaleUp">
            
            {/* Close Button */}
            <button
              onClick={() => setShowInstallModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header Icon */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6344F5] to-[#863BFF] flex items-center justify-center text-white shadow-lg shadow-[#6344F5]/30">
                <Smartphone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  Download to Home Screen
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Install app icon on phone without App Store
                </p>
              </div>
            </div>

            {/* Instructions Body */}
            {isIOS ? (
              <div className="space-y-4 py-2">
                <p className="text-xs text-slate-600 font-medium">
                  Follow these 3 quick steps to add OneWinq icon to your iPhone home screen:
                </p>
                <div className="bg-slate-50 rounded-2xl p-4 space-y-3 border border-slate-100">
                  <div className="flex items-center space-x-3 text-xs font-semibold text-slate-700">
                    <span className="w-6 h-6 rounded-full bg-[#6344F5] text-white flex items-center justify-center font-bold text-xs shrink-0">1</span>
                    <span className="flex items-center gap-1.5">
                      Tap the <Share className="h-4 w-4 text-[#6344F5] inline shrink-0" /> <strong>Share</strong> icon in Safari.
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs font-semibold text-slate-700">
                    <span className="w-6 h-6 rounded-full bg-[#6344F5] text-white flex items-center justify-center font-bold text-xs shrink-0">2</span>
                    <span className="flex items-center gap-1.5">
                      Scroll down & tap <PlusSquare className="h-4 w-4 text-[#6344F5] inline shrink-0" /> <strong>Add to Home Screen</strong>.
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs font-semibold text-slate-700">
                    <span className="w-6 h-6 rounded-full bg-[#6344F5] text-white flex items-center justify-center font-bold text-xs shrink-0">3</span>
                    <span>
                      Tap <strong>Add</strong> at top right. Your App Icon is ready! 📱
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 py-2">
                <p className="text-xs text-slate-600 font-medium">
                  Click the install button below or follow your browser's menu to add OneWinq as an icon on your home screen.
                </p>
                <div className="bg-slate-50 rounded-2xl p-4 space-y-3 border border-slate-100 text-xs text-slate-700 font-medium">
                  <div className="flex items-center space-x-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#6344F5] shrink-0"></div>
                    <span>Instant 1-tap access from phone home screen</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#6344F5] shrink-0"></div>
                    <span>Runs like a native mobile app (PWA)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-5 flex items-center justify-end space-x-3">
              {deferredPrompt ? (
                <button
                  onClick={triggerInstall}
                  className="w-full bg-[#6344F5] hover:bg-[#5233E0] text-white py-3 px-5 rounded-xl font-semibold text-sm shadow-md shadow-[#6344F5]/30 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>Download App Icon Now</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowInstallModal(false)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 px-5 rounded-xl font-semibold text-sm shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <span>Got It!</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </PWAContext.Provider>
  );
};

export const usePWA = () => {
  const context = useContext(PWAContext);
  if (!context) {
    throw new Error('usePWA must be used within a PWAProvider');
  }
  return context;
};

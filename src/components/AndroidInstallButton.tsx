import { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface AndroidInstallButtonProps {
  compact?: boolean;
}

export function AndroidInstallButton({ compact = false }: AndroidInstallButtonProps) {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  const handlePress = () => {
    if (isInstallable) {
      void install();
    } else {
      setShowGuide(true);
    }
  };

  return (
    <>
      <button
        onClick={handlePress}
        className={
          compact
            ? 'min-h-[38px] px-3 py-1.5 rounded-xl bg-brand hover:opacity-95 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer'
            : 'w-full min-h-[46px] px-4 py-2.5 rounded-2xl bg-brand hover:opacity-95 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer'
        }
      >
        <Download className="w-4 h-4 shrink-0" />
        <span>{compact ? 'Install App' : 'Install on Android Home Screen'}</span>
      </button>

      {showGuide && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center p-0 sm:p-4">
          <div className="w-full max-w-[460px] rounded-t-3xl sm:rounded-3xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] p-6 shadow-2xl space-y-4">
            <div className="w-10 h-1.5 bg-[#D5D1C8] dark:bg-[#2A3F36] rounded-full mx-auto" />
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand/10 text-brand dark:text-brand-dark flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold">
                    {isIOS ? 'Install on Mobile Safari' : 'Install Android App'}
                  </h3>
                  <p className="text-xs text-[#6B7570] dark:text-[#8A9690]">
                    Runs full-screen like a native Android app
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                aria-label="Close install guide"
                className="min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center text-[#6B7570] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isIOS ? (
              <ol className="text-sm text-[#4B5550] dark:text-[#C4CECA] space-y-2 list-decimal list-inside">
                <li>Tap the <strong>Share</strong> icon in your browser toolbar.</li>
                <li>Scroll down and tap <strong>Add to Home Screen</strong>.</li>
                <li>Tap <strong>Add</strong> to launch Noor Amaal full-screen.</li>
              </ol>
            ) : (
              <ol className="text-sm text-[#4B5550] dark:text-[#C4CECA] space-y-2 list-decimal list-inside">
                <li>Open this link in <strong>Google Chrome on Android</strong>.</li>
                <li>Tap the <strong>⋮ (Menu)</strong> icon at the top right corner.</li>
                <li>Tap <strong>Install app</strong> or <strong>Add to Home screen</strong>.</li>
                <li>Launch <strong>Noor Amaal</strong> directly from your Android app drawer.</li>
              </ol>
            )}

            <button
              onClick={() => setShowGuide(false)}
              className="w-full min-h-[46px] rounded-2xl bg-brand text-white text-sm font-semibold cursor-pointer"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </>
  );
}

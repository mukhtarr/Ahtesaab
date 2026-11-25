import { useEffect, useMemo, useState } from 'react';
import {
  Check,
  Copy,
  Mail,
  MessageCircle,
  Send,
  Share2,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { MuntakhabHadith } from '../data/muntakhabAhadith';
import {
  buildEmailShareUrl,
  buildTelegramShareUrl,
  buildWhatsAppShareUrl,
  copyTextToClipboard,
  formatHadithShareText,
  type ShareLanguageMode,
} from '../utils/hadithShare';
import { vibrateAndroid } from '../utils/haptics';

interface HadithShareSheetProps {
  hadith: MuntakhabHadith | null;
  defaultMode: ShareLanguageMode;
  onClose: () => void;
}

export function HadithShareSheet({
  hadith,
  defaultMode,
  onClose,
}: HadithShareSheetProps) {
  const [mode, setMode] = useState<ShareLanguageMode>(defaultMode);
  const [copied, setCopied] = useState(false);
  const [nativeNotice, setNativeNotice] = useState<string | null>(null);

  useEffect(() => {
    setMode(defaultMode);
    setCopied(false);
    setNativeNotice(null);
  }, [hadith, defaultMode]);

  const shareText = useMemo(
    () => (hadith ? formatHadithShareText(hadith, mode) : ''),
    [hadith, mode],
  );

  const handleCopy = async () => {
    if (!shareText) return;
    vibrateAndroid(14);
    const ok = await copyTextToClipboard(shareText);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleNativeShare = async () => {
    if (!hadith || !shareText) return;
    vibrateAndroid(14);
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: `${hadith.chapter} · ${hadith.source}`,
          text: shareText,
        });
        return;
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
      }
    }
    const ok = await copyTextToClipboard(shareText);
    setNativeNotice(
      ok
        ? 'System share unavailable here — text copied to clipboard.'
        : 'Use WhatsApp, Telegram, Email, or Copy below.',
    );
  };

  return (
    <AnimatePresence>
      {hadith && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-hadith-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/55 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-lg rounded-t-3xl sm:rounded-3xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] shadow-2xl overflow-hidden pb-safe"
          >
            <div className="w-10 h-1.5 bg-[#D5D0C6] dark:bg-[#2A3B34] rounded-full mx-auto mt-3 sm:hidden" />

            <div className="px-4 pt-3 pb-3 border-b border-[#EFECE6] dark:border-[#1E2E28] flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-brand dark:text-brand-dark tabular-nums truncate">
                  Hadith #{hadith.hadithNumber} · {hadith.chapter} · {hadith.source}
                </p>
                <h2
                  id="share-hadith-title"
                  className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#141A17] dark:text-[#F3F4F1]"
                >
                  Share Hadith
                </h2>
              </div>

              <button
                onClick={onClose}
                aria-label="Close share options"
                className="min-h-[44px] min-w-[44px] rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] text-[#4B5550] dark:text-[#A3B0AA] flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714]">
                {(
                  [
                    { id: 'all', label: 'All Languages' },
                    { id: 'urdu', label: 'Arabic + Urdu' },
                    { id: 'english', label: 'Arabic + Eng' },
                  ] as const
                ).map((opt) => {
                  const active = mode === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        vibrateAndroid(8);
                        setMode(opt.id);
                      }}
                      className={`min-h-[40px] px-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                        active
                          ? 'bg-white dark:bg-[#192923] text-brand dark:text-brand-dark shadow-sm'
                          : 'text-[#6B7570] dark:text-[#8A9690]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              <div className="rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] p-3 max-h-36 overflow-y-auto text-xs text-[#4B5550] dark:text-[#C4CECA] whitespace-pre-wrap leading-relaxed">
                {shareText}
              </div>

              {nativeNotice && (
                <p className="text-xs text-brand dark:text-brand-dark font-medium">
                  {nativeNotice}
                </p>
              )}

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={buildWhatsAppShareUrl(shareText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => vibrateAndroid(12)}
                  className="min-h-[48px] px-4 rounded-2xl bg-[#15803D] text-white text-xs font-semibold flex items-center justify-center gap-2 whitespace-nowrap shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={buildTelegramShareUrl(shareText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => vibrateAndroid(12)}
                  className="min-h-[48px] px-4 rounded-2xl bg-[#0284C7] text-white text-xs font-semibold flex items-center justify-center gap-2 whitespace-nowrap shadow-sm"
                >
                  <Send className="w-4 h-4 shrink-0" />
                  <span>Telegram</span>
                </a>

                <a
                  href={buildEmailShareUrl(hadith, shareText)}
                  onClick={() => vibrateAndroid(12)}
                  className="min-h-[48px] px-4 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] text-[#141A17] dark:text-[#F3F4F1] text-xs font-semibold flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>Email</span>
                </a>

                <button
                  onClick={handleNativeShare}
                  className="min-h-[48px] px-4 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] text-[#141A17] dark:text-[#F3F4F1] text-xs font-semibold flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <Share2 className="w-4 h-4 shrink-0" />
                  <span>More Apps</span>
                </button>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleCopy}
                className="w-full min-h-[48px] px-4 rounded-2xl bg-gradient-to-r from-brand to-brand-to text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm cursor-pointer whitespace-nowrap"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Copied Hadith to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 shrink-0" />
                    <span>Copy Formatted Hadith</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

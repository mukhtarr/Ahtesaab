import { BellRing, Check, Moon, Volume2, VolumeX, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { ActiveReminder, DailyLog, FarzKey } from '../types/amaal';

interface ReminderOverlayProps {
  reminder: ActiveReminder | null;
  todayLog: DailyLog | null;
  isPlayingAzaan: boolean;
  onDismiss: () => void;
  onStopAudio: () => void;
  onMarkPrayerDone?: (prayer: FarzKey) => void;
  onOpenAzkaar?: (period: 'morning' | 'evening') => void;
  onOpenSleepSubmit?: () => void;
}

export function ReminderOverlay({
  reminder,
  todayLog,
  isPlayingAzaan,
  onDismiss,
  onStopAudio,
  onMarkPrayerDone,
  onOpenAzkaar,
  onOpenSleepSubmit,
}: ReminderOverlayProps) {
  const pendingItems: string[] = [];
  if (todayLog) {
    (['fajr', 'zuhr', 'asr', 'maghrib', 'isha'] as FarzKey[]).forEach((k) => {
      if (todayLog[k] === 'pending') {
        pendingItems.push(`${k.charAt(0).toUpperCase() + k.slice(1)} Namaz`);
      }
    });
    if (!todayLog.morningAzkaar) pendingItems.push('Morning Azkaar');
    if (!todayLog.eveningAzkaar) pendingItems.push('Evening Azkaar');
    if (todayLog.quranPages === 0) pendingItems.push('Daily Quran Recitation');
    if (!todayLog.dailyTaleem) pendingItems.push('Daily Taleem (Hadees)');
    if (!todayLog.quranHalqa) pendingItems.push('Daily Quran Halqa');
  }

  return (
    <AnimatePresence>
      {reminder && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm flex items-end justify-center"
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[460px] bg-white dark:bg-[#121E1A] rounded-t-3xl border-t border-x border-[#E5E2DC] dark:border-[#1E2E28] p-5 pb-safe shadow-2xl space-y-5"
          >
            <div className="w-10 h-1.5 bg-[#D5D1C8] dark:bg-[#2A3F36] rounded-full mx-auto" />

            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-brand/10 dark:bg-brand-dark/15 text-brand dark:text-brand-dark flex items-center justify-center shrink-0">
                  {reminder.type === 'sleep' ? (
                    <Moon className="w-5 h-5" />
                  ) : (
                    <BellRing className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-medium text-[#6B7570] dark:text-[#8A9690] tabular-nums">
                    Scheduled Reminder · {reminder.time}
                  </p>
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#141A17] dark:text-[#F3F4F1]">
                    {reminder.title}
                  </h2>
                </div>
              </div>
              <button
                onClick={() => {
                  onStopAudio();
                  onDismiss();
                }}
                aria-label="Close reminder"
                className="min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center text-[#6B7570] hover:bg-[#F1EFEA] dark:hover:bg-[#1C2D27] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-[#4B5550] dark:text-[#B4C0BA] leading-relaxed">
              {reminder.subtitle}
            </p>

            {reminder.type === 'sleep' && (
              <div className="rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] p-4 space-y-2">
                <p className="text-xs font-semibold text-[#141A17] dark:text-[#F3F4F1]">
                  {pendingItems.length === 0
                    ? 'Alhamdulillah, all primary daily Amaal are recorded.'
                    : `Remaining items before sleep (${pendingItems.length}):`}
                </p>
                {pendingItems.length > 0 && (
                  <p className="text-xs text-[#6B7570] dark:text-[#96A39D] leading-relaxed">
                    {pendingItems.join(' · ')}
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-col gap-2.5 pt-1">
              {isPlayingAzaan && (
                <button
                  onClick={onStopAudio}
                  className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-[#B4833E] hover:bg-[#9C6F30] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <VolumeX className="w-4 h-4" />
                  <span>Stop Loud Azaan Audio</span>
                </button>
              )}

              {reminder.type === 'azaan' && reminder.prayerKey && onMarkPrayerDone && (
                <button
                  onClick={() => {
                    onStopAudio();
                    onMarkPrayerDone(reminder.prayerKey!);
                    onDismiss();
                  }}
                  className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-brand hover:opacity-95 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Mark {reminder.prayerKey.toUpperCase()} Offered</span>
                </button>
              )}

              {reminder.type === 'azkaar' && onOpenAzkaar && (
                <button
                  onClick={() => {
                    onStopAudio();
                    onOpenAzkaar(reminder.id.includes('morning') ? 'morning' : 'evening');
                    onDismiss();
                  }}
                  className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-brand hover:opacity-95 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Open Azkaar Companion</span>
                </button>
              )}

              {reminder.type === 'sleep' && onOpenSleepSubmit && (
                <button
                  onClick={() => {
                    onStopAudio();
                    onOpenSleepSubmit();
                    onDismiss();
                  }}
                  className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-brand hover:opacity-95 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Moon className="w-4 h-4" />
                  <span>Review & Submit Day Honestly</span>
                </button>
              )}

              <button
                onClick={() => {
                  onStopAudio();
                  onDismiss();
                }}
                className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-[#E5E2DC] dark:border-[#1E2E28] text-sm font-medium text-[#4B5550] dark:text-[#C4CECA] hover:bg-[#F8F7F4] dark:hover:bg-[#192923] transition-colors cursor-pointer"
              >
                Dismiss Reminder
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

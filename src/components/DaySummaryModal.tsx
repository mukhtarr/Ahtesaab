import { BookOpen, CheckCircle2, Moon, Sparkles, Users, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { DailyLog, FarzKey, NafilKey } from '../types/amaal';

interface DaySummaryModalProps {
  open: boolean;
  log: DailyLog;
  quranGoalPages: number;
  onClose: () => void;
}

const FARZ_LIST: Array<{ key: FarzKey; label: string }> = [
  { key: 'fajr', label: 'Fajr' },
  { key: 'zuhr', label: 'Zuhr' },
  { key: 'asr', label: 'Asr' },
  { key: 'maghrib', label: 'Maghrib' },
  { key: 'isha', label: 'Isha' },
];

const NAFIL_LIST: Array<{ key: NafilKey; label: string }> = [
  { key: 'tahajjud', label: 'Tahajjud' },
  { key: 'ishraq', label: 'Ishraq' },
  { key: 'chasht', label: 'Chasht' },
  { key: 'awwabin', label: 'Awwabin' },
];

export function DaySummaryModal({
  open,
  log,
  quranGoalPages,
  onClose,
}: DaySummaryModalProps) {
  const offeredFarz = FARZ_LIST.filter(
    (f) => log[f.key] === 'jamaat' || log[f.key] === 'ontime' || log[f.key] === 'qaza',
  ).length;
  const jamaatCount = FARZ_LIST.filter((f) => log[f.key] === 'jamaat').length;
  const nafilCount = NAFIL_LIST.filter((n) => log[n.key]).length;
  const nekCompleted = (log.nekAmaalJson || []).filter((i) => i.completed).length;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center"
        >
          <motion.div
            initial={{ y: 32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 32, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[460px] max-h-[90vh] overflow-y-auto bg-white dark:bg-[#121E1A] rounded-t-3xl border-t border-x border-[#E5E2DC] dark:border-[#1E2E28] shadow-2xl"
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src="/src/assets/images/mosque_courtyard_dawn_1795498977201.jpg"
                alt="Mosque courtyard"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20 p-6 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-emerald-200 tabular-nums">
                    Complete Day Summary · {log.date}
                  </span>
                  <button
                    onClick={onClose}
                    aria-label="Close summary"
                    className="min-h-[44px] min-w-[44px] rounded-xl bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div>
                  <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
                    Alhamdulillah — Honest Evening Muhasabah
                  </h2>
                  <p className="text-xs text-white/80 mt-0.5 tabular-nums">
                    {log.submittedAt
                      ? `Submitted at ${new Date(log.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                      : 'Saved to your personal history'}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Top KPI Summary Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28]">
                  <p className="text-xs text-[#6B7570] dark:text-[#8A9690]">Farz Namaz</p>
                  <p className="text-2xl font-bold tabular-nums mt-1 text-[#0D5C46] dark:text-[#34D399]">
                    {offeredFarz}/5
                  </p>
                  <p className="text-xs text-[#6B7570] dark:text-[#8A9690] tabular-nums">
                    {jamaatCount} in Jamaat
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28]">
                  <p className="text-xs text-[#6B7570] dark:text-[#8A9690]">Nafil Namaz</p>
                  <p className="text-2xl font-bold tabular-nums mt-1">{nafilCount}/4</p>
                  <p className="text-xs text-[#6B7570] dark:text-[#8A9690]">Extra prayers</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28]">
                  <p className="text-xs text-[#6B7570] dark:text-[#8A9690]">Quran Tilawat</p>
                  <p className="text-2xl font-bold tabular-nums mt-1">{log.quranPages} pg</p>
                  <p className="text-xs text-[#6B7570] dark:text-[#8A9690] tabular-nums">
                    Goal {quranGoalPages} pg · {log.quranRuku} Ruku
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28]">
                  <p className="text-xs text-[#6B7570] dark:text-[#8A9690]">Nek Amaal</p>
                  <p className="text-2xl font-bold tabular-nums mt-1">
                    {nekCompleted}/{(log.nekAmaalJson || []).length}
                  </p>
                  <p className="text-xs text-[#6B7570] dark:text-[#8A9690]">Good deeds</p>
                </div>
              </div>

              {/* Farz Breakdown */}
              <div className="space-y-2.5">
                <h3 className="text-sm font-semibold text-[#141A17] dark:text-[#F3F4F1]">
                  01. Five Farz Prayers
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  {FARZ_LIST.map((f) => {
                    const status = log[f.key];
                    const isDone = status === 'jamaat' || status === 'ontime' || status === 'qaza';
                    return (
                      <div
                        key={f.key}
                        className={`p-2.5 rounded-xl border text-center ${
                          isDone
                            ? 'bg-[#0D5C46]/10 border-[#0D5C46]/30 text-[#0D5C46] dark:text-[#34D399]'
                            : 'bg-[#F8F7F4] dark:bg-[#0D1714] border-[#E5E2DC] dark:border-[#1E2E28] text-[#6B7570]'
                        }`}
                      >
                        <p className="text-xs font-semibold">{f.label}</p>
                        <p className="text-[11px] capitalize mt-0.5">{status}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Nafil, Azkaar, Taleem & Halqa */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="p-4 rounded-2xl border border-[#E5E2DC] dark:border-[#1E2E28] space-y-2">
                  <div className="flex items-center gap-2 font-semibold">
                    <Sparkles className="w-4 h-4 text-[#B4833E]" />
                    <span>Azkaar & Nafil</span>
                  </div>
                  <p className="text-xs text-[#4B5550] dark:text-[#A3B0AA]">
                    Morning Azkaar: {log.morningAzkaar ? 'Completed' : 'Not recorded'} · Evening
                    Azkaar: {log.eveningAzkaar ? 'Completed' : 'Not recorded'}
                  </p>
                  <p className="text-xs text-[#4B5550] dark:text-[#A3B0AA]">
                    Nafil:{' '}
                    {NAFIL_LIST.filter((n) => log[n.key])
                      .map((n) => n.label)
                      .join(', ') || 'None recorded'}
                  </p>
                  <p className="text-xs text-[#4B5550] dark:text-[#A3B0AA]">
                    Roza (Fast):{' '}
                    {log.roza
                      ? `Observed (${log.rozaType === 'qaza' ? 'Qaza' : 'Sunnah'})`
                      : 'Not fasting'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-[#E5E2DC] dark:border-[#1E2E28] space-y-2">
                  <div className="flex items-center gap-2 font-semibold">
                    <BookOpen className="w-4 h-4 text-[#0D5C46] dark:text-[#34D399]" />
                    <span>Taleem & Quran Halqa</span>
                  </div>
                  <p className="text-xs text-[#4B5550] dark:text-[#A3B0AA]">
                    Daily Taleem (Hadees):{' '}
                    {log.dailyTaleem ? `Completed (${log.taleemMinutes} min)` : 'Not recorded'}
                  </p>
                  <p className="text-xs text-[#4B5550] dark:text-[#A3B0AA]">
                    Quran Halqa: {log.quranHalqa ? 'Attended' : 'Not recorded'}
                  </p>
                </div>
              </div>

              {log.reflectionNote && (
                <div className="p-4 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#6B7570] dark:text-[#8A9690]">
                    <Moon className="w-3.5 h-3.5" />
                    <span>Evening Reflection</span>
                  </div>
                  <p className="text-sm text-[#141A17] dark:text-[#F3F4F1]">{log.reflectionNote}</p>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-[#0D5C46]/5 dark:bg-[#34D399]/10 border border-[#0D5C46]/20 flex items-start gap-3">
                <Users className="w-4 h-4 text-[#0D5C46] dark:text-[#34D399] shrink-0 mt-0.5" />
                <p className="text-xs text-[#4B5550] dark:text-[#B4C0BA] leading-relaxed">
                  “The most beloved deeds to Allah are those that are most consistent, even if they
                  are small.” — Sahih al-Bukhari 6464. May Allah accept your efforts and grant you
                  restful sleep with peace of heart.
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full min-h-[48px] rounded-xl bg-[#0D5C46] hover:bg-[#094635] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Done</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

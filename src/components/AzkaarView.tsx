import { useMemo, useState } from 'react';
import {
  Check,
  Moon,
  RotateCcw,
  Sparkles,
  Sunrise,
  Sunset,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { AZKAAR_LIST } from '../data/azkaarData';
import type { DailyLog } from '../types/amaal';
import { playTasbeehTick } from '../utils/azaanAudio';
import { vibrateAndroid } from '../utils/haptics';

interface AzkaarViewProps {
  todayLog: DailyLog | null;
  initialPeriod?: 'morning' | 'evening';
  onCompleteAzkaar: (period: 'morning' | 'evening') => Promise<void>;
}

type AzkaarTab = 'morning' | 'evening' | 'salah' | 'sleep';

const TAB_THEME: Record<
  AzkaarTab,
  {
    gradient: string;
    label: string;
    subtitle: string;
  }
> = {
  morning: {
    gradient: 'from-[#D97706] via-[#B4833E] to-[#0D5C46]',
    label: 'Morning (Fajr)',
    subtitle: 'Recite after Fajr Salah until sunrise',
  },
  evening: {
    gradient: 'from-[#C2410C] via-[#9A3412] to-[#312E81]',
    label: 'Evening (Asr)',
    subtitle: 'Recite after Asr Salah until nightfall',
  },
  salah: {
    gradient: 'from-[#0D5C46] via-[#0F766E] to-[#0369A1]',
    label: 'After Namaz',
    subtitle: 'Masnoon Tasbeeh Fatimah & Adhkar after Farz prayer',
  },
  sleep: {
    gradient: 'from-[#312E81] via-[#4338CA] to-[#0F172A]',
    label: 'Before Sleep',
    subtitle: 'Prophetic remembrances for peaceful protection at night',
  },
};

export function AzkaarView({
  todayLog,
  initialPeriod = 'morning',
  onCompleteAzkaar,
}: AzkaarViewProps) {
  const [period, setPeriod] = useState<AzkaarTab>(initialPeriod);
  const [counts, setCounts] = useState<Record<string, number>>({});

  const visibleAzkaar = useMemo(
    () =>
      AZKAAR_LIST.filter((z) => {
        if (period === 'morning' || period === 'evening') {
          return z.period === 'both' || z.period === period;
        }
        return z.period === period;
      }),
    [period],
  );

  const completedInSection = visibleAzkaar.filter(
    (z) => (counts[`${period}-${z.id}`] ?? 0) >= z.targetCount,
  ).length;
  const sectionPct = visibleAzkaar.length
    ? Math.round((completedInSection / visibleAzkaar.length) * 100)
    : 0;

  const isCompleted =
    period === 'morning'
      ? Boolean(todayLog?.morningAzkaar)
      : period === 'evening'
        ? Boolean(todayLog?.eveningAzkaar)
        : false;

  const handleTap = (id: string, target: number) => {
    const key = `${period}-${id}`;
    vibrateAndroid(12);
    playTasbeehTick();
    setCounts((prev) => {
      const current = prev[key] ?? 0;
      const next = current >= target ? target : current + 1;
      if (next === target) {
        vibrateAndroid(24);
      }
      return { ...prev, [key]: next };
    });
  };

  const handleReset = (id: string) => {
    const key = `${period}-${id}`;
    vibrateAndroid(8);
    setCounts((prev) => ({ ...prev, [key]: 0 }));
  };

  const theme = TAB_THEME[period];

  return (
    <div className="space-y-4 pb-24">
      <section className="rounded-3xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] overflow-hidden shadow-sm">
        <div className={`bg-gradient-to-br ${theme.gradient} text-white p-4 space-y-3 transition-colors duration-300`}>
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-medium text-white/85 tabular-nums">
                Hisn-ul-Muslim · {visibleAzkaar.length} Adhkar · {completedInSection}/
                {visibleAzkaar.length} Complete
              </p>
              <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
                All Masnoon Azkaar
              </h1>
              <p className="text-xs text-white/85 mt-0.5">{theme.subtitle}</p>
            </div>
            <Sparkles className="w-6 h-6 text-amber-200 shrink-0" />
          </div>

          <div className="h-1.5 w-full rounded-full bg-black/20 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${sectionPct}%` }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full bg-white"
            />
          </div>

          <div className="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-black/20">
            {(
              [
                { id: 'morning', label: 'Morning', icon: Sunrise },
                { id: 'evening', label: 'Evening', icon: Sunset },
                { id: 'salah', label: 'Namaz', icon: Sparkles },
                { id: 'sleep', label: 'Sleep', icon: Moon },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              const active = period === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    vibrateAndroid(10);
                    setPeriod(tab.id);
                  }}
                  className={`relative min-h-[42px] px-1.5 rounded-xl text-[11px] font-semibold flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-colors ${
                    active ? 'text-[#141A17]' : 'text-white/85'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="azkaar-category-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-xl bg-white shadow-sm"
                    />
                  )}
                  <Icon className="w-3.5 h-3.5 relative z-10" />
                  <span className="relative z-10 whitespace-nowrap">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {(period === 'morning' || period === 'evening') && (
          <div className="p-4">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                vibrateAndroid(20);
                void onCompleteAzkaar(period);
              }}
              className={`w-full min-h-[46px] px-4 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                isCompleted
                  ? 'bg-[#0D5C46]/15 text-[#0D5C46] dark:text-[#34D399] border border-[#0D5C46]/30'
                  : 'bg-gradient-to-r from-[#B4833E] to-[#D97706] text-white shadow-sm'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>
                {isCompleted
                  ? `${period === 'morning' ? 'Morning' : 'Evening'} Azkaar Completed`
                  : `Mark ${period === 'morning' ? 'Morning' : 'Evening'} Azkaar Complete`}
              </span>
            </motion.button>
          </div>
        )}
      </section>

      <AnimatePresence mode="wait">
        <motion.section
          key={period}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          {visibleAzkaar.map((item, idx) => {
            const count = counts[`${period}-${item.id}`] ?? 0;
            const done = count >= item.targetCount;
            const pct = Math.min(100, Math.round((count / item.targetCount) * 100));

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.18,
                  delay: Math.min(idx * 0.02, 0.14),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`rounded-3xl bg-white dark:bg-[#121E1A] border overflow-hidden transition-colors ${
                  done
                    ? 'border-[#0D5C46] dark:border-[#34D399]'
                    : 'border-[#E5E2DC] dark:border-[#1E2E28]'
                }`}
              >
                <div className="h-1 w-full bg-[#EFECE6] dark:bg-[#1E2E28]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className={`h-full ${
                      done
                        ? 'bg-[#0D5C46] dark:bg-[#34D399]'
                        : 'bg-gradient-to-r from-[#B4833E] to-[#D97706]'
                    }`}
                  />
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold leading-snug">
                        {item.title}
                      </h2>
                      <p className="text-[11px] text-[#6B7570] dark:text-[#8A9690] mt-0.5">
                        {item.virtue}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleTap(item.id, item.targetCount)}
                        className={`min-h-[44px] px-3.5 rounded-2xl text-xs font-semibold tabular-nums flex items-center gap-1.5 cursor-pointer transition-colors ${
                          done
                            ? 'bg-gradient-to-r from-[#0D5C46] to-[#0F766E] text-white shadow-sm'
                            : 'bg-[#0D5C46]/10 text-[#0D5C46] dark:text-[#34D399]'
                        }`}
                      >
                        {done && <Check className="w-3.5 h-3.5" />}
                        <span>
                          {count}/{item.targetCount}
                        </span>
                      </motion.button>

                      {count > 0 && (
                        <button
                          onClick={() => handleReset(item.id)}
                          aria-label={`Reset ${item.title} counter`}
                          className="min-h-[44px] min-w-[44px] rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] text-[#6B7570] flex items-center justify-center cursor-pointer"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="font-arabic text-2xl leading-[2.15] text-right text-[#141A17] dark:text-[#F3F4F1]">
                    {item.arabic}
                  </p>

                  <p className="text-xs italic text-[#6B7570] dark:text-[#8A9690]">
                    {item.transliteration}
                  </p>

                  <p className="font-urdu text-base text-right text-[#0D5C46] dark:text-[#6EE7B7] leading-[1.95]">
                    {item.urdu}
                  </p>

                  <p className="text-sm text-[#4B5550] dark:text-[#C4CECA] leading-relaxed">
                    {item.english}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.section>
      </AnimatePresence>
    </div>
  );
}

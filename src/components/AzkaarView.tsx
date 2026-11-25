import { useMemo, useState } from 'react';
import {
  Check,
  HandHeart,
  Moon,
  RotateCcw,
  Search,
  Sparkles,
  Sunrise,
  Sunset,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AZKAAR_LIST,
  MASNOON_DUA_GROUPS,
  type MasnoonDuaGroup,
} from '../data/azkaarData';
import type { DailyLog } from '../types/amaal';
import { playTasbeehTick } from '../utils/azaanAudio';
import { vibrateAndroid } from '../utils/haptics';

export type AzkaarTab = 'morning' | 'evening' | 'salah' | 'sleep' | 'dua';

interface AzkaarViewProps {
  todayLog: DailyLog | null;
  initialPeriod?: AzkaarTab;
  onCompleteAzkaar: (period: 'morning' | 'evening') => Promise<void>;
}

const TAB_THEME: Record<
  AzkaarTab,
  {
    gradient: string;
    label: string;
    heading: string;
    subtitle: string;
  }
> = {
  morning: {
    gradient: 'from-[#D97706] via-[#B4833E] to-brand',
    label: 'Morning (Fajr)',
    heading: 'All Masnoon Azkaar',
    subtitle: 'Recite after Fajr Salah until sunrise',
  },
  evening: {
    gradient: 'from-[#C2410C] via-[#9A3412] to-[#312E81]',
    label: 'Evening (Asr)',
    heading: 'All Masnoon Azkaar',
    subtitle: 'Recite after Asr Salah until nightfall',
  },
  salah: {
    gradient: 'from-brand via-brand-to to-[#0369A1]',
    label: 'After Namaz',
    heading: 'All Masnoon Azkaar',
    subtitle: 'Masnoon Tasbeeh Fatimah & Adhkar after Farz prayer',
  },
  sleep: {
    gradient: 'from-[#312E81] via-[#4338CA] to-[#0F172A]',
    label: 'Before Sleep',
    heading: 'All Masnoon Azkaar',
    subtitle: 'Prophetic remembrances for peaceful protection at night',
  },
  dua: {
    gradient: 'from-brand via-[#047857] to-[#B4833E]',
    label: 'Masnoon Duas',
    heading: 'All Masnoon Duas',
    subtitle: 'Daily Prophetic supplications for every moment from Hisn-ul-Muslim',
  },
};

export function AzkaarView({
  todayLog,
  initialPeriod = 'morning',
  onCompleteAzkaar,
}: AzkaarViewProps) {
  const [period, setPeriod] = useState<AzkaarTab>(initialPeriod);
  const [duaGroup, setDuaGroup] = useState<MasnoonDuaGroup>('All Duas');
  const [search, setSearch] = useState('');
  const [counts, setCounts] = useState<Record<string, number>>({});

  const visibleAzkaar = useMemo(() => {
    const q = search.trim().toLowerCase();
    const rawQ = search.trim();

    return AZKAAR_LIST.filter((z) => {
      if (period === 'morning' || period === 'evening') {
        if (z.period !== 'both' && z.period !== period) return false;
      } else if (z.period !== period) {
        return false;
      }

      if (period === 'dua' && duaGroup !== 'All Duas' && z.duaGroup !== duaGroup) {
        return false;
      }

      if (!q) return true;
      return (
        z.title.toLowerCase().includes(q) ||
        z.english.toLowerCase().includes(q) ||
        z.transliteration.toLowerCase().includes(q) ||
        z.virtue.toLowerCase().includes(q) ||
        z.urdu.includes(rawQ) ||
        z.arabic.includes(rawQ)
      );
    });
  }, [period, duaGroup, search]);

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
  const totalDuaCount = AZKAAR_LIST.filter((item) => item.period === 'dua').length;

  return (
    <div className="space-y-4 pb-24">
      <section className="rounded-3xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] overflow-hidden shadow-sm">
        <div
          className={`bg-gradient-to-br ${theme.gradient} text-white p-4 space-y-3 transition-colors duration-300`}
        >
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-medium text-white/85 tabular-nums">
                Hisn-ul-Muslim · {visibleAzkaar.length}{' '}
                {period === 'dua' ? 'Masnoon Duas' : 'Adhkar'} · {completedInSection}/
                {visibleAzkaar.length} Complete
              </p>
              <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
                {theme.heading}
              </h1>
              <p className="text-xs text-white/85 mt-0.5">{theme.subtitle}</p>
            </div>
            {period === 'dua' ? (
              <HandHeart className="w-6 h-6 text-amber-200 shrink-0" />
            ) : (
              <Sparkles className="w-6 h-6 text-amber-200 shrink-0" />
            )}
          </div>

          <div className="h-1.5 w-full rounded-full bg-black/20 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${sectionPct}%` }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full bg-white"
            />
          </div>

          <div className="grid grid-cols-5 gap-1 p-1 rounded-2xl bg-black/20">
            {(
              [
                { id: 'morning', label: 'Morning', icon: Sunrise },
                { id: 'evening', label: 'Evening', icon: Sunset },
                { id: 'salah', label: 'Namaz', icon: Sparkles },
                { id: 'sleep', label: 'Sleep', icon: Moon },
                { id: 'dua', label: 'Duas', icon: HandHeart },
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
                  className={`relative min-h-[44px] px-1 rounded-xl text-[11px] font-semibold flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-colors ${
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

        <div className="p-4 space-y-3">
          {(period === 'morning' || period === 'evening') && (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                vibrateAndroid(20);
                void onCompleteAzkaar(period);
              }}
              className={`w-full min-h-[46px] px-4 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                isCompleted
                  ? 'bg-brand/15 text-brand dark:text-brand-dark border border-brand/30'
                  : 'bg-gradient-to-r from-[#B4833E] to-[#D97706] text-white shadow-sm'
              }`}
            >
              <Check className="w-4 h-4" />
              <span className="whitespace-nowrap">
                {isCompleted
                  ? `${period === 'morning' ? 'Morning' : 'Evening'} Azkaar Completed`
                  : `Mark ${period === 'morning' ? 'Morning' : 'Evening'} Azkaar Complete`}
              </span>
            </motion.button>
          )}

          {period === 'dua' && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
              {MASNOON_DUA_GROUPS.map((group) => {
                const active = duaGroup === group;
                const count =
                  group === 'All Duas'
                    ? totalDuaCount
                    : AZKAAR_LIST.filter(
                        (item) => item.period === 'dua' && item.duaGroup === group,
                      ).length;

                return (
                  <motion.button
                    key={group}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      vibrateAndroid(8);
                      setDuaGroup(group);
                    }}
                    className={`min-h-[38px] px-3 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-all tabular-nums ${
                      active
                        ? 'bg-gradient-to-r from-brand to-[#047857] text-white shadow-sm'
                        : 'bg-[#F8F7F4] dark:bg-[#0D1714] text-[#4B5550] dark:text-[#A3B0AA]'
                    }`}
                  >
                    {group} ({count})
                  </motion.button>
                );
              })}
            </div>
          )}

          <div className="relative">
            <Search className="w-4 h-4 text-[#6B7570] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                period === 'dua'
                  ? 'Search Masnoon Duas (travel, masjid, home, istikhara...)'
                  : 'Search Azkaar in English, Urdu, or transliteration...'
              }
              className="w-full min-h-[44px] pl-10 pr-3.5 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        <motion.section
          key={`${period}-${duaGroup}`}
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
                    ? 'border-brand dark:border-brand-dark'
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
                        ? 'bg-brand dark:bg-brand-dark'
                        : 'bg-gradient-to-r from-[#B4833E] to-[#D97706]'
                    }`}
                  />
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      {item.duaGroup && (
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#B4833E] dark:text-amber-300 mb-0.5">
                          {item.duaGroup}
                        </p>
                      )}
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
                            ? 'bg-gradient-to-r from-brand to-brand-to text-white shadow-sm'
                            : 'bg-brand/10 text-brand dark:text-brand-dark'
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

                  <p className="font-urdu text-base text-right text-brand dark:text-brand-urdu leading-[1.95]">
                    {item.urdu}
                  </p>

                  <p className="text-sm text-[#4B5550] dark:text-[#C4CECA] leading-relaxed">
                    {item.english}
                  </p>
                </div>
              </motion.article>
            );
          })}

          {visibleAzkaar.length === 0 && (
            <div className="rounded-3xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] p-8 text-center text-sm text-[#6B7570]">
              No Azkaar or Masnoon Duas matched your search.
            </div>
          )}
        </motion.section>
      </AnimatePresence>
    </div>
  );
}

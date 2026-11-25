import { useMemo, useState } from 'react';
import { Bookmark, BookMarked, Check, CheckCircle2, Search } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { MUNTAKHAB_AHADITH, MUNTAKHAB_CHAPTERS } from '../data/muntakhabAhadith';
import type { DailyLog } from '../types/amaal';
import { vibrateAndroid } from '../utils/haptics';

interface MuntakhabViewProps {
  todayLog: DailyLog | null;
  onCompleteTaleem: (chapterName: string) => Promise<void>;
}

const CHAPTER_ACCENT: Record<string, string> = {
  'Kalimah Tayyibah': 'from-[#0D5C46] to-[#0F766E]',
  Salaah: 'from-[#1D4ED8] to-[#0284C7]',
  'Ilm & Zikr': 'from-[#B4833E] to-[#D97706]',
  'Ikram-ul-Muslim': 'from-[#0F766E] to-[#059669]',
  'Ikhlas-e-Niyyat': 'from-[#7C3AED] to-[#4338CA]',
  "Da'wat & Tabligh": 'from-[#C2410C] to-[#D97706]',
  "Tark-e-La-Ya'ni": 'from-[#BE123C] to-[#E11D48]',
};

export function MuntakhabView({ todayLog, onCompleteTaleem }: MuntakhabViewProps) {
  const [chapter, setChapter] = useState<string>('All Chapters');
  const [search, setSearch] = useState('');
  const [showUrdu, setShowUrdu] = useState(true);
  const [showEnglish, setShowEnglish] = useState(true);
  const [savedOnly, setSavedOnly] = useState(false);

  const [readIds, setReadIds] = useState<Record<string, boolean>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      return JSON.parse(window.localStorage.getItem('noor-hadees-read') || '{}');
    } catch {
      return {};
    }
  });

  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      return JSON.parse(window.localStorage.getItem('noor-hadees-saved') || '{}');
    } catch {
      return {};
    }
  });

  const toggleRead = (id: string) => {
    vibrateAndroid(12);
    setReadIds((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        window.localStorage.setItem('noor-hadees-read', JSON.stringify(next));
      } catch {
        // ignore storage quota
      }
      return next;
    });
  };

  const toggleBookmark = (id: string) => {
    vibrateAndroid(10);
    setBookmarkedIds((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        window.localStorage.setItem('noor-hadees-saved', JSON.stringify(next));
      } catch {
        // ignore storage quota
      }
      return next;
    });
  };

  const filtered = useMemo(() => {
    return MUNTAKHAB_AHADITH.filter((h) => {
      if (savedOnly && !bookmarkedIds[h.id]) return false;
      const matchChapter = chapter === 'All Chapters' || h.chapter === chapter;
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        h.english.toLowerCase().includes(q) ||
        h.narrator.toLowerCase().includes(q) ||
        h.source.toLowerCase().includes(q) ||
        h.chapter.toLowerCase().includes(q) ||
        h.urdu.includes(search);
      return matchChapter && matchSearch;
    });
  }, [chapter, search, savedOnly, bookmarkedIds]);

  const readCount = MUNTAKHAB_AHADITH.filter((h) => readIds[h.id]).length;
  const readPct = Math.round((readCount / MUNTAKHAB_AHADITH.length) * 100);

  return (
    <div className="space-y-4 pb-24">
      <section className="rounded-3xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] overflow-hidden shadow-sm">
        <div className="h-40 relative bg-[#0D5C46]">
          <img
            src="/src/assets/images/sacred_manuscript_still_1795498976244.jpg"
            alt="Open leather-bound book beside wooden prayer beads"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081C15]/95 via-[#0D5C46]/55 to-transparent p-4 flex flex-col justify-end text-white">
            <p className="text-[11px] font-medium text-amber-200 tabular-nums">
              {MUNTAKHAB_AHADITH.length} Authentic Ahaadees · 7 Chapters · {readCount} Read
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
              Muntakhab Ahaadees
            </h1>
            <div className="mt-2 h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${readPct}%` }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-amber-300 to-emerald-300"
              />
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                vibrateAndroid(18);
                void onCompleteTaleem(
                  chapter === 'All Chapters' ? 'Muntakhab Ahaadees' : chapter,
                );
              }}
              className={`flex-1 min-h-[44px] px-4 rounded-2xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                todayLog?.dailyTaleem
                  ? 'bg-[#0D5C46]/15 text-[#0D5C46] dark:text-[#34D399] border border-[#0D5C46]/30'
                  : 'bg-gradient-to-r from-[#0D5C46] to-[#0F766E] text-white shadow-sm'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>
                {todayLog?.dailyTaleem ? 'Taleem Completed' : 'Mark Daily Taleem Done'}
              </span>
            </motion.button>

            <div className="inline-flex p-1 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] gap-1">
              <button
                onClick={() => setShowUrdu((v) => !v)}
                className={`min-h-[38px] px-3 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                  showUrdu
                    ? 'bg-white dark:bg-[#192923] text-[#0D5C46] dark:text-[#34D399] shadow-sm'
                    : 'text-[#6B7570]'
                }`}
              >
                Urdu
              </button>
              <button
                onClick={() => setShowEnglish((v) => !v)}
                className={`min-h-[38px] px-3 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                  showEnglish
                    ? 'bg-white dark:bg-[#192923] text-[#1D4ED8] dark:text-sky-300 shadow-sm'
                    : 'text-[#6B7570]'
                }`}
              >
                Eng
              </button>
              <button
                onClick={() => setSavedOnly((v) => !v)}
                aria-label="Filter saved Ahaadees"
                className={`min-h-[38px] px-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors flex items-center ${
                  savedOnly
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-[#6B7570]'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-[#6B7570] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Ahaadees by topic, narrator, or source..."
              className="w-full min-h-[44px] pl-10 pr-3.5 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] text-sm focus:outline-none focus:ring-2 focus:ring-[#0D5C46]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {MUNTAKHAB_CHAPTERS.map((ch) => {
              const active = chapter === ch;
              const gradient = CHAPTER_ACCENT[ch] || 'from-[#0D5C46] to-[#0F766E]';
              return (
                <motion.button
                  key={ch}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    vibrateAndroid(8);
                    setChapter(ch);
                  }}
                  className={`min-h-[38px] px-3.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-all ${
                    active
                      ? `bg-gradient-to-r ${gradient} text-white shadow-sm`
                      : 'bg-[#F8F7F4] dark:bg-[#0D1714] text-[#4B5550] dark:text-[#A3B0AA]'
                  }`}
                >
                  {ch}
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((h, idx) => {
            const isRead = Boolean(readIds[h.id]);
            const isSaved = Boolean(bookmarkedIds[h.id]);
            const gradient = CHAPTER_ACCENT[h.chapter] || 'from-[#0D5C46] to-[#0F766E]';

            return (
              <motion.article
                key={h.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{
                  duration: 0.18,
                  delay: Math.min(idx * 0.025, 0.15),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="rounded-3xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] overflow-hidden"
              >
                <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between gap-2 text-[11px] text-[#6B7570] dark:text-[#8A9690]">
                    <span className="font-semibold text-[#0D5C46] dark:text-[#34D399] tabular-nums">
                      #{h.hadithNumber} · {h.chapter} ({h.chapterUrdu})
                    </span>
                    <span className="flex items-center gap-1 truncate">
                      <BookMarked className="w-3.5 h-3.5 shrink-0 text-[#B4833E]" />
                      <span className="truncate">{h.source}</span>
                    </span>
                  </div>

                  <p className="font-arabic text-xl leading-[2.1] text-right text-[#141A17] dark:text-[#F3F4F1]">
                    {h.arabic}
                  </p>

                  {showUrdu && (
                    <p className="font-urdu text-base text-right text-[#0D5C46] dark:text-[#6EE7B7] leading-[1.95]">
                      {h.urdu}
                    </p>
                  )}

                  {showEnglish && (
                    <p className="text-sm text-[#4B5550] dark:text-[#C4CECA] leading-relaxed">
                      {h.english}
                    </p>
                  )}

                  <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-[#EFECE6] dark:border-[#1E2E28]">
                    <p className="text-[11px] text-[#6B7570] dark:text-[#8A9690] truncate">
                      Narrated by {h.narrator}
                    </p>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <motion.button
                        whileTap={{ scale: 0.92 }}
                        onClick={() => toggleBookmark(h.id)}
                        aria-label="Bookmark Hadith"
                        className={`min-h-[36px] min-w-[36px] rounded-xl flex items-center justify-center cursor-pointer transition-colors ${
                          isSaved
                            ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                            : 'bg-[#F8F7F4] dark:bg-[#0D1714] text-[#6B7570]'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.94 }}
                        onClick={() => toggleRead(h.id)}
                        className={`min-h-[36px] px-3 rounded-xl text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                          isRead
                            ? 'bg-[#0D5C46] text-white'
                            : 'bg-[#F8F7F4] dark:bg-[#0D1714] text-[#4B5550] dark:text-[#A3B0AA]'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isRead ? 'Read' : 'Mark Read'}</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="rounded-3xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] p-8 text-center text-sm text-[#6B7570]">
            No Ahaadees matched your current filter.
          </div>
        )}
      </section>
    </div>
  );
}

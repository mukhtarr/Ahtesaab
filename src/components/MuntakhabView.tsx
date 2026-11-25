import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Bookmark,
  BookMarked,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Copy,
  Loader2,
  MessageCircle,
  Search,
  Send,
  Share2,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  fetchAllHadiths,
  fetchChapterHadiths,
  HADITH_CHAPTER_META,
  MUNTAKHAB_AHADITH,
  MUNTAKHAB_CHAPTERS,
  TOTAL_MUNTAKHAB_COUNT,
  type MuntakhabHadith,
} from '../data/muntakhabAhadith';
import type { DailyLog } from '../types/amaal';
import {
  buildTelegramShareUrl,
  buildWhatsAppShareUrl,
  copyTextToClipboard,
  formatHadithShareText,
  type ShareLanguageMode,
} from '../utils/hadithShare';
import { vibrateAndroid } from '../utils/haptics';
import { HadithShareSheet } from './HadithShareSheet';

interface MuntakhabViewProps {
  todayLog: DailyLog | null;
  onCompleteTaleem: (chapterName: string) => Promise<void>;
}

const CHAPTER_ACCENT: Record<string, string> = {
  'Kalimah Tayyibah': 'from-brand to-brand-to',
  Salaah: 'from-[#1D4ED8] to-[#0284C7]',
  'Ilm & Zikr': 'from-[#B4833E] to-[#D97706]',
  'Ikram-ul-Muslim': 'from-brand-to to-[#059669]',
  'Ikhlas-e-Niyyat': 'from-[#7C3AED] to-[#4338CA]',
  "Da'wat & Tabligh": 'from-[#C2410C] to-[#D97706]',
  "Tark-e-La-Ya'ni": 'from-[#BE123C] to-[#E11D48]',
};

const PAGE_SIZE_OPTIONS = [10, 50, 100] as const;
type PageSizeOption = (typeof PAGE_SIZE_OPTIONS)[number];

function buildPageWindow(current: number, total: number): Array<number | 'ellipsis'> {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: Array<number | 'ellipsis'> = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) pages.push('ellipsis');
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < total - 1) pages.push('ellipsis');
  pages.push(total);
  return pages;
}

function groupFallbackByChapter(): Record<string, MuntakhabHadith[]> {
  const map: Record<string, MuntakhabHadith[]> = {};
  for (const meta of HADITH_CHAPTER_META) {
    map[meta.chapter] = MUNTAKHAB_AHADITH.filter((h) => h.chapter === meta.chapter);
  }
  return map;
}

export function MuntakhabView({ todayLog, onCompleteTaleem }: MuntakhabViewProps) {
  const [chapter, setChapter] = useState<string>('All Chapters');
  const [search, setSearch] = useState('');
  const [showUrdu, setShowUrdu] = useState(true);
  const [showEnglish, setShowEnglish] = useState(true);
  const [savedOnly, setSavedOnly] = useState(false);
  const [pageSize, setPageSize] = useState<PageSizeOption>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [chapterMap, setChapterMap] = useState<Record<string, MuntakhabHadith[]>>(
    groupFallbackByChapter,
  );
  const [loading, setLoading] = useState(true);
  const [shareTarget, setShareTarget] = useState<MuntakhabHadith | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const listTopRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    let active = true;
    setLoading(true);

    if (chapter === 'All Chapters') {
      void fetchAllHadiths()
        .then((all) => {
          if (!active) return;
          const next: Record<string, MuntakhabHadith[]> = {};
          for (const meta of HADITH_CHAPTER_META) {
            next[meta.chapter] = [];
          }
          for (const h of all) {
            if (!next[h.chapter]) next[h.chapter] = [];
            next[h.chapter].push(h);
          }
          setChapterMap(next);
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    } else {
      void fetchChapterHadiths(chapter)
        .then((items) => {
          if (!active) return;
          setChapterMap((prev) => ({
            ...prev,
            [chapter]: items,
          }));
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    }

    return () => {
      active = false;
    };
  }, [chapter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [chapter, search, savedOnly, pageSize]);

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

  const shareLanguageMode: ShareLanguageMode =
    showUrdu && !showEnglish ? 'urdu' : !showUrdu && showEnglish ? 'english' : 'all';

  const handleQuickCopy = async (hadith: MuntakhabHadith) => {
    vibrateAndroid(12);
    const formatted = formatHadithShareText(hadith, shareLanguageMode);
    const ok = await copyTextToClipboard(formatted);
    if (ok) {
      setCopiedId(hadith.id);
      window.setTimeout(() => {
        setCopiedId((cur) => (cur === hadith.id ? null : cur));
      }, 2000);
    }
  };

  const activePool = useMemo(() => {
    if (chapter === 'All Chapters') {
      return HADITH_CHAPTER_META.flatMap((m) => chapterMap[m.chapter] ?? []);
    }
    return chapterMap[chapter] ?? [];
  }, [chapter, chapterMap]);

  const allLoadedHadiths = useMemo(
    () => HADITH_CHAPTER_META.flatMap((m) => chapterMap[m.chapter] ?? []),
    [chapterMap],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const rawSearch = search.trim();
    return activePool.filter((h) => {
      if (savedOnly && !bookmarkedIds[h.id]) return false;
      if (!q) return true;
      return (
        h.english.toLowerCase().includes(q) ||
        h.narrator.toLowerCase().includes(q) ||
        h.source.toLowerCase().includes(q) ||
        h.chapter.toLowerCase().includes(q) ||
        h.urdu.includes(rawSearch) ||
        h.arabic.includes(rawSearch)
      );
    });
  }, [activePool, search, savedOnly, bookmarkedIds]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;

  const displayed = useMemo(
    () => filtered.slice(startIndex, startIndex + pageSize),
    [filtered, startIndex, pageSize],
  );

  const rangeStart = filtered.length === 0 ? 0 : startIndex + 1;
  const rangeEnd = Math.min(filtered.length, startIndex + displayed.length);
  const pageWindow = useMemo(
    () => buildPageWindow(safePage, totalPages),
    [safePage, totalPages],
  );

  const goToPage = (page: number) => {
    const clamped = Math.max(1, Math.min(totalPages, page));
    if (clamped === safePage) return;
    vibrateAndroid(8);
    setCurrentPage(clamped);
    listTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const totalAvailable = Math.max(allLoadedHadiths.length, TOTAL_MUNTAKHAB_COUNT);
  const readCount = allLoadedHadiths.filter((h) => readIds[h.id]).length;
  const readPct = totalAvailable ? Math.round((readCount / totalAvailable) * 100) : 0;

  return (
    <div className="space-y-4 pb-24">
      <section className="rounded-3xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] overflow-hidden shadow-sm">
        <div className="h-40 relative bg-brand">
          <img
            src="/src/assets/images/sacred_manuscript_still_1795498976244.jpg"
            alt="Open leather-bound book beside wooden prayer beads"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081C15]/95 via-brand/55 to-transparent p-4 flex flex-col justify-end text-white">
            <p className="text-[11px] font-medium text-amber-200 tabular-nums">
              {totalAvailable.toLocaleString()} Authentic Ahaadees · 7 Chapters (500 each) ·{' '}
              {readCount} Read
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
                  ? 'bg-brand/15 text-brand dark:text-brand-dark border border-brand/30'
                  : 'bg-gradient-to-r from-brand to-brand-to text-white shadow-sm'
              }`}
            >
              <Check className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">
                {todayLog?.dailyTaleem ? 'Taleem Completed' : 'Mark Daily Taleem Done'}
              </span>
            </motion.button>

            <div className="inline-flex p-1 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] gap-1">
              <button
                onClick={() => setShowUrdu((v) => !v)}
                className={`min-h-[38px] px-3 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                  showUrdu
                    ? 'bg-white dark:bg-[#192923] text-brand dark:text-brand-dark shadow-sm'
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
              placeholder="Search Ahaadees by topic, narrator, Urdu, or source..."
              className="w-full min-h-[44px] pl-10 pr-3.5 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {MUNTAKHAB_CHAPTERS.map((ch) => {
              const active = chapter === ch;
              const gradient = CHAPTER_ACCENT[ch] || 'from-brand to-brand-to';
              const meta = HADITH_CHAPTER_META.find((m) => m.chapter === ch);
              const loadedCount = chapterMap[ch]?.length ?? 0;
              const countLabel =
                ch === 'All Chapters'
                  ? totalAvailable
                  : Math.max(loadedCount, meta?.expectedCount ?? 500);

              return (
                <motion.button
                  key={ch}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    vibrateAndroid(8);
                    setChapter(ch);
                  }}
                  className={`min-h-[40px] px-3.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-all tabular-nums ${
                    active
                      ? `bg-gradient-to-r ${gradient} text-white shadow-sm`
                      : 'bg-[#F8F7F4] dark:bg-[#0D1714] text-[#4B5550] dark:text-[#A3B0AA]'
                  }`}
                >
                  {ch} ({countLabel})
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      <div
        ref={listTopRef}
        className="scroll-mt-20 rounded-2xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] p-3 flex flex-wrap items-center justify-between gap-2.5"
      >
        <div className="min-w-0">
          <p className="text-xs font-semibold text-[#141A17] dark:text-[#F3F4F1] tabular-nums">
            Page {safePage} of {totalPages} · {rangeStart}–{rangeEnd} of{' '}
            {filtered.length.toLocaleString()}
          </p>
          {loading && (
            <span className="inline-flex items-center gap-1.5 text-[11px] text-brand dark:text-brand-dark font-medium mt-0.5">
              <Loader2 className="w-3 h-3 animate-spin" />
              Loading chapter...
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-medium text-[#6B7570] dark:text-[#8A9690] whitespace-nowrap">
            Per page
          </span>
          <div
            className="inline-flex p-1 rounded-xl bg-[#F8F7F4] dark:bg-[#0D1714] gap-1"
            role="group"
            aria-label="Ahaadees per page"
          >
            {PAGE_SIZE_OPTIONS.map((size) => {
              const active = pageSize === size;
              return (
                <button
                  key={size}
                  onClick={() => {
                    vibrateAndroid(8);
                    setPageSize(size);
                  }}
                  className={`min-h-[44px] min-w-[44px] px-2.5 rounded-lg text-xs font-semibold tabular-nums cursor-pointer transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-brand text-white shadow-sm'
                      : 'text-[#4B5550] dark:text-[#A3B0AA]'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <section className="space-y-4">
        {displayed.map((h) => {
          const isRead = Boolean(readIds[h.id]);
          const isSaved = Boolean(bookmarkedIds[h.id]);
          const isCopied = copiedId === h.id;
          const gradient = CHAPTER_ACCENT[h.chapter] || 'from-brand to-brand-to';
          const shareText = formatHadithShareText(h, shareLanguageMode);

          return (
            <article
              key={h.id}
              className="rounded-3xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] overflow-hidden"
            >
              <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between gap-2 text-[11px] text-[#6B7570] dark:text-[#8A9690]">
                  <span className="font-semibold text-brand dark:text-brand-dark tabular-nums">
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
                  <p className="font-urdu text-base text-right text-brand dark:text-brand-urdu leading-[1.95]">
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
                      className={`min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center cursor-pointer transition-colors ${
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
                      className={`min-h-[44px] px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap ${
                        isRead
                          ? 'bg-brand text-white'
                          : 'bg-[#F8F7F4] dark:bg-[#0D1714] text-[#4B5550] dark:text-[#A3B0AA]'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{isRead ? 'Read' : 'Mark Read'}</span>
                    </motion.button>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#EFECE6] dark:border-[#1E2E28] grid grid-cols-4 gap-1.5">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      vibrateAndroid(10);
                      setShareTarget(h);
                    }}
                    className="min-h-[44px] px-2 rounded-xl bg-brand/10 dark:bg-brand/25 text-brand dark:text-brand-dark text-[11px] font-semibold flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <Share2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Share</span>
                  </motion.button>

                  <a
                    href={buildWhatsAppShareUrl(shareText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => vibrateAndroid(10)}
                    className="min-h-[44px] px-2 rounded-xl bg-[#15803D]/10 dark:bg-[#15803D]/25 text-[#15803D] dark:text-[#4ADE80] text-[11px] font-semibold flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={buildTelegramShareUrl(shareText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => vibrateAndroid(10)}
                    className="min-h-[44px] px-2 rounded-xl bg-[#0284C7]/10 dark:bg-[#0284C7]/25 text-[#0369A1] dark:text-[#38BDF8] text-[11px] font-semibold flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    <Send className="w-3.5 h-3.5 shrink-0" />
                    <span>Telegram</span>
                  </a>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => void handleQuickCopy(h)}
                    className={`min-h-[44px] px-2 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap transition-colors ${
                      isCopied
                        ? 'bg-[#B4833E] text-white'
                        : 'bg-[#F8F7F4] dark:bg-[#0D1714] text-[#4B5550] dark:text-[#A3B0AA]'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 shrink-0" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 shrink-0" />
                        <span>Copy</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </article>
          );
        })}

        {filtered.length > 0 && (
          <nav
            aria-label="Hadith pages"
            className="rounded-3xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] p-3.5 space-y-3"
          >
            <div className="flex items-center justify-between gap-2">
              <motion.button
                whileTap={{ scale: 0.96 }}
                disabled={safePage <= 1}
                onClick={() => goToPage(safePage - 1)}
                className="min-h-[44px] px-3.5 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] text-xs font-semibold text-[#141A17] dark:text-[#F3F4F1] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <ChevronLeft className="w-4 h-4 shrink-0" />
                <span>Prev</span>
              </motion.button>

              <div className="flex items-center gap-1 overflow-x-auto">
                {pageWindow.map((entry, idx) =>
                  entry === 'ellipsis' ? (
                    <span
                      key={`ellipsis-${idx}`}
                      className="px-1.5 text-xs text-[#6B7570] dark:text-[#8A9690]"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={entry}
                      onClick={() => goToPage(entry)}
                      aria-current={entry === safePage ? 'page' : undefined}
                      className={`min-h-[44px] min-w-[40px] px-2 rounded-xl text-xs font-semibold tabular-nums cursor-pointer transition-colors whitespace-nowrap ${
                        entry === safePage
                          ? 'bg-gradient-to-r from-brand to-brand-to text-white shadow-sm'
                          : 'bg-[#F8F7F4] dark:bg-[#0D1714] text-[#4B5550] dark:text-[#A3B0AA]'
                      }`}
                    >
                      {entry}
                    </button>
                  ),
                )}
              </div>

              <motion.button
                whileTap={{ scale: 0.96 }}
                disabled={safePage >= totalPages}
                onClick={() => goToPage(safePage + 1)}
                className="min-h-[44px] px-3.5 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] text-xs font-semibold text-[#141A17] dark:text-[#F3F4F1] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4 shrink-0" />
              </motion.button>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#EFECE6] dark:border-[#1E2E28] text-xs">
                <span className="text-[#6B7570] dark:text-[#8A9690] tabular-nums">
                  {chapter} · {pageSize} per page
                </span>
                <label className="inline-flex items-center gap-2 text-[#4B5550] dark:text-[#C4CECA] font-medium">
                  <span className="whitespace-nowrap">Jump to</span>
                  <select
                    aria-label="Jump to page"
                    value={safePage}
                    onChange={(e) => goToPage(Number(e.target.value))}
                    className="min-h-[44px] px-2.5 rounded-xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] text-xs font-semibold tabular-nums text-[#141A17] dark:text-[#F3F4F1] focus:outline-none focus:ring-2 focus:ring-brand"
                  >
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <option key={p} value={p}>
                        Page {p} of {totalPages}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            )}
          </nav>
        )}

        {filtered.length === 0 && !loading && (
          <div className="rounded-3xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] p-8 text-center text-sm text-[#6B7570]">
            No Ahaadees matched your current filter.
          </div>
        )}
      </section>

      <HadithShareSheet
        hadith={shareTarget}
        defaultMode={shareLanguageMode}
        onClose={() => setShareTarget(null)}
      />
    </div>
  );
}

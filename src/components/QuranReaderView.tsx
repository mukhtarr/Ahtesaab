import { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Grid2X2,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ALL_QURAN_SURAHS,
  fetchFullSurahAyahs,
  OFFLINE_SURAH_AYAHS,
  type QuranAyah,
} from '../data/quranData';
import type { DailyLog } from '../types/amaal';
import { vibrateAndroid } from '../utils/haptics';

interface QuranReaderViewProps {
  todayLog: DailyLog | null;
  onLogQuranPage: (surahName: string) => Promise<void>;
}

type TranslationMode = 'both' | 'urdu' | 'english' | 'arabic';
type RevelationFilter = 'all' | 'Meccan' | 'Medinan';

export function QuranReaderView({ todayLog, onLogQuranPage }: QuranReaderViewProps) {
  const [selectedSurahId, setSelectedSurahId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [revelationFilter, setRevelationFilter] = useState<RevelationFilter>('all');
  const [translationMode, setTranslationMode] = useState<TranslationMode>('both');
  const [justLogged, setJustLogged] = useState(false);
  const [browseAllOpen, setBrowseAllOpen] = useState(false);

  const [ayahs, setAyahs] = useState<QuranAyah[]>(OFFLINE_SURAH_AYAHS[1] || []);
  const [loadingSurah, setLoadingSurah] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reloadNonce, setReloadNonce] = useState(0);

  const filteredSurahs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ALL_QURAN_SURAHS.filter((s) => {
      const matchesRev =
        revelationFilter === 'all' || s.revelation === revelationFilter;
      if (!matchesRev) return false;
      if (!q) return true;
      return (
        String(s.id) === q ||
        s.nameEnglish.toLowerCase().includes(q) ||
        s.meaning.toLowerCase().includes(q) ||
        s.nameArabic.includes(searchQuery.trim())
      );
    });
  }, [searchQuery, revelationFilter]);

  const activeSurah = useMemo(
    () =>
      ALL_QURAN_SURAHS.find((s) => s.id === selectedSurahId) || ALL_QURAN_SURAHS[0],
    [selectedSurahId],
  );

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoadingSurah(true);
      setLoadError(null);
      if (OFFLINE_SURAH_AYAHS[selectedSurahId]) {
        setAyahs(OFFLINE_SURAH_AYAHS[selectedSurahId]);
      }
      try {
        const loaded = await fetchFullSurahAyahs(selectedSurahId);
        if (!cancelled) {
          setAyahs(loaded);
        }
      } catch (err) {
        if (!cancelled) {
          setLoadError(
            err instanceof Error
              ? err.message
              : 'Unable to load Surah translation right now.',
          );
          setAyahs(OFFLINE_SURAH_AYAHS[selectedSurahId] || []);
        }
      } finally {
        if (!cancelled) {
          setLoadingSurah(false);
        }
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [selectedSurahId, reloadNonce]);

  const handleSelectSurah = (id: number) => {
    vibrateAndroid(10);
    setSelectedSurahId(id);
    setBrowseAllOpen(false);
  };

  const handleLogPage = async () => {
    vibrateAndroid(18);
    await onLogQuranPage(activeSurah.nameEnglish);
    setJustLogged(true);
    window.setTimeout(() => setJustLogged(false), 1800);
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Illuminated Colorful Header & 114-Surah Selector */}
      <section className="rounded-3xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] overflow-hidden shadow-sm">
        <div className="bg-gradient-to-br from-brand via-brand-to to-[#B4833E] text-white p-4 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-medium text-amber-100/95">
                All 114 Surahs · Arabic, Urdu &amp; English
              </p>
              <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight">
                Holy Quran
              </h1>
            </div>
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                vibrateAndroid(10);
                setBrowseAllOpen(true);
              }}
              className="min-h-[42px] px-3.5 rounded-2xl bg-white/18 hover:bg-white/25 backdrop-blur-sm text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap cursor-pointer shrink-0"
            >
              <Grid2X2 className="w-4 h-4" />
              <span>All 114 Surahs</span>
            </motion.button>
          </div>

          {/* Filter by Revelation */}
          <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl bg-black/20">
            {(
              [
                { id: 'all', label: 'All (114)' },
                { id: 'Meccan', label: 'Meccan (86)' },
                { id: 'Medinan', label: 'Medinan (28)' },
              ] as const
            ).map((tab) => {
              const active = revelationFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    vibrateAndroid(8);
                    setRevelationFilter(tab.id);
                  }}
                  className={`relative min-h-[36px] rounded-xl text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    active ? 'text-brand' : 'text-white/85'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="quran-revelation-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-xl bg-white shadow-sm"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[#6B7570] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by number (e.g. 36), name, or meaning..."
              className="w-full min-h-[44px] pl-10 pr-3.5 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          {/* Horizontal Touch Surah Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {filteredSurahs.map((surah) => {
              const active = surah.id === activeSurah.id;
              return (
                <motion.button
                  key={surah.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelectSurah(surah.id)}
                  className={`min-h-[46px] px-3.5 py-2 rounded-2xl text-left flex items-center gap-2 shrink-0 transition-colors cursor-pointer ${
                    active
                      ? 'bg-gradient-to-r from-brand to-brand-to text-white shadow-sm'
                      : 'bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] hover:border-brand/40'
                  }`}
                >
                  <span className="text-xs font-semibold tabular-nums whitespace-nowrap">
                    {surah.id}. {surah.nameEnglish}
                  </span>
                  <span className="font-[family-name:var(--font-arabic)] text-sm opacity-90">
                    {surah.nameArabic}
                  </span>
                </motion.button>
              );
            })}
            {filteredSurahs.length === 0 && (
              <p className="text-xs text-[#6B7570] py-2">
                No Surahs matched &ldquo;{searchQuery}&rdquo;.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Active Surah Reader */}
      <AnimatePresence mode="wait">
        <motion.section
          key={activeSurah.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] p-4 space-y-4"
        >
          <div className="space-y-3 pb-4 border-b border-[#EFECE6] dark:border-[#1E2E28]">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-brand-to dark:text-brand-urdu tabular-nums">
                  Surah {activeSurah.id} of 114 · {activeSurah.revelation} ·{' '}
                  {activeSurah.totalAyahs} Ayahs · Juz {activeSurah.juz}
                </p>
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
                  {activeSurah.nameEnglish}
                </h2>
                <p className="text-xs text-[#6B7570] dark:text-[#8A9690]">
                  {activeSurah.meaning}
                </p>
              </div>
              <span className="font-[family-name:var(--font-arabic)] text-2xl text-brand dark:text-brand-dark shrink-0">
                سورة {activeSurah.nameArabic}
              </span>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => void handleLogPage()}
              className="w-full min-h-[46px] px-4 rounded-2xl bg-gradient-to-r from-brand via-brand-to to-brand-to text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md shadow-brand/20 cursor-pointer"
            >
              {justLogged ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span>
                {justLogged
                  ? `Logged +1 Page (${activeSurah.nameEnglish})`
                  : `Log +1 Page (${todayLog?.quranPages ?? 0} pages today)`}
              </span>
            </motion.button>

            <div className="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714]">
              {(
                [
                  { id: 'both', label: 'Both' },
                  { id: 'urdu', label: 'Urdu' },
                  { id: 'english', label: 'English' },
                  { id: 'arabic', label: 'Arabic' },
                ] as const
              ).map((mode) => {
                const active = translationMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => {
                      vibrateAndroid(8);
                      setTranslationMode(mode.id);
                    }}
                    className={`relative min-h-[38px] rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                      active
                        ? 'text-[#141A17] dark:text-white'
                        : 'text-[#6B7570] dark:text-[#9AA8A1]'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="quran-lang-pill"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className="absolute inset-0 rounded-xl bg-white dark:bg-[#192923] shadow-sm"
                      />
                    )}
                    <span className="relative z-10">{mode.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {activeSurah.id !== 1 && activeSurah.id !== 9 && (
            <div className="py-3 px-4 rounded-2xl bg-gradient-to-r from-brand/8 via-[#B4833E]/10 to-brand-to/8 border border-[#E5E2DC] dark:border-[#1E2E28] text-center">
              <p className="font-arabic text-2xl text-brand dark:text-brand-urdu">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            </div>
          )}

          {loadingSurah && ayahs.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center gap-2.5 text-xs text-[#6B7570]">
              <Loader2 className="w-6 h-6 animate-spin text-brand dark:text-brand-dark" />
              <span>Loading Surah {activeSurah.nameEnglish} ({activeSurah.totalAyahs} Ayahs)...</span>
            </div>
          ) : loadError && ayahs.length === 0 ? (
            <div className="py-8 px-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-center space-y-3">
              <p className="text-xs text-amber-900 dark:text-amber-200">{loadError}</p>
              <button
                onClick={() => setReloadNonce((n) => n + 1)}
                className="min-h-[40px] px-4 rounded-xl bg-brand text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Loading Surah</span>
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#EFECE6] dark:divide-[#1E2E28]">
              {loadingSurah && (
                <div className="pb-3 flex items-center gap-2 text-[11px] text-brand-to dark:text-brand-urdu">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Syncing full Surah translation...</span>
                </div>
              )}
              {ayahs.map((ayah) => (
                <article key={ayah.number} className="py-5 first:pt-1 last:pb-1 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <span className="w-8 h-8 rounded-full bg-gradient-to-br from-brand/12 to-[#B4833E]/15 border border-brand/25 dark:border-brand-dark/30 text-[11px] font-bold text-brand dark:text-brand-dark tabular-nums flex items-center justify-center shrink-0 mt-1">
                      {ayah.number}
                    </span>
                    <p className="font-arabic text-2xl text-right text-[#141A17] dark:text-[#F3F4F1] leading-[2.15] flex-1">
                      {ayah.arabic}
                    </p>
                  </div>

                  {(translationMode === 'both' || translationMode === 'urdu') && ayah.urdu && (
                    <p className="font-urdu text-base text-right text-brand dark:text-brand-urdu leading-[1.95]">
                      {ayah.urdu}
                    </p>
                  )}

                  {(translationMode === 'both' || translationMode === 'english') && ayah.english && (
                    <p className="text-sm text-[#4B5550] dark:text-[#C4CECA] leading-relaxed">
                      {ayah.english}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}

          {/* Previous / Next Surah Stepper */}
          <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-[#EFECE6] dark:border-[#1E2E28]">
            <motion.button
              whileTap={{ scale: 0.96 }}
              disabled={activeSurah.id <= 1}
              onClick={() => handleSelectSurah(Math.max(1, activeSurah.id - 1))}
              className="min-h-[44px] px-3 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Surah</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              disabled={activeSurah.id >= 114}
              onClick={() => handleSelectSurah(Math.min(114, activeSurah.id + 1))}
              className="min-h-[44px] px-3 rounded-2xl bg-brand text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40"
            >
              <span>Next Surah</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* Complete 114 Surahs Directory Modal Sheet */}
      <AnimatePresence>
        {browseAllOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[460px] max-h-[86vh] flex flex-col bg-white dark:bg-[#121E1A] rounded-t-3xl border-t border-[#E5E2DC] dark:border-[#1E2E28] overflow-hidden shadow-2xl"
            >
              <div className="p-4 bg-gradient-to-r from-brand to-brand-to text-white flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-5 h-5 text-amber-200" />
                  <div>
                    <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold">
                      Complete Index · 114 Surahs
                    </h2>
                    <p className="text-[11px] text-emerald-100">
                      Tap any Surah to read Arabic, Urdu &amp; English
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setBrowseAllOpen(false)}
                  aria-label="Close Surah directory"
                  className="min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-3 border-b border-[#EFECE6] dark:border-[#1E2E28]">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter 114 Surahs..."
                  className="w-full min-h-[42px] px-3.5 rounded-xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] text-sm"
                />
              </div>

              <div className="p-3 overflow-y-auto space-y-2 flex-1">
                {filteredSurahs.map((surah) => {
                  const active = surah.id === activeSurah.id;
                  return (
                    <button
                      key={surah.id}
                      onClick={() => handleSelectSurah(surah.id)}
                      className={`w-full min-h-[58px] px-3.5 py-2.5 rounded-2xl border text-left flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                        active
                          ? 'bg-brand/12 dark:bg-brand-dark/15 border-brand dark:border-brand-dark'
                          : 'bg-[#F8F7F4] dark:bg-[#0D1714] border-[#E5E2DC] dark:border-[#1E2E28]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`w-8 h-8 rounded-xl text-xs font-bold tabular-nums flex items-center justify-center shrink-0 ${
                            active
                              ? 'bg-brand text-white'
                              : 'bg-white dark:bg-[#162620] text-brand dark:text-brand-dark border border-[#E5E2DC] dark:border-[#1E2E28]'
                          }`}
                        >
                          {surah.id}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold truncate">
                            {surah.nameEnglish}
                          </p>
                          <p className="text-[11px] text-[#6B7570] dark:text-[#8A9690] truncate tabular-nums">
                            {surah.meaning} · {surah.revelation} · {surah.totalAyahs} Ayahs
                          </p>
                        </div>
                      </div>
                      <span className="font-[family-name:var(--font-arabic)] text-lg text-brand dark:text-brand-dark shrink-0">
                        {surah.nameArabic}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

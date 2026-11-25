import { useState } from 'react';
import {
  BellRing,
  BookOpen,
  Check,
  CheckCircle2,
  Clock,
  HeartHandshake,
  Minus,
  Moon,
  Plus,
  Sparkles,
  Sunrise,
  Sunset,
  Trash2,
  Users,
  Volume2,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type {
  DailyLog,
  FarzKey,
  FarzStatus,
  NafilKey,
  UserProfile,
} from '../types/amaal';
import { vibrateAndroid } from '../utils/haptics';
import { DailyProgressRing } from './DailyProgressRing';

interface DailyRoutineViewProps {
  log: DailyLog;
  profile: UserProfile;
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onChangeLog: (updated: DailyLog) => void;
  onSaveLog: (logToSave: DailyLog) => Promise<void>;
  onOpenSummary: () => void;
  onTestAzaan: (prayerLabel: string) => void;
  onNavigateTab: (tab: 'today' | 'quran' | 'hadees' | 'azkaar' | 'history') => void;
  saving: boolean;
}

const FARZ_ITEMS: Array<{ key: FarzKey; label: string; arabic: string }> = [
  { key: 'fajr', label: 'Fajr', arabic: 'الفجر' },
  { key: 'zuhr', label: 'Zuhr', arabic: 'الظهر' },
  { key: 'asr', label: 'Asr', arabic: 'العصر' },
  { key: 'maghrib', label: 'Maghrib', arabic: 'المغرب' },
  { key: 'isha', label: 'Isha', arabic: 'العشاء' },
];

const NAFIL_ITEMS: Array<{ key: NafilKey; label: string; timeNote: string }> = [
  { key: 'tahajjud', label: 'Tahajjud', timeNote: 'Pre-dawn' },
  { key: 'ishraq', label: 'Ishraq', timeNote: 'After sunrise' },
  { key: 'chasht', label: 'Chasht', timeNote: 'Mid-morning' },
  { key: 'awwabin', label: 'Awwabin', timeNote: 'After Maghrib' },
];

const FARZ_STATUS_OPTIONS: Array<{ value: FarzStatus; label: string }> = [
  { value: 'jamaat', label: 'Jamaat' },
  { value: 'ontime', label: 'On Time' },
  { value: 'qaza', label: 'Qaza' },
  { value: 'missed', label: 'Missed' },
];

function getRecentDates(days = 7): Array<{ date: string; dayShort: string; dayNum: string }> {
  const result: Array<{ date: string; dayShort: string; dayNum: string }> = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
      d.getDate(),
    ).padStart(2, '0')}`;
    result.push({
      date: iso,
      dayShort: d.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 1),
      dayNum: String(d.getDate()),
    });
  }
  return result;
}

function getTimeOfDayBanner(): { label: string; gradient: string } {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 8) {
    return {
      label: 'Fajr Dawn · Blessed Start',
      gradient: 'from-brand via-brand-to to-[#D97706]',
    };
  }
  if (hour >= 8 && hour < 15) {
    return {
      label: 'Daylight · Stay Consistent',
      gradient: 'from-brand via-[#0284C7] to-brand-to',
    };
  }
  if (hour >= 15 && hour < 18) {
    return {
      label: 'Asr Time · Evening Azkaar Near',
      gradient: 'from-[#B4833E] via-[#D97706] to-brand',
    };
  }
  if (hour >= 18 && hour < 20) {
    return {
      label: 'Maghrib Sunset · Reflect & Thank Allah',
      gradient: 'from-[#9A3412] via-[#BE123C] to-[#4338CA]',
    };
  }
  return {
    label: 'Isha & Night · Honest Muhasabah',
    gradient: 'from-[#1E293B] via-[#312E81] to-brand',
  };
}

export function DailyRoutineView({
  log,
  profile,
  selectedDate,
  onSelectDate,
  onChangeLog,
  onSaveLog,
  onOpenSummary,
  onTestAzaan,
  onNavigateTab,
  saving,
}: DailyRoutineViewProps) {
  const [newNekTitle, setNewNekTitle] = useState('');
  const recentDates = getRecentDates(7);
  const schedule = profile.prayerTimesJson;

  const farzOfferedCount = FARZ_ITEMS.filter(
    (f) => log[f.key] === 'jamaat' || log[f.key] === 'ontime' || log[f.key] === 'qaza',
  ).length;
  const nafilCount = NAFIL_ITEMS.filter((n) => log[n.key]).length;
  const nekDoneCount = (log.nekAmaalJson || []).filter((n) => n.completed).length;
  const timeBanner = getTimeOfDayBanner();

  const updateField = <K extends keyof DailyLog>(field: K, value: DailyLog[K]) => {
    vibrateAndroid(14);
    const next = { ...log, [field]: value };
    onChangeLog(next);
    void onSaveLog(next);
  };

  const handleAddNekAmaal = () => {
    const trimmed = newNekTitle.trim();
    if (!trimmed) return;
    const nextList = [
      ...(log.nekAmaalJson || []),
      {
        id: `custom-${Date.now()}`,
        title: trimmed,
        completed: false,
      },
    ];
    setNewNekTitle('');
    updateField('nekAmaalJson', nextList);
  };

  const handleToggleNek = (id: string) => {
    const nextList = (log.nekAmaalJson || []).map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item,
    );
    updateField('nekAmaalJson', nextList);
  };

  const handleIncrementNekCount = (id: string, delta: number) => {
    const nextList = (log.nekAmaalJson || []).map((item) => {
      if (item.id !== id) return item;
      const nextCount = Math.max(0, (item.count ?? 0) + delta);
      return {
        ...item,
        count: nextCount,
        completed: nextCount >= 100 ? true : item.completed,
      };
    });
    updateField('nekAmaalJson', nextList);
  };

  const handleDeleteNek = (id: string) => {
    const nextList = (log.nekAmaalJson || []).filter((item) => item.id !== id);
    updateField('nekAmaalJson', nextList);
  };

  const handleHonestSubmit = async () => {
    vibrateAndroid(28);
    const submittedLog: DailyLog = {
      ...log,
      honestSubmitted: true,
    };
    onChangeLog(submittedLog);
    await onSaveLog(submittedLog);
    onOpenSummary();
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Dynamic Time-of-Day Greeting & Date Scroller Card */}
      <section className="rounded-3xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] overflow-hidden shadow-sm">
        <div className={`bg-gradient-to-r ${timeBanner.gradient} text-white p-4 flex items-center justify-between gap-3`}>
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-amber-100/95 tabular-nums truncate">
              {profile.city} · {selectedDate} · {timeBanner.label}
              {saving ? ' · Saving...' : ''}
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight truncate mt-0.5">
              Assalamu Alaikum, {profile.displayName || 'Believer'}
            </h1>
          </div>

          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => {
              vibrateAndroid(18);
              onTestAzaan('Fajr');
            }}
            className="min-h-[44px] px-3.5 py-2 rounded-2xl bg-white/18 hover:bg-white/25 backdrop-blur-sm text-white text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>Azaan</span>
          </motion.button>
        </div>

        <div className="p-3.5 grid grid-cols-7 gap-1.5">
          {recentDates.map((d) => {
            const active = d.date === selectedDate;
            return (
              <motion.button
                key={d.date}
                whileTap={{ scale: 0.93 }}
                onClick={() => {
                  vibrateAndroid(10);
                  onSelectDate(d.date);
                }}
                className={`min-h-[54px] rounded-2xl flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer tabular-nums ${
                  active
                    ? 'bg-gradient-to-b from-brand to-brand-to text-white shadow-sm'
                    : 'bg-[#F8F7F4] dark:bg-[#0D1714] text-[#4B5550] dark:text-[#9AA8A1]'
                }`}
              >
                <span className="text-[10px] font-medium opacity-80">{d.dayShort}</span>
                <span className="text-sm font-bold">{d.dayNum}</span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Visual Daily Progress Ring Snapshot */}
      <DailyProgressRing
        log={log}
        quranGoalPages={profile.dailyQuranGoalPages}
        onOpenSummary={onOpenSummary}
      />

      {/* 1. Farz Namaz */}
      <section className="rounded-3xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold">
              01. All Farz Namaz
            </h2>
            <p className="text-[11px] text-[#6B7570] dark:text-[#8A9690]">
              Tap bell to hear loud Azaan
            </p>
          </div>
          <span className="text-xs font-semibold text-brand dark:text-brand-dark tabular-nums">
            {farzOfferedCount} / 5
          </span>
        </div>

        <div className="divide-y divide-[#EFECE6] dark:divide-[#1E2E28]">
          {FARZ_ITEMS.map((prayer) => {
            const currentStatus = log[prayer.key];
            const prayerTime = schedule[prayer.key];
            return (
              <div key={prayer.key} className="py-3 first:pt-1 last:pb-1 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => {
                        vibrateAndroid(18);
                        onTestAzaan(prayer.label);
                      }}
                      aria-label={`Play Azaan for ${prayer.label}`}
                      className="min-h-[44px] min-w-[44px] rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] text-brand dark:text-brand-dark flex items-center justify-center cursor-pointer active:scale-95"
                    >
                      <BellRing className="w-4 h-4" />
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{prayer.label}</span>
                        <span className="font-[family-name:var(--font-arabic)] text-base text-[#6B7570] dark:text-[#8A9690]">
                          {prayer.arabic}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6B7570] dark:text-[#8A9690] tabular-nums flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{prayerTime}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-1.5 p-1 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714]">
                  {FARZ_STATUS_OPTIONS.map((opt) => {
                    const selected = currentStatus === opt.value;
                    const activeStyle =
                      opt.value === 'missed'
                        ? 'bg-red-600 text-white shadow-sm'
                        : opt.value === 'qaza'
                          ? 'bg-[#B4833E] text-white shadow-sm'
                          : 'bg-brand text-white shadow-sm';
                    return (
                      <button
                        key={opt.value}
                        onClick={() =>
                          updateField(prayer.key, selected ? 'pending' : opt.value)
                        }
                        className={`min-h-[42px] px-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer active:scale-95 ${
                          selected
                            ? activeStyle
                            : 'text-[#4B5550] dark:text-[#9AA8A1]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Nafil Namaz */}
      <section className="rounded-3xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold">
            02. All Nafil Namaz
          </h2>
          <span className="text-xs font-semibold text-[#B4833E] tabular-nums">
            {nafilCount} / 4
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {NAFIL_ITEMS.map((nafil) => {
            const checked = log[nafil.key];
            const time = schedule[nafil.key];
            return (
              <button
                key={nafil.key}
                onClick={() => updateField(nafil.key, !checked)}
                className={`min-h-[68px] p-3.5 rounded-2xl border text-left flex items-center justify-between gap-2 transition-all cursor-pointer active:scale-[0.97] ${
                  checked
                    ? 'bg-brand/10 dark:bg-brand-dark/15 border-brand dark:border-brand-dark'
                    : 'bg-[#F8F7F4] dark:bg-[#0D1714] border-[#E5E2DC] dark:border-[#1E2E28]'
                }`}
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{nafil.label}</p>
                  <p className="text-[11px] text-[#6B7570] dark:text-[#8A9690] tabular-nums truncate">
                    {time} · {nafil.timeNote}
                  </p>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    checked
                      ? 'bg-brand text-white'
                      : 'border border-[#C9C4BA] dark:border-[#2C3E37]'
                  }`}
                >
                  {checked && <Check className="w-3.5 h-3.5" />}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Morning & Evening Azkaar */}
      <section className="rounded-3xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold">
            03. Morning &amp; Evening Azkaar
          </h2>
          <button
            onClick={() => onNavigateTab('azkaar')}
            className="min-h-[38px] px-3 rounded-xl text-xs font-semibold text-brand dark:text-brand-dark bg-brand/10 cursor-pointer"
          >
            Read Azkaar
          </button>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          <button
            onClick={() => updateField('morningAzkaar', !log.morningAzkaar)}
            className={`min-h-[60px] p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer active:scale-[0.98] ${
              log.morningAzkaar
                ? 'bg-brand/10 dark:bg-brand-dark/15 border-brand dark:border-brand-dark'
                : 'bg-[#F8F7F4] dark:bg-[#0D1714] border-[#E5E2DC] dark:border-[#1E2E28]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Sunrise className="w-5 h-5 text-[#B4833E] shrink-0" />
              <div>
                <p className="text-sm font-semibold">Morning Azkaar</p>
                <p className="text-[11px] text-[#6B7570] dark:text-[#8A9690]">After Fajr Salah</p>
              </div>
            </div>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                log.morningAzkaar
                  ? 'bg-brand text-white'
                  : 'border border-[#C9C4BA] dark:border-[#2C3E37]'
              }`}
            >
              {log.morningAzkaar && <Check className="w-3.5 h-3.5" />}
            </div>
          </button>

          <button
            onClick={() => updateField('eveningAzkaar', !log.eveningAzkaar)}
            className={`min-h-[60px] p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer active:scale-[0.98] ${
              log.eveningAzkaar
                ? 'bg-brand/10 dark:bg-brand-dark/15 border-brand dark:border-brand-dark'
                : 'bg-[#F8F7F4] dark:bg-[#0D1714] border-[#E5E2DC] dark:border-[#1E2E28]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Sunset className="w-5 h-5 text-[#B4833E] shrink-0" />
              <div>
                <p className="text-sm font-semibold">Evening Azkaar</p>
                <p className="text-[11px] text-[#6B7570] dark:text-[#8A9690]">After Asr Salah</p>
              </div>
            </div>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                log.eveningAzkaar
                  ? 'bg-brand text-white'
                  : 'border border-[#C9C4BA] dark:border-[#2C3E37]'
              }`}
            >
              {log.eveningAzkaar && <Check className="w-3.5 h-3.5" />}
            </div>
          </button>
        </div>
      </section>

      {/* Roza (Fasting) Optional Sunnah / Qaza Toggle */}
      <section className="rounded-3xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] p-4 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#D97706]/20 to-[#B4833E]/20 text-[#B4833E] dark:text-amber-400 flex items-center justify-center shrink-0">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold">
                  Roza (Fasting)
                </h2>
                <span className="font-[family-name:var(--font-arabic)] text-base text-[#6B7570] dark:text-[#8A9690]">
                  صوم
                </span>
              </div>
              <p className="text-[11px] text-[#6B7570] dark:text-[#8A9690]">
                Optional Sunnah or Qaza fast
              </p>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.94 }}
            type="button"
            role="switch"
            aria-checked={log.roza}
            aria-label="Toggle Roza fasting"
            onClick={() => updateField('roza', !log.roza)}
            className={`min-h-[44px] px-4 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
              log.roza
                ? 'bg-gradient-to-r from-brand to-brand-to text-white shadow-sm'
                : 'bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] text-[#4B5550] dark:text-[#9AA8A1]'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full flex items-center justify-center ${
                log.roza ? 'bg-white text-brand' : 'border border-current'
              }`}
            >
              {log.roza && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span>{log.roza ? 'Fasting' : 'Not Fasting'}</span>
          </motion.button>
        </div>

        <AnimatePresence initial={false}>
          {log.roza && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714]">
                {(
                  [
                    { value: 'sunnah', label: 'Sunnah Fast' },
                    { value: 'qaza', label: 'Qaza Fast' },
                  ] as const
                ).map((opt) => {
                  const active = (log.rozaType || 'sunnah') === opt.value;
                  return (
                    <motion.button
                      key={opt.value}
                      whileTap={{ scale: 0.96 }}
                      type="button"
                      onClick={() => updateField('rozaType', opt.value)}
                      className={`min-h-[40px] rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                        active
                          ? 'bg-gradient-to-r from-[#B4833E] to-[#D97706] text-white shadow-sm'
                          : 'text-[#4B5550] dark:text-[#9AA8A1]'
                      }`}
                    >
                      {opt.label}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 4. Daily Quran Recitation */}
      <section className="rounded-3xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold">
              04. Daily Quran Recitation
            </h2>
            <p className="text-[11px] text-[#6B7570] dark:text-[#8A9690] tabular-nums">
              Daily goal: {profile.dailyQuranGoalPages} pages
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('quran')}
            className="min-h-[38px] px-3 rounded-xl text-xs font-semibold text-brand dark:text-brand-dark bg-brand/10 cursor-pointer"
          >
            Open Quran
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Pages', key: 'quranPages' as const, value: log.quranPages },
            { label: 'Ruku', key: 'quranRuku' as const, value: log.quranRuku },
            { label: 'Minutes', key: 'quranMinutes' as const, value: log.quranMinutes },
          ].map((metric) => (
            <div
              key={metric.key}
              className="p-2.5 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] flex flex-col items-center gap-1.5"
            >
              <span className="text-[11px] text-[#6B7570] dark:text-[#8A9690]">{metric.label}</span>
              <span className="text-lg font-bold tabular-nums">{metric.value}</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => updateField(metric.key, Math.max(0, metric.value - 1))}
                  aria-label={`Decrease ${metric.label}`}
                  className="w-9 h-9 rounded-xl bg-white dark:bg-[#162620] border border-[#E5E2DC] dark:border-[#243830] flex items-center justify-center cursor-pointer active:scale-95"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => updateField(metric.key, metric.value + 1)}
                  aria-label={`Increase ${metric.label}`}
                  className="w-9 h-9 rounded-xl bg-brand text-white flex items-center justify-center cursor-pointer active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <input
          type="text"
          value={log.quranLastSurah}
          onChange={(e) => onChangeLog({ ...log, quranLastSurah: e.target.value })}
          onBlur={() => void onSaveLog(log)}
          placeholder="Last Surah / Ayah recited..."
          className="w-full min-h-[44px] px-3.5 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </section>

      {/* 5 & 6. Taleem & Quran Halqa */}
      <section className="rounded-3xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] p-4 space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold">
          05. Daily Taleem &amp; Quran Halqa
        </h2>

        <div className="p-3.5 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-5 h-5 text-brand dark:text-brand-dark" />
              <div>
                <p className="text-sm font-semibold">Daily Taleem (Hadees)</p>
                <p className="text-[11px] text-[#6B7570] dark:text-[#8A9690]">
                  Muntakhab Ahaadees reading
                </p>
              </div>
            </div>
            <button
              onClick={() => updateField('dailyTaleem', !log.dailyTaleem)}
              className={`min-h-[40px] px-3.5 rounded-xl text-xs font-semibold cursor-pointer ${
                log.dailyTaleem
                  ? 'bg-brand text-white'
                  : 'bg-white dark:bg-[#162620] border border-[#E5E2DC] dark:border-[#243830]'
              }`}
            >
              {log.dailyTaleem ? 'Done' : 'Mark'}
            </button>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={log.taleemTopic}
              onChange={(e) => onChangeLog({ ...log, taleemTopic: e.target.value })}
              onBlur={() => void onSaveLog(log)}
              placeholder="Chapter read..."
              className="flex-1 min-h-[42px] px-3 rounded-xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] text-xs"
            />
            <button
              onClick={() => onNavigateTab('hadees')}
              className="min-h-[42px] px-3 rounded-xl text-xs font-semibold text-brand dark:text-brand-dark bg-brand/10 cursor-pointer whitespace-nowrap"
            >
              Open Book
            </button>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <Users className="w-5 h-5 text-[#B4833E]" />
              <div>
                <p className="text-sm font-semibold">Daily Quran Halqa</p>
                <p className="text-[11px] text-[#6B7570] dark:text-[#8A9690]">
                  Tajweed &amp; learning circle
                </p>
              </div>
            </div>
            <button
              onClick={() => updateField('quranHalqa', !log.quranHalqa)}
              className={`min-h-[40px] px-3.5 rounded-xl text-xs font-semibold cursor-pointer ${
                log.quranHalqa
                  ? 'bg-brand text-white'
                  : 'bg-white dark:bg-[#162620] border border-[#E5E2DC] dark:border-[#243830]'
              }`}
            >
              {log.quranHalqa ? 'Attended' : 'Mark'}
            </button>
          </div>
          <input
            type="text"
            value={log.halqaNotes}
            onChange={(e) => onChangeLog({ ...log, halqaNotes: e.target.value })}
            onBlur={() => void onSaveLog(log)}
            placeholder="Halqa notes..."
            className="w-full min-h-[42px] px-3 rounded-xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] text-xs"
          />
        </div>
      </section>

      {/* 7. Other Nek Amaal */}
      <section className="rounded-3xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-brand dark:text-brand-dark" />
            <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold">
              06. Other Nek Amaal
            </h2>
          </div>
          <span className="text-xs font-semibold text-[#6B7570] tabular-nums">
            {nekDoneCount} / {(log.nekAmaalJson || []).length}
          </span>
        </div>

        <div className="space-y-2">
          {(log.nekAmaalJson || []).map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] flex items-center justify-between gap-2"
            >
              <button
                onClick={() => handleToggleNek(item.id)}
                className="flex-1 min-h-[40px] flex items-center gap-2.5 text-left cursor-pointer"
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                    item.completed
                      ? 'bg-brand text-white'
                      : 'border border-[#C9C4BA] dark:border-[#2C3E37]'
                  }`}
                >
                  {item.completed && <Check className="w-3.5 h-3.5" />}
                </div>
                <span
                  className={`text-sm ${item.completed ? 'line-through text-[#6B7570]' : 'font-medium'}`}
                >
                  {item.title}
                </span>
              </button>

              <div className="flex items-center gap-1 shrink-0">
                {typeof item.count === 'number' && (
                  <button
                    onClick={() => handleIncrementNekCount(item.id, 10)}
                    className="min-h-[38px] px-2.5 rounded-xl bg-white dark:bg-[#162620] border border-[#E5E2DC] dark:border-[#243830] text-xs font-semibold tabular-nums cursor-pointer active:scale-95"
                  >
                    {item.count} +10
                  </button>
                )}
                {item.id.startsWith('custom-') && (
                  <button
                    onClick={() => handleDeleteNek(item.id)}
                    aria-label="Remove item"
                    className="min-h-[38px] min-w-[38px] rounded-xl text-[#6B7570] flex items-center justify-center cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newNekTitle}
            onChange={(e) => setNewNekTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddNekAmaal();
            }}
            placeholder="Add another good deed..."
            className="flex-1 min-h-[44px] px-3.5 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] text-sm"
          />
          <button
            onClick={handleAddNekAmaal}
            className="min-h-[44px] px-4 rounded-2xl bg-brand text-white text-sm font-semibold cursor-pointer shrink-0"
          >
            Add
          </button>
        </div>
      </section>

      {/* 8. Honest Evening Submission */}
      <section className="rounded-3xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Moon className="w-5 h-5 text-brand dark:text-brand-dark" />
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold">
              07. Honest Evening Submission
            </h2>
            <p className="text-[11px] text-[#6B7570] dark:text-[#8A9690] tabular-nums">
              Pre-sleep reminder at {profile.sleepReminderTime}
            </p>
          </div>
        </div>

        <textarea
          rows={3}
          value={log.reflectionNote}
          onChange={(e) => onChangeLog({ ...log, reflectionNote: e.target.value })}
          onBlur={() => void onSaveLog(log)}
          placeholder="Write an honest reflection or dua before sleeping..."
          className="w-full p-3.5 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] text-sm"
        />

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => void handleHonestSubmit()}
          disabled={saving}
          className="w-full min-h-[52px] px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand to-brand-to text-white font-semibold text-sm shadow-lg shadow-brand/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          {log.honestSubmitted ? (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Update &amp; View Day Summary</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit Today&apos;s Amaal Honestly</span>
            </>
          )}
        </motion.button>
      </section>
    </div>
  );
}

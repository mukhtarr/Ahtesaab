import { useState } from 'react';
import {
  BellRing,
  Check,
  Code2,
  Copy,
  Loader2,
  LocateFixed,
  LogOut,
  MapPin,
  Moon,
  Palette,
  RefreshCw,
  Save,
  Volume2,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ANDROID_MANIFEST_XML,
  FLUTTER_MAIN_DART,
  FLUTTER_PUBSPEC_YAML,
  MYSQL_SCHEMA_SQL,
} from '../data/flutterBlueprint';
import type { DailyLog, FarzKey, PrayerSchedule, UserProfile } from '../types/amaal';
import { vibrateAndroid } from '../utils/haptics';
import {
  detectLocationAndPrayerTimes,
  fetchPrayerTimesForCity,
  POPULAR_CITIES,
} from '../utils/locationPrayerTimes';
import { THEME_PALETTES, type ThemeColorId } from '../utils/themeColors';
import { AndroidInstallButton } from './AndroidInstallButton';
import { WeeklyTrendsChart } from './WeeklyTrendsChart';

interface HistoryProfileViewProps {
  profile: UserProfile;
  history: DailyLog[];
  themeColor: ThemeColorId;
  onChangeThemeColor: (id: ThemeColorId) => void;
  onSaveProfile: (updated: Partial<UserProfile>) => Promise<void>;
  onSelectHistoryDate: (date: string) => void;
  onTestAzaan: (prayerLabel: string) => void;
  onTestAzkaarReminder: (period: 'morning' | 'evening') => void;
  onTestSleepReminder: () => void;
  onSignOut: () => Promise<void>;
}

const FARZ_KEYS: FarzKey[] = ['fajr', 'zuhr', 'asr', 'maghrib', 'isha'];

export function HistoryProfileView({
  profile,
  history,
  themeColor,
  onChangeThemeColor,
  onSaveProfile,
  onSelectHistoryDate,
  onTestAzaan,
  onTestAzkaarReminder,
  onTestSleepReminder,
  onSignOut,
}: HistoryProfileViewProps) {
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [city, setCity] = useState(profile.city);
  const [azaanVolume, setAzaanVolume] = useState(profile.azaanVolume);
  const [azaanEnabled, setAzaanEnabled] = useState(profile.azaanEnabled);
  const [sleepReminderTime, setSleepReminderTime] = useState(profile.sleepReminderTime);
  const [dailyQuranGoalPages, setDailyQuranGoalPages] = useState(profile.dailyQuranGoalPages);
  const [schedule, setSchedule] = useState<PrayerSchedule>(profile.prayerTimesJson);
  const [saving, setSaving] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const [locating, setLocating] = useState(false);
  const [locationFeedback, setLocationFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [showCityPicker, setShowCityPicker] = useState(false);

  const [selectedPastLog, setSelectedPastLog] = useState<DailyLog | null>(
    history[0] ?? null,
  );
  const [showBlueprintModal, setShowBlueprintModal] = useState(false);
  const [blueprintTab, setBlueprintTab] = useState<
    'flutter' | 'android' | 'pubspec' | 'mysql'
  >('flutter');
  const [copied, setCopied] = useState(false);

  const totalDays = history.length;
  const submittedDays = history.filter((d) => d.honestSubmitted).length;
  const totalQuranPages = history.reduce((acc, d) => acc + (d.quranPages || 0), 0);
  const totalFarzOffered = history.reduce((acc, d) => {
    const dayCount = FARZ_KEYS.filter(
      (k) => d[k] === 'jamaat' || d[k] === 'ontime' || d[k] === 'qaza',
    ).length;
    return acc + dayCount;
  }, 0);

  const handleSave = async (
    overrideCity?: string,
    overrideSchedule?: PrayerSchedule,
  ) => {
    vibrateAndroid(18);
    setSaving(true);
    try {
      const targetCity = overrideCity ?? city;
      const targetSchedule = overrideSchedule ?? schedule;
      await onSaveProfile({
        displayName,
        city: targetCity,
        azaanVolume,
        azaanEnabled,
        sleepReminderTime,
        dailyQuranGoalPages,
        prayerTimesJson: {
          ...targetSchedule,
          sleepCheck: sleepReminderTime,
        },
      });
      setSavedNotice(true);
      window.setTimeout(() => setSavedNotice(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  const handleUseCurrentLocation = async () => {
    vibrateAndroid(16);
    setLocating(true);
    setLocationFeedback(null);
    try {
      const detected = await detectLocationAndPrayerTimes(sleepReminderTime);
      setCity(detected.city);
      setSchedule(detected.schedule);
      await handleSave(detected.city, detected.schedule);
      setLocationFeedback({
        type: 'success',
        text: `Updated city to ${detected.city} and synced local prayer times.`,
      });
    } catch (err) {
      setLocationFeedback({
        type: 'error',
        text:
          err instanceof Error
            ? err.message
            : 'Unable to detect your location right now.',
      });
    } finally {
      setLocating(false);
    }
  };

  const handlePickCity = async (selectedCity: string, country?: string) => {
    vibrateAndroid(14);
    const label = country ? `${selectedCity}, ${country}` : selectedCity;
    setCity(label);
    setShowCityPicker(false);
    setLocating(true);
    setLocationFeedback(null);
    try {
      const nextSchedule = await fetchPrayerTimesForCity(
        selectedCity,
        country,
        sleepReminderTime,
      );
      setSchedule(nextSchedule);
      await handleSave(label, nextSchedule);
      setLocationFeedback({
        type: 'success',
        text: `Synced local prayer times for ${label}.`,
      });
    } catch (err) {
      setLocationFeedback({
        type: 'error',
        text:
          err instanceof Error
            ? err.message
            : `Updated city to ${label}. Adjust prayer times below if needed.`,
      });
    } finally {
      setLocating(false);
    }
  };

  const handleRequestNotifications = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      await Notification.requestPermission();
    }
  };

  const activeBlueprintCode =
    blueprintTab === 'flutter'
      ? FLUTTER_MAIN_DART
      : blueprintTab === 'android'
        ? ANDROID_MANIFEST_XML
        : blueprintTab === 'pubspec'
          ? FLUTTER_PUBSPEC_YAML
          : MYSQL_SCHEMA_SQL;

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(activeBlueprintCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Install on Android CTA */}
      <AndroidInstallButton />

      {/* Colorful Aggregate Stats */}
      <section className="grid grid-cols-2 gap-3">
        <motion.div
          whileHover={{ y: -2 }}
          className="p-4 rounded-3xl bg-gradient-to-br from-brand to-brand-to text-white shadow-sm"
        >
          <p className="text-[11px] text-white/85">Days Tracked</p>
          <p className="text-2xl font-bold tabular-nums mt-0.5">{totalDays}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="p-4 rounded-3xl bg-gradient-to-br from-[#B4833E] to-[#D97706] text-white shadow-sm"
        >
          <p className="text-[11px] text-amber-100">Honest Submissions</p>
          <p className="text-2xl font-bold tabular-nums mt-0.5">{submittedDays}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="p-4 rounded-3xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28]"
        >
          <p className="text-[11px] text-[#6B7570] dark:text-[#8A9690]">Total Farz Offered</p>
          <p className="text-2xl font-bold tabular-nums mt-0.5 text-brand dark:text-brand-dark">
            {totalFarzOffered}
          </p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="p-4 rounded-3xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28]"
        >
          <p className="text-[11px] text-[#6B7570] dark:text-[#8A9690]">Total Quran Pages</p>
          <p className="text-2xl font-bold tabular-nums mt-0.5 text-[#1D4ED8] dark:text-sky-400">
            {totalQuranPages}
          </p>
        </motion.div>
      </section>

      {/* Weekly Recharts Consistency Line Chart */}
      <WeeklyTrendsChart
        history={history}
        quranGoalPages={profile.dailyQuranGoalPages}
      />

      {/* Past Days History & Inspector */}
      <section className="rounded-3xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] p-4 space-y-4">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
            Past Days History
          </h2>
          <p className="text-[11px] text-[#6B7570] dark:text-[#8A9690]">
            Tap any day to inspect or edit
          </p>
        </div>

        {history.length === 0 ? (
          <p className="text-sm text-[#6B7570] dark:text-[#8A9690] py-4">
            Your logged days will appear here as you record your daily Amaal.
          </p>
        ) : (
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
            {history.map((day) => {
              const offered = FARZ_KEYS.filter(
                (k) => day[k] === 'jamaat' || day[k] === 'ontime' || day[k] === 'qaza',
              ).length;
              const active = selectedPastLog?.date === day.date;
              return (
                <motion.button
                  key={day.date}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPastLog(day)}
                  className={`w-full min-h-[58px] p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                    active
                      ? 'bg-brand/10 dark:bg-brand-dark/15 border-brand dark:border-brand-dark'
                      : 'bg-[#F8F7F4] dark:bg-[#0D1714] border-[#E5E2DC] dark:border-[#1E2E28]'
                  }`}
                >
                  <div>
                    <p className="text-sm font-semibold tabular-nums">
                      {day.date} · {day.honestSubmitted ? 'Submitted' : 'Draft'}
                    </p>
                    <p className="text-[11px] text-[#6B7570] dark:text-[#8A9690] tabular-nums">
                      Farz {offered}/5 · Quran {day.quranPages} pg · Azkaar{' '}
                      {(day.morningAzkaar ? 1 : 0) + (day.eveningAzkaar ? 1 : 0)}/2
                      {day.roza ? ` · Roza (${day.rozaType === 'qaza' ? 'Qaza' : 'Sunnah'})` : ''}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-brand dark:text-brand-dark">
                    View
                  </span>
                </motion.button>
              );
            })}
          </div>
        )}

        <AnimatePresence mode="wait">
          {selectedPastLog && (
            <motion.div
              key={selectedPastLog.date}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.16 }}
              className="p-3.5 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] space-y-2.5"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold tabular-nums">
                  Record for {selectedPastLog.date}
                </p>
                <button
                  onClick={() => onSelectHistoryDate(selectedPastLog.date)}
                  className="text-xs font-semibold text-brand dark:text-brand-dark underline cursor-pointer"
                >
                  Edit Day
                </button>
              </div>
              <div className="grid grid-cols-5 gap-1 text-center">
                {FARZ_KEYS.map((k) => (
                  <div
                    key={k}
                    className="p-1.5 rounded-xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28]"
                  >
                    <p className="text-[10px] font-semibold capitalize">{k}</p>
                    <p className="text-[10px] text-[#6B7570] capitalize">{selectedPastLog[k]}</p>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-[#4B5550] dark:text-[#A3B0AA] tabular-nums">
                Nafil: Tahajjud ({selectedPastLog.tahajjud ? 'Yes' : 'No'}), Ishraq (
                {selectedPastLog.ishraq ? 'Yes' : 'No'}), Chasht (
                {selectedPastLog.chasht ? 'Yes' : 'No'}), Awwabin (
                {selectedPastLog.awwabin ? 'Yes' : 'No'})
              </p>
              <p className="text-[11px] text-[#4B5550] dark:text-[#A3B0AA] tabular-nums">
                Taleem: {selectedPastLog.dailyTaleem ? 'Yes' : 'No'} · Halqa:{' '}
                {selectedPastLog.quranHalqa ? 'Yes' : 'No'} · Quran: {selectedPastLog.quranPages} pg ·
                Roza:{' '}
                {selectedPastLog.roza
                  ? selectedPastLog.rozaType === 'qaza'
                    ? 'Qaza'
                    : 'Sunnah'
                  : 'No'}
              </p>
              {selectedPastLog.reflectionNote && (
                <p className="text-xs italic text-[#4B5550] dark:text-[#C4CECA]">
                  “{selectedPastLog.reflectionNote}”
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Profile & Android Loud Azaan Schedule */}
      <section className="rounded-3xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-brand via-brand-to to-[#B4833E] text-white p-4 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
              Profile &amp; Azaan Schedule
            </h2>
            <p className="text-[11px] text-white/85 truncate">
              {profile.email}
            </p>
          </div>
          <button
            onClick={() => void onSignOut()}
            className="min-h-[40px] px-3 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-semibold text-white flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* App Theme Color Picker */}
          <div className="p-3.5 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-brand dark:text-brand-dark shrink-0" />
                <span className="text-xs font-semibold">App Theme Color</span>
              </div>
              <span className="text-[11px] text-[#6B7570] dark:text-[#8A9690]">
                {THEME_PALETTES.find((p) => p.id === themeColor)?.name ?? 'Emerald Masjid'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {THEME_PALETTES.map((palette) => {
                const active = themeColor === palette.id;
                return (
                  <motion.button
                    key={palette.id}
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      vibrateAndroid(12);
                      onChangeThemeColor(palette.id);
                    }}
                    aria-pressed={active}
                    className={`min-h-[44px] px-2.5 py-2 rounded-xl border text-left flex items-center gap-2 cursor-pointer transition-colors ${
                      active
                        ? 'bg-white dark:bg-[#192923] border-brand dark:border-brand-dark shadow-sm'
                        : 'bg-white/60 dark:bg-[#121E1A] border-[#E5E2DC] dark:border-[#1E2E28]'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-white shadow-xs"
                      style={{
                        background: `linear-gradient(135deg, ${palette.primary}, ${palette.primaryTo})`,
                      }}
                    >
                      {active && <Check className="w-3 h-3" />}
                    </span>
                    <span className="text-[11px] font-semibold truncate text-[#141A17] dark:text-[#F3F4F1]">
                      {palette.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2.5">
            <label className="space-y-1 text-[11px] font-medium">
              <span>Full Name</span>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full min-h-[44px] px-3.5 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] text-sm"
              />
            </label>

            {/* City Input + Current Location GPS Detection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium">City &amp; Prayer Region</span>
                <button
                  type="button"
                  onClick={() => setShowCityPicker((v) => !v)}
                  className="text-[11px] font-semibold text-brand dark:text-brand-dark cursor-pointer"
                >
                  {showCityPicker ? 'Hide Cities' : 'Popular Cities'}
                </button>
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 text-brand dark:text-brand-dark absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name..."
                    className="w-full min-h-[44px] pl-9 pr-3 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] text-sm"
                  />
                </div>
                <motion.button
                  whileTap={{ scale: 0.94 }}
                  type="button"
                  disabled={locating}
                  onClick={() => void handlePickCity(city)}
                  aria-label="Sync prayer times for entered city"
                  title="Sync prayer times for entered city"
                  className="min-h-[44px] px-3 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] text-xs font-semibold flex items-center gap-1 cursor-pointer disabled:opacity-60 shrink-0"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${locating ? 'animate-spin' : ''}`} />
                  <span>Sync</span>
                </motion.button>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                type="button"
                disabled={locating}
                onClick={() => void handleUseCurrentLocation()}
                className="w-full min-h-[44px] px-4 rounded-2xl bg-gradient-to-r from-brand to-brand-to text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-60"
              >
                {locating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <LocateFixed className="w-4 h-4" />
                )}
                <span>
                  {locating
                    ? 'Detecting Current Location & Prayer Times...'
                    : 'Use Current Location (Auto-Select City & Times)'}
                </span>
              </motion.button>

              <AnimatePresence>
                {locationFeedback && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`text-xs px-3 py-2 rounded-xl border ${
                      locationFeedback.type === 'success'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-200'
                        : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-200'
                    }`}
                  >
                    {locationFeedback.text}
                  </motion.p>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showCityPicker && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-2.5 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] flex flex-wrap gap-1.5">
                      {POPULAR_CITIES.map((item) => (
                        <button
                          key={item.city}
                          type="button"
                          onClick={() => void handlePickCity(item.city, item.country)}
                          className="min-h-[34px] px-2.5 rounded-xl bg-white dark:bg-[#162620] border border-[#E5E2DC] dark:border-[#243830] text-[11px] font-medium hover:border-brand cursor-pointer"
                        >
                          {item.city}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <label className="space-y-1 text-[11px] font-medium">
              <span>Quran Goal (Pages)</span>
              <input
                type="number"
                min={1}
                max={604}
                value={dailyQuranGoalPages}
                onChange={(e) => setDailyQuranGoalPages(Number(e.target.value) || 1)}
                className="w-full min-h-[44px] px-3 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] text-sm tabular-nums"
              />
            </label>
            <label className="space-y-1 text-[11px] font-medium">
              <span>Pre-Sleep Reminder</span>
              <input
                type="time"
                value={sleepReminderTime}
                onChange={(e) => setSleepReminderTime(e.target.value)}
                className="w-full min-h-[44px] px-3 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] text-sm tabular-nums"
              />
            </label>
          </div>

          {/* Loud Azaan Controls */}
          <div className="p-3.5 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-brand dark:text-brand-dark" />
                <span className="text-xs font-semibold">Loud Azaan Alerts</span>
              </div>
              <button
                onClick={() => setAzaanEnabled((v) => !v)}
                className={`min-h-[36px] px-3 rounded-xl text-xs font-semibold cursor-pointer ${
                  azaanEnabled ? 'bg-brand text-white' : 'bg-[#E5E2DC] dark:bg-[#1E2E28]'
                }`}
              >
                {azaanEnabled ? 'Enabled' : 'Muted'}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-[#6B7570] tabular-nums w-16">
                Vol: {azaanVolume}%
              </span>
              <input
                type="range"
                min={10}
                max={100}
                value={azaanVolume}
                onChange={(e) => setAzaanVolume(Number(e.target.value))}
                className="flex-1 accent-brand"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onTestAzaan('Fajr')}
                className="min-h-[40px] px-3 rounded-xl bg-white dark:bg-[#162620] border border-[#E5E2DC] dark:border-[#243830] text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <BellRing className="w-3.5 h-3.5 text-brand dark:text-brand-dark" />
                <span>Test Loud Azaan</span>
              </button>
              <button
                onClick={() => onTestAzkaarReminder('morning')}
                className="min-h-[40px] px-3 rounded-xl bg-white dark:bg-[#162620] border border-[#E5E2DC] dark:border-[#243830] text-xs font-medium cursor-pointer"
              >
                Test Azkaar Alert
              </button>
              <button
                onClick={onTestSleepReminder}
                className="min-h-[40px] px-3 rounded-xl bg-white dark:bg-[#162620] border border-[#E5E2DC] dark:border-[#243830] text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Moon className="w-3.5 h-3.5 text-[#B4833E]" />
                <span>Test Sleep Check</span>
              </button>
              <button
                onClick={() => void handleRequestNotifications()}
                className="min-h-[40px] px-3 rounded-xl bg-white dark:bg-[#162620] border border-[#E5E2DC] dark:border-[#243830] text-xs font-medium cursor-pointer"
              >
                Android Alerts
              </button>
            </div>
          </div>

          {/* Prayer Times Grid */}
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                ['tahajjud', 'Tahajjud'],
                ['fajr', 'Fajr'],
                ['ishraq', 'Ishraq'],
                ['chasht', 'Chasht'],
                ['zuhr', 'Zuhr'],
                ['asr', 'Asr'],
                ['maghrib', 'Maghrib'],
                ['awwabin', 'Awwabin'],
                ['isha', 'Isha'],
              ] as const
            ).map(([key, label]) => (
              <label
                key={key}
                className="p-2.5 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] flex flex-col gap-0.5"
              >
                <span className="text-[10px] font-medium text-[#6B7570] dark:text-[#8A9690]">
                  {label}
                </span>
                <input
                  type="time"
                  value={schedule[key]}
                  onChange={(e) =>
                    setSchedule((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                  className="bg-transparent text-xs font-semibold tabular-nums focus:outline-none"
                />
              </label>
            ))}
          </div>

          <div className="flex flex-col gap-2.5 pt-1">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => void handleSave()}
              disabled={saving}
              className="w-full min-h-[48px] px-6 rounded-2xl bg-gradient-to-r from-brand to-brand-to text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-md shadow-brand/20 cursor-pointer disabled:opacity-60"
            >
              {savedNotice ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span>{savedNotice ? 'Profile Saved' : saving ? 'Saving...' : 'Save Settings'}</span>
            </motion.button>

            <button
              onClick={() => setShowBlueprintModal(true)}
              className="w-full min-h-[44px] px-4 rounded-2xl border border-[#E5E2DC] dark:border-[#1E2E28] text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Code2 className="w-4 h-4 text-brand dark:text-brand-dark" />
              <span>View Android Flutter &amp; MySQL Source</span>
            </button>
          </div>
        </div>
      </section>

      {/* Android Flutter + MySQL Code Sheet */}
      <AnimatePresence>
        {showBlueprintModal && (
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
              <div className="p-4 border-b border-[#E5E2DC] dark:border-[#1E2E28] flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold">
                    Android Flutter &amp; MySQL Code
                  </h3>
                  <p className="text-[11px] text-[#6B7570] dark:text-[#8A9690]">
                    Native Android permissions + Flutter + MySQL schema
                  </p>
                </div>
                <button
                  onClick={() => setShowBlueprintModal(false)}
                  aria-label="Close code modal"
                  className="min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="px-4 pt-3 flex items-center justify-between gap-2">
                <div className="inline-flex p-1 rounded-xl bg-[#F8F7F4] dark:bg-[#0D1714] gap-1 overflow-x-auto">
                  {(
                    [
                      ['flutter', 'main.dart'],
                      ['android', 'Manifest.xml'],
                      ['pubspec', 'pubspec'],
                      ['mysql', 'mysql.sql'],
                    ] as const
                  ).map(([id, label]) => (
                    <button
                      key={id}
                      onClick={() => setBlueprintTab(id)}
                      className={`min-h-[34px] px-2.5 rounded-lg text-[11px] font-medium whitespace-nowrap cursor-pointer ${
                        blueprintTab === id
                          ? 'bg-white dark:bg-[#192923] shadow-sm'
                          : 'text-[#6B7570]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => void handleCopyCode()}
                  className="min-h-[36px] px-3 rounded-xl bg-brand text-white text-xs font-semibold flex items-center gap-1 cursor-pointer shrink-0"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="p-4 overflow-auto flex-1">
                <pre className="p-3.5 rounded-2xl bg-[#0B1210] text-emerald-100 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed overflow-x-auto">
                  <code>{activeBlueprintCode}</code>
                </pre>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

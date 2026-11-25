import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth';
import {
  BookMarked,
  BookOpen,
  CheckCircle2,
  History,
  Moon,
  Sun,
  Sunrise,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { AndroidInstallButton } from './components/AndroidInstallButton';
import { AuthGate } from './components/AuthGate';
import { AzkaarView } from './components/AzkaarView';
import { DailyRoutineView } from './components/DailyRoutineView';
import { DaySummaryModal } from './components/DaySummaryModal';
import { HistoryProfileView } from './components/HistoryProfileView';
import { MuntakhabView } from './components/MuntakhabView';
import { OfflineIndicator } from './components/OfflineIndicator';
import { QuranReaderView } from './components/QuranReaderView';
import { ReminderOverlay } from './components/ReminderOverlay';
import {
  fetchDailyLog,
  fetchHistory,
  fetchProfile,
  saveDailyLog,
  updateProfile,
} from './lib/api';
import { auth, googleAuthProvider } from './lib/firebase';
import type {
  ActiveReminder,
  DailyLog,
  FarzKey,
  UserProfile,
} from './types/amaal';
import {
  playLoudAzaan,
  playSoftReminderChime,
  stopAzaanAudio,
} from './utils/azaanAudio';
import { vibrateAndroid } from './utils/haptics';
import {
  applyThemeColor,
  getSavedThemeColor,
  type ThemeColorId,
} from './utils/themeColors';

type AppTab = 'today' | 'quran' | 'hadees' | 'azkaar' | 'history';

function getLocalDateIso(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function addMinutesToTime(hhmm: string, minutesToAdd: number): string {
  const [hStr, mStr] = hhmm.split(':');
  const total = Number(hStr || 0) * 60 + Number(mStr || 0) + minutesToAdd;
  const normalized = ((total % 1440) + 1440) % 1440;
  const h = String(Math.floor(normalized / 60)).padStart(2, '0');
  const m = String(normalized % 60).padStart(2, '0');
  return `${h}:${m}`;
}

export default function App() {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(() => getLocalDateIso());
  const [dailyLog, setDailyLog] = useState<DailyLog | null>(null);
  const [todayLogCache, setTodayLogCache] = useState<DailyLog | null>(null);
  const [history, setHistory] = useState<DailyLog[]>([]);

  const [dataError, setDataError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<AppTab>('today');
  const [azkaarInitialPeriod, setAzkaarInitialPeriod] = useState<'morning' | 'evening'>(
    'morning',
  );
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [themeColor, setThemeColor] = useState<ThemeColorId>(() => getSavedThemeColor());

  const [activeReminder, setActiveReminder] = useState<ActiveReminder | null>(null);
  const [isPlayingAzaan, setIsPlayingAzaan] = useState(false);
  const firedRemindersRef = useRef<Set<string>>(new Set());

  const todayDate = useMemo(() => getLocalDateIso(), []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    applyThemeColor(themeColor);
  }, [themeColor]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setAuthReady(true);
    });
    return () => unsub();
  }, []);

  const loadAccountData = useCallback(
    async (user: User, dateToLoad: string) => {
      try {
        setDataError(null);
        const [prof, dayRecord, todayRecord, hist] = await Promise.all([
          fetchProfile(user),
          fetchDailyLog(user, dateToLoad),
          dateToLoad === todayDate
            ? Promise.resolve(null)
            : fetchDailyLog(user, todayDate),
          fetchHistory(user),
        ]);
        setProfile(prof);
        setDailyLog(dayRecord);
        setTodayLogCache(dateToLoad === todayDate ? dayRecord : todayRecord);
        setHistory(hist);
      } catch (err) {
        console.error('Failed to load account data:', err);
        setDataError(
          err instanceof Error
            ? err.message
            : 'Unable to load your saved routine right now.',
        );
      }
    },
    [todayDate],
  );

  useEffect(() => {
    if (!firebaseUser) {
      setProfile(null);
      setDailyLog(null);
      setTodayLogCache(null);
      setHistory([]);
      return;
    }
    void loadAccountData(firebaseUser, selectedDate);
  }, [firebaseUser, selectedDate, loadAccountData]);

  const triggerLoudAzaanReminder = useCallback(
    (prayerLabel: string, timeStr: string, prayerKey?: FarzKey) => {
      const enabled = profile?.azaanEnabled ?? true;
      const vol = profile?.azaanVolume ?? 90;

      vibrateAndroid(120);
      if (enabled) {
        setIsPlayingAzaan(true);
        playLoudAzaan(prayerLabel, vol, () => setIsPlayingAzaan(false));
      }

      setActiveReminder({
        id: `azaan-${prayerLabel}-${timeStr}`,
        type: 'azaan',
        title: `${prayerLabel} Namaz Time`,
        subtitle: `Allahu Akbar — It is time for ${prayerLabel} prayer. Prepare for Wudu and Salah.`,
        prayerKey,
        time: timeStr,
      });

      if (
        typeof window !== 'undefined' &&
        'Notification' in window &&
        Notification.permission === 'granted'
      ) {
        new Notification(`${prayerLabel} Azaan`, {
          body: `Allahu Akbar — Time for ${prayerLabel} Namaz.`,
        });
      }
    },
    [profile],
  );

  const triggerAzkaarReminder = useCallback(
    (period: 'morning' | 'evening', timeStr: string) => {
      vibrateAndroid(60);
      playSoftReminderChime(profile?.azaanVolume ?? 80);
      setActiveReminder({
        id: `azkaar-${period}-${timeStr}`,
        type: 'azkaar',
        title:
          period === 'morning'
            ? 'Morning Azkaar (After Fajr)'
            : 'Evening Azkaar (After Asr)',
        subtitle:
          period === 'morning'
            ? 'Protect your morning with Ayat-ul-Kursi, Three Quls, Sayyid-ul-Istighfar, and Sunnah Azkaar.'
            : 'Recite your Masnoon Evening Azkaar after Asr before sunset.',
        time: timeStr,
      });
    },
    [profile],
  );

  const triggerSleepReminder = useCallback(
    (timeStr: string) => {
      vibrateAndroid(80);
      playSoftReminderChime(profile?.azaanVolume ?? 80);
      setActiveReminder({
        id: `sleep-${timeStr}`,
        type: 'sleep',
        title: 'Final Pre-Sleep Amaal Check',
        subtitle:
          'Before going to sleep, review all Farz & Nafil Namaz, Azkaar, Quran, Taleem, Halqa, and submit today honestly.',
        time: timeStr,
      });
    },
    [profile],
  );

  useEffect(() => {
    if (!profile) return;

    const checkSchedule = () => {
      const now = new Date();
      const currentHHMM = `${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes(),
      ).padStart(2, '0')}`;
      const dayKey = getLocalDateIso(now);
      const s = profile.prayerTimesJson;

      const farzTriggers: Array<{ key: FarzKey; label: string; time: string }> = [
        { key: 'fajr', label: 'Fajr', time: s.fajr },
        { key: 'zuhr', label: 'Zuhr', time: s.zuhr },
        { key: 'asr', label: 'Asr', time: s.asr },
        { key: 'maghrib', label: 'Maghrib', time: s.maghrib },
        { key: 'isha', label: 'Isha', time: s.isha },
      ];

      for (const f of farzTriggers) {
        const token = `${dayKey}-azaan-${f.key}`;
        if (currentHHMM === f.time && !firedRemindersRef.current.has(token)) {
          firedRemindersRef.current.add(token);
          triggerLoudAzaanReminder(f.label, f.time, f.key);
          return;
        }
      }

      const morningAzkaarTime = addMinutesToTime(s.fajr, 20);
      if (
        currentHHMM === morningAzkaarTime &&
        !firedRemindersRef.current.has(`${dayKey}-azkaar-morning`)
      ) {
        firedRemindersRef.current.add(`${dayKey}-azkaar-morning`);
        triggerAzkaarReminder('morning', morningAzkaarTime);
        return;
      }

      const eveningAzkaarTime = addMinutesToTime(s.asr, 20);
      if (
        currentHHMM === eveningAzkaarTime &&
        !firedRemindersRef.current.has(`${dayKey}-azkaar-evening`)
      ) {
        firedRemindersRef.current.add(`${dayKey}-azkaar-evening`);
        triggerAzkaarReminder('evening', eveningAzkaarTime);
        return;
      }

      const sleepTime = profile.sleepReminderTime || s.sleepCheck;
      if (
        currentHHMM === sleepTime &&
        !firedRemindersRef.current.has(`${dayKey}-sleep`)
      ) {
        firedRemindersRef.current.add(`${dayKey}-sleep`);
        triggerSleepReminder(sleepTime);
      }
    };

    const timer = window.setInterval(checkSchedule, 20000);
    return () => window.clearInterval(timer);
  }, [profile, triggerLoudAzaanReminder, triggerAzkaarReminder, triggerSleepReminder]);

  const handleSignIn = async () => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (err) {
      console.error('Sign-in failed:', err);
      setAuthError(
        err instanceof Error
          ? err.message
          : 'Google sign-in was cancelled or blocked. Please allow popups and try again.',
      );
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    stopAzaanAudio();
    await signOut(auth);
  };

  const handleSaveLog = async (logToSave: DailyLog) => {
    if (!firebaseUser) return;
    setSaving(true);
    setDataError(null);
    try {
      const saved = await saveDailyLog(firebaseUser, logToSave);
      setDailyLog(saved);
      if (saved.date === todayDate) {
        setTodayLogCache(saved);
      }
      const updatedHist = await fetchHistory(firebaseUser);
      setHistory(updatedHist);
    } catch (err) {
      console.error('Save log error:', err);
      setDataError(err instanceof Error ? err.message : 'Could not save changes.');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveProfile = async (updates: Partial<UserProfile>) => {
    if (!firebaseUser) return;
    setDataError(null);
    const updated = await updateProfile(firebaseUser, updates);
    setProfile(updated);
  };

  const handleLogQuranPageFromReader = async (surahName: string) => {
    if (!firebaseUser || !todayLogCache) return;
    const updated: DailyLog = {
      ...todayLogCache,
      quranPages: todayLogCache.quranPages + 1,
      quranLastSurah: surahName,
    };
    const saved = await saveDailyLog(firebaseUser, updated);
    setTodayLogCache(saved);
    if (selectedDate === todayDate) {
      setDailyLog(saved);
    }
  };

  const handleCompleteTaleemFromReader = async (chapterName: string) => {
    if (!firebaseUser || !todayLogCache) return;
    const updated: DailyLog = {
      ...todayLogCache,
      dailyTaleem: true,
      taleemMinutes: Math.max(10, todayLogCache.taleemMinutes),
      taleemTopic: chapterName,
    };
    const saved = await saveDailyLog(firebaseUser, updated);
    setTodayLogCache(saved);
    if (selectedDate === todayDate) {
      setDailyLog(saved);
    }
  };

  const handleCompleteAzkaarFromReader = async (period: 'morning' | 'evening') => {
    if (!firebaseUser || !todayLogCache) return;
    const updated: DailyLog = {
      ...todayLogCache,
      morningAzkaar: period === 'morning' ? true : todayLogCache.morningAzkaar,
      eveningAzkaar: period === 'evening' ? true : todayLogCache.eveningAzkaar,
    };
    const saved = await saveDailyLog(firebaseUser, updated);
    setTodayLogCache(saved);
    if (selectedDate === todayDate) {
      setDailyLog(saved);
    }
  };

  if (!authReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7F4] dark:bg-[#0B1210]">
        <div className="w-8 h-8 rounded-full border-2 border-brand border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!firebaseUser) {
    return (
      <AuthGate
        onSignIn={handleSignIn}
        loading={authLoading}
        error={authError}
      />
    );
  }

  const navItems: Array<{ id: AppTab; label: string; icon: typeof CheckCircle2 }> = [
    { id: 'today', label: 'Today', icon: CheckCircle2 },
    { id: 'quran', label: 'Quran', icon: BookOpen },
    { id: 'hadees', label: 'Hadees', icon: BookMarked },
    { id: 'azkaar', label: 'Azkaar', icon: Sunrise },
    { id: 'history', label: 'Profile', icon: History },
  ];

  return (
    <div className="min-h-screen bg-[#ECEAE4] dark:bg-[#060B09] flex justify-center">
      {/* Pure Android Mobile Application Shell */}
      <div className="w-full max-w-[460px] min-h-screen bg-[#F8F7F4] dark:bg-[#0B1210] text-[#141A17] dark:text-[#F3F4F1] sm:border-x sm:border-[#E5E2DC] dark:sm:border-[#1E2E28] sm:shadow-2xl relative flex flex-col">
        {/* Android Top App Bar (52px) */}
        <header className="sticky top-0 z-30 h-13 bg-white/95 dark:bg-[#121E1A]/95 backdrop-blur-md border-b border-[#E5E2DC] dark:border-[#1E2E28] px-4 flex items-center justify-between gap-3">
          <button
            onClick={() => setActiveTab('today')}
            className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight whitespace-nowrap cursor-pointer"
          >
            Noor Amaal
          </button>

          <div className="flex items-center gap-2 shrink-0">
            <AndroidInstallButton compact />
            <button
              onClick={() => {
                vibrateAndroid(10);
                setDarkMode((d) => !d);
              }}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to night mode'}
              className="min-h-[40px] min-w-[40px] rounded-xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] flex items-center justify-center cursor-pointer"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-[#B4833E]" />
              ) : (
                <Moon className="w-4 h-4 text-brand" />
              )}
            </button>
          </div>
        </header>

        <OfflineIndicator />

        <main className="flex-1 px-4 pt-4">
          {dataError && (
            <div
              role="alert"
              className="mb-4 p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-800 dark:text-red-200 flex items-center justify-between gap-3"
            >
              <span>{dataError}</span>
              <button
                onClick={() => void loadAccountData(firebaseUser, selectedDate)}
                className="font-semibold underline shrink-0 cursor-pointer"
              >
                Retry
              </button>
            </div>
          )}

          {!profile || !dailyLog ? (
            <div className="py-24 flex flex-col items-center justify-center gap-3 text-sm text-[#6B7570]">
              <div className="w-8 h-8 rounded-full border-2 border-brand border-t-transparent animate-spin" />
              <span>Loading your routine...</span>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                {activeTab === 'today' && (
                  <DailyRoutineView
                    log={dailyLog}
                    profile={profile}
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                    onChangeLog={setDailyLog}
                    onSaveLog={handleSaveLog}
                    onOpenSummary={() => setSummaryOpen(true)}
                    onTestAzaan={(label) =>
                      triggerLoudAzaanReminder(
                        label,
                        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                      )
                    }
                    onNavigateTab={setActiveTab}
                    saving={saving}
                  />
                )}

                {activeTab === 'quran' && (
                  <QuranReaderView
                    todayLog={todayLogCache}
                    onLogQuranPage={handleLogQuranPageFromReader}
                  />
                )}

                {activeTab === 'hadees' && (
                  <MuntakhabView
                    todayLog={todayLogCache}
                    onCompleteTaleem={handleCompleteTaleemFromReader}
                  />
                )}

                {activeTab === 'azkaar' && (
                  <AzkaarView
                    todayLog={todayLogCache}
                    initialPeriod={azkaarInitialPeriod}
                    onCompleteAzkaar={handleCompleteAzkaarFromReader}
                  />
                )}

                {activeTab === 'history' && (
                  <HistoryProfileView
                    profile={profile}
                    history={history}
                    themeColor={themeColor}
                    onChangeThemeColor={setThemeColor}
                    onSaveProfile={handleSaveProfile}
                    onSelectHistoryDate={(date) => {
                      setSelectedDate(date);
                      setActiveTab('today');
                    }}
                    onTestAzaan={(label) =>
                      triggerLoudAzaanReminder(
                        label,
                        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                      )
                    }
                    onTestAzkaarReminder={(period) =>
                      triggerAzkaarReminder(
                        period,
                        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                      )
                    }
                    onTestSleepReminder={() =>
                      triggerSleepReminder(profile.sleepReminderTime || '22:00')
                    }
                    onSignOut={handleSignOut}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </main>

        {/* Always-Visible Android Material 3 Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 max-w-[460px] mx-auto z-40 h-16 pb-safe bg-white/95 dark:bg-[#121E1A]/95 backdrop-blur-md border-t border-[#E5E2DC] dark:border-[#1E2E28] grid grid-cols-5 items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  vibrateAndroid(10);
                  setActiveTab(item.id);
                }}
                className="h-full flex flex-col items-center justify-center gap-0.5 cursor-pointer"
              >
                <div className="relative px-4 py-1 flex items-center justify-center">
                  {active && (
                    <motion.span
                      layoutId="bottom-nav-pill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-brand/20 to-brand-to/20 dark:from-brand-dark/25 dark:to-brand-urdu/20"
                    />
                  )}
                  <Icon
                    className={`w-5 h-5 relative z-10 transition-colors ${
                      active
                        ? 'text-brand dark:text-brand-dark'
                        : 'text-[#6B7570] dark:text-[#8A9690]'
                    }`}
                  />
                </div>
                <span
                  className={`text-[10px] tracking-tight transition-colors ${
                    active
                      ? 'font-semibold text-brand dark:text-brand-dark'
                      : 'font-medium text-[#6B7570] dark:text-[#8A9690]'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {dailyLog && profile && (
          <DaySummaryModal
            open={summaryOpen}
            log={dailyLog}
            quranGoalPages={profile.dailyQuranGoalPages}
            onClose={() => setSummaryOpen(false)}
          />
        )}

        <ReminderOverlay
          reminder={activeReminder}
          todayLog={todayLogCache}
          isPlayingAzaan={isPlayingAzaan}
          onDismiss={() => setActiveReminder(null)}
          onStopAudio={() => {
            stopAzaanAudio();
            setIsPlayingAzaan(false);
          }}
          onMarkPrayerDone={(prayerKey) => {
            if (!todayLogCache) return;
            const nextLog: DailyLog = { ...todayLogCache, [prayerKey]: 'jamaat' };
            setTodayLogCache(nextLog);
            if (selectedDate === todayDate) setDailyLog(nextLog);
            void handleSaveLog(nextLog);
          }}
          onOpenAzkaar={(period) => {
            setAzkaarInitialPeriod(period);
            setActiveTab('azkaar');
          }}
          onOpenSleepSubmit={() => {
            setSelectedDate(todayDate);
            setActiveTab('today');
          }}
        />
      </div>
    </div>
  );
}

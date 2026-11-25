import { BellRing, BookOpen, CheckCircle2, Moon, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { AndroidInstallButton } from './AndroidInstallButton';

interface AuthGateProps {
  onSignIn: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function AuthGate({ onSignIn, loading, error }: AuthGateProps) {
  return (
    <div className="min-h-screen bg-[#ECEAE4] dark:bg-[#060B09] flex justify-center">
      <div className="w-full max-w-[460px] min-h-screen bg-[#F8F7F4] dark:bg-[#0B1210] text-[#141A17] dark:text-[#F3F4F1] sm:border-x sm:border-[#E5E2DC] dark:sm:border-[#1E2E28] flex flex-col justify-between p-5 pb-8">
        <header className="flex items-center justify-between gap-3 pt-1">
          <span className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight whitespace-nowrap">
            Noor Amaal
          </span>
          <AndroidInstallButton compact />
        </header>

        <motion.main
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="my-5 space-y-5"
        >
          <div className="relative h-56 rounded-3xl overflow-hidden bg-[#E5E2DC] dark:bg-[#13201B] border border-[#E5E2DC] dark:border-[#1E2E28]">
            <img
              src="/src/assets/images/mosque_courtyard_dawn_1795498977201.jpg"
              alt="Sunlit marble mosque courtyard at dawn"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5 text-white">
              <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-200 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Android Islamic Routine Companion</span>
              </div>
              <p className="font-[family-name:var(--font-arabic)] text-xl leading-relaxed">
                حَاسِبُوا أَنْفُسَكُمْ قَبْلَ أَنْ تُحَاسَبُوا
              </p>
              <p className="text-[11px] text-white/80">
                “Hold yourselves accountable before you are held accountable.”
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight text-balance">
              Guard your five prayers and nightly muhasabah.
            </h1>
            <p className="text-sm text-[#4B5550] dark:text-[#A3B0AA] leading-relaxed">
              Track Farz &amp; Nafil Namaz, Morning &amp; Evening Azkaar, Quran recitation,
              Muntakhab Ahaadees, and Quran Halqa with loud Azaan alerts on Android.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] space-y-1">
              <BellRing className="w-4 h-4 text-brand dark:text-brand-dark" />
              <p className="text-xs font-semibold">Loud Azaan</p>
              <p className="text-[11px] text-[#6B7570] dark:text-[#8A9690]">On-time prayer calls</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] space-y-1">
              <BookOpen className="w-4 h-4 text-brand dark:text-brand-dark" />
              <p className="text-xs font-semibold">Quran &amp; Hadees</p>
              <p className="text-[11px] text-[#6B7570] dark:text-[#8A9690]">Urdu &amp; English built-in</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] space-y-1">
              <Sparkles className="w-4 h-4 text-brand dark:text-brand-dark" />
              <p className="text-xs font-semibold">Sunnah Azkaar</p>
              <p className="text-[11px] text-[#6B7570] dark:text-[#8A9690]">Tactile tasbeeh tap</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] space-y-1">
              <Moon className="w-4 h-4 text-brand dark:text-brand-dark" />
              <p className="text-xs font-semibold">Sleep Check</p>
              <p className="text-[11px] text-[#6B7570] dark:text-[#8A9690]">Honest day summary</p>
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-800 dark:text-red-200"
            >
              {error}
            </div>
          )}
        </motion.main>

        <footer className="space-y-2.5">
          <button
            onClick={onSignIn}
            disabled={loading}
            className="w-full min-h-[52px] px-6 py-3.5 rounded-2xl bg-brand hover:opacity-95 text-white font-semibold text-sm shadow-lg shadow-brand/20 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign in with Google'}
          </button>
          <p className="text-[11px] text-center text-[#6B7570] dark:text-[#8A9690]">
            Syncs your profile, prayer alerts, and past days history.
          </p>
        </footer>
      </div>
    </div>
  );
}

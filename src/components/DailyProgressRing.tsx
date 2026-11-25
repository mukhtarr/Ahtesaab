import { motion } from 'motion/react';
import type { DailyLog, FarzKey, NafilKey } from '../types/amaal';

interface DailyProgressRingProps {
  log: DailyLog;
  quranGoalPages: number;
  onOpenSummary: () => void;
}

const FARZ_KEYS: FarzKey[] = ['fajr', 'zuhr', 'asr', 'maghrib', 'isha'];
const NAFIL_KEYS: NafilKey[] = ['tahajjud', 'ishraq', 'chasht', 'awwabin'];

export interface DailyCompletionSnapshot {
  percentage: number;
  completedCoreTasks: number;
  totalCoreTasks: number;
  farzDone: number;
  azkaarDone: number;
  quranDone: boolean;
  quranRatio: number;
  taleemDone: boolean;
  halqaDone: boolean;
  nafilDone: number;
  nekDone: number;
  nekTotal: number;
}

export function calculateDailyCompletion(
  log: DailyLog,
  quranGoalPages: number,
): DailyCompletionSnapshot {
  const safeGoal = Math.max(1, quranGoalPages || 4);
  const farzDone = FARZ_KEYS.filter(
    (k) => log[k] === 'jamaat' || log[k] === 'ontime' || log[k] === 'qaza',
  ).length;
  const azkaarDone = (log.morningAzkaar ? 1 : 0) + (log.eveningAzkaar ? 1 : 0);
  const quranRatio = Math.min(1, Math.max(0, (log.quranPages || 0) / safeGoal));
  const quranDone = quranRatio >= 1;
  const taleemDone = Boolean(log.dailyTaleem);
  const halqaDone = Boolean(log.quranHalqa);
  const nafilDone = NAFIL_KEYS.filter((k) => Boolean(log[k])).length;
  const nekList = log.nekAmaalJson || [];
  const nekDone = nekList.filter((item) => item.completed).length;

  const totalCoreTasks = 10;
  const completedCoreTasks =
    farzDone +
    azkaarDone +
    (quranDone ? 1 : 0) +
    (taleemDone ? 1 : 0) +
    (halqaDone ? 1 : 0);

  const weightedProgress =
    farzDone + azkaarDone + quranRatio + (taleemDone ? 1 : 0) + (halqaDone ? 1 : 0);
  const percentage = Math.round((weightedProgress / totalCoreTasks) * 100);

  return {
    percentage,
    completedCoreTasks,
    totalCoreTasks,
    farzDone,
    azkaarDone,
    quranDone,
    quranRatio,
    taleemDone,
    halqaDone,
    nafilDone,
    nekDone,
    nekTotal: nekList.length,
  };
}

export function DailyProgressRing({
  log,
  quranGoalPages,
  onOpenSummary,
}: DailyProgressRingProps) {
  const stats = calculateDailyCompletion(log, quranGoalPages);

  const size = 112;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - stats.percentage / 100);

  const categories = [
    {
      label: 'Namaz',
      value: `${stats.farzDone}/5`,
      done: stats.farzDone === 5,
      barColor: 'bg-emerald-300',
    },
    {
      label: 'Azkaar',
      value: `${stats.azkaarDone}/2`,
      done: stats.azkaarDone === 2,
      barColor: 'bg-amber-300',
    },
    {
      label: 'Quran',
      value: `${log.quranPages}/${Math.max(1, quranGoalPages)} pg`,
      done: stats.quranDone,
      barColor: 'bg-sky-300',
    },
    {
      label: 'Taleem',
      value: `${(stats.taleemDone ? 1 : 0) + (stats.halqaDone ? 1 : 0)}/2`,
      done: stats.taleemDone && stats.halqaDone,
      barColor: 'bg-rose-300',
    },
  ];

  const statusHeading =
    stats.percentage === 100
      ? 'MashaAllah · All Required Tasks Complete'
      : stats.percentage >= 70
        ? 'Strong Progress Today'
        : stats.percentage >= 40
          ? 'Day in Progress'
          : 'Begin Your Daily Amaal';

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Daily task completion snapshot"
      className="rounded-3xl bg-gradient-to-br from-brand via-brand-to to-brand-to text-white p-4 sm:p-5 space-y-4 shadow-lg shadow-brand/25"
    >
      <div className="flex items-center justify-between gap-4">
        {/* Multi-Stop Animated SVG Progress Ring */}
        <div
          className="relative shrink-0 flex items-center justify-center"
          style={{ width: size, height: size }}
        >
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="-rotate-90"
            role="progressbar"
            aria-valuenow={stats.percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Daily completion ${stats.percentage} percent`}
          >
            <defs>
              <linearGradient id="noorRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="50%" stopColor="var(--theme-urdu-dark)" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
            </defs>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="rgba(255,255,255,0.18)"
              strokeWidth={strokeWidth}
              fill="none"
            />
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="url(#noorRingGradient)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: dashOffset }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-[family-name:var(--font-display)] text-2xl font-bold leading-none tabular-nums">
              {stats.percentage}%
            </span>
            <span className="text-[10px] font-medium text-amber-100/90 tabular-nums mt-1">
              {stats.completedCoreTasks}/{stats.totalCoreTasks} tasks
            </span>
          </div>
        </div>

        {/* Right Snapshot Summary */}
        <div className="flex-1 min-w-0 space-y-1.5">
          <p className="text-[11px] font-medium text-amber-200/95">
            Today&apos;s Snapshot
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold leading-snug text-balance">
            {statusHeading}
          </h2>
          <p className="text-xs text-emerald-100/90 tabular-nums">
            {stats.nafilDone} Nafil · {stats.nekDone}/{stats.nekTotal} Nek Amaal
            {log.roza
              ? ` · Roza (${log.rozaType === 'qaza' ? 'Qaza' : 'Sunnah'})`
              : ''}
          </p>
          {log.honestSubmitted && (
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={onOpenSummary}
              className="mt-1 min-h-[36px] px-3.5 py-1 rounded-xl bg-white/18 hover:bg-white/25 text-xs font-semibold cursor-pointer transition-colors"
            >
              View Day Summary
            </motion.button>
          )}
        </div>
      </div>

      {/* Required Category Breakdown Strip */}
      <div className="grid grid-cols-4 gap-1.5 pt-3 border-t border-white/15">
        {categories.map((cat) => (
          <div
            key={cat.label}
            className={`px-2 py-2 rounded-2xl text-center transition-colors ${
              cat.done ? 'bg-white/20' : 'bg-black/15'
            }`}
          >
            <div className={`mx-auto mb-1 h-1 w-6 rounded-full ${cat.barColor}`} />
            <p className="text-[10px] text-emerald-100/90 truncate">{cat.label}</p>
            <p className="text-xs font-bold tabular-nums mt-0.5">{cat.value}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

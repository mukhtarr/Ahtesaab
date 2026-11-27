import { useMemo, useState } from 'react';
import { BarChart3, BookOpen, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { DailyLog, FarzKey } from '../types/amaal';
import { vibrateAndroid } from '../utils/haptics';
import { calculateDailyCompletion } from './DailyProgressRing';

type StatsRange = 'weekly' | 'monthly';

interface StatsVisualizationProps {
  history: DailyLog[];
  quranGoalPages: number;
}

interface TrendPoint {
  date: string;
  shortLabel: string;
  fullDateLabel: string;
  prayerRate: number;
  amaalRate: number;
  farzCount: number;
  jamaatCount: number;
  quranPages: number;
  quranGoalMet: boolean;
  hasLog: boolean;
}

const FARZ_KEYS: FarzKey[] = ['fajr', 'zuhr', 'asr', 'maghrib', 'isha'];

function buildTrendData(
  history: DailyLog[],
  quranGoalPages: number,
  days: number,
): TrendPoint[] {
  const safeGoal = Math.max(1, quranGoalPages || 4);
  const byDate = new Map<string, DailyLog>();
  for (const item of history) {
    byDate.set(item.date, item);
  }

  const today = new Date();
  const points: TrendPoint[] = [];

  for (let offset = days - 1; offset >= 0; offset--) {
    const d = new Date(today);
    d.setDate(today.getDate() - offset);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
      d.getDate(),
    ).padStart(2, '0')}`;
    const shortLabel =
      days <= 7
        ? d.toLocaleDateString('en-US', { weekday: 'short' })
        : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const fullDateLabel = d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

    const log = byDate.get(iso);
    if (!log) {
      points.push({
        date: iso,
        shortLabel,
        fullDateLabel,
        prayerRate: 0,
        amaalRate: 0,
        farzCount: 0,
        jamaatCount: 0,
        quranPages: 0,
        quranGoalMet: false,
        hasLog: false,
      });
    } else {
      const completion = calculateDailyCompletion(log, safeGoal);
      const jamaatCount = FARZ_KEYS.filter((k) => log[k] === 'jamaat').length;
      const pages = Math.max(0, Number(log.quranPages) || 0);
      points.push({
        date: iso,
        shortLabel,
        fullDateLabel,
        prayerRate: Math.round((completion.farzDone / 5) * 100),
        amaalRate: completion.percentage,
        farzCount: completion.farzDone,
        jamaatCount,
        quranPages: pages,
        quranGoalMet: pages >= safeGoal,
        hasLog: true,
      });
    }
  }

  return points;
}

export function StatsVisualization({
  history,
  quranGoalPages,
}: StatsVisualizationProps) {
  const [range, setRange] = useState<StatsRange>('weekly');
  const safeGoal = Math.max(1, quranGoalPages || 4);
  const windowDays = range === 'weekly' ? 7 : 30;

  const data = useMemo(
    () => buildTrendData(history, safeGoal, windowDays),
    [history, safeGoal, windowDays],
  );

  const summary = useMemo(() => {
    const logged = data.filter((d) => d.hasLog);
    const totalPages = data.reduce((sum, pt) => sum + pt.quranPages, 0);
    const avgPrayer = Math.round(
      data.reduce((sum, pt) => sum + pt.prayerRate, 0) / data.length,
    );
    const perfectPrayerDays = data.filter((pt) => pt.farzCount === 5).length;
    const goalMetDays = data.filter((pt) => pt.quranGoalMet).length;
    const avgPages = (totalPages / data.length).toFixed(1);
    const maxPages = Math.max(safeGoal, ...data.map((pt) => pt.quranPages));

    return {
      loggedDays: logged.length,
      totalPages,
      avgPrayer,
      perfectPrayerDays,
      goalMetDays,
      avgPages,
      maxPages,
    };
  }, [data, safeGoal]);

  return (
    <section
      aria-label="Stats for weekly and monthly Quran and Namaz progress"
      className="rounded-3xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] p-4 space-y-4"
    >
      {/* Stats Header + Weekly / Monthly Segmented Control */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-2xl bg-brand/10 dark:bg-brand-dark/15 text-brand dark:text-brand-dark flex items-center justify-center shrink-0">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold leading-tight">
              Stats
            </h2>
            <p className="text-[11px] text-[#6B7570] dark:text-[#8A9690] tabular-nums truncate">
              {range === 'weekly' ? 'Last 7 days' : 'Last 30 days'} · {summary.loggedDays}/
              {windowDays} days logged
            </p>
          </div>
        </div>

        <div
          role="group"
          aria-label="Stats timeframe"
          className="inline-flex p-1 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28] gap-1 shrink-0"
        >
          {(
            [
              { id: 'weekly', label: 'Weekly' },
              { id: 'monthly', label: 'Monthly' },
            ] as const
          ).map((tab) => {
            const active = range === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  vibrateAndroid(8);
                  setRange(tab.id);
                }}
                aria-pressed={active}
                className={`relative min-h-[40px] px-3.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                  active ? 'text-white' : 'text-[#4B5550] dark:text-[#A3B0AA]'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="stats-range-pill"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand to-brand-to shadow-sm"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* KPI Snapshot Strip */}
      <div className="grid grid-cols-3 gap-2">
        <div className="p-2.5 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28]">
          <p className="text-[10px] font-medium text-[#6B7570] dark:text-[#8A9690] truncate">
            Namaz Avg
          </p>
          <p className="text-lg font-bold tabular-nums text-brand dark:text-brand-dark mt-0.5">
            {summary.avgPrayer}%
          </p>
          <p className="text-[10px] text-[#6B7570] dark:text-[#8A9690] tabular-nums truncate">
            {summary.perfectPrayerDays}d all 5/5
          </p>
        </div>

        <div className="p-2.5 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28]">
          <p className="text-[10px] font-medium text-[#6B7570] dark:text-[#8A9690] truncate">
            Quran Read
          </p>
          <p className="text-lg font-bold tabular-nums text-[#0284C7] dark:text-sky-400 mt-0.5">
            {summary.totalPages} pg
          </p>
          <p className="text-[10px] text-[#6B7570] dark:text-[#8A9690] tabular-nums truncate">
            {summary.avgPages} pg/day
          </p>
        </div>

        <div className="p-2.5 rounded-2xl bg-[#F8F7F4] dark:bg-[#0D1714] border border-[#E5E2DC] dark:border-[#1E2E28]">
          <p className="text-[10px] font-medium text-[#6B7570] dark:text-[#8A9690] truncate">
            Goal Met
          </p>
          <p className="text-lg font-bold tabular-nums text-[#B4833E] dark:text-amber-400 mt-0.5">
            {summary.goalMetDays}/{windowDays}
          </p>
          <p className="text-[10px] text-[#6B7570] dark:text-[#8A9690] tabular-nums truncate">
            {safeGoal} pg target
          </p>
        </div>
      </div>

      {/* Chart 1: Namaz Consistency */}
      <div className="pt-2 border-t border-[#EFECE6] dark:border-[#1E2E28] space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <CheckCircle2 className="w-4 h-4 text-brand dark:text-brand-dark shrink-0" />
            <h3 className="text-sm font-semibold text-[#141A17] dark:text-[#F3F4F1] truncate">
              Namaz Consistency
            </h3>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-medium shrink-0">
            <span className="flex items-center gap-1.5 text-brand dark:text-brand-dark">
              <span className="w-2.5 h-0.5 bg-brand dark:bg-brand-dark rounded-full" />
              <span>Farz %</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#B4833E] dark:text-amber-400">
              <span className="w-2.5 h-0.5 bg-[#B4833E] dark:bg-amber-400 rounded-full" />
              <span>Amaal %</span>
            </span>
          </div>
        </div>

        <div className="h-44 w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <ComposedChart data={data} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
              <defs>
                <linearGradient id="namazAreaFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--theme-primary)" stopOpacity={0.28} />
                  <stop offset="95%" stopColor="var(--theme-primary)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="rgba(107, 117, 112, 0.18)"
              />
              <XAxis
                dataKey="shortLabel"
                interval={range === 'weekly' ? 0 : 4}
                tick={{ fontSize: 10, fill: '#6B7570' }}
                axisLine={false}
                tickLine={false}
                dy={6}
              />
              <YAxis
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                tickFormatter={(v) => `${v}%`}
                tick={{ fontSize: 10, fill: '#6B7570' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload || payload.length === 0) return null;
                  const pt = payload[0]?.payload as TrendPoint | undefined;
                  if (!pt) return null;
                  return (
                    <div className="rounded-2xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] px-3 py-2 shadow-lg text-xs space-y-1">
                      <p className="font-semibold text-[#141A17] dark:text-[#F3F4F1] tabular-nums">
                        {pt.fullDateLabel}
                      </p>
                      <p className="text-brand dark:text-brand-dark tabular-nums">
                        Farz Namaz: {pt.prayerRate}% ({pt.farzCount}/5 · {pt.jamaatCount} Jamaat)
                      </p>
                      <p className="text-[#B4833E] dark:text-amber-400 tabular-nums">
                        Overall Amaal: {pt.amaalRate}%
                      </p>
                    </div>
                  );
                }}
              />
              <Area
                type="monotone"
                dataKey="prayerRate"
                name="Farz Namaz"
                stroke="var(--theme-primary)"
                strokeWidth={2.5}
                fill="url(#namazAreaFill)"
                dot={range === 'weekly' ? { r: 3.5, fill: 'var(--theme-primary)', strokeWidth: 0 } : false}
                activeDot={{ r: 5, fill: 'var(--theme-primary)', stroke: '#FFFFFF', strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="amaalRate"
                name="Overall Amaal"
                stroke="#B4833E"
                strokeWidth={2}
                strokeDasharray="4 3"
                dot={false}
                activeDot={{ r: 4, fill: '#B4833E', stroke: '#FFFFFF', strokeWidth: 2 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Quran Reading Pages */}
      <div className="pt-3 border-t border-[#EFECE6] dark:border-[#1E2E28] space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <BookOpen className="w-4 h-4 text-[#0284C7] dark:text-sky-400 shrink-0" />
            <h3 className="text-sm font-semibold text-[#141A17] dark:text-[#F3F4F1] truncate">
              Quran Reading Pages
            </h3>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-medium shrink-0">
            <span className="flex items-center gap-1.5 text-[#0284C7] dark:text-sky-400">
              <span className="w-2.5 h-2.5 bg-[#0284C7] dark:bg-sky-400 rounded-xs" />
              <span>Goal Met</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#D97706] dark:text-amber-400">
              <span className="w-2.5 h-2.5 bg-[#D97706] dark:bg-amber-400 rounded-xs" />
              <span>Below Goal</span>
            </span>
          </div>
        </div>

        <div className="h-44 w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <BarChart data={data} margin={{ top: 10, right: 8, left: -24, bottom: 0 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="rgba(107, 117, 112, 0.18)"
              />
              <XAxis
                dataKey="shortLabel"
                interval={range === 'weekly' ? 0 : 4}
                tick={{ fontSize: 10, fill: '#6B7570' }}
                axisLine={false}
                tickLine={false}
                dy={6}
              />
              <YAxis
                domain={[0, Math.ceil(summary.maxPages * 1.15)]}
                allowDecimals={false}
                tick={{ fontSize: 10, fill: '#6B7570' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: 'rgba(107, 117, 112, 0.08)' }}
                content={({ active, payload }) => {
                  if (!active || !payload || payload.length === 0) return null;
                  const pt = payload[0]?.payload as TrendPoint | undefined;
                  if (!pt) return null;
                  return (
                    <div className="rounded-2xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] px-3 py-2 shadow-lg text-xs space-y-1">
                      <p className="font-semibold text-[#141A17] dark:text-[#F3F4F1] tabular-nums">
                        {pt.fullDateLabel}
                      </p>
                      <p className="text-[#0284C7] dark:text-sky-400 tabular-nums">
                        Quran Read: {pt.quranPages} pages
                      </p>
                      <p className="text-[#6B7570] dark:text-[#8A9690] tabular-nums">
                        {pt.quranGoalMet
                          ? `Daily target (${safeGoal} pg) met`
                          : `Target: ${safeGoal} pg/day`}
                      </p>
                    </div>
                  );
                }}
              />
              <ReferenceLine
                y={safeGoal}
                stroke="#B4833E"
                strokeDasharray="4 4"
                strokeWidth={1.5}
              />
              <Bar
                dataKey="quranPages"
                name="Quran Pages"
                radius={[6, 6, 0, 0]}
                maxBarSize={range === 'weekly' ? 28 : 10}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.date}
                    fill={
                      entry.quranPages === 0
                        ? 'rgba(107, 117, 112, 0.2)'
                        : entry.quranGoalMet
                          ? '#0284C7'
                          : '#D97706'
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p className="text-[11px] text-[#6B7570] dark:text-[#8A9690] tabular-nums">
          Dashed line indicates your daily Quran goal ({safeGoal} pages/day).
        </p>
      </div>
    </section>
  );
}

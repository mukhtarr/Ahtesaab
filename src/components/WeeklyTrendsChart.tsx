import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { DailyLog } from '../types/amaal';
import { calculateDailyCompletion } from './DailyProgressRing';

interface WeeklyTrendsChartProps {
  history: DailyLog[];
  quranGoalPages: number;
}

interface ChartPoint {
  date: string;
  shortLabel: string;
  prayerRate: number;
  amaalRate: number;
  farzCount: number;
  hasLog: boolean;
}

function getLast7DaysData(
  history: DailyLog[],
  quranGoalPages: number,
): ChartPoint[] {
  const byDate = new Map<string, DailyLog>();
  for (const item of history) {
    byDate.set(item.date, item);
  }

  const today = new Date();
  const points: ChartPoint[] = [];

  for (let offset = 6; offset >= 0; offset--) {
    const d = new Date(today);
    d.setDate(today.getDate() - offset);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
      d.getDate(),
    ).padStart(2, '0')}`;
    const shortLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
    const log = byDate.get(iso);

    if (!log) {
      points.push({
        date: iso,
        shortLabel,
        prayerRate: 0,
        amaalRate: 0,
        farzCount: 0,
        hasLog: false,
      });
    } else {
      const completion = calculateDailyCompletion(log, quranGoalPages);
      points.push({
        date: iso,
        shortLabel,
        prayerRate: Math.round((completion.farzDone / 5) * 100),
        amaalRate: completion.percentage,
        farzCount: completion.farzDone,
        hasLog: true,
      });
    }
  }

  return points;
}

export function WeeklyTrendsChart({
  history,
  quranGoalPages,
}: WeeklyTrendsChartProps) {
  const data = getLast7DaysData(history, quranGoalPages);

  const avgPrayer = Math.round(
    data.reduce((sum, pt) => sum + pt.prayerRate, 0) / data.length,
  );
  const avgAmaal = Math.round(
    data.reduce((sum, pt) => sum + pt.amaalRate, 0) / data.length,
  );

  return (
    <section
      aria-label="Last 7 days prayer and Amaal completion chart"
      className="rounded-3xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] p-4 space-y-3"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
            7-Day Consistency
          </h2>
          <p className="text-[11px] text-[#6B7570] dark:text-[#8A9690] tabular-nums">
            Avg Prayer {avgPrayer}% · Avg Amaal {avgAmaal}%
          </p>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-medium pt-1 shrink-0">
          <span className="flex items-center gap-1.5 text-brand dark:text-brand-dark">
            <span className="w-3 h-0.5 bg-brand dark:bg-brand-dark rounded-full" />
            <span>Prayers</span>
          </span>
          <span className="flex items-center gap-1.5 text-[#B4833E] dark:text-[#D4A65A]">
            <span className="w-3 h-0.5 bg-[#B4833E] dark:bg-[#D4A65A] rounded-full" />
            <span>Amaal</span>
          </span>
        </div>
      </div>

      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 10, left: -22, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(107, 117, 112, 0.18)"
            />
            <XAxis
              dataKey="shortLabel"
              tick={{ fontSize: 11, fill: '#6B7570' }}
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
                const pt = payload[0]?.payload as ChartPoint | undefined;
                if (!pt) return null;
                return (
                  <div className="rounded-2xl bg-white dark:bg-[#121E1A] border border-[#E5E2DC] dark:border-[#1E2E28] px-3 py-2 shadow-lg text-xs space-y-1">
                    <p className="font-semibold text-[#141A17] dark:text-[#F3F4F1] tabular-nums">
                      {pt.date} ({pt.shortLabel})
                    </p>
                    <p className="text-brand dark:text-brand-dark tabular-nums">
                      Prayer Attendance: {pt.prayerRate}% ({pt.farzCount}/5 Farz)
                    </p>
                    <p className="text-[#B4833E] dark:text-[#D4A65A] tabular-nums">
                      Daily Amaal: {pt.amaalRate}%
                    </p>
                  </div>
                );
              }}
            />
            <Line
              type="monotone"
              dataKey="prayerRate"
              name="Prayer Attendance"
              stroke="var(--theme-primary)"
              strokeWidth={2.5}
              dot={{ r: 3.5, fill: 'var(--theme-primary)', strokeWidth: 0 }}
              activeDot={{ r: 5, fill: 'var(--theme-primary)', stroke: '#FFFFFF', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="amaalRate"
              name="Daily Amaal"
              stroke="#B4833E"
              strokeWidth={2.5}
              dot={{ r: 3.5, fill: '#B4833E', strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#B4833E', stroke: '#FFFFFF', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

export interface PrayerSchedule {
  tahajjud: string;
  fajr: string;
  ishraq: string;
  chasht: string;
  zuhr: string;
  asr: string;
  maghrib: string;
  awwabin: string;
  isha: string;
  sleepCheck: string;
}

export interface NekAmaalItem {
  id: string;
  title: string;
  completed: boolean;
  count?: number;
}

export const DEFAULT_PRAYER_SCHEDULE: PrayerSchedule = {
  tahajjud: '04:15',
  fajr: '05:15',
  ishraq: '06:35',
  chasht: '09:30',
  zuhr: '12:30',
  asr: '15:45',
  maghrib: '18:05',
  awwabin: '18:25',
  isha: '19:35',
  sleepCheck: '22:00',
};

export const DEFAULT_NEK_AMAAL: NekAmaalItem[] = [
  { id: 'sadaqah', title: 'Sadaqah (Charity / Helping Someone)', completed: false },
  { id: 'istighfar', title: 'Istighfar (100x)', completed: false, count: 0 },
  { id: 'durood', title: 'Durood Sharif (100x)', completed: false, count: 0 },
  { id: 'parents', title: 'Khidmat & Dua for Parents', completed: false },
  { id: 'miswak', title: 'Miswak & Wudu Before Prayers', completed: false },
];

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(),
  email: text('email').notNull(),
  displayName: text('display_name').notNull().default(''),
  city: text('city').notNull().default('Mecca'),
  azaanVolume: integer('azaan_volume').notNull().default(90),
  azaanEnabled: boolean('azaan_enabled').notNull().default(true),
  sleepReminderTime: text('sleep_reminder_time').notNull().default('22:00'),
  dailyQuranGoalPages: integer('daily_quran_goal_pages').notNull().default(4),
  prayerTimesJson: jsonb('prayer_times_json').$type<PrayerSchedule>().notNull().default(DEFAULT_PRAYER_SCHEDULE),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const dailyLogs = pgTable(
  'daily_logs',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    date: text('date').notNull(), // YYYY-MM-DD
    fajr: text('fajr').notNull().default('pending'),
    zuhr: text('zuhr').notNull().default('pending'),
    asr: text('asr').notNull().default('pending'),
    maghrib: text('maghrib').notNull().default('pending'),
    isha: text('isha').notNull().default('pending'),
    tahajjud: boolean('tahajjud').notNull().default(false),
    ishraq: boolean('ishraq').notNull().default(false),
    chasht: boolean('chasht').notNull().default(false),
    awwabin: boolean('awwabin').notNull().default(false),
    morningAzkaar: boolean('morning_azkaar').notNull().default(false),
    eveningAzkaar: boolean('evening_azkaar').notNull().default(false),
    roza: boolean('roza').notNull().default(false),
    rozaType: text('roza_type').notNull().default('sunnah'),
    quranPages: integer('quran_pages').notNull().default(0),
    quranRuku: integer('quran_ruku').notNull().default(0),
    quranMinutes: integer('quran_minutes').notNull().default(0),
    quranLastSurah: text('quran_last_surah').notNull().default(''),
    dailyTaleem: boolean('daily_taleem').notNull().default(false),
    taleemMinutes: integer('taleem_minutes').notNull().default(0),
    taleemTopic: text('taleem_topic').notNull().default(''),
    quranHalqa: boolean('quran_halqa').notNull().default(false),
    halqaNotes: text('halqa_notes').notNull().default(''),
    nekAmaalJson: jsonb('nek_amaal_json').$type<NekAmaalItem[]>().notNull().default(DEFAULT_NEK_AMAAL),
    reflectionNote: text('reflection_note').notNull().default(''),
    honestSubmitted: boolean('honest_submitted').notNull().default(false),
    submittedAt: timestamp('submitted_at'),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => [uniqueIndex('daily_logs_user_date_idx').on(table.userId, table.date)],
);

export const usersRelations = relations(users, ({ many }) => ({
  dailyLogs: many(dailyLogs),
}));

export const dailyLogsRelations = relations(dailyLogs, ({ one }) => ({
  user: one(users, {
    fields: [dailyLogs.userId],
    references: [users.id],
  }),
}));

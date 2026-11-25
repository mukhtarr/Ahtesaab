import { and, desc, eq } from 'drizzle-orm';
import { db } from './index.ts';
import {
  dailyLogs,
  DEFAULT_NEK_AMAAL,
  DEFAULT_PRAYER_SCHEDULE,
  users,
  type NekAmaalItem,
  type PrayerSchedule,
} from './schema.ts';

export interface DailyLogPayload {
  date: string;
  fajr: string;
  zuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  tahajjud: boolean;
  ishraq: boolean;
  chasht: boolean;
  awwabin: boolean;
  morningAzkaar: boolean;
  eveningAzkaar: boolean;
  roza: boolean;
  rozaType: string;
  quranPages: number;
  quranRuku: number;
  quranMinutes: number;
  quranLastSurah: string;
  dailyTaleem: boolean;
  taleemMinutes: number;
  taleemTopic: string;
  quranHalqa: boolean;
  halqaNotes: string;
  nekAmaalJson: NekAmaalItem[];
  reflectionNote: string;
  honestSubmitted: boolean;
}

export interface ProfileUpdatePayload {
  displayName?: string;
  city?: string;
  azaanVolume?: number;
  azaanEnabled?: boolean;
  sleepReminderTime?: string;
  dailyQuranGoalPages?: number;
  prayerTimesJson?: PrayerSchedule;
}

export async function getOrCreateUser(
  uid: string,
  email: string,
  displayName?: string,
) {
  try {
    const existing = await db.select().from(users).where(eq(users.uid, uid)).limit(1);
    if (existing.length > 0) {
      return existing[0];
    }

    const result = await db
      .insert(users)
      .values({
        uid,
        email,
        displayName: displayName || email.split('@')[0] || 'Believer',
        prayerTimesJson: DEFAULT_PRAYER_SCHEDULE,
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email,
          updatedAt: new Date(),
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error('Database error in getOrCreateUser:', error);
    throw new Error('Failed to synchronize user profile.', { cause: error });
  }
}

export async function updateUserProfile(uid: string, payload: ProfileUpdatePayload) {
  try {
    const updateSet: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (typeof payload.displayName === 'string') {
      updateSet.displayName = payload.displayName.trim().slice(0, 80);
    }
    if (typeof payload.city === 'string') {
      updateSet.city = payload.city.trim().slice(0, 80);
    }
    if (typeof payload.azaanVolume === 'number') {
      updateSet.azaanVolume = Math.max(0, Math.min(100, Math.round(payload.azaanVolume)));
    }
    if (typeof payload.azaanEnabled === 'boolean') {
      updateSet.azaanEnabled = payload.azaanEnabled;
    }
    if (typeof payload.sleepReminderTime === 'string') {
      updateSet.sleepReminderTime = payload.sleepReminderTime.slice(0, 10);
    }
    if (typeof payload.dailyQuranGoalPages === 'number') {
      updateSet.dailyQuranGoalPages = Math.max(1, Math.min(604, Math.round(payload.dailyQuranGoalPages)));
    }
    if (payload.prayerTimesJson) {
      updateSet.prayerTimesJson = payload.prayerTimesJson;
    }

    const updated = await db
      .update(users)
      .set(updateSet)
      .where(eq(users.uid, uid))
      .returning();

    return updated[0] ?? null;
  } catch (error) {
    console.error('Database error in updateUserProfile:', error);
    throw new Error('Failed to update user profile.', { cause: error });
  }
}

export async function getOrCreateDailyLog(userId: number, date: string) {
  try {
    const existing = await db
      .select()
      .from(dailyLogs)
      .where(and(eq(dailyLogs.userId, userId), eq(dailyLogs.date, date)))
      .limit(1);

    if (existing.length > 0) {
      return existing[0];
    }

    const inserted = await db
      .insert(dailyLogs)
      .values({
        userId,
        date,
        nekAmaalJson: DEFAULT_NEK_AMAAL,
      })
      .onConflictDoNothing()
      .returning();

    if (inserted.length > 0) {
      return inserted[0];
    }

    const fallback = await db
      .select()
      .from(dailyLogs)
      .where(and(eq(dailyLogs.userId, userId), eq(dailyLogs.date, date)))
      .limit(1);

    return fallback[0];
  } catch (error) {
    console.error('Database error in getOrCreateDailyLog:', error);
    throw new Error('Failed to load daily amaal record.', { cause: error });
  }
}

export async function upsertDailyLog(userId: number, payload: DailyLogPayload) {
  try {
    const now = new Date();
    const submittedAt = payload.honestSubmitted ? now : null;

    const result = await db
      .insert(dailyLogs)
      .values({
        userId,
        date: payload.date,
        fajr: payload.fajr,
        zuhr: payload.zuhr,
        asr: payload.asr,
        maghrib: payload.maghrib,
        isha: payload.isha,
        tahajjud: payload.tahajjud,
        ishraq: payload.ishraq,
        chasht: payload.chasht,
        awwabin: payload.awwabin,
        morningAzkaar: payload.morningAzkaar,
        eveningAzkaar: payload.eveningAzkaar,
        roza: payload.roza,
        rozaType: payload.rozaType.slice(0, 20),
        quranPages: Math.max(0, Math.min(604, payload.quranPages)),
        quranRuku: Math.max(0, Math.min(558, payload.quranRuku)),
        quranMinutes: Math.max(0, Math.min(1440, payload.quranMinutes)),
        quranLastSurah: payload.quranLastSurah.slice(0, 120),
        dailyTaleem: payload.dailyTaleem,
        taleemMinutes: Math.max(0, Math.min(600, payload.taleemMinutes)),
        taleemTopic: payload.taleemTopic.slice(0, 140),
        quranHalqa: payload.quranHalqa,
        halqaNotes: payload.halqaNotes.slice(0, 500),
        nekAmaalJson: payload.nekAmaalJson,
        reflectionNote: payload.reflectionNote.slice(0, 1000),
        honestSubmitted: payload.honestSubmitted,
        submittedAt,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: [dailyLogs.userId, dailyLogs.date],
        set: {
          fajr: payload.fajr,
          zuhr: payload.zuhr,
          asr: payload.asr,
          maghrib: payload.maghrib,
          isha: payload.isha,
          tahajjud: payload.tahajjud,
          ishraq: payload.ishraq,
          chasht: payload.chasht,
          awwabin: payload.awwabin,
          morningAzkaar: payload.morningAzkaar,
          eveningAzkaar: payload.eveningAzkaar,
          roza: payload.roza,
          rozaType: payload.rozaType.slice(0, 20),
          quranPages: Math.max(0, Math.min(604, payload.quranPages)),
          quranRuku: Math.max(0, Math.min(558, payload.quranRuku)),
          quranMinutes: Math.max(0, Math.min(1440, payload.quranMinutes)),
          quranLastSurah: payload.quranLastSurah.slice(0, 120),
          dailyTaleem: payload.dailyTaleem,
          taleemMinutes: Math.max(0, Math.min(600, payload.taleemMinutes)),
          taleemTopic: payload.taleemTopic.slice(0, 140),
          quranHalqa: payload.quranHalqa,
          halqaNotes: payload.halqaNotes.slice(0, 500),
          nekAmaalJson: payload.nekAmaalJson,
          reflectionNote: payload.reflectionNote.slice(0, 1000),
          honestSubmitted: payload.honestSubmitted,
          submittedAt: payload.honestSubmitted ? now : undefined,
          updatedAt: now,
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error('Database error in upsertDailyLog:', error);
    throw new Error('Failed to save daily amaal log.', { cause: error });
  }
}

export async function getUserHistory(userId: number, limitCount = 60) {
  try {
    return await db
      .select()
      .from(dailyLogs)
      .where(eq(dailyLogs.userId, userId))
      .orderBy(desc(dailyLogs.date))
      .limit(limitCount);
  } catch (error) {
    console.error('Database error in getUserHistory:', error);
    throw new Error('Failed to retrieve past days history.', { cause: error });
  }
}

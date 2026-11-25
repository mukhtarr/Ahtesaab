export type FarzStatus = 'pending' | 'jamaat' | 'ontime' | 'qaza' | 'missed';
export type RozaType = 'sunnah' | 'qaza';

export type FarzKey = 'fajr' | 'zuhr' | 'asr' | 'maghrib' | 'isha';
export type NafilKey = 'tahajjud' | 'ishraq' | 'chasht' | 'awwabin';

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

export interface UserProfile {
  id: number;
  uid: string;
  email: string;
  displayName: string;
  city: string;
  azaanVolume: number;
  azaanEnabled: boolean;
  sleepReminderTime: string;
  dailyQuranGoalPages: number;
  prayerTimesJson: PrayerSchedule;
  createdAt?: string;
}

export interface DailyLog {
  id?: number;
  userId?: number;
  date: string;
  fajr: FarzStatus;
  zuhr: FarzStatus;
  asr: FarzStatus;
  maghrib: FarzStatus;
  isha: FarzStatus;
  tahajjud: boolean;
  ishraq: boolean;
  chasht: boolean;
  awwabin: boolean;
  morningAzkaar: boolean;
  eveningAzkaar: boolean;
  roza: boolean;
  rozaType: RozaType;
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
  submittedAt?: string | null;
  updatedAt?: string;
}

export interface ActiveReminder {
  id: string;
  type: 'azaan' | 'azkaar' | 'nafil' | 'sleep';
  title: string;
  subtitle: string;
  prayerKey?: FarzKey;
  time: string;
}

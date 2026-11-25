import type { PrayerSchedule } from '../types/amaal';

export interface DetectedLocationSchedule {
  city: string;
  schedule: PrayerSchedule;
}

export const POPULAR_CITIES: Array<{ city: string; country: string }> = [
  { city: 'Makkah', country: 'Saudi Arabia' },
  { city: 'Madinah', country: 'Saudi Arabia' },
  { city: 'Karachi', country: 'Pakistan' },
  { city: 'Lahore', country: 'Pakistan' },
  { city: 'Islamabad', country: 'Pakistan' },
  { city: 'Delhi', country: 'India' },
  { city: 'Mumbai', country: 'India' },
  { city: 'Hyderabad', country: 'India' },
  { city: 'Dhaka', country: 'Bangladesh' },
  { city: 'Istanbul', country: 'Turkey' },
  { city: 'Cairo', country: 'Egypt' },
  { city: 'Dubai', country: 'UAE' },
  { city: 'London', country: 'UK' },
  { city: 'Toronto', country: 'Canada' },
  { city: 'New York', country: 'USA' },
  { city: 'Kuala Lumpur', country: 'Malaysia' },
];

function cleanHHMM(raw?: string, fallback = '05:00'): string {
  if (!raw) return fallback;
  const match = raw.match(/(\d{1,2}):(\d{2})/);
  if (!match) return fallback;
  return `${match[1].padStart(2, '0')}:${match[2]}`;
}

function shiftMinutes(hhmm: string, delta: number): string {
  const [hStr, mStr] = hhmm.split(':');
  const total = Number(hStr || 0) * 60 + Number(mStr || 0) + delta;
  const norm = ((total % 1440) + 1440) % 1440;
  return `${String(Math.floor(norm / 60)).padStart(2, '0')}:${String(norm % 60).padStart(2, '0')}`;
}

function mapAladhanTimings(
  timings: Record<string, string>,
  currentSleepCheck: string,
): PrayerSchedule {
  const fajr = cleanHHMM(timings.Fajr, '05:15');
  const sunrise = cleanHHMM(timings.Sunrise, '06:30');
  const zuhr = cleanHHMM(timings.Dhuhr, '12:30');
  const asr = cleanHHMM(timings.Asr, '16:15');
  const maghrib = cleanHHMM(timings.Maghrib, '18:20');
  const isha = cleanHHMM(timings.Isha, '19:45');
  const tahajjud = cleanHHMM(timings.Lastthird, shiftMinutes(fajr, -75));

  return {
    tahajjud,
    fajr,
    ishraq: shiftMinutes(sunrise, 20),
    chasht: shiftMinutes(sunrise, 90),
    zuhr,
    asr,
    maghrib,
    awwabin: shiftMinutes(maghrib, 15),
    isha,
    sleepCheck: currentSleepCheck || '22:00',
  };
}

export async function detectLocationAndPrayerTimes(
  currentSleepCheck: string,
): Promise<DetectedLocationSchedule> {
  if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
    throw new Error('Location services are not available on this device.');
  }

  const position = await new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      timeout: 12000,
      maximumAge: 300000,
    });
  }).catch((err: GeolocationPositionError) => {
    if (err.code === err.PERMISSION_DENIED) {
      throw new Error('Location permission denied. Enable GPS or choose a city below.');
    }
    if (err.code === err.TIMEOUT) {
      throw new Error('Location lookup timed out. Please try again or pick a city.');
    }
    throw new Error('Could not read GPS location. Please choose a city manually.');
  });

  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  const [geoResult, timingsResult] = await Promise.allSettled([
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&accept-language=en`,
    ).then((r) => (r.ok ? r.json() : null)),
    fetch(
      `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=1`,
    ).then((r) => (r.ok ? r.json() : null)),
  ]);

  let resolvedCity = '';
  if (geoResult.status === 'fulfilled' && geoResult.value?.address) {
    const addr = geoResult.value.address as Record<string, string>;
    const locality =
      addr.city ||
      addr.town ||
      addr.village ||
      addr.municipality ||
      addr.county ||
      addr.state_district ||
      addr.state ||
      '';
    const country = addr.country || '';
    resolvedCity = [locality, country].filter(Boolean).join(', ');
  }

  if (!resolvedCity && timingsResult.status === 'fulfilled') {
    const tz = timingsResult.value?.data?.meta?.timezone as string | undefined;
    if (tz && tz.includes('/')) {
      resolvedCity = tz.split('/').pop()!.replace(/_/g, ' ');
    }
  }

  if (!resolvedCity) {
    resolvedCity = `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
  }

  if (timingsResult.status !== 'fulfilled' || !timingsResult.value?.data?.timings) {
    throw new Error(`Detected ${resolvedCity}, but could not load prayer times.`);
  }

  const schedule = mapAladhanTimings(
    timingsResult.value.data.timings as Record<string, string>,
    currentSleepCheck,
  );

  return { city: resolvedCity, schedule };
}

export async function fetchPrayerTimesForCity(
  cityName: string,
  countryName: string | undefined,
  currentSleepCheck: string,
): Promise<PrayerSchedule> {
  const queryCity = encodeURIComponent(cityName.trim());
  const queryCountry = encodeURIComponent((countryName || '').trim());
  const url = queryCountry
    ? `https://api.aladhan.com/v1/timingsByCity?city=${queryCity}&country=${queryCountry}&method=1`
    : `https://api.aladhan.com/v1/timingsByAddress?address=${queryCity}&method=1`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Could not find prayer times for that city.');
  }
  const json = (await res.json()) as { data?: { timings?: Record<string, string> } };
  if (!json.data?.timings) {
    throw new Error('Prayer schedule unavailable for that city.');
  }
  return mapAladhanTimings(json.data.timings, currentSleepCheck);
}

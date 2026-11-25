import type { User } from 'firebase/auth';
import type { DailyLog, UserProfile } from '../types/amaal';

async function authFetch<T>(
  user: User,
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const token = await user.getIdToken();
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    let message = 'Request failed';
    try {
      const errBody = (await res.json()) as { error?: string };
      if (errBody?.error) message = errBody.error;
    } catch {
      // ignore json parse error
    }
    throw new Error(message);
  }

  return (await res.json()) as T;
}

export async function fetchProfile(user: User): Promise<UserProfile> {
  const data = await authFetch<{ user: UserProfile }>(user, '/api/profile');
  return data.user;
}

export async function updateProfile(
  user: User,
  payload: Partial<UserProfile>,
): Promise<UserProfile> {
  const data = await authFetch<{ user: UserProfile }>(user, '/api/profile', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  return data.user;
}

export async function fetchDailyLog(user: User, date: string): Promise<DailyLog> {
  const data = await authFetch<{ log: DailyLog }>(user, `/api/daily/${date}`);
  return data.log;
}

export async function saveDailyLog(user: User, log: DailyLog): Promise<DailyLog> {
  const data = await authFetch<{ log: DailyLog }>(user, `/api/daily/${log.date}`, {
    method: 'PUT',
    body: JSON.stringify(log),
  });
  return data.log;
}

export async function fetchHistory(user: User): Promise<DailyLog[]> {
  const data = await authFetch<{ logs: DailyLog[] }>(user, '/api/history');
  return data.logs;
}

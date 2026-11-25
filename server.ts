import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import http from 'node:http';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import {
  getOrCreateDailyLog,
  getOrCreateUser,
  getUserHistory,
  updateUserProfile,
  upsertDailyLog,
} from './src/db/amaalRepository.ts';
import { requireAuth, type AuthRequest } from './src/middleware/auth.ts';

const PORT = Number(process.env.PORT) || 3000;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const VALID_FARZ_STATUSES = new Set(['pending', 'jamaat', 'ontime', 'qaza', 'missed']);

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true });
  });

  app.get('/api/profile', requireAuth, async (req: AuthRequest, res: Response) => {
    try {
      const uid = req.user?.uid;
      const email = req.user?.email || '';
      const name = typeof req.user?.name === 'string' ? req.user.name : undefined;

      if (!uid) {
        res.status(401).json({ error: 'Invalid user identity' });
        return;
      }

      const user = await getOrCreateUser(uid, email, name);
      res.json({ user });
    } catch (error) {
      console.error('GET /api/profile failed:', error);
      res.status(500).json({ error: 'Unable to load profile right now.' });
    }
  });

  app.put('/api/profile', requireAuth, async (req: AuthRequest, res: Response) => {
    try {
      const uid = req.user?.uid;
      const email = req.user?.email || '';
      if (!uid) {
        res.status(401).json({ error: 'Invalid user identity' });
        return;
      }

      await getOrCreateUser(uid, email);

      const body = req.body ?? {};
      const updated = await updateUserProfile(uid, {
        displayName: typeof body.displayName === 'string' ? body.displayName : undefined,
        city: typeof body.city === 'string' ? body.city : undefined,
        azaanVolume: typeof body.azaanVolume === 'number' ? body.azaanVolume : undefined,
        azaanEnabled: typeof body.azaanEnabled === 'boolean' ? body.azaanEnabled : undefined,
        sleepReminderTime:
          typeof body.sleepReminderTime === 'string' ? body.sleepReminderTime : undefined,
        dailyQuranGoalPages:
          typeof body.dailyQuranGoalPages === 'number' ? body.dailyQuranGoalPages : undefined,
        prayerTimesJson:
          body.prayerTimesJson && typeof body.prayerTimesJson === 'object'
            ? body.prayerTimesJson
            : undefined,
      });

      res.json({ user: updated });
    } catch (error) {
      console.error('PUT /api/profile failed:', error);
      res.status(500).json({ error: 'Unable to update profile.' });
    }
  });

  app.get('/api/daily/:date', requireAuth, async (req: AuthRequest, res: Response) => {
    try {
      const dateParam = String(req.params.date || '');
      if (!DATE_REGEX.test(dateParam)) {
        res.status(400).json({ error: 'Invalid date format. Expected YYYY-MM-DD.' });
        return;
      }

      const uid = req.user?.uid;
      const email = req.user?.email || '';
      const name = typeof req.user?.name === 'string' ? req.user.name : undefined;
      if (!uid) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const user = await getOrCreateUser(uid, email, name);
      const log = await getOrCreateDailyLog(user.id, dateParam);
      res.json({ log });
    } catch (error) {
      console.error('GET /api/daily/:date failed:', error);
      res.status(500).json({ error: 'Unable to load daily log.' });
    }
  });

  app.put('/api/daily/:date', requireAuth, async (req: AuthRequest, res: Response) => {
    try {
      const dateParam = String(req.params.date || '');
      if (!DATE_REGEX.test(dateParam)) {
        res.status(400).json({ error: 'Invalid date format. Expected YYYY-MM-DD.' });
        return;
      }

      const uid = req.user?.uid;
      const email = req.user?.email || '';
      const name = typeof req.user?.name === 'string' ? req.user.name : undefined;
      if (!uid) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const user = await getOrCreateUser(uid, email, name);
      const b = req.body ?? {};

      const sanitizeStatus = (val: unknown) =>
        typeof val === 'string' && VALID_FARZ_STATUSES.has(val) ? val : 'pending';

      const sanitizedNek = Array.isArray(b.nekAmaalJson)
        ? b.nekAmaalJson
            .filter((item: unknown) => item && typeof item === 'object')
            .slice(0, 30)
            .map((item: Record<string, unknown>) => ({
              id: String(item.id || '').slice(0, 50),
              title: String(item.title || '').slice(0, 120),
              completed: Boolean(item.completed),
              count: typeof item.count === 'number' ? Math.max(0, Math.round(item.count)) : undefined,
            }))
        : [];

      const saved = await upsertDailyLog(user.id, {
        date: dateParam,
        fajr: sanitizeStatus(b.fajr),
        zuhr: sanitizeStatus(b.zuhr),
        asr: sanitizeStatus(b.asr),
        maghrib: sanitizeStatus(b.maghrib),
        isha: sanitizeStatus(b.isha),
        tahajjud: Boolean(b.tahajjud),
        ishraq: Boolean(b.ishraq),
        chasht: Boolean(b.chasht),
        awwabin: Boolean(b.awwabin),
        morningAzkaar: Boolean(b.morningAzkaar),
        eveningAzkaar: Boolean(b.eveningAzkaar),
        roza: Boolean(b.roza),
        rozaType:
          b.rozaType === 'qaza' || b.rozaType === 'sunnah' ? b.rozaType : 'sunnah',
        quranPages: Number.isFinite(Number(b.quranPages)) ? Number(b.quranPages) : 0,
        quranRuku: Number.isFinite(Number(b.quranRuku)) ? Number(b.quranRuku) : 0,
        quranMinutes: Number.isFinite(Number(b.quranMinutes)) ? Number(b.quranMinutes) : 0,
        quranLastSurah: typeof b.quranLastSurah === 'string' ? b.quranLastSurah : '',
        dailyTaleem: Boolean(b.dailyTaleem),
        taleemMinutes: Number.isFinite(Number(b.taleemMinutes)) ? Number(b.taleemMinutes) : 0,
        taleemTopic: typeof b.taleemTopic === 'string' ? b.taleemTopic : '',
        quranHalqa: Boolean(b.quranHalqa),
        halqaNotes: typeof b.halqaNotes === 'string' ? b.halqaNotes : '',
        nekAmaalJson: sanitizedNek,
        reflectionNote: typeof b.reflectionNote === 'string' ? b.reflectionNote : '',
        honestSubmitted: Boolean(b.honestSubmitted),
      });

      res.json({ log: saved });
    } catch (error) {
      console.error('PUT /api/daily/:date failed:', error);
      res.status(500).json({ error: 'Unable to save daily log.' });
    }
  });

  app.get('/api/history', requireAuth, async (req: AuthRequest, res: Response) => {
    try {
      const uid = req.user?.uid;
      const email = req.user?.email || '';
      const name = typeof req.user?.name === 'string' ? req.user.name : undefined;
      if (!uid) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const user = await getOrCreateUser(uid, email, name);
      const logs = await getUserHistory(user.id, 90);
      res.json({ logs });
    } catch (error) {
      console.error('GET /api/history failed:', error);
      res.status(500).json({ error: 'Unable to load history.' });
    }
  });

  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        allowedHosts: true,
        ws: { server: httpServer },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Noor Amaal server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});

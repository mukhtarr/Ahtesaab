import type { MuntakhabHadith } from '../data/muntakhabAhadith';

export type ShareLanguageMode = 'all' | 'urdu' | 'english';

export function formatHadithShareText(
  hadith: MuntakhabHadith,
  mode: ShareLanguageMode = 'all',
): string {
  const lines: string[] = [
    `${hadith.chapter} (${hadith.chapterUrdu}) — Hadith #${hadith.hadithNumber}`,
    '',
    hadith.arabic,
  ];

  if ((mode === 'all' || mode === 'urdu') && hadith.urdu) {
    lines.push('', hadith.urdu);
  }

  if ((mode === 'all' || mode === 'english') && hadith.english) {
    lines.push('', hadith.english);
  }

  lines.push(
    '',
    `Narrated by: ${hadith.narrator}`,
    `Source: ${hadith.source}`,
  );

  return lines.join('\n');
}

export function buildWhatsAppShareUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function buildTelegramShareUrl(text: string): string {
  const url = typeof window !== 'undefined' ? window.location.origin : '';
  return `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
}

export function buildEmailShareUrl(hadith: MuntakhabHadith, text: string): string {
  const subject = `Muntakhab Hadith · ${hadith.chapter} (${hadith.source})`;
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
}

export async function copyTextToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback below
    }
  }

  if (typeof document !== 'undefined') {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      const ok = document.execCommand('copy');
      document.body.removeChild(textarea);
      return ok;
    } catch {
      document.body.removeChild(textarea);
      return false;
    }
  }

  return false;
}

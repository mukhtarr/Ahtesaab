export type ThemeColorId =
  | 'emerald'
  | 'sapphire'
  | 'gold'
  | 'indigo'
  | 'teal'
  | 'rose';

export interface ThemePalette {
  id: ThemeColorId;
  name: string;
  primary: string;
  primaryTo: string;
  primaryDark: string;
  urduDark: string;
}

export const THEME_STORAGE_KEY = 'noor-theme-color';

export const THEME_PALETTES: ThemePalette[] = [
  {
    id: 'emerald',
    name: 'Emerald Masjid',
    primary: '#0D5C46',
    primaryTo: '#0F766E',
    primaryDark: '#34D399',
    urduDark: '#6EE7B7',
  },
  {
    id: 'sapphire',
    name: 'Medina Sapphire',
    primary: '#1D4ED8',
    primaryTo: '#0284C7',
    primaryDark: '#60A5FA',
    urduDark: '#93C5FD',
  },
  {
    id: 'gold',
    name: 'Kaaba Gold',
    primary: '#9A6700',
    primaryTo: '#B45309',
    primaryDark: '#FBBF24',
    urduDark: '#FDE68A',
  },
  {
    id: 'indigo',
    name: 'Royal Indigo',
    primary: '#6D28D9',
    primaryTo: '#4338CA',
    primaryDark: '#A78BFA',
    urduDark: '#C4B5FD',
  },
  {
    id: 'teal',
    name: 'Ocean Teal',
    primary: '#0F766E',
    primaryTo: '#0E7490',
    primaryDark: '#2DD4BF',
    urduDark: '#5EEAD4',
  },
  {
    id: 'rose',
    name: 'Damask Rose',
    primary: '#BE123C',
    primaryTo: '#E11D48',
    primaryDark: '#FB7185',
    urduDark: '#FDA4AF',
  },
];

export function getSavedThemeColor(): ThemeColorId {
  if (typeof window === 'undefined') return 'emerald';
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeColorId | null;
    if (raw && THEME_PALETTES.some((p) => p.id === raw)) {
      return raw;
    }
  } catch {
    // ignore storage errors
  }
  return 'emerald';
}

export function getThemePalette(id: ThemeColorId): ThemePalette {
  return THEME_PALETTES.find((p) => p.id === id) ?? THEME_PALETTES[0];
}

export function applyThemeColor(id: ThemeColorId): ThemePalette {
  const palette = getThemePalette(id);
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', palette.primary);
    root.style.setProperty('--theme-primary-to', palette.primaryTo);
    root.style.setProperty('--theme-primary-dark', palette.primaryDark);
    root.style.setProperty('--theme-urdu-dark', palette.urduDark);

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', palette.primary);
    }
  }
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, palette.id);
    } catch {
      // ignore storage errors
    }
  }
  return palette;
}

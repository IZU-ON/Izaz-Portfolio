import { PortfolioData, RecentActivity, VisualSettings, ThemeMode } from '../types';
import { INITIAL_PORTFOLIO_DATA } from '../data/initialData';

const STORAGE_KEY = 'IZAZ_PORTFOLIO_DATA_V1';
const VISUAL_SETTINGS_KEY = 'IZAZ_PORTFOLIO_VISUAL_SETTINGS_V1';

export const DEFAULT_VISUAL_SETTINGS: VisualSettings = {
  filter: 'amber',
  animationSpeed: 'normal',
  lightIntensity: 1.2,
  hireMeMode: false,
  customCursor: false,
  shadowsEnabled: true,
  autoRotateSpanner: false,
};

const THEME_STORAGE_KEY = 'IZAZ_PORTFOLIO_THEME_MODE';

export function getStoredThemeMode(): ThemeMode {
  // Check URL param first so shared links immediately adopt the shared theme!
  if (typeof window !== 'undefined') {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlTheme = params.get('theme');
      if (urlTheme) {
        return urlTheme as ThemeMode;
      }
    } catch (e) {
      // ignore
    }
  }

  if (typeof window === 'undefined') return 'emerald';
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored) {
      return stored as ThemeMode;
    }
  } catch (e) {
    // ignore
  }
  return 'emerald';
}

export function saveStoredThemeMode(mode: ThemeMode): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
    // Sync URL param without refreshing the page so copying the browser URL preserves the theme
    const url = new URL(window.location.href);
    url.searchParams.set('theme', mode);
    window.history.replaceState({}, '', url.toString());
  } catch (e) {
    // ignore
  }
}

export function getShareableThemeURL(mode: ThemeMode): string {
  if (typeof window === 'undefined') return '';
  try {
    const url = new URL(window.location.href);
    url.searchParams.set('theme', mode);
    return url.toString();
  } catch (e) {
    return window.location.href;
  }
}

export function getStoredPortfolioData(): PortfolioData {
  if (typeof window === 'undefined') return INITIAL_PORTFOLIO_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PORTFOLIO_DATA));
      return INITIAL_PORTFOLIO_DATA;
    }
    const parsed = JSON.parse(raw);
    // Ensure all critical sections exist if older format
    const initialCerts = (INITIAL_PORTFOLIO_DATA.about?.certifications || []).map((c, i) => ({
      id: 'cert-' + (i + 1),
      name: c.name,
      issuer: c.issuer,
      date: c.date,
      link: 'https://github.com/izazahamad',
      category: 'AI / Engineering',
    }));

    return {
      ...INITIAL_PORTFOLIO_DATA,
      ...parsed,
      profile: { ...INITIAL_PORTFOLIO_DATA.profile, ...(parsed.profile || {}) },
      about: { ...INITIAL_PORTFOLIO_DATA.about, ...(parsed.about || {}) },
      resume: { ...INITIAL_PORTFOLIO_DATA.resume, ...(parsed.resume || {}) },
      experience: (parsed.experience && Array.isArray(parsed.experience) && parsed.experience.length > 0)
        ? parsed.experience
        : INITIAL_PORTFOLIO_DATA.experience,
      education: (parsed.education && Array.isArray(parsed.education) && parsed.education.length > 0)
        ? parsed.education
        : INITIAL_PORTFOLIO_DATA.education,
      certifications: (parsed.certifications && Array.isArray(parsed.certifications) && parsed.certifications.length > 0)
        ? parsed.certifications
        : initialCerts,
      team: (parsed.team && Array.isArray(parsed.team) && parsed.team.length > 0)
        ? parsed.team
        : INITIAL_PORTFOLIO_DATA.team,
      software: (parsed.software && Array.isArray(parsed.software) && parsed.software.length > 0)
        ? parsed.software
        : INITIAL_PORTFOLIO_DATA.software,
      events: (parsed.events && Array.isArray(parsed.events) && parsed.events.length > 0)
        ? parsed.events
        : INITIAL_PORTFOLIO_DATA.events,
      recentActivities: (parsed.recentActivities && Array.isArray(parsed.recentActivities) && parsed.recentActivities.length > 0)
        ? parsed.recentActivities
        : INITIAL_PORTFOLIO_DATA.recentActivities,
    };
  } catch (err) {
    console.warn('Error reading portfolio data from storage, falling back to initial data', err);
    return INITIAL_PORTFOLIO_DATA;
  }
}

export const loadPortfolioData = getStoredPortfolioData;
export const resetToInitialData = resetPortfolioData;
export const exportPortfolioDataJSON = exportPortfolioJSON;

export function savePortfolioData(data: PortfolioData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save portfolio data to localStorage', err);
  }
}

export function resetPortfolioData(): PortfolioData {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PORTFOLIO_DATA));
  }
  return INITIAL_PORTFOLIO_DATA;
}

export function logActivity(
  data: PortfolioData,
  type: RecentActivity['type'],
  title: string,
  description: string
): PortfolioData {
  const newActivity: RecentActivity = {
    id: 'act-' + Date.now(),
    type,
    title,
    description,
    timestamp: new Date().toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  };

  const updatedActivities = [newActivity, ...(data.recentActivities || [])].slice(0, 15);
  const updatedData: PortfolioData = {
    ...data,
    recentActivities: updatedActivities
  };
  savePortfolioData(updatedData);
  return updatedData;
}

export function getStoredVisualSettings(): VisualSettings {
  if (typeof window === 'undefined') return DEFAULT_VISUAL_SETTINGS;
  try {
    const raw = localStorage.getItem(VISUAL_SETTINGS_KEY);
    if (!raw) return DEFAULT_VISUAL_SETTINGS;
    return { ...DEFAULT_VISUAL_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_VISUAL_SETTINGS;
  }
}

export function saveStoredVisualSettings(settings: VisualSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(VISUAL_SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save visual settings', e);
  }
}

export function exportPortfolioJSON(data: PortfolioData): void {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `IZAZ_AHAMAD_PORTFOLIO_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

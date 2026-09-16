import { ThemeMode } from '../types';

export interface ThemeConfig {
  id: ThemeMode;
  name: string;
  subtitle: string;
  previewColor: string;
  accentHex: string;
  isLight: boolean;
  bg: string;
  surfaceBg: string;
  cardBg: string;
  cardBorder: string;
  cardHoverBorder: string;
  textPrimary: string;
  textMuted: string;
  accentText: string;
  accentBg: string;
  accentBorder: string;
  accentSolid: string;
  accentSolidText: string;
  timelineLine: string;
  timelineDot: string;
  timelinePulse: string;
  glow: string;
  selectionClass: string;
}

export const THEMES_LIST: ThemeConfig[] = [
  {
    id: 'emerald',
    name: 'Dark Green',
    subtitle: 'Dark slate background with fresh green highlights',
    previewColor: '#10b981',
    accentHex: '#10b981',
    isLight: false,
    bg: 'bg-[#070b10]',
    surfaceBg: 'bg-[#0b1017]',
    cardBg: 'bg-[#0e141f]/90',
    cardBorder: 'border-slate-800/80',
    cardHoverBorder: 'hover:border-emerald-500/40',
    textPrimary: 'text-slate-100',
    textMuted: 'text-slate-400',
    accentText: 'text-emerald-400',
    accentBg: 'bg-emerald-500/10',
    accentBorder: 'border-emerald-500/30',
    accentSolid: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950',
    accentSolidText: 'text-slate-950',
    timelineLine: 'border-emerald-500/30',
    timelineDot: 'bg-emerald-500',
    timelinePulse: 'bg-emerald-400',
    glow: 'bg-emerald-500/10',
    selectionClass: 'selection:bg-emerald-500 selection:text-slate-950',
  },
  {
    id: 'cobalt',
    name: 'Dark Blue',
    subtitle: 'Deep navy background with crisp royal blue highlights',
    previewColor: '#3b82f6',
    accentHex: '#3b82f6',
    isLight: false,
    bg: 'bg-[#0b1120]',
    surfaceBg: 'bg-[#10192e]',
    cardBg: 'bg-[#131f38]/90',
    cardBorder: 'border-blue-900/50',
    cardHoverBorder: 'hover:border-blue-500/50',
    textPrimary: 'text-slate-100',
    textMuted: 'text-slate-300',
    accentText: 'text-blue-400',
    accentBg: 'bg-blue-500/15',
    accentBorder: 'border-blue-500/30',
    accentSolid: 'bg-blue-600 hover:bg-blue-500 text-white',
    accentSolidText: 'text-white',
    timelineLine: 'border-blue-500/40',
    timelineDot: 'bg-blue-500',
    timelinePulse: 'bg-blue-400',
    glow: 'bg-blue-500/15',
    selectionClass: 'selection:bg-blue-600 selection:text-white',
  },
  {
    id: 'violet',
    name: 'Dark Purple',
    subtitle: 'Dark background with vibrant purple highlights',
    previewColor: '#a855f7',
    accentHex: '#a855f7',
    isLight: false,
    bg: 'bg-[#090614]',
    surfaceBg: 'bg-[#100b24]',
    cardBg: 'bg-[#140e2d]/90',
    cardBorder: 'border-purple-950/80',
    cardHoverBorder: 'hover:border-purple-500/40',
    textPrimary: 'text-slate-100',
    textMuted: 'text-slate-400',
    accentText: 'text-purple-400',
    accentBg: 'bg-purple-500/10',
    accentBorder: 'border-purple-500/30',
    accentSolid: 'bg-purple-500 hover:bg-purple-400 text-white',
    accentSolidText: 'text-white',
    timelineLine: 'border-purple-500/30',
    timelineDot: 'bg-purple-500',
    timelinePulse: 'bg-purple-400',
    glow: 'bg-purple-500/10',
    selectionClass: 'selection:bg-purple-500 selection:text-white',
  },
  {
    id: 'glacier',
    name: 'Ice Cyan',
    subtitle: 'Cool dark background with bright cyan highlights',
    previewColor: '#06b6d4',
    accentHex: '#06b6d4',
    isLight: false,
    bg: 'bg-[#060c11]',
    surfaceBg: 'bg-[#0a131b]',
    cardBg: 'bg-[#0d1a24]/90',
    cardBorder: 'border-cyan-950/80',
    cardHoverBorder: 'hover:border-cyan-500/40',
    textPrimary: 'text-slate-100',
    textMuted: 'text-slate-400',
    accentText: 'text-cyan-400',
    accentBg: 'bg-cyan-500/10',
    accentBorder: 'border-cyan-500/30',
    accentSolid: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950',
    accentSolidText: 'text-slate-950',
    timelineLine: 'border-cyan-500/30',
    timelineDot: 'bg-cyan-500',
    timelinePulse: 'bg-cyan-400',
    glow: 'bg-cyan-500/10',
    selectionClass: 'selection:bg-cyan-500 selection:text-slate-950',
  },
  {
    id: 'crimson',
    name: 'Ruby Red',
    subtitle: 'Deep dark background with bold crimson highlights',
    previewColor: '#f43f5e',
    accentHex: '#f43f5e',
    isLight: false,
    bg: 'bg-[#0d0609]',
    surfaceBg: 'bg-[#160910]',
    cardBg: 'bg-[#1d0c15]/90',
    cardBorder: 'border-rose-950/80',
    cardHoverBorder: 'hover:border-rose-500/40',
    textPrimary: 'text-slate-100',
    textMuted: 'text-slate-400',
    accentText: 'text-rose-400',
    accentBg: 'bg-rose-500/10',
    accentBorder: 'border-rose-500/30',
    accentSolid: 'bg-rose-500 hover:bg-rose-400 text-white',
    accentSolidText: 'text-white',
    timelineLine: 'border-rose-500/30',
    timelineDot: 'bg-rose-500',
    timelinePulse: 'bg-rose-400',
    glow: 'bg-rose-500/10',
    selectionClass: 'selection:bg-rose-500 selection:text-white',
  },
  {
    id: 'copper',
    name: 'Warm Amber',
    subtitle: 'Dark titanium background with warm amber highlights',
    previewColor: '#f97316',
    accentHex: '#f97316',
    isLight: false,
    bg: 'bg-[#0c0a09]',
    surfaceBg: 'bg-[#14100e]',
    cardBg: 'bg-[#1a1412]/90',
    cardBorder: 'border-orange-950/80',
    cardHoverBorder: 'hover:border-orange-500/40',
    textPrimary: 'text-slate-100',
    textMuted: 'text-slate-400',
    accentText: 'text-orange-400',
    accentBg: 'bg-orange-500/10',
    accentBorder: 'border-orange-500/30',
    accentSolid: 'bg-orange-500 hover:bg-orange-400 text-slate-950',
    accentSolidText: 'text-slate-950',
    timelineLine: 'border-orange-500/30',
    timelineDot: 'bg-orange-500',
    timelinePulse: 'bg-orange-400',
    glow: 'bg-orange-500/10',
    selectionClass: 'selection:bg-orange-500 selection:text-slate-950',
  },
  {
    id: 'paper',
    name: 'Clean Light',
    subtitle: 'Bright clean white background with crisp blue highlights',
    previewColor: '#2563eb',
    accentHex: '#2563eb',
    isLight: true,
    bg: 'bg-[#f8fafc]',
    surfaceBg: 'bg-[#f1f5f9]',
    cardBg: 'bg-white',
    cardBorder: 'border-slate-200/90',
    cardHoverBorder: 'hover:border-blue-500/50',
    textPrimary: 'text-slate-950',
    textMuted: 'text-slate-600',
    accentText: 'text-blue-600',
    accentBg: 'bg-blue-500/10',
    accentBorder: 'border-blue-500/30',
    accentSolid: 'bg-blue-600 hover:bg-blue-700 text-white',
    accentSolidText: 'text-white',
    timelineLine: 'border-blue-300',
    timelineDot: 'bg-blue-600',
    timelinePulse: 'bg-blue-400',
    glow: 'bg-blue-500/5',
    selectionClass: 'selection:bg-blue-600 selection:text-white',
  },
  {
    id: 'mono',
    name: 'Classic Dark',
    subtitle: 'Pure dark black background with sharp white highlights',
    previewColor: '#f8fafc',
    accentHex: '#f8fafc',
    isLight: false,
    bg: 'bg-[#050507]',
    surfaceBg: 'bg-[#0d0d12]',
    cardBg: 'bg-[#111118]/90',
    cardBorder: 'border-zinc-800',
    cardHoverBorder: 'hover:border-zinc-500',
    textPrimary: 'text-zinc-100',
    textMuted: 'text-zinc-400',
    accentText: 'text-zinc-100',
    accentBg: 'bg-zinc-100/10',
    accentBorder: 'border-zinc-400/40',
    accentSolid: 'bg-zinc-100 hover:bg-white text-zinc-950',
    accentSolidText: 'text-zinc-950',
    timelineLine: 'border-zinc-700',
    timelineDot: 'bg-zinc-100',
    timelinePulse: 'bg-white',
    glow: 'bg-zinc-500/10',
    selectionClass: 'selection:bg-zinc-100 selection:text-zinc-950',
  },
];

export function getThemeConfig(mode: ThemeMode, systemIsDark = true): ThemeConfig {
  let effectiveId: ThemeMode = mode;
  if (mode === 'system') {
    effectiveId = systemIsDark ? 'emerald' : 'paper';
  } else if (mode === 'dark') {
    effectiveId = 'emerald';
  } else if (mode === 'light') {
    effectiveId = 'paper';
  }

  const found = THEMES_LIST.find((t) => t.id === effectiveId);
  return found || THEMES_LIST[0]; // fallback to Obsidian Emerald
}

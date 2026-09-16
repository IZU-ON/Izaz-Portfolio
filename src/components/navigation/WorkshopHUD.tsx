import React, { useState, useEffect, useRef } from 'react';
import {
  Home,
  Briefcase,
  GraduationCap,
  Layers,
  Code2,
  Mail,
  Lock,
  Menu,
  X,
  Palette,
  Check,
  Edit2,
  Calendar,
  Share2,
} from 'lucide-react';
import { ThemeMode } from '../../types';
import { THEMES_LIST, ThemeConfig } from '../../utils/theme';
import { ScrambleText } from '../common/ScrambleText';
import { getShareableThemeURL } from '../../utils/storage';

interface WorkshopHUDProps {
  onOpenAdminAuth: () => void;
  authorName: string;
  tagline?: string;
  themeMode: ThemeMode;
  onSelectTheme: (theme: ThemeMode) => void;
  onCycleTheme?: () => void;
  themeConfig?: ThemeConfig;
  isLight?: boolean;
  isAdmin?: boolean;
}

export const WorkshopHUD: React.FC<WorkshopHUDProps> = ({
  onOpenAdminAuth,
  authorName,
  tagline = 'AI & SYSTEMS CRAFTSMAN',
  themeMode,
  onSelectTheme,
  themeConfig,
  isLight = false,
  isAdmin = false,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [copiedShareLink, setCopiedShareLink] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close theme menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node)) {
        setThemeMenuOpen(false);
      }
    };
    if (themeMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [themeMenuOpen]);

  // Complete navigation links with Education and Activities & Events tabs
  const navLinks = [
    { href: '#home', label: 'Home', icon: Home },
    { href: '#experience', label: 'Experience', icon: Briefcase },
    { href: '#education', label: 'Education', icon: GraduationCap },
    { href: '#projects', label: 'Projects', icon: Layers },
    { href: '#activities', label: 'Activities & Events', icon: Calendar },
    { href: '#software', label: 'Software & Stack', icon: Code2 },
    { href: '#contact', label: 'Contact', icon: Mail },
  ];

  const currentTheme = THEMES_LIST.find((t) => t.id === themeMode) || THEMES_LIST[0];

  const accentText = themeConfig?.accentText || (isLight ? 'text-blue-600' : 'text-emerald-400');
  const accentBorder = themeConfig?.accentBorder || (isLight ? 'border-blue-200' : 'border-emerald-500/30');

  const handleCopyShareLink = (modeToShare = themeMode) => {
    const shareUrl = getShareableThemeURL(modeToShare);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopiedShareLink(true);
        setTimeout(() => setCopiedShareLink(false), 2500);
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand & Identity (Top-Left Editable Tagline) */}
        <div className={`flex items-center space-x-3 px-3.5 py-2 rounded-xl transition-all duration-300 ${
          isLight
            ? scrolled
              ? 'bg-white/95 border border-slate-200 shadow-xl backdrop-blur-md'
              : 'bg-white/80 border border-slate-200/80 backdrop-blur-md'
            : scrolled
            ? 'bg-[#0a0e17]/95 border border-slate-800 shadow-xl backdrop-blur-md'
            : 'bg-[#0a0e17]/80 border border-slate-800/80 backdrop-blur-md'
        }`}>
          <a
            href="#home"
            className="flex items-center space-x-2.5 text-left group"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-black text-sm shadow-md transition-colors ${
              themeConfig?.accentSolid || 'bg-emerald-500 text-slate-950'
            }`}>
              IA
            </div>
            <div>
              <div className={`text-xs font-mono font-bold tracking-wider uppercase transition-colors flex items-center space-x-1 ${
                isLight ? 'text-slate-900 group-hover:text-blue-600' : 'text-slate-100 group-hover:text-emerald-400'
              }`}>
                <ScrambleText text={authorName} />
              </div>

              {/* Editable Branding Header Subtitle */}
              <div className="flex items-center space-x-1.5">
                <span className={`text-[10px] font-mono tracking-tight uppercase hidden sm:block ${
                  isLight ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  {tagline}
                </span>

                {isAdmin && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onOpenAdminAuth();
                    }}
                    title="Edit top-left tagline in Admin CMS"
                    className="hidden sm:inline-flex p-0.5 text-slate-400 hover:text-white"
                  >
                    <Edit2 className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>
            </div>
          </a>
        </div>

        {/* Center Desktop Navigation - Professional Minimal Bar */}
        <nav className={`hidden md:flex items-center space-x-1 px-3 py-1.5 rounded-full font-mono text-xs transition-all duration-300 ${
          isLight
            ? scrolled
              ? 'bg-white/95 border border-slate-200 shadow-xl backdrop-blur-md'
              : 'bg-white/80 border border-slate-200/80 backdrop-blur-md'
            : scrolled
            ? 'bg-[#0a0e17]/95 border border-slate-700 shadow-xl backdrop-blur-md'
            : 'bg-[#0a0e17]/80 border border-slate-800/80 backdrop-blur-md'
        }`}>
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full transition-colors ${
                  isLight
                    ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/90'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${accentText}`} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Multi-Theme Switcher + Admin CMS Gate + Mobile Hamburger */}
        <div className="flex items-center space-x-2">

          {/* Theme Palette Switcher Dropdown (8 distinct curated themes) */}
          <div className="relative" ref={themeMenuRef}>
            <button
              onClick={() => setThemeMenuOpen(!themeMenuOpen)}
              title="Select designer theme palette"
              className={`flex items-center space-x-2 px-3 py-2 rounded-xl backdrop-blur-md transition-colors cursor-pointer text-xs font-mono shadow-md ${
                isLight
                  ? 'bg-white/90 border border-slate-200 text-slate-700 hover:border-slate-300'
                  : 'bg-[#0a0e17]/90 border border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <span
                className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                style={{ backgroundColor: currentTheme.previewColor }}
              />
              <Palette className="w-3.5 h-3.5" />
              <span className="capitalize hidden sm:inline">{currentTheme.name}</span>
            </button>

            {/* Themes Popover / Dropdown Menu */}
            {themeMenuOpen && (
              <div className={`absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl shadow-2xl border p-2 z-50 backdrop-blur-xl ${
                isLight
                  ? 'bg-white/95 border-slate-200 shadow-slate-300/60'
                  : 'bg-[#0d131f]/95 border-slate-700 shadow-black/80'
              }`}>
                <div className={`px-3 py-2 border-b flex items-center justify-between text-[11px] font-mono font-bold uppercase tracking-wider ${
                  isLight ? 'border-slate-100 text-slate-500' : 'border-slate-800 text-slate-400'
                }`}>
                  <span>Color Theme ({THEMES_LIST.length} options)</span>
                </div>

                <div className="py-1 space-y-1 max-h-72 overflow-y-auto">
                  {THEMES_LIST.map((t) => {
                    const isSelected = themeMode === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          onSelectTheme(t.id);
                          setThemeMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition-colors text-left cursor-pointer ${
                          isSelected
                            ? isLight
                              ? 'bg-slate-100 font-bold text-slate-950 ring-1 ring-slate-300'
                              : 'bg-slate-800 font-bold text-white ring-1 ring-slate-600'
                            : isLight
                            ? 'text-slate-700 hover:bg-slate-50'
                            : 'text-slate-300 hover:bg-slate-850'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                          <span
                            className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm border border-black/20"
                            style={{ backgroundColor: t.previewColor }}
                          />
                          <div className="min-w-0">
                            <div className="font-semibold truncate">{t.name}</div>
                            <div className={`text-[10px] truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                              {t.subtitle}
                            </div>
                          </div>
                        </div>

                        {isSelected && (
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Share Theme Link Action */}
                <div className={`pt-2 mt-1 border-t px-1 ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
                  <button
                    type="button"
                    onClick={() => handleCopyShareLink(themeMode)}
                    className={`w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      copiedShareLink
                        ? 'bg-emerald-500 text-slate-950 shadow-md'
                        : isLight
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                        : 'bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-700'
                    }`}
                  >
                    {copiedShareLink ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Link with Theme Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share Portfolio with this Theme</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Admin CMS Gate */}
          <button
            onClick={onOpenAdminAuth}
            title="Administrator Portal"
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl backdrop-blur-md transition-colors cursor-pointer text-xs font-mono shadow-md ${
              isLight
                ? 'bg-white/90 border border-slate-200 text-slate-700 hover:text-slate-950'
                : 'bg-[#0a0e17]/90 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Admin</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-xl border backdrop-blur-md transition-colors cursor-pointer ${
              isLight
                ? 'bg-white/90 border-slate-200 text-slate-700'
                : 'bg-[#0a0e17]/90 border-slate-800 text-slate-300'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className={`md:hidden mt-2 p-4 rounded-2xl border shadow-2xl backdrop-blur-xl ${
          isLight
            ? 'bg-white/95 border-slate-200 text-slate-900 shadow-slate-300/50'
            : 'bg-[#0a0e17]/95 border-slate-800 text-white shadow-black/80'
        }`}>
          <div className="flex flex-col space-y-2 font-mono text-sm">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-2.5 p-2.5 rounded-xl transition-colors ${
                    isLight ? 'hover:bg-slate-100' : 'hover:bg-slate-850'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${accentText}`} />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

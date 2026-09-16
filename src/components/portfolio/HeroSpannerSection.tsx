import React from 'react';
import { VisualSettings } from '../../types';
import { WorkshopScene } from '../workshop/WorkshopScene';
import { ArrowDown, Sparkles, Terminal, Wrench, ChevronDown } from 'lucide-react';

interface HeroSpannerSectionProps {
  authorName: string;
  authorTitle: string;
  visualSettings: VisualSettings;
  onOpenAdminAuth: () => void;
  onSpannerBlastTriggered?: () => void;
}

export const HeroSpannerSection: React.FC<HeroSpannerSectionProps> = ({
  authorName,
  authorTitle,
  visualSettings,
  onOpenAdminAuth,
  onSpannerBlastTriggered,
}) => {
  return (
    <section id="hero-spanner" className="relative w-full h-screen min-h-[640px] flex flex-col justify-between overflow-hidden bg-[#07090e]">
      {/* 3D Interactive Rotatable Segmented Chrome Spanner Stage */}
      <div className="absolute inset-0 w-full h-full z-0">
        <WorkshopScene
          visualSettings={visualSettings}
          onOpenAdminAuth={onOpenAdminAuth}
          onSpannerBlastTriggered={onSpannerBlastTriggered}
        />
      </div>

      {/* Top Gradient Overlay to keep text readable */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-[#07090e]/90 via-[#07090e]/50 to-transparent z-10" />

      {/* Bottom Gradient Overlay for smooth transition into next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#07090e] via-[#07090e]/70 to-transparent z-10" />

      {/* Top Spacer for HUD */}
      <div className="h-20" />

      {/* Center Left/Center Floating Overlay (Non-blocking pointer events) */}
      <div className="pointer-events-none relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-8">
        <div className="max-w-xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs uppercase tracking-widest mb-3 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Interactive 3D Kinetic Tool</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-mono drop-shadow-lg">
            {authorName}
          </h1>

          <p className="mt-2 text-base sm:text-xl font-mono text-amber-400 font-bold drop-shadow-md">
            {authorTitle}
          </p>

          <p className="mt-3 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed max-w-md drop-shadow-md">
            Drag to rotate the spanner 360°. Wiggle cursor over the segmented chrome blocks to activate real-time antigravity disturbance physics.
          </p>

          {/* Quick jump action buttons */}
          <div className="pointer-events-auto mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#about"
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs transition-colors shadow-lg shadow-amber-950/50 flex items-center space-x-2"
            >
              <span>Explore About Me</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            <a
              href="#projects"
              className="px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-mono text-xs transition-colors backdrop-blur-sm"
            >
              <span>View Projects</span>
            </a>

            <a
              href="#skills"
              className="px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-mono text-xs transition-colors backdrop-blur-sm"
            >
              <span>Technical Skills</span>
            </a>
          </div>
        </div>
      </div>

      {/* Downward Scroll Cue */}
      <div className="relative z-10 flex flex-col items-center pb-6 pointer-events-none">
        <a
          href="#about"
          className="pointer-events-auto flex flex-col items-center space-y-1 text-slate-400 hover:text-amber-400 transition-colors text-[11px] font-mono"
        >
          <span>Scroll Down for Biography & Showcase</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-amber-400" />
        </a>
      </div>
    </section>
  );
};

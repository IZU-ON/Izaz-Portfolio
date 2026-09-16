import React from 'react';
import { ProfileData } from '../../types';
import { ThemeConfig } from '../../utils/theme';
import { ScrambleText } from '../common/ScrambleText';
import {
  Briefcase,
  GraduationCap,
  Boxes,
  Code2,
  Mail,
  Phone,
  MapPin,
  Camera,
} from 'lucide-react';

interface HeroSectionProps {
  profile: ProfileData;
  onOpenAdminAuth: () => void;
  themeConfig?: ThemeConfig;
  isLight?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onOpenAdminAuth,
  themeConfig,
  isLight = false,
}) => {
  const accentText = themeConfig?.accentText || (isLight ? 'text-blue-600' : 'text-emerald-400');
  const accentBg = themeConfig?.accentBg || (isLight ? 'bg-blue-50' : 'bg-emerald-500/10');
  const accentBorder = themeConfig?.accentBorder || (isLight ? 'border-blue-200' : 'border-emerald-500/30');
  const accentSolid = themeConfig?.accentSolid || (isLight ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950');

  return (
    <section
      id="home"
      className="relative min-h-[85vh] flex flex-col justify-center items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Dynamic ambient background glow matching theme */}
      <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none opacity-20 ${themeConfig?.glow || 'bg-emerald-500/10'}`} />

      {/* Main Content Layout: Centered Middle Picture + Professional Engineering Intro */}
      <div className="relative z-10 w-full flex flex-col items-center text-center">

        {/* Centerpiece: Middle Picture of Izaz Ahamad */}
        <div className="relative mb-8 group">
          <div className={`relative w-48 h-56 sm:w-56 sm:h-64 rounded-2xl overflow-hidden p-1.5 transition-all duration-300 ${
            isLight
              ? 'bg-white/90 border-2 border-slate-300 shadow-xl backdrop-blur-md'
              : 'bg-[#0e1422] border-2 border-slate-700/80 shadow-2xl'
          }`}>
            <img
              src={profile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'}
              alt={profile.name}
              className="w-full h-full object-cover object-top rounded-xl filter contrast-105 group-hover:scale-105 transition-transform duration-500"
              loading="eager"
            />

            {/* Quick overlay button for updating picture in Admin CMS */}
            <button
              onClick={onOpenAdminAuth}
              title="Click to update photo in Admin CMS"
              className={`absolute inset-x-2 bottom-2 py-1.5 px-2.5 rounded-lg bg-black/85 backdrop-blur-md border border-slate-700 text-[11px] font-mono flex items-center justify-center space-x-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity cursor-pointer shadow-lg ${accentText}`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Update Picture</span>
            </button>
          </div>

          {/* Location / ID tag */}
          <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-mono whitespace-nowrap shadow-md ${
            isLight
              ? 'bg-white/95 border border-slate-300 text-slate-800'
              : 'bg-[#0b0f19] border border-slate-700 text-slate-300'
          }`}>
            {profile.location}
          </div>
        </div>

        {/* Executive Headline with Letter Zig-Zagging Hover Scramble */}
        <h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tight font-mono ${
          isLight ? 'text-slate-950' : 'text-white'
        }`}>
          <ScrambleText
            text={profile.name}
            durationMs={2200}
            className="hover:opacity-80 transition-opacity"
            title="Hover to cycle letters"
          />
        </h1>

        <p className={`mt-3 text-lg sm:text-2xl font-mono font-semibold tracking-wide ${accentText}`}>
          {profile.title}
        </p>

        <p className={`mt-4 max-w-2xl text-sm sm:text-base font-sans leading-relaxed ${
          isLight ? 'text-slate-700' : 'text-slate-300'
        }`}>
          {profile.shortIntro || 'Architecting intelligent algorithms, distributed systems, and real-time spatial interfaces with mathematical rigor and clean design.'}
        </p>

        {/* Key Contact Details */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
          {profile.phone && (
            <a
              href={`tel:${profile.phone}`}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border transition-colors ${
                isLight
                  ? 'bg-white/90 border-slate-300 text-slate-800 hover:border-slate-400 shadow-sm'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <Phone className={`w-3.5 h-3.5 ${accentText}`} />
              <span>{profile.phone}</span>
            </a>
          )}

          <a
            href={`mailto:${profile.email}`}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border transition-colors ${
              isLight
                ? 'bg-white/90 border-slate-300 text-slate-800 hover:border-slate-400 shadow-sm'
                : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <Mail className={`w-3.5 h-3.5 ${accentText}`} />
            <span>{profile.email}</span>
          </a>

          <span className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border ${
            isLight
              ? 'bg-white/80 border-slate-200 text-slate-600'
              : 'bg-slate-900/80 border-slate-800 text-slate-400'
          }`}>
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{profile.location}</span>
          </span>
        </div>

        {/* Primary Navigation Jump Links: Experience, Education, Projects, Stack */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
          <a
            href="#experience"
            className={`px-5 py-2.5 rounded-xl font-bold transition-all shadow-md flex items-center space-x-2 cursor-pointer ${accentSolid}`}
          >
            <Briefcase className="w-4 h-4" />
            <span>View Timeline</span>
          </a>

          <a
            href="#education"
            className={`px-5 py-2.5 rounded-xl border transition-colors flex items-center space-x-2 cursor-pointer ${
              isLight
                ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-sm'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-800 hover:border-slate-700'
            }`}
          >
            <GraduationCap className={`w-4 h-4 ${accentText}`} />
            <span>Education</span>
          </a>

          <a
            href="#projects"
            className={`px-5 py-2.5 rounded-xl border transition-colors flex items-center space-x-2 cursor-pointer ${
              isLight
                ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-sm'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-800 hover:border-slate-700'
            }`}
          >
            <Boxes className={`w-4 h-4 ${accentText}`} />
            <span>Projects</span>
          </a>

          <a
            href="#software"
            className={`px-5 py-2.5 rounded-xl border transition-colors flex items-center space-x-2 cursor-pointer ${
              isLight
                ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-sm'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-800 hover:border-slate-700'
            }`}
          >
            <Code2 className={`w-4 h-4 ${accentText}`} />
            <span>Software & Stack</span>
          </a>
        </div>

      </div>
    </section>
  );
};

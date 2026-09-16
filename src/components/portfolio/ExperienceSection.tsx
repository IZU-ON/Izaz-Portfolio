import React, { useState } from 'react';
import { ExperienceItem } from '../../types';
import { ThemeConfig } from '../../utils/theme';
import { ScrambleText } from '../common/ScrambleText';
import {
  Briefcase,
  MapPin,
  ExternalLink,
  Award,
  Calendar,
  Edit2,
  Plus,
  Trash2,
  CheckCircle,
  Zap,
} from 'lucide-react';

interface ExperienceSectionProps {
  experience: ExperienceItem[];
  isAdmin?: boolean;
  onEditExperience?: (item: ExperienceItem) => void;
  onAddExperience?: () => void;
  onDeleteExperience?: (expId: string) => void;
  themeConfig?: ThemeConfig;
  isLight?: boolean;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
  isAdmin = false,
  onEditExperience,
  onAddExperience,
  onDeleteExperience,
  themeConfig,
  isLight = false,
}) => {
  const roles = experience && experience.length > 0 ? experience : [];
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Fallback styling tokens if themeConfig is not passed
  const accentText = themeConfig?.accentText || (isLight ? 'text-blue-600' : 'text-emerald-400');
  const accentBg = themeConfig?.accentBg || (isLight ? 'bg-blue-50' : 'bg-emerald-500/10');
  const accentBorder = themeConfig?.accentBorder || (isLight ? 'border-blue-200' : 'border-emerald-500/30');
  const accentSolid = themeConfig?.accentSolid || (isLight ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950');
  const cardBg = themeConfig?.cardBg || (isLight ? 'bg-white' : 'bg-[#0d131f]/90');
  const cardBorder = themeConfig?.cardBorder || (isLight ? 'border-slate-200/90' : 'border-slate-800');
  const timelineDot = themeConfig?.timelineDot || (isLight ? 'bg-blue-600' : 'bg-emerald-500');
  const timelinePulse = themeConfig?.timelinePulse || (isLight ? 'bg-blue-400' : 'bg-emerald-400');

  return (
    <section id="experience" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full font-mono text-xs uppercase tracking-wider mb-3 ${accentBg} ${accentBorder} ${accentText} border`}>
          <Briefcase className="w-3.5 h-3.5" />
          <span>Chronological Timeline</span>
        </div>

        <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight font-mono ${
          isLight ? 'text-slate-950' : 'text-white'
        }`}>
          <ScrambleText
            text="Professional Experience"
            className="hover:text-emerald-400 transition-colors"
          />
        </h2>

        <p className={`mt-3 text-xs sm:text-sm max-w-xl font-mono ${
          isLight ? 'text-slate-600' : 'text-slate-400'
        }`}>
          Sequential engineering track record — latest production leadership on top, chronologically verified.
        </p>

        {/* Quick Add Role button in Admin mode */}
        {onAddExperience && (
          <div className="mt-4">
            <button
              onClick={onAddExperience}
              className={`inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer shadow-sm ${accentSolid}`}
            >
              <Plus className="w-4 h-4" />
              <span>Add Role to Timeline</span>
            </button>
          </div>
        )}
      </div>

      {/* TIMELINE / FLOW CONTAINER */}
      <div className="relative pl-6 sm:pl-10 md:pl-12">
        {/* Continuous Connecting Timeline Spine Line */}
        <div className={`absolute top-4 bottom-8 left-[11px] sm:left-[19px] md:left-[23px] w-[2px] ${
          isLight ? 'bg-slate-200' : 'bg-slate-800'
        }`} />

        <div className="space-y-12">
          {roles.map((item, index) => {
            const isLatest = index === 0;
            const roleUrl = item.link || item.companyUrl || `https://github.com/izazahamad`;

            // Streamline deliverables to max 3 punchy points to reduce content clutter
            const displayBullets = (item.responsibilities || []).slice(0, 3);

            return (
              <div key={item.id || index} className="relative group">
                {/* Timeline Milestone Node */}
                <div className="absolute -left-[24px] sm:-left-[32px] md:-left-[36px] top-1.5 flex items-center justify-center">
                  {isLatest ? (
                    <div className="relative flex items-center justify-center">
                      <span className={`absolute w-6 h-6 rounded-full opacity-75 animate-ping ${timelinePulse}`} />
                      <div className={`w-4 h-4 rounded-full ${timelineDot} border-4 ${
                        isLight ? 'border-white' : 'border-[#070b10]'
                      } shadow-md`} />
                    </div>
                  ) : (
                    <div className={`w-3.5 h-3.5 rounded-full ${
                      isLight ? 'bg-slate-300 border-2 border-white' : 'bg-slate-700 border-2 border-[#070b10]'
                    } group-hover:scale-125 transition-transform`} />
                  )}
                </div>

                {/* Timeline Role Card */}
                <article
                  className={`p-6 sm:p-7 rounded-2xl transition-all duration-300 shadow-md ${cardBg} ${cardBorder} border hover:shadow-xl`}
                >
                  {/* Card Header: Role & Timeline Metadata */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-slate-800/40">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {isLatest && (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 ${accentBg} ${accentBorder} ${accentText} border`}>
                            <Zap className="w-3 h-3" />
                            <span>Latest Role</span>
                          </span>
                        )}
                        <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                          isLight ? 'bg-slate-100 text-slate-600' : 'bg-slate-800/80 text-slate-400'
                        }`}>
                          Phase 0{index + 1}
                        </span>
                        <h3 className={`text-lg sm:text-xl font-bold font-mono ${
                          isLight ? 'text-slate-950' : 'text-white'
                        }`}>
                          {item.role}
                        </h3>
                      </div>

                      {/* Company & Verification Link */}
                      <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono pt-0.5">
                        <span className={`font-semibold ${accentText}`}>{item.company}</span>
                        <span className="text-slate-500">•</span>
                        <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>{item.duration}</span>
                        <span className="text-slate-500">•</span>
                        <span className={`flex items-center gap-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                          <MapPin className="w-3 h-3" />
                          <span>{item.location}</span>
                        </span>
                      </div>
                    </div>

                    {/* Company External Link & Admin Controls */}
                    <div className="flex items-center gap-2 self-start shrink-0">
                      {roleUrl && (
                        <a
                          href={roleUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                            isLight
                              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                              : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
                          }`}
                        >
                          <span>Verify</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      {/* Admin Direct Edit */}
                      {onEditExperience && (
                        <button
                          onClick={() => onEditExperience(item)}
                          className={`p-1.5 rounded-md text-xs font-mono font-bold transition-colors cursor-pointer ${
                            isLight
                              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                          }`}
                          title="Edit Role in Admin"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Admin Direct Delete with in-UI confirmation */}
                      {onDeleteExperience && (
                        confirmDeleteId === item.id ? (
                          <div className="flex items-center gap-1.5 p-1 rounded-md bg-red-950/80 border border-red-800">
                            <span className="text-[10px] font-mono text-red-200 px-1">Delete?</span>
                            <button
                              type="button"
                              onClick={() => {
                                onDeleteExperience(item.id);
                                setConfirmDeleteId(null);
                              }}
                              className="px-2 py-0.5 bg-red-600 hover:bg-red-500 text-white font-mono text-[10px] font-bold rounded cursor-pointer"
                            >
                              Yes
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(null)}
                              className="px-1.5 py-0.5 bg-slate-800 text-slate-300 font-mono text-[10px] rounded cursor-pointer"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(item.id)}
                            className="p-1.5 rounded-md text-red-400 hover:bg-red-950/50 transition-colors cursor-pointer"
                            title="Delete Role"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Concise Overview */}
                  {item.description && (
                    <p className={`mt-3 text-xs sm:text-sm font-sans leading-relaxed ${
                      isLight ? 'text-slate-700' : 'text-slate-300'
                    }`}>
                      {item.description}
                    </p>
                  )}

                  {/* Streamlined Deliverables (max 3 bullets) */}
                  {displayBullets.length > 0 && (
                    <div className="mt-3 space-y-1.5">
                      {displayBullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start space-x-2 text-xs font-mono">
                          <CheckCircle className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${accentText}`} />
                          <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Key Milestone / Engineering Highlight */}
                  {item.carMilestone && (
                    <div className={`mt-3.5 px-3 py-1.5 rounded-lg flex items-center space-x-2 text-xs font-mono ${accentBg} ${accentBorder} border`}>
                      <Award className={`w-3.5 h-3.5 ${accentText} shrink-0`} />
                      <span className={`font-semibold ${accentText}`}>Milestone:</span>
                      <span className={isLight ? 'text-slate-800' : 'text-slate-200'}>{item.carMilestone}</span>
                    </div>
                  )}

                  {/* Compact Tech Stack Tags */}
                  {item.technologies && item.technologies.length > 0 && (
                    <div className="mt-4 flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-800/40">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mr-1">Stack:</span>
                      {item.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                            isLight
                              ? 'bg-slate-100 border border-slate-200 text-slate-700'
                              : 'bg-slate-900 border border-slate-800 text-slate-300'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

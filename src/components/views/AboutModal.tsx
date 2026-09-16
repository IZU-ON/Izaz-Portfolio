import React from 'react';
import { AboutData, ProfileData, EducationItem } from '../../types';
import { Sparkles, Award, GraduationCap, Compass, X, CheckCircle2 } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  about: AboutData;
  profile: ProfileData;
  education: EducationItem[];
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  about,
  profile,
  education,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0b0e14] border border-amber-500/40 rounded-2xl shadow-2xl shadow-black/80 text-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150 blueprint-grid">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-[#101520] to-blue-950/40 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/40 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg sm:text-xl font-heading font-extrabold text-white">
                  WORKBENCH: ABOUT ME & BLUEPRINT
                </h2>
                <span className="text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full">
                  Craftsmanship & Architecture
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                The core philosophy, technical trajectory, and engineering ethos of {profile.name}.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Philosophy Banner */}
          <div className="p-5 rounded-xl bg-slate-900/90 border-l-4 border-amber-500 shadow-md">
            <div className="text-[11px] font-mono text-amber-400 uppercase tracking-widest font-semibold mb-1">
              Guiding Engineering Axiom
            </div>
            <p className="text-base sm:text-lg font-heading font-bold text-white italic">
              “{about.philosophy}”
            </p>
          </div>

          {/* Biography & Background */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-sm font-mono font-bold text-amber-300 uppercase tracking-wide flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Biography & Vision</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {profile.bio}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                {about.background}
              </p>
            </div>

            {/* Core Values */}
            <div className="space-y-3">
              <h3 className="text-sm font-mono font-bold text-blue-300 uppercase tracking-wide flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-400" />
                <span>Engineering Values</span>
              </h3>
              <div className="space-y-2.5">
                {about.coreValues.map((v, i) => (
                  <div key={i} className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                    <div className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{v.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Education & Academic Rigor */}
          <div className="pt-2">
            <h3 className="text-sm font-mono font-bold text-emerald-300 uppercase tracking-wide flex items-center gap-2 mb-3">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>Education & Academic Credentials</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {education.map((edu) => (
                <div key={edu.id} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{edu.degree}</h4>
                      <p className="text-xs font-mono text-amber-400 mt-0.5">{edu.institution}</p>
                    </div>
                    <span className="text-[10px] font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                      {edu.years}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{edu.specialization}</p>
                  {edu.grade && (
                    <div className="text-[11px] font-mono text-emerald-400">
                      Merit: {edu.grade}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Technical Certifications */}
          <div>
            <h3 className="text-sm font-mono font-bold text-purple-300 uppercase tracking-wide flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-purple-400" />
              <span>Verified Industry Certifications</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {about.certifications.map((cert, idx) => (
                <div key={idx} className="p-3 bg-slate-900/70 rounded-lg border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white">{cert.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{cert.issuer}</div>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400">{cert.date}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Blueprint Version: 2026.1 Enterprise Spec</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Close Blueprint
          </button>
        </div>

      </div>
    </div>
  );
};

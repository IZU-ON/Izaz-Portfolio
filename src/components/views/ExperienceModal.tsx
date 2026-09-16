import React from 'react';
import { ExperienceItem } from '../../types';
import { Car, Gauge, CheckCircle2, X, Calendar, MapPin } from 'lucide-react';

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  experience: ExperienceItem[];
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({
  isOpen,
  onClose,
  experience,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0b0e14] border border-amber-500/40 rounded-2xl shadow-2xl shadow-black/80 text-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-[#101520] to-amber-950/40 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg sm:text-xl font-heading font-extrabold text-white">
                  GT CAR: PROFESSIONAL JOURNEY
                </h2>
                <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                  Miles That Matter
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Track record of delivering production-grade systems, high-concurrency pipelines, and measurable outcomes.
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

        {/* Timeline Content */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="relative border-l-2 border-amber-500/30 ml-4 pl-6 space-y-8">
            {experience.map((exp) => (
              <div key={exp.id} className="relative group">
                {/* Node marker on timeline */}
                <div className="absolute -left-[33px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-amber-500 group-hover:bg-amber-500 transition-colors" />

                <div className="p-5 rounded-xl bg-[#0f131a] border border-slate-800 group-hover:border-amber-500/40 transition-all space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                        {exp.role}
                      </h3>
                      <div className="flex items-center space-x-3 text-xs font-mono text-amber-400 mt-0.5">
                        <span className="font-semibold">{exp.company}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <MapPin className="w-3 h-3" />
                          <span>{exp.location}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-mono bg-slate-900 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-amber-400" />
                        <span>{exp.duration}</span>
                      </span>
                    </div>
                  </div>

                  {/* Car Engine Milestone Metaphor Badge */}
                  {exp.carMilestone && (
                    <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                      <Gauge className="w-3.5 h-3.5" />
                      <span>Speed Milestone: {exp.carMilestone}</span>
                    </div>
                  )}

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Responsibilities */}
                  <div className="space-y-1.5 pt-1">
                    {exp.responsibilities.map((r, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                    {exp.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Odometer: Proven High-Performance Engineering Track Record</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Return to Garage
          </button>
        </div>

      </div>
    </div>
  );
};

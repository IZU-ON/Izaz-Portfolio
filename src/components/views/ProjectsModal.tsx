import React, { useState } from 'react';
import { ProjectItem } from '../../types';
import { Boxes, ExternalLink, Github, X, Sparkles, Filter, ChevronRight } from 'lucide-react';

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ProjectItem[];
}

export const ProjectsModal: React.FC<ProjectsModalProps> = ({ isOpen, onClose, projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  if (!isOpen) return null;

  const categories = ['All', 'AI/ML', 'WebGL & Graphics', 'Full-Stack', 'Robotics & IoT'];

  const filtered = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#0b0e14] border border-amber-500/40 rounded-2xl shadow-2xl shadow-black/80 text-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header with Engine Branding */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-[#101520] to-amber-950/40 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
              <Boxes className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg sm:text-xl font-heading font-extrabold text-white">
                  ENGINE LAB: PROJECTS
                </h2>
                <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                  Ideas Into Reality
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                High-performance neural systems, WebGL physics engines, and edge autonomous platforms.
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

        {/* Filter Category Tabs */}
        <div className="px-6 py-3 bg-[#0d1017] border-b border-slate-800/80 flex items-center space-x-2 overflow-x-auto">
          <Filter className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content: Project Grid */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((proj) => (
              <div
                key={proj.id}
                className="group rounded-xl bg-[#0f131a] border border-slate-800 hover:border-amber-500/50 transition-all overflow-hidden flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-950">
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="text-[10px] font-mono bg-slate-950/80 backdrop-blur-sm border border-slate-700 text-amber-400 px-2 py-0.5 rounded">
                        {proj.category}
                      </span>
                      {proj.featured && (
                        <span className="text-[10px] font-mono bg-amber-500 text-slate-950 px-2 py-0.5 rounded font-bold">
                          Featured Build
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {proj.shortDesc}
                    </p>

                    {/* Stats */}
                    {proj.stats && proj.stats.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {proj.stats.map((s, idx) => (
                          <div key={idx} className="bg-slate-950/70 p-2 rounded-lg border border-slate-800/80">
                            <div className="text-[10px] text-slate-400 font-mono">{s.key}</div>
                            <div className="text-xs font-mono font-bold text-emerald-400">{s.value}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded border border-slate-700/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="px-5 py-3.5 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">{proj.date}</span>
                  <div className="flex items-center space-x-2">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-xs font-mono text-slate-300 border border-slate-700 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    )}
                    {proj.demoUrl && (
                      <a
                        href={proj.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-xs font-mono text-amber-300 border border-amber-500/40 transition-colors font-semibold"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Engine Status: All project benchmarks verified & operational</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Close Engine View
          </button>
        </div>

      </div>
    </div>
  );
};

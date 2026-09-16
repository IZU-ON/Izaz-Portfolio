import React, { useState } from 'react';
import { ProjectItem } from '../../types';
import { ThemeConfig } from '../../utils/theme';
import { ScrambleText } from '../common/ScrambleText';
import { ExternalLink, Github, Boxes, Edit2, Plus, Trash2 } from 'lucide-react';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  isAdmin?: boolean;
  onEditProject?: (project: ProjectItem) => void;
  onAddProject?: () => void;
  onDeleteProject?: (projectId: string) => void;
  themeConfig?: ThemeConfig;
  isLight?: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  isAdmin = false,
  onEditProject,
  onAddProject,
  onDeleteProject,
  themeConfig,
  isLight = false,
}) => {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const accentText = themeConfig?.accentText || (isLight ? 'text-blue-600' : 'text-emerald-400');
  const accentBg = themeConfig?.accentBg || (isLight ? 'bg-blue-50' : 'bg-emerald-500/10');
  const accentBorder = themeConfig?.accentBorder || (isLight ? 'border-blue-200' : 'border-emerald-500/30');
  const accentSolid = themeConfig?.accentSolid || (isLight ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950');
  const cardBg = themeConfig?.cardBg || (isLight ? 'bg-white' : 'bg-[#0d131f]/90');
  const cardBorder = themeConfig?.cardBorder || (isLight ? 'border-slate-200/90' : 'border-slate-800');

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="flex flex-col items-center text-center mb-14">
        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full font-mono text-xs uppercase tracking-wider mb-3 ${accentBg} ${accentBorder} ${accentText} border`}>
          <Boxes className="w-3.5 h-3.5" />
          <span>Selected Systems</span>
        </div>

        <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight font-mono ${
          isLight ? 'text-slate-950' : 'text-white'
        }`}>
          <ScrambleText text="Featured Projects" />
        </h2>

        <p className={`mt-3 text-xs sm:text-sm max-w-xl font-mono ${
          isLight ? 'text-slate-600' : 'text-slate-400'
        }`}>
          Streamlined production builds engineered for performance, low latency, and operational durability.
        </p>

        {onAddProject && (
          <div className="mt-4">
            <button
              onClick={onAddProject}
              className={`inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer shadow-sm ${accentSolid}`}
            >
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {projects.map((project) => {
          const displayTech = (project.tech || []).slice(0, 4);

          return (
            <div
              key={project.id}
              className={`group flex flex-col rounded-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden shadow-md hover:shadow-xl ${cardBg} ${cardBorder} border`}
            >
              {/* Image Preview Container */}
              <div className={`relative aspect-video w-full overflow-hidden border-b ${
                isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-slate-800'
              }`}>
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-950 font-mono text-slate-600 text-xs">
                    [System Schematic]
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/85 backdrop-blur-md border border-slate-700 text-[10px] font-mono text-slate-200 flex items-center space-x-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${themeConfig?.timelineDot || 'bg-emerald-400'}`} />
                  <span>{project.category}</span>
                </div>

                {project.date && (
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/85 backdrop-blur-md border border-slate-800 text-[10px] font-mono text-slate-300">
                    {project.date}
                  </div>
                )}

                {/* Direct Edit Button Overlay for Admin */}
                {onEditProject && (
                  <button
                    onClick={() => onEditProject(project)}
                    className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-black/85 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-mono transition-colors cursor-pointer"
                    title="Edit Project"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Content Block (Streamlined & Reduced Clutter) */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`text-base sm:text-lg font-bold font-mono group-hover:${accentText} transition-colors ${
                      isLight ? 'text-slate-950' : 'text-white'
                    }`}>
                      {project.title}
                    </h3>

                    {/* Admin Delete Action */}
                    {onDeleteProject && (
                      confirmDeleteId === project.id ? (
                        <div className="flex items-center gap-1 p-1 rounded bg-red-950/80 border border-red-800 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              onDeleteProject(project.id);
                              setConfirmDeleteId(null);
                            }}
                            className="px-1.5 py-0.5 bg-red-600 text-white font-mono text-[9px] font-bold rounded cursor-pointer"
                          >
                            Del
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-1 py-0.5 bg-slate-800 text-slate-300 font-mono text-[9px] rounded cursor-pointer"
                          >
                            X
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(project.id)}
                          className="text-red-400 hover:text-red-300 p-1 cursor-pointer shrink-0"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )
                    )}
                  </div>

                  {/* Concise 1-sentence description */}
                  <p className={`mt-2 text-xs font-sans leading-relaxed line-clamp-2 ${
                    isLight ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    {project.shortDesc || project.detailedDesc}
                  </p>

                  {/* Tech stack tags */}
                  {displayTech.length > 0 && (
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {displayTech.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                            isLight
                              ? 'bg-slate-100 text-slate-700 border border-slate-200'
                              : 'bg-slate-800/80 text-slate-300 border border-slate-800'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* External Action Links */}
                <div className="mt-5 pt-3.5 border-t border-slate-800/40 flex items-center justify-between text-xs font-mono">
                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center space-x-1.5 font-bold ${accentText} hover:underline`}
                    >
                      <span>Live System</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-slate-500 text-[11px]">Demo Internal</span>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center space-x-1.5 transition-colors ${
                        isLight ? 'text-slate-600 hover:text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

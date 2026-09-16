import React, { useState } from 'react';
import { SoftwareItem } from '../../types';
import { ThemeConfig } from '../../utils/theme';
import { ScrambleText } from '../common/ScrambleText';
import { Code2, Edit2, Plus } from 'lucide-react';

interface SoftwareSectionProps {
  software?: SoftwareItem[];
  isAdmin?: boolean;
  onEditSoftware?: (item: SoftwareItem) => void;
  onAddSoftware?: () => void;
  themeConfig?: ThemeConfig;
  isLight?: boolean;
}

export const SoftwareSection: React.FC<SoftwareSectionProps> = ({
  software = [],
  isAdmin = false,
  onEditSoftware,
  onAddSoftware,
  themeConfig,
  isLight = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const accentText = themeConfig?.accentText || (isLight ? 'text-blue-600' : 'text-emerald-400');
  const accentBg = themeConfig?.accentBg || (isLight ? 'bg-blue-50' : 'bg-emerald-500/10');
  const accentBorder = themeConfig?.accentBorder || (isLight ? 'border-blue-200' : 'border-emerald-500/30');
  const accentSolid = themeConfig?.accentSolid || (isLight ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950');
  const cardBg = themeConfig?.cardBg || (isLight ? 'bg-white' : 'bg-[#0d131f]/90');
  const cardBorder = themeConfig?.cardBorder || (isLight ? 'border-slate-200/90' : 'border-slate-800');

  // Derive categories dynamically
  const customCategories = Array.from(
    new Set(software.map((item) => item.category).filter(Boolean))
  );
  const categories = ['All', ...customCategories];

  const filtered = selectedCategory === 'All'
    ? software
    : software.filter((item) => item.category === selectedCategory);

  return (
    <section id="software" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-14">
        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full font-mono text-xs uppercase tracking-wider mb-3 ${accentBg} ${accentBorder} ${accentText} border`}>
          <Code2 className="w-3.5 h-3.5" />
          <span>Engineering Tooling</span>
        </div>
        <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight font-mono ${
          isLight ? 'text-slate-950' : 'text-white'
        }`}>
          <ScrambleText text="Software & Tooling Stack" />
        </h2>
        <p className={`mt-3 text-xs sm:text-sm max-w-xl font-mono ${
          isLight ? 'text-slate-600' : 'text-slate-400'
        }`}>
          Production development software, neural frameworks, spatial graphics engines, and infrastructure.
        </p>

        {onAddSoftware && (
          <div className="mt-4">
            <button
              onClick={onAddSoftware}
              className={`inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer shadow-sm ${accentSolid}`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Software Tool</span>
            </button>
          </div>
        )}
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 font-mono text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              selectedCategory === cat
                ? accentSolid + ' font-bold shadow-md'
                : isLight
                ? 'bg-white text-slate-700 hover:text-slate-950 border border-slate-200'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Software Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((tool) => (
          <div
            key={tool.id}
            className={`p-5 rounded-xl transition-all duration-300 shadow-md group ${cardBg} ${cardBorder} border hover:shadow-xl`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <span className={`text-[10px] font-mono uppercase tracking-wider block mb-1 font-semibold ${accentText}`}>
                  {tool.category}
                </span>
                <h3 className={`text-base font-bold font-mono transition-colors ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}>
                  {tool.name}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {onEditSoftware && (
                  <button
                    onClick={() => onEditSoftware(tool)}
                    className="p-1 rounded-md text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Edit tool"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                )}
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap ${
                  isLight
                    ? 'bg-slate-100 border border-slate-200 text-slate-600'
                    : 'bg-slate-900 border border-slate-800 text-slate-400'
                }`}>
                  {tool.experienceYears}
                </span>
              </div>
            </div>

            <p className={`text-xs font-sans leading-relaxed mb-4 ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>
              {tool.purpose}
            </p>

            {/* Proficiency Bar */}
            <div className={`space-y-1.5 pt-3 border-t ${
              isLight ? 'border-slate-100' : 'border-slate-800/80'
            }`}>
              <div className={`flex items-center justify-between text-[10px] font-mono ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                <span>Proficiency</span>
                <span className={`font-semibold ${accentText}`}>{tool.proficiency}%</span>
              </div>
              <div className={`w-full h-1.5 rounded-full overflow-hidden ${
                isLight ? 'bg-slate-100' : 'bg-slate-900'
              }`}>
                <div
                  className={`h-full ${themeConfig?.timelineDot || 'bg-emerald-400'} rounded-full transition-all duration-700`}
                  style={{ width: `${Math.max(0, Math.min(100, tool.proficiency))}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

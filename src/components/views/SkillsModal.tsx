import React, { useState } from 'react';
import { SkillTool, ToolCategory } from '../../types';
import { Cpu, Wrench, Hammer, Gauge, Cog, Terminal, X, CheckCircle2 } from 'lucide-react';

interface SkillsModalProps {
  isOpen: boolean;
  onClose: () => void;
  skills: SkillTool[];
}

export const SkillsModal: React.FC<SkillsModalProps> = ({ isOpen, onClose, skills }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'AI/ML', 'Core Engineering', 'Frameworks', 'Tools & Cloud'];

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  const getToolIcon = (toolType: SkillTool['toolType']) => {
    switch (toolType) {
      case 'wrench':
        return Wrench;
      case 'hammer':
        return Hammer;
      case 'gear':
        return Cog;
      case 'meter':
        return Gauge;
      case 'chip':
      default:
        return Cpu;
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#0b0e14] border border-amber-500/40 rounded-2xl shadow-2xl shadow-black/80 text-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-[#101520] to-amber-950/40 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg sm:text-xl font-heading font-extrabold text-white">
                  TOOL WALL: SKILLS & TECHNOLOGIES
                </h2>
                <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                  Tools In My Toolbox
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Every technology is a precision tool mastered for algorithmic speed, robustness, and architectural leverage.
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

        {/* Categories Bar */}
        <div className="px-6 py-3 bg-[#0d1017] border-b border-slate-800/80 flex items-center space-x-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tool Pegboard Grid */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 tread-plate">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((skill) => {
              const Icon = getToolIcon(skill.toolType);
              return (
                <div
                  key={skill.id}
                  className="p-4 rounded-xl bg-[#0f131a]/95 border border-slate-800/90 hover:border-amber-500/50 transition-all flex flex-col justify-between shadow-lg group"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-amber-500/40 flex items-center justify-center text-amber-400 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-mono font-bold text-white group-hover:text-amber-300 transition-colors">
                            {skill.name}
                          </h3>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {skill.category}
                          </span>
                        </div>
                      </div>

                      <span className="text-xs font-mono font-bold text-amber-400">
                        {skill.proficiency}%
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/70 space-y-1.5">
                    {/* Gauge bar */}
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span>Experience: {skill.experienceYears}</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Calibrated</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Toolboard Inventory: {filtered.length} Production Technologies Ready</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Close Tool Wall
          </button>
        </div>

      </div>
    </div>
  );
};

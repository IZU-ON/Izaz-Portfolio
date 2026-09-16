import React, { useState } from 'react';
import { SkillTool, ToolCategory } from '../../types';
import { Cpu } from 'lucide-react';

interface SkillsSectionProps {
  skills: SkillTool[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories: string[] = ['All', 'AI/ML', 'Core Engineering', 'Frameworks', 'Tools & Cloud'];

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-xs uppercase tracking-widest mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>Technical Arsenal</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Mastered <span className="text-amber-400">Toolbox & Technologies</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl font-mono">
          “Like precision spanners in a master technician's drawer, every technology is calibrated for maximum performance.”
        </p>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full font-mono text-xs transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-950/40'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className="group p-5 rounded-2xl bg-[#0d121c]/90 backdrop-blur-sm border border-slate-800/80 hover:border-amber-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-amber-950/20"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
                <h3 className="font-mono font-bold text-white text-base group-hover:text-amber-400 transition-colors">
                  {skill.name}
                </h3>
              </div>
              <span className="text-xs font-mono text-amber-400/90 font-bold">
                {skill.proficiency}%
              </span>
            </div>

            {/* Proficiency Meter */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-700"
                style={{ width: `${skill.proficiency}%` }}
              />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {skill.description}
            </p>

            <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span className="text-slate-400 uppercase tracking-wider">{skill.category}</span>
              <span className="text-slate-300">{skill.experienceYears} Exp</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

import React from 'react';
import { TeamMember } from '../../types';
import { Users, Github, Linkedin, Mail, ShieldCheck } from 'lucide-react';

interface TeamSectionProps {
  team?: TeamMember[];
}

export const TeamSection: React.FC<TeamSectionProps> = ({ team = [] }) => {
  return (
    <section id="team" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-14">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 font-mono text-xs uppercase tracking-widest mb-3">
          <Users className="w-3.5 h-3.5" />
          <span>Professional Network</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">
          Engineering <span className="text-sky-400">Team & Collaborators</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-2xl font-mono">
          Senior technical peers and domain specialists collaborating across neural architectures, high-scale infrastructure, and 3D web systems.
        </p>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((member) => (
          <div
            key={member.id}
            className="flex flex-col justify-between p-6 rounded-2xl bg-[#0d121c]/90 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 shadow-xl group"
          >
            <div>
              {/* Member Photo & Status */}
              <div className="relative mb-5 flex items-center justify-between">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-900 border-2 border-slate-700 shadow-md">
                  <img
                    src={member.avatarUrl}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {member.status && (
                  <span className="px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-[10px] font-mono font-medium">
                    {member.status}
                  </span>
                )}
              </div>

              {/* Identity */}
              <h3 className="text-lg font-bold text-white font-mono group-hover:text-sky-300 transition-colors">
                {member.name}
              </h3>
              <p className="text-xs font-mono text-sky-400 font-medium mt-0.5">
                {member.role}
              </p>

              {member.company && (
                <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                  {member.company}
                </p>
              )}

              <p className="mt-3 text-xs text-slate-300 font-sans leading-relaxed">
                {member.bio}
              </p>

              {/* Software Tooling Stack */}
              {member.software && member.software.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Key Software & Tooling:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {member.software.map((sw, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300"
                      >
                        {sw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Social / Contact Links */}
            <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center space-x-2.5">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              )}

              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="GitHub"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
              )}

              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Email"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

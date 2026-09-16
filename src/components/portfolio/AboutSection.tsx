import React from 'react';
import { PortfolioData } from '../../types';
import {
  Mail,
  MapPin,
  ExternalLink,
  Download,
  Terminal,
  Cpu,
  Award,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface AboutSectionProps {
  data: PortfolioData;
  onOpenResume?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ data, onOpenResume }) => {
  const { profile, about } = data;

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs uppercase tracking-widest mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>Biographical Dossier</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          About <span className="text-amber-400">{profile.name}</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl font-mono">
          “{profile.tagline || about.philosophy}”
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Picture of Izaz Ahamad & Quick Profile Card */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
          <div className="relative w-full max-w-md group">
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500/30 via-sky-500/20 to-amber-500/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Picture Container */}
            <div className="relative rounded-2xl bg-[#0d121c] border border-slate-700/70 p-4 shadow-2xl overflow-hidden">
              {/* Picture of Izaz */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                <img
                  src={profile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'}
                  alt={profile.name}
                  className="w-full h-full object-cover object-top filter grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  loading="lazy"
                />

                {/* Overlaid Corner Tech Accents */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-amber-500/40 text-[11px] font-mono text-amber-400 flex items-center space-x-1.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available for High-Impact Roles</span>
                </div>

                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-slate-700 text-[10px] font-mono text-slate-300 shadow-lg">
                  <span>ID: IZAZ-2026</span>
                </div>
              </div>

              {/* Identity Details directly under picture */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white font-mono">{profile.name}</h3>
                  <p className="text-xs text-amber-400 font-mono mt-0.5">{profile.title}</p>
                </div>
                <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{profile.location}</span>
                </div>
              </div>

              {/* Quick Links / Download CV */}
              <div className="mt-4 grid grid-cols-2 gap-2 pt-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs transition-colors shadow-md shadow-amber-950/40"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Izaz</span>
                </a>

                <a
                  href="#contact"
                  className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono font-medium text-xs transition-colors border border-slate-700"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Contact Form</span>
                </a>
              </div>
            </div>
          </div>

          {/* Key Metric Highlights */}
          <div className="w-full max-w-md grid grid-cols-3 gap-3 mt-4">
            <div className="bg-[#0b0e14]/90 border border-slate-800/80 rounded-xl p-3 text-center">
              <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400">3+</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">Years Eng.</div>
            </div>
            <div className="bg-[#0b0e14]/90 border border-slate-800/80 rounded-xl p-3 text-center">
              <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400">24+</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">Production Builds</div>
            </div>
            <div className="bg-[#0b0e14]/90 border border-slate-800/80 rounded-xl p-3 text-center">
              <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">99.4%</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">Latency Opt.</div>
            </div>
          </div>
        </div>

        {/* Right Column: Deep Biography, Narrative & Engineering Philosophy */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          {/* Main Narrative Card */}
          <div className="bg-[#0d121c]/90 backdrop-blur-md rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-mono mb-4 flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span>Full-Stack Craftsman & 3D WebGL Engineer</span>
            </h3>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              <p>
                {profile.bio || (
                  `I am a passionate software engineer specializing in Artificial Intelligence, Machine Learning, and cutting-edge 3D interactive web engineering. Like a master mechanic who understands every piston, valve, and electrical wire inside a high-performance engine, I build software from fundamental algorithmic principles up to fluid, responsive user experiences.`
                )}
              </p>
              <p className="text-slate-400">
                {about.background || (
                  `With a rigorous background in Computer Science and Machine Learning, I have spent years honing the craft of high-throughput distributed systems, deep learning pipelines, and spatial 3D interfaces. I believe software craftsmanship is about relentless curiosity, measured discipline, and building tools that make human capabilities exponential.`
                )}
              </p>
            </div>

            {/* Core Values / Work Ethic */}
            <div className="mt-8 pt-6 border-t border-slate-800/80">
              <h4 className="text-xs font-mono font-bold text-amber-400 tracking-wider uppercase mb-4 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Core Engineering Principles</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="font-mono text-sm font-bold text-white mb-1">Work Hard, Build Smarter</div>
                  <div className="text-xs text-slate-400 leading-relaxed">
                    Relentless persistence combined with architectural leverage to eliminate bottlenecks before they occur.
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="font-mono text-sm font-bold text-white mb-1">Algorithmic Precision</div>
                  <div className="text-xs text-slate-400 leading-relaxed">
                    Treating math and low-level compute as the true foundation for fluid 60FPS visuals and robust models.
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="font-mono text-sm font-bold text-white mb-1">Mechanical Reliability</div>
                  <div className="text-xs text-slate-400 leading-relaxed">
                    Zero tolerance for sloppy edge-case handling. Clean separation of concerns and robust test suites.
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="font-mono text-sm font-bold text-white mb-1">Continuous Evolution</div>
                  <div className="text-xs text-slate-400 leading-relaxed">
                    Keeping skills sharp through active production deployments, research papers, and open source exploration.
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications & Badges */}
            {about.certifications && about.certifications.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-800/80">
                <h4 className="text-xs font-mono font-bold text-slate-300 tracking-wider uppercase mb-3 flex items-center space-x-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Verified Credentials & Lab Certifications</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {about.certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2.5 p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/80 text-xs font-mono"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <div className="truncate">
                        <span className="text-slate-200 font-semibold">{cert.name}</span>
                        <span className="text-slate-500 ml-1.5">• {cert.issuer}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { PortfolioData } from '../../types';
import {
  Briefcase,
  CheckCircle2,
  Award,
  Zap,
  Cpu,
  Mail,
  Phone,
  Linkedin,
  FileText,
  X,
  Target,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

interface HireMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onOpenResume: () => void;
}

export const HireMeModal: React.FC<HireMeModalProps> = ({
  isOpen,
  onClose,
  data,
  onOpenResume,
}) => {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 55,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#10b981', '#3b82f6', '#ffffff'],
        });
      } catch (e) {
        // Safe confetti fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0e1219] border-2 border-emerald-500/40 rounded-2xl shadow-2xl shadow-emerald-950/50 text-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top High-Performance Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950/80 p-6 border-b border-emerald-500/30">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-mono font-semibold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>CANDIDATE DOSSIER: READY TO DEPLOY</span>
                </span>
                <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-mono font-medium">
                  ★ Top Tier Engineer
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight text-white flex items-center gap-2">
                <span>{data.profile.name}</span>
                <span className="text-emerald-400 text-lg font-mono font-normal">| {data.profile.title}</span>
              </h2>
              <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                “{data.profile.tagline}” — A high-velocity engineer engineered to solve difficult problems, build robust software architectures, and deliver beyond expectations.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">

          {/* Harder & Smarter Value Proposition Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Pillar 1: Work Smarter */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/30 hover:border-emerald-400/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-mono font-bold text-emerald-300 uppercase tracking-wide">
                Builds Smarter
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Deep architectural instinct. Selects the right algorithms, quantizes models, structures strict typing, and prevents bottlenecks before they consume engineering sprint cycles.
              </p>
              <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>42% Latency Reductions</span>
              </div>
            </div>

            {/* Pillar 2: Works Harder */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/30 hover:border-amber-400/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-mono font-bold text-amber-300 uppercase tracking-wide">
                Works Relentlessly
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Proven endurance under high-pressure delivery deadlines. 1st Place National Hackathon winner across 36 hours of non-stop algorithmic problem solving and shipping.
              </p>
              <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] font-mono text-amber-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>1st Place Smart India Hackathon</span>
              </div>
            </div>

            {/* Pillar 3: End-to-End Ownership */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-blue-500/30 hover:border-blue-400/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-mono font-bold text-blue-300 uppercase tracking-wide">
                Autonomous Ownership
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Zero hand-holding required. Seamlessly navigates from PyTorch model training and Linux system daemons to responsive 3D WebGL interfaces and product rollout.
              </p>
              <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] font-mono text-blue-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Speaker: Google Build with AI</span>
              </div>
            </div>

          </div>

          {/* Quantified Impact Numbers */}
          <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Verified Engineering Benchmarks</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 text-center">
                <div className="text-2xl font-bold font-heading text-emerald-400">18ms</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Edge Vision Inference</div>
              </div>
              <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 text-center">
                <div className="text-2xl font-bold font-heading text-amber-400">60 FPS</div>
                <div className="text-[11px] text-slate-400 mt-0.5">3D WebGL Physics Render</div>
              </div>
              <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 text-center">
                <div className="text-2xl font-bold font-heading text-cyan-400">99.1%</div>
                <div className="text-[11px] text-slate-400 mt-0.5">F1 Defect Classifier Accuracy</div>
              </div>
              <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 text-center">
                <div className="text-2xl font-bold font-heading text-purple-400">24+</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Production Builds Shipped</div>
              </div>
            </div>
          </div>

          {/* Recruiter Instant Contact Bar */}
          <div className="pt-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Direct Recruitment Channels (Immediate Response)</span>
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Email */}
              <a
                href={`mailto:${data.profile.email}?subject=Exciting%20Opportunity%20for%20Izaz%20Ahamad&body=Hi%20Izaz,%20I%20reviewed%20your%203D%20interactive%20workshop%20portfolio%20and%20would%20love%20to%20connect%20about...`}
                className="flex items-center space-x-2.5 p-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold transition-all group"
              >
                <Mail className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <div className="truncate">
                  <div className="text-[10px] text-slate-400 font-normal">Send Email</div>
                  <div className="truncate">{data.profile.email}</div>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${data.profile.phone.replace(/\s+/g, '')}`}
                className="flex items-center space-x-2.5 p-3 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-all group"
              >
                <Phone className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-[10px] text-slate-400 font-normal">Direct Call</div>
                  <div>{data.profile.phone}</div>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={data.profile.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2.5 p-3 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs font-semibold transition-all group"
              >
                <Linkedin className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-[10px] text-slate-400 font-normal">LinkedIn Profile</div>
                  <div>Connect Now</div>
                </div>
              </a>

              {/* Resume */}
              <button
                onClick={() => {
                  onClose();
                  onOpenResume();
                }}
                className="flex items-center space-x-2.5 p-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 text-xs font-semibold transition-all group text-left"
              >
                <FileText className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-[10px] text-slate-400 font-normal">Technical CV</div>
                  <div>View Resume</div>
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>STATUS: Actively Considering Challenging Engineering Roles</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Return to Workshop
          </button>
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { Lock, ArrowUp, Sparkles } from 'lucide-react';

interface FooterProps {
  authorName: string;
  onOpenAdminAuth: () => void;
  isLight?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ authorName, onOpenAdminAuth, isLight = false }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`relative border-t py-12 px-4 sm:px-6 lg:px-8 z-10 font-mono text-xs ${
      isLight
        ? 'border-slate-200 bg-slate-50 text-slate-700'
        : 'border-slate-800/80 bg-[#06080d] text-slate-300'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold font-mono">
            IA
          </div>
          <div>
            <div className={`font-bold uppercase tracking-wider ${
              isLight ? 'text-slate-950' : 'text-white'
            }`}>
              {authorName}
            </div>
            <div className={`text-[10px] ${
              isLight ? 'text-slate-500' : 'text-slate-500'
            }`}>
              AI & Systems Software Engineer
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className={`flex items-center space-x-6 text-xs ${
          isLight ? 'text-slate-600' : 'text-slate-400'
        }`}>
          <a href="#home" className="hover:text-amber-500 transition-colors">Home</a>
          <a href="#experience" className="hover:text-amber-500 transition-colors">Experience</a>
          <a href="#projects" className="hover:text-amber-500 transition-colors">Projects</a>
          <a href="#software" className="hover:text-amber-500 transition-colors">Software</a>
          <a href="#contact" className="hover:text-amber-500 transition-colors">Contact</a>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenAdminAuth}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
              isLight
                ? 'bg-white hover:bg-slate-100 text-slate-700 hover:text-amber-600 border-slate-200'
                : 'bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-amber-400 border-slate-800'
            }`}
            title="Administrator Master Console (Passcode)"
          >
            <Lock className="w-3.5 h-3.5 text-amber-500" />
            <span>Admin</span>
          </button>

          <button
            onClick={scrollToTop}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isLight
                ? 'bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-950 border-slate-200'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border-slate-800'
            }`}
            title="Return to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className={`max-w-7xl mx-auto mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between text-[11px] ${
        isLight ? 'border-slate-200 text-slate-500' : 'border-slate-900 text-slate-600'
      }`}>
        <div>© {new Date().getFullYear()} {authorName}. All rights reserved.</div>
        <div className="mt-2 sm:mt-0">
          Professional Engineering Platform
        </div>
      </div>
    </footer>
  );
};

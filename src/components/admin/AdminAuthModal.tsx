import React, { useState } from 'react';
import { Lock, KeyRound, Wrench, X, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  validPasscode: string;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  validPasscode,
}) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate either the dynamic passcode in data or standard admin overrides
    if (
      passcode.trim() === validPasscode ||
      passcode.trim() === 'workshop2026' ||
      passcode.trim() === 'admin123' ||
      passcode.trim() === 'izaz2026'
    ) {
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        onSuccess();
        onClose();
        setSuccess(false);
        setPasscode('');
      }, 400);
    } else {
      setError(true);
    }
  };

  const handleQuickUnlock = () => {
    setPasscode(validPasscode || 'workshop2026');
    setSuccess(true);
    setTimeout(() => {
      onSuccess();
      onClose();
      setSuccess(false);
      setPasscode('');
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#0d1117] border border-amber-500/50 rounded-2xl shadow-2xl shadow-amber-950/40 text-slate-100 p-6 font-sans animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-mono font-bold text-amber-400 uppercase tracking-wider">
                Workshop Security Key
              </h3>
              <p className="text-xs text-slate-400">Restricted Administrator Console</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300 flex items-center space-x-1.5">
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>Enter Workshop Master Keycode</span>
            </label>
            <div className="relative">
              <input
                type="password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError(false);
                }}
                placeholder="••••••••••••"
                autoFocus
                className={`w-full px-3.5 py-2.5 bg-slate-900 border rounded-xl font-mono text-sm tracking-widest text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all ${
                  error
                    ? 'border-red-500 focus:ring-red-500/50'
                    : 'border-slate-800 focus:border-amber-500 focus:ring-amber-500/30'
                }`}
              />
              <div className="absolute right-3 top-2.5 text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-xs text-red-400 font-mono bg-red-950/40 p-2.5 rounded-lg border border-red-800/60">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>Invalid Master Keycode. Hint: Check demo pass below.</span>
            </div>
          )}

          {success && (
            <div className="flex items-center space-x-2 text-xs text-emerald-400 font-mono bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800/60">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Security clearance verified. Unlocking workshop control room...</span>
            </div>
          )}

          <div className="flex items-center space-x-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold font-mono text-xs rounded-xl shadow-lg shadow-amber-900/30 transition-all uppercase tracking-wider"
            >
              Unlock Control Room
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs rounded-xl transition-colors"
            >
              Cancel
            </button>
          </div>

          {/* Quick Demo Helper */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 text-center">
            <p className="text-[11px] text-slate-500 font-mono">
              Owner key: <span className="text-amber-400/90 font-semibold">{validPasscode || 'workshop2026'}</span>
            </p>
            <button
              type="button"
              onClick={handleQuickUnlock}
              className="mt-1.5 text-[11px] text-amber-400/80 hover:text-amber-300 underline font-mono cursor-pointer"
            >
              [Quick Demo Auto-Unlock]
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

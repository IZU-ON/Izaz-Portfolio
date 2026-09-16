import React from 'react';
import { VisualSettings, VisualFilter, AnimationSpeed } from '../../types';
import {
  Sparkles,
  Zap,
  Briefcase,
  Layers,
  Gauge,
  SunMedium,
  Crosshair,
  Lock,
  X,
  RotateCw,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';

interface SpannerMagicMenuProps {
  isOpen: boolean;
  onClose: () => void;
  position?: { x: number; y: number } | null;
  settings: VisualSettings;
  onUpdateSettings: (newSettings: Partial<VisualSettings>) => void;
  onTriggerBlast: () => void;
  onOpenAdminAuth: () => void;
  onOpenHireMeModal: () => void;
}

export const SpannerMagicMenu: React.FC<SpannerMagicMenuProps> = ({
  isOpen,
  onClose,
  position,
  settings,
  onUpdateSettings,
  onTriggerBlast,
  onOpenAdminAuth,
  onOpenHireMeModal,
}) => {
  if (!isOpen) return null;

  // Position calculation to keep within screen bounds
  const style: React.CSSProperties = position
    ? {
        position: 'fixed',
        left: Math.min(position.x, window.innerWidth - 340),
        top: Math.min(position.y, window.innerHeight - 520),
        zIndex: 60,
      }
    : {
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 60,
      };

  const filters: { id: VisualFilter; label: string; color: string; desc: string }[] = [
    { id: 'amber', label: 'Cinematic Amber', color: '#f59e0b', desc: 'Warm 2700K workshop glow' },
    { id: 'cyber', label: 'Cyber Garage', color: '#06b6d4', desc: 'Futuristic cyan & neon highlights' },
    { id: 'blueprint', label: 'CAD Blueprint', color: '#3b82f6', desc: 'Technical schematic cobalt' },
    { id: 'monochrome', label: 'Brushed Steel', color: '#94a3b8', desc: 'Industrial raw titanium' },
  ];

  const speeds: { id: AnimationSpeed; label: string; desc: string }[] = [
    { id: 'normal', label: '1.0x Normal', desc: 'Standard speed' },
    { id: 'overdrive', label: '2.5x Turbo', desc: 'Fast rotation' },
    { id: 'slomo', label: '0.3x Slo-Mo', desc: 'Cinematic flow' },
    { id: 'precision', label: '0.7x Calib', desc: 'Engineering review' },
  ];

  return (
    <>
      {/* Backdrop for click outside */}
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />

      <div
        style={style}
        className="w-[320px] max-h-[90vh] overflow-y-auto bg-[#0d1017]/95 border border-amber-500/40 rounded-xl shadow-2xl shadow-black/80 text-slate-200 p-4 font-sans backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-mono font-bold tracking-wider text-amber-400 uppercase">
                Antigravity Spanner Quick Access
              </h3>
              <p className="text-[10px] text-slate-400">Infinity Asset & Magic Settings</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Signature Actions */}
        <div className="space-y-2 mb-4">
          {/* Antigravity Mechanical Blast Trigger */}
          <button
            onClick={() => {
              onTriggerBlast();
              onClose();
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-gradient-to-r from-amber-600/30 to-amber-500/10 hover:from-amber-600/40 hover:to-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-semibold transition-all group"
          >
            <div className="flex items-center space-x-2">
              <Zap className="w-3.5 h-3.5 text-amber-400 group-hover:scale-125 transition-transform" />
              <span>Antigravity Shockwave & Reassemble</span>
            </div>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-mono">
              Execute
            </span>
          </button>

          {/* HIRE ME CANDIDATE MODE SPOTLIGHT */}
          <button
            onClick={() => {
              onOpenHireMeModal();
              onClose();
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600/40 via-teal-600/30 to-amber-500/20 hover:from-emerald-600/50 hover:to-amber-500/30 border border-emerald-400/50 text-emerald-200 text-xs font-bold transition-all shadow-lg shadow-emerald-950/40 group"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <Briefcase className="w-4 h-4 text-emerald-300" />
              <div className="text-left">
                <div className="tracking-wide">HIRE ME SPOTLIGHT</div>
                <div className="text-[9px] text-emerald-300/80 font-normal">
                  Smart & Hardworking Systems Dossier
                </div>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-400 text-slate-950 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Explore
            </span>
          </button>
        </div>

        {/* Artistic Visual Filters */}
        <div className="mb-4">
          <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center space-x-1 mb-2">
            <Layers className="w-3 h-3 text-amber-400" />
            <span>Artistic Lighting Filter</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {filters.map((f) => {
              const active = settings.filter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => onUpdateSettings({ filter: f.id })}
                  className={`flex flex-col text-left p-2 rounded-lg border text-xs transition-all ${
                    active
                      ? 'bg-amber-500/20 border-amber-400 text-white font-medium shadow-md shadow-amber-950/30'
                      : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center space-x-1.5">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: f.color }}
                    />
                    <span className="text-[11px] font-mono truncate">{f.label}</span>
                  </div>
                  <span className="text-[9px] text-slate-400 mt-0.5 truncate">{f.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Animation Speeds */}
        <div className="mb-4">
          <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center space-x-1 mb-2">
            <Gauge className="w-3 h-3 text-amber-400" />
            <span>Engine & Spanner Speed</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {speeds.map((s) => {
              const active = settings.animationSpeed === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => onUpdateSettings({ animationSpeed: s.id })}
                  className={`px-2.5 py-1.5 rounded-lg border text-xs text-center transition-all ${
                    active
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-semibold'
                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-[11px] font-mono">{s.label}</div>
                  <div className="text-[9px] text-slate-500">{s.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Real-time Lighting Controls */}
        <div className="mb-4 space-y-2 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center space-x-1.5 font-mono text-[11px]">
              <SunMedium className="w-3.5 h-3.5 text-amber-400" />
              <span>Cursor Light Intensity</span>
            </span>
            <span className="font-mono text-[11px] text-amber-400">
              {(settings.lightIntensity * 100).toFixed(0)}%
            </span>
          </div>
          <input
            type="range"
            min="0.5"
            max="2.0"
            step="0.1"
            value={settings.lightIntensity}
            onChange={(e) => onUpdateSettings({ lightIntensity: parseFloat(e.target.value) })}
            className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />

          <div className="grid grid-cols-2 gap-2 pt-1">
            {/* Realtime Shadows Toggle */}
            <button
              onClick={() => onUpdateSettings({ shadowsEnabled: !settings.shadowsEnabled })}
              className={`flex items-center justify-between p-2 rounded-lg border text-[11px] transition-all ${
                settings.shadowsEnabled
                  ? 'bg-slate-800/80 border-amber-500/40 text-amber-300'
                  : 'bg-slate-900/40 border-slate-800 text-slate-500'
              }`}
            >
              <span className="flex items-center space-x-1">
                <SlidersHorizontal className="w-3 h-3" />
                <span>3D Shadows</span>
              </span>
              <span className="text-[9px] font-mono">{settings.shadowsEnabled ? 'ON' : 'OFF'}</span>
            </button>

            {/* Spanner Cursor Toggle */}
            <button
              onClick={() => onUpdateSettings({ customCursor: !settings.customCursor })}
              className={`flex items-center justify-between p-2 rounded-lg border text-[11px] transition-all ${
                settings.customCursor
                  ? 'bg-slate-800/80 border-amber-500/40 text-amber-300'
                  : 'bg-slate-900/40 border-slate-800 text-slate-500'
              }`}
            >
              <span className="flex items-center space-x-1">
                <Crosshair className="w-3 h-3" />
                <span>Spanner Cursor</span>
              </span>
              <span className="text-[9px] font-mono">{settings.customCursor ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>

        {/* Secret Admin Authentication Gateway */}
        <div className="pt-2 border-t border-slate-800/80">
          <button
            onClick={() => {
              onOpenAdminAuth();
              onClose();
            }}
            className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-xs font-mono transition-colors"
          >
            <Lock className="w-3 h-3 text-amber-400" />
            <span>Administrator Gateway (Keycode)</span>
          </button>
        </div>
      </div>
    </>
  );
};

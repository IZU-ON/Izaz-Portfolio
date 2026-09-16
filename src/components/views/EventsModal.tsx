import React, { useState } from 'react';
import { EventItem } from '../../types';
import { Calendar, MapPin, Tag, ExternalLink, X, Trophy, Sparkles } from 'lucide-react';

interface EventsModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: EventItem[];
}

export const EventsModal: React.FC<EventsModalProps> = ({ isOpen, onClose, events }) => {
  const [activeEvent, setActiveEvent] = useState<EventItem | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#0b0e14] border border-amber-500/40 rounded-2xl shadow-2xl shadow-black/80 text-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-[#101520] to-amber-950/40 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg sm:text-xl font-heading font-extrabold text-white">
                  NOTICE BOARD: EVENTS & ACTIVITIES
                </h2>
                <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                  Hackathons, Expos & Google Summits
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Public talks, enterprise expositions, and national competitive hackathon milestones.
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

        {/* Content */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="group rounded-xl bg-[#0f131a] border border-slate-800 hover:border-amber-500/50 transition-all overflow-hidden flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-950">
                    <img
                      src={ev.coverImage}
                      alt={ev.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-mono bg-slate-950/80 backdrop-blur-sm border border-slate-700 text-amber-400 px-2.5 py-1 rounded-full font-bold">
                        {ev.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>{ev.date}</span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {ev.name}
                    </h3>

                    <div className="flex items-center space-x-1 text-xs text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{ev.location}</span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      {ev.shortDesc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {ev.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setActiveEvent(ev)}
                    className="text-xs font-mono text-amber-400 hover:text-amber-300 font-semibold"
                  >
                    View Details & Photos →
                  </button>
                  {ev.externalLink && (
                    <a
                      href={ev.externalLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-white"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Expanded Event Detail Modal */}
          {activeEvent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
              <div className="relative w-full max-w-2xl bg-[#0e1219] border border-amber-500/40 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-base font-bold text-white">{activeEvent.name}</h3>
                  <button
                    onClick={() => setActiveEvent(null)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeEvent.fullDesc}
                </p>

                {activeEvent.photos && activeEvent.photos.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {activeEvent.photos.map((p, idx) => (
                      <img
                        key={idx}
                        src={p}
                        alt="Event photography"
                        className="rounded-lg object-cover h-36 w-full border border-slate-800"
                      />
                    ))}
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setActiveEvent(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-mono rounded-lg text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Workshop Calendar: Continuously Learning & Exhibiting</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Return to Garage
          </button>
        </div>

      </div>
    </div>
  );
};

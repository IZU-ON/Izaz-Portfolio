import React, { useState } from 'react';
import { EventItem, RecentActivity } from '../../types';
import { ThemeConfig } from '../../utils/theme';
import { ScrambleText } from '../common/ScrambleText';
import {
  Calendar,
  MapPin,
  ExternalLink,
  Edit2,
  Plus,
  Trash2,
  Sparkles,
  Trophy,
  Activity,
  Layers,
  X,
  Clock,
  CheckCircle2,
} from 'lucide-react';

interface ActivitiesEventsSectionProps {
  events: EventItem[];
  recentActivities: RecentActivity[];
  isAdmin?: boolean;
  onEditEvent?: (event: EventItem) => void;
  onAddEvent?: () => void;
  onDeleteEvent?: (eventId: string) => void;
  onDeleteActivity?: (actId: string) => void;
  onAddActivity?: () => void;
  themeConfig?: ThemeConfig;
  isLight?: boolean;
}

export const ActivitiesEventsSection: React.FC<ActivitiesEventsSectionProps> = ({
  events,
  recentActivities,
  isAdmin = false,
  onEditEvent,
  onAddEvent,
  onDeleteEvent,
  onDeleteActivity,
  onAddActivity,
  themeConfig,
  isLight = false,
}) => {
  const [activeTab, setActiveTab] = useState<'events' | 'activities'>('events');
  const [selectedEventModal, setSelectedEventModal] = useState<EventItem | null>(null);
  const [confirmDeleteEventId, setConfirmDeleteEventId] = useState<string | null>(null);
  const [confirmDeleteActId, setConfirmDeleteActId] = useState<string | null>(null);

  // Theme styling tokens
  const accentText = themeConfig?.accentText || (isLight ? 'text-blue-600' : 'text-emerald-400');
  const accentBg = themeConfig?.accentBg || (isLight ? 'bg-blue-50' : 'bg-emerald-500/10');
  const accentBorder = themeConfig?.accentBorder || (isLight ? 'border-blue-200' : 'border-emerald-500/30');
  const accentSolid = themeConfig?.accentSolid || (isLight ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950');
  const cardBg = themeConfig?.cardBg || (isLight ? 'bg-white' : 'bg-[#0d131f]/90');
  const cardBorder = themeConfig?.cardBorder || (isLight ? 'border-slate-200/90' : 'border-slate-800');

  return (
    <section id="activities" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 scroll-mt-20">
      {/* Secondary anchor support for #events */}
      <div id="events" className="absolute -top-24" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full font-mono text-xs uppercase tracking-wider mb-3 ${accentBg} ${accentBorder} ${accentText} border`}>
          <Activity className="w-3.5 h-3.5" />
          <span>Track Record & Highlights</span>
        </div>

        <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-mono font-bold tracking-tight mb-3 ${
          isLight ? 'text-slate-950' : 'text-white'
        }`}>
          <ScrambleText text="RECENT ACTIVITIES & EVENTS" />
        </h2>

        <p className={`max-w-2xl text-xs sm:text-sm font-mono ${
          isLight ? 'text-slate-600' : 'text-slate-400'
        }`}>
          Public presentations, keynote stages, competitive hackathons, and recent engineering activity stream.
        </p>

        {/* View Switcher Tabs (Events vs Recent Activity Stream) */}
        <div className="flex items-center space-x-2 mt-6 p-1 rounded-xl border backdrop-blur-md" style={{
          backgroundColor: isLight ? '#f1f5f9' : 'rgba(15, 23, 42, 0.6)',
          borderColor: isLight ? '#e2e8f0' : 'rgba(51, 65, 85, 0.4)'
        }}>
          <button
            onClick={() => setActiveTab('events')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-mono text-xs transition-all cursor-pointer ${
              activeTab === 'events'
                ? `${accentSolid} font-bold shadow-md`
                : isLight
                ? 'text-slate-600 hover:text-slate-900'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Events & Summits ({events?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('activities')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-mono text-xs transition-all cursor-pointer ${
              activeTab === 'activities'
                ? `${accentSolid} font-bold shadow-md`
                : isLight
                ? 'text-slate-600 hover:text-slate-900'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Activity Stream ({recentActivities?.length || 0})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: EVENTS & SUMMITS GRID */}
      {activeTab === 'events' && (
        <div>
          {isAdmin && (
            <div className="flex justify-end mb-6">
              <button
                onClick={onAddEvent}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-mono font-bold shadow-md cursor-pointer transition-transform hover:scale-102 ${accentSolid}`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Event & Milestone</span>
              </button>
            </div>
          )}

          {(!events || events.length === 0) ? (
            <div className={`p-12 text-center rounded-2xl border ${cardBg} ${cardBorder} font-mono text-sm ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              No events recorded currently.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className={`group rounded-2xl border ${cardBg} ${cardBorder} overflow-hidden flex flex-col justify-between shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                    themeConfig?.cardHoverBorder || 'hover:border-emerald-500/40'
                  }`}
                >
                  <div>
                    {/* Event Cover Image */}
                    <div className="relative h-48 overflow-hidden bg-slate-950">
                      <img
                        src={ev.coverImage || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'}
                        alt={ev.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full font-bold shadow-md border ${
                          isLight
                            ? 'bg-white/95 text-slate-900 border-slate-200'
                            : 'bg-slate-950/90 text-white border-slate-700'
                        }`}>
                          {ev.category}
                        </span>
                      </div>

                      {/* Admin Quick Action Controls */}
                      {isAdmin && (
                        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/70 backdrop-blur-md p-1 rounded-lg border border-white/20">
                          <button
                            onClick={() => onEditEvent?.(ev)}
                            title="Edit Event"
                            className="p-1 text-slate-300 hover:text-white transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setConfirmDeleteEventId(ev.id)}
                            title="Delete Event"
                            className="p-1 text-rose-400 hover:text-rose-300 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Delete Confirmation Box */}
                    {confirmDeleteEventId === ev.id && (
                      <div className="p-3 bg-rose-950/90 border-b border-rose-500/40 text-xs font-mono text-rose-200 flex items-center justify-between animate-in fade-in">
                        <span>Delete this event?</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              onDeleteEvent?.(ev.id);
                              setConfirmDeleteEventId(null);
                            }}
                            className="px-2 py-0.5 bg-rose-600 hover:bg-rose-500 text-white rounded font-bold cursor-pointer"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setConfirmDeleteEventId(null)}
                            className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Event Body */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className={`flex items-center space-x-1.5 ${accentText} font-semibold`}>
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{ev.date}</span>
                        </span>
                        <span className={`flex items-center space-x-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                          <MapPin className="w-3 h-3" />
                          <span>{ev.location}</span>
                        </span>
                      </div>

                      <h3 className={`text-base font-bold font-mono transition-colors ${
                        isLight ? 'text-slate-900 group-hover:text-blue-600' : 'text-white group-hover:text-emerald-300'
                      }`}>
                        {ev.name}
                      </h3>

                      <p className={`text-xs font-mono leading-relaxed line-clamp-3 ${
                        isLight ? 'text-slate-600' : 'text-slate-300'
                      }`}>
                        {ev.shortDesc}
                      </p>

                      {/* Tags */}
                      {ev.tags && ev.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {ev.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                                isLight
                                  ? 'bg-slate-100 border-slate-200 text-slate-600'
                                  : 'bg-slate-900/80 border-slate-800 text-slate-400'
                              }`}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className={`p-4 border-t flex items-center justify-between ${
                    isLight ? 'bg-slate-50/80 border-slate-100' : 'bg-slate-950/40 border-slate-800/80'
                  }`}>
                    <button
                      onClick={() => setSelectedEventModal(ev)}
                      className={`text-xs font-mono font-semibold hover:underline flex items-center space-x-1 cursor-pointer ${accentText}`}
                    >
                      <span>Read Story & Photos</span>
                      <span>→</span>
                    </button>

                    {ev.externalLink && (
                      <a
                        href={ev.externalLink}
                        target="_blank"
                        rel="noreferrer"
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isLight
                            ? 'border-slate-200 text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                            : 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                        title="Open External Resource"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: RECENT ACTIVITIES STREAM */}
      {activeTab === 'activities' && (
        <div className="max-w-3xl mx-auto space-y-4">
          {isAdmin && (
            <div className="flex justify-end mb-4">
              <button
                onClick={onAddActivity}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-mono font-bold shadow-md cursor-pointer transition-transform hover:scale-102 ${accentSolid}`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Log New Activity Item</span>
              </button>
            </div>
          )}

          {(!recentActivities || recentActivities.length === 0) ? (
            <div className={`p-12 text-center rounded-2xl border ${cardBg} ${cardBorder} font-mono text-sm ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              No activity logs recorded yet.
            </div>
          ) : (
            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-700/50">
              {recentActivities.map((act) => (
                <div
                  key={act.id}
                  className={`relative p-5 rounded-2xl border ${cardBg} ${cardBorder} shadow-md transition-all hover:translate-x-1`}
                >
                  {/* Timeline Node */}
                  <div className={`absolute -left-6 sm:-left-8 top-5 w-4 h-4 rounded-full border-2 ${
                    isLight ? 'border-white bg-blue-600 shadow-sm' : 'border-[#070b10] bg-emerald-400 shadow-emerald-400/50 shadow'
                  }`} />

                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold border ${accentBg} ${accentBorder} ${accentText}`}>
                        {act.type}
                      </span>
                      <h4 className={`text-sm font-bold font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        {act.title}
                      </h4>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className={`text-xs font-mono flex items-center space-x-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        <Clock className="w-3 h-3" />
                        <span>{act.timestamp}</span>
                      </span>

                      {isAdmin && (
                        <button
                          onClick={() => setConfirmDeleteActId(act.id)}
                          title="Delete Activity Entry"
                          className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* In-UI Delete Confirmation */}
                  {confirmDeleteActId === act.id && (
                    <div className="p-2 mb-2 bg-rose-950/80 border border-rose-500/40 rounded-lg text-xs font-mono text-rose-200 flex items-center justify-between animate-in fade-in">
                      <span>Remove this activity log?</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            onDeleteActivity?.(act.id);
                            setConfirmDeleteActId(null);
                          }}
                          className="px-2 py-0.5 bg-rose-600 hover:bg-rose-500 text-white rounded font-bold cursor-pointer"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setConfirmDeleteActId(null)}
                          className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <p className={`text-xs font-mono leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    {act.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* EXPANDED EVENT DETAIL & PHOTO MODAL */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
          <div className={`relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden ${cardBg} ${cardBorder}`}>
            
            {/* Modal Header */}
            <div className={`p-5 sm:p-6 border-b flex items-start justify-between ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
            }`}>
              <div>
                <div className="flex items-center space-x-2 mb-1.5">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${accentBg} ${accentBorder} ${accentText}`}>
                    {selectedEventModal.category}
                  </span>
                  <span className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    {selectedEventModal.date} • {selectedEventModal.location}
                  </span>
                </div>
                <h3 className={`text-lg sm:text-xl font-bold font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {selectedEventModal.name}
                </h3>
              </div>

              <button
                onClick={() => setSelectedEventModal(null)}
                className={`p-1.5 rounded-xl border transition-colors ${
                  isLight
                    ? 'border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                    : 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              <p className={`text-xs sm:text-sm font-mono leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
                {selectedEventModal.fullDesc || selectedEventModal.shortDesc}
              </p>

              {/* Photos Gallery Grid */}
              {selectedEventModal.photos && selectedEventModal.photos.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${accentText}`}>
                    Event Gallery & Visuals
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedEventModal.photos.map((imgUrl, i) => (
                      <div key={i} className="rounded-xl overflow-hidden border border-slate-700/60 bg-slate-950 h-44">
                        <img
                          src={imgUrl}
                          alt={`${selectedEventModal.name} photo ${i + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {selectedEventModal.tags && (
                <div className="flex flex-wrap gap-1.5 pt-3">
                  {selectedEventModal.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        isLight ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-slate-900 border-slate-800 text-slate-300'
                      }`}
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className={`p-4 border-t flex items-center justify-between ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
            }`}>
              {selectedEventModal.externalLink ? (
                <a
                  href={selectedEventModal.externalLink}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center space-x-1.5 text-xs font-mono font-semibold ${accentText} hover:underline`}
                >
                  <span>Official Event Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <div />
              )}

              <button
                onClick={() => setSelectedEventModal(null)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer ${
                  isLight ? 'bg-slate-200 hover:bg-slate-300 text-slate-900' : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

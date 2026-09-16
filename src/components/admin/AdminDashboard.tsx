import React, { useState } from 'react';
import {
  PortfolioData,
  ProjectItem,
  SkillTool,
  ExperienceItem,
  SoftwareItem,
  EducationItem,
  CertificationItem,
  EventItem,
  RecentActivity,
  ThemeMode,
} from '../../types';
import {
  Wrench,
  User,
  FileText,
  Boxes,
  Cpu,
  Briefcase,
  GraduationCap,
  Award,
  Save,
  Plus,
  Trash2,
  Edit2,
  ArrowUp,
  ArrowDown,
  LogOut,
  Upload,
  Download,
  RotateCcw,
  Check,
  ExternalLink,
  Shield,
  Phone,
  Camera,
  Layers,
  Calendar,
  Palette,
  Clock,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { THEMES_LIST, ThemeConfig } from '../../utils/theme';

export type AdminTab =
  | 'profile'
  | 'experience'
  | 'education'
  | 'projects'
  | 'skills'
  | 'events'
  | 'resume'
  | 'settings';

interface AdminDashboardProps {
  data: PortfolioData;
  onSaveData: (updated: PortfolioData, message?: string) => void;
  onLogout: () => void;
  onExport: () => void;
  onReset: () => void;
  initialTab?: AdminTab;
  initialEditingExperienceId?: string | null;
  initialEditingProjectId?: string | null;
  initialEditingSoftwareId?: string | null;
  themeConfig?: ThemeConfig;
  themeMode?: ThemeMode;
  onSelectTheme?: (theme: ThemeMode) => void;
  isLight?: boolean;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  data,
  onSaveData,
  onLogout,
  onExport,
  onReset,
  initialTab = 'profile',
  initialEditingExperienceId,
  initialEditingProjectId,
  initialEditingSoftwareId,
  themeConfig,
  themeMode = 'emerald',
  onSelectTheme,
  isLight = false,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>(initialTab);
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Edit modals/forms state
  const [editingExperience, setEditingExperience] = useState<ExperienceItem | null>(() => {
    if (initialEditingExperienceId) {
      return data.experience.find((e) => e.id === initialEditingExperienceId) || null;
    }
    return null;
  });

  // Dedicated text buffers so typing newlines (returns) or commas/spaces is never eaten
  const [expResponsibilitiesText, setExpResponsibilitiesText] = useState<string>(() => {
    if (initialEditingExperienceId) {
      const found = data.experience.find((e) => e.id === initialEditingExperienceId);
      return found?.responsibilities?.join('\n') || '';
    }
    return '';
  });

  const [expTechText, setExpTechText] = useState<string>(() => {
    if (initialEditingExperienceId) {
      const found = data.experience.find((e) => e.id === initialEditingExperienceId);
      return found?.technologies?.join(', ') || '';
    }
    return '';
  });

  const [editingProject, setEditingProject] = useState<ProjectItem | null>(() => {
    if (initialEditingProjectId) {
      return data.projects.find((p) => p.id === initialEditingProjectId) || null;
    }
    return null;
  });

  const [projectTechText, setProjectTechText] = useState<string>(() => {
    if (initialEditingProjectId) {
      const found = data.projects.find((p) => p.id === initialEditingProjectId);
      return found?.tech?.join(', ') || '';
    }
    return '';
  });

  const [editingSkill, setEditingSkill] = useState<SkillTool | null>(null);
  const [editingSoftware, setEditingSoftware] = useState<SoftwareItem | null>(() => {
    if (initialEditingSoftwareId && data.software) {
      return data.software.find((s) => s.id === initialEditingSoftwareId) || null;
    }
    return null;
  });

  // In-UI Confirmation state (replaces window.confirm which is blocked in sandboxed iframes)
  const [confirmDeleteExpId, setConfirmDeleteExpId] = useState<string | null>(null);
  const [confirmDeleteProjectId, setConfirmDeleteProjectId] = useState<string | null>(null);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  // Education & Certification Management state
  const [editingEducation, setEditingEducation] = useState<EducationItem | null>(null);
  const [eduHighlightsText, setEduHighlightsText] = useState<string>('');
  const [confirmDeleteEduId, setConfirmDeleteEduId] = useState<string | null>(null);

  const [editingCert, setEditingCert] = useState<CertificationItem | null>(null);
  const [confirmDeleteCertId, setConfirmDeleteCertId] = useState<string | null>(null);

  // Helper for saving
  const handleSave = (msg = 'Changes saved successfully to live portfolio!') => {
    onSaveData(formData, msg);
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3000);
  };

  // Safe Experience Editor Helpers
  const startEditingExperience = (exp: ExperienceItem) => {
    setEditingExperience(exp);
    setExpResponsibilitiesText(exp.responsibilities?.join('\n') || '');
    setExpTechText(exp.technologies?.join(', ') || '');
    setConfirmDeleteExpId(null);
  };

  const handleDeleteExperienceItem = (id: string, roleName = 'Role') => {
    const updatedList = formData.experience.filter((e) => e.id !== id);
    const updated = { ...formData, experience: updatedList };
    setFormData(updated);
    if (editingExperience?.id === id) {
      setEditingExperience(null);
    }
    setConfirmDeleteExpId(null);
    onSaveData(updated, `Deleted role: ${roleName}`);
    setSaveToast(`Deleted role: ${roleName}`);
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleAddExpTechTag = (tag: string) => {
    const clean = tag.trim();
    if (!clean || !editingExperience) return;
    const current = editingExperience.technologies || [];
    if (current.some((t) => t.toLowerCase() === clean.toLowerCase())) return;
    const next = [...current, clean];
    const updatedExp = { ...editingExperience, technologies: next };
    setEditingExperience(updatedExp);
    setExpTechText(next.join(', '));
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.map((ex) => (ex.id === updatedExp.id ? updatedExp : ex)),
    }));
  };

  const handleRemoveExpTechTag = (tagToRemove: string) => {
    if (!editingExperience) return;
    const next = (editingExperience.technologies || []).filter((t) => t !== tagToRemove);
    const updatedExp = { ...editingExperience, technologies: next };
    setEditingExperience(updatedExp);
    setExpTechText(next.join(', '));
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.map((ex) => (ex.id === updatedExp.id ? updatedExp : ex)),
    }));
  };

  // Safe Project Editor Helpers
  const startEditingProject = (proj: ProjectItem) => {
    setEditingProject(proj);
    setProjectTechText(proj.tech?.join(', ') || '');
    setConfirmDeleteProjectId(null);
  };

  const handleDeleteProjectItem = (id: string, title = 'Project') => {
    const updatedList = formData.projects.filter((p) => p.id !== id);
    const updated = { ...formData, projects: updatedList };
    setFormData(updated);
    if (editingProject?.id === id) {
      setEditingProject(null);
    }
    setConfirmDeleteProjectId(null);
    onSaveData(updated, `Deleted project: ${title}`);
    setSaveToast(`Deleted project: ${title}`);
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleAddProjectTechTag = (tag: string) => {
    const clean = tag.trim();
    if (!clean || !editingProject) return;
    const current = editingProject.tech || [];
    if (current.some((t) => t.toLowerCase() === clean.toLowerCase())) return;
    const next = [...current, clean];
    const updatedProj = { ...editingProject, tech: next };
    setEditingProject(updatedProj);
    setProjectTechText(next.join(', '));
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === updatedProj.id ? updatedProj : p)),
    }));
  };

  const handleRemoveProjectTechTag = (tagToRemove: string) => {
    if (!editingProject) return;
    const next = (editingProject.tech || []).filter((t) => t !== tagToRemove);
    const updatedProj = { ...editingProject, tech: next };
    setEditingProject(updatedProj);
    setProjectTechText(next.join(', '));
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === updatedProj.id ? updatedProj : p)),
    }));
  };

  // Resume File Upload handler (Base64)
  const handleResumeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      const updated: PortfolioData = {
        ...formData,
        resume: {
          ...formData.resume,
          fileName: file.name,
          lastUpdated: new Date().toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          }) + ' (Uploaded by Izaz)',
          customUploadedBase64: base64,
        },
      };
      setFormData(updated);
      onSaveData(updated, `Uploaded new resume: ${file.name}`);
      setSaveToast(`Uploaded & deployed new resume: ${file.name}`);
      setTimeout(() => setSaveToast(null), 3000);
    };
    reader.readAsDataURL(file);
  };

  // Profile Photo Upload handler (Base64)
  const handleProfilePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      const updated: PortfolioData = {
        ...formData,
        profile: {
          ...formData.profile,
          avatarUrl: base64,
        },
      };
      setFormData(updated);
      onSaveData(updated, `Updated centerpiece home photo: ${file.name}`);
      setSaveToast(`Centerpiece photo updated successfully!`);
      setTimeout(() => setSaveToast(null), 3000);
    };
    reader.readAsDataURL(file);
  };

  // Project Image Upload handler (Base64)
  const handleProjectImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingProject) return;
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      const updatedProj = { ...editingProject, imageUrl: base64 };
      setEditingProject(updatedProj);
      setFormData({
        ...formData,
        projects: formData.projects.map((p) => (p.id === updatedProj.id ? updatedProj : p)),
      });
      setSaveToast(`Uploaded image for ${editingProject.title}`);
      setTimeout(() => setSaveToast(null), 3000);
    };
    reader.readAsDataURL(file);
  };

  // Events and Activities state
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [eventTagsText, setEventTagsText] = useState<string>('');
  const [eventPhotosText, setEventPhotosText] = useState<string>('');
  const [confirmDeleteEventId, setConfirmDeleteEventId] = useState<string | null>(null);

  const [editingActivity, setEditingActivity] = useState<RecentActivity | null>(null);
  const [confirmDeleteActId, setConfirmDeleteActId] = useState<string | null>(null);

  const startEditingEvent = (ev: EventItem) => {
    setEditingEvent(ev);
    setEventTagsText(ev.tags?.join(', ') || '');
    setEventPhotosText(ev.photos?.join('\n') || '');
    setConfirmDeleteEventId(null);
  };

  const handleSaveEvent = (updated: EventItem) => {
    const nextList = (formData.events || []).map((e) => (e.id === updated.id ? updated : e));
    const nextFormData = { ...formData, events: nextList };
    setFormData(nextFormData);
    setEditingEvent(null);
    onSaveData(nextFormData, `Saved event: ${updated.name}`);
    setSaveToast(`Saved event: ${updated.name}`);
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleDeleteEvent = (id: string) => {
    const nextList = (formData.events || []).filter((e) => e.id !== id);
    const nextFormData = { ...formData, events: nextList };
    setFormData(nextFormData);
    setConfirmDeleteEventId(null);
    if (editingEvent?.id === id) setEditingEvent(null);
    onSaveData(nextFormData, `Deleted event`);
    setSaveToast('Event deleted');
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleSaveActivity = (updated: RecentActivity) => {
    const nextList = (formData.recentActivities || []).map((a) => (a.id === updated.id ? updated : a));
    const nextFormData = { ...formData, recentActivities: nextList };
    setFormData(nextFormData);
    setEditingActivity(null);
    onSaveData(nextFormData, `Saved activity item: ${updated.title}`);
    setSaveToast(`Saved activity: ${updated.title}`);
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleDeleteActivity = (id: string) => {
    const nextList = (formData.recentActivities || []).filter((a) => a.id !== id);
    const nextFormData = { ...formData, recentActivities: nextList };
    setFormData(nextFormData);
    setConfirmDeleteActId(null);
    if (editingActivity?.id === id) setEditingActivity(null);
    onSaveData(nextFormData, `Deleted activity item`);
    setSaveToast('Activity item deleted');
    setTimeout(() => setSaveToast(null), 3000);
  };

  // Dynamic Theme Tokens for Admin Dashboard matching the active home theme!
  const accentText = themeConfig?.accentText || (isLight ? 'text-blue-600' : 'text-emerald-400');
  const accentBg = themeConfig?.accentBg || (isLight ? 'bg-blue-50' : 'bg-emerald-500/10');
  const accentBorder = themeConfig?.accentBorder || (isLight ? 'border-blue-200' : 'border-emerald-500/30');
  const accentSolid = themeConfig?.accentSolid || (isLight ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950');
  const pageBg = themeConfig?.bg || (isLight ? 'bg-[#f8fafc]' : 'bg-[#090b10]');
  const surfaceBg = themeConfig?.surfaceBg || (isLight ? 'bg-[#f1f5f9]' : 'bg-[#0d1017]');
  const cardBg = themeConfig?.cardBg || (isLight ? 'bg-white' : 'bg-[#0e141f]/90');
  const cardBorder = themeConfig?.cardBorder || (isLight ? 'border-slate-200/90' : 'border-slate-800/80');

  return (
    <div className={`min-h-screen ${pageBg} ${isLight ? 'text-slate-900' : 'text-slate-100'} flex flex-col font-sans transition-colors duration-300`}>
      {/* Top Header Bar */}
      <header className={`sticky top-0 z-40 ${surfaceBg}/95 border-b ${accentBorder} backdrop-blur-md px-6 py-3.5 flex items-center justify-between`}>
        <div className="flex items-center space-x-3">
          <div className={`w-9 h-9 rounded-lg ${accentBg} ${accentText} border ${accentBorder} flex items-center justify-center`}>
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <h1 className={`text-sm font-mono font-bold tracking-wider ${accentText} uppercase flex items-center gap-2`}>
              <span>Executive CMS Control Room</span>
              <span className={`text-[10px] ${accentBg} ${accentText} px-2 py-0.5 rounded-full border ${accentBorder}`}>
                Live
              </span>
            </h1>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Content Management for {formData.profile.name}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Quick Admin Theme Switcher */}
          {onSelectTheme && (
            <div className="hidden md:flex items-center space-x-1.5 p-1 rounded-xl border bg-black/10 backdrop-blur-sm border-slate-700/50">
              <Palette className={`w-3.5 h-3.5 ml-1.5 ${accentText}`} />
              <select
                value={themeMode}
                onChange={(e) => onSelectTheme(e.target.value as ThemeMode)}
                className={`bg-transparent text-xs font-mono px-2 py-1 outline-none cursor-pointer rounded-lg ${
                  isLight ? 'text-slate-800' : 'text-slate-200'
                }`}
                title="Switch Theme"
              >
                {THEMES_LIST.map((t) => (
                  <option key={t.id} value={t.id} className="bg-slate-900 text-white">
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {saveToast && (
            <div className="hidden sm:flex items-center space-x-1.5 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1.5 rounded-lg animate-in fade-in">
              <Check className="w-3.5 h-3.5" />
              <span>{saveToast}</span>
            </div>
          )}

          <button
            onClick={() => handleSave()}
            className={`flex items-center space-x-2 px-4 py-2 font-mono font-bold text-xs rounded-lg shadow-lg transition-all cursor-pointer ${accentSolid}`}
          >
            <Save className="w-4 h-4" />
            <span>Save All Live</span>
          </button>

          <button
            onClick={onLogout}
            className={`flex items-center space-x-1.5 px-3 py-2 ${
              isLight
                ? 'bg-slate-200 hover:bg-slate-300 text-slate-800 border border-slate-300'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800'
            } rounded-lg text-xs font-mono transition-colors cursor-pointer`}
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Exit to Site</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Sidebar Navigation */}
        <aside className={`w-full md:w-64 ${surfaceBg} border-r ${
          isLight ? 'border-slate-200' : 'border-slate-800/80'
        } p-4 space-y-1.5`}>
          <div className={`text-[11px] font-mono uppercase tracking-wider ${
            isLight ? 'text-slate-500' : 'text-slate-400'
          } px-3 py-2`}>
            Workspace Modules
          </div>

          {[
            { id: 'profile', label: 'Profile & Contact', icon: User },
            { id: 'experience', label: 'Experience', icon: Briefcase },
            { id: 'education', label: 'Education & Certs', icon: GraduationCap },
            { id: 'projects', label: 'Projects', icon: Boxes },
            { id: 'skills', label: 'Skills & Software', icon: Cpu },
            { id: 'events', label: 'Activities & Events', icon: Calendar, highlight: true },
            { id: 'resume', label: 'Resume Management', icon: FileText },
            { id: 'settings', label: 'Security & Backup', icon: Shield },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  active
                    ? `${accentBg} ${accentText} font-semibold border ${accentBorder} shadow-sm`
                    : isLight
                    ? 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className={`w-4 h-4 ${active ? accentText : isLight ? 'text-slate-500' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </div>
                {tab.highlight && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </button>
            );
          })}

          <div className={`pt-6 border-t ${isLight ? 'border-slate-200' : 'border-slate-800/80'} mt-6 px-3`}>
            <div className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-500'} font-mono leading-relaxed`}>
              Edits update immediately on the live portfolio. Saved locally to browser cache with JSON export capability.
            </div>
          </div>
        </aside>

        {/* Dashboard Tab Content Area */}
        <main className="flex-1 p-6 lg:p-8 max-w-5xl overflow-y-auto">
          
          {/* TAB 1: PROFILE & CONTACT */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-mono font-bold text-amber-400">Profile & Contact</h2>
                  <p className="text-xs text-slate-400">Manage your public personal details, centerpiece photo, and contact channels.</p>
                </div>
                <button
                  onClick={() => handleSave('Profile updated!')}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-mono font-bold text-xs rounded-lg cursor-pointer"
                >
                  Save Profile
                </button>
              </div>

              {/* Middle Picture Management */}
              <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
                <h3 className="text-sm font-mono font-bold text-white flex items-center gap-2">
                  <Camera className="w-4 h-4 text-amber-400" />
                  <span>Home Centerpiece Portrait Photo</span>
                </h3>
                
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <div className="w-28 h-32 rounded-xl overflow-hidden bg-slate-950 border-2 border-amber-500/40 shrink-0">
                    <img
                      src={formData.profile.avatarUrl}
                      alt={formData.profile.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="flex-1 space-y-3 w-full">
                    <div>
                      <label className="text-xs font-mono text-slate-300">Photo URL</label>
                      <input
                        type="text"
                        value={formData.profile.avatarUrl}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            profile: { ...formData.profile, avatarUrl: e.target.value },
                          })
                        }
                        placeholder="https://..."
                        className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono cursor-pointer transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo from Computer</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProfilePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-300">Full Name</label>
                  <input
                    type="text"
                    value={formData.profile.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        profile: { ...formData.profile, name: e.target.value },
                      })
                    }
                    className="w-full mt-1.5 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300">Top-Left Branding Subtitle / Tagline</label>
                  <input
                    type="text"
                    placeholder="AI & SYSTEMS CRAFTSMAN"
                    value={formData.profile.tagline || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        profile: { ...formData.profile, tagline: e.target.value },
                      })
                    }
                    className="w-full mt-1.5 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm font-mono text-amber-300 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300">Professional Title</label>
                  <input
                    type="text"
                    value={formData.profile.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        profile: { ...formData.profile, title: e.target.value },
                      })
                    }
                    className="w-full mt-1.5 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="text"
                    value={formData.profile.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        profile: { ...formData.profile, phone: e.target.value },
                      })
                    }
                    className="w-full mt-1.5 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm font-mono text-amber-300"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300">Email Address</label>
                  <input
                    type="email"
                    value={formData.profile.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        profile: { ...formData.profile, email: e.target.value },
                      })
                    }
                    className="w-full mt-1.5 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300">Location</label>
                  <input
                    type="text"
                    value={formData.profile.location}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        profile: { ...formData.profile, location: e.target.value },
                      })
                    }
                    className="w-full mt-1.5 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300">LinkedIn URL</label>
                  <input
                    type="text"
                    value={formData.profile.linkedIn}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        profile: { ...formData.profile, linkedIn: e.target.value },
                      })
                    }
                    className="w-full mt-1.5 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300">GitHub URL</label>
                  <input
                    type="text"
                    value={formData.profile.github}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        profile: { ...formData.profile, github: e.target.value },
                      })
                    }
                    className="w-full mt-1.5 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300">Executive Bio & Overview</label>
                <textarea
                  rows={4}
                  value={formData.profile.bio}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      profile: { ...formData.profile, bio: e.target.value },
                    })
                  }
                  className="w-full mt-1.5 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* TAB 2: EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-mono font-bold text-amber-400">Professional Experience</h2>
                  <p className="text-xs text-slate-400">
                    Add, edit, or reorder career milestones, organization links, and architectural deliverables.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newExp: ExperienceItem = {
                      id: 'exp-' + Date.now(),
                      role: 'Senior Software Craftsman',
                      company: 'Innovative Tech Labs',
                      companyUrl: 'https://github.com/izazahamad',
                      link: 'https://github.com/izazahamad',
                      duration: '2025 - Present',
                      location: 'Bengaluru, India',
                      description: 'Architecting distributed systems, neural pipelines, and low-latency infrastructure.',
                      responsibilities: [
                        'Engineered distributed inference services',
                        'Delivered sub-10ms response latency across production clusters',
                      ],
                      achievements: ['Increased system throughput by 45%'],
                      technologies: ['TypeScript', 'Python', 'PyTorch', 'Docker'],
                      carMilestone: 'High-Performance Engine Overhaul',
                    };
                    setFormData({ ...formData, experience: [newExp, ...formData.experience] });
                    startEditingExperience(newExp);
                  }}
                  className="flex items-center space-x-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-mono font-bold text-xs rounded-lg cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Role</span>
                </button>
              </div>

              {/* Experience Edit Form */}
              {editingExperience && (
                <div className="p-6 rounded-2xl bg-[#0f1420] border-2 border-amber-500/50 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">
                        Editing Role
                      </span>
                      <h3 className="text-base font-mono font-bold text-white">
                        {editingExperience.role || 'New Role'} @ {editingExperience.company || 'Company'}
                      </h3>
                    </div>
                    <button
                      onClick={() => setEditingExperience(null)}
                      className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300"
                    >
                      Done Editing
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-300">Position / Role Title</label>
                      <input
                        type="text"
                        value={editingExperience.role}
                        onChange={(e) => {
                          const updated = { ...editingExperience, role: e.target.value };
                          setEditingExperience(updated);
                          setFormData({
                            ...formData,
                            experience: formData.experience.map((ex) =>
                              ex.id === updated.id ? updated : ex
                            ),
                          });
                        }}
                        className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300">Company / Organization</label>
                      <input
                        type="text"
                        value={editingExperience.company}
                        onChange={(e) => {
                          const updated = { ...editingExperience, company: e.target.value };
                          setEditingExperience(updated);
                          setFormData({
                            ...formData,
                            experience: formData.experience.map((ex) =>
                              ex.id === updated.id ? updated : ex
                            ),
                          });
                        }}
                        className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300">Organization / Repository URL</label>
                      <input
                        type="text"
                        value={editingExperience.companyUrl || editingExperience.link || ''}
                        onChange={(e) => {
                          const updated = {
                            ...editingExperience,
                            companyUrl: e.target.value,
                            link: e.target.value,
                          };
                          setEditingExperience(updated);
                          setFormData({
                            ...formData,
                            experience: formData.experience.map((ex) =>
                              ex.id === updated.id ? updated : ex
                            ),
                          });
                        }}
                        placeholder="https://github.com/... or https://company.com"
                        className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300">Duration (e.g. 2024 - Present)</label>
                      <input
                        type="text"
                        value={editingExperience.duration}
                        onChange={(e) => {
                          const updated = { ...editingExperience, duration: e.target.value };
                          setEditingExperience(updated);
                          setFormData({
                            ...formData,
                            experience: formData.experience.map((ex) =>
                              ex.id === updated.id ? updated : ex
                            ),
                          });
                        }}
                        className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300">Location</label>
                      <input
                        type="text"
                        value={editingExperience.location}
                        onChange={(e) => {
                          const updated = { ...editingExperience, location: e.target.value };
                          setEditingExperience(updated);
                          setFormData({
                            ...formData,
                            experience: formData.experience.map((ex) =>
                              ex.id === updated.id ? updated : ex
                            ),
                          });
                        }}
                        className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300">Key Milestone Note</label>
                      <input
                        type="text"
                        value={editingExperience.carMilestone || ''}
                        onChange={(e) => {
                          const updated = { ...editingExperience, carMilestone: e.target.value };
                          setEditingExperience(updated);
                          setFormData({
                            ...formData,
                            experience: formData.experience.map((ex) =>
                              ex.id === updated.id ? updated : ex
                            ),
                          });
                        }}
                        className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300">Role Overview / Summary</label>
                    <textarea
                      rows={3}
                      value={editingExperience.description}
                      onChange={(e) => {
                        const updated = { ...editingExperience, description: e.target.value };
                        setEditingExperience(updated);
                        setFormData({
                          ...formData,
                          experience: formData.experience.map((ex) =>
                            ex.id === updated.id ? updated : ex
                          ),
                        });
                      }}
                      className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-mono text-slate-300">
                        Deliverables / Responsibilities (One per line)
                      </label>
                      <span className="text-[10px] font-mono text-slate-500">
                        Press Enter for new line
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      value={expResponsibilitiesText}
                      onChange={(e) => {
                        const text = e.target.value;
                        setExpResponsibilitiesText(text);
                        const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
                        const updated = {
                          ...editingExperience,
                          responsibilities: lines,
                        };
                        setEditingExperience(updated);
                        setFormData({
                          ...formData,
                          experience: formData.experience.map((ex) =>
                            ex.id === updated.id ? updated : ex
                          ),
                        });
                      }}
                      placeholder="Architected distributed event pipelines&#10;Engineered low-latency C++ inference service&#10;Mentored team of engineers"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm font-mono text-white focus:border-amber-500 focus:outline-none leading-relaxed"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono text-slate-300">
                        Technologies Used (type comma-separated or click tags)
                      </label>
                      <span className="text-[10px] font-mono text-slate-500">
                        Type commas or press Enter to add
                      </span>
                    </div>
                    <input
                      type="text"
                      value={expTechText}
                      onChange={(e) => {
                        const text = e.target.value;
                        setExpTechText(text);
                        const tags = text.split(',').map((t) => t.trim()).filter(Boolean);
                        const updated = {
                          ...editingExperience,
                          technologies: tags,
                        };
                        setEditingExperience(updated);
                        setFormData({
                          ...formData,
                          experience: formData.experience.map((ex) =>
                            ex.id === updated.id ? updated : ex
                          ),
                        });
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const tags = expTechText.split(',').map((t) => t.trim()).filter(Boolean);
                          if (tags.length > 0) {
                            setExpTechText(tags.join(', ') + ', ');
                          }
                        }
                      }}
                      placeholder="e.g. Python, PyTorch, Docker, TypeScript"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:border-amber-500 focus:outline-none font-mono"
                    />

                    {/* Active tags with quick remove badges */}
                    {editingExperience.technologies && editingExperience.technologies.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[10px] font-mono text-slate-500 mr-1">Current:</span>
                        {editingExperience.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono"
                          >
                            <span>{tech}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveExpTechTag(tech)}
                              className="hover:text-red-400 p-0.5 rounded transition-colors cursor-pointer"
                              title={`Remove ${tech}`}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Quick suggestion tags */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-mono text-slate-500 mr-1">Quick add:</span>
                      {['Python', 'PyTorch', 'TypeScript', 'Docker', 'Kubernetes', 'FastAPI', 'AWS', 'React', 'C++', 'PostgreSQL', 'TensorFlow', 'CUDA'].map((suggest) => {
                        const alreadyHas = (editingExperience.technologies || []).some(
                          (t) => t.toLowerCase() === suggest.toLowerCase()
                        );
                        if (alreadyHas) return null;
                        return (
                          <button
                            key={suggest}
                            type="button"
                            onClick={() => handleAddExpTechTag(suggest)}
                            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 text-[11px] font-mono transition-colors cursor-pointer"
                          >
                            + {suggest}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between pt-4 border-t border-slate-800/80 gap-3">
                    {/* In-UI Delete role button with confirmation */}
                    {confirmDeleteExpId === editingExperience.id ? (
                      <div className="flex items-center gap-2 p-1.5 rounded-xl bg-red-950/80 border border-red-800">
                        <span className="text-xs font-mono text-red-200 px-1">Permanently delete role?</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteExperienceItem(editingExperience.id, editingExperience.role)}
                          className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold rounded-lg cursor-pointer transition-colors"
                        >
                          Confirm Delete
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteExpId(null)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs rounded-lg cursor-pointer transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteExpId(editingExperience.id)}
                        className="flex items-center space-x-1.5 px-3.5 py-2 bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-300 border border-red-800/50 font-mono text-xs font-bold rounded-lg cursor-pointer transition-colors"
                        title="Delete this role"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete Role</span>
                      </button>
                    )}

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingExperience(null)}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs rounded-lg cursor-pointer transition-colors"
                      >
                        Done
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleSave(`Saved changes to ${editingExperience.role}`);
                          setEditingExperience(null);
                        }}
                        className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs rounded-lg cursor-pointer transition-colors shadow-md"
                      >
                        Save Role Updates
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Roles List */}
              <div className="space-y-4">
                {formData.experience.map((exp, idx) => (
                  <div
                    key={exp.id || idx}
                    className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold">
                          Role 0{idx + 1}
                        </span>
                        <h3 className="text-base font-bold text-white font-mono">{exp.role}</h3>
                      </div>
                      <p className="text-xs font-mono text-amber-400">
                        {exp.company} • {exp.duration} • {exp.location}
                      </p>
                      {exp.carMilestone && (
                        <p className="text-xs text-emerald-400 font-mono">
                          Milestone: {exp.carMilestone}
                        </p>
                      )}
                      {(exp.companyUrl || exp.link) && (
                        <a
                          href={exp.companyUrl || exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 text-[11px] font-mono text-slate-400 hover:text-amber-400 mt-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>{exp.companyUrl || exp.link}</span>
                        </a>
                      )}
                    </div>

                    <div className="flex items-center space-x-1.5 shrink-0 self-end md:self-auto">
                      <button
                        disabled={idx === 0}
                        onClick={() => {
                          const list = [...formData.experience];
                          const [removed] = list.splice(idx, 1);
                          list.splice(idx - 1, 0, removed);
                          setFormData({ ...formData, experience: list });
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                        title="Move Up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>

                      <button
                        disabled={idx === formData.experience.length - 1}
                        onClick={() => {
                          const list = [...formData.experience];
                          const [removed] = list.splice(idx, 1);
                          list.splice(idx + 1, 0, removed);
                          setFormData({ ...formData, experience: list });
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                        title="Move Down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => startEditingExperience(exp)}
                        className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40 text-xs font-mono font-bold cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      {confirmDeleteExpId === exp.id ? (
                        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-red-950/80 border border-red-800">
                          <span className="text-[11px] font-mono text-red-200 px-1">Delete role?</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteExperienceItem(exp.id, exp.role)}
                            className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white font-mono text-[11px] font-bold rounded cursor-pointer transition-colors"
                          >
                            Yes, Delete
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteExpId(null)}
                            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px] rounded cursor-pointer transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteExpId(exp.id)}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-red-950 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                          title="Delete Role"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: EDUCATION & CERTIFICATIONS */}
          {activeTab === 'education' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-mono font-bold text-amber-400">Education & Certifications</h2>
                  <p className="text-xs text-slate-400">
                    Manage academic degrees, universities, verified technical credentials, and professional certifications.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      const newEdu: EducationItem = {
                        id: 'edu-' + Date.now(),
                        degree: 'Master of Technology / B.Tech',
                        specialization: 'Computer Science & Engineering',
                        institution: 'National University / Institute',
                        years: '2020 - 2024',
                        grade: 'Distinction / 8.8 CGPA',
                        achievements: [
                          'Specialization in Distributed Systems and Deep Learning',
                          'Published research on low-latency neural processing',
                        ],
                      };
                      const nextList = [...(formData.education || []), newEdu];
                      setFormData({ ...formData, education: nextList });
                      setEditingEducation(newEdu);
                      setEduHighlightsText(newEdu.achievements?.join('\n') || '');
                    }}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Degree</span>
                  </button>

                  <button
                    onClick={() => {
                      const newCert: CertificationItem = {
                        id: 'cert-' + Date.now(),
                        name: 'Cloud & Deep Learning Specialist',
                        issuer: 'Google Cloud / AWS / DeepLearning.AI',
                        date: '2025',
                        link: 'https://github.com/izazahamad',
                        category: 'AI / Machine Learning',
                      };
                      const nextList = [...(formData.certifications || []), newCert];
                      setFormData({ ...formData, certifications: nextList });
                      setEditingCert(newCert);
                    }}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Certification</span>
                  </button>
                </div>
              </div>

              {/* 1. Academic Degrees Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-mono font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-amber-400" />
                    <span>Academic Degrees & Qualifications</span>
                  </h3>
                </div>

                {/* Degree Editing Drawer */}
                {editingEducation && (
                  <div className="p-6 rounded-2xl bg-slate-900 border-2 border-amber-500/50 shadow-2xl space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center space-x-2">
                        <Edit2 className="w-4 h-4 text-amber-400" />
                        <h4 className="font-mono font-bold text-sm text-white">
                          Editing Degree: {editingEducation.degree}
                        </h4>
                      </div>
                      <button
                        onClick={() => setEditingEducation(null)}
                        className="text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1 bg-slate-800 rounded cursor-pointer"
                      >
                        Done Editing
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono text-slate-300">Degree Name</label>
                        <input
                          type="text"
                          value={editingEducation.degree}
                          onChange={(e) => {
                            const updated = { ...editingEducation, degree: e.target.value };
                            setEditingEducation(updated);
                            setFormData({
                              ...formData,
                              education: (formData.education || []).map((ed) =>
                                ed.id === updated.id ? updated : ed
                              ),
                            });
                          }}
                          className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-300">Specialization / Major</label>
                        <input
                          type="text"
                          value={editingEducation.specialization}
                          onChange={(e) => {
                            const updated = { ...editingEducation, specialization: e.target.value };
                            setEditingEducation(updated);
                            setFormData({
                              ...formData,
                              education: (formData.education || []).map((ed) =>
                                ed.id === updated.id ? updated : ed
                              ),
                            });
                          }}
                          className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-300">Institution / University</label>
                        <input
                          type="text"
                          value={editingEducation.institution}
                          onChange={(e) => {
                            const updated = { ...editingEducation, institution: e.target.value };
                            setEditingEducation(updated);
                            setFormData({
                              ...formData,
                              education: (formData.education || []).map((ed) =>
                                ed.id === updated.id ? updated : ed
                              ),
                            });
                          }}
                          className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-300">Years / Duration (e.g. 2020 - 2024)</label>
                        <input
                          type="text"
                          value={editingEducation.years}
                          onChange={(e) => {
                            const updated = { ...editingEducation, years: e.target.value };
                            setEditingEducation(updated);
                            setFormData({
                              ...formData,
                              education: (formData.education || []).map((ed) =>
                                ed.id === updated.id ? updated : ed
                              ),
                            });
                          }}
                          className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-300">Grade / CGPA (Optional)</label>
                        <input
                          type="text"
                          value={editingEducation.grade || ''}
                          onChange={(e) => {
                            const updated = { ...editingEducation, grade: e.target.value };
                            setEditingEducation(updated);
                            setFormData({
                              ...formData,
                              education: (formData.education || []).map((ed) =>
                                ed.id === updated.id ? updated : ed
                              ),
                            });
                          }}
                          className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">
                        Achievements & Highlights (One per line)
                      </label>
                      <textarea
                        rows={3}
                        value={eduHighlightsText}
                        onChange={(e) => {
                          const text = e.target.value;
                          setEduHighlightsText(text);
                          const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
                          const updated = { ...editingEducation, achievements: lines };
                          setEditingEducation(updated);
                          setFormData({
                            ...formData,
                            education: (formData.education || []).map((ed) =>
                              ed.id === updated.id ? updated : ed
                            ),
                          });
                        }}
                        placeholder="Academic excellence&#10;Key research thesis&#10;Honors & awards"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm font-mono text-white"
                      />
                    </div>
                  </div>
                )}

                {/* Degree Cards List */}
                <div className="space-y-3">
                  {(formData.education || []).map((edu, idx) => (
                    <div
                      key={edu.id}
                      className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-mono text-amber-400 font-bold">
                            #{idx + 1}
                          </span>
                          <h4 className="font-mono font-bold text-white text-sm">
                            {edu.degree} {edu.specialization ? `in ${edu.specialization}` : ''}
                          </h4>
                        </div>
                        <div className="text-xs text-slate-400 font-mono mt-0.5">
                          {edu.institution} • {edu.years}
                        </div>
                        {edu.grade && (
                          <span className="inline-block mt-1 px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono text-[10px] border border-amber-500/30">
                            {edu.grade}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-1.5 shrink-0 self-end md:self-auto">
                        <button
                          disabled={idx === 0}
                          onClick={() => {
                            const list = [...(formData.education || [])];
                            const [removed] = list.splice(idx, 1);
                            list.splice(idx - 1, 0, removed);
                            setFormData({ ...formData, education: list });
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                          title="Move Up"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>

                        <button
                          disabled={idx === (formData.education || []).length - 1}
                          onClick={() => {
                            const list = [...(formData.education || [])];
                            const [removed] = list.splice(idx, 1);
                            list.splice(idx + 1, 0, removed);
                            setFormData({ ...formData, education: list });
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                          title="Move Down"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            setEditingEducation(edu);
                            setEduHighlightsText(edu.achievements?.join('\n') || '');
                          }}
                          className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40 text-xs font-mono font-bold cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        {confirmDeleteEduId === edu.id ? (
                          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-red-950/80 border border-red-800">
                            <span className="text-[11px] font-mono text-red-200 px-1">Delete degree?</span>
                            <button
                              type="button"
                              onClick={() => {
                                const nextList = (formData.education || []).filter((e) => e.id !== edu.id);
                                setFormData({ ...formData, education: nextList });
                                if (editingEducation?.id === edu.id) setEditingEducation(null);
                                setConfirmDeleteEduId(null);
                                handleSave(`Deleted degree: ${edu.degree}`);
                              }}
                              className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white font-mono text-[11px] font-bold rounded cursor-pointer transition-colors"
                            >
                              Yes, Delete
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteEduId(null)}
                              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px] rounded cursor-pointer transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteEduId(edu.id)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-red-950 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                            title="Delete Degree"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Technical Certifications Section */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-mono font-bold text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Technical Certifications & Professional Badges</span>
                  </h3>
                </div>

                {/* Certification Edit Drawer */}
                {editingCert && (
                  <div className="p-6 rounded-2xl bg-slate-900 border-2 border-amber-500/50 shadow-2xl space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center space-x-2">
                        <Edit2 className="w-4 h-4 text-amber-400" />
                        <h4 className="font-mono font-bold text-sm text-white">
                          Editing Certification: {editingCert.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => setEditingCert(null)}
                        className="text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1 bg-slate-800 rounded cursor-pointer"
                      >
                        Done Editing
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono text-slate-300">Certification Name</label>
                        <input
                          type="text"
                          value={editingCert.name}
                          onChange={(e) => {
                            const updated = { ...editingCert, name: e.target.value };
                            setEditingCert(updated);
                            setFormData({
                              ...formData,
                              certifications: (formData.certifications || []).map((c) =>
                                c.id === updated.id ? updated : c
                              ),
                            });
                          }}
                          className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-300">Issuer / Organization</label>
                        <input
                          type="text"
                          value={editingCert.issuer}
                          onChange={(e) => {
                            const updated = { ...editingCert, issuer: e.target.value };
                            setEditingCert(updated);
                            setFormData({
                              ...formData,
                              certifications: (formData.certifications || []).map((c) =>
                                c.id === updated.id ? updated : c
                              ),
                            });
                          }}
                          className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-300">Date Issued / Valid Year</label>
                        <input
                          type="text"
                          value={editingCert.date}
                          onChange={(e) => {
                            const updated = { ...editingCert, date: e.target.value };
                            setEditingCert(updated);
                            setFormData({
                              ...formData,
                              certifications: (formData.certifications || []).map((c) =>
                                c.id === updated.id ? updated : c
                              ),
                            });
                          }}
                          className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-300">Category (e.g. AI / Cloud)</label>
                        <input
                          type="text"
                          value={editingCert.category || ''}
                          onChange={(e) => {
                            const updated = { ...editingCert, category: e.target.value };
                            setEditingCert(updated);
                            setFormData({
                              ...formData,
                              certifications: (formData.certifications || []).map((c) =>
                                c.id === updated.id ? updated : c
                              ),
                            });
                          }}
                          className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-mono text-slate-300">Credential Verification URL</label>
                        <input
                          type="text"
                          placeholder="https://..."
                          value={editingCert.link || ''}
                          onChange={(e) => {
                            const updated = { ...editingCert, link: e.target.value };
                            setEditingCert(updated);
                            setFormData({
                              ...formData,
                              certifications: (formData.certifications || []).map((c) =>
                                c.id === updated.id ? updated : c
                              ),
                            });
                          }}
                          className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Certification Cards List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(formData.certifications || []).map((cert) => (
                    <div
                      key={cert.id}
                      className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start justify-between gap-3"
                    >
                      <div className="min-w-0 flex-1">
                        <h4 className="font-mono font-bold text-white text-sm truncate">
                          {cert.name}
                        </h4>
                        <div className="text-xs text-slate-400 font-mono mt-0.5">
                          {cert.issuer} • {cert.date}
                        </div>
                        {cert.link && (
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 text-[11px] font-mono text-amber-400 hover:underline mt-1.5"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Verify Credential</span>
                          </a>
                        )}
                      </div>

                      <div className="flex items-center space-x-1.5 shrink-0">
                        <button
                          onClick={() => setEditingCert(cert)}
                          className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40 text-xs font-mono cursor-pointer"
                          title="Edit Certification"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        {confirmDeleteCertId === cert.id ? (
                          <div className="flex items-center gap-1 p-1 rounded-lg bg-red-950/80 border border-red-800">
                            <button
                              type="button"
                              onClick={() => {
                                const nextList = (formData.certifications || []).filter((c) => c.id !== cert.id);
                                setFormData({ ...formData, certifications: nextList });
                                if (editingCert?.id === cert.id) setEditingCert(null);
                                setConfirmDeleteCertId(null);
                                handleSave(`Deleted certification: ${cert.name}`);
                              }}
                              className="px-2 py-0.5 bg-red-600 hover:bg-red-500 text-white font-mono text-[10px] font-bold rounded cursor-pointer"
                            >
                              Delete
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteCertId(null)}
                              className="px-1.5 py-0.5 bg-slate-800 text-slate-300 font-mono text-[10px] rounded cursor-pointer"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteCertId(cert.id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                            title="Delete Certification"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-mono font-bold text-amber-400">Projects Management</h2>
                  <p className="text-xs text-slate-400">
                    Add, edit, reorder, or feature production systems on the portfolio.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newProj: ProjectItem = {
                      id: 'proj-' + Date.now(),
                      title: 'New High-Performance Project',
                      category: 'AI/ML',
                      shortDesc: 'A brief description of this new engineering build.',
                      detailedDesc: 'Complete architecture details, benchmarks, and metrics.',
                      tech: ['Python', 'PyTorch', 'React'],
                      githubUrl: 'https://github.com/izazahamad',
                      demoUrl: 'https://demo.izazahamad.dev',
                      date: '2026',
                      featured: true,
                      imageUrl:
                        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
                    };
                    setFormData({ ...formData, projects: [newProj, ...formData.projects] });
                    startEditingProject(newProj);
                  }}
                  className="flex items-center space-x-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-mono font-bold text-xs rounded-lg cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Edit Project Form */}
              {editingProject && (
                <div className="p-6 rounded-2xl bg-[#0f1420] border-2 border-amber-500/50 space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <h4 className="text-sm font-mono font-bold text-amber-400">
                      Editing Project: {editingProject.title}
                    </h4>
                    <button
                      onClick={() => setEditingProject(null)}
                      className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300"
                    >
                      Done Editing
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-300">Project Title</label>
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={(e) => {
                          const updated = { ...editingProject, title: e.target.value };
                          setEditingProject(updated);
                          setFormData({
                            ...formData,
                            projects: formData.projects.map((p) =>
                              p.id === updated.id ? updated : p
                            ),
                          });
                        }}
                        className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300">
                        Category (Custom category allowed)
                      </label>
                      <input
                        type="text"
                        list="project-categories"
                        value={editingProject.category}
                        onChange={(e) => {
                          const updated = { ...editingProject, category: e.target.value };
                          setEditingProject(updated);
                          setFormData({
                            ...formData,
                            projects: formData.projects.map((p) =>
                              p.id === updated.id ? updated : p
                            ),
                          });
                        }}
                        placeholder="e.g. AI/ML, Full-Stack, Robotics"
                        className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                      <datalist id="project-categories">
                        <option value="AI/ML" />
                        <option value="Full-Stack" />
                        <option value="WebGL & Graphics" />
                        <option value="Robotics & IoT" />
                        <option value="Cloud Systems" />
                      </datalist>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300">GitHub URL</label>
                      <input
                        type="text"
                        value={editingProject.githubUrl}
                        onChange={(e) => {
                          const updated = { ...editingProject, githubUrl: e.target.value };
                          setEditingProject(updated);
                          setFormData({
                            ...formData,
                            projects: formData.projects.map((p) =>
                              p.id === updated.id ? updated : p
                            ),
                          });
                        }}
                        className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300">Live Demo URL</label>
                      <input
                        type="text"
                        value={editingProject.demoUrl}
                        onChange={(e) => {
                          const updated = { ...editingProject, demoUrl: e.target.value };
                          setEditingProject(updated);
                          setFormData({
                            ...formData,
                            projects: formData.projects.map((p) =>
                              p.id === updated.id ? updated : p
                            ),
                          });
                        }}
                        className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300">Short Summary</label>
                      <input
                        type="text"
                        value={editingProject.shortDesc}
                        onChange={(e) => {
                          const updated = { ...editingProject, shortDesc: e.target.value };
                          setEditingProject(updated);
                          setFormData({
                            ...formData,
                            projects: formData.projects.map((p) =>
                              p.id === updated.id ? updated : p
                            ),
                          });
                        }}
                        className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300">Release Year / Date</label>
                      <input
                        type="text"
                        value={editingProject.date}
                        onChange={(e) => {
                          const updated = { ...editingProject, date: e.target.value };
                          setEditingProject(updated);
                          setFormData({
                            ...formData,
                            projects: formData.projects.map((p) =>
                              p.id === updated.id ? updated : p
                            ),
                          });
                        }}
                        className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                    </div>
                  </div>

                  {/* Project Image and Upload */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <label className="text-xs font-mono text-slate-300">Project Screenshot / Image</label>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {editingProject.imageUrl && (
                        <img
                          src={editingProject.imageUrl}
                          alt={editingProject.title}
                          className="w-32 h-20 object-cover rounded-lg border border-slate-700 shrink-0"
                        />
                      )}
                      <div className="flex-1 w-full space-y-2">
                        <input
                          type="text"
                          value={editingProject.imageUrl}
                          onChange={(e) => {
                            const updated = { ...editingProject, imageUrl: e.target.value };
                            setEditingProject(updated);
                            setFormData({
                              ...formData,
                              projects: formData.projects.map((p) =>
                                p.id === updated.id ? updated : p
                              ),
                            });
                          }}
                          placeholder="Image URL"
                          className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                        />
                        <label className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono cursor-pointer">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Screenshot File</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleProjectImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300">Detailed Architecture Description</label>
                    <textarea
                      rows={3}
                      value={editingProject.detailedDesc}
                      onChange={(e) => {
                        const updated = { ...editingProject, detailedDesc: e.target.value };
                        setEditingProject(updated);
                        setFormData({
                          ...formData,
                          projects: formData.projects.map((p) =>
                            p.id === updated.id ? updated : p
                          ),
                        });
                      }}
                      className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono text-slate-300">
                        Tech Stack (type comma-separated or click tags)
                      </label>
                      <span className="text-[10px] font-mono text-slate-500">
                        Type commas or press Enter to add
                      </span>
                    </div>
                    <input
                      type="text"
                      value={projectTechText}
                      onChange={(e) => {
                        const text = e.target.value;
                        setProjectTechText(text);
                        const tags = text.split(',').map((t) => t.trim()).filter(Boolean);
                        const updated = {
                          ...editingProject,
                          tech: tags,
                        };
                        setEditingProject(updated);
                        setFormData({
                          ...formData,
                          projects: formData.projects.map((p) =>
                            p.id === updated.id ? updated : p
                          ),
                        });
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const tags = projectTechText.split(',').map((t) => t.trim()).filter(Boolean);
                          if (tags.length > 0) {
                            setProjectTechText(tags.join(', ') + ', ');
                          }
                        }
                      }}
                      placeholder="e.g. PyTorch, React, Docker, CUDA"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:border-amber-500 focus:outline-none font-mono"
                    />

                    {/* Active tags with quick remove badges */}
                    {editingProject.tech && editingProject.tech.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[10px] font-mono text-slate-500 mr-1">Current:</span>
                        {editingProject.tech.map((tItem, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono"
                          >
                            <span>{tItem}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveProjectTechTag(tItem)}
                              className="hover:text-red-400 p-0.5 rounded transition-colors cursor-pointer"
                              title={`Remove ${tItem}`}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Quick suggestion tags */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-mono text-slate-500 mr-1">Quick add:</span>
                      {['PyTorch', 'TensorFlow', 'CUDA', 'Python', 'React', 'TypeScript', 'Docker', 'Kubernetes', 'FastAPI', 'Three.js', 'PostgreSQL', 'Redis'].map((suggest) => {
                        const alreadyHas = (editingProject.tech || []).some(
                          (t) => t.toLowerCase() === suggest.toLowerCase()
                        );
                        if (alreadyHas) return null;
                        return (
                          <button
                            key={suggest}
                            type="button"
                            onClick={() => handleAddProjectTechTag(suggest)}
                            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 text-[11px] font-mono transition-colors cursor-pointer"
                          >
                            + {suggest}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center space-x-2 text-xs font-mono text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingProject.featured}
                        onChange={(e) => {
                          const updated = { ...editingProject, featured: e.target.checked };
                          setEditingProject(updated);
                          setFormData({
                            ...formData,
                            projects: formData.projects.map((p) =>
                              p.id === updated.id ? updated : p
                            ),
                          });
                        }}
                        className="rounded border-slate-700 text-amber-500 focus:ring-amber-500"
                      />
                      <span>Feature on front page</span>
                    </label>
                  </div>

                  <div className="flex flex-wrap items-center justify-between pt-4 border-t border-slate-800/80 gap-3">
                    {/* In-UI Delete project button with confirmation */}
                    {confirmDeleteProjectId === editingProject.id ? (
                      <div className="flex items-center gap-2 p-1.5 rounded-xl bg-red-950/80 border border-red-800">
                        <span className="text-xs font-mono text-red-200 px-1">Permanently delete project?</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteProjectItem(editingProject.id, editingProject.title)}
                          className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold rounded-lg cursor-pointer transition-colors"
                        >
                          Confirm Delete
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteProjectId(null)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs rounded-lg cursor-pointer transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteProjectId(editingProject.id)}
                        className="flex items-center space-x-1.5 px-3.5 py-2 bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-300 border border-red-800/50 font-mono text-xs font-bold rounded-lg cursor-pointer transition-colors"
                        title="Delete this project"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete Project</span>
                      </button>
                    )}

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingProject(null)}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs rounded-lg cursor-pointer transition-colors"
                      >
                        Done
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleSave(`Saved changes to ${editingProject.title}`);
                          setEditingProject(null);
                        }}
                        className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs rounded-lg cursor-pointer transition-colors shadow-md"
                      >
                        Save Project Updates
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Projects List */}
              <div className="space-y-3">
                {formData.projects.map((proj, idx) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      {proj.imageUrl && (
                        <img
                          src={proj.imageUrl}
                          alt={proj.title}
                          className="w-16 h-12 object-cover rounded-lg border border-slate-800 shrink-0"
                        />
                      )}
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-sm font-semibold text-white font-mono">{proj.title}</h3>
                          {proj.featured && (
                            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono">
                              Featured
                            </span>
                          )}
                          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                            {proj.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-1">{proj.shortDesc}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5 shrink-0">
                      <button
                        disabled={idx === 0}
                        onClick={() => {
                          const list = [...formData.projects];
                          const [removed] = list.splice(idx, 1);
                          list.splice(idx - 1, 0, removed);
                          setFormData({ ...formData, projects: list });
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                        title="Move Up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>

                      <button
                        disabled={idx === formData.projects.length - 1}
                        onClick={() => {
                          const list = [...formData.projects];
                          const [removed] = list.splice(idx, 1);
                          list.splice(idx + 1, 0, removed);
                          setFormData({ ...formData, projects: list });
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                        title="Move Down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => startEditingProject(proj)}
                        className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40 text-xs font-mono font-bold cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      {confirmDeleteProjectId === proj.id ? (
                        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-red-950/80 border border-red-800">
                          <span className="text-[11px] font-mono text-red-200 px-1">Delete project?</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteProjectItem(proj.id, proj.title)}
                            className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white font-mono text-[11px] font-bold rounded cursor-pointer transition-colors"
                          >
                            Yes, Delete
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteProjectId(null)}
                            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px] rounded cursor-pointer transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteProjectId(proj.id)}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-red-950 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SKILLS & SOFTWARE */}
          {activeTab === 'skills' && (
            <div className="space-y-8">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-mono font-bold text-amber-400">Skills & Software</h2>
                  <p className="text-xs text-slate-400">
                    Manage production technologies, frameworks, and custom categories. Set proficiency from 0% to 100%.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newSoftware: SoftwareItem = {
                      id: 'soft-' + Date.now(),
                      name: 'New Production Tool',
                      category: 'Core Engineering',
                      proficiency: 85,
                      purpose: 'High-throughput system development and deployment.',
                      experienceYears: '2+ Yrs',
                      iconName: 'Code2',
                      featured: true,
                    };
                    setFormData({ ...formData, software: [...formData.software, newSoftware] });
                    setEditingSoftware(newSoftware);
                  }}
                  className="flex items-center space-x-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-mono font-bold text-xs rounded-lg cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Tool</span>
                </button>
              </div>

              {/* Editing Software/Tool Subform */}
              {editingSoftware && (
                <div className="p-6 rounded-2xl bg-[#0f1420] border-2 border-amber-500/50 space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <h4 className="text-sm font-mono font-bold text-amber-400">
                      Editing Software Tool: {editingSoftware.name}
                    </h4>
                    <button
                      onClick={() => setEditingSoftware(null)}
                      className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300"
                    >
                      Done Editing
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-300">Tool / Software Name</label>
                      <input
                        type="text"
                        value={editingSoftware.name}
                        onChange={(e) => {
                          const updated = { ...editingSoftware, name: e.target.value };
                          setEditingSoftware(updated);
                          setFormData({
                            ...formData,
                            software: formData.software.map((s) => (s.id === updated.id ? updated : s)),
                          });
                        }}
                        className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300">
                        Category (Type ANY custom category)
                      </label>
                      <input
                        type="text"
                        list="software-categories-list"
                        value={editingSoftware.category}
                        onChange={(e) => {
                          const updated = { ...editingSoftware, category: e.target.value };
                          setEditingSoftware(updated);
                          setFormData({
                            ...formData,
                            software: formData.software.map((s) => (s.id === updated.id ? updated : s)),
                          });
                        }}
                        placeholder="e.g. AI & Machine Learning, DevOps, Embedded"
                        className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                      <datalist id="software-categories-list">
                        <option value="AI & Machine Learning" />
                        <option value="Languages & Full-Stack" />
                        <option value="3D & Graphics" />
                        <option value="Cloud, DevOps & Databases" />
                        <option value="Core Engineering" />
                      </datalist>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300">
                        Proficiency (0% - 100%)
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={editingSoftware.proficiency}
                        onChange={(e) => {
                          const raw = e.target.value;
                          const parsed = raw === '' ? 0 : parseInt(raw, 10);
                          const prof = isNaN(parsed) ? 0 : Math.max(0, Math.min(100, parsed));
                          const updated = { ...editingSoftware, proficiency: prof };
                          setEditingSoftware(updated);
                          setFormData({
                            ...formData,
                            software: formData.software.map((s) => (s.id === updated.id ? updated : s)),
                          });
                        }}
                        className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300">Years Experience</label>
                      <input
                        type="text"
                        value={editingSoftware.experienceYears}
                        onChange={(e) => {
                          const updated = { ...editingSoftware, experienceYears: e.target.value };
                          setEditingSoftware(updated);
                          setFormData({
                            ...formData,
                            software: formData.software.map((s) => (s.id === updated.id ? updated : s)),
                          });
                        }}
                        placeholder="e.g. 3+ Yrs"
                        className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-mono text-slate-300">Application & Purpose</label>
                      <input
                        type="text"
                        value={editingSoftware.purpose}
                        onChange={(e) => {
                          const updated = { ...editingSoftware, purpose: e.target.value };
                          setEditingSoftware(updated);
                          setFormData({
                            ...formData,
                            software: formData.software.map((s) => (s.id === updated.id ? updated : s)),
                          });
                        }}
                        className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => {
                        handleSave(`Updated software tool: ${editingSoftware.name}`);
                        setEditingSoftware(null);
                      }}
                      className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-mono font-bold text-xs rounded-lg cursor-pointer"
                    >
                      Save Tool Updates
                    </button>
                  </div>
                </div>
              )}

              {/* Software Tool List */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
                  Portfolio Software Stack ({formData.software.length} Tools)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {formData.software.map((tool) => (
                    <div
                      key={tool.id}
                      className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 flex items-center justify-between"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-mono font-bold text-white">{tool.name}</span>
                          <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-mono font-semibold">
                            {tool.proficiency}%
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-mono">
                          {tool.category} • {tool.experienceYears}
                        </p>
                      </div>

                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => setEditingSoftware(tool)}
                          className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40 text-xs font-mono font-bold cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            const updated = formData.software.filter((s) => s.id !== tool.id);
                            setFormData({ ...formData, software: updated });
                            handleSave(`Removed tool: ${tool.name}`);
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950 text-red-400 cursor-pointer"
                          title="Delete Tool"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: RESUME */}
          {activeTab === 'resume' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-mono font-bold text-amber-400">Resume Management</h2>
                  <p className="text-xs text-slate-400">
                    Upload new CV document or customize recruiter summary and key highlights.
                  </p>
                </div>
                <button
                  onClick={() => handleSave('Resume settings updated!')}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-mono font-bold text-xs rounded-lg cursor-pointer"
                >
                  Save Resume Details
                </button>
              </div>

              {/* Upload Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/30 text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-mono font-bold text-white">Deploy Updated Resume</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                    Upload PDF or DOC. It embeds securely into browser storage for instant recruiter downloads.
                  </p>
                </div>

                <label className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-mono font-bold text-xs cursor-pointer shadow-lg shadow-amber-950/40 transition-all">
                  <Upload className="w-4 h-4" />
                  <span>Choose Resume File to Upload</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleResumeFileUpload}
                    className="hidden"
                  />
                </label>

                {formData.resume.customUploadedBase64 && (
                  <div className="mt-2 text-xs font-mono text-emerald-400 flex items-center justify-center gap-1">
                    <Check className="w-4 h-4" />
                    <span>Active custom file uploaded ({formData.resume.fileName})</span>
                  </div>
                )}
              </div>

              {/* Resume Metadata Fields */}
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-slate-300">File Name Displayed</label>
                    <input
                      type="text"
                      value={formData.resume.fileName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          resume: { ...formData.resume, fileName: e.target.value },
                        })
                      }
                      className="w-full mt-1.5 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300">Last Updated Note</label>
                    <input
                      type="text"
                      value={formData.resume.lastUpdated}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          resume: { ...formData.resume, lastUpdated: e.target.value },
                        })
                      }
                      className="w-full mt-1.5 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300">Executive Summary for Recruiters</label>
                  <textarea
                    rows={3}
                    value={formData.resume.summary}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        resume: { ...formData.resume, summary: e.target.value },
                      })
                    }
                    className="w-full mt-1.5 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300">Key Highlights (One per line)</label>
                  <textarea
                    rows={4}
                    value={formData.resume.keyHighlights.join('\n')}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        resume: {
                          ...formData.resume,
                          keyHighlights: e.target.value.split('\n').filter((l) => l.trim()),
                        },
                      })
                    }
                    className="w-full mt-1.5 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm font-mono text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: ACTIVITIES & EVENTS */}
          {activeTab === 'events' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className={`text-xl font-mono font-bold ${accentText}`}>Activities & Events</h2>
                  <p className="text-xs text-slate-400">
                    Manage keynotes, hackathons, summit appearances, and chronological recent activity items.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      const newEvent: EventItem = {
                        id: 'event-' + Date.now(),
                        name: 'New Summit / Tech Conference',
                        date: '2026',
                        category: 'Keynote Speaker',
                        location: 'Bengaluru, India',
                        shortDesc: 'Presented technical deep dive on AI engineering systems and agent orchestration.',
                        fullDesc: 'Keynote presentation exploring modern neural architectures, low-latency deployment pipelines, and scalable software craft.',
                        coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
                        photos: [],
                        tags: ['AI', 'TechTalk', 'Architecture'],
                        externalLink: 'https://github.com/izazahamad',
                      };
                      const next = [newEvent, ...(formData.events || [])];
                      setFormData({ ...formData, events: next });
                      startEditingEvent(newEvent);
                    }}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 font-mono font-bold text-xs rounded-lg cursor-pointer transition-transform hover:scale-102 ${accentSolid}`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Event</span>
                  </button>

                  <button
                    onClick={() => {
                      const newAct: RecentActivity = {
                        id: 'act-' + Date.now(),
                        title: 'Milestone / Release Update',
                        type: 'milestone',
                        timestamp: 'Just now',
                        description: 'Published an engineering update or production achievement.',
                      };
                      const next = [newAct, ...(formData.recentActivities || [])];
                      setFormData({ ...formData, recentActivities: next });
                      setEditingActivity(newAct);
                    }}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono font-bold text-xs rounded-lg cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Activity Log</span>
                  </button>
                </div>
              </div>

              {/* 1. EVENTS DRAWER & FORM */}
              {editingEvent && (
                <div className={`p-6 rounded-2xl border-2 shadow-2xl space-y-4 animate-in fade-in ${cardBg} ${accentBorder}`}>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <span className={`text-[10px] font-mono uppercase tracking-widest font-bold ${accentText}`}>
                        Editing Event Details
                      </span>
                      <h3 className="text-base font-mono font-bold text-white">
                        {editingEvent.name || 'New Event'}
                      </h3>
                    </div>
                    <button
                      onClick={() => handleSaveEvent(editingEvent)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer ${accentSolid}`}
                    >
                      Done & Save Event
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-300">Event Title / Name</label>
                      <input
                        type="text"
                        value={editingEvent.name}
                        onChange={(e) => {
                          const updated = { ...editingEvent, name: e.target.value };
                          setEditingEvent(updated);
                          setFormData({
                            ...formData,
                            events: (formData.events || []).map((ev) => (ev.id === updated.id ? updated : ev)),
                          });
                        }}
                        className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300">Category (e.g. Keynote Speaker, Hackathon, Expo)</label>
                      <input
                        type="text"
                        value={editingEvent.category}
                        onChange={(e) => {
                          const updated = { ...editingEvent, category: e.target.value };
                          setEditingEvent(updated);
                          setFormData({
                            ...formData,
                            events: (formData.events || []).map((ev) => (ev.id === updated.id ? updated : ev)),
                          });
                        }}
                        className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300">Date / Timing</label>
                      <input
                        type="text"
                        value={editingEvent.date}
                        onChange={(e) => {
                          const updated = { ...editingEvent, date: e.target.value };
                          setEditingEvent(updated);
                          setFormData({
                            ...formData,
                            events: (formData.events || []).map((ev) => (ev.id === updated.id ? updated : ev)),
                          });
                        }}
                        className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300">Location / Venue</label>
                      <input
                        type="text"
                        value={editingEvent.location}
                        onChange={(e) => {
                          const updated = { ...editingEvent, location: e.target.value };
                          setEditingEvent(updated);
                          setFormData({
                            ...formData,
                            events: (formData.events || []).map((ev) => (ev.id === updated.id ? updated : ev)),
                          });
                        }}
                        className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-mono text-slate-300">Cover Image URL</label>
                      <input
                        type="text"
                        value={editingEvent.coverImage}
                        onChange={(e) => {
                          const updated = { ...editingEvent, coverImage: e.target.value };
                          setEditingEvent(updated);
                          setFormData({
                            ...formData,
                            events: (formData.events || []).map((ev) => (ev.id === updated.id ? updated : ev)),
                          });
                        }}
                        placeholder="https://..."
                        className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-mono text-slate-300">Short Summary Description</label>
                      <textarea
                        rows={2}
                        value={editingEvent.shortDesc}
                        onChange={(e) => {
                          const updated = { ...editingEvent, shortDesc: e.target.value };
                          setEditingEvent(updated);
                          setFormData({
                            ...formData,
                            events: (formData.events || []).map((ev) => (ev.id === updated.id ? updated : ev)),
                          });
                        }}
                        className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-mono text-slate-300">Full Description / Presentation Details</label>
                      <textarea
                        rows={3}
                        value={editingEvent.fullDesc || ''}
                        onChange={(e) => {
                          const updated = { ...editingEvent, fullDesc: e.target.value };
                          setEditingEvent(updated);
                          setFormData({
                            ...formData,
                            events: (formData.events || []).map((ev) => (ev.id === updated.id ? updated : ev)),
                          });
                        }}
                        className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300">Tags (comma separated)</label>
                      <input
                        type="text"
                        value={eventTagsText}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEventTagsText(val);
                          const parsed = val.split(',').map((t) => t.trim()).filter(Boolean);
                          const updated = { ...editingEvent, tags: parsed };
                          setEditingEvent(updated);
                          setFormData({
                            ...formData,
                            events: (formData.events || []).map((ev) => (ev.id === updated.id ? updated : ev)),
                          });
                        }}
                        placeholder="AI, Cloud, Keynote"
                        className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300">External Resource Link</label>
                      <input
                        type="text"
                        value={editingEvent.externalLink || ''}
                        onChange={(e) => {
                          const updated = { ...editingEvent, externalLink: e.target.value };
                          setEditingEvent(updated);
                          setFormData({
                            ...formData,
                            events: (formData.events || []).map((ev) => (ev.id === updated.id ? updated : ev)),
                          });
                        }}
                        placeholder="https://..."
                        className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-mono text-slate-300">Event Photos Gallery URLs (one per line)</label>
                      <textarea
                        rows={2}
                        value={eventPhotosText}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEventPhotosText(val);
                          const parsed = val.split('\n').map((p) => p.trim()).filter(Boolean);
                          const updated = { ...editingEvent, photos: parsed };
                          setEditingEvent(updated);
                          setFormData({
                            ...formData,
                            events: (formData.events || []).map((ev) => (ev.id === updated.id ? updated : ev)),
                          });
                        }}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 2. EVENTS LIST */}
              <div className="space-y-4">
                <h3 className="text-sm font-mono font-bold text-white flex items-center gap-2">
                  <Calendar className={`w-4 h-4 ${accentText}`} />
                  <span>Public Keynote & Summit Appearances ({formData.events?.length || 0})</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(formData.events || []).map((ev) => (
                    <div
                      key={ev.id}
                      className={`p-4 rounded-xl border flex flex-col justify-between ${cardBg} ${cardBorder}`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${accentBg} ${accentBorder} ${accentText} font-bold`}>
                            {ev.category}
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            {ev.date}
                          </span>
                        </div>

                        <h4 className="font-mono font-bold text-sm text-white">
                          {ev.name}
                        </h4>

                        <div className="text-xs font-mono text-slate-400 flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{ev.location}</span>
                        </div>

                        <p className="text-xs text-slate-300 font-mono line-clamp-2">
                          {ev.shortDesc}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-800">
                        <button
                          onClick={() => startEditingEvent(ev)}
                          className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer ${accentBg} ${accentText} border ${accentBorder}`}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        {confirmDeleteEventId === ev.id ? (
                          <div className="flex items-center space-x-1.5">
                            <button
                              onClick={() => handleDeleteEvent(ev.id)}
                              className="px-2 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded text-xs font-mono font-bold cursor-pointer"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setConfirmDeleteEventId(null)}
                              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-mono cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmDeleteEventId(ev.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
                            title="Delete Event"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. RECENT ACTIVITIES STREAM MANAGEMENT */}
              <div className="space-y-4 pt-6 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-mono font-bold text-white flex items-center gap-2">
                    <Clock className={`w-4 h-4 ${accentText}`} />
                    <span>Chronological Activity Logs ({formData.recentActivities?.length || 0})</span>
                  </h3>
                </div>

                {/* Activity Edit Form */}
                {editingActivity && (
                  <div className={`p-5 rounded-2xl border-2 shadow-2xl space-y-3 animate-in fade-in ${cardBg} ${accentBorder}`}>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${accentText}`}>
                        Editing Activity Item
                      </span>
                      <button
                        onClick={() => handleSaveActivity(editingActivity)}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-bold cursor-pointer ${accentSolid}`}
                      >
                        Done & Save
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="text-xs font-mono text-slate-300">Activity Title</label>
                        <input
                          type="text"
                          value={editingActivity.title}
                          onChange={(e) => {
                            const updated = { ...editingActivity, title: e.target.value };
                            setEditingActivity(updated);
                            setFormData({
                              ...formData,
                              recentActivities: (formData.recentActivities || []).map((a) => (a.id === updated.id ? updated : a)),
                            });
                          }}
                          className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-300">Timestamp</label>
                        <input
                          type="text"
                          value={editingActivity.timestamp}
                          onChange={(e) => {
                            const updated = { ...editingActivity, timestamp: e.target.value };
                            setEditingActivity(updated);
                            setFormData({
                              ...formData,
                              recentActivities: (formData.recentActivities || []).map((a) => (a.id === updated.id ? updated : a)),
                            });
                          }}
                          placeholder="March 2026 / Yesterday"
                          className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="text-xs font-mono text-slate-300">Description</label>
                        <textarea
                          rows={2}
                          value={editingActivity.description}
                          onChange={(e) => {
                            const updated = { ...editingActivity, description: e.target.value };
                            setEditingActivity(updated);
                            setFormData({
                              ...formData,
                              recentActivities: (formData.recentActivities || []).map((a) => (a.id === updated.id ? updated : a)),
                            });
                          }}
                          className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Activities List */}
                <div className="space-y-3">
                  {(formData.recentActivities || []).map((act) => (
                    <div
                      key={act.id}
                      className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${cardBg} ${cardBorder}`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold border ${accentBg} ${accentBorder} ${accentText}`}>
                            {act.type}
                          </span>
                          <span className="text-sm font-mono font-bold text-white">
                            {act.title}
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            • {act.timestamp}
                          </span>
                        </div>
                        <p className="text-xs font-mono text-slate-300">
                          {act.description}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <button
                          onClick={() => setEditingActivity(act)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer ${accentBg} ${accentText} border ${accentBorder}`}
                        >
                          <Edit2 className="w-3 h-3 inline mr-1" />
                          <span>Edit</span>
                        </button>

                        {confirmDeleteActId === act.id ? (
                          <div className="flex items-center space-x-1.5">
                            <button
                              onClick={() => handleDeleteActivity(act.id)}
                              className="px-2 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded text-xs font-mono font-bold cursor-pointer"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => setConfirmDeleteActId(null)}
                              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-mono cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmDeleteActId(act.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
                            title="Delete Activity Log"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SECURITY & BACKUP */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-800">
                <h2 className="text-xl font-mono font-bold text-amber-400">Security & Backup</h2>
                <p className="text-xs text-slate-400">
                  Update Master Keycode, export portfolio backup, or restore initial workshop state.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4 max-w-lg">
                <h3 className="text-sm font-mono font-bold text-white">Master Passcode</h3>
                <input
                  type="text"
                  value={formData.adminPasscode}
                  onChange={(e) => setFormData({ ...formData, adminPasscode: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm font-mono text-amber-400"
                />
                <button
                  onClick={() => handleSave('Master keycode updated!')}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-mono font-bold text-xs rounded-lg cursor-pointer"
                >
                  Update Keycode
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <h3 className="text-sm font-mono font-bold text-white flex items-center gap-2">
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span>Export JSON Backup</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Download complete snapshot of all projects, skills, resume, experience, and profile.
                  </p>
                  <button
                    onClick={onExport}
                    className="mt-2 px-4 py-2 bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/40 font-mono text-xs rounded-lg font-bold cursor-pointer"
                  >
                    Export Portfolio Backup
                  </button>
                </div>

                <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <h3 className="text-sm font-mono font-bold text-white flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-red-400" />
                    <span>Reset Defaults</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Restore original high-performance template content for {formData.profile.name}.
                  </p>
                  {confirmResetOpen ? (
                    <div className="mt-3 p-3 rounded-lg bg-red-950/80 border border-red-800 space-y-2">
                      <p className="text-xs font-mono text-red-200">
                        Reset all portfolio content back to initial state?
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setConfirmResetOpen(false);
                            onReset();
                          }}
                          className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold rounded-lg cursor-pointer transition-colors"
                        >
                          Confirm Reset
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmResetOpen(false)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs rounded-lg cursor-pointer transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmResetOpen(true)}
                      className="mt-2 px-4 py-2 bg-red-950/50 hover:bg-red-900/50 text-red-300 border border-red-800 font-mono text-xs rounded-lg font-bold cursor-pointer transition-colors"
                    >
                      Reset Defaults
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

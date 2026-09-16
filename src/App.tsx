import React, { useState, useEffect } from 'react';
import {
  PortfolioData,
  ThemeMode,
  ExperienceItem,
  ProjectItem,
  SoftwareItem,
  EducationItem,
  EventItem,
} from './types';
import {
  getStoredPortfolioData,
  savePortfolioData,
  exportPortfolioJSON,
  resetPortfolioData,
  logActivity,
  getStoredThemeMode,
  saveStoredThemeMode,
} from './utils/storage';
import { getThemeConfig, THEMES_LIST } from './utils/theme';
import { WorkshopHUD } from './components/navigation/WorkshopHUD';
import { HeroSection } from './components/portfolio/HeroSection';
import { ExperienceSection } from './components/portfolio/ExperienceSection';
import { EducationSection } from './components/portfolio/EducationSection';
import { ProjectsSection } from './components/portfolio/ProjectsSection';
import { ActivitiesEventsSection } from './components/portfolio/ActivitiesEventsSection';
import { SoftwareSection } from './components/portfolio/SoftwareSection';
import { ContactSection } from './components/portfolio/ContactSection';
import { Footer } from './components/portfolio/Footer';
import { AdminAuthModal } from './components/admin/AdminAuthModal';
import { AdminDashboard, AdminTab } from './components/admin/AdminDashboard';

export default function App() {
  // 1. Central Portfolio Data State (backed by localStorage with auto-migration)
  const [data, setData] = useState<PortfolioData>(() => getStoredPortfolioData());

  // 2. Theme State initialized from stored or URL parameter so shared links work immediately
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => getStoredThemeMode());

  const [systemIsDark, setSystemIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemIsDark(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Compute active theme config
  const themeConfig = getThemeConfig(themeMode, systemIsDark);
  const isLight = themeConfig.isLight;

  // Handler for selecting theme (with URL param synchronization for seamless sharing)
  const handleSelectTheme = (newMode: ThemeMode) => {
    setThemeMode(newMode);
    saveStoredThemeMode(newMode);

    const updatedData: PortfolioData = {
      ...data,
      visualSettings: {
        ...data.visualSettings,
        themeMode: newMode,
      },
    };
    savePortfolioData(updatedData);
    setData(updatedData);
  };

  const handleCycleTheme = () => {
    const currentIndex = THEMES_LIST.findIndex((t) => t.id === themeMode);
    const nextIndex = (currentIndex + 1) % THEMES_LIST.length;
    handleSelectTheme(THEMES_LIST[nextIndex].id);
  };

  // 3. Admin Authentication & Direct Section Editing State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  // Initial tab & targeting when entering Admin Dashboard
  const [adminInitialTab, setAdminInitialTab] = useState<AdminTab>('profile');
  const [initialExperienceId, setInitialExperienceId] = useState<string | null>(null);
  const [initialProjectId, setInitialProjectId] = useState<string | null>(null);
  const [initialSoftwareId, setInitialSoftwareId] = useState<string | null>(null);

  // Helper to open admin directly to a specific target
  const triggerAdminTarget = (
    tab: AdminTab,
    experienceId: string | null = null,
    projectId: string | null = null,
    softwareId: string | null = null
  ) => {
    setAdminInitialTab(tab);
    setInitialExperienceId(experienceId);
    setInitialProjectId(projectId);
    setInitialSoftwareId(softwareId);

    if (isAdminAuthenticated) {
      setShowAdminDashboard(true);
    } else {
      setShowAdminAuth(true);
    }
  };

  // Save handler for Admin Dashboard
  const handleSaveData = (updated: PortfolioData, message?: string) => {
    savePortfolioData(updated);
    if (message) {
      const withLog = logActivity(
        updated,
        'profile',
        'Profile Revision',
        message
      );
      setData(withLog);
    } else {
      setData(updated);
    }
  };

  // Export JSON backup
  const handleExportBackup = () => {
    exportPortfolioJSON(data);
  };

  // Reset to default data
  const handleResetDefaults = () => {
    const initial = resetPortfolioData();
    setData(initial);
    setShowAdminDashboard(false);
  };

  // Delete Experience handler for direct live portfolio deletion
  const handleDeleteExperience = (expId: string) => {
    const roleToDelete = data.experience.find((e) => e.id === expId);
    const updatedExp = data.experience.filter((e) => e.id !== expId);
    const updatedData: PortfolioData = { ...data, experience: updatedExp };
    savePortfolioData(updatedData);
    const withLog = logActivity(
      updatedData,
      'experience',
      'Delete Role',
      `Deleted role: ${roleToDelete?.role || expId}`
    );
    setData(withLog);
  };

  // Delete Education handler
  const handleDeleteEducation = (eduId: string) => {
    const nextEdu = (data.education || []).filter((e) => e.id !== eduId);
    const updatedData = { ...data, education: nextEdu };
    savePortfolioData(updatedData);
    setData(updatedData);
  };

  // Delete Event handler
  const handleDeleteEvent = (eventId: string) => {
    const nextEvents = (data.events || []).filter((e) => e.id !== eventId);
    const updatedData = { ...data, events: nextEvents };
    savePortfolioData(updatedData);
    setData(updatedData);
  };

  // Delete Activity handler
  const handleDeleteActivity = (actId: string) => {
    const nextActs = (data.recentActivities || []).filter((a) => a.id !== actId);
    const updatedData = { ...data, recentActivities: nextActs };
    savePortfolioData(updatedData);
    setData(updatedData);
  };

  // If Admin CMS is open
  if (showAdminDashboard) {
    return (
      <AdminDashboard
        data={data}
        onSaveData={handleSaveData}
        onLogout={() => {
          setShowAdminDashboard(false);
          setIsAdminAuthenticated(false);
        }}
        onExport={handleExportBackup}
        onReset={handleResetDefaults}
        initialTab={adminInitialTab}
        initialEditingExperienceId={initialExperienceId}
        initialEditingProjectId={initialProjectId}
        initialEditingSoftwareId={initialSoftwareId}
        themeConfig={themeConfig}
        themeMode={themeMode}
        onSelectTheme={handleSelectTheme}
        isLight={isLight}
      />
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans ${themeConfig.selectionClass} ${
        themeConfig.bg
      } ${themeConfig.textPrimary}`}
    >
      {/* 1. Clean Navigation Bar with Education, Activities & Events, and Simple Theme Switcher */}
      <WorkshopHUD
        onOpenAdminAuth={() => {
          setAdminInitialTab('profile');
          setInitialExperienceId(null);
          setInitialProjectId(null);
          setInitialSoftwareId(null);
          if (isAdminAuthenticated) {
            setShowAdminDashboard(true);
          } else {
            setShowAdminAuth(true);
          }
        }}
        authorName={data.profile.name}
        themeMode={themeMode}
        onSelectTheme={handleSelectTheme}
        onCycleTheme={handleCycleTheme}
        themeConfig={themeConfig}
        isLight={isLight}
      />

      {/* 2. Main Portfolio Flow */}
      <main
        className={`relative z-10 divide-y ${
          isLight ? 'divide-slate-200/80' : 'divide-slate-850/60'
        }`}
      >
        {/* Home Section */}
        <HeroSection
          profile={data.profile}
          onOpenAdminAuth={() => triggerAdminTarget('profile')}
          isLight={isLight}
          themeConfig={themeConfig}
        />

        {/* Experience Section */}
        <ExperienceSection
          experience={data.experience}
          isAdmin={isAdminAuthenticated}
          onEditExperience={(exp: ExperienceItem) =>
            triggerAdminTarget('experience', exp.id, null, null)
          }
          onAddExperience={() => triggerAdminTarget('experience', null, null, null)}
          onDeleteExperience={handleDeleteExperience}
          isLight={isLight}
          themeConfig={themeConfig}
        />

        {/* Education & Certifications Section (Fixed: Now properly rendered!) */}
        <EducationSection
          education={data.education || []}
          certifications={data.certifications || []}
          isAdmin={isAdminAuthenticated}
          onEditEducation={() => triggerAdminTarget('education')}
          onAddEducation={() => triggerAdminTarget('education')}
          onDeleteEducation={handleDeleteEducation}
          isLight={isLight}
          themeConfig={themeConfig}
        />

        {/* Projects Section */}
        <ProjectsSection
          projects={data.projects}
          isAdmin={isAdminAuthenticated}
          onEditProject={(proj: ProjectItem) =>
            triggerAdminTarget('projects', null, proj.id, null)
          }
          onAddProject={() => triggerAdminTarget('projects', null, null, null)}
          isLight={isLight}
          themeConfig={themeConfig}
        />

        {/* Activities & Events Section (Keynotes, Summits, Activity Stream) */}
        <ActivitiesEventsSection
          events={data.events || []}
          recentActivities={data.recentActivities || []}
          isAdmin={isAdminAuthenticated}
          onEditEvent={(event: EventItem) => triggerAdminTarget('events')}
          onAddEvent={() => triggerAdminTarget('events')}
          onDeleteEvent={handleDeleteEvent}
          onDeleteActivity={handleDeleteActivity}
          onAddActivity={() => triggerAdminTarget('events')}
          isLight={isLight}
          themeConfig={themeConfig}
        />

        {/* Software & Tooling Stack */}
        <SoftwareSection
          software={data.software}
          isAdmin={isAdminAuthenticated}
          onEditSoftware={(item: SoftwareItem) =>
            triggerAdminTarget('skills', null, null, item.id)
          }
          onAddSoftware={() => triggerAdminTarget('skills', null, null, null)}
          isLight={isLight}
          themeConfig={themeConfig}
        />

        {/* Contact Section */}
        <ContactSection
          profile={data.profile}
          isLight={isLight}
          themeConfig={themeConfig}
        />
      </main>

      {/* 3. Minimalist Footer */}
      <Footer
        authorName={data.profile.name}
        onOpenAdminAuth={() => {
          setAdminInitialTab('profile');
          if (isAdminAuthenticated) {
            setShowAdminDashboard(true);
          } else {
            setShowAdminAuth(true);
          }
        }}
        isLight={isLight}
        themeConfig={themeConfig}
      />

      {/* 4. Admin Passcode Gate Modal */}
      <AdminAuthModal
        isOpen={showAdminAuth}
        onClose={() => setShowAdminAuth(false)}
        validPasscode={data.adminPasscode}
        onSuccess={() => {
          setIsAdminAuthenticated(true);
          setShowAdminAuth(false);
          setShowAdminDashboard(true);
        }}
      />
    </div>
  );
}

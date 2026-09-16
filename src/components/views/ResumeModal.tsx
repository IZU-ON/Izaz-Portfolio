import React, { useState } from 'react';
import { ResumeData, ProfileData, EducationItem, ExperienceItem } from '../../types';
import { FileText, Download, Eye, CheckCircle2, X, Sparkles, ExternalLink } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resume: ResumeData;
  profile: ProfileData;
  education: EducationItem[];
  experience: ExperienceItem[];
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  resume,
  profile,
  education,
  experience,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    // If admin uploaded a custom Base64 file, download that
    if (resume.customUploadedBase64) {
      const a = document.createElement('a');
      a.href = resume.customUploadedBase64;
      a.download = resume.fileName || 'IZAZ_AHAMAD_RESUME.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      // Generate clean professional plain-text/markdown resume dossier
      const textContent = `===============================================================
IZAZ AHAMAD — AI/ML & SYSTEMS SOFTWARE ENGINEER
===============================================================
Email: ${profile.email} | Phone: ${profile.phone}
LinkedIn: ${profile.linkedIn} | GitHub: ${profile.github}
Location: ${profile.location}

TAGLINE:
"${profile.tagline}"

SUMMARY:
${resume.summary}

KEY HIGHLIGHTS:
${resume.keyHighlights.map((h) => '• ' + h).join('\n')}

CORE SKILLS:
${resume.skillsSummary.map((s) => '• ' + s).join('\n')}

PROFESSIONAL EXPERIENCE:
${experience
  .map(
    (exp) => `
${exp.role} — ${exp.company} (${exp.duration})
Location: ${exp.location} | Milestone: ${exp.carMilestone}
${exp.description}
Responsibilities:
${exp.responsibilities.map((r) => '  - ' + r).join('\n')}
Achievements:
${exp.achievements.map((a) => '  * ' + a).join('\n')}
`
  )
  .join('\n')}

EDUCATION:
${education
  .map(
    (edu) => `
${edu.degree}
${edu.institution} (${edu.years}) — Specialization: ${edu.specialization}
${edu.grade ? 'Grade: ' + edu.grade : ''}
`
  )
  .join('\n')}

===============================================================
Generated directly from Izaz Ahamad's 3D Interactive Workshop
Last verified by candidate: ${resume.lastUpdated}
===============================================================`;

      const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = resume.fileName.replace(/\.pdf$/i, '.txt') || 'IZAZ_AHAMAD_RESUME.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0b0e14] border border-amber-500/40 rounded-2xl shadow-2xl shadow-black/80 text-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-[#101520] to-blue-950/40 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/40 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg sm:text-xl font-heading font-extrabold text-white">
                  DIAGNOSTIC STAND: RESUME
                </h2>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Verified Candidate
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {resume.fileName} • {resume.lastUpdated}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownload}
              className="flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-mono font-bold text-xs rounded-lg shadow-lg shadow-amber-950/40 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {downloadSuccess && (
          <div className="bg-emerald-950/80 border-b border-emerald-500/40 px-6 py-2 text-xs font-mono text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Resume download initiated successfully!</span>
          </div>
        )}

        {/* Structured Resume Dossier Preview */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6 font-sans">
          
          {/* Header Card */}
          <div className="p-6 rounded-xl bg-[#0f131a] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-white">{profile.name}</h3>
              <p className="text-sm font-mono text-amber-400 mt-0.5">{profile.title}</p>
              <p className="text-xs text-slate-400 mt-1">{profile.location} • {profile.email} • {profile.phone}</p>
            </div>
            <div className="flex gap-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-850 rounded-lg text-xs font-mono text-slate-300 border border-slate-700 flex items-center gap-1"
              >
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={profile.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-blue-900/30 hover:bg-blue-900/40 text-blue-300 rounded-lg text-xs font-mono border border-blue-700/50 flex items-center gap-1"
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              Executive Profile
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed">
              {resume.summary}
            </p>
          </div>

          {/* Key Competencies / Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Key Accomplishments</span>
              </h4>
              <div className="space-y-2">
                {resume.keyHighlights.map((h, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold">
                Core Domains & Tooling
              </h4>
              <div className="space-y-2">
                {resume.skillsSummary.map((s, i) => (
                  <div key={i} className="text-xs text-slate-300 bg-slate-950 p-2 rounded-lg border border-slate-800">
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience Summary */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              Professional Experience
            </h4>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-bold text-white">{exp.role} — {exp.company}</div>
                    <span className="text-xs font-mono text-slate-400">{exp.duration}</span>
                  </div>
                  <p className="text-xs text-slate-300">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education Summary */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
              Education
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {education.map((edu) => (
                <div key={edu.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-xs font-bold text-white">{edu.degree}</div>
                  <div className="text-[11px] text-amber-400 font-mono mt-0.5">{edu.institution} ({edu.years})</div>
                  <div className="text-xs text-slate-400 mt-1">{edu.specialization}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Diagnostic Terminal Status: Ready for Interview Scheduling</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownload}
              className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

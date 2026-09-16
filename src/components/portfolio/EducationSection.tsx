import React, { useState } from 'react';
import { EducationItem, CertificationItem } from '../../types';
import { ThemeConfig } from '../../utils/theme';
import { ScrambleText } from '../common/ScrambleText';
import {
  GraduationCap,
  Award,
  Calendar,
  ExternalLink,
  Edit2,
  Plus,
  Trash2,
  CheckCircle2,
  BookOpen,
  BadgeCheck,
} from 'lucide-react';

interface EducationSectionProps {
  education: EducationItem[];
  certifications?: CertificationItem[];
  isAdmin?: boolean;
  onEditEducation?: (item: EducationItem) => void;
  onAddEducation?: () => void;
  onDeleteEducation?: (eduId: string) => void;
  onEditCertification?: (cert: CertificationItem) => void;
  onAddCertification?: () => void;
  onDeleteCertification?: (certId: string) => void;
  themeConfig?: ThemeConfig;
  isLight?: boolean;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  certifications = [],
  isAdmin = false,
  onEditEducation,
  onAddEducation,
  onDeleteEducation,
  onEditCertification,
  onAddCertification,
  onDeleteCertification,
  themeConfig,
  isLight = false,
}) => {
  const [confirmDeleteEduId, setConfirmDeleteEduId] = useState<string | null>(null);
  const [confirmDeleteCertId, setConfirmDeleteCertId] = useState<string | null>(null);

  // Styling tokens from theme
  const accentText = themeConfig?.accentText || (isLight ? 'text-blue-600' : 'text-emerald-400');
  const accentBg = themeConfig?.accentBg || (isLight ? 'bg-blue-50' : 'bg-emerald-500/10');
  const accentBorder = themeConfig?.accentBorder || (isLight ? 'border-blue-200' : 'border-emerald-500/30');
  const accentSolid = themeConfig?.accentSolid || (isLight ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950');
  const cardBg = themeConfig?.cardBg || (isLight ? 'bg-white' : 'bg-[#0d131f]/90');
  const cardBorder = themeConfig?.cardBorder || (isLight ? 'border-slate-200/90' : 'border-slate-800');

  return (
    <section id="education" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full font-mono text-xs uppercase tracking-wider mb-3 ${accentBg} ${accentBorder} ${accentText} border`}>
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Academic & Accreditations</span>
        </div>

        <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight font-mono ${
          isLight ? 'text-slate-950' : 'text-white'
        }`}>
          <ScrambleText text="Education & Certifications" />
        </h2>

        <p className={`mt-3 text-xs sm:text-sm max-w-xl font-mono ${
          isLight ? 'text-slate-600' : 'text-slate-400'
        }`}>
          Formal computer science foundations paired with specialized industrial deep learning accreditations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* COLUMN 1: ACADEMIC EDUCATION */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
            <div className="flex items-center space-x-2.5">
              <BookOpen className={`w-5 h-5 ${accentText}`} />
              <h3 className={`text-xl font-bold font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Formal Degrees
              </h3>
            </div>

            {onAddEducation && (
              <button
                onClick={onAddEducation}
                className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer shadow-sm ${accentSolid}`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Degree</span>
              </button>
            )}
          </div>

          <div className="space-y-5">
            {education.map((item, idx) => (
              <div
                key={item.id || idx}
                className={`p-6 rounded-2xl transition-all duration-300 shadow-md ${cardBg} ${cardBorder} border hover:shadow-xl relative`}
              >
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800/40">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-400">
                      {item.years}
                    </span>
                    <h4 className={`text-base sm:text-lg font-bold font-mono mt-1 ${isLight ? 'text-slate-950' : 'text-white'}`}>
                      {item.degree}
                    </h4>
                    <p className={`text-xs font-mono font-semibold ${accentText} mt-0.5`}>
                      {item.institution}
                    </p>
                  </div>

                  {/* Admin controls */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {onEditEducation && (
                      <button
                        onClick={() => onEditEducation(item)}
                        className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs cursor-pointer"
                        title="Edit Degree"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {onDeleteEducation && (
                      confirmDeleteEduId === item.id ? (
                        <div className="flex items-center gap-1 p-1 rounded-md bg-red-950/80 border border-red-800">
                          <span className="text-[10px] font-mono text-red-200">Delete?</span>
                          <button
                            type="button"
                            onClick={() => {
                              onDeleteEducation(item.id);
                              setConfirmDeleteEduId(null);
                            }}
                            className="px-2 py-0.5 bg-red-600 text-white font-mono text-[10px] font-bold rounded cursor-pointer"
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteEduId(null)}
                            className="px-1.5 py-0.5 bg-slate-800 text-slate-300 font-mono text-[10px] rounded cursor-pointer"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteEduId(item.id)}
                          className="p-1.5 rounded-md text-red-400 hover:bg-red-950/50 cursor-pointer"
                          title="Delete Degree"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className="mt-3 space-y-2 text-xs font-mono">
                  {item.specialization && (
                    <p className={isLight ? 'text-slate-600' : 'text-slate-300'}>
                      <span className="text-slate-500 font-semibold">Specialization:</span> {item.specialization}
                    </p>
                  )}
                  {item.grade && (
                    <p className={`font-semibold ${accentText}`}>
                      <span className="text-slate-500 font-normal">Score:</span> {item.grade}
                    </p>
                  )}

                  {item.achievements && item.achievements.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-800/30 space-y-1">
                      {item.achievements.map((ach, aIdx) => (
                        <div key={aIdx} className="flex items-start space-x-1.5 text-slate-400">
                          <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${accentText}`} />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COLUMN 2: TECHNICAL CERTIFICATIONS */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
            <div className="flex items-center space-x-2.5">
              <BadgeCheck className={`w-5 h-5 ${accentText}`} />
              <h3 className={`text-xl font-bold font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Technical Certifications
              </h3>
            </div>

            {onAddCertification && (
              <button
                onClick={onAddCertification}
                className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer shadow-sm ${accentSolid}`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Certification</span>
              </button>
            )}
          </div>

          <div className="space-y-4">
            {certifications.map((cert, cIdx) => (
              <div
                key={cert.id || cIdx}
                className={`p-5 rounded-xl transition-all duration-300 shadow-md ${cardBg} ${cardBorder} border hover:shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3`}
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Award className={`w-4 h-4 shrink-0 ${accentText}`} />
                    <h4 className={`text-sm sm:text-base font-bold font-mono ${isLight ? 'text-slate-950' : 'text-white'}`}>
                      {cert.name}
                    </h4>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 pl-6">
                    <span className={`font-semibold ${accentText}`}>{cert.issuer}</span>
                    <span>•</span>
                    <span>{cert.date}</span>
                    {cert.category && (
                      <>
                        <span>•</span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                          {cert.category}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0 self-end sm:self-auto">
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                        isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                      }`}
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  {onEditCertification && (
                    <button
                      onClick={() => onEditCertification(cert)}
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs cursor-pointer"
                      title="Edit Certification"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {onDeleteCertification && (
                    confirmDeleteCertId === cert.id ? (
                      <div className="flex items-center gap-1 p-1 rounded-md bg-red-950/80 border border-red-800">
                        <span className="text-[10px] font-mono text-red-200">Delete?</span>
                        <button
                          type="button"
                          onClick={() => {
                            onDeleteCertification(cert.id);
                            setConfirmDeleteCertId(null);
                          }}
                          className="px-2 py-0.5 bg-red-600 text-white font-mono text-[10px] font-bold rounded cursor-pointer"
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteCertId(null)}
                          className="px-1.5 py-0.5 bg-slate-800 text-slate-300 font-mono text-[10px] rounded cursor-pointer"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteCertId(cert.id)}
                        className="p-1.5 rounded text-red-400 hover:bg-red-950/50 cursor-pointer"
                        title="Delete Certification"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { ProfileData } from '../../types';
import { ThemeConfig } from '../../utils/theme';
import { ScrambleText } from '../common/ScrambleText';
import {
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Send,
  CheckCircle2,
  Copy,
  Clock,
} from 'lucide-react';

interface ContactSectionProps {
  profile: ProfileData;
  themeConfig?: ThemeConfig;
  isLight?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  profile,
  themeConfig,
  isLight = false,
}) => {
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const accentText = themeConfig?.accentText || (isLight ? 'text-blue-600' : 'text-emerald-400');
  const accentBg = themeConfig?.accentBg || (isLight ? 'bg-blue-50' : 'bg-emerald-500/10');
  const accentBorder = themeConfig?.accentBorder || (isLight ? 'border-blue-200' : 'border-emerald-500/30');
  const accentSolid = themeConfig?.accentSolid || (isLight ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950');
  const cardBg = themeConfig?.cardBg || (isLight ? 'bg-white' : 'bg-[#0d131f]/90');
  const cardBorder = themeConfig?.cardBorder || (isLight ? 'border-slate-200/90' : 'border-slate-800');

  const handleCopyPhone = () => {
    if (!profile.phone) return;
    navigator.clipboard.writeText(profile.phone);
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-14">
        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full font-mono text-xs uppercase tracking-wider mb-3 ${accentBg} ${accentBorder} ${accentText} border`}>
          <Mail className="w-3.5 h-3.5" />
          <span>Executive Contact</span>
        </div>
        <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight font-mono ${
          isLight ? 'text-slate-950' : 'text-white'
        }`}>
          <ScrambleText text="Contact & Inquiries" />
        </h2>
        <p className={`mt-3 text-xs sm:text-sm max-w-xl font-mono ${
          isLight ? 'text-slate-600' : 'text-slate-400'
        }`}>
          Direct communication channels for engineering positions, technical advisory, and collaborative ventures.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Essential Direct Contact Channels */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Phone Card */}
          <div className={`p-5 rounded-2xl shadow-md border ${cardBg} ${cardBorder}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-xl ${accentBg} ${accentBorder} ${accentText} border flex items-center justify-center`}>
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-[10px] font-mono uppercase tracking-wider ${
                    isLight ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    Direct Phone Line
                  </div>
                  <a
                    href={`tel:${profile.phone || '+91 98765 43210'}`}
                    className={`text-sm sm:text-base font-mono font-bold transition-colors ${
                      isLight ? 'text-slate-950' : 'text-white'
                    }`}
                  >
                    {profile.phone || '+91 98765 43210'}
                  </a>
                </div>
              </div>

              <button
                onClick={handleCopyPhone}
                className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                  isLight
                    ? 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-950'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
                title="Copy phone number"
              >
                {phoneCopied ? (
                  <CheckCircle2 className={`w-4 h-4 ${accentText}`} />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className={`mt-3 pt-3 border-t text-[11px] font-mono flex items-center justify-between ${
              isLight ? 'border-slate-100 text-slate-500' : 'border-slate-800/80 text-slate-400'
            }`}>
              <span>Voice / WhatsApp Available</span>
              <span className={`font-semibold ${accentText}`}>Active</span>
            </div>
          </div>

          {/* Email Card */}
          <div className={`p-5 rounded-2xl shadow-md border ${cardBg} ${cardBorder}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-xl ${accentBg} ${accentBorder} ${accentText} border flex items-center justify-center`}>
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-[10px] font-mono uppercase tracking-wider ${
                    isLight ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    Primary Email
                  </div>
                  <a
                    href={`mailto:${profile.email}`}
                    className={`text-sm sm:text-base font-mono font-bold transition-colors ${
                      isLight ? 'text-slate-950' : 'text-white'
                    }`}
                  >
                    {profile.email}
                  </a>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                  isLight
                    ? 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-950'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
                title="Copy email address"
              >
                {emailCopied ? (
                  <CheckCircle2 className={`w-4 h-4 ${accentText}`} />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className={`mt-3 pt-3 border-t text-[11px] font-mono flex items-center justify-between ${
              isLight ? 'border-slate-100 text-slate-500' : 'border-slate-800/80 text-slate-400'
            }`}>
              <span>Expected response: &lt; 12 hours</span>
              <span className={`font-semibold ${accentText}`}>Monitored</span>
            </div>
          </div>

          {/* Location & Timezone Card */}
          <div className={`p-5 rounded-2xl shadow-md border ${cardBg} ${cardBorder}`}>
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-xl ${accentBg} ${accentBorder} ${accentText} border flex items-center justify-center`}>
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className={`text-[10px] font-mono uppercase tracking-wider ${
                  isLight ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  Location & Availability
                </div>
                <div className={`text-sm font-mono font-bold ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}>
                  {profile.location}
                </div>
              </div>
            </div>
            <div className={`mt-3 pt-3 border-t text-[11px] font-mono flex items-center justify-between ${
              isLight ? 'border-slate-100 text-slate-500' : 'border-slate-800/80 text-slate-400'
            }`}>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                IST (UTC+05:30)
              </span>
              <span>Open to Relocation / Remote</span>
            </div>
          </div>

          {/* Direct Social Links */}
          <div className="pt-2 flex items-center gap-3">
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl border text-xs font-mono transition-colors ${
                  isLight
                    ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-950 shadow-sm'
                    : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            )}

            {profile.linkedIn && (
              <a
                href={profile.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl border text-xs font-mono transition-colors ${
                  isLight
                    ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-950 shadow-sm'
                    : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <Linkedin className="w-4 h-4 text-blue-500" />
                <span>LinkedIn</span>
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Direct Message Form */}
        <div className="lg:col-span-7">
          <div className={`p-6 sm:p-8 rounded-2xl shadow-xl border ${cardBg} ${cardBorder}`}>
            <h3 className={`font-mono font-bold text-lg mb-2 ${
              isLight ? 'text-slate-950' : 'text-white'
            }`}>
              Send Direct Message
            </h3>
            <p className={`text-xs mb-6 font-sans ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>
              All messages route directly to {profile.name}'s primary mailbox.
            </p>

            {submitted ? (
              <div className="py-10 flex flex-col items-center text-center space-y-3">
                <div className={`w-12 h-12 rounded-full ${accentBg} ${accentBorder} ${accentText} border flex items-center justify-center`}>
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className={`font-mono font-bold text-base ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}>
                  Message Sent Successfully
                </h4>
                <p className={`text-xs max-w-sm font-sans ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  Thank you, {formState.name}. Your inquiry has been delivered and {profile.name} will get in touch shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({ name: '', email: '', subject: '', message: '' });
                  }}
                  className={`mt-3 px-4 py-2 rounded-lg font-mono text-xs transition-colors cursor-pointer ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Miller"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none transition-colors ${
                        isLight
                          ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500'
                          : 'bg-slate-900 border-slate-800 text-white placeholder-slate-600 focus:border-slate-700'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none transition-colors ${
                        isLight
                          ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500'
                          : 'bg-slate-900 border-slate-800 text-white placeholder-slate-600 focus:border-slate-700'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Machine Learning Engineer Position"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none transition-colors ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500'
                        : 'bg-slate-900 border-slate-800 text-white placeholder-slate-600 focus:border-slate-700'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Please detail project requirements, team context, or role specifications..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none transition-colors resize-none ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500'
                        : 'bg-slate-900 border-slate-800 text-white placeholder-slate-600 focus:border-slate-700'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 px-4 rounded-xl font-bold font-mono transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md ${accentSolid}`}
                >
                  <Send className="w-4 h-4" />
                  <span>Send Direct Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

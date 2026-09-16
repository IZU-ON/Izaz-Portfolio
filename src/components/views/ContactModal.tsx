import React, { useState } from 'react';
import { ProfileData } from '../../types';
import { Radio, Mail, Phone, Linkedin, Github, Send, X, Check, Copy } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, profile }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [senderName, setSenderName] = useState('');
  const [senderSubject, setSenderSubject] = useState('');
  const [senderMessage, setSenderMessage] = useState('');

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(senderSubject || `Engineering Inquiry from ${senderName || 'Recruiter'}`);
    const body = encodeURIComponent(
      `Hello Izaz,\n\n${senderMessage}\n\nBest regards,\n${senderName}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-[#0b0e14] border border-amber-500/40 rounded-2xl shadow-2xl shadow-black/80 text-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-[#101520] to-amber-950/40 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg sm:text-xl font-heading font-extrabold text-white">
                  COMM RADIO: DIRECT TRANSCEIVER
                </h2>
                <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                  Signal Online
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Connect directly with {profile.name} via official communication lines.
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
          
          {/* Quick Channels Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Email */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>Email Transmission</span>
                  </span>
                  <button
                    onClick={() => copyToClipboard(profile.email, 'email')}
                    className="text-[11px] font-mono text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    {copiedKey === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'email' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-sm font-mono font-bold text-white mt-1 break-all">
                  {profile.email}
                </div>
              </div>

              <a
                href={`mailto:${profile.email}`}
                className="mt-3 block text-center py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-mono font-bold transition-colors"
              >
                Launch Mail Client
              </a>
            </div>

            {/* Direct Phone */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Telephone Line</span>
                  </span>
                  <button
                    onClick={() => copyToClipboard(profile.phone, 'phone')}
                    className="text-[11px] font-mono text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    {copiedKey === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'phone' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-sm font-mono font-bold text-white mt-1">
                  {profile.phone}
                </div>
              </div>

              <a
                href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                className="mt-3 block text-center py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-mono font-bold transition-colors"
              >
                Initiate Call
              </a>
            </div>

            {/* LinkedIn */}
            <a
              href={profile.linkedIn}
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-blue-500/20 text-blue-400 group-hover:scale-105 transition-transform">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">LinkedIn Profile</div>
                  <div className="text-sm font-bold text-white">Connect Professional Network</div>
                </div>
              </div>
              <span className="text-xs font-mono text-blue-400 group-hover:translate-x-1 transition-transform">
                Visit →
              </span>
            </a>

            {/* GitHub */}
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-purple-500/20 text-purple-400 group-hover:scale-105 transition-transform">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">GitHub Repositories</div>
                  <div className="text-sm font-bold text-white">Inspect Open Source Code</div>
                </div>
              </div>
              <span className="text-xs font-mono text-purple-400 group-hover:translate-x-1 transition-transform">
                Visit →
              </span>
            </a>

          </div>

          {/* Quick Message Dispatch Form */}
          <form onSubmit={handleSendMessage} className="p-6 rounded-xl bg-[#0f131a] border border-slate-800 space-y-4">
            <h3 className="text-sm font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Send className="w-4 h-4" />
              <span>Broadcast Direct Message</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-300">Your Name / Organization</label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Lead Tech Recruiter / Founder"
                  className="w-full mt-1.5 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300">Subject Line</label>
                <input
                  type="text"
                  required
                  value={senderSubject}
                  onChange={(e) => setSenderSubject(e.target.value)}
                  placeholder="e.g. AI Systems Role / Collaboration"
                  className="w-full mt-1.5 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-mono text-slate-300">Message Content</label>
                <textarea
                  rows={3}
                  required
                  value={senderMessage}
                  onChange={(e) => setSenderMessage(e.target.value)}
                  placeholder="Write your note or project scope here..."
                  className="w-full mt-1.5 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-mono font-bold text-xs rounded-xl shadow-lg shadow-amber-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message to {profile.name}</span>
            </button>
          </form>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Transceiver Frequency: 142.800 MHz Encrypted</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Close Radio
          </button>
        </div>

      </div>
    </div>
  );
};

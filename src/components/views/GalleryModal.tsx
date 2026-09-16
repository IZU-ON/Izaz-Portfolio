import React, { useState } from 'react';
import { GalleryItem } from '../../types';
import { Image as ImageIcon, X, Maximize2, ZoomIn, Filter } from 'lucide-react';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  gallery: GalleryItem[];
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ isOpen, onClose, gallery }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  if (!isOpen) return null;

  const categories = ['All', 'Events', 'Projects', 'Workshops', 'College', 'Tech'];

  const filtered = selectedCategory === 'All'
    ? gallery
    : gallery.filter((g) => g.category === selectedCategory);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#0b0e14] border border-amber-500/40 rounded-2xl shadow-2xl shadow-black/80 text-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-[#101520] to-amber-950/40 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg sm:text-xl font-heading font-extrabold text-white">
                  PHOTO WALL: GALLERY
                </h2>
                <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                  Visual Archive
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Snapshots from technical conferences, overnight coding sprints, and hardware prototypes.
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

        {/* Category filters */}
        <div className="px-6 py-3 bg-[#0d1017] border-b border-slate-800/80 flex items-center space-x-2 overflow-x-auto">
          <Filter className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxImage(item)}
                className="group relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-amber-500/50 cursor-pointer shadow-lg transition-all"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                
                <div className="absolute bottom-3 left-3 right-3 space-y-1">
                  <span className="text-[9px] font-mono bg-amber-500 text-slate-950 px-2 py-0.5 rounded font-bold">
                    {item.category}
                  </span>
                  <h3 className="text-xs font-bold text-white line-clamp-1">{item.title}</h3>
                  <p className="text-[10px] text-slate-300 line-clamp-1">{item.caption}</p>
                </div>

                <div className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {lightboxImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg"
            onClick={() => setLightboxImage(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImage.imageUrl}
                alt={lightboxImage.title}
                className="w-full max-h-[70vh] object-contain bg-black"
              />
              <div className="p-5 flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono text-amber-400 font-bold">{lightboxImage.category} • {lightboxImage.date}</span>
                  <h3 className="text-base font-bold text-white mt-0.5">{lightboxImage.title}</h3>
                  <p className="text-xs text-slate-300 mt-1">{lightboxImage.caption}</p>
                </div>
                <button
                  onClick={() => setLightboxImage(null)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Gallery Archives: {filtered.length} Curated Images</span>
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

import React, { useRef, useState } from 'react';
import { ImagePlus, RotateCcw } from 'lucide-react';
import { GalleryImage } from '../data/locations';

interface LocationImageSlotProps {
  imageLabel: string;
  altText: string;
  defaultImageUrl?: string;
  galleryImages?: GalleryImage[];
  customImageUrl?: string;
  aspectClassName?: string;
  allowReplace?: boolean;
  onReplaceImage?: (dataUrl: string) => void;
  onResetImage?: () => void;
}

export const LocationImageSlot: React.FC<LocationImageSlotProps> = ({
  imageLabel,
  altText,
  defaultImageUrl,
  galleryImages,
  customImageUrl,
  aspectClassName = 'aspect-[16/10]',
  allowReplace = false,
  onReplaceImage,
  onResetImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const hasGallery = Boolean(galleryImages && galleryImages.length > 0);
  const selectedGalleryItem =
    hasGallery && galleryImages
      ? galleryImages[Math.min(selectedIndex, galleryImages.length - 1)]
      : undefined;

  const activeImageUrl =
    customImageUrl ?? selectedGalleryItem?.url ?? defaultImageUrl;
  const activeFit = customImageUrl
    ? 'cover'
    : selectedGalleryItem?.fit ?? 'cover';
  const activeCaption = customImageUrl ? undefined : selectedGalleryItem?.caption;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !onReplaceImage) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onReplaceImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  return (
    <div className="w-full">
      <div
        className={`relative w-full overflow-hidden border border-slate-200 ${
          activeFit === 'contain' ? 'bg-slate-900/5' : 'bg-slate-100'
        } ${aspectClassName} ${allowReplace ? 'rounded-2xl' : ''}`}
      >
        {activeImageUrl ? (
          <img
            src={activeImageUrl}
            alt={activeCaption ? `${altText} — ${activeCaption}` : altText}
            referrerPolicy="no-referrer"
            className={`w-full h-full ${
              activeFit === 'contain' ? 'object-contain' : 'object-cover'
            }`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-5 text-center bg-gradient-to-br from-[#EDF5F7] via-slate-50 to-[#E4EFF3]">
            <svg
              aria-hidden="true"
              viewBox="0 0 120 72"
              className="w-20 h-12 text-[#0B5D73]/35 mb-3"
              fill="none"
            >
              <rect
                x="4"
                y="4"
                width="112"
                height="64"
                rx="8"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray="6 4"
              />
              <path
                d="M18 52 L42 32 L58 44 L76 26 L102 52"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="38" cy="22" r="5" stroke="currentColor" strokeWidth="2.5" />
            </svg>
            <p className="font-display text-base sm:text-lg font-bold text-[#0F2942] leading-snug">
              {imageLabel}
            </p>
            <p className="text-sm text-slate-600 mt-1">
              Ruang gambar boleh diganti dengan foto lokasi sebenar
            </p>
          </div>
        )}
      </div>

      {/* Kapsyen & Pemilih Galeri Gambar (jika lebih daripada 1 gambar) */}
      {allowReplace && !customImageUrl && galleryImages && galleryImages.length > 1 && (
        <div className="mt-3 space-y-2.5">
          {activeCaption && (
            <p className="text-sm sm:text-base font-medium text-slate-700">
              {activeCaption}
            </p>
          )}
          <div
            role="group"
            aria-label={`Pilih gambar ${altText}`}
            className="grid grid-cols-3 gap-2.5 sm:gap-3"
          >
            {galleryImages.map((img, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={img.url}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  aria-pressed={isSelected}
                  aria-label={img.caption}
                  className={`relative aspect-[16/10] min-h-[60px] rounded-xl overflow-hidden border-2 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B5D73] ${
                    isSelected
                      ? 'border-[#0B5D73] ring-2 ring-[#0B5D73]/25'
                      : 'border-slate-200 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {allowReplace && (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            aria-label={`Muat naik gambar untuk ${altText}`}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-xl border border-slate-300 bg-white text-[#0F2942] text-base font-semibold hover:bg-slate-50 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B5D73]"
          >
            <ImagePlus className="w-5 h-5 text-[#0B5D73]" aria-hidden="true" />
            <span>{activeImageUrl ? 'Tukar gambar' : 'Ganti gambar'}</span>
          </button>

          {customImageUrl && onResetImage && (
            <button
              type="button"
              onClick={onResetImage}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-base font-medium hover:bg-slate-100 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B5D73]"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>
                {defaultImageUrl || hasGallery
                  ? 'Guna gambar asal'
                  : 'Guna ruang berlabel asal'}
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

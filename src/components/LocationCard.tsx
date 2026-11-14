import React from 'react';
import { ChevronRight } from 'lucide-react';
import { LocationData } from '../data/locations';
import { LocationImageSlot } from './LocationImageSlot';

interface LocationCardProps {
  location: LocationData;
  customImageUrl?: string;
  onSelect: (id: string) => void;
}

export const LocationCard: React.FC<LocationCardProps> = ({
  location,
  customImageUrl,
  onSelect,
}) => {
  return (
    <article className="h-full">
      <button
        type="button"
        onClick={() => onSelect(location.id)}
        className="group w-full h-full flex flex-col rounded-2xl bg-white border border-slate-200 overflow-hidden text-left shadow-xs hover:border-[#0B5D73] hover:shadow-md active:scale-[0.99] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B5D73]"
      >
        <LocationImageSlot
          imageLabel={location.imageLabel}
          altText={location.fullTitle}
          defaultImageUrl={location.defaultImageUrl}
          customImageUrl={customImageUrl}
          aspectClassName="aspect-[16/10]"
        />

        <div className="flex-1 w-full p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <p
              className={`text-sm font-medium ${
                location.hasVerifiedContent
                  ? 'text-[#0B5D73]'
                  : location.defaultImageUrl || location.story60s.length > 0
                  ? 'text-amber-800'
                  : 'text-slate-600'
              }`}
            >
              {location.hasVerifiedContent ? (
                <>
                  <span>Bahan disahkan</span>
                  <span aria-hidden="true" className="mx-1.5 text-slate-400">
                    ·
                  </span>
                  <span className="tabular-nums">
                    {location.verifiedFacts.length} fakta
                  </span>
                </>
              ) : location.defaultImageUrl || location.story60s.length > 0 ? (
                <span>Maklumat tidak mencukupi · Perlu disemak</span>
              ) : (
                <span>Maklumat belum dimasukkan</span>
              )}
            </p>

            <h2 className="font-display text-2xl sm:text-[26px] font-bold text-[#0F2942] mt-1.5 leading-snug">
              {location.cardTitle}
            </h2>
          </div>

          <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-base sm:text-lg font-semibold text-[#0B5D73]">
            <span>Buka nota lokasi</span>
            <ChevronRight
              className="w-5 h-5 transition-transform duration-150 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </div>
        </div>
      </button>
    </article>
  );
};

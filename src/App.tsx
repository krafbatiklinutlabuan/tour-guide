/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { LABUAN_LOCATIONS } from './data/locations';
import { LocationCard } from './components/LocationCard';
import { LocationDetail } from './components/LocationDetail';

const STORAGE_KEY_IMAGES = 'poket_pemandu_labuan_images_v1';

export default function App() {
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [customImages, setCustomImages] = useState<Record<string, string>>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY_IMAGES);
      return saved ? (JSON.parse(saved) as Record<string, string>) : {};
    } catch {
      return {};
    }
  });

  const selectedLocation =
    LABUAN_LOCATIONS.find((loc) => loc.id === selectedLocationId) ?? null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [selectedLocationId]);

  const persistImages = (nextImages: Record<string, string>) => {
    setCustomImages(nextImages);
    try {
      window.localStorage.setItem(STORAGE_KEY_IMAGES, JSON.stringify(nextImages));
    } catch {
      // Abaikan jika ruang simpanan pelayar penuh; gambar masih aktif dalam sesi semasa.
    }
  };

  const handleReplaceImage = (locationId: string, dataUrl: string) => {
    persistImages({
      ...customImages,
      [locationId]: dataUrl,
    });
  };

  const handleResetImage = (locationId: string) => {
    const nextImages = { ...customImages };
    delete nextImages[locationId];
    persistImages(nextImages);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Bar Atas Ringkas & Mesra Telefon */}
      <header className="sticky top-0 z-30 h-14 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-4">
          {selectedLocation ? (
            <>
              <button
                type="button"
                onClick={() => setSelectedLocationId(null)}
                className="inline-flex items-center gap-2 min-h-[44px] -ml-2 px-2.5 rounded-xl text-[#0F2942] font-semibold text-base hover:bg-slate-100 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B5D73]"
              >
                <ArrowLeft className="w-5 h-5 text-[#0B5D73]" aria-hidden="true" />
                <span>Kembali</span>
              </button>
              <span className="font-display text-base sm:text-lg font-bold text-[#0F2942] truncate">
                {selectedLocation.cardTitle}
              </span>
            </>
          ) : (
            <>
              <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#0F2942] whitespace-nowrap shrink-0">
                Poket Pemandu Labuan
              </span>
              <span className="text-sm font-medium text-slate-600 tabular-nums whitespace-nowrap shrink-0">
                {LABUAN_LOCATIONS.length} destinasi
              </span>
            </>
          )}
        </div>
      </header>

      {/* Kandungan Utama */}
      <main className="flex-1">
        {selectedLocation ? (
          <LocationDetail
            location={selectedLocation}
            customImageUrl={customImages[selectedLocation.id]}
            onReplaceImage={handleReplaceImage}
            onResetImage={handleResetImage}
            onBack={() => setSelectedLocationId(null)}
          />
        ) : (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
            <div className="max-w-2xl">
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#0F2942] leading-tight">
                Destinasi Latihan Labuan
              </h1>
              <p className="mt-2.5 text-lg leading-relaxed text-slate-700">
                Pilih satu lokasi untuk rujukan cepat fakta disahkan, cerita 60
                saat, lima kata kunci dan kuiz ringkas.
              </p>
            </div>

            <section
              aria-label="Senarai destinasi Labuan"
              className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
            >
              {LABUAN_LOCATIONS.map((location) => (
                <LocationCard
                  key={location.id}
                  location={location}
                  customImageUrl={customImages[location.id]}
                  onSelect={(id) => setSelectedLocationId(id)}
                />
              ))}
            </section>
          </div>
        )}
      </main>

      {/* Kaki Halaman Ringkas */}
      <footer className="border-t border-slate-200 bg-white mt-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 text-sm sm:text-base text-slate-600">
          Poket Pemandu Labuan — Rujukan latihan peserta kursus asas pemandu
          pelancong. Hanya bahan yang telah disemak dipaparkan sebagai fakta.
        </div>
      </footer>
    </div>
  );
}

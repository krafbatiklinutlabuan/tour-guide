import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ExternalLink,
  Zap,
  BookOpen,
} from 'lucide-react';
import { LocationData } from '../data/locations';
import { LocationImageSlot } from './LocationImageSlot';

interface LocationDetailProps {
  location: LocationData;
  customImageUrl?: string;
  onReplaceImage: (locationId: string, dataUrl: string) => void;
  onResetImage: (locationId: string) => void;
  onBack: () => void;
}

type ViewMode = 'full' | 'quick';

export const LocationDetail: React.FC<LocationDetailProps> = ({
  location,
  customImageUrl,
  onReplaceImage,
  onResetImage,
  onBack,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('full');
  const [revealedQuizIds, setRevealedQuizIds] = useState<Record<string, boolean>>({});

  const toggleQuizAnswer = (quizId: string) => {
    setRevealedQuizIds((prev) => ({
      ...prev,
      [quizId]: !prev[quizId],
    }));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-5 sm:py-8">
      {/* Tajuk Lokasi & Penukar Mod */}
      <header className="pb-6 border-b border-slate-200">
        <p
          className={`text-base font-semibold ${
            location.hasVerifiedContent
              ? 'text-[#0B5D73]'
              : location.defaultImageUrl || location.story60s.length > 0
              ? 'text-amber-800'
              : 'text-slate-600'
          }`}
        >
          {location.hasVerifiedContent
            ? 'Status bahan: Disahkan daripada sumber rujukan'
            : location.defaultImageUrl || location.story60s.length > 0
            ? 'Status bahan: Maklumat tidak mencukupi (fakta bertulis & sumber perlu disemak)'
            : 'Status bahan: Maklumat belum dimasukkan'}
        </p>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#0F2942] mt-1.5 leading-tight">
          {location.fullTitle}
        </h1>

        {/* Penukar Mod: Rujukan Penuh / Rujukan Cepat */}
        <div
          role="group"
          aria-label="Mod paparan halaman lokasi"
          className="mt-5 grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-200/80"
        >
          <button
            type="button"
            onClick={() => setViewMode('full')}
            aria-pressed={viewMode === 'full'}
            className={`inline-flex items-center justify-center gap-2 min-h-[52px] px-3 py-3 rounded-xl text-base sm:text-lg font-bold transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B5D73] ${
              viewMode === 'full'
                ? 'bg-white text-[#0F2942] shadow-sm'
                : 'text-slate-700 hover:text-[#0F2942]'
            }`}
          >
            <BookOpen className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>Rujukan penuh</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('quick')}
            aria-pressed={viewMode === 'quick'}
            className={`inline-flex items-center justify-center gap-2 min-h-[52px] px-3 py-3 rounded-xl text-base sm:text-lg font-bold transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B5D73] ${
              viewMode === 'quick'
                ? 'bg-[#0B5D73] text-white shadow-sm'
                : 'text-slate-700 hover:text-[#0F2942]'
            }`}
          >
            <Zap className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>Rujukan cepat</span>
          </button>
        </div>

        {viewMode === 'full' && (
          <div className="mt-6">
            <LocationImageSlot
              key={location.id}
              imageLabel={location.imageLabel}
              altText={location.fullTitle}
              defaultImageUrl={location.defaultImageUrl}
              galleryImages={location.galleryImages}
              customImageUrl={customImageUrl}
              aspectClassName="aspect-[16/9]"
              allowReplace
              onReplaceImage={(dataUrl) => onReplaceImage(location.id, dataUrl)}
              onResetImage={() => onResetImage(location.id)}
            />
          </div>
        )}
      </header>

      {/* Paparan Mod Rujukan Cepat (Satu Skrin Telefon Mudah Baca) */}
      {viewMode === 'quick' ? (
        <div className="py-5 space-y-5">
          {/* Fakta Utama */}
          <section
            aria-labelledby="quick-fakta"
            className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5"
          >
            <div className="flex items-center justify-between gap-2">
              <h2
                id="quick-fakta"
                className="font-display text-xl sm:text-2xl font-bold text-[#0F2942]"
              >
                Fakta Utama
              </h2>
              {location.hasVerifiedContent && (
                <span className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#0B5D73]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Disahkan</span>
                </span>
              )}
            </div>

            {location.hasVerifiedContent ? (
              <ul className="mt-3 space-y-2.5 text-lg sm:text-xl font-medium leading-snug text-slate-900 list-disc pl-6">
                {location.verifiedFacts.map((fact, index) => (
                  <li key={index}>{fact.text}</li>
                ))}
              </ul>
            ) : (
              <div className="mt-3 space-y-2">
                <p className="text-lg sm:text-xl font-medium text-slate-800">
                  Fakta disahkan: Maklumat belum dimasukkan
                </p>
                {location.notesToVerify.length > 0 &&
                  location.notesToVerify[0] !== 'Maklumat belum dimasukkan' && (
                    <p className="text-base sm:text-lg text-amber-900 bg-amber-50 border border-amber-200 rounded-xl p-3">
                      {location.notesToVerify[0]}
                    </p>
                  )}
              </div>
            )}
          </section>

          {/* Lima Kata Kunci */}
          <section
            aria-labelledby="quick-katakunci"
            className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5"
          >
            <h2
              id="quick-katakunci"
              className="font-display text-xl sm:text-2xl font-bold text-[#0F2942]"
            >
              Lima Kata Kunci
            </h2>

            {location.keywords.length > 0 ? (
              <ol className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {location.keywords.map((keyword, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2.5 rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2.5 text-lg sm:text-xl font-bold text-[#0F2942]"
                  >
                    <span className="text-[#0B5D73] tabular-nums">
                      {index + 1}.
                    </span>
                    <span>{keyword}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-3 text-lg sm:text-xl text-slate-700">
                Maklumat belum dimasukkan
              </p>
            )}
          </section>

          {/* Sumber Ringkas */}
          <section
            aria-labelledby="quick-sumber"
            className="text-base text-slate-700 px-1"
          >
            <h2 id="quick-sumber" className="font-bold text-[#0F2942]">
              Sumber Rujukan
            </h2>
            {location.sourceUrl ? (
              <a
                href={location.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1.5 text-base font-semibold text-[#0B5D73] underline underline-offset-4 break-all hover:text-[#094B5E]"
              >
                <span>{location.sourceLabel ?? location.sourceUrl}</span>
                <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            ) : (
              <div className="mt-1 space-y-1">
                <p className="text-base text-slate-700">
                  {location.sourceLabel ?? 'Sumber bertulis: Maklumat belum dimasukkan'}
                </p>
                {location.imageSourceNote && (
                  <p className="text-base text-slate-600">
                    {location.imageSourceNote}
                  </p>
                )}
              </div>
            )}
          </section>

          {/* Butang Navigasi Besar */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onBack}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[56px] px-6 py-3.5 rounded-xl bg-[#0F2942] text-white text-lg sm:text-xl font-bold hover:bg-[#163859] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B5D73]"
            >
              <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              <span>Kembali ke Senarai Lokasi</span>
            </button>
          </div>
        </div>
      ) : (
        /* Paparan Mod Rujukan Penuh (Semua 5 Bahagian Sedia Ada) */
        <div className="divide-y divide-slate-200">
          {/* 1. Fakta Penting */}
          <section aria-labelledby="sek-fakta" className="py-8">
            <h2
              id="sek-fakta"
              className="font-display text-2xl sm:text-3xl font-bold text-[#0F2942]"
            >
              1. Fakta Penting
            </h2>

            {location.hasVerifiedContent ? (
              <div className="mt-5 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-lg font-bold text-[#0B5D73]">
                    <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <h3>Fakta disahkan</h3>
                  </div>
                  <ul className="mt-3 space-y-3.5 text-lg sm:text-xl leading-relaxed text-slate-900 list-disc pl-6">
                    {location.verifiedFacts.map((fact, index) => (
                      <li key={index}>{fact.text}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl bg-slate-100/80 border border-slate-200 p-5">
                  <div className="flex items-center gap-2 text-lg font-bold text-slate-800">
                    <AlertCircle className="w-5 h-5 text-slate-600 shrink-0" aria-hidden="true" />
                    <h3>Catatan yang masih perlu disemak</h3>
                  </div>
                  {location.notesToVerify.length > 1 ? (
                    <ul className="mt-2.5 space-y-2 text-lg leading-relaxed text-slate-800 list-disc pl-6">
                      {location.notesToVerify.map((note, index) => (
                        <li key={index}>{note}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-lg leading-relaxed text-slate-700">
                      {location.notesToVerify.length > 0
                        ? location.notesToVerify[0]
                        : 'Tiada catatan tambahan yang perlu disemak.'}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl bg-white border border-slate-200 p-5">
                  <div className="flex items-center gap-2 text-lg font-semibold text-[#0F2942]">
                    <CheckCircle2 className="w-5 h-5 text-slate-400 shrink-0" aria-hidden="true" />
                    <p>Fakta disahkan</p>
                  </div>
                  <p className="mt-1.5 text-lg sm:text-xl text-slate-700">
                    Maklumat belum dimasukkan
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-100/80 border border-slate-200 p-5">
                  <div className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                    <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" aria-hidden="true" />
                    <p>Catatan yang masih perlu disemak</p>
                  </div>
                  {location.notesToVerify.length > 1 ? (
                    <ul className="mt-2.5 space-y-2.5 text-lg sm:text-xl leading-relaxed text-slate-800 list-disc pl-6">
                      {location.notesToVerify.map((note, index) => (
                        <li key={index}>{note}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-1.5 text-lg sm:text-xl text-slate-700">
                      {location.notesToVerify[0] ?? 'Maklumat belum dimasukkan'}
                    </p>
                  )}
                </div>
              </div>
            )}
          </section>

          {/* 2. Cerita 60 Saat (5 Langkah Sesi 2) */}
          <section aria-labelledby="sek-cerita" className="py-8">
            <h2
              id="sek-cerita"
              className="font-display text-2xl sm:text-3xl font-bold text-[#0F2942]"
            >
              2. Cerita 60 Saat (Lima Langkah Sesi 2)
            </h2>

            {location.story60s.length > 0 ? (
              <ol className="mt-5 space-y-5">
                {location.story60s.map((step) => (
                  <li
                    key={step.stepNumber}
                    className="rounded-2xl bg-white border border-slate-200 p-5"
                  >
                    <p className="text-base sm:text-lg font-bold text-[#0B5D73] tabular-nums">
                      0{step.stepNumber}. {step.label}
                    </p>
                    <p className="mt-2 text-lg sm:text-xl leading-relaxed text-slate-900">
                      {step.content}
                    </p>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-4 rounded-2xl bg-white border border-slate-200 p-5 text-lg sm:text-xl text-slate-700">
                Maklumat belum dimasukkan
              </p>
            )}
          </section>

          {/* 3. Lima Kata Kunci Ingatan */}
          <section aria-labelledby="sek-katakunci" className="py-8">
            <h2
              id="sek-katakunci"
              className="font-display text-2xl sm:text-3xl font-bold text-[#0F2942]"
            >
              3. Lima Kata Kunci Ingatan
            </h2>

            {location.keywords.length > 0 ? (
              <ol className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {location.keywords.map((keyword, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 rounded-xl bg-white border border-slate-200 px-4 py-4 text-lg sm:text-xl font-bold text-[#0F2942]"
                  >
                    <span className="text-[#0B5D73] font-bold tabular-nums">
                      {index + 1}.
                    </span>
                    <span>{keyword}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-4 rounded-2xl bg-white border border-slate-200 p-5 text-lg sm:text-xl text-slate-700">
                Maklumat belum dimasukkan
              </p>
            )}
          </section>

          {/* 4. Kuiz Ringkas */}
          <section aria-labelledby="sek-kuiz" className="py-8">
            <h2
              id="sek-kuiz"
              className="font-display text-2xl sm:text-3xl font-bold text-[#0F2942]"
            >
              4. Kuiz Ringkas
            </h2>
            <p className="mt-1.5 text-lg text-slate-600">
              Uji ingatan anda terlebih dahulu, kemudian tekan butang “Lihat jawapan”.
            </p>

            {location.quiz.length > 0 ? (
              <div className="mt-5 space-y-5">
                {location.quiz.map((item, index) => {
                  const isRevealed = Boolean(revealedQuizIds[item.id]);
                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl bg-white border border-slate-200 p-5"
                    >
                      <p className="text-base font-bold text-[#0B5D73] tabular-nums">
                        Soalan {index + 1}
                      </p>
                      <p className="mt-1.5 text-xl font-semibold text-[#0F2942] leading-snug">
                        {item.question}
                      </p>

                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={() => toggleQuizAnswer(item.id)}
                          aria-expanded={isRevealed}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[54px] px-6 py-3.5 rounded-xl bg-[#0B5D73] text-white text-lg font-bold hover:bg-[#094B5E] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B5D73]"
                        >
                          {isRevealed ? (
                            <>
                              <EyeOff className="w-5 h-5" aria-hidden="true" />
                              <span>Sembunyikan jawapan</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-5 h-5" aria-hidden="true" />
                              <span>Lihat jawapan</span>
                            </>
                          )}
                        </button>
                      </div>

                      {isRevealed && (
                        <div className="mt-4 rounded-xl bg-[#EDF5F7] border border-[#0B5D73]/25 p-4">
                          <p className="text-base font-bold text-[#0B5D73]">Jawapan</p>
                          <p className="mt-1 text-lg sm:text-xl leading-relaxed text-[#0F2942]">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="mt-4 rounded-2xl bg-white border border-slate-200 p-5 text-lg sm:text-xl text-slate-700">
                Maklumat belum dimasukkan
              </p>
            )}
          </section>

          {/* 5. Sumber Rujukan & Butang Kembali */}
          <section aria-labelledby="sek-sumber" className="py-8">
            <h2
              id="sek-sumber"
              className="font-display text-2xl sm:text-3xl font-bold text-[#0F2942]"
            >
              5. Sumber Rujukan
            </h2>

            {location.sourceUrl ? (
              <div className="mt-4 rounded-2xl bg-white border border-slate-200 p-5">
                {location.sourceLabel && (
                  <p className="text-lg sm:text-xl font-semibold text-[#0F2942]">
                    {location.sourceLabel}
                  </p>
                )}
                <a
                  href={location.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 text-lg font-medium text-[#0B5D73] underline underline-offset-4 break-all hover:text-[#094B5E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B5D73]"
                >
                  <span>{location.sourceUrl}</span>
                  <ExternalLink className="w-5 h-5 shrink-0" aria-hidden="true" />
                </a>
              </div>
            ) : (
              <div className="mt-4 rounded-2xl bg-white border border-slate-200 p-5 space-y-2">
                <p className="text-lg sm:text-xl text-slate-700">
                  {location.sourceLabel ?? 'Maklumat belum dimasukkan'}
                </p>
                {location.imageSourceNote && (
                  <p className="text-base sm:text-lg text-slate-600">
                    {location.imageSourceNote}
                  </p>
                )}
              </div>
            )}

            <div className="mt-8">
              <button
                type="button"
                onClick={onBack}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[56px] px-6 py-3.5 rounded-xl bg-[#0F2942] text-white text-lg sm:text-xl font-bold hover:bg-[#163859] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B5D73]"
              >
                <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                <span>Kembali ke Senarai Lokasi</span>
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Smartphone, Download, Check } from 'lucide-react';

export const AppDownloadSection: React.FC = () => {
  const [downloadNotified, setDownloadNotified] = useState(false);

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setDownloadNotified(true);
    setTimeout(() => setDownloadNotified(false), 3500);
  };

  return (
    <section id="descargar-app" className="pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24 bg-[#F8FAFC] relative overflow-hidden">
      
      {/* Background subtle radial texture */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-[#004173] via-[#1a7fb3] to-[#2096d2] rounded-3xl p-6 sm:p-9 lg:p-10 shadow-xl border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center text-white">
          
          {/* Left: Text and Download Button */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-white border border-white/20 uppercase tracking-wider">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Aplicación Móvil Oficial</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              Descarga <span className="text-amber-300">Muni Puno Digital</span> y mantente informado
            </h2>

            <p className="text-sm sm:text-base text-slate-100 leading-relaxed max-w-xl font-normal">
              La app móvil de la Municipalidad Provincial de Puno incorpora paulatinamente las 29 rutas de recolección y alertas en tiempo real para tu barrio.
            </p>

            {/* Download Button and Compatibility */}
            <div className="space-y-2 pt-2">
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#descargar-app"
                  onClick={handleDownloadClick}
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-white text-slate-900 hover:bg-slate-100 transition-all shadow-md hover:shadow-lg cursor-pointer shrink-0"
                >
                  <svg className="w-5 h-5 text-[#004173]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a2.43 2.43 0 0 1-.22-.986V2.8a2.43 2.43 0 0 1 .22-.986zM15.207 13.414l2.42 2.42-12.836 7.41a2.38 2.38 0 0 1-1.182.316l11.598-10.146zm0-2.828L3.609.44A2.38 2.38 0 0 1 4.791.756l12.836 7.41-2.42 2.42zm1.414 1.414l3.774 2.18a2.41 2.41 0 0 0 0-4.174l-3.774 2.18z" />
                  </svg>
                  <div className="text-left">
                    <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Disponible en</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">Google Play Store</span>
                  </div>
                </a>

                <span className="text-xs text-slate-200">
                  Compatible con Android 8.0+ y HarmonyOS
                </span>
              </div>

              {downloadNotified && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs animate-in fade-in">
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Enlace de descarga oficial de la MPP preparado para tu dispositivo.</span>
                </div>
              )}
            </div>

          </div>

          {/* Right: QR Code Box */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="bg-white text-slate-900 p-5 sm:p-6 rounded-2xl shadow-xl border border-slate-200 text-center space-y-3.5 max-w-xs w-full">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Escaneo Rápido</span>
                <h4 className="text-base font-bold text-[#004173]">Instala en tu Celular</h4>
              </div>

              {/* Vector QR Code */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center">
                <div className="p-2 bg-white rounded-lg shadow-2xs">
                  <svg className="w-32 h-32" viewBox="0 0 100 100" fill="currentColor">
                    {/* Corner Position Detection Patterns */}
                    <rect x="0" y="0" width="30" height="30" fill="#004173" rx="4" />
                    <rect x="5" y="5" width="20" height="20" fill="white" rx="2" />
                    <rect x="10" y="10" width="10" height="10" fill="#004173" rx="1" />

                    <rect x="70" y="0" width="30" height="30" fill="#004173" rx="4" />
                    <rect x="75" y="5" width="20" height="20" fill="white" rx="2" />
                    <rect x="80" y="10" width="10" height="10" fill="#004173" rx="1" />

                    <rect x="0" y="70" width="30" height="30" fill="#004173" rx="4" />
                    <rect x="5" y="75" width="20" height="20" fill="white" rx="2" />
                    <rect x="10" y="80" width="10" height="10" fill="#004173" rx="1" />

                    {/* QR Payload Pattern dots */}
                    <rect x="36" y="8" width="6" height="6" fill="#2096d2" />
                    <rect x="48" y="8" width="6" height="6" fill="#004173" />
                    <rect x="58" y="14" width="6" height="6" fill="#2096d2" />
                    <rect x="36" y="24" width="6" height="6" fill="#004173" />
                    <rect x="48" y="20" width="6" height="6" fill="#2096d2" />
                    
                    <rect x="8" y="36" width="6" height="6" fill="#004173" />
                    <rect x="20" y="44" width="6" height="6" fill="#2096d2" />
                    <rect x="8" y="52" width="6" height="6" fill="#004173" />
                    <rect x="36" y="36" width="12" height="12" fill="#004173" rx="2" />
                    <rect x="54" y="36" width="6" height="6" fill="#15803D" />
                    <rect x="68" y="36" width="10" height="6" fill="#004173" />
                    <rect x="84" y="44" width="6" height="12" fill="#2096d2" />

                    <rect x="36" y="54" width="6" height="6" fill="#2096d2" />
                    <rect x="48" y="60" width="10" height="6" fill="#004173" />
                    <rect x="64" y="54" width="6" height="12" fill="#004173" />
                    <rect x="80" y="62" width="8" height="8" fill="#2096d2" />

                    <rect x="36" y="76" width="10" height="6" fill="#004173" />
                    <rect x="52" y="82" width="6" height="10" fill="#15803D" />
                    <rect x="64" y="76" width="12" height="6" fill="#004173" />
                    <rect x="82" y="78" width="8" height="8" fill="#004173" />
                  </svg>
                </div>
              </div>

              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Apunta con la cámara de tu smartphone para descargar directamente la app oficial.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

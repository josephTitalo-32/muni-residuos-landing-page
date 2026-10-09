import React from 'react';
import { 
  Recycle, 
  Sprout, 
  Trash2, 
  AlertTriangle,
  CheckCircle2, 
  XCircle,
  Download
} from 'lucide-react';
import { WASTE_CATEGORIES_INFO } from '../data/wasteClassificationData';

export const SegregationModule: React.FC = () => {
  const getCategoryIcon = (id: string) => {
    if (id === 'organicos') return Sprout;
    if (id === 'aprovechables') return Recycle;
    if (id === 'peligrosos') return AlertTriangle;
    return Trash2;
  };

  return (
    <section 
      id="segregacion" 
      className="pt-16 sm:pt-20 lg:pt-24 pb-32 sm:pb-40 lg:pb-48 bg-[#e9f3e5] relative overflow-hidden"
      style={{ backgroundColor: '#e9f3e5' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header en dos columnas: Izquierda Imagen, Derecha Texto */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Columna Izquierda: Imagen */}
          <div className="relative">
            <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <img 
                src="/images/segregacion-segregacion.webp" 
                alt="Tachos de segregación en Puno" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>

          {/* Columna Derecha: Información y CTA */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#15803D]/10 text-[#15803D] border border-[#15803D]/30 uppercase tracking-wider shadow-2xs backdrop-blur-md">
              <Recycle className="w-3.5 h-3.5 text-[#15803D]" />
              <span>Segregación en la Fuente</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#004173] tracking-tight leading-tight">
              Recojo a domicilio: Separa lo que sí sirve
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              Participa en la recolección selectiva domiciliaria de la ciudad de Puno. Entrega tus materiales clasificados y contribuye a una ciudad más limpia y sostenible.
            </p>

            <div className="pt-2">
              <button className="mt-6 px-6 py-3 rounded-xl font-bold text-sm bg-[#2096d2] hover:bg-[#1a7fb3] text-white transition-all shadow-lg shadow-[#2096d2]/30 cursor-pointer inline-flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>Descargar Guía de Segregación</span>
              </button>
            </div>
          </div>

        </div>

        {/* 4 Features visuales inferiores representando los 4 tachos oficiales de Puno */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mt-16">
          {WASTE_CATEGORIES_INFO.map((cat) => {
            const Icon = getCategoryIcon(cat.id);
            const isProhibited = cat.itemsType === 'prohibited';

            return (
              <div
                key={cat.id}
                id={`card-cat-${cat.id}`}
                style={{ backgroundColor: cat.colorHex }}
                className="rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between border-none"
              >
                <div>
                  {/* Icon & Days Badge */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-white/20 shadow-2xs">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    {cat.daysBadge && (
                      <span className="text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/20 text-white border border-white/30 tracking-wide uppercase">
                        {cat.daysBadge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-white text-base sm:text-lg font-bold mt-4 leading-snug">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-white/85 mt-0.5">
                    {cat.subtitle}
                  </p>

                  {/* Items List */}
                  <div className="pt-3 mt-4 border-t border-white/20">
                    <ul className="text-white/90 text-xs space-y-2">
                      {cat.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-white/90">
                          {isProhibited ? (
                            <XCircle className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                          )}
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* SVG Shape Divider: Segregación → Compostaje */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none z-10">
        <svg 
          className="relative block w-full h-[60px] sm:h-[90px] lg:h-[120px]" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z" 
            fill="#d3e7cb"
          />
        </svg>
      </div>
    </section>
  );
};

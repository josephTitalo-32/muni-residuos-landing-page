import React from 'react';
import { Newspaper } from 'lucide-react';
import { NewsSection } from './NewsSection';
import { EnvironmentalImpactGallery } from './EnvironmentalImpactGallery';

export const ActualidadSection: React.FC = () => {
  return (
    <section id="actualidad" className="py-14 sm:py-20 lg:py-24 bg-[#e5f2f8] relative overflow-hidden">
      {/* Halo de luz de fondo */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[400px] bg-[#2096d2]/5 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[400px] bg-[#15803D]/5 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER PADRE DE ACTUALIDAD */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E6F2FA] text-[#004173] border border-[#2096d2]/30 font-heading shadow-xs">
            <Newspaper className="w-3.5 h-3.5 text-[#2096d2]" />
            <span>Actualidad Institucional</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#004173] tracking-tight font-heading leading-tight">
            Actualidad y Transparencia Ambiental
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal font-body max-w-2xl mx-auto">
            Conoce las últimas noticias, campañas e intervenciones de la GGIRS, y explora la galería de impacto con los resultados reales de la gestión municipal en la ciudad de Puno.
          </p>
        </div>

        {/* SUB-BLOQUE 1: NOTICIAS */}
        <div id="noticias" className="scroll-mt-24">
          <NewsSection />
        </div>

        {/* SUB-BLOQUE 2: GALERÍA DE IMPACTO */}
        <div id="galeria-impacto" className="scroll-mt-24 mt-16 sm:mt-20">
          <EnvironmentalImpactGallery />
        </div>

      </div>
    </section>
  );
};

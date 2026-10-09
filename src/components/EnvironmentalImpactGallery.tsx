import React, { useState, useRef, useCallback } from 'react';
import { 
  Trees, 
  Trash2, 
  Users, 
  Calendar, 
  Play, 
  X, 
  ArrowRight, 
  Info
} from 'lucide-react';

interface VideoModalData {
  title: string;
  category: string;
  duration: string;
  description: string;
  thumbnail: string;
}

export const EnvironmentalImpactGallery: React.FC = () => {
  // Estado para el slider Antes / Después (0 a 100%)
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Estado para el modal de video
  const [activeVideo, setActiveVideo] = useState<VideoModalData | null>(null);

  // Manejador del slider Antes / Después
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(100, (x / width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  // Placeholders temporales para imágenes
  const imgAntes = 'https://placehold.co/1200x800/DC2626/FFFFFF?text=Punto+Crítico+Antes';
  const imgDespues = 'https://placehold.co/1200x800/15803D/FFFFFF?text=Parque+Recuperado+Después';
  const thumbFlota = 'https://placehold.co/800x450/0B335E/FFFFFF?text=Flota+Compactadores';
  const thumbCompost = 'https://placehold.co/800x450/15803D/FFFFFF?text=Planta+Compostaje';

  const videos: VideoModalData[] = [
    {
      title: 'Flota de 29 Compactadores en Puno',
      category: 'Operatividad y Logística',
      duration: '03:45 min',
      description: 'Conoce cómo opera la moderna flota municipal de camiones compactadores recorriendo diariamente los 4 sectores y 29 circuitos de la ciudad de Puno.',
      thumbnail: thumbFlota
    },
    {
      title: 'Proceso de Compostaje en Salcedo',
      category: 'Valorización Orgánica',
      duration: '04:12 min',
      description: 'Acompaña a los especialistas de la GGIRS en la transformación de residuos orgánicos recolectados en mercados y hogares en humus fértil para áreas verdes.',
      thumbnail: thumbCompost
    }
  ];

  return (
    <div className="space-y-10 font-body relative">

      {/* SUBTÍTULO INTERNO */}
      <div className="border-b border-slate-200 pb-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#15803D] font-heading">
            <span className="w-6 h-0.5 bg-[#15803D] rounded-full"></span>
            <span>Impacto Real</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#004173] tracking-tight font-heading">
            Galería de Impacto Ambiental
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-body max-w-xl">
            Resultados reales: puntos críticos erradicados, toneladas recuperadas y espacios públicos transformados en áreas verdes.
          </p>
        </div>
      </div>

      {/* 4 INDICADORES INSTITUCIONALES EN ESTILO BENTO */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 font-body">
        
        <div className="group bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs text-center space-y-2.5 hover:shadow-[0_16px_40px_rgba(32,150,210,0.12)] hover:-translate-y-1.5 hover:border-[#2096d2]/40 transition-all duration-300">
          <div className="w-12 h-12 rounded-2xl bg-[#E6F2FA] text-[#2096d2] mx-auto flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#2096d2] group-hover:text-white shadow-2xs">
            <Trash2 className="w-5 h-5 group-hover:text-white transition-colors duration-200" />
          </div>
          <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#004173] font-heading group-hover:text-[#2096d2] transition-colors duration-200 tracking-tight">
            15 Tn
          </div>
          <div className="text-xs sm:text-sm font-bold text-[#004173] font-heading">
            Toneladas recuperadas
          </div>
          <p className="text-[11px] text-slate-500">
            Retiradas de focos clandestinos
          </p>
        </div>

        <div className="group bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs text-center space-y-2.5 hover:shadow-[0_16px_40px_rgba(21,128,61,0.12)] hover:-translate-y-1.5 hover:border-[#15803D]/40 transition-all duration-300">
          <div className="w-12 h-12 rounded-2xl bg-[#F0FDF4] text-[#15803D] mx-auto flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#15803D] group-hover:text-white shadow-2xs">
            <Trees className="w-5 h-5 group-hover:text-white transition-colors duration-200" />
          </div>
          <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#004173] font-heading group-hover:text-[#15803D] transition-colors duration-200 tracking-tight">
            8
          </div>
          <div className="text-xs sm:text-sm font-bold text-[#004173] font-heading">
            Puntos críticos erradicados
          </div>
          <p className="text-[11px] text-slate-500">
            Rehabilitados como áreas verdes
          </p>
        </div>

        <div className="group bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs text-center space-y-2.5 hover:shadow-[0_16px_40px_rgba(32,150,210,0.12)] hover:-translate-y-1.5 hover:border-[#2096d2]/40 transition-all duration-300">
          <div className="w-12 h-12 rounded-2xl bg-[#E6F2FA] text-[#2096d2] mx-auto flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#2096d2] group-hover:text-white shadow-2xs">
            <Users className="w-5 h-5 group-hover:text-white transition-colors duration-200" />
          </div>
          <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#004173] font-heading group-hover:text-[#2096d2] transition-colors duration-200 tracking-tight">
            1,200
          </div>
          <div className="text-xs sm:text-sm font-bold text-[#004173] font-heading">
            Voluntarios
          </div>
          <p className="text-[11px] text-slate-500">
            Ciudadanos puneños activos
          </p>
        </div>

        <div className="group bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs text-center space-y-2.5 hover:shadow-[0_16px_40px_rgba(32,150,210,0.15)] hover:-translate-y-1.5 hover:border-[#2096d2]/40 transition-all duration-300">
          <div className="w-12 h-12 rounded-2xl bg-[#FEF7E6] text-[#2096d2] mx-auto flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#2096d2] group-hover:text-white shadow-2xs">
            <Calendar className="w-5 h-5 group-hover:text-white transition-colors duration-200" />
          </div>
          <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#004173] font-heading group-hover:text-[#2096d2] transition-colors duration-200 tracking-tight">
            3
          </div>
          <div className="text-xs sm:text-sm font-bold text-[#004173] font-heading">
            Campañas realizadas
          </div>
          <p className="text-[11px] text-slate-500">
            Jornadas masivas Sumac Ayni
          </p>
        </div>

      </div>

      {/* COMPARADOR ANTES / DESPUÉS INTERACTIVO */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6 font-body">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h4 className="text-lg sm:text-xl font-extrabold text-[#004173] font-heading tracking-tight">
              Comparador Antes / Después
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 font-body mt-0.5">
              Desplaza la barra central para comparar el estado previo con el espacio público rehabilitado.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-[#004173] bg-[#E6F2FA] px-3.5 py-1.5 rounded-full border border-[#2096d2]/30 font-heading font-bold shadow-2xs">
            <span>Laykakota / Ribera Titicaca</span>
          </div>
        </div>

        {/* Canvas Interactivo Antes/Después */}
        <div 
          ref={containerRef}
          onClick={handleContainerClick}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchMove={handleTouchMove}
          className="relative w-full h-[320px] sm:h-[440px] md:h-[500px] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-slate-200 shadow-inner bg-slate-900"
        >
          <img
            src={imgDespues}
            alt="Área verde y parque recuperado en Puno"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            draggable={false}
          />
          
          <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-[#15803D]/90 backdrop-blur-xs text-white text-xs font-bold uppercase tracking-wider shadow-md pointer-events-none flex items-center gap-1.5 font-heading">
            <span>Después: Área Recuperada</span>
          </div>

          <div 
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={imgAntes}
              alt="Punto crítico con basura antes de la intervención"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              style={{
                width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                maxWidth: 'none'
              }}
              draggable={false}
            />
            <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-rose-600/90 backdrop-blur-xs text-white text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5 font-heading">
              <span>Antes: Punto Crítico</span>
            </div>
          </div>

          <div 
            className="absolute top-0 bottom-0 z-20 pointer-events-none flex items-center justify-center"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-1 h-full bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)]"></div>
            
            <div className="absolute w-11 h-11 rounded-full bg-white text-[#2096d2] shadow-2xl border-2 border-[#2096d2] flex items-center justify-center text-sm font-bold pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-transform">
              <span>⇄</span>
            </div>
          </div>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-slate-950/75 backdrop-blur-sm text-white text-[11px] font-medium px-4 py-1 rounded-full pointer-events-none font-body shadow-xs">
            Arrastra horizontalmente para comparar
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 pt-2 font-body">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
            <span>Antes: Acumulación no autorizada de residuos sólidos y escombros.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#15803D]"></span>
            <span>Después: Erradicación total, cobertura con grass natural y bancas comunales.</span>
          </div>
        </div>
      </div>

      {/* VIDEOS DESTACADOS */}
      <div className="space-y-6 font-body">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg sm:text-xl font-extrabold text-[#004173] font-heading tracking-tight">
              Videos Destacados
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 font-body mt-0.5">
              Acciones operativas en video de la Gerencia de Gestión Integral de Residuos Sólidos.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {videos.map((vid, idx) => (
            <div
              key={idx}
              onClick={() => setActiveVideo(vid)}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-[0_16px_40px_rgba(32,150,210,0.12)] hover:-translate-y-1.5 hover:border-[#2096d2]/40 transition-all duration-300 cursor-pointer flex flex-col font-body"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#2096d2] to-[#004173] text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>

                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-xs text-white text-xs font-semibold font-body">
                  {vid.duration}
                </div>

                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#004173] text-[11px] font-bold uppercase tracking-wider font-heading shadow-xs">
                  {vid.category}
                </div>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-3.5">
                <div className="space-y-1.5">
                  <h4 className="text-base sm:text-lg font-extrabold text-[#004173] group-hover:text-[#2096d2] transition-colors font-heading tracking-tight">
                    {vid.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-body">
                    {vid.description}
                  </p>
                </div>
                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#2096d2] font-heading">
                  <span>Reproducir audiovisual</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL DE REPRODUCTOR DE VIDEO INSTITUCIONAL */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200 font-body"
          onClick={() => setActiveVideo(null)}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200"
          >
            <div className="p-5 sm:p-6 bg-gradient-to-r from-[#004173] to-[#2096d2] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-white/20 text-white font-heading border border-white/30">
                  {activeVideo.category}
                </span>
                <h4 className="text-base sm:text-lg font-extrabold text-white mt-1.5 font-heading tracking-tight">
                  {activeVideo.title}
                </h4>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Cerrar video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video bg-black flex items-center justify-center">
              <img
                src={activeVideo.thumbnail}
                alt={activeVideo.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-center text-white space-y-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#2096d2] to-[#004173] text-white flex items-center justify-center shadow-lg animate-pulse">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <div className="space-y-1 max-w-md">
                  <p className="text-sm font-extrabold text-white font-heading">Transmisión Institucional Municipal</p>
                  <p className="text-xs text-white/90 font-body">{activeVideo.description}</p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 bg-white border-t border-slate-100 flex items-center justify-between font-body">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Info className="w-4 h-4 text-[#2096d2]" />
                <span>Video oficial producido por la Municipalidad Provincial de Puno</span>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="px-6 py-2.5 rounded-full text-xs font-bold bg-[#004173] hover:bg-[#2096d2] text-white transition-colors cursor-pointer font-heading shadow-md"
              >
                Cerrar Video
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

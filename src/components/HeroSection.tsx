import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Truck, 
  AlertTriangle, 
  Sprout, 
  HeartHandshake, 
  ArrowRight, 
  Pause, 
  Play, 
  Navigation,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Recycle
} from 'lucide-react';

export interface HeroSectionProps {
  onScrollToRoutes?: () => void;
  onScrollToReports?: () => void;
  onScrollToApp?: () => void;
}

interface SlideItem {
  id: string;
  badge: string;
  badgeIcon: React.ElementType;
  badgeColor: string;
  title: string;
  highlightText: string;
  subtitle: string;
  ctaText: string;
  targetSection: string;
  secondaryCtaText?: string;
  secondaryTargetSection?: string;
  image: string;
  imageAlt: string;
  accentColor: string;
  stats: { label: string; value: string }[];
}

const HERO_SLIDES: SlideItem[] = [
  {
    id: 'slide-rutas',
    badge: 'Registro en vivo',
    badgeIcon: Navigation,
    badgeColor: 'bg-[#2096d2]/30 text-sky-100 border-sky-300/30',
    title: 'Monitoreo en Vivo de',
    highlightText: 'las 29 Rutas',
    subtitle: 'Sigue el recorrido de los camiones compactadores en tiempo real desde tu celular y recibe avisos de campana en tu cuadra.',
    ctaText: 'Ver las 29 Rutas',
    targetSection: 'rutas',
    image: '/images/29-rutas.jpg',
    imageAlt: 'Monitoreo satelital y flota de recolección en Puno',
    accentColor: '#2096d2',
    stats: [
      { label: 'Rutas Activas', value: '29' },
      { label: 'Cobertura', value: '100% Barrios' },
      { label: 'Frecuencia', value: 'Diaria' }
    ]
  },
  {
    id: 'slide-segregacion',
    badge: 'Segregación Correcta',
    badgeIcon: Recycle,
    badgeColor: 'bg-[#2096d2]/30 text-sky-100 border-sky-300/30',
    title: 'Separa tus residuos en',
    highlightText: '4 colores',
    subtitle: 'Aprende a clasificar tus residuos desde casa: orgánicos, aprovechables, no aprovechables y peligrosos. Una correcta segregación facilita el reciclaje y el compostaje en Puno.',
    ctaText: 'Aprender a Segregar',
    targetSection: 'segregacion',
    secondaryCtaText: 'Ver Tachos',
    secondaryTargetSection: 'segregacion',
    image: '/images/segregacion-puno.jpg',
    imageAlt: 'Tachos de segregación de residuos en Puno: no aprovechables, orgánicos, aprovechables y peligrosos',
    accentColor: '#2096d2',
    stats: [
      { label: 'Tachos Oficiales', value: '4 Colores' },
      { label: 'Separa en Casa', value: '100%' },
      { label: 'Impacto Directo', value: 'Reciclaje' }
    ]
  },
  {
    id: 'slide-compostaje',
    badge: 'Economía Circular',
    badgeIcon: Sprout,
    badgeColor: 'bg-emerald-500/30 text-emerald-100 border-emerald-300/30',
    title: 'Programa Municipal de',
    highlightText: 'Compostaje',
    subtitle: 'Inscríbete gratis al programa municipal y recibe tu compostera con kit de microorganismos para transformar tus residuos en abono fértil.',
    ctaText: 'Inscribirme al Programa',
    targetSection: 'compostaje',
    secondaryCtaText: 'Calcular Impacto',
    secondaryTargetSection: 'compostaje',
    image: '/images/compostaje.jpg',
    imageAlt: 'Compostaje domiciliario y abono orgánico en Puno',
    accentColor: '#15803D',
    stats: [
      { label: 'Kit Municipal', value: '100% Gratis' },
      { label: 'Abono Generado', value: '60 kg/año' },
      { label: 'Capacitación', value: 'Certificada' }
    ]
  },
  {
    id: 'slide-sumac-ayni',
    badge: 'Cuidado del Lago Titicaca',
    badgeIcon: HeartHandshake,
    badgeColor: 'bg-sky-500/30 text-sky-100 border-sky-300/30',
    title: 'Sumac Ayni',
    highlightText: '',
    subtitle: 'Súmate a las grandes jornadas de limpieza de la bahía interior del Lago Titicaca, ecotrueques barriales y educación ambiental.',
    ctaText: 'Ver Campañas Activas',
    targetSection: 'sumac-ayni',
    secondaryCtaText: 'Segregación en Fuente',
    secondaryTargetSection: 'segregacion',
    image: '/images/sumac-ayni.webp',
    imageAlt: 'Campañas de limpieza y voluntariado ambiental en Puno',
    accentColor: '#004173',
    stats: [
      { label: 'Jornadas 2026', value: 'Mensuales' },
      { label: 'Ecotrueques', value: 'Plantas x Botellas' },
      { label: 'Voluntarios', value: '+1,200 Puneños' }
    ]
  },
  {
    id: 'slide-reportes',
    badge: 'Fiscalización Ciudadana',
    badgeIcon: AlertTriangle,
    badgeColor: 'bg-amber-500/30 text-amber-100 border-amber-300/30',
    title: 'Reporta a tu Vecino',
    highlightText: '',
    subtitle: 'Denuncia botaderos clandestinos y malas prácticas de disposición de residuos en tu barrio con fotografía georreferenciada.',
    ctaText: 'Reportar Ahora',
    targetSection: 'reporta',
    secondaryCtaText: 'Conocer Sanciones',
    secondaryTargetSection: 'reporta',
    image: '/images/reporte-al-vecino.jpg',
    imageAlt: 'Fiscalización ambiental y calles limpias en Puno',
    accentColor: '#2096d2',
    stats: [
      { label: 'Respuesta Máx.', value: '24 hrs' },
      { label: 'Geolocalización', value: 'GPS Exacto' },
      { label: 'Seguimiento', value: 'Con Ticket' }
    ]
  }
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToRoutes,
  onScrollToReports,
  onScrollToApp
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = HERO_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Autoplay management
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 6500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  // Smooth scroll handler
  const handleScrollTo = (targetSection: string) => {
    if (targetSection === 'rutas' && onScrollToRoutes) {
      onScrollToRoutes();
      return;
    }
    if (targetSection === 'reporta' && onScrollToReports) {
      onScrollToReports();
      return;
    }
    if (targetSection === 'descargar-app' && onScrollToApp) {
      onScrollToApp();
      return;
    }
    const element = document.getElementById(targetSection);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    setTouchStartX(null);
  };

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section 
      id="hero-section"
      className="relative w-full min-h-[800px] sm:min-h-[860px] lg:min-h-[920px] bg-[#004173] text-white overflow-hidden select-none flex flex-col justify-between m-0 p-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Carrusel de iniciativas de gestión ambiental en Puno"
    >
      {/* Slides Background Images & Overlays */}
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
            aria-hidden={!isActive}
          >
            {/* High-resolution Background Photo */}
            <img
              src={slide.image}
              alt={slide.imageAlt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-[center_60%]"
              loading={index === 0 ? 'eager' : 'lazy'}
            />

            {/* Gradiente superior sutil — solo para legibilidad del navbar */}
            <div className="absolute top-0 left-0 right-0 h-32 sm:h-40 pointer-events-none z-20 bg-gradient-to-b from-[#004173]/70 via-[#004173]/30 to-transparent"></div>
          </div>
        );
      })}

      {/* Main Content Area */}
      <div className="relative z-20 w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-20 flex-1 flex flex-col justify-center pt-24 sm:pt-28 lg:pt-32 pb-32 sm:pb-36 lg:pb-40">
        
        <div className="max-w-2xl space-y-4 sm:space-y-5">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/15 text-white border border-white/25 backdrop-blur-md shadow-xs animate-fadeIn">
            {React.createElement(activeSlide.badgeIcon, { className: "w-3.5 h-3.5 text-[#2096d2]" })}
            <span>{activeSlide.badge}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1"></span>
          </div>

          {/* Main Headings */}
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05] uppercase [text-shadow:_0_2px_12px_rgba(0,0,0,0.65)]">
              {activeSlide.title}{' '}
              <span className="text-white block">
                {activeSlide.highlightText}
              </span>
            </h1>
          </div>

          {/* Subtitle / Description */}
          <p className="text-sm sm:text-base lg:text-lg text-white/95 leading-relaxed font-normal [text-shadow:_0_1px_6px_rgba(0,0,0,0.7)]">
            {activeSlide.subtitle}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => handleScrollTo(activeSlide.targetSection)}
              id={`hero-cta-primary-${activeSlide.id}`}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm bg-[#2096d2] hover:bg-[#1a7fb3] text-white transition-all shadow-lg shadow-[#2096d2]/30 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{activeSlide.ctaText}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            {activeSlide.secondaryCtaText && activeSlide.secondaryTargetSection && (
              <button
                onClick={() => handleScrollTo(activeSlide.secondaryTargetSection!)}
                id={`hero-cta-secondary-${activeSlide.id}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-xs shadow-xs transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{activeSlide.secondaryCtaText}</span>
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Navigation Arrow Controls */}
      <div className="absolute inset-y-0 left-0 right-0 z-30 flex items-center justify-between px-3 sm:px-6 pointer-events-none">
        <button
          onClick={prevSlide}
          id="hero-slider-prev"
          className="pointer-events-auto w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          id="hero-slider-next"
          className="pointer-events-auto w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
          aria-label="Siguiente slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Bar: Indicators & Slide Jump Pills */}
      <div className="absolute bottom-16 sm:bottom-20 lg:bottom-24 left-0 right-0 z-30">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-20 flex flex-col items-start gap-3">
          
          {/* Quick topic pills */}
          <div className="hidden md:flex items-center gap-1 bg-black/50 backdrop-blur-xl p-1 rounded-full border border-white/25 shadow-lg shadow-black/20">
            {HERO_SLIDES.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#2096d2] text-white shadow-md'
                      : 'text-white/90 hover:text-white hover:bg-white/15 border border-white/20'
                  }`}
                >
                  {slide.badge}
                </button>
              );
            })}
          </div>

          {/* Dot Indicators + Play/Pause */}
          <div className="flex items-center gap-2.5">
            {HERO_SLIDES.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  id={`hero-dot-${index}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'w-8 bg-[#2096d2] shadow-md ring-2 ring-white/30'
                      : 'w-2.5 bg-white/40 hover:bg-white/70 ring-1 ring-white/20'
                  }`}
                  aria-label={`Ir a slide ${index + 1}: ${slide.title}`}
                  aria-current={isActive ? 'true' : 'false'}
                />
              );
            })}
            
            {/* Play/Pause Toggle Indicator */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="ml-2 p-1.5 rounded-full text-white/70 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-xs transition-colors cursor-pointer"
              title={isPaused ? "Reanudar rotación automática" : "Pausar rotación"}
              aria-label={isPaused ? "Reanudar carrusel" : "Pausar carrusel"}
            >
              {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
            </button>
          </div>

        </div>
      </div>

    </section>
  );
};
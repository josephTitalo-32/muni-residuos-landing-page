import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Clock, 
  Calendar, 
  Truck, 
  ExternalLink,
  ChevronDown,
  Navigation,
  Shield,
} from 'lucide-react';
import { PUNO_ROUTES } from '../data/punoRoutesData';
import { getRouteCoordinates } from '../data/route-coordinates';
import type { RouteDetail } from '../types';
import { RouteDetailModal } from './RouteDetailModal';
import { RouteMap } from './RouteMap';
import { getThemeStyles } from '../config/sectionThemes';

export const RoutesModule: React.FC = () => {
  const [selectedRouteId, setSelectedRouteId] = useState<string>('ruta-01');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modalRoute, setModalRoute] = useState<RouteDetail | null>(null);
  const [showAllRoutes, setShowAllRoutes] = useState<boolean>(false);
  const [isCardExpanded, setIsCardExpanded] = useState<boolean>(false);
  const [startImgError, setStartImgError] = useState<boolean>(false);
  const [endImgError, setEndImgError] = useState<boolean>(false);

  // Mapeo de colores por sector (sectorCode)
  const SECTOR_COLORS: Record<number, { bg: string; text: string; border: string }> = {
    1: { bg: 'bg-[#004173]/40', text: 'text-blue-100', border: 'border-[#004173]/70' },       // Centro: navy
    2: { bg: 'bg-[#1474B4]/40', text: 'text-sky-100', border: 'border-[#1474B4]/70' },       // Norte: celeste
    3: { bg: 'bg-[#15803D]/40', text: 'text-emerald-100', border: 'border-[#15803D]/70' },   // Sur: verde
    4: { bg: 'bg-[#2096d2]/40', text: 'text-amber-100', border: 'border-[#2096d2]/70' },     // Alta: dorado
  };

  // Mapeo de colores por turno
  const SHIFT_COLORS: Record<string, { bg: string; text: string; border: string; icon: string }> = {
    'Mañana': { 
      bg: 'bg-amber-500/25', 
      text: 'text-amber-100', 
      border: 'border-amber-400/60',
      icon: 'text-amber-300'
    },
    'Tarde': { 
      bg: 'bg-orange-500/25', 
      text: 'text-orange-100', 
      border: 'border-orange-400/60',
      icon: 'text-orange-300'
    },
    'Noche': { 
      bg: 'bg-indigo-500/25', 
      text: 'text-indigo-100', 
      border: 'border-indigo-400/60',
      icon: 'text-indigo-300'
    },
  };

  // Mapeo semántico de las 4 métricas
  const METRIC_COLORS = {
    horario: '#38BDF8',      // Celeste claro
    frecuencia: '#34D399',   // Verde claro
    familias: '#FBBF24',     // Dorado claro
    calles: '#A78BFA',       // Púrpura claro
  };

  // Wrapper to select route and reset card expansion state and image errors
  const handleSelectRoute = (routeId: string) => {
    setSelectedRouteId(routeId);
    setIsCardExpanded(false);
    setStartImgError(false);
    setEndImgError(false);
  };

  // Active highlighted route for map and info card
  const activeRoute = useMemo(() => {
    return PUNO_ROUTES.find((r) => r.id === selectedRouteId) || PUNO_ROUTES[0];
  }, [selectedRouteId]);

  // Real coordinates from manual validated dataset [lat, lng]
  const activeRouteCoords = useMemo(() => {
    const coords = getRouteCoordinates(selectedRouteId);
    if (coords && coords.length > 0) {
      return coords;
    }
    return null;
  }, [selectedRouteId]);

  const fallbackCoords: [number, number][] = useMemo(() => {
    if (activeRoute.startLatLng && activeRoute.endLatLng) {
      return [activeRoute.startLatLng, activeRoute.endLatLng];
    }
    return [[-15.8402, -70.0219], [-15.8368, -70.0245]];
  }, [activeRoute]);

  // Featured top 4 tabs
  const featuredTabs = PUNO_ROUTES.slice(0, 4);

  // Search filtering
  const searchResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];

    return PUNO_ROUTES.filter((route) => {
      return (
        route.name.toLowerCase().includes(q) ||
        route.description.toLowerCase().includes(q) ||
        route.coverageStreets.some((s) => s.toLowerCase().includes(q)) ||
        route.mainPoints.some((p) => p.toLowerCase().includes(q))
      );
    });
  }, [searchQuery]);

  // Handle instant search suggestion pick
  const handleStreetSelect = (route: RouteDetail) => {
    handleSelectRoute(route.id);
    setSearchQuery('');
    setShowAllRoutes(false);
  };

  return (
    <section
      id="rutas"
      className="w-full pt-8 pb-14 sm:pt-10 sm:pb-18 lg:pt-12 lg:pb-20 relative overflow-hidden bg-white"
      style={{
        ...getThemeStyles('rutas'),
        backgroundColor: '#e5f2f8',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6 relative z-10">
        
        {/* 1. Section Header (Aligned Left) */}
        <div className="flex items-stretch gap-4 sm:gap-5">
          {/* Línea decorativa vertical con gradiente */}
          <div
            className="w-1 sm:w-1.5 rounded-full shrink-0"
            style={{
              background: 'linear-gradient(to bottom, #2096d2 0%, #2096d2 50%, transparent 100%)',
            }}
          ></div>

          {/* Contenido del header */}
          <div className="text-left space-y-2 flex-1">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border uppercase tracking-wider"
              style={{
                backgroundColor: 'var(--section-accent-soft)',
                color: 'var(--section-text-primary)',
                borderColor: 'var(--section-accent)',
              }}
            >
              <Truck className="w-3.5 h-3.5" style={{ color: 'var(--section-accent)' }} />
              <span>Sistema Integral de Limpieza Pública</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-[#004173] via-[#004173] to-[#2096d2] bg-clip-text text-transparent">
              29 Rutas de Recolección en Puno
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal max-w-3xl leading-relaxed">
              Consulta el recorrido georreferenciado, horarios programados y cobertura de calles por cuadrante urbano.
            </p>
          </div>
        </div>

        {/* 2. Route Access Tabs: Ruta 01 | Ruta 02 | Ruta 03 | Ruta 04 | Más Rutas (29) */}
        <div className="space-y-3">
          <div className="flex items-center flex-wrap gap-2">
            {featuredTabs.map((r) => {
              const isSelected = selectedRouteId === r.id;
              return (
                <button
                  key={r.id}
                  id={`tab-${r.id}`}
                  onClick={() => {
                    handleSelectRoute(r.id);
                    setShowAllRoutes(false);
                  }}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer shadow-2xs ${
                    isSelected
                      ? 'text-white shadow-sm ring-2 ring-opacity-40'
                      : 'bg-white hover:bg-slate-50 border border-slate-200'
                  }`}
                  style={
                    isSelected
                      ? {
                          backgroundColor: 'var(--section-accent)',
                          borderColor: 'var(--section-accent)',
                          color: '#FFFFFF',
                        }
                      : {
                          color: 'var(--section-text-primary)',
                        }
                  }
                >
                  {r.name.split(':')[0]}
                </button>
              );
            })}

            {/* Extra pill if current selection is outside top 4 */}
            {!featuredTabs.some((r) => r.id === selectedRouteId) && (
              <button
                id={`tab-${activeRoute.id}`}
                className="px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-sm ring-2 ring-opacity-40 cursor-default"
                style={{
                  backgroundColor: 'var(--section-accent)',
                  borderColor: 'var(--section-accent)',
                  color: '#FFFFFF',
                }}
              >
                {activeRoute.name.split(':')[0]}
              </button>
            )}

            {/* "Más Rutas (29)" button positioned next to Ruta 04 */}
            <button
              id="btn-mas-rutas"
              onClick={() => setShowAllRoutes((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white border shadow-sm transition-all duration-150 cursor-pointer hover:brightness-95"
              style={{
                backgroundColor: 'var(--section-accent)',
                borderColor: 'var(--section-accent)',
              }}
            >
              <span>Más Rutas (29)</span>
              <ChevronDown className={`w-3.5 h-3.5 text-white transition-transform duration-200 ${showAllRoutes ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Collapsible Panel of all 29 routes */}
          {showAllRoutes && (
            <div id="selector-todas-rutas" className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: 'var(--section-text-primary)' }}
                >
                  Explora las 29 Rutas de Recolección de Puno
                </div>
                <button
                  onClick={() => setShowAllRoutes(false)}
                  className="text-xs text-slate-400 hover:text-slate-600 font-semibold px-2 py-0.5 rounded cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-64 overflow-y-auto pr-1 hide-scrollbar">
                {PUNO_ROUTES.map((r) => {
                  const isSelected = selectedRouteId === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => {
                        handleSelectRoute(r.id);
                        setShowAllRoutes(false);
                      }}
                      className={`text-left p-2.5 rounded-xl text-xs transition-all cursor-pointer border ${
                        isSelected
                          ? 'text-white shadow-2xs font-bold'
                          : 'bg-slate-50 hover:bg-slate-100 text-[#004173] border-slate-100'
                      }`}
                      style={
                        isSelected
                          ? {
                              backgroundColor: 'var(--section-accent)',
                              borderColor: 'var(--section-accent)',
                              color: '#FFFFFF',
                            }
                          : undefined
                      }
                    >
                      <div className="font-bold truncate">{r.name.split(':')[0]}</div>
                      <div className={`text-[10px] truncate ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>{r.sector}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 3. Main Grid: Left Leaflet Map + Right Information Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column (lg:col-span-7): Interactive Leaflet Map with GPS Simulated Truck */}
          <div className="lg:col-span-7 flex flex-col relative">
            <RouteMap
              coordinates={activeRouteCoords || fallbackCoords}
              routeName={activeRoute.name}
              speed={0.001}
              routeNumber={activeRoute.number}
              truckUnit={activeRoute.truckUnit}
              streets={activeRoute.coverageStreets}
              startPointName={activeRoute.mainPoints[0] || activeRoute.coverageStreets[0] || 'Punto Inicial'}
              endPointName={activeRoute.mainPoints[activeRoute.mainPoints.length - 1] || 'Punto Final'}
              fallbackStart={activeRoute.startLatLng}
              fallbackEnd={activeRoute.endLatLng}
            />

            {/* Barra unificada: Badge de ruta + Buscador integrados */}
            <div className="absolute top-3 left-3 z-[500] flex flex-col max-w-[calc(100%-5rem)] sm:max-w-2xl">
              <div className="flex items-center gap-0 bg-white rounded-full shadow-lg border border-slate-200/80 p-1.5 hover:shadow-xl transition-all w-full">
                
                {/* Sección 1: Identidad de la ruta (izquierda) */}
                <div className="flex items-center gap-2 pl-2 pr-3 shrink-0">
                  {/* Logo Muni */}
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 border border-slate-200 overflow-hidden">
                    <img
                      src="/images/escudo-puno.png"
                      alt="Municipalidad Provincial de Puno"
                      className="w-full h-full object-contain p-0.5"
                    />
                  </div>

                  {/* Nombre de la ruta + GPS */}
                  <div className="hidden sm:flex flex-col leading-tight">
                    <span className="text-xs font-bold text-[#004173] whitespace-nowrap">
                      {activeRoute.name.split(':')[0]}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-[10px] font-semibold text-emerald-600 tracking-wide uppercase">
                        GPS Oficial
                      </span>
                    </div>
                  </div>
                </div>

                {/* Separador vertical */}
                <div className="hidden sm:block w-px h-7 bg-slate-200 shrink-0"></div>

                {/* Sección 2: Input de búsqueda (derecha) */}
                <input
                  type="text"
                  id="input-buscador-calles"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchResults.length > 0) {
                      handleStreetSelect(searchResults[0]);
                    }
                  }}
                  placeholder="Busca tu calle, jirón o barrio..."
                  className="flex-1 min-w-0 text-sm text-slate-800 placeholder-slate-400 bg-transparent border-none outline-hidden py-2 px-3 font-medium"
                />

                {/* Lupa */}
                <div className="text-slate-400 shrink-0 pl-1">
                  <Search className="w-4 h-4" />
                </div>

                {/* Botón circular celeste */}
                <button
                  type="button"
                  onClick={() => {
                    if (searchResults.length > 0) {
                      handleStreetSelect(searchResults[0]);
                    }
                  }}
                  className="w-9 h-9 rounded-full bg-[#2096d2] hover:bg-[#1a7fb3] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#2096d2]/30 transition-all cursor-pointer ml-1"
                  aria-label="Buscar ruta"
                >
                  <Navigation className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Live Search Results Dropdown */}
              {searchQuery.trim().length > 1 && (
                <div className="mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 max-h-64 overflow-y-auto p-2 space-y-1">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 py-1">
                    Rutas con coincidencias ({searchResults.length})
                  </div>
                  {searchResults.length > 0 ? (
                    searchResults.map((r) => {
                      const q = searchQuery.toLowerCase().trim();
                      const matchingStreets = r.coverageStreets.filter((s) =>
                        s.toLowerCase().includes(q)
                      );
                      return (
                        <button
                          key={r.id}
                          onClick={() => handleStreetSelect(r)}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group border border-transparent hover:border-slate-200"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 truncate">
                              <MapPin className="w-4 h-4 text-[#2096d2] shrink-0" />
                              <span className="font-bold text-xs text-[#004173] truncate group-hover:text-[#2096d2]">
                                {r.name}
                              </span>
                            </div>
                            <span className="text-[11px] font-bold text-[#15803D] bg-emerald-50 px-2 py-0.5 rounded-md shrink-0">
                              Ver ruta
                            </span>
                          </div>
                          {matchingStreets.length > 0 && (
                            <div className="mt-1 text-[11px] text-slate-500 pl-6 truncate">
                              Calles: <span className="text-slate-700 font-semibold">
                                {matchingStreets.slice(0, 3).join(', ')}
                                {matchingStreets.length > 3 ? '...' : ''}
                              </span>
                            </div>
                          )}
                        </button>
                      );
                    })
                  ) : (
                    <div className="p-3 text-center text-xs text-slate-500">
                      No se encontraron calles con el término "{searchQuery}".
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column (lg:col-span-5): Information Card Profile Style */}
          <div className="lg:col-span-5 flex flex-col">
            <div
              className="w-full h-full rounded-2xl shadow-xl overflow-hidden relative flex flex-col"
              style={{ background: 'linear-gradient(135deg, #004173 0%, #1a7fb3 50%, #2096d2 100%)' }}
            >
              {/* Patrón decorativo sutil */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

              <div className="relative z-10 p-5 sm:p-6 flex flex-col h-full">
                {/* ===== Badges de sector y turno (arriba) ===== */}
                <div className="flex items-center justify-center flex-wrap gap-2 mb-3">
                  {/* Badge de sector con color dinámico */}
                  <span 
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold backdrop-blur-xs border ${
                      SECTOR_COLORS[activeRoute.sectorCode]?.bg || 'bg-white/15'
                    } ${
                      SECTOR_COLORS[activeRoute.sectorCode]?.text || 'text-white'
                    } ${
                      SECTOR_COLORS[activeRoute.sectorCode]?.border || 'border-white/25'
                    }`}
                  >
                    {activeRoute.sector}
                  </span>
                  
                  {/* Badge de turno con color según turno */}
                  <span 
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold backdrop-blur-xs border ${
                      SHIFT_COLORS[activeRoute.shift]?.bg || 'bg-white/15'
                    } ${
                      SHIFT_COLORS[activeRoute.shift]?.text || 'text-white'
                    } ${
                      SHIFT_COLORS[activeRoute.shift]?.border || 'border-white/25'
                    }`}
                  >
                    Turno {activeRoute.shift}
                  </span>
                </div>

                {/* ===== Header: Nombre de la ruta ===== */}
                <h3 className="text-center text-base sm:text-lg font-extrabold text-white leading-snug mb-4 [text-shadow:_0_1px_4px_rgba(0,0,0,0.3)]">
                  {activeRoute.name}
                </h3>

                {/* ===== Doble círculo: Inicio → Fin ===== */}
                <div className="flex items-center justify-center gap-3 mb-4">
                  {/* Círculo INICIO */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg ring-3 ring-white/25 overflow-hidden border-2 border-white">
                        {!startImgError ? (
                          <img
                            src={activeRoute.startImage || '/images/ruta1-inicio.webp'}
                            alt={`Inicio ${activeRoute.name}`}
                            className="w-full h-full object-cover"
                            onError={() => setStartImgError(true)}
                          />
                        ) : (
                          <Truck className="w-7 h-7 text-[#004173]" strokeWidth={1.5} />
                        )}
                      </div>
                      {/* Punto verde (estado activo/inicio) */}
                      <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-md"></span>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-white/80">
                      Inicio
                    </span>
                  </div>

                  {/* Conector visual (flecha) */}
                  <div className="flex items-center justify-center text-white/50 pb-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>

                  {/* Círculo FINAL */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg ring-3 ring-white/25 overflow-hidden border-2 border-white">
                        {!endImgError ? (
                          <img
                            src={activeRoute.endImage || '/images/ruta1-fin.webp'}
                            alt={`Fin ${activeRoute.name}`}
                            className="w-full h-full object-cover"
                            onError={() => setEndImgError(true)}
                          />
                        ) : (
                          <Truck className="w-7 h-7 text-[#004173]" strokeWidth={1.5} />
                        )}
                      </div>
                      {/* Punto rojo (estado final) */}
                      <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow-md"></span>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-white/80">
                      Final
                    </span>
                  </div>
                </div>

                {/* ===== Fila de 4 métricas (con íconos circulares blancos) ===== */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {/* Horario - Celeste */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                      <Clock className="w-4 h-4" style={{ color: METRIC_COLORS.horario }} />
                    </div>
                    <span className="text-[9px] font-semibold text-white/90 text-center leading-tight">
                      {activeRoute.schedule.split(' ')[0]}
                    </span>
                    <span className="text-[8px] text-white/60 text-center uppercase tracking-wide">Horario</span>
                  </div>

                  {/* Frecuencia - Verde */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                      <Calendar className="w-4 h-4" style={{ color: METRIC_COLORS.frecuencia }} />
                    </div>
                    <span className="text-[9px] font-semibold text-white/90 text-center leading-tight">
                      {activeRoute.frequency.split(',')[0].slice(0, 10)}
                    </span>
                    <span className="text-[8px] text-white/60 text-center uppercase tracking-wide">Frecuencia</span>
                  </div>

                  {/* Familias - Dorado */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                      <Shield className="w-4 h-4" style={{ color: METRIC_COLORS.familias }} />
                    </div>
                    <span className="text-[9px] font-semibold text-white/90 text-center leading-tight">
                      ~{activeRoute.estimatedHouseholds}
                    </span>
                    <span className="text-[8px] text-white/60 text-center uppercase tracking-wide">Familias</span>
                  </div>

                  {/* Calles - Púrpura */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                      <MapPin className="w-4 h-4" style={{ color: METRIC_COLORS.calles }} />
                    </div>
                    <span className="text-[9px] font-semibold text-white/90 text-center leading-tight">
                      {activeRoute.coverageStreets.length}
                    </span>
                    <span className="text-[8px] text-white/60 text-center uppercase tracking-wide">Calles</span>
                  </div>
                </div>

                {/* ===== Contenido expandible con preview en estado colapsado ===== */}
                <div className="overflow-hidden transition-all duration-500 mb-4">
                  <div className="space-y-3 pt-1">
                    {/* Descripción */}
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block mb-1">
                        Descripción del Servicio
                      </span>
                      <p
                        className={`text-xs text-white/90 leading-relaxed transition-all duration-300 ${
                          isCardExpanded ? '' : 'line-clamp-2'
                        }`}
                      >
                        {activeRoute.description}
                      </p>
                    </div>

                    {/* Listado de calles */}
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block mb-1.5">
                        Calles Comprendidas ({activeRoute.coverageStreets.length})
                      </span>
                      <div
                        className={`space-y-1 pr-1 transition-all duration-300 ${
                          isCardExpanded ? 'max-h-40 overflow-y-auto hide-scrollbar' : ''
                        }`}
                      >
                        {(isCardExpanded
                          ? activeRoute.coverageStreets
                          : activeRoute.coverageStreets.slice(0, 3)
                        ).map((street, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-[11px] text-white/85 py-0.5">
                            <span className="w-1 h-1 rounded-full bg-[#2096d2] shrink-0"></span>
                            <span className="truncate">{street}</span>
                          </div>
                        ))}
                        {/* Indicador de "más calles" cuando está colapsada */}
                        {!isCardExpanded && activeRoute.coverageStreets.length > 3 && (
                          <div className="text-[10px] text-white/50 italic pt-0.5 pl-3">
                            +{activeRoute.coverageStreets.length - 3} calles más...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ===== Botones de acción (al pie) ===== */}
                <div className="mt-auto pt-3 space-y-2">
                  {/* Botón principal: Ver más / Ver menos */}
                  <button
                    onClick={() => setIsCardExpanded((prev) => !prev)}
                    className="w-full py-3 px-4 rounded-lg font-bold text-xs sm:text-sm bg-[#004173] hover:bg-[#003459] text-white transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{isCardExpanded ? 'Ver menos' : 'Ver más'}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isCardExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Botón secundario: Ver Ficha Técnica Completa */}
                  <button
                    onClick={() => setModalRoute(activeRoute)}
                    id="btn-ficha-tecnica-completa"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-bold text-xs bg-white/15 hover:bg-white/25 text-white border border-white/25 backdrop-blur-xs transition-all cursor-pointer"
                  >
                    <span>Ver Ficha Técnica Completa</span>
                    <ExternalLink className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Modal for full route technical specs */}
      {modalRoute && (
        <RouteDetailModal route={modalRoute} onClose={() => setModalRoute(null)} />
      )}
    </section>
  );
};

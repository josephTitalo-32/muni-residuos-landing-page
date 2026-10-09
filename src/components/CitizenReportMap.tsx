import React, { useEffect, useRef, useState } from 'react';
import type { Map as LeafletMap, LayerGroup, Marker as LeafletMarker, LeafletMouseEvent } from 'leaflet';
import { 
  Navigation, 
  MapPin, 
  Search, 
  Maximize2, 
  Crosshair, 
  AlertTriangle,
  CheckCircle2,
  Layers,
  Compass
} from 'lucide-react';

// Lazy loader
type LeafletAPI = typeof import('leaflet').default;
let leafletPromise: Promise<LeafletAPI> | null = null;
function getLeaflet(): Promise<LeafletAPI> {
  if (!leafletPromise) {
    leafletPromise = import('leaflet').then((m) => m.default);
  }
  return leafletPromise;
}

export interface CriticalPoint {
  id: string;
  name: string;
  category: string;
  sector: string;
  lat: number;
  lng: number;
  description: string;
}

export const CRITICAL_POINTS: CriticalPoint[] = [
  { id: 'cp-1', name: 'Costanera Sur / Ribera Titicaca', category: 'Punto Crítico / Botadero', sector: 'Barrio Porteño', lat: -15.8431, lng: -70.0195, description: 'Fiscalización intensiva por arrojo de bolsas plásticas y escombros.' },
  { id: 'cp-2', name: 'Av. Floral con Jr. Universitaria', category: 'Desmonte Clandestino', sector: 'Bellavista', lat: -15.8362, lng: -70.0284, description: 'Acumulación recurrente de desmonte y material de construcción.' },
  { id: 'cp-3', name: 'Jr. Los Incas esq. Jr. Cahuide', category: 'Basura en Esquina', sector: 'Laykakota', lat: -15.8458, lng: -70.0250, description: 'Residuos domiciliarios arrojados fuera del horario del compactador.' },
  { id: 'cp-4', name: 'Óvalo Dante Nava / Av. El Sol', category: 'Contenedor Lleno', sector: 'Barrio Central', lat: -15.8408, lng: -70.0142, description: 'Punto comercial de alta afluencia peatonal con papelera colapsada.' }
];

const SEARCH_LOCATIONS = [
  { name: 'Plaza de Armas / Jr. Lima', sector: 'Centro Histórico', lat: -15.8402, lng: -70.0219 },
  { name: 'Mercado Central / Jr. Los Incas', sector: 'Laykakota', lat: -15.8458, lng: -70.0250 },
  { name: 'Av. Floral / Bellavista', sector: 'Bellavista', lat: -15.8362, lng: -70.0284 },
  { name: 'Av. Costanera / Puerto de Puno', sector: 'Barrio Porteño', lat: -15.8431, lng: -70.0195 },
  { name: 'Arco Deustua / Jr. Independencia', sector: 'Barrio Independencia', lat: -15.8354, lng: -70.0242 },
  { name: 'Av. Simón Bolívar / Huáscar', sector: 'Barrio Huáscar', lat: -15.8492, lng: -70.0180 },
  { name: 'Chejoña / Vía de Evitamiento', sector: 'Chejoña', lat: -15.8620, lng: -70.0075 },
];

interface CitizenReportMapProps {
  selectedCoords: [number, number];
  onLocationChange: (lat: number, lng: number, address: string, sector: string) => void;
  isGpsActive: boolean;
  gpsLoading: boolean;
  onTriggerGps: () => void;
  currentAddress: string;
  currentSector: string;
  onSelectCategory?: (category: string) => void;
}

export const CitizenReportMap: React.FC<CitizenReportMapProps> = ({
  selectedCoords,
  onLocationChange,
  isGpsActive,
  gpsLoading,
  onTriggerGps,
  currentAddress,
  currentSector,
  onSelectCategory
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);
  const reportMarkerRef = useRef<LeafletMarker | null>(null);
  const layerGroupRef = useRef<LayerGroup | null>(null);
  const leafletRef = useRef<LeafletAPI | null>(null);
  const [mapReady, setMapReady] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mapZoom, setMapZoom] = useState(14);
  const [userSelectedViaClick, setUserSelectedViaClick] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = await getLeaflet();
      if (cancelled || !mapContainerRef.current || mapInstanceRef.current) return;
      leafletRef.current = L;

      const map = L.map(mapContainerRef.current, {
        center: selectedCoords,
        zoom: 14,
        zoomControl: false,
        scrollWheelZoom: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> | Muni Puno Fiscalización',
      }).addTo(map);

      const layerGroup = L.layerGroup().addTo(map);
      layerGroupRef.current = layerGroup;
      mapInstanceRef.current = map;

      map.on('zoomend', () => { setMapZoom(map.getZoom()); });

      map.on('click', (e: LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        const formattedLat = parseFloat(lat.toFixed(4));
        const formattedLng = parseFloat(lng.toFixed(4));
        let closestSector = currentSector || 'Puno Centro';
        let minDistance = Infinity;
        for (const loc of SEARCH_LOCATIONS) {
          const d = Math.hypot(loc.lat - lat, loc.lng - lng);
          if (d < minDistance) { minDistance = d; closestSector = loc.sector; }
        }
        const generatedAddress = `Coord: ${formattedLat}, ${formattedLng} (${closestSector})`;
        setUserSelectedViaClick(true);
        onLocationChange(formattedLat, formattedLng, generatedAddress, closestSector);
      });

      const resizeObserver = new ResizeObserver(() => { map.invalidateSize(); });
      if (mapContainerRef.current) resizeObserver.observe(mapContainerRef.current);

      setMapReady(true);
    })();

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) { mapInstanceRef.current.remove(); mapInstanceRef.current = null; }
      layerGroupRef.current = null;
      leafletRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapReady) return;
    const L = leafletRef.current;
    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!L || !map || !layerGroup) return;

    layerGroup.clearLayers();

    CRITICAL_POINTS.forEach((cp) => {
      const isNearSelected = Math.hypot(cp.lat - selectedCoords[0], cp.lng - selectedCoords[1]) < 0.001;
      const cpDivIcon = L.divIcon({
        className: 'puno-critical-point-marker',
        html: `<div class="group relative flex items-center justify-center cursor-pointer"><div class="w-8 h-8 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg border-2 border-white ring-2 ring-red-500/40 hover:scale-110 transition-transform"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>${isNearSelected ? '' : '<span class="absolute -bottom-1 w-2 h-1 bg-red-800 rounded-full blur-[1px]"></span>'}</div>`,
        iconSize: [32, 32], iconAnchor: [16, 16],
      });
      const marker = L.marker([cp.lat, cp.lng], { icon: cpDivIcon });
      const popupContent = `<div class="p-2.5 max-w-[220px] font-sans"><div class="flex items-center gap-1.5 text-red-600 font-bold text-xs uppercase tracking-wide"><span>⚠️ Punto Crítico Oficial</span></div><p class="font-extrabold text-[#004173] text-sm mt-0.5 leading-snug">${cp.name}</p><p class="text-[11px] text-slate-600 mt-1 leading-relaxed">${cp.description}</p><div class="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]"><span class="px-1.5 py-0.5 rounded bg-red-50 text-red-700 font-semibold">${cp.sector}</span><button id="btn-use-cp-${cp.id}" class="text-[#2096d2] font-bold hover:underline cursor-pointer">Fijar aquí &rarr;</button></div></div>`;
      marker.bindPopup(popupContent, { className: 'puno-critical-popup', offset: [0, -10] });
      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-use-cp-${cp.id}`);
        if (btn) {
          btn.onclick = () => {
            onLocationChange(cp.lat, cp.lng, cp.name, cp.sector);
            if (onSelectCategory && cp.category) onSelectCategory(cp.category);
            map.closePopup();
            map.setView([cp.lat, cp.lng], 16, { animate: true });
          };
        }
      });
      marker.addTo(layerGroup);
    });

    const reportDivIcon = L.divIcon({
      className: 'puno-report-active-marker',
      html: `<div class="relative flex flex-col items-center cursor-move"><div class="absolute -top-1 w-10 h-10 bg-[#00B8D4]/40 rounded-full animate-ping pointer-events-none"></div><div class="w-10 h-10 rounded-2xl bg-[#00B8D4] text-[#063E4D] flex items-center justify-center shadow-2xl border-2 border-white ring-4 ring-[#00B8D4]/30 transform hover:scale-105 transition-transform z-20"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg></div><div class="w-2.5 h-2.5 bg-[#00B8D4] rotate-45 -mt-1.5 border-r border-b border-white z-10"></div><div class="mt-1 px-2.5 py-0.5 rounded-full bg-[#063E4D] text-white text-[10px] font-extrabold tracking-wide uppercase shadow-md border border-[#00B8D4]/60 whitespace-nowrap z-20">Punto del Reporte</div></div>`,
      iconSize: [40, 56], iconAnchor: [20, 48],
    });

    const reportMarker = L.marker(selectedCoords, { icon: reportDivIcon, draggable: true, zIndexOffset: 1000 });
    reportMarker.on('dragend', (e) => {
      const marker = e.target;
      const pos = marker.getLatLng();
      const lat = parseFloat(pos.lat.toFixed(4));
      const lng = parseFloat(pos.lng.toFixed(4));
      let closestSector = currentSector || 'Puno Centro';
      let minDistance = Infinity;
      for (const loc of SEARCH_LOCATIONS) {
        const d = Math.hypot(loc.lat - lat, loc.lng - lng);
        if (d < minDistance) { minDistance = d; closestSector = loc.sector; }
      }
      setUserSelectedViaClick(true);
      onLocationChange(lat, lng, `Coord: ${lat}, ${lng} (${closestSector})`, closestSector);
    });
    reportMarker.addTo(layerGroup);
    reportMarkerRef.current = reportMarker;
  }, [mapReady, selectedCoords]);

  const handleRecenter = () => { if (mapInstanceRef.current) mapInstanceRef.current.setView([-15.8402, -70.0219], 14, { animate: true }); };
  const handleZoomIn = () => { if (mapInstanceRef.current) mapInstanceRef.current.zoomIn(); };
  const handleZoomOut = () => { if (mapInstanceRef.current) mapInstanceRef.current.zoomOut(); };

  const handleSelectSearchResult = (loc: typeof SEARCH_LOCATIONS[0]) => {
    setSearchQuery(loc.name);
    setShowSuggestions(false);
    onLocationChange(loc.lat, loc.lng, loc.name, loc.sector);
    if (mapInstanceRef.current) mapInstanceRef.current.setView([loc.lat, loc.lng], 16, { animate: true });
  };

  const filteredSuggestions = SEARCH_LOCATIONS.filter(
    (loc) => loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || loc.sector.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative w-full h-[460px] sm:h-[500px] lg:h-[540px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#00B8D4]/40 shadow-2xl bg-[#042730]">
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      <div className="absolute top-3 left-3 right-3 z-[400] flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <div className="relative flex-1">
          <div className="flex items-center gap-2 bg-[#042730]/90 backdrop-blur-md rounded-xl sm:rounded-2xl border border-[#00B8D4]/40 px-3 py-2 shadow-lg text-white">
            <Search className="w-4 h-4 text-[#00B8D4] shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Buscar barrio o calle en Puno (ej. Av. Floral, Laykakota)..."
              className="bg-transparent text-xs sm:text-sm text-white placeholder:text-cyan-200/60 focus:outline-hidden w-full font-medium"
            />
            {searchQuery && (
              <button type="button" onClick={() => { setSearchQuery(''); setShowSuggestions(false); }} className="text-cyan-300 hover:text-white text-xs px-1">✕</button>
            )}
          </div>

          {showSuggestions && searchQuery.trim().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#042730]/95 backdrop-blur-md rounded-xl border border-[#00B8D4]/40 shadow-2xl overflow-hidden z-50 max-h-56 overflow-y-auto divide-y divide-cyan-900/40">
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((loc, idx) => (
                  <button key={idx} type="button" onClick={() => handleSelectSearchResult(loc)} className="w-full text-left px-3.5 py-2.5 text-xs hover:bg-[#00B8D4]/20 transition-colors flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#00B8D4] group-hover:scale-110 transition-transform" />
                      <span className="font-semibold text-white">{loc.name}</span>
                    </div>
                    <span className="text-[10px] text-cyan-300/80 bg-[#00B8D4]/15 px-2 py-0.5 rounded-full">{loc.sector}</span>
                  </button>
                ))
              ) : (
                <div className="px-3.5 py-3 text-xs text-cyan-200/70">No se encontraron zonas coincidentes. Haz clic directamente en el mapa para ubicar.</div>
              )}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => { onTriggerGps(); if (mapInstanceRef.current) mapInstanceRef.current.setView(selectedCoords, 16, { animate: true }); }}
          disabled={gpsLoading}
          className={`shrink-0 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl sm:rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-lg cursor-pointer ${isGpsActive ? 'bg-[#15803D] hover:bg-[#166534] text-white border border-emerald-400/60 ring-2 ring-emerald-500/20' : 'bg-[#00B8D4] hover:bg-[#009bb3] text-[#063E4D] border border-cyan-200/40 ring-2 ring-[#00B8D4]/20'}`}
        >
          <Navigation className={`w-4 h-4 ${gpsLoading ? 'animate-spin' : ''}`} />
          <span>{gpsLoading ? 'Geolocalizando...' : isGpsActive ? 'GPS Activo' : 'GEOLOCALIZAR (GPS)'}</span>
        </button>
      </div>

      <div className="absolute bottom-3 left-3 right-3 z-[400] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pointer-events-none">
        <div className="bg-[#042730]/90 backdrop-blur-md rounded-xl sm:rounded-2xl border border-[#00B8D4]/40 px-3.5 py-2 shadow-lg text-white text-xs flex items-center gap-2.5 pointer-events-auto">
          <div className="w-6 h-6 rounded-lg bg-[#00B8D4]/20 text-[#00B8D4] flex items-center justify-center shrink-0 border border-[#00B8D4]/30">
            <Crosshair className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-bold text-cyan-300/80 block leading-tight">Punto Seleccionado</span>
            <p className="font-semibold text-white text-xs truncate max-w-[200px] sm:max-w-[280px]">
              {currentAddress || `${selectedCoords[0].toFixed(4)}, ${selectedCoords[1].toFixed(4)}`}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-1.5 pointer-events-auto">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#042730]/85 backdrop-blur-md border border-[#00B8D4]/30 text-[11px] text-cyan-100">
            <MapPin className="w-3 h-3 text-[#00B8D4]" />
            <span>Haz clic o arrastra el pin para reubicar</span>
          </div>

          <button type="button" onClick={handleRecenter} className="w-8 h-8 rounded-xl bg-[#042730]/90 hover:bg-[#00B8D4]/20 text-white border border-[#00B8D4]/40 flex items-center justify-center shadow-md backdrop-blur-md cursor-pointer transition-colors" title="Centrar en Plaza Mayor de Puno">
            <Compass className="w-4 h-4 text-[#00B8D4]" />
          </button>

          <div className="flex items-center rounded-xl bg-[#042730]/90 border border-[#00B8D4]/40 shadow-md backdrop-blur-md overflow-hidden text-white">
            <button type="button" onClick={handleZoomIn} className="w-8 h-8 flex items-center justify-center hover:bg-[#00B8D4]/20 text-sm font-bold text-[#00B8D4] cursor-pointer transition-colors border-r border-[#00B8D4]/20" title="Acercar mapa">+</button>
            <button type="button" onClick={handleZoomOut} className="w-8 h-8 flex items-center justify-center hover:bg-[#00B8D4]/20 text-sm font-bold text-[#00B8D4] cursor-pointer transition-colors" title="Alejar mapa">−</button>
          </div>
        </div>
      </div>
    </div>
  );
};
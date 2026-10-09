import React, { useState, useRef } from 'react';
import { 
  Camera, 
  MapPin, 
  FileText, 
  Phone, 
  ShieldAlert, 
  CheckCircle2, 
  Send, 
  X,
  Navigation,
  Scale,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Check,
  AlertCircle,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';
import type { CitizenReport } from '../types';
import { CitizenReportMap } from './CitizenReportMap';

export const CitizenReportModule: React.FC = () => {
  // Wizard state (Steps 1, 2, 3)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Form field state
  const [category, setCategory] = useState<CitizenReport['category']>('Basura en Esquina');
  const [neighborhood, setNeighborhood] = useState('Centro Histórico');
  const [address, setAddress] = useState('Jr. Deustua con Jr. Lima, Puno');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [isGpsActive, setIsGpsActive] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Map coordinates state (Defaults to Plaza Mayor Puno)
  const [selectedCoords, setSelectedCoords] = useState<[number, number]>([-15.8402, -70.0219]);

  const steps = [
    { number: 1, title: 'Tipo y Lugar', subtitle: 'Infracción y ubicación' },
    { number: 2, title: 'Detalles y Evidencia', subtitle: 'Fotos y descripción' },
    { number: 3, title: 'Contacto y Envío', subtitle: 'Verificación y ticket' }
  ];

  const handleSimulateGPS = () => {
    setGpsLoading(true);
    setValidationError(null);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsLoading(false);
          setIsGpsActive(true);
          const lat = parseFloat(pos.coords.latitude.toFixed(4));
          const lng = parseFloat(pos.coords.longitude.toFixed(4));
          setSelectedCoords([lat, lng]);
          setAddress(`GPS: ${lat}, ${lng} (Puno)`);
          if (!neighborhood || neighborhood === 'Centro Histórico') {
            setNeighborhood('Sector Central Puno');
          }
        },
        () => {
          // Fallback to recognized central coordinate
          setGpsLoading(false);
          setIsGpsActive(true);
          const lat = -15.8402;
          const lng = -70.0219;
          setSelectedCoords([lat, lng]);
          setAddress('Jr. Deustua esq. Jr. Lima, Puno (GPS simulado)');
          setNeighborhood('Centro Histórico');
        },
        { timeout: 3500 }
      );
    } else {
      setTimeout(() => {
        setGpsLoading(false);
        setIsGpsActive(true);
        setSelectedCoords([-15.8362, -70.0284]);
        setAddress('Av. Floral con Jr. Universitaria, Puno');
        setNeighborhood('Bellavista');
      }, 500);
    }
  };

  const handleLocationChangeFromMap = (lat: number, lng: number, addr: string, sector: string) => {
    setSelectedCoords([lat, lng]);
    setAddress(addr);
    if (sector) {
      setNeighborhood(sector);
    }
    setValidationError(null);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        setValidationError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const validateStep1 = () => {
    if (!neighborhood.trim()) {
      setValidationError('Por favor ingresa el Barrio o Sector.');
      return false;
    }
    if (!address.trim()) {
      setValidationError('Por favor ingresa la Dirección o selecciona un punto en el mapa.');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const validateStep2 = () => {
    if (!description.trim()) {
      setValidationError('Por favor escribe una breve descripción de la infracción.');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    setValidationError(null);
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      setValidationError('Por favor ingresa un número de celular de contacto.');
      return;
    }

    setIsSubmitting(true);
    setValidationError(null);
    setTimeout(() => {
      const randomTicket = `TKT-PUNO-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedTicket(randomTicket);
      setIsSubmitting(false);
      // Reset fields
      setDescription('');
      setAddress('Jr. Deustua con Jr. Lima, Puno');
      setSelectedCoords([-15.8402, -70.0219]);
      setPhone('');
      setNeighborhood('Centro Histórico');
      setPhotoPreview(null);
      setIsGpsActive(false);
      setCurrentStep(1);
    }, 850);
  };

  return (
    <section 
      id="reporta" 
      className="pt-20 sm:pt-24 lg:pt-32 pb-20 sm:pb-24 lg:pb-32 bg-[#063E4D] relative overflow-hidden text-white"
    >
      {/* Decorative Cyan Glows & Mesh Accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#00B8D4]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-[#00B8D4]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* 1. Header Full Width (Arriba) */}
        <div className="mb-8 sm:mb-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#00B8D4]/15 text-[#00B8D4] border border-[#00B8D4]/30 uppercase tracking-wider shadow-2xs backdrop-blur-xs">
            <ShieldAlert className="w-3.5 h-3.5 text-[#00B8D4]" />
            <span>Fiscalización Ciudadana Digital</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Módulo Reporta a tu Vecino y Puntos Críticos
          </h2>
          
          <p className="text-sm sm:text-base text-cyan-100/80 leading-relaxed font-light">
            Canal de fiscalización ambiental directa para denunciar botaderos clandestinos, arrojo de desmonte o acumulación de basura fuera del horario oficial en Puno.
          </p>
        </div>

        {/* 2. Franja Horizontal Informativa: ¿Cómo funciona el módulo? (3 Pasos Clave) */}
        <div className="mb-8 sm:mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
            
            {/* Tarjeta 1: Evidencia Fotográfica Inmediata */}
            <div className="bg-[#04282F]/90 hover:bg-[#043340] border border-[#00B8D4]/25 hover:border-[#00B8D4]/50 rounded-2xl p-4 sm:p-5 shadow-lg transition-all duration-300 group flex items-start gap-3.5 sm:gap-4">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#00B8D4]/15 text-[#00B8D4] group-hover:bg-[#00B8D4] group-hover:text-[#04282F] flex items-center justify-center shrink-0 border border-[#00B8D4]/30 transition-all duration-300 shadow-xs">
                <Camera className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#00B8D4] bg-[#00B8D4]/10 px-2 py-0.5 rounded-md border border-[#00B8D4]/20">
                    Paso 1
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-200 transition-colors">
                  Evidencia Fotográfica Inmediata
                </h3>
                <p className="text-xs text-cyan-100/70 mt-1 leading-relaxed">
                  Captura o adjunta fotos del botadero clandestino o infractor para sustentar la sanción municipal.
                </p>
              </div>
            </div>

            {/* Tarjeta 2: Geolocalización Automática / GPS */}
            <div className="bg-[#04282F]/90 hover:bg-[#043340] border border-[#00B8D4]/25 hover:border-[#00B8D4]/50 rounded-2xl p-4 sm:p-5 shadow-lg transition-all duration-300 group flex items-start gap-3.5 sm:gap-4">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#00B8D4]/15 text-[#00B8D4] group-hover:bg-[#00B8D4] group-hover:text-[#04282F] flex items-center justify-center shrink-0 border border-[#00B8D4]/30 transition-all duration-300 shadow-xs">
                <Navigation className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#00B8D4] bg-[#00B8D4]/10 px-2 py-0.5 rounded-md border border-[#00B8D4]/20">
                    Paso 2
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-200 transition-colors">
                  Geolocalización Automática / GPS
                </h3>
                <p className="text-xs text-cyan-100/70 mt-1 leading-relaxed">
                  Detecta tu ubicación o señala el punto exacto en el mapa de Puno para despacho rápido de fiscalizadores.
                </p>
              </div>
            </div>

            {/* Tarjeta 3: Seguimiento por Ticket Único */}
            <div className="bg-[#04282F]/90 hover:bg-[#043340] border border-[#00B8D4]/25 hover:border-[#00B8D4]/50 rounded-2xl p-4 sm:p-5 shadow-lg transition-all duration-300 group flex items-start gap-3.5 sm:gap-4">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#00B8D4]/15 text-[#00B8D4] group-hover:bg-[#00B8D4] group-hover:text-[#04282F] flex items-center justify-center shrink-0 border border-[#00B8D4]/30 transition-all duration-300 shadow-xs">
                <FileText className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#00B8D4] bg-[#00B8D4]/10 px-2 py-0.5 rounded-md border border-[#00B8D4]/20">
                    Paso 3
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-200 transition-colors">
                  Seguimiento por Ticket Único
                </h3>
                <p className="text-xs text-cyan-100/70 mt-1 leading-relaxed">
                  Genera un código oficial MPP auditable en tiempo real para supervisar la inspección y resolución.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 3. Main 2-Column Balanced Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Columna Izquierda (lg:col-span-7): MAPA PROTAGONISTA + Bloque Legal Inferior */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            
            {/* Mapa Interactivo de Puno con Buscador y GPS */}
            <div className="w-full">
              <CitizenReportMap
                selectedCoords={selectedCoords}
                onLocationChange={handleLocationChangeFromMap}
                isGpsActive={isGpsActive}
                gpsLoading={gpsLoading}
                onTriggerGps={handleSimulateGPS}
                currentAddress={address}
                currentSector={neighborhood}
                onSelectCategory={(catName) => {
                  setCategory(catName as CitizenReport['category']);
                }}
              />
            </div>

            {/* Tarjeta Legal / Marco Normativo Compactada */}
            <div className="bg-[#042730] rounded-2xl p-4 border border-[#00B8D4]/25 flex items-start gap-3.5 text-white shadow-md">
              <div className="w-8 h-8 rounded-xl bg-[#00B8D4]/15 text-[#00B8D4] flex items-center justify-center shrink-0 border border-[#00B8D4]/30 mt-0.5">
                <Scale className="w-4 h-4" />
              </div>
              <div className="text-xs leading-relaxed space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-[#00B8D4] uppercase tracking-wider text-[11px]">
                    Ordenanza Municipal N° 092-2023-MPP
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">
                    Sanción Oficial
                  </span>
                </div>
                <p className="text-cyan-100/80 font-light">
                  Se sanciona con multas del <strong className="text-white font-semibold">10% al 50% de una UIT</strong> a personas naturales o jurídicas que arrojen residuos sólidos, desmonte o basura en esquinas, áreas públicas y la bahía del Lago Titicaca.
                </p>
              </div>
            </div>

          </div>

          {/* Columna Derecha (lg:col-span-5): Wizard Interactivo de 3 Pasos */}
          <div className="lg:col-span-5">
            
            {/* Contenedor Principal del Wizard en Cian Muy Claro */}
            <div className="bg-[#E8F8FA] rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 shadow-2xl border border-[#00B8D4]/30 text-[#004173] relative overflow-hidden backdrop-blur-xs">
              
              {/* Resplandor superior sutil */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00B8D4] via-[#004173] to-[#00B8D4]" />

              {/* Wizard Steps Header (Progreso de 3 Pasos) */}
              <div className="mb-5 sm:mb-6">
                <div className="flex items-center justify-between mb-2.5">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2096d2] block">
                      ASISTENTE DE REPORTE MUNICIPAL
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#004173]">
                      {steps[currentStep - 1].title}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#004173] text-[#00B8D4] border border-[#00B8D4]/30 shadow-xs">
                    Paso {currentStep} de 3
                  </span>
                </div>

                {/* Step Indicators Bar */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-1">
                  {steps.map((st) => {
                    const isCompleted = currentStep > st.number;
                    const isActive = currentStep === st.number;

                    return (
                      <button
                        key={st.number}
                        type="button"
                        onClick={() => {
                          if (st.number < currentStep) {
                            setCurrentStep(st.number);
                            setValidationError(null);
                          } else if (st.number === 2 && validateStep1()) {
                            setCurrentStep(2);
                          } else if (st.number === 3 && validateStep1() && validateStep2()) {
                            setCurrentStep(3);
                          }
                        }}
                        className={`text-left p-2 rounded-xl border transition-all cursor-pointer relative ${
                          isActive
                            ? 'bg-white border-[#00B8D4] shadow-md ring-2 ring-[#00B8D4]/20'
                            : isCompleted
                            ? 'bg-white/80 border-cyan-300 hover:bg-white text-[#004173]'
                            : 'bg-white/40 border-cyan-200/60 opacity-60 hover:opacity-80'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <div 
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 transition-colors ${
                              isCompleted 
                                ? 'bg-[#15803D] text-white' 
                                : isActive 
                                ? 'bg-[#2096d2] text-white' 
                                : 'bg-cyan-200/80 text-[#004173]'
                            }`}
                          >
                            {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : st.number}
                          </div>
                          <div className="truncate">
                            <p className="text-[11px] font-bold text-[#004173] truncate">
                              {st.title}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Progress bar line */}
                <div className="w-full bg-cyan-200/60 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div 
                    className="bg-[#00B8D4] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  />
                </div>
              </div>

              {/* Validation alert message if any */}
              {validationError && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-in fade-in duration-150">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Form body container */}
              <form onSubmit={handleSubmitReport} id="form-wizard-reporte">
                
                {/* ================= STEP 1: Tipo y Lugar ================= */}
                {currentStep === 1 && (
                  <div className="space-y-3.5 animate-in fade-in duration-200">
                    
                    {/* Título de reporte (select) */}
                    <div className="space-y-1">
                      <label htmlFor="select-tipo-infraccion" className="block text-[11px] font-bold uppercase tracking-wider text-[#004173]">
                        Tipo de Infracción o Problema *
                      </label>
                      <select
                        id="select-tipo-infraccion"
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value as CitizenReport['category']);
                          setValidationError(null);
                        }}
                        className="w-full px-3 py-2.5 rounded-xl border border-cyan-300 text-xs sm:text-sm text-[#004173] bg-white font-medium focus:ring-2 focus:ring-[#00B8D4] focus:border-[#00B8D4] focus:outline-hidden transition-all shadow-xs"
                      >
                        <option value="Basura en Esquina">Basura arrojada en esquina fuera de horario</option>
                        <option value="Desmonte Clandestino">Desmonte / Escombros de construcción en vía pública</option>
                        <option value="Punto Crítico / Botadero">Punto Crítico / Botadero Clandestino</option>
                        <option value="Contenedor Lleno">Contenedor o papelera colapsada</option>
                        <option value="Camión No Pasó">Omisión de recojo en horario programado</option>
                      </select>
                    </div>

                    {/* Barrio o Sector */}
                    <div className="space-y-1">
                      <label htmlFor="input-barrio" className="block text-[11px] font-bold uppercase tracking-wider text-[#004173]">
                        Barrio o Sector en Puno *
                      </label>
                      <input
                        id="input-barrio"
                        type="text"
                        required
                        value={neighborhood}
                        onChange={(e) => {
                          setNeighborhood(e.target.value);
                          setValidationError(null);
                        }}
                        placeholder="Ej. Laykakota, Bellavista, Huáscar, Centro Histórico"
                        className="w-full px-3 py-2.5 rounded-xl border border-cyan-300 text-xs sm:text-sm text-[#004173] bg-white font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-[#00B8D4] focus:border-[#00B8D4] focus:outline-hidden transition-all shadow-xs"
                      />
                    </div>

                    {/* Dirección o Referencia con botón GPS */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label htmlFor="input-direccion" className="block text-[11px] font-bold uppercase tracking-wider text-[#004173]">
                          Dirección o Referencia *
                        </label>
                        <button
                          type="button"
                          onClick={handleSimulateGPS}
                          disabled={gpsLoading}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                            isGpsActive 
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                              : 'bg-[#00B8D4]/20 text-[#004173] hover:bg-[#00B8D4]/30 border border-[#00B8D4]/40'
                          }`}
                          title="Sincronizar con el GPS"
                        >
                          <Navigation className={`w-3 h-3 text-[#2096d2] ${gpsLoading ? 'animate-spin' : ''}`} />
                          <span>{gpsLoading ? 'Detectando...' : isGpsActive ? 'GPS Activo' : 'Sincronizar GPS'}</span>
                        </button>
                      </div>
                      <input
                        id="input-direccion"
                        type="text"
                        required
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                          setValidationError(null);
                        }}
                        placeholder="Ej. Jr. Independencia con Tarapacá o haz clic en el mapa"
                        className="w-full px-3 py-2.5 rounded-xl border border-cyan-300 text-xs sm:text-sm text-[#004173] bg-white font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-[#00B8D4] focus:border-[#00B8D4] focus:outline-hidden transition-all shadow-xs"
                      />
                    </div>

                    {/* Conexión directa con el mapa interactivo */}
                    <div className="p-2.5 bg-white/80 rounded-xl border border-cyan-200/90 text-xs text-[#004173] flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#2096d2] shrink-0" />
                      <span className="text-[11px] leading-tight">
                        <strong>Coordenadas fijadas en el mapa:</strong> [{selectedCoords[0].toFixed(4)}, {selectedCoords[1].toFixed(4)}]. Puedes mover el marcador a la izquierda.
                      </span>
                    </div>

                  </div>
                )}

                {/* ================= STEP 2: Detalles y Evidencia ================= */}
                {currentStep === 2 && (
                  <div className="space-y-3.5 animate-in fade-in duration-200">
                    
                    {/* Descripción detallada (textarea) */}
                    <div className="space-y-1">
                      <label htmlFor="textarea-descripcion" className="block text-[11px] font-bold uppercase tracking-wider text-[#004173]">
                        Descripción Detallada del Hecho *
                      </label>
                      <textarea
                        id="textarea-descripcion"
                        rows={3}
                        required
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                          setValidationError(null);
                        }}
                        placeholder="Indica la recurrencia, horario aproximado, cantidad de basura o datos de vehículos/infractores..."
                        className="w-full px-3 py-2.5 rounded-xl border border-cyan-300 text-xs sm:text-sm text-[#004173] bg-white font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-[#00B8D4] focus:border-[#00B8D4] focus:outline-hidden transition-all shadow-xs resize-none"
                      />
                    </div>

                    {/* Fotografías (botones de Cámara y Galería con preview) */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#004173]">
                          Evidencia Fotográfica (Recomendado)
                        </label>
                        <span className="text-[10px] text-slate-500 font-medium">JPG, PNG, WEBP</span>
                      </div>

                      {/* Hidden Native File Input */}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />

                      {/* Botones de acción: Cámara & Galería */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={triggerFileInput}
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-cyan-300 bg-white hover:bg-cyan-50/50 text-xs font-bold text-[#004173] transition-all shadow-xs cursor-pointer group"
                        >
                          <Camera className="w-3.5 h-3.5 text-[#2096d2] group-hover:scale-110 transition-transform" />
                          <span>Tomar Foto</span>
                        </button>

                        <button
                          type="button"
                          onClick={triggerFileInput}
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-cyan-300 bg-white hover:bg-cyan-50/50 text-xs font-bold text-[#004173] transition-all shadow-xs cursor-pointer group"
                        >
                          <ImageIcon className="w-3.5 h-3.5 text-[#15803D] group-hover:scale-110 transition-transform" />
                          <span>Galería</span>
                        </button>
                      </div>

                      {/* Preview Area */}
                      {photoPreview ? (
                        <div className="relative mt-2 rounded-2xl overflow-hidden border border-cyan-300 bg-white p-2 flex items-center justify-between shadow-xs">
                          <div className="flex items-center gap-2.5">
                            <img 
                              src={photoPreview} 
                              alt="Vista previa del reporte" 
                              className="w-14 h-14 object-cover rounded-xl border border-slate-200" 
                            />
                            <div className="text-xs">
                              <p className="font-bold text-[#004173] flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" />
                                Evidencia cargada
                              </p>
                              <p className="text-slate-500 text-[10px] mt-0.5">Listo para el expediente digital</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setPhotoPreview(null)}
                            className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors cursor-pointer border border-red-200"
                            title="Quitar fotografía"
                            aria-label="Quitar foto"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div 
                          onClick={triggerFileInput}
                          className="mt-1 p-3.5 rounded-xl border-2 border-dashed border-cyan-300/80 bg-white/60 text-center cursor-pointer hover:bg-white transition-all group"
                        >
                          <div className="flex flex-col items-center gap-1">
                            <Camera className="w-5 h-5 text-[#2096d2] group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-bold text-[#004173]">
                              Haz clic para tomar o subir fotografía
                            </span>
                            <span className="text-[10px] text-slate-500">
                              Agiliza la sanción municipal y comprobación
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                )}

                {/* ================= STEP 3: Contacto y Envío ================= */}
                {currentStep === 3 && (
                  <div className="space-y-3.5 animate-in fade-in duration-200">
                    
                    {/* Celular de contacto */}
                    <div className="space-y-1">
                      <label htmlFor="input-celular" className="block text-[11px] font-bold uppercase tracking-wider text-[#004173]">
                        Celular del Ciudadano Denunciante *
                      </label>
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 text-cyan-600 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="input-celular"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            setValidationError(null);
                          }}
                          placeholder="Ej. 951 234 567"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-cyan-300 text-xs sm:text-sm text-[#004173] bg-white font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-[#00B8D4] focus:border-[#00B8D4] focus:outline-hidden transition-all shadow-xs"
                        />
                      </div>
                      <p className="text-[10px] text-slate-500">
                        Te notificaremos el código del ticket por SMS y estado de atención.
                      </p>
                    </div>

                    {/* Resumen Final de Comprobación */}
                    <div className="bg-white rounded-2xl p-3.5 border border-cyan-200 shadow-xs space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#004173]">
                        <Sparkles className="w-3.5 h-3.5 text-[#2096d2]" />
                        <span>Resumen del Reporte</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-100">
                        <div className="p-1.5 rounded-lg bg-cyan-50/60">
                          <span className="text-[9px] font-bold text-slate-500 uppercase block">Infracción</span>
                          <span className="font-bold text-[#004173] truncate block">{category}</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-cyan-50/60">
                          <span className="text-[9px] font-bold text-slate-500 uppercase block">Barrio</span>
                          <span className="font-bold text-[#004173] truncate block">{neighborhood}</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-cyan-50/60 col-span-2">
                          <span className="text-[9px] font-bold text-slate-500 uppercase block">Ubicación fijada</span>
                          <span className="font-semibold text-[#004173] truncate block text-[11px]">{address}</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-cyan-50/60 col-span-2 flex items-center justify-between text-[11px]">
                          <span className="text-slate-600 font-medium">Evidencia fotográfica:</span>
                          <span className={`font-bold ${photoPreview ? 'text-emerald-700' : 'text-slate-500'}`}>
                            {photoPreview ? '✓ 1 fotografía adjunta' : 'Sin imagen'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Declaración de veracidad */}
                    <div className="p-2.5 bg-white/70 rounded-xl border border-cyan-200/80 text-[10px] text-slate-600 flex items-start gap-2">
                      <Scale className="w-3.5 h-3.5 text-[#2096d2] shrink-0 mt-0.5" />
                      <span>
                        Declaro que los datos brindados corresponden a hechos reales observados en Puno, amparado en la Ordenanza N° 092-2023-MPP.
                      </span>
                    </div>

                  </div>
                )}

                {/* ================= CONTROLES DE NAVEGACIÓN DEL WIZARD ================= */}
                <div className="pt-4 mt-5 border-t border-cyan-200/80 flex items-center justify-between gap-2.5">
                  
                  {/* Botón Atrás (visible en pasos 2 y 3) */}
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-3.5 py-2.5 rounded-xl border border-cyan-300 bg-white hover:bg-slate-50 text-xs font-bold text-[#004173] flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 text-[#004173]" />
                      <span>Atrás</span>
                    </button>
                  ) : (
                    <div className="text-[10px] text-slate-500 font-medium">
                      Paso 1: Infracción & Ubicación
                    </div>
                  )}

                  {/* Botón Siguiente / Enviar Reporte */}
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-5 py-2.5 rounded-xl bg-[#2096d2] hover:bg-[#1a7fb3] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-[#2096d2]/25 hover:shadow-lg hover:shadow-[#2096d2]/35 cursor-pointer"
                    >
                      <span>Siguiente</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      id="btn-enviar-reporte"
                      className="px-5 py-2.5 rounded-xl bg-[#2096d2] hover:bg-[#1a7fb3] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-[#2096d2]/30 hover:shadow-lg hover:shadow-[#2096d2]/40 disabled:opacity-50 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 text-white" />
                      <span>{isSubmitting ? 'Registrando...' : 'Generar Ticket'}</span>
                    </button>
                  )}

                </div>

                {/* Nota de integración institucional */}
                <p className="text-[10px] text-center text-slate-500 leading-snug pt-3 font-normal">
                  Subgerencia de Limpieza Pública y Gestión Ambiental — Municipalidad Provincial de Puno.
                </p>

              </form>

            </div>

          </div>

        </div>

      </div>

      {/* Success Modal with Generated Ticket */}
      {submittedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#E8F8FA] rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-[#00B8D4]/40 text-center space-y-4 text-[#004173]">
            
            <div className="w-14 h-14 rounded-2xl bg-[#00B8D4]/20 text-[#2096d2] flex items-center justify-center mx-auto shadow-xs border border-[#00B8D4]/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2096d2]">
                ¡Reporte Registrado con Éxito!
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#004173]">
                Ticket #{submittedTicket}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Su denuncia ha sido ingresada al Sistema de Fiscalización de la Municipalidad Provincial de Puno. Un inspector verificará la zona en las próximas horas.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-cyan-200 text-xs text-left space-y-1.5 shadow-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Categoría:</span>
                <span className="font-bold text-[#004173]">{category}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Lugar fijado:</span>
                <span className="font-semibold text-slate-800 truncate max-w-[200px]">{address}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Estado:</span>
                <span className="font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full text-[10px]">
                  En Cola de Fiscalización
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Jurisdicción:</span>
                <span className="font-semibold text-slate-800">MPP - Limpieza Pública</span>
              </div>
            </div>

            <button
              onClick={() => setSubmittedTicket(null)}
              className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#2096d2] hover:bg-[#1a7fb3] text-white transition-all shadow-md shadow-[#2096d2]/30 cursor-pointer"
            >
              Entendido / Cerrar Ventana
            </button>
          </div>
        </div>
      )}

    </section>
  );
};

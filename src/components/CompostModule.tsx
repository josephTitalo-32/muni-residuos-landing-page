import React, { useState } from 'react';
import { 
  Sprout, 
  Calculator, 
  CheckCircle2, 
  Leaf, 
  TreePine, 
  Check, 
  CheckSquare
} from 'lucide-react';
import type { CompostRegistration } from '../types';

export const CompostModule: React.FC = () => {
  // Calculator state
  const [householdMembers, setHouseholdMembers] = useState<number>(4);

  // Registration form state
  const [formData, setFormData] = useState<CompostRegistration>({
    fullName: '',
    phone: '',
    address: '',
    spaceType: 'Patio / Tierra',
    committed: true,
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Calculations based on household members in Puno
  const organicKgPerMonth = householdMembers * 15;
  const compostKgPerMonth = Math.round(householdMembers * 4.5);
  const treesEquivalent = Math.max(1, Math.round(householdMembers * 1.8));

  const spaceOptions = [
    'Patio / Tierra',
    'Jardín',
    'Azotea / Balcón',
    'Huerto Comunal'
  ];

  const programChecklist = [
    'Entrega de compostera doméstica municipal (o tacho aireado).',
    'Manual digital y talleres virtuales de capacitación.',
    'Asesoramiento técnico para huertos urbanos.',
    'Registro en la red de hogares sostenibles de Puno.',
    'Acompañamiento y seguimiento técnico continuo.'
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  return (
    <section 
      id="compostaje" 
      className="pt-20 sm:pt-24 lg:pt-32 pb-32 sm:pb-40 lg:pb-48 bg-[#d3e7cb] relative -mt-px"
      style={{ backgroundColor: '#d3e7cb' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-[#15803D] border border-[#86EFAC] uppercase tracking-wider shadow-2xs">
            <Sprout className="w-3.5 h-3.5 text-[#2096d2]" />
            <span>Programa Municipal de Compostaje</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#004173] tracking-tight">
            Transforma tus residuos orgánicos en Vida
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            El 54% de la basura de un hogar puneño son restos orgánicos. Inscríbete al programa municipal para recibir tu kit de compostaje y capacitación gratuita.
          </p>
        </div>

        {/* 3-Column Layout: Calculator, Benefits, Registration Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* Column 1: Calculadora de Impacto Puneño */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#BBF7D0] flex flex-col justify-between space-y-6 shadow-sm">
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#15803D] uppercase tracking-wider">
                  <Calculator className="w-4 h-4 text-[#22C55E]" />
                  <span>Calculadora de Impacto Puneño</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Descubre cuánto abono puede producir tu familia al mes.
                </p>
              </div>

              {/* Household Slider */}
              <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700">Personas en tu hogar:</span>
                  <span className="text-sm font-bold text-[#004173] bg-white border border-slate-200 px-2.5 py-0.5 rounded-md">
                    {householdMembers} {householdMembers === 1 ? 'persona' : 'personas'}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={householdMembers}
                  onChange={(e) => setHouseholdMembers(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#15803D]"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>1 pers.</span>
                  <span>5 pers.</span>
                  <span>10+ pers.</span>
                </div>
              </div>

              {/* 2 Main Metrics */}
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 shadow-2xs space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Orgánicos Desviados
                  </span>
                  <div className="text-2xl font-bold text-[#004173]">
                    {organicKgPerMonth} <span className="text-xs font-medium text-slate-500">kg por mes</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Materia orgánica que no irá a botaderos.</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#BBF7D0] shadow-2xs space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#15803D] block">
                    Abono Producido
                  </span>
                  <div className="text-2xl font-bold text-[#15803D]">
                    {compostKgPerMonth} <span className="text-xs font-medium text-slate-500">kg compost fértil/mes</span>
                  </div>
                  <p className="text-[11px] text-[#15803D]">Nutrientes puros para enriquecer suelos puneños.</p>
                </div>
              </div>
            </div>

            {/* Final Highlight Message */}
            <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#86EFAC] text-xs text-[#14532D] flex items-center gap-2.5">
              <TreePine className="w-5 h-5 text-[#22C55E] shrink-0" />
              <span className="font-semibold leading-snug">
                ¡Equivale a plantar {treesEquivalent} árboles al año en áreas verdes de Puno!
              </span>
            </div>
          </div>

          {/* Column 2: Checklist de Beneficios */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#BBF7D0] flex flex-col justify-between space-y-6 shadow-sm">
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#15803D] uppercase tracking-wider">
                  <Sprout className="w-4 h-4 text-[#22C55E]" />
                  <span>Beneficios del Programa</span>
                </div>
                <h3 className="text-xl font-bold text-[#004173] mt-1">
                  ¿Qué incluye el Programa de Compostaje?
                </h3>
              </div>

              {/* Benefits List */}
              <ul className="space-y-3.5">
                {programChecklist.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-[#F0FDF4] text-[#22C55E] border border-[#BBF7D0] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirement note */}
            <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500">
              <p>
                <strong>Requisito básico:</strong> Compromiso vecinal de separar residuos orgánicos y asistir a las charlas municipales.
              </p>
            </div>
          </div>

          {/* Column 3: Formulario de Inscripción */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between space-y-5">
            <div>
              <div className="border-b border-slate-100 pb-3 mb-4">
                <h3 className="text-xl font-bold text-[#004173]">
                  Formulario de Inscripción al Compostaje
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                  Municipalidad Provincial de Puno - GGIRS
                </p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-6 space-y-4 animate-in fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#15803D] flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-[#004173]">
                    ¡Inscripción Recibida!
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Estimado(a) <strong>{formData.fullName}</strong>, tu registro fue ingresado al Padrón Verde. Nos comunicaremos al <strong>{formData.phone}</strong> para coordinar la entrega de tu compostera.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        phone: '',
                        address: '',
                        spaceType: 'Patio / Tierra',
                        committed: true
                      });
                    }}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-[#2096d2] text-white hover:bg-[#1a7fb3] transition-colors cursor-pointer shadow-sm shadow-[#2096d2]/30"
                  >
                    Registrar otra vivienda
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3.5" id="form-compostaje">
                  {/* Nombres y Apellidos */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      Nombres y Apellidos *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Ej. Rosa Quispe Mamani"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-[#15803D] focus:outline-hidden"
                    />
                  </div>

                  {/* Celular / WhatsApp */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      Celular / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="951 234 567"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-[#15803D] focus:outline-hidden"
                    />
                  </div>

                  {/* Dirección Exacta */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      Dirección Exacta *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Jr. / Av. y barrio en Puno"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-[#15803D] focus:outline-hidden"
                    />
                  </div>

                  {/* Espacio disponible: 4 selection buttons */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      Espacio Disponible
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {spaceOptions.map((option) => {
                        const isSelected = formData.spaceType === option;
                        return (
                          <button
                            type="button"
                            key={option}
                            onClick={() => setFormData({ ...formData, spaceType: option })}
                            className={`py-2 px-2 text-center text-xs rounded-xl border transition-all cursor-pointer font-medium ${
                              isSelected
                                ? 'bg-emerald-50 border-[#15803D] text-[#15803D] font-bold shadow-2xs'
                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Commitment Checkbox */}
                  <div className="pt-1 flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="check-compromiso"
                      required
                      checked={formData.committed}
                      onChange={(e) => setFormData({ ...formData, committed: e.target.checked })}
                      className="mt-0.5 w-4 h-4 rounded text-[#15803D] focus:ring-[#15803D] border-slate-300 cursor-pointer"
                    />
                    <label htmlFor="check-compromiso" className="text-[11px] text-slate-600 leading-snug cursor-pointer">
                      Me comprometo a separar los residuos orgánicos de mi hogar y asistir a las charlas.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      id="btn-registrar-compostaje"
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#22C55E] hover:bg-[#16A34A] text-white transition-all shadow-md hover:shadow-lg shadow-[#22C55E]/30 disabled:opacity-50 cursor-pointer"
                    >
                      <Leaf className="w-4 h-4 text-white" />
                      <span>{isSubmitting ? 'Registrando...' : 'Registrar Inscripción al Programa'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* SVG Shape Divider: Compostaje → Sumac Ayni (Triangular V) */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none z-10">
        <svg 
          className="relative block w-full h-[60px] sm:h-[90px] lg:h-[120px]" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M0,20 L600,100 L1200,20 L1200,120 L0,120 Z" 
            fill="#93C47D"
          />
        </svg>
      </div>
    </section>
  );
};

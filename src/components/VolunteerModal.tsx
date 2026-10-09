import React, { useState } from 'react';
import { X, CheckCircle2, HeartHandshake, User, Phone, Mail, Building, MapPin } from 'lucide-react';
import type { CampaignEvent } from '../types';

interface VolunteerModalProps {
  campaign: CampaignEvent | null;
  onClose: () => void;
}

export const VolunteerModal: React.FC<VolunteerModalProps> = ({ campaign, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [dni, setDni] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!campaign) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#004173] to-[#2096d2] text-white flex items-start justify-between relative">
          <div className="space-y-1">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white uppercase tracking-wider">
              {campaign.badge}
            </span>
            <h3 className="text-xl font-bold text-white">
              Inscripción: {campaign.title}
            </h3>
            <p className="text-xs text-slate-200 font-medium">
              Programa de Voluntariado Ambiental • Sumac Ayni Puno
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#15803D] flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-[#004173]">
                ¡Registro Confirmado!
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                Gracias por unirte a la cruzada ambiental por Puno y el Lago Titicaca. Te enviaremos las instrucciones y el punto de encuentro a tu número de WhatsApp.
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                <strong>Evento:</strong> {campaign.title}<br />
                <strong>Fecha:</strong> {campaign.date}
              </div>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#2096d2] hover:bg-[#1a7fb3] text-white transition-colors cursor-pointer shadow-sm shadow-[#2096d2]/30"
              >
                Cerrar Ventana
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#004173]">
                  <MapPin className="w-3.5 h-3.5 text-[#2096d2]" />
                  <span>{campaign.location}</span>
                </div>
                <div className="text-slate-500">{campaign.date}</div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Nombres y Apellidos *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ej. Juan Carlos Mamani Quispe"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#2096d2] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                    DNI / Documento *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={8}
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    placeholder="8 dígitos"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#2096d2] focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Celular WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="951 234 567"
                      className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#2096d2] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Institución, Colegio o Junta Vecinal (Opcional)
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="Ej. UNA Puno, I.E. San Carlos, Barrio Laykakota..."
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#2096d2] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#2096d2] hover:bg-[#1a7fb3] text-white transition-all shadow-sm shadow-[#2096d2]/30 cursor-pointer flex items-center justify-center gap-2"
                >
                  <HeartHandshake className="w-4 h-4 text-white" />
                  <span>Confirmar Mi Participación</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

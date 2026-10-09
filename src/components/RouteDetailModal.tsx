import React from 'react';
import { X, Clock, Calendar, Truck, MapPin, CheckCircle, Shield } from 'lucide-react';
import type { RouteDetail } from '../types';

interface RouteDetailModalProps {
  route: RouteDetail | null;
  onClose: () => void;
}

export const RouteDetailModal: React.FC<RouteDetailModalProps> = ({ route, onClose }) => {
  if (!route) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto hide-scrollbar shadow-2xl border border-slate-200">
        
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-[#004173] to-[#2096d2] text-white flex items-start justify-between relative">
          <div className="space-y-1">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white border border-white/30 uppercase tracking-wider">
              {route.sector}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {route.name}
            </h3>
            <p className="text-xs text-slate-200 font-medium flex items-center gap-1.5 pt-1">
              <Truck className="w-3.5 h-3.5 text-[#2096d2]" />
              Unidad asignada: {route.truckUnit}
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

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                <Clock className="w-4 h-4 text-[#2096d2]" />
                <span>Horario Oficial</span>
              </div>
              <p className="text-sm font-bold text-slate-800">{route.schedule}</p>
              <span className="text-[11px] text-slate-500">Turno: {route.shift}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                <Calendar className="w-4 h-4 text-[#15803D]" />
                <span>Frecuencia</span>
              </div>
              <p className="text-sm font-bold text-slate-800">{route.frequency}</p>
              <span className="text-[11px] text-emerald-700 font-medium">Recojo Programado</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                <Shield className="w-4 h-4 text-[#2096d2]" />
                <span>Cobertura Estimada</span>
              </div>
              <p className="text-sm font-bold text-slate-800">~{route.estimatedHouseholds.toLocaleString()} Familias</p>
              <span className="text-[11px] text-slate-500">Padrón Municipal 2026</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Descripción del Circuito</h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              {route.description}
            </p>
          </div>

          {/* Streets Covered */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Calles, Avenidas y Pasajes Comprendidos ({route.coverageStreets.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {route.coverageStreets.map((street, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200"
                >
                  <MapPin className="w-3 h-3 text-[#2096d2]" />
                  {street}
                </span>
              ))}
            </div>
          </div>

          {/* Main Landmark Points */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Puntos de Referencia y Paradas Principales</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {route.mainPoints.map((point, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 p-2 rounded-lg bg-emerald-50/60 border border-emerald-100">
                  <CheckCircle className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                  <span className="font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#2096d2] hover:bg-[#1a7fb3] text-white transition-colors cursor-pointer shadow-sm shadow-[#2096d2]/30"
          >
            Cerrar Detalle
          </button>
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { MapPin, Phone, Mail, Clock, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="main-footer" className="relative bg-[#004173] text-slate-300 overflow-hidden">
      
      {/* ============================================ */}
      {/* BLUEPRINT BACKGROUND — Trazos arquitectónicos */}
      {/* ============================================ */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 400"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Grid blueprint */}
          <defs>
            <pattern id="blueprint-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="1440" height="400" fill="url(#blueprint-grid)" />

          {/* Silueta arquitectónica estilizada — Esquina derecha */}
          <g stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Catedral / Edificio principal */}
            <path d="M 1150 320 L 1150 180 L 1180 180 L 1180 150 L 1200 130 L 1220 150 L 1220 180 L 1250 180 L 1250 320" />
            <path d="M 1180 180 L 1180 320 M 1220 180 L 1220 320" />
            <path d="M 1165 220 L 1180 220 M 1220 220 L 1235 220" />
            <path d="M 1165 260 L 1180 260 M 1220 260 L 1235 260" />
            {/* Cúpula / torre */}
            <circle cx="1200" cy="130" r="8" />
            <path d="M 1200 100 L 1200 122" />
            {/* Estructura lateral */}
            <path d="M 1270 320 L 1270 200 L 1300 200 L 1300 320" />
            <path d="M 1300 240 L 1320 240 L 1320 320" />
            {/* Base */}
            <path d="M 1100 320 L 1380 320" />
          </g>

          {/* Círculos técnicos — Esquina izquierda */}
          <g stroke="white" strokeWidth="1" fill="none">
            <circle cx="180" cy="180" r="140" />
            <circle cx="180" cy="180" r="100" />
            <circle cx="180" cy="180" r="60" />
            <circle cx="180" cy="180" r="20" />
            {/* Radios */}
            <line x1="40" y1="180" x2="320" y2="180" />
            <line x1="180" y1="40" x2="180" y2="320" />
            <line x1="80" y1="80" x2="280" y2="280" />
            <line x1="80" y1="280" x2="280" y2="80" />
          </g>

          {/* Líneas de conexión diagonales */}
          <g stroke="white" strokeWidth="0.8" fill="none" strokeDasharray="6,8">
            <line x1="320" y1="180" x2="600" y2="180" />
            <line x1="840" y1="180" x2="1100" y2="180" />
            <line x1="600" y1="180" x2="600" y2="80" />
            <line x1="600" y1="180" x2="600" y2="280" />
            <circle cx="600" cy="180" r="4" />
            <circle cx="840" cy="180" r="4" />
          </g>

          {/* Detalles técnicos dispersos */}
          <g stroke="white" strokeWidth="0.8" fill="none">
            <path d="M 500 340 L 520 340 L 520 320" />
            <path d="M 900 60 L 920 60 L 920 80" />
            <circle cx="700" cy="60" r="6" />
            <circle cx="1000" cy="340" r="6" />
          </g>
        </svg>
      </div>

      {/* ============================================ */}
      {/* CONTENIDO DEL FOOTER                          */}
      {/* ============================================ */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        
        {/* Grid principal: Brand (izq) + Contacto (der) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* =============== COLUMNA 1: BRAND =============== */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Escudo + Identidad */}
            <div className="flex items-center gap-4">
              <img
                src="/images/escudo-puno.png"
                alt="Escudo de Puno"
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain shrink-0"
              />
              <div>
                <span className="text-lg sm:text-xl font-bold text-white tracking-tight block font-heading">
                  Muni Puno Digital
                </span>
                <span className="text-xs sm:text-sm text-slate-400 font-medium block">
                  Municipalidad Provincial de Puno
                </span>
              </div>
            </div>

            {/* Descripción */}
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-lg font-body">
              Módulo de Gestión Integral de Residuos Sólidos (GGIRS). Tecnología ciudadana para una ciudad más limpia, ordenada y en armonía con el Lago Sagrado de los Incas.
            </p>

            {/* Redes Sociales */}
            <div className="flex items-center gap-2 pt-1">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/municipalidadpuno/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#2096d2] text-slate-300 hover:text-white border border-white/10 hover:border-[#2096d2] flex items-center justify-center transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/munipuno/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#2096d2] text-slate-300 hover:text-white border border-white/10 hover:border-[#2096d2] flex items-center justify-center transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>

              {/* X (Twitter) */}
              <a
                href="https://x.com/ProvincialPuno"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#2096d2] text-slate-300 hover:text-white border border-white/10 hover:border-[#2096d2] flex items-center justify-center transition-all"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* =============== COLUMNA 2: CONTACTO =============== */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
              Contacto y Atención
            </h4>
            
            <div className="space-y-3 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#2096d2] shrink-0 mt-0.5" />
                <span>Palacio Municipal: Jr. Deustua N° 458, Plaza Mayor, Puno</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#2096d2] shrink-0 mt-0.5" />
                <span>Central GGIRS: (051) 368-450 / 951 888 900</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#2096d2] shrink-0 mt-0.5" />
                <span>residuossolidos@munipuno.gob.pe</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#2096d2] shrink-0 mt-0.5" />
                <span>Lunes a Viernes: 08:00 AM - 04:30 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* =============== BOTTOM BAR =============== */}
        <div className="pt-6 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Municipalidad Provincial de Puno. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Por un Puno limpio frente al Lago Titicaca</span>
            <Heart className="w-3.5 h-3.5 text-[#2096d2] fill-[#2096d2] inline mx-0.5" />
          </div>
        </div>

      </div>
    </footer>
  );
};
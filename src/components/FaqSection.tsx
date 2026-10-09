import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/campaignsData';

export const FaqSection: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string>(FAQ_ITEMS[0].id);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-[#F8FAFC]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#2096d2]/15 text-[#004173] border border-[#2096d2]/30 uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#2096d2]" />
            <span>Orientación Vecinal y Normativa</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#004173] tracking-tight">
            Preguntas Frecuentes sobre la Limpieza en Puno
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto font-normal">
            Todo sobre las 29 rutas de recolección, segregación y el módulo en desarrollo.
          </p>
        </div>

        {/* Accordion List (Without Categories) */}
        <div className="space-y-3" id="faq-accordion-list">
          {FAQ_ITEMS.slice(0, 3).map((item) => {
            const isOpen = openFaqId === item.id;
            return (
              <div
                key={item.id}
                id={`faq-item-${item.id}`}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all duration-200 hover:border-slate-300"
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {item.question}
                  </h3>
                  
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'bg-[#2096d2] text-white rotate-180' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-4.5 pt-0.5 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed animate-in fade-in duration-200">
                    <p className="bg-slate-50 p-4 rounded-xl border border-slate-100/80 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Assistance */}
        <div className="text-center pt-1">
          <p className="text-xs text-slate-500">
            ¿Tiene alguna consulta adicional? Comuníquese con la central de atención GGIRS: <strong className="text-[#004173]">(051) 368-450</strong>
          </p>
        </div>

      </div>
    </section>
  );
};

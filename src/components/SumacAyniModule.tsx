import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Calendar, 
  MapPin, 
  Target, 
  ArrowRight, 
  Users 
} from 'lucide-react';
import { SUMAC_AYNI_CAMPAIGNS } from '../data/campaignsData';
import type { CampaignEvent } from '../types';
import { VolunteerModal } from './VolunteerModal';

export const SumacAyniModule: React.FC = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignEvent | null>(null);

  return (
    <section 
      id="sumac-ayni" 
      className="pt-20 sm:pt-24 lg:pt-32 pb-20 sm:pb-24 lg:pb-28 bg-[#93c47d] relative overflow-hidden -mt-px"
      style={{ backgroundColor: '#93c47d' }}
    >
      {/* Decorative ambient gradients for depth */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#2096d2]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#2096d2]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-white border border-white/30 uppercase tracking-wider backdrop-blur-md">
            <HeartHandshake className="w-3.5 h-3.5 text-white" />
            <span>Conciencia Ambiental Puneña</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Sumac Ayni: Campañas y Eventos Ambientales
          </h2>
          
          <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
            El <em>Ayni</em> andino aplicado al cuidado de nuestra tierra y el Lago Titicaca. Súmate a las jornadas de reciclaje, limpieza y voluntariado ambiental.
          </p>
        </div>

        {/* 3 Event Cards in Clean Solid Light Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SUMAC_AYNI_CAMPAIGNS.map((event) => (
            <div
              key={event.id}
              id={`card-campana-${event.id}`}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#BBF7D0] shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-[#22C55E] transition-all duration-200 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                
                {/* Badge */}
                <div>
                  <span className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full ${event.badgeColor}`}>
                    {event.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#004173] group-hover:text-[#2096d2] transition-colors leading-snug">
                  {event.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                  {event.description}
                </p>

                {/* Logistics Details */}
                <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs">
                  <div className="flex items-start gap-2.5 text-slate-700">
                    <Calendar className="w-4 h-4 text-[#2096d2] shrink-0 mt-0.5" />
                    <span>{event.date}</span>
                  </div>

                  <div className="flex items-start gap-2.5 text-slate-700">
                    <MapPin className="w-4 h-4 text-[#2096d2] shrink-0 mt-0.5" />
                    <span>{event.location}</span>
                  </div>

                  <div className="flex items-start gap-2.5 text-[#2096d2] font-semibold">
                    <Target className="w-4 h-4 text-[#2096d2] shrink-0 mt-0.5" />
                    <span>{event.target}</span>
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => setSelectedCampaign(event)}
                  id={`btn-unirme-${event.id}`}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#2096d2] hover:bg-[#1a7fb3] text-white transition-all shadow-sm shadow-[#2096d2]/30 cursor-pointer"
                >
                  <Users className="w-4 h-4 text-white" />
                  <span>{event.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Volunteer Registration Modal */}
      {selectedCampaign && (
        <VolunteerModal campaign={selectedCampaign} onClose={() => setSelectedCampaign(null)} />
      )}
    </section>
  );
};

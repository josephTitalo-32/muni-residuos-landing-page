import React from 'react';
import { 
  ArrowRight, 
  Calendar,
  Clock
} from 'lucide-react';
import { NEWS_DATA } from '../data/newsData';
import type { MunicipalNewsItem } from '../types';

export const NewsSection: React.FC = () => {
  // Tomamos las primeras 3 noticias como destacadas
  const featuredNews = NEWS_DATA.slice(0, 3);

  const getCategoryBadgeClass = (category: MunicipalNewsItem['category']) => {
    switch (category) {
      case 'Intervención':
        return 'bg-[#E6F2FA] text-[#0B335E] border-[#0081C0]/30';
      case 'Campaña':
        return 'bg-[#F0FDF4] text-[#15803D] border-[#15803D]/30';
      case 'Logro':
        return 'bg-[#E6F2FA] text-[#0B335E] border-[#0081C0]/30';
      case 'Anuncio Oficial':
        return 'bg-[#FEF7E6] text-[#78350F] border-[#E5A91E]/40';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-8 font-body relative">
      
      {/* SUBTÍTULO INTERNO */}
      <div className="border-b border-slate-200 pb-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#0081C0] font-heading">
            <span className="w-6 h-0.5 bg-[#0081C0] rounded-full"></span>
            <span>Sala de Prensa</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B335E] tracking-tight font-heading">
            Últimas Noticias
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-body max-w-xl">
            Mantente informado sobre las intervenciones, campañas y logros de la gestión ambiental municipal.
          </p>
        </div>
      </div>

      {/* GRILLA DE 3 NOTICIAS DESTACADAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {featuredNews.map((news, idx) => (
          <a
            key={news.id}
            href={`/noticias/${news.id}`}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-[0_16px_40px_rgba(0,129,192,0.12)] hover:-translate-y-1.5 hover:border-[#0081C0]/40 active:scale-[0.98] active:shadow-inner transition-all duration-300 cursor-pointer flex flex-col"
          >
            {/* Imagen de portada */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border backdrop-blur-md shadow-sm font-heading ${getCategoryBadgeClass(news.category)}`}>
                  {news.category}
                </span>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[11px] text-slate-500 font-body">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#0081C0]" />
                    <span>{news.date}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#0081C0]" />
                    <span>{news.readTime}</span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-[#0B335E] group-hover:text-[#0081C0] transition-colors leading-snug font-heading tracking-tight line-clamp-2">
                  {news.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body line-clamp-3">
                  {news.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0081C0] font-heading">
                <span>Leer noticia completa</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </a>
        ))}
      </div>

    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Building2, 
  Tag, 
  Share2, 
  CheckCircle2, 
  X, 
  ShieldCheck
} from 'lucide-react';
import { NEWS_DATA } from '../data/newsData';
import type { MunicipalNewsItem } from '../types';

interface NoticiaDetalleModalProps {
  newsId: string | null;
  onClose: () => void;
  onNavigateToNews?: (newsId: string) => void;
}

export const NoticiaDetalleModal: React.FC<NoticiaDetalleModalProps> = ({
  newsId,
  onClose,
  onNavigateToNews
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (newsId) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [newsId]);

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (newsId) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [newsId, onClose]);

  if (!newsId) return null;

  // Buscar noticia por id exacto o normalizado
  const newsItem: MunicipalNewsItem | undefined = NEWS_DATA.find(
    (item) => item.id === newsId || item.id === `noticia-${newsId}`
  ) || NEWS_DATA[0];

  if (!newsItem) return null;

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/#noticias/${newsItem.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getCategoryBadgeClass = (category: MunicipalNewsItem['category']) => {
    switch (category) {
      case 'Intervención':
        return 'bg-[#E6F2FA] text-[#004173] border-[#2096d2]/30';
      case 'Campaña':
        return 'bg-[#F0FDF4] text-[#15803D] border-[#15803D]/30';
      case 'Logro':
        return 'bg-[#E6F2FA] text-[#004173] border-[#2096d2]/30';
      case 'Anuncio Oficial':
        return 'bg-[#FEF7E6] text-[#78350F] border-[#2096d2]/40';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  // Otras noticias disponibles para sugerencia al pie
  const otherNews = NEWS_DATA.filter((n) => n.id !== newsItem.id).slice(0, 3);

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-start justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto font-body"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-4xl w-full my-8 shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200"
      >
        
        {/* Barra superior de Navegación / Cerrar */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-5 sm:px-7 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-body">
            <span className="w-2 h-2 rounded-full bg-[#2096d2]"></span>
            <span className="font-semibold text-[#004173]">Noticia Institucional</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/90 text-xs font-bold text-[#004173] hover:text-[#2096d2] hover:border-[#2096d2]/40 shadow-2xs transition-all cursor-pointer font-heading"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                  <span className="text-[#15803D] font-bold">¡Enlace copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-[#2096d2]" />
                  <span>Compartir</span>
                </>
              )}
            </button>
            
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              aria-label="Cerrar noticia"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* IMAGEN GRANDE DE LA NOTICIA */}
        <div className="relative w-full h-64 sm:h-80 md:h-[380px] bg-slate-100 overflow-hidden">
          <img
            src={newsItem.image}
            alt={newsItem.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
            <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider border backdrop-blur-md shadow-sm font-heading ${getCategoryBadgeClass(newsItem.category)}`}>
              {newsItem.category}
            </span>
          </div>
        </div>

        {/* ENCABEZADO Y METADATOS */}
        <div className="p-6 sm:p-10 space-y-6 sm:space-y-8">
          
          {/* Metadatos Fecha y Tiempo de Lectura */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-500 font-body border-b border-slate-100 pb-4">
            <div className="flex items-center gap-1.5 text-[#004173] font-semibold">
              <Calendar className="w-4 h-4 text-[#2096d2]" />
              <span>{newsItem.date}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5 text-slate-500">
              <Clock className="w-4 h-4 text-[#2096d2]" />
              <span>{newsItem.readTime}</span>
            </div>
          </div>

          {/* TÍTULO COMPLETO GRANDE */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#004173] leading-tight tracking-tight font-heading">
            {newsItem.title}
          </h1>

          {/* Área y Autoría Responsable */}
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-xs sm:text-sm">
            <div className="w-10 h-10 rounded-xl bg-[#E6F2FA] flex items-center justify-center text-[#2096d2] shrink-0 border border-[#2096d2]/30">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-[#004173] font-heading">{newsItem.author}</div>
              <div className="text-[11px] text-slate-500 font-body">Publicación institucional oficial verificada</div>
            </div>
          </div>

          {/* CONTENIDO COMPLETO */}
          <div className="space-y-5 text-base sm:text-lg text-slate-700 leading-relaxed font-body pt-2">
            {newsItem.fullContent.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Etiquetas / Tags */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2 font-body">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#004173] uppercase tracking-wider font-heading mr-2">
              <Tag className="w-3.5 h-3.5 text-[#2096d2]" />
              Temas relacionados:
            </span>
            {newsItem.tags.map((tag, i) => (
              <span 
                key={i} 
                className="px-3.5 py-1 rounded-full bg-slate-100 text-xs font-semibold text-[#004173] border border-slate-200/60 hover:bg-[#E6F2FA] hover:text-[#2096d2] transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

        </div>

        {/* INFORMACIÓN INSTITUCIONAL VERIFICADA */}
        <div className="mx-6 sm:mx-10 mb-8 p-5 rounded-2xl bg-[#E6F2FA]/60 border border-[#2096d2]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-body">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#2096d2] shrink-0 border border-[#2096d2]/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#004173]">
                Contenido oficial verificado y administrado exclusivamente por la GGIRS • Municipalidad Provincial de Puno.
              </p>
              <p className="text-xs text-slate-500 font-body">
                Publicado bajo estándares de gobierno digital y transparencia pública municipal.
              </p>
            </div>
          </div>
          <div className="shrink-0 self-start sm:self-center">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#004173] text-white font-heading shadow-xs">
              Resolución N° 082-2026-MPP
            </span>
          </div>
        </div>

        {/* Otras Noticias de Interés */}
        {otherNews.length > 0 && onNavigateToNews && (
          <div className="px-6 sm:px-10 pb-8 space-y-4 border-t border-slate-100 pt-6">
            <h3 className="text-lg font-extrabold text-[#004173] font-heading tracking-tight">
              Otras Actualizaciones Institucionales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {otherNews.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigateToNews(item.id)}
                  className="text-left bg-white rounded-2xl border border-slate-200/90 p-5 hover:border-[#2096d2]/50 hover:shadow-md transition-all cursor-pointer space-y-2 group shadow-2xs"
                >
                  <div className="text-[11px] text-[#2096d2] font-bold font-heading">
                    {item.category} • {item.date}
                  </div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-[#004173] group-hover:text-[#2096d2] transition-colors line-clamp-2 font-heading">
                    {item.title}
                  </h4>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

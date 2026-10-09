import type { CampaignEvent, FaqItem } from '../types';

export const SUMAC_AYNI_CAMPAIGNS: CampaignEvent[] = [
  {
    id: 'reciclaton-puneno',
    title: 'Gran Reciclatón Puneño',
    subtitle: 'Canje ecológico de botellas PET y cartón por abono y plantones nativos',
    date: 'Sábado 14 de Marzo, 08:00 AM - 02:00 PM',
    location: 'Parque Manuel Pino (Frente al Templo San Juan)',
    target: 'Meta: 15 Toneladas de reciclables',
    reward: 'Bolsa de Compost Orgánico Municipal + Plantón nativo',
    badge: 'Próxima Jornada',
    badgeColor: 'bg-[#2096d2] text-white border border-[#1a7fb3]',
    imageAlt: 'Gran Reciclatón Puneño en Parque Pino',
    ctaText: 'Unirme a la Campaña',
    description: 'Canjea botellas PET, papel y cartón por plantones nativos y abono orgánico.'
  },
  {
    id: 'titicaca-limpio',
    title: 'Jornada de Limpieza Ribera del Titicaca',
    subtitle: 'Recuperación ambiental de la bahía interior de Puno y Malecón Turístico',
    date: 'Domingo 22 de Marzo, 07:00 AM',
    location: 'Bahía de Puno (Puerto Lacustre a Malecón Chanu Chanu)',
    target: 'Erradicar 8 puntos críticos',
    reward: 'Certificado oficial de Voluntariado Ambiental Municipal',
    badge: 'Franja Costanera',
    badgeColor: 'bg-[#2096d2] text-white border border-[#1a7fb3]',
    imageAlt: 'Limpieza de ribera del Lago Titicaca',
    ctaText: 'Participar como Voluntario',
    description: 'Retira plásticos y residuos de la orilla del lago sagrado junto a brigadas vecinales.'
  },
  {
    id: 'ecotrueque-compostaje',
    title: 'Ecotrueque y Talleres de Compostaje',
    subtitle: 'Intercambio de materiales reciclables y talleres prácticos en barrios',
    date: 'Viernes 27 de Marzo, 09:00 AM - 03:00 PM',
    location: 'Plaza Mayor de Puno y Mercado Unión y Dignidad',
    target: 'Dirigido a estudiantes y familias',
    reward: 'Composteras compactas y semillas',
    badge: 'Barrios de Puno',
    badgeColor: 'bg-[#2096d2] text-white border border-[#1a7fb3]',
    imageAlt: 'Ecotrueque y Talleres de Compostaje en Puno',
    ctaText: 'Inscribir a mi Barrio',
    description: 'Aprende a hacer compostaje en casa y participa en el intercambio de materiales reciclables.'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Rutas',
    question: '¿Todas las 29 rutas de Puno estarán monitoreadas en la app?',
    answer: 'Sí. Actualmente las rutas piloto cuentan con rastreo en vivo y las rutas restantes de los distintos sectores de Puno se van incorporando progresivamente en la app oficial.'
  },
  {
    id: 'faq-2',
    category: 'Compostaje',
    question: '¿Tiene algún costo la inscripción al programa de compostaje?',
    answer: 'No, el programa es 100% gratuito. La Municipalidad Provincial de Puno brinda el kit de compostaje, material instructivo y asistencia técnica sin costo alguno.'
  },
  {
    id: 'faq-3',
    category: 'Fiscalización',
    question: '¿Cómo funcionará la fiscalización en «Reporta a tu Vecino»?',
    answer: 'Permite registrar fotografías con geolocalización de puntos críticos o arrojo en horario no permitido. Los reportes son derivados a la GGIRS para intervención y aplicación de la Ordenanza Municipal N° 092-2023-MPP.'
  }
];

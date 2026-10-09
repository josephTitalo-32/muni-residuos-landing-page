import type { WasteItem } from '../types';

export const WASTE_CATEGORIES_INFO = [
  {
    id: 'aprovechables',
    title: 'Residuos Aprovechables',
    subtitle: 'Tacho / Bolsa Verde',
    daysBadge: 'MAR - JUE - SÁB',
    colorName: 'Verde',
    colorHex: '#15803D',
    bgLight: '#F0FDF4',
    borderClass: 'border-[#15803D]/30',
    iconBg: 'bg-[#15803D]/10 text-[#15803D]',
    description: 'Materiales listos para su reutilización.',
    itemsType: 'accepted' as const,
    items: [
      'Botellas PET aplastadas',
      'Cartón, cajas y periódicos',
      'Latas y metales',
      'Envases de vidrio'
    ],
    acceptedItems: [
      'Botellas PET aplastadas',
      'Cartón, cajas y periódicos',
      'Latas y metales',
      'Envases de vidrio'
    ],
    prohibitedItems: [],
    collectionDays: 'MAR - JUE - SÁB',
    destination: 'Destino: Recicladores Formalizados',
    tag: 'MAR - JUE - SÁB'
  },
  {
    id: 'organicos',
    title: 'Residuos Orgánicos',
    subtitle: 'Tacho / Bolsa Marrón',
    daysBadge: 'LUN - MIÉ - VIE',
    colorName: 'Marrón / Café',
    colorHex: '#78350F',
    bgLight: '#FEF3C7',
    borderClass: 'border-[#78350F]/30',
    iconBg: 'bg-[#78350F]/10 text-[#78350F]',
    description: 'Residuos que se transforman en abono natural.',
    itemsType: 'accepted' as const,
    items: [
      'Cáscaras de frutas y verduras',
      'Restos de comida y café',
      'Cáscaras de huevo y té',
      'Hojas secas y restos de jardín'
    ],
    acceptedItems: [
      'Cáscaras de frutas y verduras',
      'Restos de comida y café',
      'Cáscaras de huevo y té',
      'Hojas secas y restos de jardín'
    ],
    prohibitedItems: [],
    collectionDays: 'LUN - MIÉ - VIE',
    destination: 'Destino: Compost Municipal Puno',
    tag: 'LUN - MIÉ - VIE'
  },
  {
    id: 'no_aprovechables',
    title: 'Residuos No Aprovechables',
    subtitle: 'Tacho / Bolsa Negra',
    daysBadge: 'DIARIO / TURNO NOCHE',
    colorName: 'Negro',
    colorHex: '#0F172A',
    bgLight: '#F1F5F9',
    borderClass: 'border-[#0F172A]/30',
    iconBg: 'bg-[#0F172A]/10 text-[#0F172A]',
    description: 'Residuos sanitarios y no reutilizables.',
    itemsType: 'prohibited' as const,
    items: [
      'Papel higiénico y pañales',
      'Colillas de cigarro y tecnopor',
      'Mascarillas y guantes usados',
      'Envolturas metalizadas'
    ],
    acceptedItems: [],
    prohibitedItems: [
      'Papel higiénico y pañales',
      'Colillas de cigarro y tecnopor',
      'Mascarillas y guantes usados',
      'Envolturas metalizadas'
    ],
    collectionDays: 'DIARIO / TURNO NOCHE',
    destination: 'Destino: Relleno Sanitario Itapalluni',
    tag: 'DIARIO / TURNO NOCHE'
  },
  {
    id: 'peligrosos',
    title: 'Residuos Peligrosos',
    subtitle: 'Tacho / Bolsa Roja',
    daysBadge: 'PUNTOS RAEE',
    colorName: 'Rojo',
    colorHex: '#DC2626',
    bgLight: '#FEF2F2',
    borderClass: 'border-[#DC2626]/30',
    iconBg: 'bg-[#DC2626]/10 text-[#DC2626]',
    description: 'Residuos peligrosos que requieren tratamiento especial.',
    itemsType: 'prohibited' as const,
    items: [
      'Pilas y baterías usadas',
      'Focos ahorradores y fluorescentes',
      'Envases de aerosoles',
      'Medicamentos vencidos'
    ],
    acceptedItems: [],
    prohibitedItems: [
      'Pilas y baterías usadas',
      'Focos ahorradores y fluorescentes',
      'Envases de aerosoles',
      'Medicamentos vencidos'
    ],
    collectionDays: 'Puntos de acopio RAEE',
    destination: 'Destino: Puntos de Acopio Municipal',
    tag: 'PUNTOS RAEE'
  }
];

export const WASTE_SEARCH_ITEMS: WasteItem[] = [
  // Orgánicos
  {
    id: 'w-1',
    name: 'Cáscara de plátano / manzana / frutas',
    category: 'organico',
    categoryName: 'Residuo Orgánico',
    binColor: '#15803D',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    badgeText: 'Bolsa Verde / Compost',
    disposalTip: 'Ideal para compostaje. Picar en trozos pequeños para acelerar la descomposición natural.',
    collectionDays: 'Lunes, Miércoles y Viernes',
    canBeComposted: true
  },
  {
    id: 'w-2',
    name: 'Restos de café molido y té',
    category: 'organico',
    categoryName: 'Residuo Orgánico',
    binColor: '#15803D',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    badgeText: 'Bolsa Verde / Compost',
    disposalTip: 'Aporta nitrógeno excelente para la tierra del jardín y las composteras domiciliarias.',
    collectionDays: 'Lunes, Miércoles y Viernes',
    canBeComposted: true
  },
  {
    id: 'w-3',
    name: 'Cáscaras de huevo',
    category: 'organico',
    categoryName: 'Residuo Orgánico',
    binColor: '#15803D',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    badgeText: 'Bolsa Verde / Compost',
    disposalTip: 'Triturar con las manos antes de colocarlo en el compost para enriquecerlo con calcio.',
    collectionDays: 'Lunes, Miércoles y Viernes',
    canBeComposted: true
  },
  {
    id: 'w-4',
    name: 'Hojas secas y flores marchitas',
    category: 'organico',
    categoryName: 'Residuo Orgánico',
    binColor: '#15803D',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    badgeText: 'Bolsa Verde / Compost',
    disposalTip: 'Materia marrón (carbono). Sirve como capa de cobertura para evitar olores en tu compostera.',
    collectionDays: 'Lunes, Miércoles y Viernes',
    canBeComposted: true
  },
  {
    id: 'w-5',
    name: 'Restos de verduras (lechuga, papa, zanahoria)',
    category: 'organico',
    categoryName: 'Residuo Orgánico',
    binColor: '#15803D',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    badgeText: 'Bolsa Verde / Compost',
    disposalTip: 'Desecho verde de alto valor para la producción de humus municipal.',
    collectionDays: 'Lunes, Miércoles y Viernes',
    canBeComposted: true
  },

  // Inorgánicos Reciclables
  {
    id: 'w-6',
    name: 'Botella de plástico PET (gaseosa, agua mineral)',
    category: 'inorganico',
    categoryName: 'Inorgánico Reciclable',
    binColor: '#2096d2',
    badgeBg: 'bg-[#2096d2]/10 text-[#004173] border-[#2096d2]/30',
    badgeText: 'Bolsa Celeste / Reciclable',
    disposalTip: 'Vaciar el líquido, enjuagar levemente, aplastar para reducir volumen y colocar la tapa.',
    collectionDays: 'Martes, Jueves y Sábado (Recicladores Sumac Ayni)',
    canBeComposted: false
  },
  {
    id: 'w-7',
    name: 'Lata de leche / atún / conservas',
    category: 'inorganico',
    categoryName: 'Inorgánico Reciclable',
    binColor: '#2096d2',
    badgeBg: 'bg-[#2096d2]/10 text-[#004173] border-[#2096d2]/30',
    badgeText: 'Bolsa Celeste / Reciclable',
    disposalTip: 'Enjuagar para retirar restos de comida y evitar malos olores antes de entregar al reciclador.',
    collectionDays: 'Martes, Jueves y Sábado (Recicladores Sumac Ayni)',
    canBeComposted: false
  },
  {
    id: 'w-8',
    name: 'Caja de cartón / Cartulina seca',
    category: 'inorganico',
    categoryName: 'Inorgánico Reciclable',
    binColor: '#2096d2',
    badgeBg: 'bg-[#2096d2]/10 text-[#004173] border-[#2096d2]/30',
    badgeText: 'Bolsa Celeste / Reciclable',
    disposalTip: 'Desarmar y aplanar para optimizar el espacio. Mantener seco (el cartón mojado pierde valor).',
    collectionDays: 'Martes, Jueves y Sábado (Recicladores Sumac Ayni)',
    canBeComposted: false
  },
  {
    id: 'w-9',
    name: 'Frasco o botella de vidrio (sin romper)',
    category: 'inorganico',
    categoryName: 'Inorgánico Reciclable',
    binColor: '#2096d2',
    badgeBg: 'bg-[#2096d2]/10 text-[#004173] border-[#2096d2]/30',
    badgeText: 'Bolsa Celeste / Reciclable',
    disposalTip: 'Enjuagar y separar tapas metálicas. El vidrio es 100% e infinitamente reciclable.',
    collectionDays: 'Martes, Jueves y Sábado (Recicladores Sumac Ayni)',
    canBeComposted: false
  },
  {
    id: 'w-10',
    name: 'Envase Tetra Pak (leche, jugo)',
    category: 'inorganico',
    categoryName: 'Inorgánico Reciclable',
    binColor: '#2096d2',
    badgeBg: 'bg-[#2096d2]/10 text-[#004173] border-[#2096d2]/30',
    badgeText: 'Bolsa Celeste / Reciclable',
    disposalTip: 'Desplegar las esquinas, escurrir el líquido, aplanar y colocar en la bolsa de reciclaje.',
    collectionDays: 'Martes, Jueves y Sábado (Recicladores Sumac Ayni)',
    canBeComposted: false
  },
  {
    id: 'w-11',
    name: 'Papel bond / Cuadernos viejos / Periódico',
    category: 'inorganico',
    categoryName: 'Inorgánico Reciclable',
    binColor: '#2096d2',
    badgeBg: 'bg-[#2096d2]/10 text-[#004173] border-[#2096d2]/30',
    badgeText: 'Bolsa Celeste / Reciclable',
    disposalTip: 'Apilar sin arrugar en exceso. Retirar grapas metálicas o espirales plásticos si es posible.',
    collectionDays: 'Martes, Jueves y Sábado (Recicladores Sumac Ayni)',
    canBeComposted: false
  },

  // No Aprovechables
  {
    id: 'w-12',
    name: 'Papel higiénico usado / Pañales / Toallitas',
    category: 'no_aprovechable',
    categoryName: 'No Aprovechable (Sanitario)',
    binColor: '#475569',
    badgeBg: 'bg-slate-200 text-slate-800 border-slate-400',
    badgeText: 'Bolsa Negra / Relleno Sanitario',
    disposalTip: 'Empacar en doble bolsa cerrada para resguardar la salud de los operarios de limpieza pública.',
    collectionDays: 'Horario habitual de camión compactador',
    canBeComposted: false
  },
  {
    id: 'w-13',
    name: 'Envoltura de snacks / Galletas / Caramelos',
    category: 'no_aprovechable',
    categoryName: 'No Aprovechable (Metalizado)',
    binColor: '#475569',
    badgeBg: 'bg-slate-200 text-slate-800 border-slate-400',
    badgeText: 'Bolsa Negra / Relleno Sanitario',
    disposalTip: 'Plásticos aluminizados complejos que no pueden ser procesados mecánicamente en la región.',
    collectionDays: 'Horario habitual de camión compactador',
    canBeComposted: false
  },
  {
    id: 'w-14',
    name: 'Tecnopor / Poliestireno expandido',
    category: 'no_aprovechable',
    categoryName: 'No Aprovechable',
    binColor: '#475569',
    badgeBg: 'bg-slate-200 text-slate-800 border-slate-400',
    badgeText: 'Bolsa Negra / Relleno Sanitario',
    disposalTip: 'Depositar en bolsa negra. Recuerda preferir envases biodegradables o reutilizables.',
    collectionDays: 'Horario habitual de camión compactador',
    canBeComposted: false
  },
  {
    id: 'w-15',
    name: 'Colillas de cigarro / Ceniza',
    category: 'no_aprovechable',
    categoryName: 'No Aprovechable',
    binColor: '#475569',
    badgeBg: 'bg-slate-200 text-slate-800 border-slate-400',
    badgeText: 'Bolsa Negra / Relleno Sanitario',
    disposalTip: 'Asegúrate de que estén completamente apagadas antes de tirarlas para evitar incendios en el camión.',
    collectionDays: 'Horario habitual de camión compactador',
    canBeComposted: false
  },
  {
    id: 'w-16',
    name: 'Pilas y Baterías usadas',
    category: 'no_aprovechable',
    categoryName: 'Residuo Peligroso / Especial (RAEE)',
    binColor: '#DC2626',
    badgeBg: 'bg-red-100 text-red-800 border-red-300',
    badgeText: 'Ánforas Municipales Especiales',
    disposalTip: 'NO TIRAR AL CAMIÓN. Llevar a los contenedores especiales en el Palacio Municipal (Jr. Deustua) o mercado Central.',
    collectionDays: 'Puntos de acopio permanente',
    canBeComposted: false
  },
  {
    id: 'w-17',
    name: 'Caja de pizza con grasa',
    category: 'no_aprovechable',
    categoryName: 'No Aprovechable',
    binColor: '#475569',
    badgeBg: 'bg-slate-200 text-slate-800 border-slate-400',
    badgeText: 'Bolsa Negra / Relleno Sanitario',
    disposalTip: 'La grasa y aceite impiden el reciclaje de la fibra de papel. Si la tapa superior está limpia y seca, puedes recortarla y reciclarla; la parte grasosa va al tacho negro.',
    collectionDays: 'Horario habitual de camión compactador',
    canBeComposted: false
  },
  {
    id: 'w-18',
    name: 'Ropa y calzado en desuso',
    category: 'inorganico',
    categoryName: 'Textil / Reutilización o Donación',
    binColor: '#2096d2',
    badgeBg: 'bg-[#2096d2]/10 text-[#004173] border-[#2096d2]/30',
    badgeText: 'Donación / Campañas Especiales',
    disposalTip: 'Si las prendas están en buen estado, destínalas a donación solidaria en parroquias o albergues. Si están rotas o inservibles, entrégalas en campañas de reciclaje textil o en bolsa separada.',
    collectionDays: 'Puntos de acopio social y campañas municipales',
    canBeComposted: false
  },
  {
    id: 'w-19',
    name: 'Tapitas de plástico',
    category: 'inorganico',
    categoryName: 'Inorgánico Reciclable (Polipropileno)',
    binColor: '#2096d2',
    badgeBg: 'bg-[#2096d2]/10 text-[#004173] border-[#2096d2]/30',
    badgeText: 'Bolsa Celeste / Reciclable',
    disposalTip: 'Juntar las tapitas plásticas en una botella. Son un material plástico de alta densidad muy valorado por las asociaciones de recicladores formalizados y campañas de apoyo en salud.',
    collectionDays: 'Martes, Jueves y Sábado (Recicladores Sumac Ayni)',
    canBeComposted: false
  },
  {
    id: 'w-20',
    name: 'Servilletas usadas',
    category: 'no_aprovechable',
    categoryName: 'No Aprovechable',
    binColor: '#475569',
    badgeBg: 'bg-slate-200 text-slate-800 border-slate-400',
    badgeText: 'Bolsa Negra / Relleno Sanitario',
    disposalTip: 'Las servilletas usadas con restos de comida, salsas o grasa no son reciclables como papel seco. Deben disponerse en la bolsa negra para el camión recolector.',
    collectionDays: 'Horario habitual de camión compactador',
    canBeComposted: false
  },
  {
    id: 'w-21',
    name: 'Envase de yogur',
    category: 'inorganico',
    categoryName: 'Inorgánico Reciclable',
    binColor: '#2096d2',
    badgeBg: 'bg-[#2096d2]/10 text-[#004173] border-[#2096d2]/30',
    badgeText: 'Bolsa Celeste / Reciclable',
    disposalTip: 'Enjuagar con un poco de agua para retirar los residuos lácteos y escurrir antes de guardar en la bolsa de inorgánicos. Evita malos olores y facilita su revalorización.',
    collectionDays: 'Martes, Jueves y Sábado (Recicladores Sumac Ayni)',
    canBeComposted: false
  }
];

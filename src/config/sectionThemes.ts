import type React from 'react';

/**
 * Configuración de temas por sección.
 * Cada sección del proyecto tiene un acento cromático único y un fondo claro
 * del mismo tono para romper la monotonía visual y aportar anclaje semántico.
 *
 * Uso: aplicar la clase o el data-attribute al contenedor raíz de la sección.
 * Las variables CSS se resuelven automáticamente dentro del árbol.
 */

export type SectionThemeKey =
  | 'rutas'
  | 'segregacion'
  | 'reporta'
  | 'sumac-ayni'
  | 'compostaje';

export interface SectionTheme {
  /** Nombre legible del tema (para depuración) */
  name: string;
  /** Color principal de acento (títulos, badges, botones) */
  accent: string;
  /** Variante del acento más oscura (hover) */
  accentDark: string;
  /** Variante del acento muy clara (fondos de tarjetas) */
  accentSoft: string;
  /** Fondo principal de la sección */
  background: string;
  /** Color de texto sobre el fondo principal */
  textPrimary: string;
  /** Color de texto secundario */
  textSecondary: string;
}

export const SECTION_THEMES: Record<SectionThemeKey, SectionTheme> = {
  rutas: {
    name: 'Rutas de Recolección',
    accent: '#2096d2',       // Celeste institucional MPP
    accentDark: '#1a7fb3',
    accentSoft: '#E6F2FA',
    background: '#F0F7FC',   // Celeste muy claro
    textPrimary: '#004173',
    textSecondary: '#64748B',
  },
  segregacion: {
    name: 'Segregación en la Fuente',
    accent: '#15803D',       // Verde ecológico
    accentDark: '#126B33',
    accentSoft: '#F0FDF4',
    background: '#F0FDF4',   // Verde muy claro
    textPrimary: '#004173',
    textSecondary: '#64748B',
  },
  reporta: {
    name: 'Fiscalización Ciudadana',
    accent: '#2096d2',       // Dorado institucional
    accentDark: '#C28E15',
    accentSoft: '#FEF7E6',
    background: '#FFFBEB',   // Ámbar muy claro
    textPrimary: '#004173',
    textSecondary: '#64748B',
  },
  'sumac-ayni': {
    name: 'Campañas Ambientales',
    accent: '#2096d2',       // Dorado (sobre fondo oscuro)
    accentDark: '#C28E15',
    accentSoft: 'rgba(32, 150, 210, 0.15)',
    background: '#004173',   // Gradiente oscuro se aplica en el componente
    textPrimary: '#FFFFFF',
    textSecondary: '#CBD5E1',
  },
  compostaje: {
    name: 'Programa de Compostaje',
    accent: '#0D9488',       // Teal (diferencia de verde de segregación)
    accentDark: '#0A7668',
    accentSoft: '#F0FDFA',
    background: '#F0FDFA',   // Teal muy claro
    textPrimary: '#004173',
    textSecondary: '#64748B',
  },
};

/**
 * Aplica el tema al contenedor de una sección.
 * Retorna las variables CSS como objeto para usar en style={{}}.
 *
 * Ejemplo:
 *   <section style={getThemeStyles('rutas')}>
 */
export function getThemeStyles(themeKey: SectionThemeKey): React.CSSProperties {
  const theme = SECTION_THEMES[themeKey];
  return {
    '--section-accent': theme.accent,
    '--section-accent-dark': theme.accentDark,
    '--section-accent-soft': theme.accentSoft,
    '--section-bg': theme.background,
    '--section-text-primary': theme.textPrimary,
    '--section-text-secondary': theme.textSecondary,
  } as React.CSSProperties;
}

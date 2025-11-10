
// constants.ts
import { Settings } from './types';

/**
 * Lista de fuentes disponibles en el selector de fuentes.
 * Se corresponden con las fuentes importadas de Google Fonts en index.html.
 */
export const FONT_OPTIONS = [
    { value: 'font-arial', label: 'Arial' },
    { value: 'font-helvetica', label: 'Helvetica' },
    { value: 'font-times-new-roman', label: 'Times New Roman' },
    { value: 'font-georgia', label: 'Georgia' },
    { value: 'font-roboto', label: 'Roboto' },
    { value: 'font-montserrat', label: 'Montserrat' },
    { value: 'font-open-sans', label: 'Open Sans' },
    { value: 'font-lato', label: 'Lato' },
    { value: 'font-courier-new', label: 'Courier New' },
    { value: 'font-consolas', label: 'Consolas' },
    { value: 'font-orbitron', label: 'Orbitron (Cyberpunk)' },
    { value: 'font-rajdhani', label: 'Rajdhani (Cyberpunk)' },
    { value: 'font-share-tech-mono', label: 'Share Tech Mono' },
];

/**
 * Paletas de colores predefinidas para un acceso rápido.
 */
export const COLOR_PRESETS = {
  cyberpunk: {
    name: 'Cyberpunk',
    textColor: '#00fff9',
    backgroundColor: '#0d0221',
  },
  classic: {
    name: 'Clásico',
    textColor: '#ffffff',
    backgroundColor: '#000000',
  },
  soft: {
    name: 'Suave',
    textColor: '#333333',
    backgroundColor: '#f5f5dc',
  },
  highContrast: {
    name: 'Alto Contraste',
    textColor: '#ffff00',
    backgroundColor: '#000000',
  },
};

/**
 * Configuración inicial por defecto para el teleprompter.
 */
export const DEFAULT_SETTINGS: Settings = {
  theme: 'cyberpunk',
  fontFamily: 'font-orbitron',
  fontSize: 60,
  isBold: false,
  isItalic: false,
  isUnderline: false,
  textColor: '#00fff9',
  backgroundColor: '#0a0a0a',
  isMirrored: false,
  hasGlow: true,
};


// types.ts

/**
 * Define la estructura de las configuraciones de visualización del teleprompter.
 */
export interface Settings {
  theme: 'light' | 'dark' | 'cyberpunk';
  fontFamily: string;
  fontSize: number; // en px
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  textColor: string;
  backgroundColor: string;
  isMirrored: boolean;
  hasGlow: boolean;
}

/**
 * Define la estructura de un guion guardado.
 */
export interface Script {
  id: string;
  name:string;
  content: string;
  createdAt: number;
}

/**
 * Define el estado completo y las acciones disponibles en el contexto del teleprompter.
 */
export interface TeleprompterContextState {
  // Guion y contenido
  currentScript: string;
  savedScripts: Script[];

  // Configuraciones de visualización
  settings: Settings;
  
  // Controles del prompter
  isPlaying: boolean;
  scrollSpeed: number; // Multiplicador
  scrollPosition: number;
  
  // Acciones para modificar el estado
  setCurrentScript: (script: string) => void;
  saveCurrentScript: (name: string) => void;
  loadScript: (id: string) => void;
  deleteScript: (id: string) => void;
  
  updateSettings: (newSettings: Partial<Settings>) => void;
  
  togglePlay: () => void;
  setScrollSpeed: (speed: number) => void;
  resetScroll: () => void;
  setScrollPosition: (position: number) => void;
  
  // Nuevas acciones para presets
  saveSettingsPreset: (name: string) => void;
  loadSettingsPreset: (name: string) => void;
  deleteSettingsPreset: (name: string) => void;
  savedPresets: { name: string; settings: Settings }[];
}

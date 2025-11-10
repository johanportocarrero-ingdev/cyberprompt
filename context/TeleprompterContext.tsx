
import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { Settings, Script, TeleprompterContextState } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DEFAULT_SETTINGS } from '../constants';

// Creación del contexto con un valor inicial undefined
export const TeleprompterContext = createContext<TeleprompterContextState | undefined>(undefined);

// Props del proveedor del contexto
interface TeleprompterProviderProps {
  children: ReactNode;
}

// Proveedor del Contexto
export const TeleprompterProvider: React.FC<TeleprompterProviderProps> = ({ children }) => {
  // Estado para el script actual en el editor
  const [currentScript, setCurrentScript] = useState<string>('Bienvenido a Teleprompter Pro. Escribe o pega tu guion aquí.');
  
  // Estados para el control del prompter
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [scrollSpeed, setScrollSpeed] = useState<number>(1);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  // Estados persistentes en LocalStorage
  const [savedScripts, setSavedScripts] = useLocalStorage<Script[]>('teleprompter_scripts', []);
  const [settings, setSettings] = useLocalStorage<Settings>('teleprompter_settings', DEFAULT_SETTINGS);
  const [savedPresets, setSavedPresets] = useLocalStorage<{ name: string; settings: Settings }[]>('teleprompter_presets', []);

  // Función para actualizar las configuraciones
  const updateSettings = useCallback((newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, [setSettings]);

  // Controles de reproducción
  const togglePlay = useCallback(() => setIsPlaying(prev => !prev), []);
  const resetScroll = useCallback(() => {
    setScrollPosition(0);
    setIsPlaying(false);
  }, []);

  // Gestión de guiones
  const saveCurrentScript = useCallback((name: string) => {
    if (!name.trim()) {
      alert("Por favor, introduce un nombre para el guion.");
      return;
    }
    const newScript: Script = {
      id: `script_${Date.now()}`,
      name,
      content: currentScript,
      createdAt: Date.now(),
    };
    setSavedScripts(prev => [newScript, ...prev]);
  }, [currentScript, setSavedScripts]);

  const loadScript = useCallback((id: string) => {
    const scriptToLoad = savedScripts.find(s => s.id === id);
    if (scriptToLoad) {
      setCurrentScript(scriptToLoad.content);
    }
  }, [savedScripts]);

  const deleteScript = useCallback((id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este guion?")) {
      setSavedScripts(prev => prev.filter(s => s.id !== id));
    }
  }, [setSavedScripts]);

  // Gestión de presets de configuración
  const saveSettingsPreset = useCallback((name: string) => {
    if (!name.trim()) {
      alert("Por favor, introduce un nombre para el preset.");
      return;
    }
    const newPreset = { name, settings };
    setSavedPresets(prev => [...prev.filter(p => p.name !== name), newPreset]);
  }, [settings, setSavedPresets]);

  const loadSettingsPreset = useCallback((name: string) => {
    const preset = savedPresets.find(p => p.name === name);
    if (preset) {
      setSettings(preset.settings);
    }
  }, [savedPresets, setSettings]);

  const deleteSettingsPreset = useCallback((name: string) => {
     if (window.confirm("¿Estás seguro de que quieres eliminar este preset?")) {
      setSavedPresets(prev => prev.filter(p => p.name !== name));
    }
  }, [setSavedPresets]);

  // Valor del contexto que se pasará a los componentes hijos
  const contextValue: TeleprompterContextState = {
    currentScript,
    setCurrentScript,
    savedScripts,
    saveCurrentScript,
    loadScript,
    deleteScript,
    settings,
    updateSettings,
    isPlaying,
    togglePlay,
    scrollSpeed,
    setScrollSpeed,
    scrollPosition,
    setScrollPosition,
    resetScroll,
    saveSettingsPreset,
    loadSettingsPreset,
    deleteSettingsPreset,
    savedPresets,
  };

  return (
    <TeleprompterContext.Provider value={contextValue}>
      {children}
    </TeleprompterContext.Provider>
  );
};

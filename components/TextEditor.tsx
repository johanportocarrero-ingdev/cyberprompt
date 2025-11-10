
import React, { useContext, useMemo, useState } from 'react';
import { TeleprompterContext } from '../context/TeleprompterContext';
import { countWords, estimateReadingTime } from '../utils/textCalculator';
import SavedScripts from './SavedScripts';

/**
 * Componente editor de texto para que el usuario escriba y gestione sus guiones.
 */
const TextEditor: React.FC = () => {
    const context = useContext(TeleprompterContext);
    const [scriptName, setScriptName] = useState('');

    if (!context) {
        return <div>Cargando...</div>;
    }

    const { currentScript, setCurrentScript, saveCurrentScript } = context;

    // Calcula las estadísticas del texto usando useMemo para optimizar
    const stats = useMemo(() => {
        const words = countWords(currentScript);
        const time = estimateReadingTime(words);
        return { words, time };
    }, [currentScript]);

    // Manejador para guardar el guion
    const handleSave = () => {
        saveCurrentScript(scriptName);
        setScriptName(''); // Limpia el campo después de guardar
    };

    return (
        <div className="flex flex-col gap-4 p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
            <h2 className="text-xl font-bold font-rajdhani text-neon-pink cyberpunk:text-shadow-[0_0_5px_#ff10f0]">Editor de Guion</h2>
            
            {/* Área de texto para el guion */}
            <textarea
                value={currentScript}
                onChange={(e) => setCurrentScript(e.target.value)}
                placeholder="Escribe tu guion aquí..."
                className="w-full h-48 p-3 text-base bg-dark-bg-3 border border-neon-purple rounded-md focus:ring-2 focus:ring-neon-pink focus:outline-none resize-y text-white"
            />

            {/* Estadísticas del guion */}
            <div className="flex justify-between text-sm text-gray-300">
                <span>Palabras: <span className="font-bold text-neon-yellow">{stats.words}</span></span>
                <span>Tiempo estimado: <span className="font-bold text-neon-yellow">{stats.time}</span></span>
            </div>

            {/* Controles para guardar el guion */}
            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    value={scriptName}
                    onChange={(e) => setScriptName(e.target.value)}
                    placeholder="Nombre del guion"
                    className="flex-grow p-2 bg-dark-bg-3 border border-neon-purple rounded-md focus:ring-2 focus:ring-neon-pink focus:outline-none text-white"
                />
                <button
                    onClick={handleSave}
                    className="px-4 py-2 font-bold text-black bg-neon-green rounded-md hover:bg-white transition-all duration-300 cyberpunk:text-shadow-[0_0_8px_#39ff14] border border-neon-green hover:shadow-[0_0_15px_#39ff14]"
                >
                    Guardar Guion
                </button>
            </div>
            
            {/* Componente para mostrar guiones guardados */}
            <SavedScripts />
        </div>
    );
};

export default TextEditor;

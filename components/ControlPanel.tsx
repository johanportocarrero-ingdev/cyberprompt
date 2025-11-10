
import React, { useContext, useEffect, useCallback } from 'react';
import { TeleprompterContext } from '../context/TeleprompterContext';
import { Play, Pause, RotateCcw, Monitor, MonitorUp, Tv2 } from 'lucide-react';

/**
 * Panel de control con botones para manejar la reproducción del teleprompter.
 */
const ControlPanel: React.FC = () => {
    const context = useContext(TeleprompterContext);
    
    const [isFullscreen, setIsFullscreen] = React.useState(false);

    if (!context) return <div>Cargando...</div>;

    const { isPlaying, togglePlay, scrollSpeed, setScrollSpeed, resetScroll } = context;
    
    // Función para manejar el modo de pantalla completa
    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(err => {
                alert(`Error al intentar activar el modo de pantalla completa: ${err.message}`);
            });
        } else {
            document.exitFullscreen().then(() => setIsFullscreen(false));
        }
    }, []);

    // Escucha de eventos de teclado para atajos
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return; // No activar atajos si se está escribiendo en un input
            }
            e.preventDefault();
            switch (e.code) {
                case 'Space':
                    togglePlay();
                    break;
                case 'ArrowUp':
                    setScrollSpeed(Math.min(scrollSpeed + 0.1, 5));
                    break;
                case 'ArrowDown':
                    setScrollSpeed(Math.max(scrollSpeed - 0.1, 0.1));
                    break;
                case 'KeyR':
                    resetScroll();
                    break;
                case 'KeyF':
                    toggleFullscreen();
                    break;
            }
        };
        
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        window.addEventListener('keydown', handleKeyDown);
        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, [togglePlay, setScrollSpeed, scrollSpeed, resetScroll, toggleFullscreen]);

    return (
        <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
            <h2 className="text-xl font-bold font-rajdhani text-neon-pink cyberpunk:text-shadow-[0_0_5px_#ff10f0] mb-4">Controles</h2>
            <div className="flex flex-col gap-4">
                {/* Controles de Play/Pause y Reset */}
                <div className="flex items-center justify-center gap-4">
                    <button onClick={togglePlay} className="p-4 rounded-full bg-neon-cyan text-black hover:shadow-[0_0_20px_#00fff9] transition-all">
                        {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                    </button>
                     <button onClick={resetScroll} className="p-3 rounded-full bg-neon-orange text-black hover:shadow-[0_0_20px_#ff9e00] transition-all" title="Reiniciar (R)">
                        <RotateCcw size={24} />
                    </button>
                    <button onClick={toggleFullscreen} className="p-3 rounded-full bg-neon-purple text-white hover:shadow-[0_0_20px_#8b00ff] transition-all" title="Pantalla Completa (F)">
                         {isFullscreen ? <MonitorUp size={24} /> : <Monitor size={24} />}
                    </button>
                </div>
                
                {/* Slider de velocidad */}
                <div className="flex flex-col">
                    <label htmlFor="speed" className="text-sm mb-1 text-center">
                        Velocidad: <span className="font-bold text-neon-yellow">{scrollSpeed.toFixed(1)}x</span>
                    </label>
                    <input
                        id="speed"
                        type="range"
                        min="0.1"
                        max="5"
                        step="0.1"
                        value={scrollSpeed}
                        onChange={(e) => setScrollSpeed(parseFloat(e.target.value))}
                        className="w-full h-2 bg-dark-bg-3 rounded-lg appearance-none cursor-pointer accent-neon-pink"
                    />
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;

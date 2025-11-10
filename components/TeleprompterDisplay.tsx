
import React, { useContext, useRef, useEffect, useCallback } from 'react';
import { TeleprompterContext } from '../context/TeleprompterContext';

/**
 * Componente que visualiza el texto del teleprompter y gestiona el scroll.
 */
const TeleprompterDisplay: React.FC = () => {
    const context = useContext(TeleprompterContext);
    const displayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const animationFrameId = useRef<number>(0);

    if (!context) return <div>Cargando...</div>;

    const { currentScript, settings, isPlaying, scrollSpeed, scrollPosition, setScrollPosition } = context;

    // Lógica de scroll suave usando requestAnimationFrame
    const scrollStep = useCallback(() => {
        if (!isPlaying || !displayRef.current || !contentRef.current) {
            cancelAnimationFrame(animationFrameId.current);
            return;
        }

        const displayHeight = displayRef.current.offsetHeight;
        const contentHeight = contentRef.current.offsetHeight;
        const maxScroll = contentHeight - displayHeight;
        
        if (maxScroll <= 0 || scrollPosition >= maxScroll) {
             // Detener al final del texto
            return;
        }

        // La velocidad de scroll se ajusta por el tamaño de la fuente y el multiplicador de velocidad
        const speedFactor = (settings.fontSize / 100) * scrollSpeed * 0.25;
        setScrollPosition(prev => Math.min(prev + speedFactor, maxScroll));
        
        animationFrameId.current = requestAnimationFrame(scrollStep);
    }, [isPlaying, scrollSpeed, setScrollPosition, settings.fontSize, scrollPosition]);

    useEffect(() => {
        if (isPlaying) {
            animationFrameId.current = requestAnimationFrame(scrollStep);
        } else {
            cancelAnimationFrame(animationFrameId.current);
        }
        return () => cancelAnimationFrame(animationFrameId.current);
    }, [isPlaying, scrollStep]);

    // Aplica la posición de scroll al elemento
    useEffect(() => {
        if (displayRef.current) {
            displayRef.current.scrollTop = scrollPosition;
        }
    }, [scrollPosition]);

    // Estilos dinámicos para el texto
    const textStyle: React.CSSProperties = {
        fontSize: `${settings.fontSize}px`,
        fontWeight: settings.isBold ? 'bold' : 'normal',
        fontStyle: settings.isItalic ? 'italic' : 'normal',
        textDecoration: settings.isUnderline ? 'underline' : 'none',
        color: settings.textColor,
        ...(settings.hasGlow && settings.theme === 'cyberpunk' && {
            textShadow: `0 0 8px ${settings.textColor}, 0 0 10px ${settings.textColor}`
        })
    };
    
    // Clases dinámicas para el contenedor principal
    const displayClasses = `h-full w-full overflow-hidden flex justify-center items-start p-16 ${settings.isMirrored ? 'transform scale-x-[-1]' : ''}`;

    return (
        <div ref={displayRef} style={{ backgroundColor: settings.backgroundColor }} className={displayClasses}>
            <div ref={contentRef} className={`w-full max-w-4xl text-center leading-tight ${settings.fontFamily}`} style={textStyle}>
                {/* Dividimos el texto en párrafos para un mejor renderizado */}
                {currentScript.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph || ' '}</p>
                ))}
            </div>
        </div>
    );
};

export default TeleprompterDisplay;

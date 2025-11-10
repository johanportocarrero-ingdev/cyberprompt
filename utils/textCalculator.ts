
/**
 * Calcula el número de palabras en un texto dado.
 * @param text El texto a analizar.
 * @returns El número total de palabras.
 */
export const countWords = (text: string): number => {
    if (!text) return 0;
    // Utiliza una expresión regular para encontrar secuencias de caracteres que no son espacios en blanco.
    const words = text.match(/\S+/g);
    return words ? words.length : 0;
};

/**
 * Estima el tiempo de lectura de un texto basado en un número de palabras por minuto.
 * @param wordCount El número de palabras.
 * @param wpm Palabras por minuto (por defecto 180, un promedio para lectura en voz alta).
 * @returns Una cadena de texto formateada con el tiempo estimado (ej: "1 min 30 seg").
 */
export const estimateReadingTime = (wordCount: number, wpm: number = 180): string => {
    if (wordCount === 0) return "0 seg";

    const minutes = wordCount / wpm;
    const totalSeconds = Math.round(minutes * 60);

    if (totalSeconds < 60) {
        return `${totalSeconds} seg`;
    }

    const finalMinutes = Math.floor(totalSeconds / 60);
    const finalSeconds = totalSeconds % 60;

    return `${finalMinutes} min ${finalSeconds} seg`;
};

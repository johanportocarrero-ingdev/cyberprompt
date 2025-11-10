// Fix: Import React to make the 'React' namespace available for type annotations.
import React, { useState, useEffect } from 'react';

/**
 * Un hook personalizado para sincronizar el estado de React con LocalStorage.
 * @param key La clave bajo la cual se guardará el valor en LocalStorage.
 * @param initialValue El valor inicial a usar si no hay nada en LocalStorage.
 * @returns Un par [storedValue, setValue] similar a `useState`.
 */
export function useLocalStorage<T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  // Obtenemos el valor inicial de LocalStorage o usamos el valor inicial proporcionado.
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Usamos useEffect para actualizar LocalStorage cada vez que el estado cambia.
  useEffect(() => {
    try {
      const valueToStore = JSON.stringify(storedValue);
      window.localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

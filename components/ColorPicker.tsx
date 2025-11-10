
import React, { useState, useRef, useEffect } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
  presets?: { name: string; color: string }[];
}

/**
 * Componente de selector de color con un popover.
 */
const ColorPicker: React.FC<ColorPickerProps> = ({ label, color, onChange, presets }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Cierra el popover si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full">
      <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      <div
        className="w-full h-10 p-2 border border-neon-purple rounded-md cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-mono">{color}</span>
        <div className="w-6 h-6 rounded" style={{ backgroundColor: color }}></div>
      </div>

      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute z-10 mt-2 p-4 bg-dark-bg-3 border border-neon-purple rounded-lg shadow-2xl"
        >
          <HexColorPicker color={color} onChange={onChange} />
          <HexColorInput
            color={color}
            onChange={onChange}
            className="w-full mt-4 p-2 bg-dark-bg-1 border border-neon-purple rounded-md text-white font-mono"
          />
          {presets && (
            <div className="mt-4">
              <p className="text-xs text-gray-400 mb-2">Presets:</p>
              <div className="flex flex-wrap gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.name}
                    title={preset.name}
                    className="w-6 h-6 rounded-full border-2 border-transparent hover:border-white"
                    style={{ backgroundColor: preset.color }}
                    onClick={() => onChange(preset.color)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;

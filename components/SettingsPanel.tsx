
import React, { useContext, useState } from 'react';
import { TeleprompterContext } from '../context/TeleprompterContext';
import { FONT_OPTIONS, COLOR_PRESETS } from '../constants';
import ColorPicker from './ColorPicker';
import { Settings, Droplet, Type, Bold, Italic, Underline, Sun, Moon, Zap, FlipHorizontal, Sparkles } from 'lucide-react';

const SettingsPanel: React.FC = () => {
    const context = useContext(TeleprompterContext);
    const [presetName, setPresetName] = useState('');
    const [isPanelOpen, setIsPanelOpen] = useState(true);

    if (!context) return <div>Cargando...</div>;

    const { settings, updateSettings, saveSettingsPreset, loadSettingsPreset, deleteSettingsPreset, savedPresets } = context;

    const colorPickerPresets = [
        { name: 'Cyan', color: '#00fff9' },
        { name: 'Magenta', color: '#ff006e' },
        { name: 'Yellow', color: '#ffff00' },
        { name: 'White', color: '#ffffff' },
        { name: 'Black', color: '#000000' },
    ];
    
    return (
        <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
            <button onClick={() => setIsPanelOpen(!isPanelOpen)} className="w-full flex items-center justify-between text-xl font-bold font-rajdhani text-neon-pink cyberpunk:text-shadow-[0_0_5px_#ff10f0] mb-2">
                <span><Settings className="inline-block mr-2" />Configuración</span>
                <span>{isPanelOpen ? '−' : '+'}</span>
            </button>
            {isPanelOpen && (
            <div className="flex flex-col gap-4">
                {/* Theme Selector */}
                <div>
                    <h3 className="text-md font-semibold mb-2">Tema</h3>
                    <div className="grid grid-cols-3 gap-2">
                        <button onClick={() => updateSettings({ theme: 'light' })} className={`p-2 rounded-md border-2 ${settings.theme === 'light' ? 'border-neon-cyan' : 'border-transparent'} bg-gray-200 text-black`}><Sun className="mx-auto"/> Light</button>
                        <button onClick={() => updateSettings({ theme: 'dark' })} className={`p-2 rounded-md border-2 ${settings.theme === 'dark' ? 'border-neon-cyan' : 'border-transparent'} bg-gray-800 text-white`}><Moon className="mx-auto"/> Dark</button>
                        <button onClick={() => updateSettings({ theme: 'cyberpunk' })} className={`p-2 rounded-md border-2 ${settings.theme === 'cyberpunk' ? 'border-neon-cyan' : 'border-transparent'} bg-dark-bg-2 text-neon-cyan`}><Zap className="mx-auto"/> Cyber</button>
                    </div>
                </div>

                {/* Font and Size */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="fontFamily" className="text-sm font-medium"><Type className="inline-block h-4 w-4"/> Fuente</label>
                        <select id="fontFamily" value={settings.fontFamily} onChange={(e) => updateSettings({fontFamily: e.target.value})} className="mt-1 w-full p-2 bg-dark-bg-3 border border-neon-purple rounded-md focus:ring-2 focus:ring-neon-pink focus:outline-none text-white">
                            {FONT_OPTIONS.map(font => <option key={font.value} value={font.value}>{font.label}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="fontSize" className="text-sm font-medium">Tamaño ({settings.fontSize}px)</label>
                        <input id="fontSize" type="range" min="12" max="150" value={settings.fontSize} onChange={(e) => updateSettings({fontSize: parseInt(e.target.value)})} className="mt-2 w-full h-2 bg-dark-bg-3 rounded-lg appearance-none cursor-pointer accent-neon-pink"/>
                    </div>
                </div>

                {/* Text Style and Effects */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-sm font-medium mb-2">Estilo de Texto</h3>
                        <div className="flex gap-2">
                            <button onClick={() => updateSettings({isBold: !settings.isBold})} className={`p-2 rounded-md border ${settings.isBold ? 'bg-neon-cyan text-black' : 'border-neon-purple'}`}><Bold/></button>
                            <button onClick={() => updateSettings({isItalic: !settings.isItalic})} className={`p-2 rounded-md border ${settings.isItalic ? 'bg-neon-cyan text-black' : 'border-neon-purple'}`}><Italic/></button>
                            <button onClick={() => updateSettings({isUnderline: !settings.isUnderline})} className={`p-2 rounded-md border ${settings.isUnderline ? 'bg-neon-cyan text-black' : 'border-neon-purple'}`}><Underline/></button>
                        </div>
                    </div>
                     <div>
                        <h3 className="text-sm font-medium mb-2">Efectos Visuales</h3>
                        <div className="flex gap-2">
                            <button onClick={() => updateSettings({isMirrored: !settings.isMirrored})} className={`p-2 rounded-md border ${settings.isMirrored ? 'bg-neon-cyan text-black' : 'border-neon-purple'}`} title="Modo Espejo"><FlipHorizontal/></button>
                            <button onClick={() => updateSettings({hasGlow: !settings.hasGlow})} className={`p-2 rounded-md border ${settings.hasGlow ? 'bg-neon-cyan text-black' : 'border-neon-purple'}`} title="Efecto Neón Glow"><Sparkles/></button>
                        </div>
                    </div>
                </div>

                {/* Color Pickers */}
                <div className="grid grid-cols-2 gap-4">
                    <ColorPicker label="Color de Texto" color={settings.textColor} onChange={color => updateSettings({textColor: color})} presets={colorPickerPresets}/>
                    <ColorPicker label="Color de Fondo" color={settings.backgroundColor} onChange={color => updateSettings({backgroundColor: color})} presets={colorPickerPresets}/>
                </div>
            </div>
            )}
        </div>
    );
};

export default SettingsPanel;

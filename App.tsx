
import React, { useContext } from 'react';
import TextEditor from './components/TextEditor';
import TeleprompterDisplay from './components/TeleprompterDisplay';
import ControlPanel from './components/ControlPanel';
import SettingsPanel from './components/SettingsPanel';
import { TeleprompterProvider, TeleprompterContext } from './context/TeleprompterContext';

// Componente para manejar el tema y las clases de fondo
const AppContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const context = useContext(TeleprompterContext);
    if (!context) return null;
    const { settings } = context;

    // Determina las clases de fondo basadas en el tema
    const getThemeClasses = () => {
        switch (settings.theme) {
            case 'light':
                return 'bg-gray-100 text-black';
            case 'cyberpunk':
                return 'theme-cyberpunk bg-dark-bg-2 text-gray-200';
            case 'dark':
            default:
                return 'bg-gray-900 text-white';
        }
    };
    
    // Agrega la clase 'dark' al <html> si el tema es oscuro o cyberpunk para que Tailwind lo reconozca
    React.useEffect(() => {
        const html = document.documentElement;
        if (settings.theme === 'dark' || settings.theme === 'cyberpunk') {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    }, [settings.theme]);

    return (
        <div className={`min-h-screen font-sans transition-colors duration-300 ${getThemeClasses()}`}>
            {children}
        </div>
    );
};

// Componente principal que estructura la aplicación
const App: React.FC = () => {
    return (
        <TeleprompterProvider>
            <AppContainer>
                <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
                    {/* Panel Izquierdo: Controles y Editor */}
                    <aside className="w-full lg:w-1/3 xl:w-1/4 h-1/2 lg:h-full flex flex-col p-4 gap-4 bg-black/20 shadow-lg overflow-y-auto">
                        <h1 className="text-2xl font-bold text-center font-orbitron text-neon-cyan cyberpunk:text-shadow-[0_0_8px_#00fff9]">Teleprompter PRO</h1>
                        <TextEditor />
                        <SettingsPanel />
                        <ControlPanel />
                    </aside>

                    {/* Panel Derecho: Visualizador del Teleprompter */}
                    <main className="w-full lg:w-2/3 xl:w-3/4 h-1/2 lg:h-full">
                        <TeleprompterDisplay />
                    </main>
                </div>
            </AppContainer>
        </TeleprompterProvider>
    );
};

export default App;

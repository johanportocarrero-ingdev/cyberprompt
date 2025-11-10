
import React, { useContext } from 'react';
import { TeleprompterContext } from '../context/TeleprompterContext';
import { Trash2, Download } from 'lucide-react';

/**
 * Componente que muestra la lista de guiones guardados y permite cargarlos o eliminarlos.
 */
const SavedScripts: React.FC = () => {
    const context = useContext(TeleprompterContext);

    if (!context) return null;

    const { savedScripts, loadScript, deleteScript } = context;

    return (
        <div className="mt-4">
            <h3 className="text-lg font-bold font-rajdhani text-neon-cyan mb-2">Guiones Guardados</h3>
            {savedScripts.length === 0 ? (
                <p className="text-sm text-gray-400">No hay guiones guardados.</p>
            ) : (
                <ul className="space-y-2 max-h-40 overflow-y-auto pr-2">
                    {savedScripts.map((script) => (
                        <li key={script.id} className="flex items-center justify-between p-2 rounded-md bg-dark-bg-3 border border-neon-purple/50">
                            <div className="flex-grow mr-2 overflow-hidden">
                                <p className="font-bold truncate text-white">{script.name}</p>
                                <p className="text-xs text-gray-400 truncate">{script.content}</p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <button onClick={() => loadScript(script.id)} title="Cargar guion" className="p-1 text-neon-green hover:text-white hover:shadow-[0_0_10px_#39ff14] rounded-full transition-all">
                                    <Download size={18} />
                                </button>
                                <button onClick={() => deleteScript(script.id)} title="Eliminar guion" className="p-1 text-neon-magenta hover:text-white hover:shadow-[0_0_10px_#ff006e] rounded-full transition-all">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SavedScripts;

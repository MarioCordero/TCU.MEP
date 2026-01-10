import { Module } from '../../types/cms';

interface Props {
  modules: Module[];
  selectedModule: Module | null;
  onSelect: (module: Module) => void;
}

export default function CMSSidebar({ modules, selectedModule, onSelect }: Props) {

  const renderModuleList = (grade: "10" | "11") => {
    const filtered = modules.filter(m => m.grade_level === grade);
    
    if (filtered.length === 0) return <p className="px-3 text-xs text-gray-400 italic">No hay módulos.</p>;

    return filtered.map(module => (
      <button
        key={module.id}
        onClick={() => onSelect(module)}
        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
          selectedModule?.id === module.id 
            ? 'bg-blue-100 text-blue-700 font-medium' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        {module.title}
      </button>
    ));
  };

  return (
    <aside className="w-80 bg-white border-r flex flex-col h-full">
      <div className="p-4 border-b bg-gray-50">
        <h1 className="text-xl font-bold text-slate-800">ChemMaster CMS</h1>
        <p className="text-xs text-gray-500">Gestor de Contenido</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-6">
        <div>
          <h3 className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Décimo Grado</h3>
          <div className="space-y-1">
            {renderModuleList("10")}
          </div>
        </div>

        <div>
          <h3 className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Undécimo Grado</h3>
          <div className="space-y-1">
            {renderModuleList("11")}
          </div>
        </div>
      </div>
    </aside>
  );
}
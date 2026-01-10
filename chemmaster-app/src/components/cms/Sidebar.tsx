import { Module } from '../../types/cms';

interface Props {
  modules: Module[];
  selectedModule: Module | null;
  onSelect: (module: Module) => void;
}

export default function CMSSidebar({ modules, selectedModule, onSelect }: Props) {

  const renderModuleList = (grade: "10" | "11") => {
    const filtered = modules.filter(m => m.grade_level === grade);
    
    if (filtered.length === 0) return <p className="px-3 py-2 text-xs text-gray-400 italic">No hay módulos.</p>;

    return filtered.map(module => (
      <button
        key={module.id}
        onClick={() => onSelect(module)}
        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
          selectedModule?.id === module.id 
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md scale-105' 
            : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
        }`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${selectedModule?.id === module.id ? 'bg-white' : 'bg-gray-300'}`} />
        {module.title}
      </button>
    ));
  };

  return (
    <aside className="w-80 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 flex flex-col h-full shadow-sm">
      <div className="p-5 border-b border-gray-200 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">⚗</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">ChemMaster CMS</h1>
        </div>
        <p className="text-xs text-gray-500 ml-10">Gestor de Contenido</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-7">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">📚</span>
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-widest">Décimo Grado</h3>
            <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{modules.filter(m => m.grade_level === "10").length}</span>
          </div>
          <div className="space-y-1.5">
            {renderModuleList("10")}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🔬</span>
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-widest">Undécimo Grado</h3>
            <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">{modules.filter(m => m.grade_level === "11").length}</span>
          </div>
          <div className="space-y-1.5">
            {renderModuleList("11")}
          </div>
        </div>
      </div>
    </aside>
  );
}
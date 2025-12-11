import { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { API } from '../lib/api';
import { Module, AllContentResponse } from '../types/cms';
import TopicEditor from './cms/TopicEditor'; // El componente que haremos en el Paso 2
import { Button } from '../components/ui/button'; // Usando tus componentes UI

export default function ChemMasterCMS() {
  const { data: cmsData, loading, error, request } = useApi<AllContentResponse>();
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  // Cargar datos al iniciar
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const result = await request(API.GetAllContent());
    // Si ya había un módulo seleccionado, intentamos actualizarlo con los datos nuevos
    if (selectedModule && result) {
      const updatedModule = result.modules.find(m => m.id === selectedModule.id);
      if (updatedModule) setSelectedModule(updatedModule);
    }
  };

  if (loading && !cmsData) return <div className="p-10 text-center text-xl">Cargando CMS... 🧪</div>;
  if (error) return <div className="p-10 text-red-600">Error Crítico: {error}</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* SIDEBAR: Lista de Módulos */}
      <aside className="w-80 bg-white border-r flex flex-col">
        <div className="p-4 border-b bg-gray-50">
          <h1 className="text-xl font-bold text-slate-800">ChemMaster CMS</h1>
          <p className="text-xs text-gray-500">Gestor de Contenido</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-6">
          {/* Grado 10 */}
          <div>
            <h3 className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Décimo Grado</h3>
            <div className="space-y-1">
              {cmsData?.modules.filter(m => m.grade_level === "10").map(module => (
                <button
                  key={module.id}
                  onClick={() => setSelectedModule(module)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedModule?.id === module.id 
                      ? 'bg-blue-100 text-blue-700 font-medium' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {module.title}
                </button>
              ))}
            </div>
          </div>

          {/* Grado 11 */}
          <div>
            <h3 className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Undécimo Grado</h3>
            <div className="space-y-1">
              {cmsData?.modules.filter(m => m.grade_level === "11").map(module => (
                <button
                  key={module.id}
                  onClick={() => setSelectedModule(module)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedModule?.id === module.id 
                      ? 'bg-blue-100 text-blue-700 font-medium' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {module.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT: Editor de Tópicos */}
      <main className="flex-1 overflow-y-auto p-8">
        {selectedModule ? (
          <div className="max-w-4xl mx-auto">
            {/* Cabecera del Módulo */}
            <div className="flex justify-between items-end mb-8 border-b pb-4">
              <div>
                <span className="text-sm font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  {selectedModule.slug}
                </span>
                <h2 className="text-3xl font-bold text-gray-800 mt-2">{selectedModule.title}</h2>
                <p className="text-gray-500">{selectedModule.description}</p>
              </div>
              <div className="text-right">
                 <Button variant="outline" onClick={() => loadData()}>🔄 Recargar</Button>
              </div>
            </div>

            {/* Aquí inyectamos el Editor de Tópicos */}
            <TopicEditor 
              moduleSlug={selectedModule.slug} 
              topics={selectedModule.topics || []}
              onUpdate={loadData} // Callback para recargar todo cuando cambie algo
            />

          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <p className="text-xl">⬅ Selecciona un módulo para editar su contenido</p>
          </div>
        )}
      </main>
    </div>
  );
}
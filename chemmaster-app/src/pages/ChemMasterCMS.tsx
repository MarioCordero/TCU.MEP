import { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { API } from '../lib/api';
import { Module, AllContentResponse } from '../types/cms';
import TopicEditor from '../components/cms/TopicEditor';
import CMSSidebar from '../components/cms/Sidebar';
import { Button } from '../components/ui/button';

export default function ChemMasterCMS() {
  const { data: cmsData, loading, error, request } = useApi<AllContentResponse>();
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const result = await request(API.GetAllContent());
    // Si ya había un módulo seleccionado, lo actualizamos con los datos nuevos para ver cambios reflejados
    if (selectedModule && result) {
      const updatedModule = result.modules.find(m => m.id === selectedModule.id);
      if (updatedModule) setSelectedModule(updatedModule);
    }
  };

  if (loading && !cmsData) return <div className="p-10 text-center text-xl">Cargando CMS... 🧪</div>;
  if (error) return <div className="p-10 text-red-600">Error Crítico: {error}</div>;

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      
      {/* 1. SIDEBAR SEPARADO */}
      <CMSSidebar 
        modules={cmsData?.modules || []} 
        selectedModule={selectedModule} 
        onSelect={setSelectedModule} 
      />

      {/* 2. MAIN CONTENT */}
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

            {/* Editor de Temas */}
            <TopicEditor 
              moduleSlug={selectedModule.slug} 
              topics={selectedModule.topics || []}
              onUpdate={loadData}
            />
          </div>
        ) : (
          /* Estado Vacío */
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <p className="text-xl">⬅ Selecciona un módulo para editar su contenido</p>
          </div>
        )}
      </main>
    </div>
  );
}
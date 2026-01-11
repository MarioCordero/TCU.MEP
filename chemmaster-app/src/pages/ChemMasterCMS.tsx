import { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { API } from '../lib/api';
import { Module, AllContentResponse } from '../types/cms';
import TopicEditor from '../components/cms/TopicEditor';
import { CMSModuleEditor } from '../components/cms/ModuleEditor';
import CMSSidebar from '../components/cms/Sidebar';

export default function ChemMasterCMS() {
  const { data: cmsData, loading, error, request } = useApi<AllContentResponse>();
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const result = await request(API.GetAllContent());
    if (selectedModule && result) {
      const updatedModule = result.modules.find(m => m.id === selectedModule.id);
      if (updatedModule) setSelectedModule(updatedModule);
    }
  };

  if (loading && !cmsData) return <div className="p-10 text-center text-xl">Cargando CMS... 🧪</div>;
  if (error) return <div className="p-10 text-red-600">Error Crítico: {error}</div>;

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      
      <CMSSidebar 
        modules={cmsData?.modules || []} 
        selectedModule={selectedModule} 
        onSelect={setSelectedModule} 
      />

      <main className="flex-1 overflow-y-auto">
        {selectedModule ? (
          <div className="space-y-8">
            {/* Module Editor */}
            <CMSModuleEditor 
              module={selectedModule}
              onSave={(updatedModule) => {
                setSelectedModule(updatedModule);
                loadData();
              }}
            />

            {/* Topic Editor */}
            <div className="border-t pt-8">
              <TopicEditor 
                moduleSlug={selectedModule.slug} 
                topics={selectedModule.topics || []}
                onUpdate={loadData}
              />
            </div>
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
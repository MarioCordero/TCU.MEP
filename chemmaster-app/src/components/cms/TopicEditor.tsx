import { useState } from 'react';
import { API } from '../../lib/api';
import { Topic } from '../../types/cms';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';

interface Props {
  moduleSlug: string;
  topics: Topic[];
  onUpdate: () => void; // Función para avisarle al padre que recargue
}

export default function TopicEditor({ moduleSlug, topics, onUpdate }: Props) {
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  // --- DELETE ---
  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Seguro que quieres borrar este tema?")) return;
    
    setIsDeleting(id);
    try {
      await API.DeleteTopic(id);
      onUpdate(); // Recargar datos
    } catch (error) {
      alert("Error al borrar: " + error);
    } finally {
      setIsDeleting(null);
    }
  };

  // --- ADD RÁPIDO (Para probar) ---
  const handleAddQuick = async () => {
    const title = prompt("Título del nuevo tema:");
    if (!title) return;

    try {
      await API.AddTopic({
        module_slug: moduleSlug,
        title: title,
        content: "<p>Contenido inicial...</p>",
        order_in_module: topics.length + 1
      });
      onUpdate();
    } catch (error) {
      alert("Error al crear: " + error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-700">Temas ({topics.length})</h3>
        <Button onClick={handleAddQuick} className="bg-green-600 hover:bg-green-700 text-white">
          + Agregar Tema Rápido
        </Button>
      </div>

      <div className="grid gap-4">
        {topics.length === 0 && (
          <p className="text-gray-500 italic">No hay temas en este módulo todavía.</p>
        )}

        {topics.map((topic) => (
          <Card key={topic.id} className="p-4 flex justify-between items-center bg-white shadow-sm hover:shadow-md transition">
            <div className="flex gap-4 items-center">
              <div className="bg-gray-100 w-8 h-8 flex items-center justify-center rounded-full font-bold text-gray-600">
                {topic.order_in_module}
              </div>
              <div>
                <h4 className="font-semibold text-lg">{topic.title}</h4>
                <div className="text-xs text-gray-400 mt-1 flex gap-2">
                   <span>ID: {topic.id}</span>
                   <span>•</span>
                   <span className="truncate max-w-[300px]">
                     {topic.content.substring(0, 50).replace(/<[^>]*>?/gm, '')}...
                   </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => alert(`Aquí abriríamos el Modal de Edición para el ID: ${topic.id}`)}
              >
                Editar
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                disabled={isDeleting === topic.id}
                onClick={() => handleDelete(topic.id)}
              >
                {isDeleting === topic.id ? '...' : 'Borrar'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
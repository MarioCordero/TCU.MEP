import React, { useState } from "react";

type Module = {
  id: number;
  title: string;
  content: string;
};

type GradeLevel = "grade-10" | "grade-11";

const initialModules: Record<GradeLevel, Module[]> = {
  "grade-10": [],
  "grade-11": [],
};

const ChemMasterCMS = () => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>("grade-10");
  const [modules, setModules] = useState(initialModules);
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [newModuleContent, setNewModuleContent] = useState("");

  // Add new module
  const handleAddModule = () => {
    if (!newModuleTitle.trim()) return;
    const newModule: Module = {
      id: Date.now(),
      title: newModuleTitle,
      content: newModuleContent,
    };
    setModules((prev) => ({
      ...prev,
      [selectedGrade]: [...prev[selectedGrade], newModule],
    }));
    setNewModuleTitle("");
    setNewModuleContent("");
  };

  // Edit module
  const handleEditModule = (module: Module) => {
    setEditingModule(module);
    setNewModuleTitle(module.title);
    setNewModuleContent(module.content);
  };

  // Save edited module
  const handleSaveEdit = () => {
    if (!editingModule) return;
    setModules((prev) => ({
      ...prev,
      [selectedGrade]: prev[selectedGrade].map((mod) =>
        mod.id === editingModule.id
          ? { ...mod, title: newModuleTitle, content: newModuleContent }
          : mod
      ),
    }));
    setEditingModule(null);
    setNewModuleTitle("");
    setNewModuleContent("");
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingModule(null);
    setNewModuleTitle("");
    setNewModuleContent("");
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">ChemMaster CMS</h1>
      <div className="mb-4">
        <label className="mr-2">Select Grade:</label>
        <select
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value as GradeLevel)}
          className="border px-2 py-1"
        >
          <option value="grade-10">Grade 10</option>
          <option value="grade-11">Grade 11</option>
        </select>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {editingModule ? "Edit Module" : "Add Module"}
        </h2>
        <input
          type="text"
          placeholder="Module Title"
          value={newModuleTitle}
          onChange={(e) => setNewModuleTitle(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="text"
          placeholder="Module Content"
          value={newModuleContent}
          onChange={(e) => setNewModuleContent(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        {editingModule ? (
          <>
            <button
              onClick={handleSaveEdit}
              className="bg-blue-500 text-white px-3 py-1 mr-2"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-gray-300 px-3 py-1"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleAddModule}
            className="bg-green-500 text-white px-3 py-1"
          >
            Add
          </button>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Modules</h2>
        {modules[selectedGrade].length === 0 ? (
          <p>No modules yet.</p>
        ) : (
          <ul>
            {modules[selectedGrade].map((mod) => (
              <li key={mod.id} className="mb-2 border p-2 rounded">
                <strong>{mod.title}</strong>
                <p>{mod.content}</p>
                <button
                  onClick={() => handleEditModule(mod)}
                  className="bg-yellow-400 px-2 py-1 mr-2"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ChemMasterCMS;
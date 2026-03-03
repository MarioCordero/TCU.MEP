import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { MathEditorModal } from "./MathEditorModal";

interface MathBlockContextType {
  openEditor: (blockId: string, equation: string, onSave: (eq: string) => void) => void;
  closeEditor: () => void;
}

interface MathEditorState {
  blockId: string;
  equation: string;
  onSave: (eq: string) => void;
}

const MathBlockContext = createContext<MathBlockContextType | null>(null);

export function useMathBlockEditor() {
  const ctx = useContext(MathBlockContext);
  if (!ctx) throw new Error("useMathBlockEditor must be used inside MathBlockProvider");
  return ctx;
}

export function MathBlockProvider({ children }: { children: ReactNode }) {
  const [editorState, setEditorState] = useState<MathEditorState | null>(null);

  const openEditor = useCallback((blockId: string, equation: string, onSave: (eq: string) => void) => {
    setEditorState({ blockId, equation, onSave });
  }, []);

  const closeEditor = useCallback(() => {
    setEditorState(null);
  }, []);

  return (
    <MathBlockContext.Provider value={{ openEditor, closeEditor }}>
      {children}
      {/* Modal rendered HERE — sibling to BlockNote, not inside it */}
      {editorState && (
        <MathEditorModal
          key={editorState.blockId}
          initialEquation={editorState.equation}
          onSave={(eq) => { editorState.onSave(eq); closeEditor(); }}
          onClose={closeEditor}
        />
      )}
    </MathBlockContext.Provider>
  );
}
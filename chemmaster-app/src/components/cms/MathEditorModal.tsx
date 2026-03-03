import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { InlineMath } from "react-katex";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import * as LucideIcons from "lucide-react";
import "katex/dist/katex.min.css";

const mathTemplates = [
  { label: "Fracción", template: "\\frac{a}{b}" },
  { label: "Raíz", template: "\\sqrt{x}" },
  { label: "Potencia x²", template: "x^{2}" },
  { label: "Subíndice x₂", template: "x_{2}" },
  { label: "Suma", template: "\\sum_{i=1}^{n}" },
  { label: "Integral", template: "\\int_{0}^{\\infty}" },
  { label: "H₂O", template: "H_{2}O" },
  { label: "CO₂", template: "CO_{2}" },
];

export function MathEditorModal({
  initialEquation,
  onSave,
  onClose,
}: {
  initialEquation: string;
  onSave: (eq: string) => void;
  onClose: () => void;
}) {
  const [equation, setEquation] = useState(initialEquation);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Safe to focus — this component is owned by MathBlockProvider, not BlockNote
    setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  const insertTemplate = (template: string) => {
    setEquation((prev) => prev + template);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      // Stop ALL events — nothing should reach TopicEditorModal's backdrop
      onMouseDown={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      onPointerUp={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 flex flex-col gap-4 border border-slate-200"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-700 flex items-center gap-2">
            <LucideIcons.Sigma className="h-5 w-5 text-blue-500" />
            Editor de Fórmula
          </span>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <LucideIcons.X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {mathTemplates.map((t, idx) => (
            <Button
              key={idx}
              variant="outline"
              size="sm"
              className="text-xs"
              onMouseDown={(e) => e.preventDefault()} // prevent focus loss
              onClick={() => insertTemplate(t.template)}
            >
              {t.label}
            </Button>
          ))}
        </div>

        <Input
          ref={inputRef}
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === "Enter") onSave(equation);
            if (e.key === "Escape") onClose();
          }}
          className="font-mono text-sm"
          placeholder="Escribe la fórmula LaTeX aquí..."
        />

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex justify-center items-center min-h-[60px]">
          <InlineMath math={equation || "\\text{preview vacío}"} />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button
            onClick={() => onSave(equation)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <LucideIcons.Check className="h-4 w-4 mr-1" />
            Guardar
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
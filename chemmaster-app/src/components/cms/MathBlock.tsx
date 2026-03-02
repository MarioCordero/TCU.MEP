import { useState } from "react";
import { createReactBlockSpec } from "@blocknote/react";
import { defaultProps } from "@blocknote/core";
import { InlineMath } from "react-katex";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import * as LucideIcons from "lucide-react";
import "katex/dist/katex.min.css";

const mathTemplates = [
  { label: "Fracción", template: "\\frac{a}{b}" },
  { label: "Raíz", template: "\\sqrt{x}" },
  { label: "Potencia", template: "x^{2}" },
  { label: "Subíndice", template: "x_{1}" },
  { label: "Suma", template: "\\sum_{i=1}^{n}" },
  { label: "Integral", template: "\\int_{0}^{\\infty}" },
];

export const MathBlock = createReactBlockSpec(
  {
    type: "math",
    propSchema: {
      ...defaultProps,
      equation: {
        default: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
      },
    },
    content: "none",
  },
  {
    render: (props) => {
      const [isEditing, setIsEditing] = useState(false);

      const insertTemplate = (template: string) => {
        const currentEq = props.block.props.equation;
        props.editor.updateBlock(props.block, {
          type: "math",
          props: { equation: currentEq + template },
        });
      };

      return (
        <div className="flex flex-col w-full my-4 border border-slate-200 rounded-lg overflow-hidden bg-white">
          {isEditing ? (
            <div className="p-4 bg-slate-50 flex flex-col gap-3 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Editor de Fórmula</span>
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                  <LucideIcons.Check className="h-4 w-4 text-green-600" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {mathTemplates.map((t, idx) => (
                  <Button 
                    key={idx} 
                    variant="outline" 
                    size="sm" 
                    className="text-xs py-1 h-auto"
                    onClick={() => insertTemplate(t.template)}
                  >
                    {t.label}
                  </Button>
                ))}
              </div>

              <Input
                value={props.block.props.equation}
                onChange={(e) =>
                  props.editor.updateBlock(props.block, {
                    type: "math",
                    props: { equation: e.target.value },
                  })
                }
                className="font-mono text-sm"
                placeholder="Escribe la fórmula aquí..."
                autoFocus
              />
            </div>
          ) : null}

          <div 
            className="p-6 flex justify-center items-center cursor-pointer hover:bg-slate-50 transition-colors min-h-[60px]"
            onClick={() => setIsEditing(true)}
            title="Haz clic para editar la fórmula"
          >
            <InlineMath math={props.block.props.equation || " "} />
          </div>
        </div>
      );
    },
  }
);
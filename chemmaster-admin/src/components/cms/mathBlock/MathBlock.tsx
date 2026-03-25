import { createReactBlockSpec } from "@blocknote/react";
import { defaultProps } from "@blocknote/core";
import { InlineMath } from "react-katex";
import * as LucideIcons from "lucide-react";
import "katex/dist/katex.min.css";
import { useMathBlockEditor } from "./MathBlockContext";

export const MathBlock = createReactBlockSpec(
  {
    type: "math",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
      backgroundColor: defaultProps.backgroundColor,
      equation: {
        default: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
      },
    },
    content: "none",
  },
  {
    render: (props) => {
      // ✅ State lives in Context — survives BlockNote remounts completely
      const { openEditor } = useMathBlockEditor();

      const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        openEditor(
          props.block.id,
          props.block.props.equation,
          (newEquation) => {
            props.editor.updateBlock(props.block, {
              props: { ...props.block.props, equation: newEquation },
            });
          }
        );
      };

      return (
        <div
          contentEditable={false}
          className="w-full my-2 p-6 flex justify-center items-center min-h-[60px] border border-slate-200 rounded-lg bg-white hover:bg-slate-50 cursor-pointer shadow-sm transition-colors group relative"
          onMouseDown={handleClick}
          title="Haz clic para editar la fórmula"
        >
          <InlineMath math={props.block.props.equation || " "} />
          <span className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <LucideIcons.Pencil className="h-3 w-3 text-slate-400" />
          </span>
        </div>
      );
    },
  }
);
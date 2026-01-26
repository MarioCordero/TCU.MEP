import React, { useEffect } from "react";
import { X, AlertTriangle, CheckCircle, Info, AlertCircle } from "lucide-react";
import { Button } from "./button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string; // Opcional ahora, porque a veces el diseño lo maneja diferente
  children?: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string; // Para controlar el ancho (ej: max-w-2xl)
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = "max-w-md",
}: ModalProps) {
  
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop con blur más intenso */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Contenedor con animación suave */}
      <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${maxWidth} overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200 border border-slate-100`}>
        
        {/* Header condicional (solo si pasas título explícito, útil para modales genéricos) */}
        {title && (
          <div className="px-6 py-4 border-b flex justify-between items-center bg-white">
            <h3 className="text-lg font-bold text-slate-800">{title}</h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
              <X size={20} />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-0">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 bg-slate-50 border-t flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 🎨 NUEVO DISEÑO: ALERT MODAL DE ALTO IMPACTO
// ==========================================

export function AlertModal({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  variant = "default" 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  message: React.ReactNode; 
  variant?: "default" | "destructive" | "success" | "warning";
}) {
  
  // Configuración de colores e iconos según variante
  const styles = {
    destructive: {
      icon: <AlertCircle className="h-10 w-10 text-red-600" />,
      bgIcon: "bg-red-100",
      button: "bg-red-600 hover:bg-red-700 text-white ring-red-200",
      titleColor: "text-red-700"
    },
    warning: {
      icon: <AlertTriangle className="h-10 w-10 text-amber-600" />,
      bgIcon: "bg-amber-100",
      button: "bg-amber-600 hover:bg-amber-700 text-white ring-amber-200",
      titleColor: "text-amber-700"
    },
    success: {
      icon: <CheckCircle className="h-10 w-10 text-emerald-600" />,
      bgIcon: "bg-emerald-100",
      button: "bg-emerald-600 hover:bg-emerald-700 text-white ring-emerald-200",
      titleColor: "text-emerald-700"
    },
    default: {
      icon: <Info className="h-10 w-10 text-blue-600" />,
      bgIcon: "bg-blue-100",
      button: "bg-blue-600 hover:bg-blue-700 text-white ring-blue-200",
      titleColor: "text-slate-800"
    }
  };

  const activeStyle = styles[variant] || styles.default;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 sm:p-8 flex flex-col items-center text-center">
        
        {/* 1. Icono circular grande */}
        <div className={`mx-auto flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full ${activeStyle.bgIcon} mb-6 ring-8 ring-white shadow-lg`}>
          {activeStyle.icon}
        </div>

        {/* 2. Título Impactante */}
        <h3 className={`text-xl font-bold ${activeStyle.titleColor} mb-2`}>
          {title}
        </h3>

        {/* 3. Mensaje Legible */}
        <div className="mt-2 mb-6">
          <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
            {message}
          </p>
        </div>

        {/* 4. Botón de Acción Principal (Full Width) */}
        <div className="w-full">
            <Button 
                onClick={onClose} 
                className={`w-full py-6 text-base font-semibold shadow-md transition-all active:scale-95 ${activeStyle.button}`}
            >
                Entendido, gracias
            </Button>
        </div>

      </div>
    </Modal>
  );
}
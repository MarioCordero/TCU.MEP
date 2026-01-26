import React, { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: "default" | "destructive";
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  variant = "default",
}: ModalProps) {
  
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop (Fondo oscuro) */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Contenedor del Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className={`px-6 py-4 border-b flex justify-between items-center ${variant === 'destructive' ? 'bg-red-50' : 'bg-gray-50'}`}>
          <div>
            <h3 className={`text-lg font-bold ${variant === 'destructive' ? 'text-red-700' : 'text-gray-900'}`}>
              {title}
            </h3>
            {description && (
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full p-1 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 text-gray-700">
          {children}
        </div>

        {/* Footer (Opcional) */}
        {footer && (
          <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// Sub-componente rápido para "Alertas simples" (reemplazo directo de window.alert)
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
  variant?: "default" | "destructive" 
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      variant={variant}
      footer={
        <Button onClick={onClose} variant={variant === "destructive" ? "destructive" : "default"}>
          Entendido
        </Button>
      }
    >
      <p className="text-sm text-gray-600">{message}</p>
    </Modal>
  );
}
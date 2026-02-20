import React from "react";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import * as LucideIcons from "lucide-react";

export type IconModalProps = {
  show: boolean;
  onClose: () => void;
  currentIcon: string;
  onIconChange: (iconName: string) => void;
};

export function IconModal({ show, onClose, currentIcon, onIconChange }: IconModalProps) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Selecciona un icono</h2>
          <Button variant="ghost" onClick={onClose}>
            <LucideIcons.X className="h-5 w-5" />
          </Button>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            Busca y copia el nombre del icono en{" "}
            <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              lucide.dev/icons
            </a>{" "}
            y pégalo abajo.
          </p>
          <iframe src="https://lucide.dev/icons/" title="Lucide Icon Browser" className="w-full h-96 border rounded" />
        </div>
        <div className="mt-4">
          <Label htmlFor="iconName" className="mb-1 block">Nombre del icono</Label>
          <div className="flex gap-2">
            <Input id="iconName" value={currentIcon} onChange={(e) => onIconChange(e.target.value)} placeholder="Ejemplo: BookOpen" autoFocus />
            <Button type="button" variant="outline" onClick={async () => {}} title="Pegar nombre del icono">
              <LucideIcons.ClipboardPaste className="h-4 w-4" />
            </Button>
          </div>
          <Button className="bg-black text-white block w-1/4 m-auto mt-2.5" onClick={onClose}>Usar este icono</Button>
        </div>
      </div>
    </div>
  );
}

export type ConfirmModalProps = {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  password: string;
  onPasswordChange: (value: string) => void;
};

export function ConfirmModal({ show, onClose, onConfirm, password, onPasswordChange }: ConfirmModalProps) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">Confirmar guardado</h2>
        <p className="mb-4 text-gray-700">Por favor, ingresa tu contraseña para confirmar el guardado del módulo.</p>
        <Input type="password" placeholder="Contraseña" value={password} onChange={(e) => onPasswordChange(e.target.value)} className="mb-4" />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button variant="black" onClick={onConfirm}>Confirmar</Button>
        </div>
      </div>
    </div>
  );
}

export type SuccessModalProps = {
  show: boolean;
  onClose: () => void;
};

export function SuccessModal({ show, onClose }: SuccessModalProps) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
        <h2 className="text-lg font-bold mb-4 text-green-700">¡Guardado exitoso!</h2>
        <p className="mb-4 text-gray-700">El módulo y los tópicos fueron actualizados correctamente.</p>
        <Button variant="black" onClick={onClose} className="mx-auto">Cerrar</Button>
      </div>
    </div>
  );
}
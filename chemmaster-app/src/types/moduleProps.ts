import { Module } from './cms'

export type { Module } from './cms'

export interface AddModuleModalProps {
  show: boolean
  onClose: () => void
  onModuleAdded: (module: Module) => void
}
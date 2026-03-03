export interface SuccessModalProps {
  show: boolean
  onClose: () => void
  title?: string
  message?: string
}

export interface ConfirmSaveModalProps {
  show: boolean
  onClose: () => void
  onConfirm: (password: string) => void
  title?: string
  description?: string
  hint?: string
  successTitle?: string
  successMessage?: string
}
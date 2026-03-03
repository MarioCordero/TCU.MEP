export interface IconPickerModalProps {
  show: boolean
  onClose: () => void
  currentIcon: string
  onIconChange: (icon: string) => void
}
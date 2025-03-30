export interface LogoutConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onLogout: () => void
  userInitial?: string
}
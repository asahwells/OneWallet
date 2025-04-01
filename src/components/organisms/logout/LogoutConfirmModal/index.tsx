"use client"

import type React from "react"
import { Avatar } from "@chakra-ui/react"
import ConfirmationModal from "components/molecules/modals/ConfirmModal"
import { LogoutConfirmationModalProps } from "../interfaces"

const LogoutConfirmationModal: React.FC<LogoutConfirmationModalProps> = ({
  isOpen,
  onClose,
  onLogout,
  userInitial = "E",
}) => {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      title="Are You Sure?"
      primaryButtonText="Go Back"
      secondaryButtonText="Logout"
      onPrimaryAction={onClose}
      onSecondaryAction={onLogout}
      secondaryButtonIcon={<Avatar size="sm" name={userInitial} bg="blue.500" color="white" fontSize="md" />}
    />
  )
}

export default LogoutConfirmationModal


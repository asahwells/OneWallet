import { ModalContentProps } from "@chakra-ui/react";

export interface IForgotPasswordModalProps extends ModalContentProps {
    isOpen: boolean,
    onClose: () => void
  }

  export interface IUpdateUserModalProps extends ModalContentProps {
    isOpen: boolean,
    onClose: () => void,
    height: string,
    title?: string,
    title2?: string,
    onConfirm?: () => void
  }
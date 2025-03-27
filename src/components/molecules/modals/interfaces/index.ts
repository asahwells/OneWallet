import { ModalContentProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface IForgotPasswordModalProps extends ModalContentProps {
    isOpen: boolean,
    onClose: () => void
  }

  export interface IUpdateUserModalProps extends ModalContentProps {
    isOpen: boolean,
    onClose?: () => void,
    height: string,
    title?: string,
    title2?: string,
    onConfirm?: () => void
  }
  
  export interface INotificationModalProps {
    brandName?: string,
    modalWidth: string[] | string,
    cancelTextC?: string,
    titleC?: string,
    acceptTextC?: string,
    isOpen: boolean;
    onClose?: () => void;
    icon: ReactNode;
    hasAllow: boolean;
    title: string;
    cancelText: string;
    acceptText: string;
    onYesClick: () => void;
    onNoClick: () => void;
  }
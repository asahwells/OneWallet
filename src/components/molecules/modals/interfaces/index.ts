import {ModalContentProps, TextProps} from "@chakra-ui/react";
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
  
  export interface INotificationModalProps extends ModalContentProps {
    isOpen: boolean;
    onClose?: () => void;
    icon: ReactNode;
    cancelText: string;
    acceptText: string;
    onYesClick: () => void;
    onNoClick: () => void;
    textStyles?: TextProps
    titleText: ReactNode
  }

  export interface OtpVerificationModalProps extends ModalContentProps {
    isOpen: boolean;
    count: number;
    textTitle: React.ReactNode,
    textLable?: React.ReactNode,
    buttonText?: string;
    onClose?: () => void;
    handleClick: () => void;
  }
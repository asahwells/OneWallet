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
    title3?: string,
    warning?: boolean,
    onConfirm?: () => void
  }
  
  export interface INotificationModalProps extends ModalContentProps {
    isOpen: boolean;
    onClose?: () => void;
    icon?: ReactNode;
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

export interface ErrorModalProps extends ModalContentProps {
  isOpen: boolean;
  onClose: () => void;
  errorMessage?: string;
}

export interface ChooseVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChooseCamera: () => void;    // Callback when user chooses camera
  onChooseUpload: () => void;    // Callback when user chooses upload
}


export type VerificationStatus = 'PENDING' | 'FAIL' | 'SUCCESS';

export interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: VerificationStatus;
  onPrimaryAction?: () => void;
}

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subTitle?: string; 
  color?: string;
  border?: string
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  icon?: ReactNode; 
  primaryButtonIcon?: ReactNode; 
  secondaryButtonIcon?: ReactNode; 
  rest?: ModalContentProps; 
  textStyles?: TextProps; 
}
import {InputProps} from "@chakra-ui/input";
import { ModalProps, SelectProps, TextareaProps } from "@chakra-ui/react";

export interface IInputProps extends InputProps{
    icon?: React.ReactNode,
    errorMessage?: any
  }


export interface IPasswordInputProps extends IInputProps {
  
}

export interface ISelectInputProps extends SelectProps {
  options: string[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface IDateInputProps {
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface ITextareaProps extends TextareaProps{
  icon?: React.ReactNode
  errorMessage?: string;
}

export interface ConfirmationModalProps extends Omit<ModalProps, "children"> {
  isOpen: boolean
  onClose: () => void
  title: string
  primaryButtonText: string
  secondaryButtonText: string
  onPrimaryAction: () => void
  onSecondaryAction: () => void
  icon?: React.ReactNode
  primaryButtonIcon?: React.ReactNode
  secondaryButtonIcon?: React.ReactNode
}
import {InputProps} from "@chakra-ui/input";
import { SelectProps, TextareaProps } from "@chakra-ui/react";

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
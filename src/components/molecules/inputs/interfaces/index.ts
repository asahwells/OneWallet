import {InputProps} from "@chakra-ui/input";
import { SelectProps, TextareaProps, PinInput as ChakraPinInput, PinInputField } from "@chakra-ui/react";

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


export interface IPinInputProps extends Omit<React.ComponentProps<typeof ChakraPinInput>, 'children'> {
  count?: number;
  inputProps?: React.ComponentProps<typeof PinInputField>;
}

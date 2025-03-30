import {InputProps} from "@chakra-ui/input";
import { SelectProps, TextareaProps, PinInput as ChakraPinInput, PinInputField, FormControlProps } from "@chakra-ui/react";
import {ChangeEventHandler} from "react";

export interface IInputProps extends InputProps{
    icon?: React.ReactNode,
    errorMessage?: any
  }


export interface IPasswordInputProps extends IInputProps {
  
}

export interface ISelectInputProps extends SelectProps {
  options: Array<{ label: string; value: string }>;
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
interface IOption {
  label: string;
  value: string;
}

export interface IConditionalLabelSelectProps extends FormControlProps {
  label: string;
  options: IOption[];
  value?: string;
}

export interface CustomDateInputProps {
  value?: string;
  onClick?: () => void;
}


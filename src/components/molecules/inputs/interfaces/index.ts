import {InputProps} from "@chakra-ui/input";
import {FormControlProps, SelectProps, TextareaProps} from "@chakra-ui/react";
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

interface IOption {
  label: string;
  value: string;
}

export interface IConditionalLabelSelectProps extends FormControlProps {
  label: string;
  options: IOption[];
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

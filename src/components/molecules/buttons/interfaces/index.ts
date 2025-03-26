import {BoxProps, ButtonProps, CheckboxProps, RadioProps} from "@chakra-ui/react";

export interface IButtonProps extends ButtonProps{
    text?: string;
    textVariant?: string;
    icon?: React.ReactNode;
}

export interface IBoxProps extends BoxProps{
    title?: string;
    total?: number;
    currentPage?: number;
    type?: "tier3" | "merchant" | "suspend";
    choose?: "pending" | "suspend"
    isLoading?: boolean;
    onFilterChange?: (filters: any) => void 
    searchValue?: string; 
    onSearchChange?: (filters: any) => void
    //status?: "Successful" | "Rejected" | "Pending"
}

export interface IRadioProps extends RadioProps{
    text?: string;
}

export interface ICheckProps extends CheckboxProps{
    text?: string;
}
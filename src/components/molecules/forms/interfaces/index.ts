import {FormControlProps} from "@chakra-ui/react";

export interface IFormControl extends FormControlProps {
    isFocused?: boolean;
    children: React.ReactNode;
    label?: string;
    value?: any;
    labelPt?: string | number;
}
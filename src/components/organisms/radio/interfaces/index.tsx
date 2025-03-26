import {BoxProps, ButtonProps, RadioGroupProps, RadioProps} from "@chakra-ui/react";

export interface IRadioGroupProps extends Partial<RadioGroupProps>{
    onClose?: () => void
    onDownload?: (format: string, fromDate: string, toDate: string) => void;
}

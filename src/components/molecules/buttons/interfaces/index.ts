import {BoxProps, ButtonProps, CheckboxProps, FormControlProps, RadioProps} from "@chakra-ui/react";

export enum VerificationStatus {
    Pending = 'PENDING',
    Complete = 'COMPLETE',
    Failed = 'FAILED'
  }

export interface IButtonProps extends ButtonProps{
    text?: string;
    textVariant?: string;
    icon?: React.ReactNode;
    bg?: string;
    onClick?: () => void;
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
export interface HeaderBackButtonProps {
    onBack: () => void;
    header?: string;
}


export interface IOnboardingErrorBoxProps extends BoxProps {
    onRetry: (step: RegisterSteps) => void;
    h?: string | number;
    errorDetails: IOnboardingErrorMessageBoxProps,
    verificationStatus: VerificationStatus
}

export interface IOnboardingErrorMessageBoxProps {
    title: string;
    message: string;
    showNote?: boolean;
    details: string[];
}

export enum RegisterSteps {
    EnterPhone = 'ENTER_PHONE',
    EnterPin = 'ENTER_PIN',
    SelectBirth = 'SELECT_BIRTH',
    BvnOrNin = 'BVN_OR_NIN',
    PhotoUpload = 'PHOTO_UPLOAD',
    Complete = 'COMPLETE',
    CaptureCustomerImage = 'CAPTURE_CUSTOMER_IMAGE',
    HouseDetails = 'HOUSE_DETAILS',
    EnterEmail = 'ENTER_EMAIL',
    VerifyEmail = 'VERIFY_EMAIL',
  }

  export interface ListProps {
    value?: string;
    name?: string;
    id?: string | number;
  }

  type CustomFormControlProps = Omit<FormControlProps, 'onChange'>;

  export interface IFormControlButton extends CustomFormControlProps {
    isFocused?: boolean;
    children?: React.ReactNode;
    label?: string;
    value?: any;
    labelPt?: string | number;
    items: ListProps[];
    onChange?: (item: ListProps) => void; // Define onChange separately
  }
  

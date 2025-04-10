
export interface ICustomer {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    dob: string;
    bvn?: string;
    nin?: string;
    selectedDocumentType: DocumentType;
    id: string;
}


export interface ICustomerSliceInitialState {
    customerDetails: ICustomer | null;
    isLoading: boolean;
    error: string | null;
    currentStep: RegisterSteps;
}

export enum DocumentType {
    BVN = "bvn",
    NIN = "nin",

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
    UserBvnDetails = 'USER_BVN_DETAILS',
    ProfileCreated = 'PROFILE_CREATED',
    UserNationality = 'USER_NATIONALITY',
    BusinessAddress = 'BUSINESS_ADDRESS',
    BusinessDetails = 'BUSINESS_DETAILS',
    DojahVerification = 'DOJAH_VERIFICATION',
}
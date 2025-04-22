export interface IBusiness {
    hasCac?: boolean,
    businessType?: string,
    photoUrl: string,
    businessName: string,
    industryCategoryId: string,
    isResidentialAddress?: boolean,
    locatedInMarket: boolean,
    businessLga: string,
    businessState: string,
    businessCity?: string,
    marketName: string,
    storeNumber: string,
    fullShopAddress: string,
    businessLandmark?: string,
    utilityBillUrl?: string,
    utilityBillType?: string,
    businessRegistrationNumber?: string,
    certificateOfIncorporationUrl?: string,
    cacStatusReportUrl?: string,
    annualIncome: string,
    otherSourceOfIncome: string,
    otherSourceAnnualIncome: string,
    politicalExposed: boolean,
    nationality?: string,
    industryCategory?: string,
    industrySubCategory?: string,
    storeName?: string,
    hasOtherSources?: string,
    userId: string,
    coordinate?: string,
    timestamp?: string,
}


export interface IBusinessSliceInitialState {
    businessDetails: IBusiness | null;
    isLoading: boolean;
    error: string | null;
    currentStep: BusinessSteps;
    fromStep: BusinessSteps | null;
}

export enum DocumentType {
    BVN = "bvn",
    NIN = "nin",

}


export enum BusinessSteps {
    UserNationality = 'USER_NATIONALITY',
    BusinessAddress = 'BUSINESS_ADDRESS',
    BusinessDetails = 'BUSINESS_DETAILS',
    DojahVerification = 'DOJAH_VERIFICATION',
    SourceOfIncome = 'SOURCE_OF_INCOME',
    PoliticalExposure = 'POLITICAL_EXPOSURE',
    Atestation = 'ATESTATION',
    VerifyUsersIdentity = 'VERIFY_USERS_IDENTITY',
    PhoneVerification = 'PHONE_VERIFICATION',
    Success = 'SUCCESS',
    QRCode = 'QR_CODE'
}
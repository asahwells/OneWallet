export interface IRegistrationPayload {
    phone?: string;
    userId?: string;
    otp?: string;
    dob?: string;
    type?: string;
    bvn?: string;
    nin?: string;
    state?: string;
    lga?: string;
    town?: string;
    address?: string;
    landmark?: string;
    registrationBusiness?: string;
}

export interface IIdentityResponse {
    message: string,
    data: {
        firstName: string,
        lastName: string,
        dob: string,
        gender: string
    },
    state: string,
    status: number
}

export interface IResponse {
    message: string,
    data: any,
    state: string,
    status: number
}

export interface ICategoryResponse {
    id: string,
    name: string,
    value?: string,
}

export interface ICategoriesResponse {
    message: string,
    data: ICategoryResponse[],
    state: string,
    status: number
}

export interface IBusinessPayload {
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

export interface IAddEmailPayload {
    email: string,
    userId: string,
}

export interface  ICustomerBankInfoResponse {

    message: string,
    data: {
        accountNumber: string,
        accountName: string,
        bankName: string,
    }
    state: string,
    status: number


}

export interface ICustomersRes {
    id: string,
    createdAt: string,
    fullName: string,
    tier: null | string | number,
    status: string,
    firstName: string,
    lastName: string,
    state?: string,
    accountNumber?: string
}

export interface ICustomerRes {
    id: string,
    active: boolean,
    createdAt: string,
    updatedAt: string,
    deletedAt: null,
    version: string,
    userId: string,
    name: string,
    hasCac: boolean,
    fromWithoutCac: boolean,
    phone: string,
    businessRegistrationNumber: null,
    businessType: null,
    certificateOfIncorporationUrl: null,
    cacStatusReportUrl: null,
    utilityBillUrl: null,
    utilityBillType: null,
    location: string,
    state: string,
    lga: string,
    city: string,
    locatedInMarket: boolean,
    isResidentialAddress: boolean,
    marketName: null,
    storeNumber: null,
    fullShopAddress: string,
    landmark: string,
    photoUrl: string
    reason: null,
    street: string,
    country: string,
    comments: null,
    provider: string,
    status: string,
    neighborName: string,
    neighborPhone: string,
    neighborComment: string,
    noOfStores: null,
    noOfEmployees: null,
    coordinate: null,
    timestamp: null,
    subCategory: null,
    dojahPhotos: "[\"\"]",
    dojahReferenceId: string,
    annualIncome: null,
    otherSourceOfIncome: null,
    otherSourceAnnualIncome: null,
    politicalExposed: null

}

export interface  ICustomersInfoRes {
    data: ICustomersRes[];
    message?: string;
    status?: string;
    state?: number;
}

export interface  ICustomerInfoRes {
    data: ICustomerRes;
    message?: string;
    status?: string;
    state?: number;
}
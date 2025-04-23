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
    fullName: string,
    firstName: string,
    lastName: string,
    middleName: string,
    email: string,
    gender: null,
    phone: string,
    password: null,
    oneWalletUserType: string,
    bvn: string,
    nin: string,
    state: string,
    lga: string,
    town: string,
    landmark: string,
    address: string,
    tier: string,
    referralCode: string,
    oneTimeReferralCode: string,
    phoneVerified: boolean,
    emailVerified: boolean,
    ninVerified: boolean,
    bvnVerified: boolean,
    selfieUrl: string
    avatar: string
    merchant: null,
    accountNumber: string,
    country: string,
    nationality: string,
    tierOne: {
        id: string,
        userId: string,
        country: string,
        verificationUrl: string
    },
    tierTwo: {
        id: string,
        userId: string
    },
    tierThree: {},
    status: string
}

export interface ITransactionsRes {
    id: string,
    createdAt: string,
    amount: string,
    currency: string,
    type: string,
    operation: string,
    status: string,
    user: {
        id: string,
        firstName: string,
        lastName: string,
        state?: string,
        tier?: string,
        accountNumber?: string
    }
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

export interface  ITransactionsInfoRes {
    data: ITransactionsRes[];
    message?: string;
    status?: string;
    state?: number;
}

export interface ITierTwoUpgradePayload {
    userId: string;
    nin?: string;
    bvn?: string;
}

export interface IAddNextOfKinPayload {
    userId: string;
    nextOfKinName: string;
    nextOfKinPhone: string;
    nextOfKinAddress: string;
    nextOfKinRelationship: string;
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
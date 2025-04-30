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
    accountNumber: string,
    country: string,
    nationality: string,
    merchant: {
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
        businessType: string,
        certificateOfIncorporationUrl: null,
        cacStatusReportUrl: null,
        utilityBillUrl: string,
        utilityBillType: string,
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
        photoUrl: string,
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
        category: string,
        subCategory: null,
        dojahPhotos: "[\"\"]",
        dojahReferenceId: string
        annualIncome: null,
        otherSourceOfIncome: null,
        otherSourceAnnualIncome: null,
        politicalExposed: null
    },
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

export interface ITransactionRes {
    id: string,
    active: boolean,
    createdAt: string,
    updatedAt: string,
    deletedAt: null,
    version: string,
    amount: string,
    signedAmount: string,
    reference: string,
    description: null,
    appDescription: string,
    internalDescription: string,
    category: string,
    currency: string,
    generalReference: string,
    type: string,
    operation: string,
    buyPowerTariffClass: null,
    electricityToken: null,
    status: string,
    paymentProvider: string,
    isFlagged: boolean,
    phone: null,
    meter: null,
    biller: null,
    billerLogo: null,
    tariffDescription: null,
    senderBankCode: null,
    dotAiReference: null,
    dotAiRequestId: null,
    senderSourceAccountNo: null,
    senderAccountName: null,
    transRemark: null,
    narration: null,
    senderBankName: null,
    senderBankLogo: null,
    recipientBankCode: null,
    recipientAccountNumber: null,
    recipientAccountName: null,
    recipientBankName: null,
    recipientBankLogo: null,
    fee: string,
    balanceAfter: string,
    balanceBefore: string,
    metaData: null,
    buyPowerOrderId: null,
    buyPowerReceiptNo: null,
    buyPowerVendReference: null,
    userId: string,
    merchantId: null,
    fundedByAdminId: null,
    oneTimeReferralCampaignId: null
}

export interface  ICustomersInfoRes {
    data: ICustomersRes[];
    message?: string;
    pagination?: {
        hasPrevious: boolean,
        prevPage: number,
        hasNext: boolean,
        next: number,
        currentPage: number,
        pageSize: number,
        lastPage: number,
        total: number
    }
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
    pagination?: {
        hasPrevious: boolean,
        prevPage: number,
        hasNext: boolean,
        next: number,
        currentPage: number,
        pageSize: number,
        lastPage: number,
        total: number,
    }
    status?: string;
    state?: number;
}

export interface  ITransactionsOverviewRes {
    data: {
        transactionAmount: number,
        transactionCount: number
    };
    message?: string;
    status?: string;
    state?: number;
}

export interface  ITransactionDetailsRes {
    data: ITransactionRes;
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


export interface ITierThreeUpgradePayload {
    userId?: string;
    utilityBillType: string,
    utilityBillUrl: string,
}
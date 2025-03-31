export interface IDashboardRes {
    totalApplications: 0,
    totalDevicesSold: 0,
    totalCommissions: 0,
    pendingTasks: []
}

export interface IDashboardGraphInfoRes {
    inactiveDevices: [],
    activeDevices: [],
    expectedRepayment: [],
    actualRepayment: []
}

export interface IUserRes {
    id: string,
    fullName: string,
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    avatar: string,
    selfieUrl: string,
    referralCode: string,
    oneTimeReferralCode: string,
    phoneVerified: boolean,
    emailVerified: boolean,
    ninVerified: boolean,
    bvnVerified: boolean,
    tier: string,
    bvn:string,
    nin: string,
    dob: string,
    transactionPin: string,
    firebaseToken: string,
    state: string,
    lga: string,
    town: string,
    landmark: string,
    address: string,
    phone: string,
    emailNotification: boolean,
    smsNotification: boolean,
    soundNotification: false,
    oneWalletUserType: string,
    salesAgent: {
        id: string,
        active: boolean,
        createdAt: string,
        updatedAt: string,
        deletedAt: string,
        version: string,
        userId: string,
        fullName: string,
        avatar: string
    },
    account: {
        accountNumber: string,
        bankName: string,
        accountName: string
    },
    verificationStatus: string,
    canSubmitAgain: boolean
}

export interface  IUserInfomationRes {
    data: IUserRes;
    message?: string;
    status?: string;
    state?: number;
}

export interface  IDashboardInfoRes {
    data: IDashboardRes;
    message?: string;
    status?: string;
    state?: number;
}

export interface  IDashboardGraphRes {
    data: IDashboardGraphInfoRes;
    message?: string;
    status?: string;
    state?: number;
}
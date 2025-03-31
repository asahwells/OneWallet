export interface ILoginPayload {
    phone: string;
    password: string;
}

export interface ILoginRes {
    bvnOrNinExist: boolean,
    passwordExist: boolean,
    selfieUrlExist: boolean,
    stateExist: boolean,
    lgaExist: boolean,
    townExist: boolean,
    landmarkExist: boolean,
    addressExist: boolean,
    emailExist: boolean,
    tierExist: boolean,
    bvn: "",
    nin: "",
    id: string,
    fullName: string,
    firstName: string,
    middleName: string,
    lastName: string,
    email: null,
    avatar: null,
    selfieUrl: null,
    referralCode: string,
    phoneVerified: boolean,
    emailVerified: boolean,
    ninVerified: boolean,
    bvnVerified: boolean,
    tier: null,
    dob: string,
    transactionPin: null,
    firebaseToken: null,
    state: null,
    lga: null,
    town: null,
    landmark: null,
    address: null,
    phone: string,
    emailNotification: boolean,
    smsNotification: boolean,
    soundNotification: false,
    oneWalletUserType: string,
    account: {
        accountNumber: string,
        bankName: string,
        accountName: string
    },
    merchantAccount: [],
    verificationStatus: string,
    canSubmitAgain: boolean,
    salesAgent?: [
        {
            id?: string,
            active?: boolean,
            createdAt?: string,
            updatedAt?: string,
            deletedAt?: null,
            version?: string,
            userId?: string,
            fullName?: string,
            avatar?: null
        }
    ],
    lastLoginDate: string
}

export interface IAuthRes {
    token: string;
    data?: ILoginRes;
    message?: string;
    status?: string;
}

export interface IResetPasswordPayload {
    oldPassword: string;
    password: string;
}

export interface IVerifyPayload {
    phone?: string;
    otp?: string;
}

export interface  ILoginInfoRes {
    data: ILoginRes;
    token?: string;
    message?: string;
    status?: string;
    state?: number;
}
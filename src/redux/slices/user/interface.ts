export interface IUser {
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

export interface ILogin {
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
    salesAgent: [
        {
            id: string,
            active: boolean,
            createdAt: string,
            updatedAt: string,
            deletedAt: null,
            version: string,
            userId: string,
            fullName: string,
            avatar: null
        }
    ],
    lastLoginDate: string
}
export interface IUserSliceInitialState {
    userDetails: IUser | null;
    loggedDetails: ILogin | null;
    isAuthenticated: boolean;
}

export interface ILoginPayload {
    phone: string;
    password: string;
}

export interface IAuthRes {
    token: string;
}

export interface IResetPasswordPayload {
    oldPassword: string;
    password: string;
}

export interface IVerifyPayload {
    // add payload
}
export interface ILoginPayload {
    email: string;
    password: string;
}

export interface IAuthRes {
    token: string;
}

export interface IResetPasswordPayload {
    oldPassword: string;
    newPassword: string;
}
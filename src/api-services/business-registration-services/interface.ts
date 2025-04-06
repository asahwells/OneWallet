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
    data: {},
    state: string,
    status: number
}
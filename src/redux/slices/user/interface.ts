export interface IUser {
    id: string;
    fullName: string;
    email: string;
    roles: string[];
    active: boolean;
    firstName: string;
    lastName: string;
}
export interface IUserSliceInitialState {
    userDetails: IUser | null;
    isAuthenticated: boolean;
}

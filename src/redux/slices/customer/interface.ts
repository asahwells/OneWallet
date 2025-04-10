export interface ICustomer {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    dob: string;
    bvn?: string;
    nin?: string;
    selectedDocumentType: DocumentType;
    id: string;
}


export interface ICustomerSliceInitialState {
    customerDetails: ICustomer | null;
    isLoading: boolean;
    error: string | null;
}

export enum DocumentType {
    BVN = "bvn",
    NIN = "nin",

}
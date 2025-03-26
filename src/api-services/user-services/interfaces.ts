import {IResp} from "../interfaces";

export interface ISuspendedUser {
    id: string,
    createdAt: string,
    category: string,
    tier: string,
    subCategory: string,
    notes: string,
    oneWalletUserType: string,
    hasCac: boolean,
    status: string,
    userId: string,
    fullName: string,
    accountNumber: string
}

export interface ISuspendedMerchant {

    id: string,
    createdAt: string,
    category: string,
    tier: string,
    subCategory: string,
    notes: string,
    oneWalletUserType: string,
    hasCac: boolean,
    status: string,
    userId: string,
    fullName: string,
    accountNumber: string
}

export interface IPendingUser {
    id?: string,
    tier: string,
    dateOfSubmission: string,
    approvalType: string,
    fullName: string,
    accountNumber: string,
    accountName: string
}

export interface IPendingMerchant {
    id: string,
    createdAt: string,
    name: string,
    hasCac: boolean,
    utilityBillType: string,
    status: string,
    dateOfSubmissions: string,
    accountName: string,
    accountNumber: string
}

export interface IUserInfo {
    id: string,
    createdAt: string,
    category: string,
    tier: string,
    subCategory: string,
    notes: string, 
    status: string,
    merchant: null,
    documents: [
        {
            url: string,
        }
    ],
    activities: [
        {
            createdAt: string,
            action: string,
            status: string
        }
    ],
    name: string,
    userId: string,
    accountCreatedAtDate: string,
    lastLoginDate: string,
    avatar: null | string,
    accountType: string,
    accountBalance: string,
    referralUsed: string
}

export interface ISuspensionHistory {
    createdAt: string,
    action: string,
    suspendedUsersId: string,
    oneWalletUserType: string,
}

export interface IDocument {
    id: string;
    url: string;
}

export interface  ISuspendedUserRes extends IResp  {
    data: ISuspendedUser[];
}

export interface  ISuspendedMerchantRes extends IResp {
    data: ISuspendedMerchant[];
}

export interface  IPendingUserRes extends IResp {
    data: IPendingUser[];
}

export interface IFilterParams {
    currentPage?: number;
    fromDate?: string;
    toDate?: string;
    search?: string;
    tierLevel?: string;
    duration?: string; 
    durationType?: string
  }
  

export interface  IPendingMerchantRes extends IResp {
    data: IPendingMerchant[];
}

export interface  IUserInfoRes {
    data: IUserInfo;
    message?: string;
    status?: string;
    statusCode?: number;
}

export interface  ISuspensionHistoryRes {
    data: ISuspensionHistory[];
    message?: string;
    status?: string;
    statusCode?: number;
}

export interface FormData {
    
    category: string;
    subCategory: string;
    notes: string;  
    images: string[];
}
  
 export interface UpdateResponse {
    success: boolean;
    message: string;
    data?: any; 
  }

export interface ISuspendImageMetadata {
    url: string;
}

export interface IUpdateSuspendedUserPayload {
    category: string,
    subCategory: string,
    user?: string
    notes: string;
    images: Array<ISuspendImageMetadata>;
}
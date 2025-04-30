
export interface IUser {
    userId: string,
    nin: string,
    bvn: string,
    currentVerificationType: string,
    currentVerificationStatus: boolean
}


export interface IUpgradeSliceInitialState {
    upgradeDetails: IUser | null;
    isLoading: boolean;
    error: string | null;
    currentStep: UpgradeSteps;
}

export enum DocumentType {
    BVN = "bvn",
    NIN = "nin",

}

export enum UpgradeSteps {
    BvnOrNin = 'BVN_OR_NIN',
    NextOfKin = 'NEXT_OF_KIN',
    Success = 'SUCCESS'
}
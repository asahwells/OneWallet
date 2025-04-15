export enum UpgradeSteps {
    BvnOrNin = 'BVN_OR_NIN',
    NextOfKin = 'NEXT_OF_KIN',
    Success = 'SUCCESS'
}

export interface SuccessTemplateProps {
    onDone: () => void;
    onViewQR: () => void;
    onUpgrade?: () => void;
    userData?: {
        name: string;
        accountNumber: string;
        profileImage?: string;
        tier: number;
        dailyLimit: string;
        maxBalance: string;
    };
}
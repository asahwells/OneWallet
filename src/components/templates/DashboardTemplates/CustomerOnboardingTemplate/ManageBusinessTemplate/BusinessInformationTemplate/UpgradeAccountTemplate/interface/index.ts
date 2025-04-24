

export interface SuccessTemplateProps {
    onDone?: () => void;
    onViewQR?: () => void;
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
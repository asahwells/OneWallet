export interface AttestationTemplateProps {
    onNext: () => void;
    onBack: () => void;
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

export interface PepVerificationTemplateProps {
    onNext: () => void;
    onBack: () => void;
}

export interface PhoneVerificationTemplateProps {
    onNext: () => void;
    onBack: () => void;
    phoneNumber?: string;
}

export interface QrCodeTemplateProps {
    onBack: () => void;
    onDownload?: () => void;
    onOkay: () => void;
    userData?: {
        accountName: string;
        accountNumber: string;
        bankName: string;
    };
}

export interface SourceOfIncomeTemplateProps {
    onNext: () => void;
    onBack: () => void;
}

export interface VerificationUsersTemplateProps {
    onNext: () => void;
    onBack: () => void;
}
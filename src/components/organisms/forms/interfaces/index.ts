import { ReactNode } from "react";

export interface VerificationFormProps {
    title: ReactNode;
    label: ReactNode;
    screen?: 'otp' | 'phone';
}
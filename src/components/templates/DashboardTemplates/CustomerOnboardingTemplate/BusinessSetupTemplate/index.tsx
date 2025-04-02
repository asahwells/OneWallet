'use client';

import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import SourceOfIncomeTemplate from './SourceOfIncomeTemplate';
import PepVerificationTemplate from './PepVerificationTemplate';
import AttestationTemplate from './AtestationTemplate';
import VerificationUsersTemplate from './VerifyUsersIdentify';
import PhoneVerificationTemplate from './PhoneVerificationTeplate';
import SuccessTemplate from './CongratulationsTemplate';
import QrCodeTemplate from './QRCodeTemplate';

 enum BusinessSteps {
    SourceOfIncome = 'SOURCE_OF_INCOME',
    PoliticalExposure = 'POLITICAL_EXPOSURE',
    Atestation = 'ATESTATION',
    VerifyUsersIdentity = 'VERIFY_USERS_IDENTITY',
    PhoneVerification = 'PHONE_VERIFICATION',
    Success = 'SUCCESS',
    QRCode = 'QR_CODE'
}

const BusinessSetupTemplate = () => {
    const [step, setStep] = useState<BusinessSteps>(BusinessSteps.SourceOfIncome);

    // Navigate to a specific step
    const goToStep = (nextStep: BusinessSteps) => {
        setStep(nextStep);
    };

    // Example of "Next" navigation based on current step
    const handleNext = () => {
        switch (step) {
            case BusinessSteps.SourceOfIncome:
                setStep(BusinessSteps.PoliticalExposure);
                break;
            case BusinessSteps.PoliticalExposure:
                setStep(BusinessSteps.Atestation);
                break;
            case BusinessSteps.Atestation:
                setStep(BusinessSteps.VerifyUsersIdentity);
                break;
            case BusinessSteps.VerifyUsersIdentity:
                setStep(BusinessSteps.PhoneVerification);
                break;
            case BusinessSteps.PhoneVerification:
                setStep(BusinessSteps.Success);
                break;
            case BusinessSteps.Success:
                setStep(BusinessSteps.QRCode);
                break;
            default:
                break;
        }
    };

    // Example "Back" navigation based on current step
    const handleBack = () => {
        switch (step) {
            case BusinessSteps.PoliticalExposure:
                setStep(BusinessSteps.SourceOfIncome);
                break;
            case BusinessSteps.Atestation:
                setStep(BusinessSteps.PoliticalExposure);
                break;
            case BusinessSteps.VerifyUsersIdentity:
                setStep(BusinessSteps.Atestation);
                break;
            case BusinessSteps.PhoneVerification:
                setStep(BusinessSteps.VerifyUsersIdentity);
                break;
            case BusinessSteps.Success:
                setStep(BusinessSteps.PhoneVerification);
                break;
            case BusinessSteps.QRCode:
                setStep(BusinessSteps.Success);
                break;
            default:
                break;
        }
    };

    return (
        <Box w="full">
            {step === BusinessSteps.SourceOfIncome && (
                <SourceOfIncomeTemplate onNext={handleNext} onBack={handleBack} />
            )}
            {step === BusinessSteps.PoliticalExposure && (
                <PepVerificationTemplate onNext={handleNext} onBack={handleBack} />
            )}
            {step === BusinessSteps.Atestation && (
                <AttestationTemplate onNext={handleNext} onBack={handleBack} />
            )}
            {step === BusinessSteps.VerifyUsersIdentity && (
                <VerificationUsersTemplate onNext={handleNext} onBack={handleBack} />
            )}
            {step === BusinessSteps.PhoneVerification && (
                <PhoneVerificationTemplate onNext={handleNext} onBack={handleBack} />
            )}
            {step === BusinessSteps.Success && (
                <SuccessTemplate onViewQR={handleNext} onDone={handleBack} />
            )}
            {step === BusinessSteps.QRCode && (
                <QrCodeTemplate onOkay={handleNext} onBack={handleBack} />
            )}
        </Box>
    );
};

export default BusinessSetupTemplate;

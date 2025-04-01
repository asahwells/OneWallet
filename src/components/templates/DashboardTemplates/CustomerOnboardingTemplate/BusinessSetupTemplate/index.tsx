'use client';

import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import SourceOfIncomeTemplate from './SourceOfIncomeTemplate';
import PepVerificationTemplate from './PepVerificationTemplate';
import AttestationTemplate from './AtestationTemplate';
import VerificationUsersTemplate from './VerifyUsersIdentify';

 enum BusinessSteps {
    SourceOfIncome = 'SOURCE_OF_INCOME',
    PoliticalExposure = 'POLITICAL_EXPOSURE',
    Atestation = 'ATESTATION',
    VerifyUsersIdentity = 'VERIFY_USERS_IDENTITY'
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
            {/*step === RegisterSteps.PhotoUpload && (
                <UploadCustomerImageTemplate onContinue={handleNext} />
            )}
            {step === RegisterSteps.Complete && <Box p={4}>Form Complete!</Box>*/}
        </Box>
    );
};

export default BusinessSetupTemplate;

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
import UserNationality from '../CustomerRegistrationTemplate/UserNationality';
import BusinessAddress from '../CustomerRegistrationTemplate/BusinessAddress';
import BusinessDetails from '../CustomerRegistrationTemplate/BusinessDetails';

 enum BusinessSteps {
    UserNationality = 'USER_NATIONALITY',
    BusinessAddress = 'BUSINESS_ADDRESS',
    BusinessDetails = 'BUSINESS_DETAILS',
    DojahVerification = 'DOJAH_VERIFICATION',
    SourceOfIncome = 'SOURCE_OF_INCOME',
    PoliticalExposure = 'POLITICAL_EXPOSURE',
    Atestation = 'ATESTATION',
    VerifyUsersIdentity = 'VERIFY_USERS_IDENTITY',
    PhoneVerification = 'PHONE_VERIFICATION',
    Success = 'SUCCESS',
    QRCode = 'QR_CODE'
}

const BusinessSetupTemplate = () => {
    const [step, setStep] = useState<BusinessSteps>(BusinessSteps.Atestation);

    // Navigate to a specific step
    const goToStep = (nextStep: BusinessSteps) => {
        setStep(nextStep);
    };

    // Example of "Next" navigation based on current step
    const handleNext = () => {
        switch (step) {
            case BusinessSteps.UserNationality:
                setStep(BusinessSteps.BusinessAddress);
                break;
            case BusinessSteps.BusinessAddress:
                setStep(BusinessSteps.BusinessDetails);
                break;
            case BusinessSteps.BusinessDetails:
                setStep(BusinessSteps.SourceOfIncome);
                break;
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
            case BusinessSteps.BusinessAddress:
                setStep(BusinessSteps.UserNationality);
                break;
            case BusinessSteps.BusinessDetails:
                setStep(BusinessSteps.BusinessAddress);
                break;
            case BusinessSteps.SourceOfIncome:
                setStep(BusinessSteps.BusinessDetails);
                break;
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
            {step === BusinessSteps.UserNationality && 
                <UserNationality onNext={handleNext} onBack={handleBack} />
            }
            {step === BusinessSteps.BusinessAddress && 
                <BusinessAddress onNext={handleNext} onBack={handleBack} />
            }
            {step === BusinessSteps.BusinessDetails && 
                <BusinessDetails onNext={handleNext} onBack={handleBack} />
            }
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

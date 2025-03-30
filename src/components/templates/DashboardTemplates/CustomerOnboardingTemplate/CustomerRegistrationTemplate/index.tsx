'use client';

import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import EnterPhoneTemplate from './EnterPhoneTemplate';
import EnterPinTemplate from "./EnterPinTemplate";
import SelectBirthTemplate from "./SelectBirthTemplate";
import BvnOrNinTemplate from "./BvnOrNinTemplate";
import UploadCustomerImageTemplate from "./UploadCustomerImageTemplate";
// import RegisterUserStepTwo from './RegisterUserStepTwo';
 enum RegisterSteps {
    EnterPhone = 'ENTER_PHONE',
    EnterPin = 'ENTER_PIN',
    SelectBirth = 'SELECT_BIRTH',
    BvnOrNin = 'BVN_OR_NIN',
    PhotoUpload = 'PHOTO_UPLOAD',
    Complete = 'COMPLETE'
}

const RegisterUserForm = () => {
    const [step, setStep] = useState<RegisterSteps>(RegisterSteps.EnterPhone);

    // Navigate to a specific step
    const goToStep = (nextStep: RegisterSteps) => {
        setStep(nextStep);
    };

    // Example of "Next" navigation based on current step
    const handleNext = () => {
        switch (step) {
            case RegisterSteps.EnterPhone:
                setStep(RegisterSteps.EnterPin);
                break;
            case RegisterSteps.EnterPin:
                setStep(RegisterSteps.SelectBirth);
                break;
            case RegisterSteps.SelectBirth:
                setStep(RegisterSteps.BvnOrNin);
                break;
            case RegisterSteps.BvnOrNin:
                setStep(RegisterSteps.PhotoUpload);
                break;
            case RegisterSteps.PhotoUpload:
                setStep(RegisterSteps.Complete);
                break;
            default:
                break;
        }
    };

    // Example "Back" navigation based on current step
    const handleBack = () => {
        switch (step) {
            case RegisterSteps.EnterPin:
                setStep(RegisterSteps.EnterPhone);
                break;
            case RegisterSteps.SelectBirth:
                setStep(RegisterSteps.EnterPin);
                break;
            case RegisterSteps.BvnOrNin:
                setStep(RegisterSteps.SelectBirth);
                break;
            case RegisterSteps.PhotoUpload:
                setStep(RegisterSteps.BvnOrNin);
                break;
            default:
                break;
        }
    };

    return (
        <Box w="full">
            {step === RegisterSteps.EnterPhone && (
                <EnterPhoneTemplate onNext={handleNext} onBack={handleBack} />
            )}
            {step === RegisterSteps.EnterPin && (
                <EnterPinTemplate onVerify={handleNext} onBack={handleBack} />
            )}
            {step === RegisterSteps.SelectBirth && (
                <SelectBirthTemplate onNext={handleNext} onBack={handleBack} />
            )}
            {step === RegisterSteps.BvnOrNin && (
                <BvnOrNinTemplate
                    onVerify={handleNext}
                    onBack={handleBack}
                    onAttachmentSelect={() => goToStep(RegisterSteps.PhotoUpload)}
                    onCameraSelect={() => goToStep(RegisterSteps.PhotoUpload)}
                />
            )}
            {step === RegisterSteps.PhotoUpload && (
                <UploadCustomerImageTemplate onContinue={handleNext} />
            )}
            {step === RegisterSteps.Complete && <Box p={4}>Form Complete!</Box>}
        </Box>
    );
};

export default RegisterUserForm;

'use client';

import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import EnterPhoneTemplate from './EnterPhoneTemplate';
import EnterPinTemplate from "./EnterPinTemplate";
import SelectBirthTemplate from "./SelectBirthTemplate";
import BvnOrNinTemplate from "./BvnOrNinTemplate";
// import RegisterUserStepTwo from './RegisterUserStepTwo';

const RegisterUserForm = () => {
    const [step, setStep] = useState(1);

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

    return (
        <Box w={'full'}>
            {step === 1 && (
                <EnterPhoneTemplate onNext={handleNext} onBack={handleBack} />
            )}
            {step === 2 && (
                <EnterPinTemplate onVerify={handleNext} onBack={handleBack} />
            )}

            {step === 3 && (
                <SelectBirthTemplate onNext={handleNext} onBack={handleBack} />
            )}
            {step === 4 && (
                <BvnOrNinTemplate onVerify={handleNext} onBack={handleBack} />
            )}
            {step > 3 && <Box p={4}>Form Complete!</Box>}
        </Box>
    );
};

export default RegisterUserForm;

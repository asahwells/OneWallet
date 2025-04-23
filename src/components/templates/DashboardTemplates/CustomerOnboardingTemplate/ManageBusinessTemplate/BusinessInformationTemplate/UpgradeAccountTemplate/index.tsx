import React, { useState } from 'react';
import { Box, Flex, Heading, HStack, Input, Text, useBreakpointValue, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import BVNOrNINTemplate from './BVNOrNINTemplate';
import NextOfKinTemplate from './NOKTemplate';
import SuccessTemplate from './CongratulationsTemplate';
import { UpgradeSteps } from '../../../../../../../redux/slices/upgrade/interface';
import { useDispatch } from 'react-redux';
import {setCurrentStep} from "../../../../../../../redux/slices/upgrade";
import {useAppSelector} from "../../../../../../../redux/store";

const UpgradeAccountTemplate = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const {currentStep} = useAppSelector(state => state.upgrade)

    const setStep = (step: UpgradeSteps) => {
        // @ts-ignore
        dispatch(setCurrentStep(step))
    }

   const goToStep = (nextStep: UpgradeSteps) => {
       setStep(nextStep);
   };

   const handleNext = () => {
       switch (currentStep) {
           case UpgradeSteps.BvnOrNin:
                setStep(UpgradeSteps.NextOfKin);
               break;
            case UpgradeSteps.NextOfKin:
                setStep(UpgradeSteps.Success);
               break;
           default:
               break;
       }
   };

   const handleBack = () => {
       switch (currentStep) {
           case UpgradeSteps.NextOfKin:
                setStep(UpgradeSteps.BvnOrNin);
               break;
            case UpgradeSteps.Success:
                setStep(UpgradeSteps.NextOfKin);
                break;
           default:
               break;
       }
   };

   return (
       <Box w="full">
           {currentStep === UpgradeSteps.BvnOrNin && (
               <BVNOrNINTemplate onNext={handleNext} onBack={() => {
                   router.back()
               }} />
           )}
           {currentStep === UpgradeSteps.NextOfKin && (
               <NextOfKinTemplate onNext={handleNext} onBack={handleBack} />
           )}
           {currentStep === UpgradeSteps.Success && (
                <SuccessTemplate onViewQR={handleNext} onDone={() => {
                    router.push('/admin/dashboard/business/customer-onboarding')
                }} />
            )}
       </Box>
   );
};

export default UpgradeAccountTemplate;
import React, { useState } from 'react';
import { Box, Flex, Heading, HStack, Input, Text, useBreakpointValue, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { UpgradeSteps } from './interface';
import BVNOrNINTemplate from './BVNOrNINTemplate';
import NextOfKinTemplate from './NOKTemplate';
import SuccessTemplate from './CongratulationsTemplate';

const UpgradeAccountTemplate = () => {
    const router = useRouter()
    //const dispatch = useDispatch()
   
    const [currentStep, setCurrentStep] = useState(UpgradeSteps.BvnOrNin)

    const setStep = (step: UpgradeSteps) => {
    }

   const goToStep = (nextStep: UpgradeSteps) => {
       setStep(nextStep);
   };

   const handleNext = () => {
       switch (currentStep) {
           case UpgradeSteps.BvnOrNin:
               setCurrentStep(UpgradeSteps.NextOfKin);
               break;
            case UpgradeSteps.NextOfKin:
               setCurrentStep(UpgradeSteps.Success);
               break;
           default:
               break;
       }
   };

   const handleBack = () => {
       switch (currentStep) {
           case UpgradeSteps.NextOfKin:
               setCurrentStep(UpgradeSteps.BvnOrNin);
               break;
            case UpgradeSteps.Success:
                setCurrentStep(UpgradeSteps.NextOfKin);
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
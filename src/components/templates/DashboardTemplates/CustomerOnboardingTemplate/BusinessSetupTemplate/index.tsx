'use client';

import React, {useEffect, useState} from 'react';
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
import {useAppDispatch, useAppSelector} from "../../../../../redux/store";
import {clearBusinessDetails, setCurrentBusinessStep, setFromBusinessStep} from "../../../../../redux/slices/business";
import {BusinessSteps} from "../../../../../redux/slices/business/interfaces";
import {router} from "next/client";
import {useRouter} from "next/navigation";
import {clearCustomerDetails, setCurrentStep} from "../../../../../redux/slices/customer";
import AttestationCheckbox from '../../../../molecules/inputs/AttestationCheckBox/index';
import {RegisterSteps} from "../../../../molecules/buttons/interfaces";


const BusinessSetupTemplate = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()


    // useEffect(() => {
    //     return () => {
    //         dispatch(setCurrentBusinessStep(BusinessSteps.UserNationality))
    //         dispatch(setCurrentStep(RegisterSteps.EnterPhone))
    //         dispatch(clearBusinessDetails())
    //         dispatch(clearCustomerDetails())
    //     }
    // }, []);
    const {currentStep, fromStep} = useAppSelector(state => state.business)
    // Navigate to a specific step
    const goToStep = (nextStep: BusinessSteps) => {
        setStep(nextStep);
    };

    const setStep = (step: BusinessSteps) => {
        dispatch(setCurrentBusinessStep(step));

    }

    // Example of "Next" navigation based on current step
    const handleNext = () => {

        if(fromStep){
            setStep(fromStep);
            dispatch(setFromBusinessStep(null));
            return;
        }

        switch (currentStep) {
            case BusinessSteps.UserNationality:
                setStep(BusinessSteps.QRCode) ;
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
                setStep(BusinessSteps.UserNationality);
                break;
        }
    };

    // Example "Back" navigation based on current step
    const handleBack = () => {
        if(fromStep){
            setStep(fromStep);
            dispatch(setFromBusinessStep(null));
            return;
        }

        switch (currentStep) {
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
                setStep(BusinessSteps.UserNationality);
                break;
        }
    };

    return (
        <Box w="full">
            {currentStep === BusinessSteps.UserNationality &&
                <UserNationality onNext={handleNext} onBack={handleBack} />
            }
            {currentStep === BusinessSteps.BusinessAddress &&
                <BusinessAddress onNext={handleNext} onBack={handleBack} />
            }
            {currentStep === BusinessSteps.BusinessDetails &&
                <BusinessDetails onNext={handleNext} onBack={handleBack} />
            }
            {currentStep === BusinessSteps.SourceOfIncome && (
                <SourceOfIncomeTemplate onNext={handleNext} onBack={handleBack} />
            )}
            {currentStep === BusinessSteps.PoliticalExposure && (
                <PepVerificationTemplate onNext={handleNext} onBack={handleBack} />
            )}
            {currentStep === BusinessSteps.Atestation && (
                <AttestationTemplate onNext={handleNext} onBack={handleBack} />
            )}
            {currentStep === BusinessSteps.VerifyUsersIdentity && (
                <VerificationUsersTemplate onNext={handleNext} onBack={handleBack} />
            )}
            {currentStep === BusinessSteps.PhoneVerification && (
                <PhoneVerificationTemplate onNext={handleNext} onBack={handleBack} />
            )}
            {currentStep === BusinessSteps.Success && (
                <SuccessTemplate onViewQR={handleNext} onDone={() => {

                    dispatch(clearBusinessDetails())
                    dispatch(clearCustomerDetails())
                    router.push('/admin/dashboard')
                }} />
            )}
            {currentStep === BusinessSteps.QRCode && (
                <QrCodeTemplate onOkay={handleNext} onBack={handleBack} />
            )}

            {
                !currentStep && (
                    <UserNationality onNext={handleNext} onBack={handleBack} />
                )
            }
        </Box>
    );
};

export default BusinessSetupTemplate;
'use client';

import React, {useEffect, useState} from 'react';
import {Box, useDisclosure} from '@chakra-ui/react';
import EnterPhoneTemplate from './EnterPhoneTemplate';
import EnterPinTemplate from "./EnterPinTemplate";
import SelectBirthTemplate from "./SelectBirthTemplate";
import BvnOrNinTemplate from "./BvnOrNinTemplate";
import UploadCustomerImageTemplate from "./UploadCustomerImageTemplate";
import CaptureCustomerImageTemplate from "./CaptureCustomerImageTemplate";
import DocumentsVerificationModal from "../../../../molecules/modals/DocumentsVerificationModal";
import {VerificationStatus} from "../../../../molecules/modals/interfaces";
import HouseDetailsTemplate from "./HouseDetailsTemplate";
import EnterEmailTemplate from "./EnterEmailTemplate";
import EmailOtpVerificationTemplate from "./EmailOtpVerificationTemplate";
import VerificationProgressTemplate from './VerificationProgressTemplate';
import UserBvnDetails from './UserBvnDetails';
import { ProfileCreated } from './ProfileCreated';
import UserNationality from './UserNationality';
import BusinesAddress from './BusinessAddress';
import BusinessDetails from './BusinessDetails';
import DojahVerificationTemplate from "./DojahVerificationTemplate";
import {useDispatch} from "react-redux";
import {setCurrentStep, setCustomer} from "../../../../../redux/slices/customer";
import {useAppSelector} from "../../../../../redux/store";
import {RegisterSteps} from "../../../../../redux/slices/customer/interface";
import {router} from "next/client";
import {useRouter} from "next/navigation";
// import RegisterUserStepTwo from './RegisterUserStepTwo';

const RegisterUserForm = () => {

    const router = useRouter()
     const dispatch = useDispatch()
    const {isOpen: isDocumentsVerificationModalOpen, onOpen: onDocumentsVerificationModalOpen, onClose: onDocumentsVerificationModalClose} =  useDisclosure()
    const [documentsVerificationStatus, setDocumentsVerificationStatus] = useState<VerificationStatus>('PENDING');

     const {currentStep} = useAppSelector(state => state.customer)

   const setStep = (step: RegisterSteps) => {
         // @ts-ignore
        dispatch(setCurrentStep(step))
   }

    // Navigate to a specific step
    const goToStep = (nextStep: RegisterSteps) => {
        setStep(nextStep);
    };

    // Example of "Next" navigation based on current step
    const handleNext = () => {
        switch (currentStep) {
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
            case RegisterSteps.Complete:
                setStep(RegisterSteps.UserBvnDetails);
                break;
            case RegisterSteps.UserBvnDetails:
                setStep(RegisterSteps.ProfileCreated);
                break;
            case RegisterSteps.ProfileCreated:
                setStep(RegisterSteps.UserNationality);
                break;
            case RegisterSteps.UserNationality:
                setStep(RegisterSteps.BusinessAddress);
                break;
            case RegisterSteps.BusinessAddress:
                setStep(RegisterSteps.BusinessDetails);
                break;

            default:
                break;
        }
    };

    // Example "Back" navigation based on current step
    const handleBack = () => {
        switch (currentStep) {
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

            case RegisterSteps.HouseDetails:
                setStep(RegisterSteps.BvnOrNin);
                break;
            case RegisterSteps.UserBvnDetails:
                setStep(RegisterSteps.Complete);
                break;
            case RegisterSteps.ProfileCreated:
                setStep(RegisterSteps.UserBvnDetails);
                break;
            case RegisterSteps.UserNationality:
                setStep(RegisterSteps.ProfileCreated);
                break;
            case RegisterSteps.BusinessAddress:
                setStep(RegisterSteps.UserNationality);
                break;
            case RegisterSteps.BusinessDetails:
                setStep(RegisterSteps.BusinessAddress);
                break;

            default:
                break;
        }
    };

    return (
        <Box w="full">
            {currentStep === RegisterSteps.EnterPhone && (
                <EnterPhoneTemplate onNext={handleNext} onBack={() => {
                    router.back()
                }} />
            )}
            {currentStep === RegisterSteps.EnterPin && (
                <EnterPinTemplate onVerify={handleNext} onBack={handleBack} />
            )}
            {currentStep === RegisterSteps.SelectBirth && (
                <SelectBirthTemplate onNext={handleNext} onBack={handleBack} />
            )}
            {currentStep === RegisterSteps.BvnOrNin && (
                <BvnOrNinTemplate
                    onVerify={() => {goToStep(RegisterSteps.DojahVerification)}}
                    onBack={handleBack}
                    onAttachmentSelect={() => goToStep(RegisterSteps.DojahVerification)}
                    onCameraSelect={() => goToStep(RegisterSteps.DojahVerification)}
                />
            )}
            {currentStep === RegisterSteps.PhotoUpload && (
                <UploadCustomerImageTemplate onContinue={() => {
                    onDocumentsVerificationModalOpen();
                    setDocumentsVerificationStatus('PENDING')

                    setTimeout(() => {
                        setDocumentsVerificationStatus('SUCCESS')
                    }, 3000)

                }} onBack={()=> {
                    goToStep(RegisterSteps.BvnOrNin);
                }} />
            )}
            {currentStep === RegisterSteps.CaptureCustomerImage && <CaptureCustomerImageTemplate
                onBack={() => {
                    goToStep(RegisterSteps.BvnOrNin);
                }}
                onContinue={(capturedPhoto) => {
                    console.log('Photo captured:', capturedPhoto);
                    // proceed to next currentStep

                    onDocumentsVerificationModalOpen();
                    setDocumentsVerificationStatus('PENDING')

                    setTimeout(() => {
                        setDocumentsVerificationStatus('SUCCESS')
                    }, 3000)



                }}
            />}

            {currentStep === RegisterSteps.HouseDetails && <HouseDetailsTemplate
                onNext={() => {
                    goToStep(RegisterSteps.EnterEmail);
                }}
                onBack={handleBack}

            />}

            {currentStep === RegisterSteps.EnterEmail && <EnterEmailTemplate onNext={() => {
                goToStep(RegisterSteps.VerifyEmail);
            }} onSkip={() => {
                console.log("")
            }} onBack={() => {
                goToStep(RegisterSteps.HouseDetails);
            }} />}


            {currentStep === RegisterSteps.VerifyEmail && <EmailOtpVerificationTemplate  onNext={()=>{
                goToStep(RegisterSteps.Complete);
            }} onBack={() => {
                goToStep(RegisterSteps.EnterEmail);
            }} />}


            {currentStep === RegisterSteps.Complete &&
                <VerificationProgressTemplate onBack={goToStep} onNext={() => {
                    goToStep(RegisterSteps.UserBvnDetails);
                }} />
            }
            {currentStep === RegisterSteps.UserBvnDetails &&
                <UserBvnDetails onNext={handleNext} onBack={handleBack} />
            }
            {currentStep === RegisterSteps.ProfileCreated &&
                <ProfileCreated onNext={handleNext} onBack={handleBack} />
            }


            {
                currentStep === RegisterSteps.DojahVerification && (
                    <DojahVerificationTemplate
                        onVerificationComplete={
                            () => {
                                onDocumentsVerificationModalOpen();
                                setDocumentsVerificationStatus('PENDING')

                                setTimeout(() => {
                                    setDocumentsVerificationStatus('SUCCESS')
                                }, 3000)
                            }
                        }
                        onBack={
                            () => {
                                goToStep(RegisterSteps.BvnOrNin);
                            }
                        }

                    />
                )
            }


            <DocumentsVerificationModal
                isOpen={isDocumentsVerificationModalOpen}
                onClose={onDocumentsVerificationModalClose}
                status={documentsVerificationStatus}
                onPrimaryAction={() => {
                    onDocumentsVerificationModalClose();
                    // Proceed to next step
                    setStep(RegisterSteps.HouseDetails);

                }}
            />
        </Box>
    );
};

export default RegisterUserForm;
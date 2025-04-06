'use client';

import React, { useState } from 'react';
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
// import RegisterUserStepTwo from './RegisterUserStepTwo';
 enum RegisterSteps {
    EnterPhone = 'ENTER_PHONE',
    EnterPin = 'ENTER_PIN',
    SelectBirth = 'SELECT_BIRTH',
    BvnOrNin = 'BVN_OR_NIN',
    PhotoUpload = 'PHOTO_UPLOAD',
    Complete = 'COMPLETE',
    CaptureCustomerImage = 'CAPTURE_CUSTOMER_IMAGE',
    HouseDetails = 'HOUSE_DETAILS',
    EnterEmail = 'ENTER_EMAIL',
    VerifyEmail = 'VERIFY_EMAIL',
    UserBvnDetails = 'USER_BVN_DETAILS',
    ProfileCreated = 'PROFILE_CREATED',
    UserNationality = 'USER_NATIONALITY',
    BusinessAddress = 'BUSINESS_ADDRESS',
    BusinessDetails = 'BUSINESS_DETAILS',
}

const RegisterUserForm = () => {

    const {isOpen: isDocumentsVerificationModalOpen, onOpen: onDocumentsVerificationModalOpen, onClose: onDocumentsVerificationModalClose} =  useDisclosure()
    const [documentsVerificationStatus, setDocumentsVerificationStatus] = useState<VerificationStatus>('PENDING');


    const [step, setStep] = useState<RegisterSteps>(RegisterSteps.UserBvnDetails);

    // Navigate to a specific step
    const goToStep = (nextStep: RegisterSteps) => {
        console.log(nextStep)
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
                    onCameraSelect={() => goToStep(RegisterSteps.CaptureCustomerImage)}
                />
            )}
            {step === RegisterSteps.PhotoUpload && (
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
            {step === RegisterSteps.CaptureCustomerImage && <CaptureCustomerImageTemplate
                onBack={() => {
                    goToStep(RegisterSteps.BvnOrNin);
                }}
                onContinue={(capturedPhoto) => {
                    console.log('Photo captured:', capturedPhoto);
                    // proceed to next step

                    onDocumentsVerificationModalOpen();
                    setDocumentsVerificationStatus('PENDING')

                    setTimeout(() => {
                        setDocumentsVerificationStatus('SUCCESS')
                    }, 3000)



                }}
            />}

            {step === RegisterSteps.HouseDetails && <HouseDetailsTemplate
                onNext={handleNext}
                onBack={handleBack}

            />}

            {step === RegisterSteps.EnterEmail && <EnterEmailTemplate onNext={() => {
                goToStep(RegisterSteps.VerifyEmail);
            }} onSkip={() => {
                console.log("")
            }} onBack={() => {
                goToStep(RegisterSteps.HouseDetails);
            }} />}


            {step === RegisterSteps.VerifyEmail && <EmailOtpVerificationTemplate  onVerify={()=>{
                // show generic success modal
            }} onBack={() => {
                goToStep(RegisterSteps.HouseDetails);
            }} />}


            {step === RegisterSteps.Complete && 
                <VerificationProgressTemplate onBack={goToStep} />
            }
            {step === RegisterSteps.UserBvnDetails && 
                <UserBvnDetails onNext={handleNext} onBack={handleBack} />
            }
            {step === RegisterSteps.ProfileCreated && 
                <ProfileCreated onNext={handleNext} onBack={handleBack} />
            }
            {step === RegisterSteps.UserNationality && 
                <UserNationality onNext={handleNext} onBack={handleBack} />
            }
            {step === RegisterSteps.BusinessAddress && 
                <BusinesAddress onNext={handleNext} onBack={handleBack} />
            }
            {step === RegisterSteps.BusinessDetails && 
                <BusinessDetails onNext={handleNext} onBack={handleBack} />
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
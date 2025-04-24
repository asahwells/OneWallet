'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Text,
    IconButton,
    Heading,
    Button,
    useBreakpointValue,
    HStack,
    useDisclosure, Spinner,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { PinInput, PinInputField } from '@chakra-ui/react';
import HeaderBackButton from "../../../../../molecules/buttons/HeaderBackButton";
import {useAddEmail, useEmailVerification} from 'api-services/business-registration-services';
import { useAppSelector } from '../../../../../../redux/store'; 
import FailedModal from 'components/molecules/modals/FailedModal';
import SuccessModal from 'components/molecules/modals/SuccessModal';
import BasePinInput from "../../../../../molecules/inputs/BasePinInput";

interface EmailOtpVerificationTemplateProps {
    onNext: () => void;
    onBack?: () => void;
    userEmail?: string; // e.g. "johndoe@gmail.com"
}

const EmailOtpVerificationTemplate = ({
        onNext,
        onBack,
        userEmail,
    }: EmailOtpVerificationTemplateProps) => {
    const { customerDetails } = useAppSelector(state => state.customer)
    const { isOpen: isOpenOne, onClose: onCloseOne, onToggle: onToggleOne } = useDisclosure();
    const { isOpen: isSuccessModalOpen, onClose: onSuccessModalClose, onOpen: onSuccessModalOpen } = useDisclosure();

    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(60); // 60-second countdown

    const isMobile = useBreakpointValue({ base: true, md: false });

    const { mutateAsync: verifyEmail, isPending: isVerifyingEmail } = useEmailVerification();
    const { mutateAsync: addEmail, isPending: isAddingEmail } = useAddEmail();

    // Decrement timer
    useEffect(() => {
        if (timer <= 0) return;
        const interval = setInterval(() => setTimer((t) => t - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const formattedTime = `0:${String(timer).padStart(2, '0')}`;

    const handleVerify = async() => {
        const payload = {
            email: customerDetails?.email,
            otp,
            userId: customerDetails?.id,
        };
        try {
            await verifyEmail(payload);
            onSuccessModalOpen()
            //onVerify();
          } catch (error) {
            console.error('Error verifying email:', error);
            // Show the error modal
            onToggleOne();
          }
    };

    const handleResend = async () => {
        // Reset timer, clear OTP
        await  addEmail({ email: customerDetails?.email, userId: customerDetails?.id });

        setTimer(60);
        setOtp('');
        // Trigger your resend logic if needed
    };

    return (
        <>
            <HeaderBackButton onBack={onBack} />

            {/* Main Card */}
            <Flex
                direction="column"
                bg="white"
                p={isMobile ? 4 : 8}
                borderRadius="8px"
                boxShadow={isMobile ? 'none' : 'md'}
                w={isMobile ? '100%' : '600px'}
                mx="auto"
                mt={4}
            >
                {/* Heading */}
                <Heading
                    as="h1"
                    fontSize="18px"
                    fontWeight="700"
                    textAlign={{
                        base: 'left',
                        md: 'center',
                    }}
                    mb={2}
                >
                    Email OTP Verification
                </Heading>

                <Text
                    fontSize="14px"
                    color="#475569"
                    mb={6}
                    textAlign={{
                        base: 'left',
                        md: 'center',
                    }}
                >
                    Enter the verification code we just sent to the user’s email address{' '}
                    <strong>{userEmail}</strong>. You might need to ask the user to check
                    their spam folder.
                </Text>

                {/* OTP Fields */}
                <HStack justifyContent="center" mb={6}>
                    <BasePinInput count={4} onChange={setOtp} >
                        <></>
                    </BasePinInput>
                </HStack>

                {/* Verify Button */}
                <Button
                    width="100%"
                    height="48px"
                    borderRadius="8px"
                    bg={otp.length === 4 ? '#0F454F' : '#E2E8F0'}
                    color={otp.length === 4 ? 'white' : '#94A3B8'}
                    fontWeight="600"
                    isLoading={isVerifyingEmail}
                    onClick={handleVerify}
                    isDisabled={otp.length !== 4}
                >
                    Verify
                </Button>

                {/* Countdown & Resend */}
                <Flex alignItems="center" direction="column" mt={4}>
                    {
                        isAddingEmail  ? <Spinner /> :  <Text fontSize="16px" color="#C5B27D" mb={2}>
                            {formattedTime}
                        </Text>
                    }
                    <HStack>
                        <Text fontSize="14px" color="#475569">
                            Didn’t Receive the code?
                        </Text>
                        <Button
                            variant="link"
                            color="#0F454F"
                            fontSize="14px"
                            fontWeight="600"
                            onClick={handleResend}
                            isDisabled={timer > 0}
                        >
                            Resend
                        </Button>
                    </HStack>
                </Flex>


            </Flex>

            {isSuccessModalOpen && <SuccessModal
                isOpen={isSuccessModalOpen}
                onClose={() => {
                    onSuccessModalClose()
                    onNext()
                }}
                title="Congratulations!"
                title2="Successful Email Verification"
                //width={{ xs: "95%", lg: "843px" }}
                height="240px"
                borderRadius="8px"
                padding="24px"
                borderTopRadius={'26.81px'}
                borderBottomRadius={'26.81px'}
            />}

            {/* Failed Modal */}
            {isOpenOne && <FailedModal
                isOpen={isOpenOne}
                onClose={onCloseOne}
                title="Error Message:"
                title2="You entered a wrong OTP. This account will be locked for 3 hours after 2 more attempts."
                //width={{ xs: "95%", lg: "843px" }}
                height="auto"
                borderRadius="8px"
                padding="24px"
                borderTopRadius={'26.81px'}
                borderBottomRadius={'26.81px'}
            />}
        </>
    );
};

export default EmailOtpVerificationTemplate;

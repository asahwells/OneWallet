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
    useDisclosure,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { PinInput, PinInputField } from '@chakra-ui/react';
import HeaderBackButton from "../../../../../molecules/buttons/HeaderBackButton";
import { useEmailVerification } from 'api-services/business-registration-services';
import { useAppSelector } from '../../../../../../redux/store'; 
import FailedModal from 'components/molecules/modals/FailedModal';
import SuccessModal from 'components/molecules/modals/SuccessModal';

interface EmailOtpVerificationTemplateProps {
    onVerify: (otp: string) => void;
    onBack?: () => void;
    userEmail?: string; // e.g. "johndoe@gmail.com"
}

const EmailOtpVerificationTemplate = ({
        onVerify,
        onBack,
        userEmail,
    }: EmailOtpVerificationTemplateProps) => {
    const { userDetails } = useAppSelector(state => state.user)
    const { isOpen: isOpenOne, onClose: onCloseOne, onToggle: onToggleOne } = useDisclosure();
    const { isOpen: isOpenTwo, onClose: onCloseTwo, onToggle: onToggleTwo } = useDisclosure();

    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(60); // 60-second countdown

    const isMobile = useBreakpointValue({ base: true, md: false });
    const storedEmail = localStorage.getItem('userEmail');

    const { mutateAsync: verifyEmail, isPending: isVerifyingEmail } = useEmailVerification();

    // Decrement timer
    useEffect(() => {
        if (timer <= 0) return;
        const interval = setInterval(() => setTimer((t) => t - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const formattedTime = `0:${String(timer).padStart(2, '0')}`;

    const handleVerify = async() => {
        const payload = {
            email: storedEmail,
            otp,
            userId: userDetails?.id,
        };
        try {
            await verifyEmail(payload);
            onToggleTwo();
            //onVerify();
          } catch (error) {
            console.error('Error verifying email:', error);
            // Show the error modal
            onToggleOne();
          }
    };

    const handleResend = () => {
        // Reset timer, clear OTP
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
                    textAlign={isMobile ? 'left' : 'center'}
                    mb={2}
                >
                    Email OTP Verification
                </Heading>

                <Text
                    fontSize="14px"
                    color="#475569"
                    mb={6}
                    textAlign={isMobile ? 'left' : 'center'}
                >
                    Enter the verification code we just sent to the user’s email address{' '}
                    <strong>{userEmail}</strong>. You might need to ask the user to check
                    their spam folder.
                </Text>

                {/* OTP Fields */}
                <HStack justifyContent="center" mb={6}>
                    <PinInput
                        otp
                        type="number"
                        value={otp}
                        onChange={(value) => setOtp(value)}
                        size={isMobile ? 'md' : 'lg'}
                    >
                        <PinInputField
                            borderColor="#E2E8F0"
                            _focus={{ borderColor: '#CBD5E1' }}
                            borderRadius="8px"
                            maxLength={1}
                        />
                        <PinInputField
                            borderColor="#E2E8F0"
                            _focus={{ borderColor: '#CBD5E1' }}
                            borderRadius="8px"
                            maxLength={1}
                        />
                        <PinInputField
                            borderColor="#E2E8F0"
                            _focus={{ borderColor: '#CBD5E1' }}
                            borderRadius="8px"
                            maxLength={1}
                        />
                        <PinInputField
                            borderColor="#E2E8F0"
                            _focus={{ borderColor: '#CBD5E1' }}
                            borderRadius="8px"
                            maxLength={1}
                        />
                    </PinInput>
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
                    <Text fontSize="16px" color="#C5B27D" mb={2}>
                        {formattedTime}
                    </Text>
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

                {isOpenTwo && <SuccessModal
                    isOpen={isOpenTwo}
                    onClose={onCloseTwo}
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
            </Flex>
        </>
    );
};

export default EmailOtpVerificationTemplate;

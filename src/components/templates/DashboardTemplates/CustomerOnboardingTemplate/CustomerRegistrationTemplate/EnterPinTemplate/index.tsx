'use client';

import React, { useEffect, useState } from 'react';
import {
    Box,
    Flex,
    IconButton,
    Text,
    useBreakpointValue,
    useToast,
    Heading,
    Button,
    HStack,
    useDisclosure,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import {
    PinInput,
    PinInputField,
} from '@chakra-ui/react';
import BaseButton from '../../../../../molecules/buttons/BaseButton';
import HeaderBackButton from "../../../../../molecules/buttons/HeaderBackButton";
import { usePhoneNumberVerification, useResendOTP } from 'api-services/business-registration-services';
import { useAppSelector } from '../../../../../../redux/store'; 
import FailedModal from 'components/molecules/modals/FailedModal';
import BasePinInput from "../../../../../molecules/inputs/BasePinInput";

interface EnterPinTemplateProps {
    onVerify: () => void; // Called when the user successfully enters the OTP
    onBack: () => void;
}

const EnterPinTemplate = ({
        onVerify,
        onBack,
    }: EnterPinTemplateProps) => {
    const { customerDetails } = useAppSelector(state => state.customer)
    const isMobile = useBreakpointValue({ base: true, md: false });


    const { isOpen, onOpen, onClose } = useDisclosure()

    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(60);


    const { mutateAsync: resendOTP, isPending: isResendingOTP } = useResendOTP();
    const { mutateAsync: verifyPhone, isPending: isVerifyingPhoneNumber } = usePhoneNumberVerification();
        
    useEffect(() => {
        console.log('deets', customerDetails?.id)
    }, []);
    // Decrement timer every second
    useEffect(() => {
        if (timer <= 0) return;
        const interval = setInterval(() => setTimer((t) => t - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    // Format the countdown as mm:ss (assuming under 1 minute: "0:34", etc.)
    const formattedTime = `0:${String(timer).padStart(2, '0')}`;

    const handleVerify = async() => {
        const payload = {
            phone: customerDetails?.phone,
            otp,
             userId: customerDetails?.id,
        };
        try {
            await verifyPhone(payload);
            onVerify();
          } catch (error) {
            console.error('Error verifying phone number:', error);
            // Show the error modal
            onOpen();
          }
    };

    const handleResend = async () => {
        try {
            if (!customerDetails?.phone) {
                throw('Enter a valid user phone number.');
            }
            await resendOTP({ phone: customerDetails?.phone });
            setTimer(60);
            setOtp('');
        }catch (e) {
            console.error('Error resending OTP:', e);
            // Show the error modal
            onOpen();

        }

      };
      

    return (
        <Flex direction="column" minH="100vh" bg="#F8FAFC">
            <HeaderBackButton onBack={onBack} />

            {/* Desktop "Back" outside the card */}
            {!isMobile && (
                <Box as="header" p={4}>
                    <IconButton
                        aria-label="Go back"
                        icon={<ArrowBackIcon />}
                        variant="ghost"
                        onClick={onBack}
                    />
                </Box>
            )}

            {/* Main Content */}
            <Box px={4} pt={4} pb={8}>
                <Box
                    bg="white"
                    width={isMobile ? '100%' : '600px'}
                    mx="auto" /* centers horizontally */
                    borderRadius="8px"
                    boxShadow={isMobile ? 'none' : 'md'}
                    p={isMobile ? 4 : 8}
                >
                    <Text
                        letterSpacing={'-1.2%'}
                        variant={'head'}
                        textAlign={{
                            base: 'left',
                            md: 'center',
                        }}
                        mb={2}
                    >
                        Phone Number Verification
                    </Text>

                    <Text
                        variant={'sm'}
                        mb={6}
                        textAlign={{
                            base: 'left',
                            md: 'center',
                        }}
                    >
                        Enter the code we sent to the user’s phone number
                    </Text>

                    {/* OTP Fields */}
                    <HStack justifyContent="center" mb={6}>
                        <BasePinInput count={4} onChange={setOtp}>
                            {/* If BasePinInput expects children, you can place them here.
              If not needed, just remove this empty fragment. */}
                            <></>
                        </BasePinInput>
                    </HStack>

                    {/* Verify Button */}
                    <BaseButton
                        w="full"
                        borderRadius="8px"
                        bg={otp.length === 4 ? '#0F454F' : '#E2E8F0'}
                        color={otp.length === 4 ? 'white' : '#94A3B8'}
                        fontWeight="600"
                        isLoading={isVerifyingPhoneNumber}
                        onClick={handleVerify}
                        isDisabled={otp.length !== 4}
                        text="Verify"
                    />

                    {/* Countdown & Resend */}
                    <Flex
                        alignItems="center"
                        direction="column"
                        mt={4}
                    >
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
                                bg={'transparent'}
                                onClick={handleResend}
                                isDisabled={timer > 0} // disable resend until timer hits 0
                            >
                                Resend
                            </Button>
                        </HStack>
                    </Flex>
                </Box>
            </Box>

            {/* Failed Modal */}
            {isOpen && <FailedModal
                isOpen={isOpen}
                onClose={onClose}
                title="Error Message:"
                title2="You entered a wrong OTP. The User’s Account will be locked for 3 hours after 4 more attempts."
                //width={{ xs: "95%", lg: "843px" }}
                height="auto"
                borderRadius="8px"
                padding="24px"
                borderTopRadius={'26.81px'}
                borderBottomRadius={'26.81px'}
            />}
        </Flex>
    );
};

export default EnterPinTemplate;

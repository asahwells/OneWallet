'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    IconButton,
    Text,
    useBreakpointValue,
    HStack,
    Heading,
    Button,
    PinInput,
    PinInputField,
    useDisclosure
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import BaseButton from 'components/molecules/buttons/BaseButton';
import FailedModal from 'components/molecules/modals/FailedModal';
import { PhoneVerificationTemplateProps } from '../interfaces';
import GoBack from 'components/molecules/buttons/BackBotton';

const PhoneVerificationTemplate = ({ onNext, onBack, phoneNumber }: PhoneVerificationTemplateProps) => {
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(60); // 60 seconds countdown

    const [isResending, setIsResending] = useState(false);
    const isMobile = useBreakpointValue({ base: true, md: false });
    const { isOpen: isOpenOne, onClose: oneCloseOne, onToggle: onToggleOne } = useDisclosure();

    // Handle verification
    const handleVerify = () => {
        if (otp.length === 4) {
            // Verify the OTP here
            onNext();
        }
    };

    // Handle resend
    const handleResend = () => {
        setIsResending(true);
        
        setTimeout(() => {
            setTimer(60);
            setIsResending(false);
        }, 1000);
    };

    // Timer countdown
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    // Format timer as MM:SS
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <Flex direction="column" bg="#F8FAFC" w={'full'} minH="100vh">
            {/* Mobile Top Bar */}
            {isMobile && (
                <Flex
                    as="header"
                    alignItems="center"
                    justifyContent="center"
                    h="60px"
                    borderBottom="1px solid #E2E8F0"
                    position="relative"
                    bg="white"
                    w={'full'}
                >
                    <Text fontSize="16px" fontWeight="600">
                        Business Setup
                    </Text>
                    <GoBack onClick={onBack} />
                </Flex>
            )}

            {/* Desktop "Back" outside the card */}
            {!isMobile && (
                <HStack as="header" p={4} color={'#344256'} cursor={'pointer'} onClick={onBack}>
                    <ArrowBackIcon w={5} h={5} />
                    <Text fontSize={'16px'} fontWeight={'500'}>
                        Back
                    </Text>
                </HStack>
            )}

            {/* Main Content */}
            <Flex 
                direction="column" 
                align="center" 
                justify="flex-start" 
                pt={isMobile ? 6 : 10}
                px={4}
                maxW="600px"
                mx="auto"
                w="full"
            >
                <Box textAlign="center" mb={8} w="full">
                    <Heading
                        as="h1"
                        fontSize={isMobile ? "20px" : "24px"}
                        mb={2}
                    >
                        Customer Phone Number Verification
                    </Heading>
                    <Text fontSize="14px" color="#475569">
                        {`Enter the code we sent to the user's phone number`}
                    </Text>
                </Box>

                <HStack spacing={4} justify="center" mb={8}>
                    <PinInput 
                        size="lg" 
                        value={otp} 
                        onChange={setOtp} 
                        otp 
                        focusBorderColor="#0F454F"
                    >
                        <PinInputField 
                            w="70px"
                            h="70px"
                            borderColor="#0F454F"
                            borderRadius="8px"
                            fontSize="24px"
                            fontWeight="600"
                            color="#0F454F"
                            _focus={{ 
                                borderColor: "#0F454F",
                                boxShadow: "0 0 0 1px #0F454F"
                            }}
                        />
                        <PinInputField 
                            w="70px"
                            h="70px"
                            borderColor="#0F454F"
                            borderRadius="8px"
                            fontSize="24px"
                            fontWeight="600"
                            color="#0F454F"
                            _focus={{ 
                                borderColor: "#0F454F",
                                boxShadow: "0 0 0 1px #0F454F"
                            }}
                        />
                        <PinInputField 
                            w="70px"
                            h="70px"
                            borderColor="#0F454F"
                            borderRadius="8px"
                            fontSize="24px"
                            fontWeight="600"
                            color="#0F454F"
                            _focus={{ 
                                borderColor: "#0F454F",
                                boxShadow: "0 0 0 1px #0F454F"
                            }}
                        />
                        <PinInputField 
                            w="70px"
                            h="70px"
                            borderColor="#0F454F"
                            borderRadius="8px"
                            fontSize="24px"
                            fontWeight="600"
                            color="#0F454F"
                            _focus={{ 
                                borderColor: "#0F454F",
                                boxShadow: "0 0 0 1px #0F454F"
                            }}
                        />
                    </PinInput>
                </HStack>

                {/* Verify Button */}
                <BaseButton
                    text='Verify'
                    w="full"
                    h="48px"
                    bg="#0F454F"
                    color="white"
                    borderRadius="8px"
                    fontSize="16px"
                    fontWeight="600"
                    _hover={{ bg: "#0D3A42" }}
                    onClick={handleVerify}
                    mb={6}
                    isDisabled={otp.length !== 4}
                />

                {/* Timer */}
                <Text 
                    fontSize="16px" 
                    fontWeight="500" 
                    color="#D4B36E"
                    mb={4}
                >
                    {formatTime(timer)}
                </Text>

                {/* Resend Option */}
                <Flex align="center" justify="center">
                    <Text fontSize="14px" color="#475569" mr={2}>
                        {`Didn't Receive the code?`}
                    </Text>
                    <Button
                        variant="link"
                        color="#0F454F"
                        fontWeight="600"
                        fontSize="14px"
                        onClick={handleResend}
                        isDisabled={timer > 0 || isResending}
                        _disabled={{bg:'transparent', color: 'gray.400'}}
                        _hover={{ textDecoration: "none" }}
                    >
                        Resend
                    </Button>
                </Flex>
            </Flex>

            {/* Failed Modal */}
            {isOpenOne && <FailedModal
                isOpen={isOpenOne}
                onClose={oneCloseOne}
                title="Error Message:"
                title2="You entered a wrong OTP. The User’s Account will be locked for 3 hours after 4 more attempts."
                height="300px"
                borderRadius="8px"
                padding="24px"
                borderTopRadius={'26.81px'}
                borderBottomRadius={'26.81px'}
            />}
        </Flex>
    );
};

export default PhoneVerificationTemplate;
'use client';

import React, { useState } from 'react';
import {
    Box,
    Flex,
    IconButton,
    Text,
    useBreakpointValue,
    useToast,
    HStack,
    Heading,
    Input,
    useDisclosure
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import BaseButton from '../../../../../molecules/buttons/BaseButton';
import HeaderBackButton from "../../../../../molecules/buttons/HeaderBackButton";
import { useSendPhoneOTP } from 'api-services/business-registration-services';
import FailedModal from 'components/molecules/modals/FailedModal';

interface EnterPhoneTemplateProps {
    onNext: () => void;
    onBack: () => void;
}

const EnterPhoneTemplate = ({ onNext, onBack }: EnterPhoneTemplateProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [phoneNumber, setPhoneNumber] = useState('');
    const isMobile = useBreakpointValue({ base: true, md: false });
    const toast = useToast();

    const { mutateAsync: sendPhoneOTP, isPending: isSendingOTP } = useSendPhoneOTP();

    const handleContinue = async() => {
        if (phoneNumber.length !== 11) {
            toast({
                title: 'Invalid phone number',
                description: 'Phone number must be 11 digits',
                status: 'error',
                duration: 3000,
                isClosable: true
            });
            return;
        }
        try {
            await sendPhoneOTP({ phone: phoneNumber });

            localStorage.setItem('userPhoneNumber', phoneNumber);
    
            onNext();
          } catch (error) {
            console.error('Error sending OTP:', error);
            // Show the error modal
            onOpen();
          }
    };

    return (
        <Flex direction="column"  bg="#F8FAFC"  w={'full'}>
           <HeaderBackButton onBack={onBack} />

            {/* Main Content (Card near the top, not centered vertically) */}
            <Box px={4} pt={4} pb={8}>
                <Box
                    bg="white"
                    width={isMobile ? '100%' : '600px'}
                    mx="auto" /* Centers horizontally */
                    borderRadius="8px"
                    p={isMobile ? 4 : 8}
                    border={'0.5px solid #E2E8F0'}
                >
                    <Heading
                        as="h1"
                        fontSize={isMobile ? '20px' : '24px'}
                        textAlign={isMobile ? 'left' : 'center'}
                        mb={2}
                    >
                        Enter Phone Number of User
                    </Heading>

                    <Text
                        fontSize="14px"
                        color="#475569"
                        mb={6}
                        textAlign={isMobile ? 'left' : 'center'}
                    >
                        We will send an OTP to this number
                    </Text>

                    <Box position="relative" mb={2}>
                        <Input
                            placeholder="Enter customer's phone number"
                            maxLength={11}
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            borderRadius="8px"
                            borderColor="#E2E8F0"
                            focusBorderColor="#CBD5E1"
                            height="48px"
                            fontSize="16px"
                        />
                    </Box>

                    <HStack justifyContent="flex-end" mb={6}>
                        <Text fontSize="12px" color="#475569">
                            {phoneNumber.length}/11
                        </Text>
                    </HStack>

                    <BaseButton
                        w="full"
                        borderRadius="8px"
                        bg={phoneNumber.length === 11 ? '#0F454F' : '#E2E8F0'}
                        color={phoneNumber.length === 11 ? 'white' : '#94A3B8'}
                        fontWeight="600"
                        isLoading={isSendingOTP}
                        onClick={handleContinue}
                        isDisabled={phoneNumber.length !== 11}
                        text="Continue"
                    />
                </Box>
            </Box>
            
            {/* Failed Modal */}
            {isOpen && <FailedModal
                isOpen={isOpen}
                onClose={onClose}
                title="Error Message:"
                title2="This user is already registered on OneWallet. Kindly check the number and try again"
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

export default EnterPhoneTemplate;

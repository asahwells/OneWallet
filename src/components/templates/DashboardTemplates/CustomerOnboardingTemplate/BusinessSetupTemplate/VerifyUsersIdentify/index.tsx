'use client';

import React, { useState } from 'react';
import {
    Box,
    Flex,
    IconButton,
    Text,
    useBreakpointValue,
    HStack,
    Heading,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Center,
    Image,
    useDisclosure
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import BaseButton from 'components/molecules/buttons/BaseButton';
import ConfirmationModal from 'components/molecules/modals/ConfirmModal';
import VerifyUserIcon from 'components/atoms/icons/VerifyUserIcon';
import OutlineButton from 'components/molecules/buttons/OutlineButton';
import { useRouter } from 'next/navigation';

interface VerificationUsersTemplateProps {
    onNext: () => void;
    onBack: () => void;
}

const VerificationUsersTemplate = ({ onNext, onBack }: VerificationUsersTemplateProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter()
    
    const isMobile = useBreakpointValue({ base: true, md: false });

    const handleYesClick = () => {
        //onNext();
    };

    const handleNoClick = () => {
        onOpen();
    };

    const handleConfirm = () => {
        onClose();
        router.replace('/admin/dashboard/business/customer-onboarding')
    };

    const handleGoBack = () => {
        onClose();
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
                    <IconButton
                        aria-label="Go back"
                        icon={<ArrowBackIcon />}
                        variant="ghost"
                        position="absolute"
                        left="16px"
                        onClick={onBack}
                    />
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
                justify="center" 
                flex="1" 
                px={4} 
                py={7}
            >
                <Box 
                    maxW="600px" 
                    w="full" 
                    textAlign="center"
                >
                    {/* Politician Icon */}
                    <Center mb={6}>
                        <VerifyUserIcon />
                    </Center>

                    <Heading
                        as="h1"
                        fontSize={isMobile ? "20px" : "24px"}
                    >
                        Your Consent
                    </Heading>

                    <Heading
                        as="h1"
                        fontSize={isMobile ? "20px" : "24px"}
                        mb={4}
                    >
                        {`OneWallet is helping Verify User's Identity and prevent fraud. `}
                    </Heading>

                    <Text
                        variant={'sm'}
                        lineHeight={'22px'}
                        mb={2}
                        maxW="600px"
                        mx="auto"
                    >
                        OneWallet will create an account for the customer using the information provided. 
                    </Text>

                    <Text
                        variant={'sm'}
                        lineHeight={'22px'}
                        mb={5}
                        maxW="600px"
                        mx="auto"
                    >
                        You are required to explain to the customer what this step entails before proceeding. The customer is required to provide you with an OTP to grant consent
                    </Text>

                    <Flex 
                        direction="column" 
                        gap={4} 
                        maxW="600px" 
                        mx="auto"
                    >
                        <BaseButton
                            text='Customer has granted consent, Proceed'
                            h="48px"
                            w="full"
                            bg="#0F454F"
                            color="white"
                            borderRadius="8px"
                            fontSize="16px"
                            fontWeight="600"
                            _hover={{ bg: "#0D3A42" }}
                            onClick={handleYesClick}
                        />
                        
                        <OutlineButton
                            text='Customer did not grant consent'
                            h="48px"
                            w="full"
                            bg="white"
                            color="#EF4444"
                            borderRadius="8px"
                            fontSize="16px"
                            fontWeight="600"
                            border="1px solid #EF4444"
                            
                            onClick={handleNoClick}
                        />
                    </Flex>
                </Box>
            </Flex>

            {/* Confirmation Modal */}
            {isOpen &&
                <ConfirmationModal 
                isOpen={isOpen} 
                onClose={onClose}
                color='#EF4444'
                border="1px solid #EF4444" 
                title='Are you sure?'
                subTitle='Are you sure you want to decline?If you decline, you will be taken back to re-enter your information.'
                primaryButtonText='No, Go Back'
                secondaryButtonText='Yes, Decline'
                onPrimaryAction={handleGoBack}
                onSecondaryAction={handleConfirm}
            />}
        </Flex>
    );
};

export default VerificationUsersTemplate;
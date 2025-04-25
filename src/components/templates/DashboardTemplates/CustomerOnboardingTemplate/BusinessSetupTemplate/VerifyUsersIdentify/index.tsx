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
import { VerificationUsersTemplateProps } from '../interfaces';
import HeaderBackButton from 'components/molecules/buttons/HeaderBackButton';

const VerificationUsersTemplate = ({ onNext, onBack }: VerificationUsersTemplateProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter()
    
    const isMobile = useBreakpointValue({ base: true, md: false });

    const handleYesClick = () => {
        onNext();
    };

    const handleNoClick = () => {
        onOpen();
    };

    const handleConfirm = () => {
        onClose();
        router.replace('/admin/dashboard/')
    };

    const handleGoBack = () => {
        onClose();
    };

    return (
        <Flex direction="column" bg="#F8FAFC" w={'full'} minH="100vh">
            <HeaderBackButton onBack={onBack} header='Business Setup' />

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

                    <Text
                        letterSpacing={'-1.2%'}
                        variant={'head'}
                        lineHeight={'24px'}
                        mb={2}
                    >
                        Your Consent
                    </Text>

                    <Text
                        letterSpacing={'-1.2%'}
                        fontWeight={700}
                        fontSize={{base: '14px', lg:'16px'}}
                        color={'#344256'}
                        lineHeight={'22px'}
                    >
                        {`OneWallet is helping Verify User's Identity and prevent fraud. `}
                    </Text>

                    <Text
                        variant={'sm'}
                        lineHeight={'22px'}
                        mb={2}
                        maxW="600px"
                        mx="auto"
                        textAlign={'justify'}
                    >
                        OneWallet will create an account for the customer using the information provided. 
                    </Text>

                    <Text
                        variant={'sm'}
                        lineHeight={'22px'}
                        mb={5}
                        maxW="600px"
                        mx="auto"
                        textAlign={'justify'}
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
                subTitle='Are you sure you want to decline? If you decline, you will be taken back to re-enter your information.'
                primaryButtonText='No, Go Back'
                secondaryButtonText='Yes, Decline'
                onPrimaryAction={handleGoBack}
                onSecondaryAction={handleConfirm}
            />}
        </Flex>
    );
};

export default VerificationUsersTemplate;
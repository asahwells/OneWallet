'use client';

import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Text,
    Button,
    Center,
    VStack,
    Spinner,
    Icon,
    Stack,
    Flex
} from '@chakra-ui/react';
import { CheckCircleIcon, WarningTwoIcon } from '@chakra-ui/icons';
import {VerificationModalProps} from "../interfaces";
import ErrorIcon from "../../../atoms/icons/ErrorIcon";
import SuccessIcon from "../../../atoms/icons/SuccessIcon";
import BaseButton from "../../buttons/BaseButton";


const VerificationModal = ({
                                                                 isOpen,
                                                                 onClose,
                                                                 status,
                                                                 onPrimaryAction
                                                             }: VerificationModalProps) => {
    // For illustration, we define some text based on status
    let title = '';
    let description = '';
    let primaryBtnText = '';
    let iconContent: React.ReactNode = null;



    switch (status) {
        case 'PENDING':
            title = 'Processing user\'s selfie';
            description = 'This will only take a moment ....';
            // primaryBtnText = 'I’ll Wait'; // or you can hide the button
            iconContent = <Spinner size="xl" color="#C5B27D" />;
            break;

        case 'FAIL':
            title = 'Error Message';
            description = 'We were not able to take your Selfie.';
            primaryBtnText = 'Try Again';
            iconContent = <Icon as={ErrorIcon} w={16} h={16} color="red.500" />;
            break;

        case 'SUCCESS':
            title = 'Selfie Capture Complete';
            description = 'You’ve been successfully captured; you can now proceed.';
            primaryBtnText = 'Continue';
            iconContent = <SuccessIcon />
            break;
    }

    if(!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
            <ModalOverlay />
                <ModalContent
                        borderRadius="26.81px"
                        boxShadow="xl"
                        maxW={'700px'}
                        w="full"
                        borderTopRadius={'26.81px'}
                        borderBottomRadius={'26.81px'}
                        position="relative"
                        pb={4}
                        mx={4}
                    >
                       <ModalCloseButton
                              color="#475569"
                              _focus={{ boxShadow: 'none' }}
                              _hover={{ bg: '#F1F5F9' }}
                              display={{ base: 'none', md: 'flex' }}
                            />
                    <ModalHeader p={{ md: '20px' }}>
                    <Stack w={'full'} alignItems={'center'}>
                        <Flex
                        justify={{ base: 'space-between', md: 'center' }}
                        align="center"
                        w="100%"
                        position="relative"
                        >
                            {iconContent}

                        <ModalCloseButton
                            position="relative"
                            top="unset"
                            right="unset"
                            display={{ base: 'inline-block', md: 'none' }}
                        />
                        </Flex>
                    </Stack>
                </ModalHeader>
                <ModalBody>
                    <VStack spacing={4}>
                        <Text  variant={'md'} w={'full'} fontWeight={600} color="#475569" textAlign={{base: 'start', lg: 'center'}}>
                            {title}
                        </Text>

                        <Text textAlign="start" variant={'sm'}>
                            {description}
                        </Text>
                    </VStack>
                </ModalBody>
                <ModalFooter justifyContent="center">
                    {primaryBtnText && (
                        <BaseButton
                            variant={'brand'}
                            width={{base: "full", md: "458px"}}
                            h={"56px"}
                            text={primaryBtnText}
                            borderRadius="8px"
                            onClick={onPrimaryAction || onClose}
                        />
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default VerificationModal;

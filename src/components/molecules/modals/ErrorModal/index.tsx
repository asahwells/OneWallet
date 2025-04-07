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
    useBreakpointValue,
    VStack
} from '@chakra-ui/react';
import {ErrorModalProps} from "../interfaces";
import ErrorIcon from 'components/atoms/icons/ErrorIcon';


const ErrorModal = ({
    isOpen,
    onClose,
    errorMessage = "BVN is already linked to an existing account. Please use User's correct BVN or proceed to login.",
    ...props
    }: ErrorModalProps) => {
    // Use a smaller size on mobile, larger on desktop
    const modalSize = useBreakpointValue({ base: 'xs', md: 'md' });

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={modalSize}>
            <ModalOverlay />
            <ModalContent {...props} borderRadius="8px">
                {/* Header */}
                {/* <ModalHeader
                    fontSize="18px"
                    fontWeight="700"
                    color="#344256"
                    textAlign="center"
                >
                    Error Message
                </ModalHeader> */}
                <ModalCloseButton
                    color="#475569"
                    _focus={{ boxShadow: 'none' }}
                    _hover={{ bg: '#F1F5F9' }}
                />

                {/* Body */}
                <ModalBody pb={4}>
                <VStack alignItems={{base:'flex-start', md: 'center'}} position={'relative'}>
                    <ErrorIcon />
                    <Text fontSize="16px" fontWeight={500} lineHeight="24.63px" letterSpacing="-1.2%" color="#344256">
                        Error Message:
                    </Text>
                    <Text
                        fontSize="14px" textAlign={{base: 'left', md: 'center'}} fontWeight={400} lineHeight="22px" letterSpacing="-1%" color="#222B38"
                    >
                        {errorMessage}
                    </Text>
                </VStack>
                    {/* Footer */}
                    <Button
                        onClick={onClose}
                        variant="outline"
                        borderColor="#E70D0D"
                        color="#E70D0D"
                        _hover={{ bg: '#FEE2E2' }}
                        borderRadius="8px"
                        h={'57.63px'}
                        w={'full'}
                        mt={'30px'}
                    >
                        Dismiss
                    </Button>
                </ModalBody>

            </ModalContent>
        </Modal>
    );
};

export default ErrorModal;

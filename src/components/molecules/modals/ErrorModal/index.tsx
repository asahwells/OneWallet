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
    useBreakpointValue
} from '@chakra-ui/react';
import {ErrorModalProps} from "../interfaces";


const ErrorModal = ({
                                                   isOpen,
                                                   onClose,
                                                   errorMessage = "BVN is already linked to an existing account. Please use User's correct BVN or proceed to login."
                                               }: ErrorModalProps) => {
    // Use a smaller size on mobile, larger on desktop
    const modalSize = useBreakpointValue({ base: 'xs', md: 'md' });

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={modalSize}>
            <ModalOverlay />
            <ModalContent borderRadius="8px">
                {/* Header */}
                <ModalHeader
                    fontSize="18px"
                    fontWeight="700"
                    color="#344256"
                    textAlign="center"
                >
                    Error Message
                </ModalHeader>
                <ModalCloseButton
                    color="#475569"
                    _focus={{ boxShadow: 'none' }}
                    _hover={{ bg: '#F1F5F9' }}
                />

                {/* Body */}
                <ModalBody pb={4}>
                    <Text
                        fontSize="14px"
                        fontWeight="400"
                        color="#344256"
                        textAlign="center"
                    >
                        {errorMessage}
                    </Text>
                </ModalBody>

                {/* Footer */}
                <ModalFooter justifyContent="center">
                    <Button
                        onClick={onClose}
                        variant="outline"
                        borderColor="#E70D0D"
                        color="#E70D0D"
                        _hover={{ bg: '#FEE2E2' }}
                        borderRadius="8px"
                    >
                        Dismiss
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ErrorModal;

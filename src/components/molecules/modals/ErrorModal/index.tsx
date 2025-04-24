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
    VStack,
    Flex
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
        <ModalContent borderRadius="26.81px" boxShadow="xl" maxW={"700px"} w="full" borderTopRadius={'26.81px'} borderBottomRadius={'26.81px'} position="relative" pb={4} mx={4}>
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
                    display={{base: 'none', md: 'flex'}}
                />

                {/* Body */}
                <ModalBody p={{md: '20px'}}>
                    <VStack align="center">
                <VStack alignItems={{base:'flex-start', md: 'center'}} position={'relative'}>
                <Flex 
              justify={{base: "space-between", md: "center"}} 
              align="center"
              w="100%"
              position="relative"
            >
              <ErrorIcon />
              
              <ModalCloseButton 
                position="relative"
                top="unset" 
                right="unset"
                display={{base: 'inline-block', md: 'none'}}
              />
            </Flex>
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
                        w={{base: 'full', md: '458px'}}
                        mt={'30px'}
                    >
                        Dismiss
                    </Button>
                    </VStack>
                </ModalBody>

            </ModalContent>
        </Modal>
    );
};

export default ErrorModal;

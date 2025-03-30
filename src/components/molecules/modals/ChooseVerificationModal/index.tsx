'use client';

import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalHeader,
    Flex,
    Text,
    useBreakpointValue,
    Icon,
    VStack, Stack,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {ChooseVerificationModalProps} from "../interfaces";
import InfoIcon from "../../../atoms/icons/InfoIcon";


const ChooseVerificationModal = ({
                                                                             isOpen,
                                                                             onClose,
                                                                             onChooseCamera,
                                                                             onChooseUpload,
                                                                         }: ChooseVerificationModalProps) => {
    // Adjust size on mobile vs. desktop
    const modalSize = useBreakpointValue({ base: 'xs', md: 'md' });

    if(!isOpen) return null;

    return (

        <Modal isOpen={isOpen} onClose={onClose} isCentered size={modalSize}>
            <ModalOverlay />
            <ModalContent borderRadius="8px">
                <ModalCloseButton />
                <ModalHeader
                >

                   <Stack w={'full'} alignItems={'center'}>
                       <InfoIcon />

                       <Text variant={'md'} textAlign={'center'}>
                           Select how to continue Photo Verification
                       </Text>
                   </Stack>
                </ModalHeader>

                <ModalBody pb={6}>
                    <VStack spacing={4} align="stretch">

                        {/* Option 1: With Camera */}
                        <Flex
                            as="button"
                            onClick={onChooseCamera}
                            justifyContent="space-between"
                            alignItems="center"
                            bg="white"
                            borderBottom="1px solid #E2E8F0"
                            px={4}
                            py={3}
                            cursor={'pointer'}
                        >
                            <Text variant={'base'}>
                                With Camera
                            </Text>
                            <Icon as={ChevronRightIcon} color="#344256"  w={6} h={6}  />
                        </Flex>

                        {/* Option 2: Upload an attachment */}
                        <Flex
                            as="button"
                            onClick={onChooseUpload}
                            justifyContent="space-between"
                            alignItems="center"
                            bg="white"
                            px={4}
                            py={3}
                            cursor={'pointer'}
                        >
                            <Text variant={'base'}>
                                Upload an attachment
                            </Text>
                            <Icon as={ChevronRightIcon} color="#344256" w={6} h={6} />
                        </Flex>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ChooseVerificationModal;

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
import { ArrowBackIcon, QuestionIcon } from '@chakra-ui/icons';
import BaseButton from 'components/molecules/buttons/BaseButton';
import PoliticalPersonIcon from 'components/atoms/icons/PoliticalPersonIcon';
import ConfirmationModal from 'components/molecules/modals/ConfirmModal';

interface PepVerificationTemplateProps {
    onNext: () => void;
    onBack: () => void;
}

const PepVerificationTemplate = ({ onNext, onBack }: PepVerificationTemplateProps) => {
    const [isPep, setIsPep] = useState<boolean | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const isMobile = useBreakpointValue({ base: true, md: false });

    const handleYesClick = () => {
        //setIsPep(true);
        onOpen();
    };

    const handleNoClick = () => {
        setIsPep(false);
        onNext();
    };

    const handleConfirm = () => {
        onClose();
    };

    const handleGoBack = () => {
        onClose();
        setIsPep(null);
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
                py={isMobile ? 6 : 10}
            >
                <Box 
                    maxW="600px" 
                    w="full" 
                    textAlign="center"
                >
                    {/* Politician Icon */}
                    <Center mb={6}>
                        <PoliticalPersonIcon />
                    </Center>

                    <Heading
                        as="h1"
                        fontSize={isMobile ? "20px" : "24px"}
                        mb={4}
                    >
                        Is the customer a Politically Exposed Person?
                    </Heading>

                    <Text
                        fontSize="14px"
                        color="#475569"
                        mb={10}
                        maxW="600px"
                        mx="auto"
                    >
                        A Politically Exposed Person (PEP) is a high-profile individual who holds or has previously held a prominent political position or public office.
                    </Text>

                    <Flex 
                        direction="column" 
                        gap={4} 
                        maxW="600px" 
                        mx="auto"
                    >
                        <BaseButton
                            text='Yes'
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
                        
                        <BaseButton
                            text='No'
                            h="48px"
                            w="full"
                            bg="white"
                            color="#344256"
                            borderRadius="8px"
                            fontSize="16px"
                            fontWeight="600"
                            border="1px solid #E2E8F0"
                            _hover={{ bg: "#F8FAFC" }}
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
                title='Politically Exposed Person'
                subTitle='You have indicated that the customer is a politically exposed person, is that correct?'
                primaryButtonText='Yes, Confirm'
                secondaryButtonText='No, Go Back'
                onPrimaryAction={handleGoBack}
                onSecondaryAction={handleConfirm}
            />}
        </Flex>
    );
};

export default PepVerificationTemplate;
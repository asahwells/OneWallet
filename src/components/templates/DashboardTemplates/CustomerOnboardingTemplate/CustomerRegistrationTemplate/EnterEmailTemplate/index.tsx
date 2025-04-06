'use client';

import React, { useState } from 'react';
import {
    Box,
    Flex,
    Text,
    IconButton,
    Heading,
    Button,
    useBreakpointValue,
    VStack,
    useDisclosure,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import BaseInput from 'components/molecules/inputs/BaseInput';
import HeaderBackButton from "../../../../../molecules/buttons/HeaderBackButton";
import { useAddAddress, useAddEmail } from 'api-services/business-registration-services';
import { useAppSelector } from '../../../../../../redux/store'; 
import FailedModal from 'components/molecules/modals/FailedModal';

interface EnterEmailTemplateProps {
    onNext: (email: string) => void;
    onSkip: () => void;
    onBack?: () => void;
}

const EnterEmailTemplate: React.FC<EnterEmailTemplateProps> = ({
        onNext,
        onSkip,
        onBack,
    }) => {
    const { userDetails } = useAppSelector(state => state.user)
    const [email, setEmail] = useState('');

    const { isOpen, onOpen, onClose } = useDisclosure()
    const isMobile = useBreakpointValue({ base: true, md: false });

    const { mutateAsync: addEmail, isPending: isAddingEmail } = useAddEmail();

    // Simple email validation (optional)
    const isValidEmail = email.match(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    );

    const handleContinue = async() => {
        const payload ={
            email,
            userId: userDetails?.id,
        };
        try {
            await addEmail(payload);

            localStorage.setItem('userEmail', email);

            //onNext();
            } catch (error) {
            console.error('Error sending OTP:', error);
            // Show the error modal
            onOpen();
            }
    };

    return (
        <>
            <HeaderBackButton onBack={onBack} />

            {/* Main Card */}
            <Flex
                direction="column"
                bg="white"
                p={isMobile ? 4 : 8}
                borderRadius="8px"
                boxShadow={isMobile ? 'none' : 'md'}
                w={isMobile ? '100%' : '600px'}
                mx="auto"
                mt={4}
            >
                {/* Heading */}
                <Heading
                    as="h1"
                    fontSize="18px"
                    fontWeight="700"
                    textAlign={isMobile ? 'left' : 'center'}
                    mb={2}
                >
                    Enter User’s Email
                </Heading>

                <Text
                    fontSize="14px"
                    color="#475569"
                    mb={6}
                    textAlign={isMobile ? 'left' : 'center'}
                >
                    Provide user’s email address
                </Text>

                {/* Email Input */}
                <VStack spacing={6}>
                    <BaseInput
                        placeholder="Enter User’s Email address"
                        value={email}
                        onChange={(e: any) => setEmail(e.target.value)}
                        h="56px"
                    />
                </VStack>

                {/* Continue Button */}
                <Button
                    mt={9}
                    w="full"
                    h="48px"
                    borderRadius="8px"
                    bg={isValidEmail ? '#0F454F' : '#E2E8F0'}
                    color={isValidEmail ? 'white' : '#94A3B8'}
                    fontWeight="600"
                    isLoading={isAddingEmail}
                    onClick={handleContinue}
                    isDisabled={!isValidEmail}
                >
                    Continue
                </Button>

                {/* Skip Button */}
                <Button
                    mt={4}
                    variant="outline"
                    w="full"
                    h="48px"
                    borderRadius="8px"
                    borderColor="#CBD5E1"
                    color="#344256"
                    onClick={onSkip}
                >
                    Skip
                </Button>

                {/* Failed Modal */}
                {isOpen && <FailedModal
                    isOpen={isOpen}
                    onClose={onClose}
                    title="Error Message:"
                    title2="Email is not correct"
                    //width={{ xs: "95%", lg: "843px" }}
                    height="auto"
                    borderRadius="8px"
                    padding="24px"
                    borderTopRadius={'26.81px'}
                    borderBottomRadius={'26.81px'}
                />}
            </Flex>
        </>
    );
};

export default EnterEmailTemplate;

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
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import BaseInput from 'components/molecules/inputs/BaseInput';
import HeaderBackButton from "../../../../../molecules/buttons/HeaderBackButton";

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
    const [email, setEmail] = useState('');
    const isMobile = useBreakpointValue({ base: true, md: false });

    // Simple email validation (optional)
    const isValidEmail = email.match(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    );

    const handleContinue = () => {
        if (isValidEmail) {
            onNext(email);
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
            </Flex>
        </>
    );
};

export default EnterEmailTemplate;

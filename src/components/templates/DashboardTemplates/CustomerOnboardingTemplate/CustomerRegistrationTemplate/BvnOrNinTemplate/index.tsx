'use client';

import React, { useState } from 'react';
import {
    Box,
    Flex,
    IconButton,
    Text,
    useBreakpointValue,
    Heading,
    Input,
    HStack,
    Checkbox,
    Button,
    Link
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import BaseButton from "../../../../../molecules/buttons/BaseButton";

interface BvnOrNinTemplateProps {
    onVerify: (type: 'BVN' | 'NIN', value: string) => void; // callback with user input
    onBack: () => void;
}

const BvnOrNinTemplate: React.FC<BvnOrNinTemplateProps> = ({ onVerify, onBack }) => {
    const [selectedOption, setSelectedOption] = useState<'BVN' | 'NIN'>('BVN');
    const [inputValue, setInputValue] = useState('');
    const [hasAgreed, setHasAgreed] = useState(false);

    const isMobile = useBreakpointValue({ base: true, md: false });

    // If "BVN" is selected => max length = 10, else 11 for "NIN"
    const isBvn = selectedOption === 'BVN';
    const maxLength = isBvn ? 10 : 11;

    // The button label changes depending on the selection
    const buttonLabel = isBvn ? 'Verify BVN' : 'Verify NIN';

    // Button is enabled only if length matches and checkbox is checked
    const isButtonDisabled = inputValue.length !== maxLength || !hasAgreed;

    const handleVerify = () => {
        if (!isButtonDisabled) {
            onVerify(selectedOption, inputValue);
        }
    };

    return (
        <Flex direction="column" minH="100vh" bg="#F8FAFC">
            {/* Mobile Top Bar */}
            {isMobile ? (
                <Flex
                    as="header"
                    alignItems="center"
                    justifyContent="center"
                    h="60px"
                    borderBottom="1px solid #E2E8F0"
                    position="relative"
                    bg="white"
                >
                    <Text fontSize="16px" fontWeight="600">
                        Register a User
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
            ) : (
                // Desktop: Back button outside the card
                <Box as="header" p={4}>
                    <IconButton
                        aria-label="Go back"
                        icon={<ArrowBackIcon />}
                        variant="ghost"
                        onClick={onBack}
                    />
                </Box>
            )}

            {/* Main Content */}
            <Box px={4} pt={4} pb={8}>
                <Box
                    bg="white"
                    width={isMobile ? '100%' : '600px'}
                    mx="auto"
                    borderRadius="8px"
                    boxShadow={isMobile ? 'none' : 'md'}
                    p={isMobile ? 4 : 8}
                >
                    <Heading
                        fontSize="18px"
                        fontWeight="700"
                        textAlign={isMobile ? 'left' : 'center'}
                        mb={2}
                        color="#222B38"
                    >
                        Enter User’s BVN or NIN
                    </Heading>

                    <Text
                        fontSize="14px"
                        fontWeight="400"
                        color="#344256"
                        mb={8}
                        textAlign={isMobile ? 'left' : 'center'}
                    >
                        Please provide either the User’s BVN or NIN Number
                    </Text>

                    {/* Toggle Switch (BVN / NIN) */}
                    <Text
                        fontSize="16px"
                        fontWeight="500"
                        mt={6}
                        mb={2}
                        textAlign={isMobile ? 'left' : 'center'}
                    >
                        Select Either BVN or NIN
                    </Text>

                    {/*
            Pill container with #CBD5E1 background.
            Inside, two "tabs" for BVN and NIN.
          */}
                    <HStack
                        bg="#CBD5E1"
                        borderRadius="8px"
                        p="4px"
                        mb={4}
                        spacing={0}
                    >
                        {/* BVN Tab */}
                        <Box
                            as="button"
                            flex="1"
                            textAlign="center"
                            py={2}
                            borderRadius="8px"
                            bg={selectedOption === 'BVN' ? 'white' : 'transparent'}
                            color={selectedOption === 'BVN' ? '#0F454F' : '#344256'}
                            fontWeight="600"
                            onClick={() => {
                                setSelectedOption('BVN');
                                setInputValue(''); // reset input
                            }}
                        >
                            BVN
                        </Box>

                        {/* NIN Tab */}
                        <Box
                            as="button"
                            flex="1"
                            textAlign="center"
                            py={2}
                            borderRadius="8px"
                            bg={selectedOption === 'NIN' ? 'white' : 'transparent'}
                            color={selectedOption === 'NIN' ? '#0F454F' : '#344256'}
                            fontWeight="600"
                            onClick={() => {
                                setSelectedOption('NIN');
                                setInputValue(''); // reset input
                            }}
                        >
                            NIN
                        </Box>
                    </HStack>

                    {/* Input Field */}
                    <Box position="relative" mb={2}>
                        <Input
                            placeholder={isBvn ? "Enter User's BVN" : "Enter User's NIN"}
                            maxLength={maxLength}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            borderRadius="8px"
                            borderColor="#E2E8F0"
                            focusBorderColor="#CBD5E1"
                            height="48px"
                            fontSize="16px"
                        />
                    </Box>

                    {/* Character Count */}
                    <HStack justifyContent="flex-end" mb={0}>
                        <Text fontSize="12px" color="#344256">
                            {inputValue.length}/{maxLength}
                        </Text>
                    </HStack>

                    {/* Terms & Conditions Section (gray background, top border radius) */}
                    <Box
                        mt={6}
                        p={4}
                    >
                        <HStack alignItems="flex-start" spacing={2}>
                            <Checkbox
                                colorScheme="teal"
                                size="md"
                                isChecked={hasAgreed}
                                onChange={(e) => setHasAgreed(e.target.checked)}
                                mt={1}
                            />
                            <Text fontSize="14px" color="#344256" lineHeight="20px">
                                This user has read and agreed to OneWallet{' '}
                                <Link color="#0F454F" textDecoration="underline">
                                    Terms & Conditions
                                </Link>{' '}
                                and{' '}
                                <Link color="#0F454F" textDecoration="underline">
                                    Privacy Policy
                                </Link>.
                            </Text>
                        </HStack>
                    </Box>

                    {/* Verify Button */}
                    <Box mt={4}>
                        <BaseButton
                            width="100%"
                            height="48px"
                            borderRadius="8px"
                            bg={!isButtonDisabled ? '#0F454F' : '#E2E8F0'}
                            color={!isButtonDisabled ? 'white' : '#94A3B8'}
                            fontWeight="600"
                            onClick={handleVerify}
                            isDisabled={isButtonDisabled}
                            text=   {buttonLabel}
                        />


                    </Box>
                </Box>
            </Box>

            {/* Footer (Logos or text, if needed) */}
            <Flex
                pos="absolute"
                bottom={20}
                w="full"
                mt="auto"
                py={2}
                justifyContent="center"
                alignItems="center"
                bg="transparent"
            >
                {/* Example placeholder for your footer logos or text */}
                <HStack>
                    {/* Some logo SVG */}
                    <Box as="span">[LOGO]</Box>
                    <Text fontSize="12px" color="#344256" fontWeight="500" mt={1}>
                        Licensed by the CBN and insured by the NDIC
                    </Text>
                </HStack>
            </Flex>
        </Flex>
    );
};

export default BvnOrNinTemplate;

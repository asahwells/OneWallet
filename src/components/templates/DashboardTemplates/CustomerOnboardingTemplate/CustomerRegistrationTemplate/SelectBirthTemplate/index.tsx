// DateOfBirthTemplate.tsx
'use client';

import React, { useState } from 'react';
import {
    Box,
    Flex,
    IconButton,
    Text,
    useBreakpointValue,
    Heading,
    Button,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomDateInput from "../../../../../molecules/inputs/CustomDateInput";
import HeaderBackButton from "../../../../../molecules/buttons/HeaderBackButton";
import { useAddDateOfBirth } from 'api-services/business-registration-services';
import { useAppSelector } from '../../../../../../redux/store'; 

interface SelectBirthtemplateProps {
    onNext: () => void;
    onBack: () => void;
}

const SelectBirthTemplate = ({ onNext, onBack }: SelectBirthtemplateProps) => {
    const { userDetails } = useAppSelector(state => state.user)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const isMobile = useBreakpointValue({ base: true, md: false });

    const { mutateAsync: addDOB, isPending } = useAddDateOfBirth();

    const handleContinue = async () => {
        if (!selectedDate) return;
        const formattedDate = selectedDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD

        const payload = {
            dob: formattedDate,
            userId: userDetails?.id,
        };

        try {
            await addDOB(payload);
            onNext(); // Proceed to the next step
        } catch (error) {
            console.error('Error adding date of birth:', error);
        }
    };

    return (
        <Flex direction="column" minH="100vh" bg="#F8FAFC">
            <HeaderBackButton onBack={onBack} />

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
                        as="h1"
                        fontSize={isMobile ? '20px' : '24px'}
                        textAlign={isMobile ? 'left' : 'center'}
                        mb={2}
                    >
                        Enter Date of Birth
                    </Heading>
                    <Text
                        fontSize="14px"
                        color="#475569"
                        mb={6}
                        textAlign={isMobile ? 'left' : 'center'}
                    >
                        Please select your date of birth
                    </Text>

                    {/* Date Picker using custom input */}
                    <Box mb={6}>
                        <ReactDatePicker
                            selected={selectedDate}
                            onChange={(date: Date) => setSelectedDate(date)}
                            placeholderText="DD/MM/YYYY"
                            dateFormat="dd/MM/yyyy"
                            popperPlacement="bottom"
                            customInput={<CustomDateInput />}
                        />
                    </Box>

                    <Button
                        width="100%"
                        height="48px"
                        borderRadius="8px"
                        bg={selectedDate ? '#0F454F' : '#E2E8F0'}
                        color={selectedDate ? 'white' : '#94A3B8'}
                        fontWeight="600"
                        isLoading={isPending}
                        onClick={handleContinue}
                        isDisabled={!selectedDate}
                    >
                        Continue
                    </Button>
                </Box>
            </Box>
        </Flex>
    );
};

export default SelectBirthTemplate;

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
import {useDispatch} from "react-redux";
import {setCustomer} from "../../../../../../redux/slices/customer";
import { TagLabel } from '@chakra-ui/react';

interface SelectBirthtemplateProps {
    onNext: () => void;
    onBack: () => void;
}

const SelectBirthTemplate = ({ onNext, onBack }: SelectBirthtemplateProps) => {
    const dispatch = useDispatch()
    const { customerDetails } = useAppSelector(state => state.customer)

    const [selectedDate, setSelectedDate] = useState<Date | null>(customerDetails?.dob ? new Date(customerDetails.dob) : null);
    const isMobile = useBreakpointValue({ base: true, md: false });

    const { mutateAsync: addDOB, isPending } = useAddDateOfBirth();

    const handleContinue = async () => {
        if (!selectedDate) return;
        const formattedDate = selectedDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD

        const payload = {
            dob: formattedDate,
            userId: customerDetails?.id,
        };

        try {
            await addDOB(payload);
            dispatch(setCustomer({
                ...customerDetails,
                dob: formattedDate,
            }))
            onNext(); // Proceed to the next step
        } catch (error) {
            console.error('Error adding date of birth:', error);
        }
    };

    return (
        <Flex direction="column" minH="100vh" bg="#F8FAFC">
            <HeaderBackButton onBack={onBack} />

            {/* Main Content */}
            <Box px={{base: 0, md: 4}} pt={4} pb={8}>
                <Box
                    bg={{base: "", md: "white"}}
                    width={isMobile ? '100%' : '941px'}
                    mx="auto"
                    borderRadius="8px"
                    boxShadow={isMobile ? 'none' : 'md'}
                    p={isMobile ? 4 : 8}
                >
                    <Text
                        letterSpacing={'-1.2%'}
                        variant={'head'}
                        textAlign={{
                            base: 'left',
                            md: 'center',
                        }}
                        mb={2}
                    >
                        Enter Date of Birth
                    </Text>
                    <Text
                        variant={'sm'}
                        mb={6}
                        textAlign={{
                            base: 'left',
                            md: 'center',
                        }}
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

// DateOfBirthTemplate.tsx
'use client';

import React, { useState } from 'react';
import {
    Box,
    Flex,
    Text,
    useBreakpointValue,
    useDisclosure,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverBody,
    Heading,
    Button,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';

import CustomDateInput from 'components/molecules/inputs/CustomDateInput';
import HeaderBackButton from 'components/molecules/buttons/HeaderBackButton';
import BaseButton from 'components/molecules/buttons/BaseButton';
import { useDispatch } from 'react-redux';
import { useAddDateOfBirth } from 'api-services/business-registration-services';
import {useAppSelector} from "../../../../../../redux/store";
import {setCustomer} from "../../../../../../redux/slices/customer";

interface SelectBirthtemplateProps {
    onNext: () => void;
    onBack: () => void;
}

const SelectBirthTemplate: React.FC<SelectBirthtemplateProps> = ({ onNext, onBack }) => {
    const dispatch = useDispatch();
    const { customerDetails } = useAppSelector(s => s.customer);

    const [selectedDate, setSelectedDate] = useState<Date | null>(
        customerDetails?.dob ? new Date(customerDetails.dob) : null
    );
    const isMobile = useBreakpointValue({ base: true, md: false });
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { mutateAsync: addDOB, isPending } = useAddDateOfBirth();

    const handleContinue = async () => {
        if (!selectedDate) return;
        const formatted = format(selectedDate, 'yyyy-MM-dd');
        await addDOB({ dob: formatted, userId: customerDetails?.id });
        dispatch(setCustomer({ ...customerDetails, dob: formatted }));
        onNext();
    };

    return (
        <Flex direction="column" minH="100vh" bg="#F8FAFC">
            <HeaderBackButton onBack={onBack} />

            <Box px={{ base: 4, md: 0 }} pt={4} pb={8}>
                <Box
                    bg={isMobile ? 'transparent' : 'white'}
                    maxW="941px"
                    mx="auto"
                    borderRadius="8px"
                    boxShadow={isMobile ? 'none' : 'md'}
                    p={isMobile ? 4 : 8}
                >
                    <Text variant="head" letterSpacing="-1.2%" textAlign={{ base: 'left', md: 'center' }} mb={2}>
                        Enter Date of Birth
                    </Text>
                    <Text variant="sm" mb={6} textAlign={{ base: 'left', md: 'center' }}>
                        Please select your date of birth
                    </Text>

                    {/* ↓ popover + calendar ↓ */}
                    <Box mb={6}>
                        <Popover
                            isOpen={isOpen}
                            onOpen={onOpen}
                            onClose={onClose}
                            placement="bottom-start"
                            closeOnBlur
                            isLazy
                        >
                            <PopoverTrigger>
                                <CustomDateInput
                                    placeholder="Pick a date"
                                    value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
                                    onClick={onOpen}
                                    isDisabled={false}
                                />
                            </PopoverTrigger>

                            <PopoverContent width="auto" p={0} borderRadius="8px" boxShadow="lg" >
                                <PopoverArrow />
                                <PopoverBody p={0}>
                                    <Calendar
                                        date={selectedDate ?? new Date()}
                                        onChange={(date: Date) => {
                                            setSelectedDate(date);
                                            onClose();
                                        }}
                                        // optional: prevent selecting future dates
                                        maxDate={new Date()}
                                    />
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </Box>
                    {/* ↑ end popover + calendar ↑ */}

                    <BaseButton
                        width="100%"
                        height="48px"
                        borderRadius="8px"
                        bg={selectedDate ? '#0F454F' : '#E2E8F0'}
                        color={selectedDate ? 'white' : '#94A3B8'}
                        fontWeight="600"
                        isLoading={isPending}
                        isDisabled={!selectedDate}
                        onClick={handleContinue}
                        text="Continue"
                    />
                </Box>
            </Box>
        </Flex>
    );
};

export default SelectBirthTemplate;

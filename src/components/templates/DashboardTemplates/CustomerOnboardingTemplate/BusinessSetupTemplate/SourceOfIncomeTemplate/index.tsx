'use client';

import React, { useState } from 'react';
import {
    Box,
    Flex,
    IconButton,
    Text,
    useBreakpointValue,
    useToast,
    HStack,
    Heading,
    Input,
    Radio,
    RadioGroup,
    Stack,
    Divider
} from '@chakra-ui/react';
import { ArrowBackIcon, ChevronRightIcon } from '@chakra-ui/icons';
import BaseButton from 'components/molecules/buttons/BaseButton';
import SelectField from 'components/organisms/select/SelectField';
import { SourceOfIncomeTemplateProps } from '../interfaces';
import GoBack from 'components/molecules/buttons/BackBotton';
import HeaderBackButton from 'components/molecules/buttons/HeaderBackButton';

const SourceOfIncomeTemplate = ({ onNext, onBack }: SourceOfIncomeTemplateProps) => {
    const [annualRevenue, setAnnualRevenue] = useState('');
    const [hasOtherSources, setHasOtherSources] = useState('No');
    const [otherSourceType, setOtherSourceType] = useState('Savings');
    const [otherSourceRevenue, setOtherSourceRevenue] = useState('N1 million - Less than N5 million');
    
    const isMobile = useBreakpointValue({ base: true, md: false });
    const toast = useToast();

    const handleContinue = () => {
        // Validation logic could be added here if needed
        onNext();
    };

    return (
        <Flex direction="column" bg="#F8FAFC" w={'full'}>
            <HeaderBackButton onBack={onBack} header='Business Setup' />

            {/* Main Content */}
            <Box px={4} pt={4} pb={8}>
                <Box
                    bg="white"
                    width={isMobile ? '100%' : '600px'}
                    mx="auto"
                    borderRadius="8px"
                    p={isMobile ? 4 : 8}
                    border={'0.5px solid #E2E8F0'}
                >
                    <Box w={'full'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                        <Heading
                            as="h1"
                            fontSize={'18px'}
                            fontWeight={'700'}
                            mb={2}
                            color={"#222B38"}
                        >
                            Source of Income
                        </Heading>

                        <Text
                            variant={'sm'}
                            mb={6}
                        >
                            Please provide the details of the customer&apos;s business income
                        </Text>
                    </Box>

                    {/* Annual Revenue Section */}
                    <Box mb={6}>
                        <Text variant={'base'} mb={2}>
                            What is the customer&apos;s expected gross annual revenue?
                        </Text>  

                        <SelectField label="Select anual income" type="select" placeholder="Select anual income" options={[
                            { label: 'Less than N50,000', value: 'Less than N50,000' }, 
                            { label: 'N51,000 - 250,000', value: 'N51,000 - 250,000' }, 
                            { label: 'N251,000 - N500,000', value: 'N251,000 - N500,000' },
                            { label: 'N501,000 - Less than N1 million', value: 'N501,000 - Less than N1 million' }, 
                            { label: 'N1 million - Less than N5 million', value: 'N1 million - Less than N5 million' }, 
                            { label: 'N5 million - Less than N10 million', value: 'N5 million - Less than N10 million' },
                            { label: 'N10 million - Less than N20 million', value: 'N10 million - Less than N20 million' }, 
                            { label: 'N20 million - Less than N100 million', value: 'N20 million - Less than N100 million' }, 
                            { label: 'Above N100 million', value: 'Above N100 million' }
                        ]} />
                    </Box>

                    <Divider border={'0.5px solid #CBD5E1'} mb={6}  />

                    {/* Other Sources Section */}
                    <Box mb={6}>
                        <Text variant={'base'} mb={2}>
                            Does the customer have other sources of funds?
                        </Text>
                        <RadioGroup onChange={setHasOtherSources} value={hasOtherSources} mb={4}>
                            <Stack direction="row" spacing={6} mt={4}>
                                <Radio 
                                    value="Yes" 
                                    colorScheme="teal" 
                                    fontSize={'16px'}
                                    fontWeight={400}
                                    bg={hasOtherSources === "Yes" ? "#0F454F" : "white"}
                                >
                                    <Text color="#344256">Yes</Text>
                                </Radio>
                                <Radio 
                                    value="No" 
                                    colorScheme="teal"
                                    fontSize={'16px'}
                                    fontWeight={400}
                                    bg={hasOtherSources === "No" ? "#0F454F" : "white"}
                                >
                                    <Text color="#344256">No</Text>
                                </Radio>
                            </Stack>
                        </RadioGroup>
                    </Box>

                    {/* Conditional fields when "Yes" is selected */}
                    {hasOtherSources === "Yes" && (
                        <>
                            <Box mb={6}>
                                <Text variant={'base'} mb={2}>
                                    Other source of revenue
                                </Text>
                                <SelectField label="Select customer's other source of revenue" type="select" placeholder="Select customer's other source of revenue" options={[
                                    { label: 'Salary and earnings', value: 'Salary and earnings' }, 
                                    { label: 'Savings', value: 'Savings' }, 
                                    { label: 'Sales of financial assets', value: 'Sales of financial assets' },
                                    { label: 'Sales of real estates', value: 'Sales of real estates' }, 
                                    { label: 'Reimbursements', value: 'Reimbursements' }, 
                                    { label: 'Inheritance/donation', value: 'Inheritance/donation' },
                                ]} />
                            </Box>

                            <Box mb={6}>
                                <Text variant={'base'} mb={2}>
                                    Expected annual revenue from other sources
                                </Text>
                                <SelectField label="Expected annual revenue from other sources" type="select" placeholder="Expected annual revenue from other sources" options={[
                                    { label: 'Less than N50,000', value: 'Less than N50,000' }, 
                                    { label: 'N51,000 - 250,000', value: 'N51,000 - 250,000' }, 
                                    { label: 'N251,000 - N500,000', value: 'N251,000 - N500,000' },
                                    { label: 'N501,000 - Less than N1 million', value: 'N501,000 - Less than N1 million' }, 
                                    { label: 'N1 million - Less than N5 million', value: 'N1 million - Less than N5 million' }, 
                                    { label: 'N5 million - Less than N10 million', value: 'N5 million - Less than N10 million' },
                                    { label: 'N10 million - Less than N20 million', value: 'N10 million - Less than N20 million' }, 
                                    { label: 'N20 million - Less than N100 million', value: 'N20 million - Less than N100 million' },
                                    { label: 'Above N100 million', value: 'Above N100 million' }, 
                                ]} />
                            </Box>
                        </>
                    )}

                    {/* Continue Button */}
                    <BaseButton
                        w="full"
                        borderRadius="8px"
                        bg={'#0F454F'}
                        color={'white'}
                        fontWeight="600"
                        onClick={handleContinue}
                        //isDisabled={}
                        text="Continue"
                    />
                </Box>
            </Box>
        </Flex>
    );
};

export default SourceOfIncomeTemplate;
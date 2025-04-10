'use client';

import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  useBreakpointValue,
  useToast,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Divider,
} from '@chakra-ui/react';
import BaseButton from 'components/molecules/buttons/BaseButton';
import { SourceOfIncomeTemplateProps } from '../interfaces';
import HeaderBackButton from 'components/molecules/buttons/HeaderBackButton';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/store';
import { setBusiness } from '../../../../../../redux/slices/business';
import FormControlButton from 'components/molecules/buttons/FormControlButton';
import { useSetupBusiness } from 'api-services/business-registration-services';

const SourceOfIncomeTemplate = ({ onNext, onBack }: SourceOfIncomeTemplateProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const toast = useToast();

  // Local State for user’s selections
  const [annualRevenue, setAnnualRevenue] = useState('');        
  const [hasOtherSources, setHasOtherSources] = useState<'Yes' | 'No'>('No');
  const [otherSourceType, setOtherSourceType] = useState('');     
  const [otherSourceRevenue, setOtherSourceRevenue] = useState(''); 
  // For dispatching to Redux
  const dispatch = useAppDispatch();
  const { businessDetails } = useAppSelector((state) => state.business);

      
  

  // Pre-defined items for "Annual Revenue"
  const annualRevenueItems = [
    { name: 'Less than N50,000', value: 'Less than N50,000' },
    { name: 'N51,000 - 250,000', value: 'N51,000 - 250,000' },
    { name: 'N251,000 - N500,000', value: 'N251,000 - N500,000' },
    { name: 'N501,000 - Less than N1 million', value: 'N501,000 - Less than N1 million' },
    { name: 'N1 million - Less than N5 million', value: 'N1 million - Less than N5 million' },
    { name: 'N5 million - Less than N10 million', value: 'N5 million - Less than N10 million' },
    { name: 'N10 million - Less than N20 million', value: 'N10 million - Less than N20 million' },
    { name: 'N20 million - Less than N100 million', value: 'N20 million - Less than N100 million' },
    { name: 'Above N100 million', value: 'Above N100 million' },
  ];

  // For "Other source of revenue"
  const otherSourceTypeItems = [
    { name: 'Salary and earnings', value: 'Salary and earnings' },
    { name: 'Savings', value: 'Savings' },
    { name: 'Sales of financial assets', value: 'Sales of financial assets' },
    { name: 'Sales of real estates', value: 'Sales of real estates' },
    { name: 'Reimbursements', value: 'Reimbursements' },
    { name: 'Inheritance/donation', value: 'Inheritance/donation' },
  ];

  // For "Other source revenue range"
  const otherSourceRevenueItems = [
    { name: 'Less than N50,000', value: 'Less than N50,000' },
    { name: 'N51,000 - 250,000', value: 'N51,000 - 250,000' },
    { name: 'N251,000 - N500,000', value: 'N251,000 - N500,000' },
    { name: 'N501,000 - Less than N1 million', value: 'N501,000 - Less than N1 million' },
    { name: 'N1 million - Less than N5 million', value: 'N1 million - Less than N5 million' },
    { name: 'N5 million - Less than N10 million', value: 'N5 million - Less than N10 million' },
    { name: 'N10 million - Less than N20 million', value: 'N10 million - Less than N20 million' },
    { name: 'N20 million - Less than N100 million', value: 'N20 million - Less than N100 million' },
    { name: 'Above N100 million', value: 'Above N100 million' },
  ];

  // "Continue" button logic
  const handleContinue = () => {
    if (!annualRevenue) {
      toast({
        title: 'Please select an annual income.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Dispatch to Redux
    dispatch(
      setBusiness({
        ...businessDetails,
        annualIncome: annualRevenue,    
        hasOtherSources,     
        otherSourceOfIncome: otherSourceType,
        otherSourceAnnualIncome: hasOtherSources === 'Yes' ? otherSourceRevenue : '',
      })
    );

    onNext();
  };

  return (
    <Flex direction="column" bg="#F8FAFC" w="full">
      <HeaderBackButton onBack={onBack} header="Business Setup" />

      <Box px={4} pt={4} pb={8}>
        <Box
          bg="white"
          width={isMobile ? '100%' : '600px'}
          mx="auto"
          borderRadius="8px"
          p={isMobile ? 4 : 8}
          border="0.5px solid #E2E8F0"
        >
          <Box
            w="full"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Heading as="h1" fontSize="18px" fontWeight="700" mb={2} color="#222B38">
              Source of Income
            </Heading>

            <Text variant="sm" mb={6}>
              Please provide the details of the customer&apos;s business income
            </Text>
          </Box>

          {/* Annual Revenue */}
          <Box mb={6}>
            <Text variant="base" mb={2}>
              What is the customer&apos;s expected gross annual revenue?
            </Text>

            {/* Replaced SelectField with FormControlButton */}
            <FormControlButton
              label="Expected Annual Income"
              items={annualRevenueItems}
              onChange={(selected) => setAnnualRevenue(selected.value)}
            />
          </Box>

          <Divider border="0.5px solid #CBD5E1" mb={6} />

          {/* Other Sources Section */}
          <Box mb={6}>
            <Text variant="base" mb={2}>
              Does the customer have other sources of funds?
            </Text>
            <RadioGroup
              onChange={(val) => setHasOtherSources(val as 'Yes' | 'No')}
              value={hasOtherSources}
              mb={4}
            >
              <Stack direction="row" spacing={6} mt={4}>
                <Radio value="Yes" colorScheme="teal" fontSize="16px" fontWeight={400}>
                  <Text color="#344256">Yes</Text>
                </Radio>
                <Radio value="No" colorScheme="teal" fontSize="16px" fontWeight={400}>
                  <Text color="#344256">No</Text>
                </Radio>
              </Stack>
            </RadioGroup>
          </Box>

          {/* If user says "Yes", show these dropdowns */}
          {hasOtherSources === 'Yes' && (
            <>
              <Box mb={6}>
                <Text variant="base" mb={2}>
                  Other source of revenue
                </Text>
                <FormControlButton
                  label="Select customer's other source of revenue"
                  items={otherSourceTypeItems}
                  onChange={(selected) => setOtherSourceType(selected.value)}
                />
              </Box>

              <Box mb={6}>
                <Text variant="base" mb={2}>
                  Expected annual revenue from other sources
                </Text>
                <FormControlButton
                  label="Select customer's other source of revenue"
                  items={otherSourceRevenueItems}
                  onChange={(selected) => setOtherSourceRevenue(selected.value)}
                />
              </Box>
            </>
          )}

          {/* Continue Button */}
          <BaseButton
            w="full"
            borderRadius="8px"
            bg="#0F454F"
            color="white"
            fontWeight="600"
            onClick={handleContinue}
            text="Continue"
          />
        </Box>
      </Box>
    </Flex>
  );
};

export default SourceOfIncomeTemplate;

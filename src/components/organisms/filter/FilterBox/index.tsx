import React, { useState } from 'react';
import {
    Box,
    Flex,
    IconButton,
    Text, useBreakpointValue
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import BaseButton from 'components/molecules/buttons/BaseButton';
import { IDownloadBoxProps } from '../interfaces';
import FloatingLabelSelect from "../../../molecules/inputs/FloatingLabelSelect";

const FilterBox = ({ onClose, onFilterChange }: IDownloadBoxProps) => {

    const isMobile = useBreakpointValue({ base: true, md: false });

    const [tierLevel, setTierLevel] = useState('');
    const [registrationStatus, setRegistrationStatus] = useState('');
    const [stateValue, setStateValue] = useState('');
    const [registrationBusiness, setRegistrationBusiness] = useState('');
    const [board, setBoard] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const handleApplyFilter = () => {
        onFilterChange({
            tierLevel,
            registrationStatus,
            state: stateValue,
            registrationBusiness,
            board,
            fromDate,
            toDate
        });
        onClose();
    };

    const handleClearFilter = () => {
        setTierLevel('');
        setRegistrationStatus('');
        setStateValue('');
        setRegistrationBusiness('');
        setBoard('');
        setFromDate('');
        setToDate('');

        onFilterChange({
            tierLevel: '',
            registrationStatus: '',
            state: '',
            registrationBusiness: '',
            board: '',
            fromDate: '',
            toDate: ''
        });
        onClose();
    };

    return (
        <Box
            p={{
                base: '0px',
                md:"24px"
            }}
            bg="white"
            borderRadius={{
                base: '0px',
                md: '8.75px'
            }}
            boxShadow={{
                base: 'none',
                md: "lg"
            }}
            width={{
                base: '100%',
                md: '500px'
            }}
        >
            {!isMobile &&

                <Flex mb={4} mt={-2} justifyContent="space-between" alignItems="center">
            <Text
                color="#344256"
                fontWeight={600}
                fontSize="20px"
                lineHeight="32px"
                letterSpacing="-1.4%"
            >
                Filter By
            </Text>
            <IconButton
                aria-label="Close filter"
                icon={<CloseIcon w="13.5px" h="13.5px" color="#000000" />}
                bg="transparent"
                onClick={onClose}
                _hover={{ bg: '#F1F5F9' }}
            />
        </Flex>}

            {/* Tier Level */}
            <Box w="100%" mb="20px">

                <FloatingLabelSelect
                    placeholder="Select Tier Level"
                    options={[
                        { label: 'Tier 1', value: 'tier1' },
                        { label: 'Tier 2', value: 'tier2' },
                        { label: 'Tier 3', value: 'tier3' }
                    ]}
                    value={tierLevel}
                    label={'Tier Level'}

                    onChange={(e: any) => setTierLevel(e.target.value)}
                />
            </Box>

            {/* Registration Status */}
            <Box w="100%" mb="20px">
                <FloatingLabelSelect
                    placeholder="Select Registration Status"
                    options={[
                        { label: 'Pending', value: 'pending' },
                        { label: 'Approved', value: 'approved' },
                        { label: 'Rejected', value: 'rejected' }
                    ]}
                    label={'Registration Status'}
                    value={registrationStatus}
                    onChange={(e: any) => setRegistrationStatus(e.target.value)}
                />
            </Box>

            {/* State */}
            <Box w="100%" mb="20px">
                <FloatingLabelSelect
                    placeholder="Select State"
                    options={[
                        { label: 'Lagos', value: 'lagos' },
                        { label: 'Abuja', value: 'abuja' },
                        { label: 'Rivers', value: 'rivers' }
                    ]}
                    label={'State'}
                    value={stateValue}
                    onChange={(e: any) => setStateValue(e.target.value)}
                />
            </Box>

            {/* Buttons */}
            <BaseButton
                text="Apply Filter"
                marginTop="28px"
                width="100%"
                height="48px"
                borderRadius="8px"
                padding="12px, 36px, 12px, 36px"
                gap="10px"
                color="white"
                bg="#0F454F"
                onClick={handleApplyFilter}
            />

            <BaseButton
                text="Clear Filter"
                marginTop="16px"
                width="100%"
                height="48px"
                fontWeight={700}
                fontSize="16px"
                lineHeight="24px"
                letterSpacing="-1.2%"
                borderRadius="8px"
                border="none"
                padding="12px, 36px, 12px, 36px"
                gap="10px"
                color="#0F454F"
                bg="#FFFFFF"
                onClick={handleClearFilter}
            />
        </Box>
    );
};

export default FilterBox;

import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import SelectField from 'components/organisms/select/SelectField';
import React, { useState } from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import { IDownloadBoxProps } from '../interfaces';
import BaseButton from 'components/molecules/buttons/BaseButton';

const FilterSuspendBox = ({ onClose, onFilterChange }: IDownloadBoxProps) => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [tierLevel, setTierLevel] = useState('');

    const handleApplyFilter = () => {
        onFilterChange({ fromDate, toDate, tierLevel });
        console.log(`tier: ${tierLevel}`)
        onClose();
    };

    return (
        <Box p="24px" bg="white" borderRadius="8.75px" boxShadow="lg" width="500px">
            <Flex mb={4} mt={-2} justifyContent="space-between" alignItems="center">
                <Text color="#344256" fontWeight={600} fontSize="20px" lineHeight="32px" letterSpacing="-1.4%">Filter By</Text>
                <IconButton
                    aria-label="Close filter"
                    icon={<CloseIcon h="13.5px" w="13.5px" color="#000000" />}
                    bg="transparent"
                    onClick={onClose}
                    _hover={{ bg: '#F1F5F9' }}
                />
            </Flex>

            <SelectField
                label="Tier Level"
                type="select"
                placeholder="Tier Level"
                options={[
                    { value: 'Tier 1', label: 'Tier 1' },
                    { value: 'Tier 2', label: 'Tier 2' },
                    { value: 'Tier 3', label: 'Tier 3' }
                ]}
                value={tierLevel}
                onChange={(e: any) => setTierLevel(e.target.value)} 
            />
            
            <Box w="100%" my={4}>
                <Text color="#344256" fontWeight={600} fontSize="16px" lineHeight="32px">Date Submitted</Text>
                <Flex w="full" gap={3}>
                    <SelectField label="" type="date" placeholder="From" value={fromDate} onChange={(e: any) => setFromDate(e.target.value)} />
                    <SelectField label="" type="date" placeholder="To" value={toDate} onChange={(e: any) => setToDate(e.target.value)} />
                </Flex>
            </Box>
            
            <BaseButton
                text="Apply Filter"
                marginTop="28px"
                width="452px"
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
                marginTop="28px"
                width="452px"
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
                onClick={() => {
                    setFromDate('');
                    setToDate('');
                    setTierLevel('');
                    onFilterChange({ fromDate: '', toDate: '', tierLevel: '' });
                    onClose();
                }}
            />
        </Box>
    );
};

export default FilterSuspendBox;

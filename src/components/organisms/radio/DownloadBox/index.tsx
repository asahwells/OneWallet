import React, { useState } from 'react';
import { Box, Flex, IconButton, RadioGroup, Stack, Text } from '@chakra-ui/react';
import RadioButton from 'components/molecules/buttons/RadioButton';
import { IRadioGroupProps } from '../interfaces';
import SelectField from 'components/organisms/select/SelectField';
import BaseButton from 'components/molecules/buttons/BaseButton';
import { CloseIcon } from '@chakra-ui/icons';

const DownloadBox = ({ onClose, onDownload, ...props }: IRadioGroupProps) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const handleDownload = () => {
        if (onDownload && selectedOption) {
            onDownload(selectedOption, fromDate, toDate);
            onClose()
        }
    };

    return (
        <Box p="24px" bg="white" borderRadius="8.75px" boxShadow="lg" width="557px">
            <Flex mb={7} mt={-2} justifyContent="space-between" alignItems="center">
                <Text color="#344256" fontWeight={600} fontSize="20px" lineHeight="32px" letterSpacing="-1.4%">Download Options</Text>
                <IconButton
                    aria-label="Close filter"
                    icon={<CloseIcon h="13.5px" w="13.5px" color="#000000"/>}
                    bg="transparent"
                    onClick={onClose}
                    _hover={{ bg: '#F1F5F9' }}
                />
            </Flex>
            <RadioGroup {...props} onChange={setSelectedOption} value={selectedOption}>
                <Stack direction="column" mx="-24px" spacing={4}>
                    <Box py="1px" px="24px" h="45px" borderBottom="1px solid #E5E9EB">
                        <RadioButton value="option1" text='Download Documents (PDF & PNG) & File (CSV)' />
                    </Box>
                    <Box py="1px" px="24px" h="45px" borderBottom="1px solid #E5E9EB">
                        <RadioButton value="option2" text='Download Documents (PDF & PNG)' />
                    </Box>
                    <Box py="1px" px="24px" h="45px" borderBottom="1px solid #E5E9EB">
                        <RadioButton value="option3" text='Download File (CSV)' />
                    </Box>
                </Stack>
            </RadioGroup>
            <Box mt={8} w="80%">
                <Text my={2} color="#344256" fontWeight={600} fontSize="16px" lineHeight="32px" letterSpacing="-1.4%">Download by Date</Text>
                <Flex w="full" gap={3}>
                    <SelectField label="" type="date" placeholder="From" value={fromDate} onChange={(e: any) => setFromDate(e.target.value)}/>
                    <SelectField label="" type="date" placeholder="To" value={toDate} onChange={(e: any) => setToDate(e.target.value)}/>
                </Flex>
                <BaseButton
                    text="Download"
                    marginTop="28px"
                    width="full"
                    height="48px"
                    borderRadius="8px"
                    padding="12px, 36px, 12px, 36px"
                    gap="10px"
                    color="white"
                    bg="#0F454F"
                    isDisabled={!selectedOption}
                    onClick={handleDownload}
                /> 
            </Box>
        </Box>
    );
};

export default DownloadBox;

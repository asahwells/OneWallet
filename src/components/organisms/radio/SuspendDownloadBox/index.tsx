import React, { useState } from 'react';
import { Box, Flex, IconButton, RadioGroup, Stack, Text } from '@chakra-ui/react';
import RadioButton from 'components/molecules/buttons/RadioButton';
import { IRadioGroupProps } from '../interfaces';
import SelectField from 'components/organisms/select/SelectField';
import BaseButton from 'components/molecules/buttons/BaseButton';
import { CloseIcon } from '@chakra-ui/icons';

const SuspendDownloadBox = ({ onClose, ...props }: IRadioGroupProps) => {
    const [selectedOption, setSelectedOption] = useState('');

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
                        <RadioButton value="option1" text='Download All Pages' />
                    </Box>
                    <Box py="1px" px="24px" borderBottom="1px solid #E5E9EB">
                        <RadioButton value="option2" text='Download by Page Number' />
                        <Flex w="full" gap={3} mt={2}>
                            <SelectField label="" type="number" placeholder="From" />
                            <SelectField label="" type="number" placeholder="To" />
                        </Flex>
                    </Box>
                </Stack>
            </RadioGroup>
            <Box mt={4} w="80%">
                <Text my={2} variant="md" lineHeight="32px" letterSpacing="-1.4%">Download by Date</Text>
                <Flex w="full" gap={3}>
                    <SelectField label="" type="date" placeholder="From" />
                    <SelectField label="" type="date" placeholder="To" />
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
                    onClick={onClose}
                /> 
            </Box>
        </Box>
    );
};

export default SuspendDownloadBox;

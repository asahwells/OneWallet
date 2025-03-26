import React, { useState } from 'react';
import { Box, Flex, RadioGroup, Stack, Text } from '@chakra-ui/react';
import RadioButton from 'components/molecules/buttons/RadioButton';
import SelectField from 'components/organisms/select/SelectField';
import BaseButton from 'components/molecules/buttons/BaseButton';
import DownloadRadio from 'components/organisms/radio/DownloadBox';
import { IDownloadBoxProps } from '../interfaces';

const DownloadBox = ({onClose}: IDownloadBoxProps) => {
    const [selectedOption, setSelectedOption] = useState('');

    return (
        <Box>
            
            <Box mt={8}>
                <Text my={2} color="#344256" fontWeight={600} fontSize="16px" lineHeight="32px" letterSpacing="-1.4%">Date Submitted</Text>
                <Flex w="full" gap={3}>
                    <SelectField label="" type="date" placeholder="From" />
                    <SelectField label="" type="date" placeholder="To" />
                </Flex>
                <BaseButton text='Download'/>
            </Box>
        </Box>
    );
};

export default DownloadBox;

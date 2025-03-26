import { Select, Box } from '@chakra-ui/react';
import React from 'react';
import { IDateInputProps } from '../interfaces';

const SelectNumber = ({ placeholder }: IDateInputProps) => {
    return (
        <Box
            border="1px solid #E2E8F0"
            borderRadius="8px"
            h="40px"
            bg="#FFFFFF"
            display="flex"
            alignItems="center"
            justifyContent="center"
            px="8px"
        >
            <Select
                placeholder={placeholder}
                border="none"
                h="100%"
                fontSize="16px"
                fontWeight="400"
                lineHeight="24px"
                color="#344256"
                iconColor="#A0AEC0"
                focusBorderColor='transparent'
            >
                <option value="2024-09-03">1</option>
                <option value="2024-09-02">2</option>
                <option value="2024-09-01">3</option>
                <option value="2024-09-02">4</option>
                <option value="2024-09-01">5</option>
                <option value="2024-09-03">6</option>
                <option value="2024-09-02">7</option>
                <option value="2024-09-01">8</option>
                <option value="2024-09-02">9</option>
                <option value="2024-09-01">10</option>
            </Select>
        </Box>
    );
};

export default SelectNumber;
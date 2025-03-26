import { Select, Box } from '@chakra-ui/react';
import React from 'react';
import { IDateInputProps } from '../interfaces';

const getDateOptions = () => {
    const options = [];
    const today = new Date();
    
    for (let i = 0; i < 366; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const formattedDate = date.toISOString().split('T')[0]; 
      options.push(formattedDate);
    }
    
    return options;
  };
  

const DateInput = ({ placeholder, value, onChange }: IDateInputProps) => {
    const dateOptions = getDateOptions();
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
                value={value}
                onChange={onChange}
                border="none"
                h="100%"
                fontSize="16px"
                fontWeight="400"
                lineHeight="24px"
                color="#344256"
                iconColor="#A0AEC0"
                focusBorderColor='transparent'
            >
                {dateOptions.map((date, index) => (
                    <option key={index} value={date}>
                        {date}
                    </option>
                ))}
            </Select>
        </Box>
    );
};

export default DateInput;
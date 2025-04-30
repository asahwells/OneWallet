import { Select } from '@chakra-ui/react';
import React from 'react';
import { ISelectInputProps } from '../interfaces';

const SelectInput = ({ options, placeholder, value, onChange, ...props }: ISelectInputProps) => {
    return (
        <Select
            placeholder={placeholder}

            value={value}
            onChange={onChange}
            size="sm"
            border="1px solid #E2E8F0"
            borderRadius="8px"
            h="56px"
            bg="#FFFFFF"
            focusBorderColor="#E2E8F0"
            color="#344256"
            fontSize="16px"
            fontWeight={500}
            lineHeight="24px"
            letterSpacing="-1.2%"
            {...props}
        >
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </Select>
    );
};

export default SelectInput;

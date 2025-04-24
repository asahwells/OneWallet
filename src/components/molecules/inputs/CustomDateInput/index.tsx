// components/molecules/inputs/CustomDateInput.tsx
import React, { forwardRef } from 'react';
import { Input, Box } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

export interface CustomDateInputProps {
    value?: string;
    onClick?: () => void;
    placeholder?: string;
    isDisabled?: boolean;
}

const CustomDateInput = forwardRef<HTMLInputElement, CustomDateInputProps>(
    ({ value, onClick, placeholder, isDisabled }, ref) => (
        <Box position="relative">
            <Input
                readOnly
                placeholder={placeholder}
                value={value}
                onClick={onClick}
                ref={ref}
                isDisabled={isDisabled}
                borderRadius="8px"
                borderColor="#E2E8F0"
                _focus={{ borderColor: '#CBD5E1' }}
                height="48px"
                fontSize="16px"
                cursor={isDisabled ? 'not-allowed' : 'pointer'}
            />
            <ChevronRightIcon
                position="absolute"
                right="12px"
                top="50%"
                transform="translateY(-50%)"
                color={isDisabled ? 'gray.300' : '#94A3B8'}
                pointerEvents="none"
            />
        </Box>
    )
);

CustomDateInput.displayName = 'CustomDateInput';
export default CustomDateInput;

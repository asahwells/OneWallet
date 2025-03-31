// CustomDateInput.tsx
import React, { forwardRef } from 'react';
import { Input, Box } from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import {CustomDateInputProps} from "../interfaces";

const CustomDateInput = forwardRef<HTMLInputElement, CustomDateInputProps>(
    ({ value, onClick }, ref) => {
        return (
            <Box position="relative">
                <Input
                    readOnly
                    value={value}
                    onClick={onClick}
                    ref={ref}
                    placeholder="DD/MM/YYYY"
                    borderRadius="8px"
                    borderColor="#E2E8F0"
                    focusBorderColor="#CBD5E1"
                    height="48px"
                    fontSize="16px"
                />
                <CalendarIcon
                    position="absolute"
                    right="12px"
                    top="50%"
                    transform="translateY(-50%)"
                    color="#94A3B8"
                />
            </Box>
        );
    }
);

CustomDateInput.displayName = "CustomDateInput";

export default CustomDateInput;
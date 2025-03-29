import React from 'react';
import { Box, Input, Text } from '@chakra-ui/react';
import { IInputProps } from '../interfaces';

const SearchInput = ({ value, icon, h, onChange, onFocus, type, errorMessage, placeholder, onBlur, ...props }: IInputProps) => {


    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        if (onFocus) {
            onFocus(event);
        }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (onBlur) {
            onBlur(event);
        }
    };

    return (
        <Box w={'full'}>
            <Input
                {...props}
                value={value}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                height="100%"
                h={h ||'56px'}
                w={'full'}
                color="#344256"
                type={type || ''}
                border="2px"
                borderColor="#E2E8F0"
                borderRadius="8px"
                placeholder={placeholder || "Search by name or acct no."}
                bg="#FFFFFF"
                focusBorderColor="whitesmoke"
                _focus={{
                    boxShadow: 'none',
                }}
                gap="12px"
                position="relative"
                zIndex="1"
            />

            {errorMessage && (
                <Text variant={'error'} mt={2} ml={1}>
                    {errorMessage}
                </Text>
            )}
        </Box>
    );
};

export default SearchInput;

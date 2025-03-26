import React from 'react';
import { Box, Text, Textarea } from '@chakra-ui/react';
import { ITextareaProps } from '../interfaces';

const TextareaInput = ({ value, onChange, onFocus, onBlur, errorMessage, ...props }: ITextareaProps) => {
    return (
        <Box mt={4} bg="#ffffff" rounded="md" position="relative">
            <Textarea
                h="137px"
                placeholder=""
                resize="none"
                color="#344256"
                bg="#F1F5F9"
                borderWidth="1px"
                borderColor="#CBD5E0"
                focusBorderColor="#E2E8F0"
                paddingBottom="25px"
                value={value} 
                onChange={onChange} 
                {...props} 
            />
            <Text
                fontSize="sm"
                color="gray.500"
                position="absolute"
                bottom="5px"
                right="20px"
                >
                0/300
            </Text>

            {errorMessage && (
                <Text variant={'error'} mt={2} ml={1}>
                    {errorMessage}
                </Text>
            )}
        </Box>
    );
};

export default TextareaInput;

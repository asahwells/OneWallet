import React from 'react';
import { Input, InputGroup, InputRightElement, Box } from '@chakra-ui/react';
import { IInputProps } from '../interfaces';

const BaseInput = ({ value, icon, onFocus, onBlur, ...props }: IInputProps) => {


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
        <InputGroup height="100%">
            <Input
                {...props}
                value={value}
                onFocus={handleFocus}
                onBlur={handleBlur}
                height="100%"
                border="none"
                placeholder=""
                bg="#F8FAFC"
                focusBorderColor="transparent"
                _focus={{
                    boxShadow: 'none',
                }}
                position="relative"
                zIndex="1"
            />
            {icon && (
                <InputRightElement height="100%">
                    <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                        {icon}
                    </Box>
                </InputRightElement>
            )}
        </InputGroup>
    );
};

export default BaseInput;

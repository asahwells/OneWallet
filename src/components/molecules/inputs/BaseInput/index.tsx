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
            pt={'18px'}
                value={value}
                onFocus={handleFocus}
                onBlur={handleBlur}
                height="100%"
                border="2px solid #E2E8F0"
                placeholder=""
                bg="#FFFFFF"
                focusBorderColor="#E2E8F0"
                _focus={{
                    boxShadow: 'none',
                }}
                _autofill= {{
                    bg: "#FFFFFF",
                    boxShadow: '0 0 0px 1000px white inset',
                    WebkitTextFillColor: '#000000',
                }}
                position="relative"
                zIndex="1"
                {...props}
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

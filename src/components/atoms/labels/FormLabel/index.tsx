import React from 'react';
import { FormLabel as ChakraFormLabel } from '@chakra-ui/react';
import { IFormLabelProps } from '../interfaces';

const FormLabel = ({ title, ...props }: IFormLabelProps) => {
    return (
        <ChakraFormLabel
            {...props}
            position="absolute"
            pointerEvents="none"
            zIndex="1"
        >
            {title}
        </ChakraFormLabel>
    );
};

export default FormLabel;

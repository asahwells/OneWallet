import React from 'react';
import { FormLabel as ChakraFormLabel, Text } from '@chakra-ui/react';
import { ITextProps } from '../interfaces';

const Modaltext = ({ title, ...props }: ITextProps) => {
    return (
        <Text
            {...props}
        >
            {title}
        </Text>
    );
};

export default Modaltext;

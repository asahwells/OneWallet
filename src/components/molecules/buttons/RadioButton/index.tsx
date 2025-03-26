import React from 'react';
import { Radio, Text } from '@chakra-ui/react';
import { IRadioProps } from '../interfaces';

const RadioButton = ({ text, value, ...props }: IRadioProps) => {
  return (
    <Radio 
        value={value}
        css={{
            "&[data-checked]": {
                backgroundColor: "#0F454F",
                borderColor: "#0F454F",
            },
            "&:hover[data-checked]": {
                backgroundColor: "#0F454F",
                borderColor: "#0F454F",
            },
            "&:focus": {
                boxShadow: "0 0 0 2px rgba(15, 69, 79, 0.6)",
            },
        }}
        {...props}
    >
        <Text variant="md" lineHeight="32px" letterSpacing="-1.4%">
            {text}
        </Text>
    </Radio>
  );
};

export default RadioButton;

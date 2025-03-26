import React from 'react';
import { Checkbox, Text } from '@chakra-ui/react';
import { ICheckProps } from '../interfaces';

// Custom Checkbox Component
const CustomCheckbox = ({ text, value, ...props }: ICheckProps) => {
  return (
    <Checkbox
      value={value}
      color="#0F454F" 
      sx={{
        
        ".chakra-checkbox__control": {
          borderColor: "#0F454F",
          _checked: {
            bg: "#0F454F", 
            borderColor: "#0F454F", 
            color: "white", 
          },
          _hover: {
            color: "#0F454F", 
            borderColor: "#0F454F", 
          },
          _focus: {
            boxShadow: "#0F454F",
          },
        },
      }}
      {...props}
    >
      <Text variant="md" lineHeight="32px" letterSpacing="-1.4%">
        {text}
      </Text>
    </Checkbox>
  );
};

export default CustomCheckbox;

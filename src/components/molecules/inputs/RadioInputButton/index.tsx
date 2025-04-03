import React from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Stack,
  RadioProps,
} from '@chakra-ui/react';

interface RadioButtonProps extends Omit<RadioProps, 'value' | 'onChange'> {
  onChange: (value: string) => void;
  value: string;
  label?: string;
}

const RadioInputtButton: React.FC<RadioButtonProps> = ({
  onChange,
  value,
  label,
}) => {
  return (
    <FormControl as="fieldset">
      {label && (
        <FormLabel
          fontWeight={400}
          fontSize={'16px'}
          lineHeight={'24px'}
          letterSpacing={'-1.2%'}
          color={'#344256'}
          as="legend"
        >
          {label}
        </FormLabel>
      )}
      <RadioGroup onChange={onChange} value={value}>
        <Stack direction="row" mt={2} spacing={4}>
          <Radio
            variant="radioButton" // Apply the variant
            value="yes"
          >
            Yes
          </Radio>
          <Radio
            variant="radioButton" // Apply the variant
            value="no"
          >
            No
          </Radio>
        </Stack>
      </RadioGroup>
    </FormControl>
  );
};

export default RadioInputtButton;
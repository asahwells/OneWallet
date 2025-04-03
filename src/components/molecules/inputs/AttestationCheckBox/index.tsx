import React from 'react';
import { Flex, Checkbox, Text, FlexProps } from '@chakra-ui/react';

interface AttestationCheckboxProps extends Omit<FlexProps, 'isChecked' | 'onChange'> {
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
  label: string;
}

const AttestationCheckbox: React.FC<AttestationCheckboxProps> = ({ isChecked, onChange, label, ...props }) => {
  return (
    <Flex {...props}>
      <Checkbox
        isChecked={isChecked}
        onChange={(e) => onChange(e.target.checked)}
        size="md" // You can adjust the size
        variant={'attestation'}
        colorScheme="blue" // You can adjust the color scheme
      />
      <Text ml={'12px'} lineHeight={'22px'} letterSpacing={'-1%'} fontWeight={400} color={'#344256'} fontSize="14px">
        {label}
      </Text>
    </Flex>
  );
};

export default AttestationCheckbox;
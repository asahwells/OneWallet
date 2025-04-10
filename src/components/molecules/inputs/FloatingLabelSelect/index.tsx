import React, { MouseEvent, useState } from 'react';
import {
  FormControl,
  FormLabel,
  Select,
  FormControlProps,
  SelectProps,
} from '@chakra-ui/react';

interface IOption {
  label: string;
  value: string;
}

interface IConditionalLabelSelectProps extends Omit<FormControlProps, 'onClick'> {
  label: string;
  options: IOption[];
  value?: string;        // we store only the string "value"
  onValueChange?: (value: string) => void; // we want to pass only the string upward
  onClick?: (event: MouseEvent<HTMLSelectElement>) => void;
}

const ConditionalLabelSelect: React.FC<IConditionalLabelSelectProps & SelectProps> = ({
  label,
  options,
  value = '',
  onValueChange,
  onClick,
  ...formControlProps
}) => {
  const placeholder = !value ? label : '';

  const [isFocused, setIsFocused] = useState(false); 

  const handleSelectClick = (event: MouseEvent<HTMLSelectElement>) => {
    if (onClick) {
      onClick(event); 
    } else {
      setIsFocused(true); 
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const stringValue = event.target.value;
    if (onValueChange) {
      onValueChange(stringValue);
    }
  };

  return (
    <FormControl position="relative" {...formControlProps}>
      {value && (
        <FormLabel
          position="absolute"
          top="-8px"
          left="12px"
          bg="white"
          px="4px"
          fontSize="10px"
          fontWeight="500"
          color="#344256"
          transition="all 0.2s ease-out"
          zIndex={1}
        >
          {label}
        </FormLabel>
      )}

      <Select
        onClick={handleSelectClick}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}      
        onBlur={handleBlur}
        size="sm"
        border="2px solid #E2E8F0"
        borderRadius="8px"
        h="56px"
        bg="#FFFFFF"
        focusBorderColor="#E2E8F0"
        color="#344256"
        fontSize="16px"
        fontWeight={500}
        lineHeight="24px"
        letterSpacing="-1.2%"
      >
        {isFocused &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </Select>
    </FormControl>
  );
};

export default ConditionalLabelSelect;

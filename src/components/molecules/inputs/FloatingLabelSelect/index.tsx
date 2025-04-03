import React, { MouseEvent, useState } from 'react';
import {
    FormControl,
    FormLabel,
    Select,
    FormControlProps,
    SelectProps
} from '@chakra-ui/react';
import {IConditionalLabelSelectProps} from "../interfaces";


/**
 * A custom Select that:
 * - Shows the label as the placeholder if no value is selected
 * - When a value is selected, the placeholder is cleared and a label is displayed at the top
 */
const ConditionalLabelSelect: React.FC<IConditionalLabelSelectProps & SelectProps> = ({
    label,
    options,
    value = '',
    onChange,
    onClick,
    ...formControlProps
}) => {
    // If there's no value, we'll show the label as the placeholder
    const placeholder = !value ? label : '';

    const [isFocused, setIsFocused] = useState(false); // Track focus state

    const handleSelectClick = (event: MouseEvent<HTMLSelectElement>) => {
        if (onClick) {
          onClick(event); // Call onClick if it exists
        } else {
          setIsFocused(true); // Otherwise, show options
        }
      };
    
      const handleBlur = () => {
        setIsFocused(false); // Hide options on blur
      };

    return (
        <FormControl position="relative" {...formControlProps}>
            {/* Show the label on top only if a value is selected */}
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
                onChange={onChange}
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
                {isFocused && options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
};

export default ConditionalLabelSelect;

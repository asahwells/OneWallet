import React, { useState, useEffect } from "react";
import { FormControl, Flex, Text, Icon } from "@chakra-ui/react";
import FormLabel from "../../../atoms/labels/FormLabel"; // Assuming this is the correct import
import { IFormControl } from "../interfaces";

const BankInputControl = ({ label, children, value, ...props }: IFormControl) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value); // Check if value exists on init

  useEffect(() => {
    // Update hasValue whenever value changes
    setHasValue(!!value);
  }, [value]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setHasValue(!!value);
  };

  return (
    <FormControl
      {...props}
      position="relative"
      h="56px"
      border="2px"
      borderRadius="8px"
      borderColor="#E2E8F0"
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleFocus} // Handle focus on click for non-input elements like Text
    >
      {/* Floating Label */}
      <FormLabel
        title={label}
        top={isFocused || hasValue ? "-1px" : "50%"}
        left="16px"
        fontSize={isFocused || hasValue ? "10px" : "16px"}
        color="#344256"
        lineHeight={isFocused || hasValue ? "16px" : "24px"}
        transform={isFocused || hasValue ? "none" : "translateY(-50%)"}
        transition="0.2s ease-in-out"
        zIndex="1"
        pointerEvents="none"
      />
      {/* Flex container for children */}
      <Flex
        alignItems="center"
        pl="16px"
        cursor="pointer"
        height="100%"
      >
        {children}
      </Flex>
    </FormControl>
  );
};

export default BankInputControl;

import React, { useState } from 'react';
import { Box, Text, Flex, IconButton, useDisclosure, useOutsideClick, List, ListItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { border } from '@chakra-ui/system';

type CustomSelectFieldProps = {
  value: string | null;
  options: { value: string; label: string }[];
  placeholder: string;
  onChange: (value: string) => void;
};

const SelectInputField: React.FC<CustomSelectFieldProps> = ({
  value,
  options,
  placeholder,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false); // to toggle the dropdown open/close
  const [selectedValue, setSelectedValue] = useState(value || ''); // selected value of the dropdown

  const toggleDropdown = () => setIsOpen(!isOpen);

const handleOptionSelect = (selectedOption: string) => {
    setSelectedValue(selectedOption);
    onChange(selectedOption); // pass selected option back to the parent
    setIsOpen(false); // Close the dropdown after selection
  };

  const dropdownRef = React.useRef(null);
  useOutsideClick({
    ref: dropdownRef,
    handler: () => setIsOpen(false), // close dropdown when clicked outside
  });

  return (
    <Box mb="16px" w="full" position="relative">
      <Box
        onClick={toggleDropdown}
        border="2px solid #E2E8F0"
        borderRadius="8px"
        p={1}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        cursor="pointer"
        bg="white"
        _hover={{ borderColor: '#B4D3E1' }}
        _focusWithin={{ borderColor: '#0F454F' }}
        position="relative"
      >
        <Text color={selectedValue ? 'black' : 'gray.400'}
         fontSize="16px"
         fontWeight="500"
         lineHeight="24px"
         letterSpacing="-1.2%"
         textColor={'#344256'}
         px={3}
        >
          {selectedValue || placeholder}
        </Text>
        <IconButton
          aria-label="Dropdown"
          icon={<ChevronDownIcon />}
        //   variant="ghost"
          _hover={{ bg: 'transparent' }}
          bg='transparent'
        />
      </Box>

      {/* Custom Dropdown List */}
      {isOpen && (
        <Box
          ref={dropdownRef}
          mt={2}
          border="1px solid #E2E8F0"
          borderRadius="8px"
          maxHeight="200px"
          overflowY="auto"
          boxShadow="lg"
          position="absolute"
          w="full"
          bg="white"
          zIndex={10}
        >
          <List>
            {options.map((option) => (
              <ListItem
              fontSize="16px"
              fontWeight="400"
              lineHeight="24px"
              letterSpacing="-1.2%"
                key={option.value}
                px={4}
                py={3}
                borderBottom="1px solid #E2E8F0"
                cursor="pointer"
                _hover={{ backgroundColor: '#E2E8F0' }}
                onClick={() => handleOptionSelect(option.value)}
              >
                {option.label}
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default SelectInputField;

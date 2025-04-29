'use client';

import React, { useState } from 'react';
import {
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { MonthFilterProps } from '../interfaces/index';

const MonthFilter = ({ onMonthSelect, onClearMonth }: MonthFilterProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  // Handle month selection
  const handleMonthSelect = (month: string) => {
    // Format the month to be "First letter uppercase, rest lowercase" for display
    const formattedMonth = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
    setSelectedMonth(formattedMonth);

    // Pass the lowercase month to the parent (backend request)
    onMonthSelect(month.toLowerCase());
  };

  // Clear selected month
  const clearSelectedMonth = () => {
    setSelectedMonth(null);
    onClearMonth();
  };

  const months = [
    'january', 'february', 'march', 'april', 'may', 'june', 'july',
    'august', 'september', 'october', 'november', 'december',
  ];

  return (
    <HStack
      spacing={2}
      display={'flex'}
      flexDir={{ base: 'column-reverse', lg: 'row' }}
      justify={'start'}
      alignItems="center"
    >
      {/* Selected Month Tag */}
      {selectedMonth && (
        <HStack mt={2}>
          <Tag
            size="md"
            borderRadius="full"
            variant="solid"
            colorScheme="gray"
            bg="gray.200"
            px={3}
            py={1}
          >
            <TagLabel>{selectedMonth}</TagLabel>
            <TagCloseButton onClick={clearSelectedMonth} />
          </Tag>
        </HStack>
      )}

      {/* Month Filter Menu */}
      <Menu placement="bottom-end" autoSelect={false}>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          variant="md"
          bg="white"
          px={4}
          py={2}
        >
          Filter by Month
        </MenuButton>
        <MenuList
          width="390px"
          height="446px"
          borderColor="gray.200"
          p={0}
          borderRadius="md"
          overflowY="auto"
        >
          {months.map((month) => (
            <MenuItem
              key={month}
              onClick={() => handleMonthSelect(month)}
              py={5}
              px={4}
              _hover={{ bg: 'gray.50' }}
              _focus={{ bg: 'gray.50' }}
              borderBottom="1px solid"
              borderColor="gray.200"
              fontSize="md"
              fontWeight="normal"
              color="#344256"
            >
              {/* Display formatted month */}
              {month.charAt(0).toUpperCase() + month.slice(1).toLowerCase()}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </HStack>
  );
};

export default MonthFilter;

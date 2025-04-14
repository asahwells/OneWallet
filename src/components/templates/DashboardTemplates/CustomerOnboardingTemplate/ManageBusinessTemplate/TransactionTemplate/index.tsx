'use client';

import {
  Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay,
  Flex, HStack, Icon, Menu, MenuButton, MenuItem, MenuList, Stack, Tag, TagCloseButton,
  TagLabel, Text, useBreakpointValue, useDisclosure, VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ChevronDownIcon, CloseIcon } from '@chakra-ui/icons';
import SearchInput from '../molecules/inputs/SearchInput';
import FilterButton from '../../../../../molecules/buttons/FilterButton';
import SelectFilterBox from '../../../../../organisms/filter/SelectFilterBox';
import TotalApplicationIcon from '../../../../../atoms/icons/TotalApplicationIcon/index';
import AnalyticsCard from '../../../../../molecules/card/AnalyticsCard/index';
import { MockCustomerRegistration } from '../../../../../organisms/table/mockData';
import CustomerTransactionTable from '../../../../../organisms/table/CustomerTransactionTable/index';
import { Select, Button, SimpleGrid } from '@chakra-ui/react';
import TransactionVolumeIcon from '../../../../../atoms/icons/TransactionVolumeIcon/index';
import TransactionValueIcon from '../../../../../atoms/icons/TransactionValueIcon/index';

const TransactionTemplate = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Store applied filters
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  // Update filters based on what the filter box returns
  const handleFilterChange = (newFilters: { [key: string]: string }) => {
    // Remove keys with empty values
    const applied = Object.fromEntries(
      Object.entries(newFilters).filter(
        ([key, value]) => value && value.trim() !== '',
      ),
    );
    setFilters(applied);
  };

  // Remove a single filter key from the state
  const removeFilter = (key: string) => {
    const updated = { ...filters };
    delete updated[key];
    setFilters(updated);
  };

  // Handle month selection
  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
  };

  // Clear selected month
  const clearSelectedMonth = () => {
    setSelectedMonth(null);
  };

  // List of months
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <Stack bg="white" spacing={5} p={{ base: 0, md: 4 }}>
      {/* Transaction Summary Cards */}
      <SimpleGrid columns={{ base: 2, md: 2 }} spacing={4} maxW={{ base: "100%", md: "600px" }}>
      <AnalyticsCard
            title="Transaction Volume"
            value="50"
            // isLoading={isFetchingDashboard}
            icon={<TransactionVolumeIcon />}
          />
          <AnalyticsCard
            title="Transaction Value"
            value="₦64,890.23"
            // isLoading={}
            icon={<TransactionValueIcon />}
          />
        </SimpleGrid>
      {/* Transaction History */}
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mt={4}
        direction={{ base: 'row', md: 'row' }}
        gap={{ base: 4, md: 0 }}
        w="full"
      >
        <Text fontSize="lg" fontWeight="medium">
          Transaction History
        </Text>

        <HStack spacing={2}>
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

          {/* Month Filter */}
          <Menu placement="bottom-end" autoSelect={false}>
            <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="unstyled"
                bg="white"
                px={4}
                py={2}
                fontWeight="normal"
                color="#344256"
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
                    {month}
                </MenuItem>
                ))}
            </MenuList>
          </Menu>
        </HStack>
    </Flex>

      {/* Mobile: Display applied filters as chips */}
      {isMobile && Object.keys(filters).length > 0 && (
        <HStack spacing={2} overflowX="auto" py={2}>
          {Object.entries(filters).map(([key, value]) => (
            <Tag
              key={key}
              size="md"
              borderRadius="full"
              variant="solid"
              colorScheme="gray"
              bg="gray.200"
            >
              <TagLabel>{`${key}: ${value}`}</TagLabel>
              <TagCloseButton onClick={() => removeFilter(key)} />
            </Tag>
          ))}
        </HStack>
      )}

      {/* Customer Registration Table / List */}
      <CustomerTransactionTable data={MockCustomerRegistration} />
    </Stack>
  );
};

export default TransactionTemplate;

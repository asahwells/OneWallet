'use client';

import {
  Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay,
  Flex, HStack, Icon, Menu, MenuButton, MenuItem, MenuList, Stack, Tag, TagCloseButton,
  TagLabel, Text, useBreakpointValue, useDisclosure, VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ChevronDownIcon, CloseIcon } from '@chakra-ui/icons';
import FilterButton from '../../../../../molecules/buttons/FilterButton';
import SelectFilterBox from '../../../../../organisms/filter/SelectFilterBox';
import TotalApplicationIcon from '../../../../../atoms/icons/TotalApplicationIcon/index';
import AnalyticsCard from '../../../../../molecules/card/AnalyticsCard/index';
import { MockCustomerRegistration } from '../../../../../organisms/table/mockData';
import CustomerTransactionTable from '../../../../../organisms/table/CustomerTransactionTable/index';
import { Select, Button, SimpleGrid } from '@chakra-ui/react';
import TransactionVolumeIcon from '../../../../../atoms/icons/TransactionVolumeIcon/index';
import TransactionValueIcon from '../../../../../atoms/icons/TransactionValueIcon/index';
import MonthFilter from '../../../../../organisms/filter/MonthFilters/index';
import { useParams } from 'next/navigation';
import { useFetchAllTransactions } from 'api-services/business-services';

const TransactionTemplate = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Store applied filters
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const { id } = useParams() as { id: string };

  const { mutateAsync: fetchTransactions, data: transactions, isPending: isFetchingTransactions } = useFetchAllTransactions(id);

  useEffect(() => {
    fetchTransactions();
  }, []);
  
  const handleMonthSelect = (month: string) => {
    console.log('Month selected:', month);
  };

  // Function to handle clearing selected month
  const handleClearMonth = () => {
    console.log('Month selection cleared');
  };

  // Update filters based on what the filter box returns
  const handleFilterChange = (newFilters: { [key: string]: string }) => {
    const applied = Object.fromEntries(
      Object.entries(newFilters).filter(
        ([key, value]) => value && value.trim() !== '',
      ),
    );
    setFilters(applied);
  };

  const removeFilter = (key: string) => {
    const updated = { ...filters };
    delete updated[key];
    setFilters(updated);
  };

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
        <Text variant={'md'}>
          Transaction History
        </Text>

        <MonthFilter 
            onMonthSelect={handleMonthSelect}
            onClearMonth={handleClearMonth}
        />
    </Flex>

      {/* Customer Registration Table / List */}
      <CustomerTransactionTable data={MockCustomerRegistration} />
    </Stack>
  );
};

export default TransactionTemplate;

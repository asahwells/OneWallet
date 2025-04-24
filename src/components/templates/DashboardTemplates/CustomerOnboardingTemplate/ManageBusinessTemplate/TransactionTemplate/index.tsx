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
  const { id } = useParams() as { id: string };
  const [filters, setFilters] = useState<{ [k: string]: string }>({});
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const {
    mutateAsync: fetchTransactions,
    data: transactions,
    isPending: isLoading,
  } = useFetchAllTransactions();

  useEffect(() => {
    fetchTransactions({
      id,
      page: currentPage,   // Pass as number
      limit: pageSize,      // Pass as number
      month: selectedMonth, // Pass as string
      ...filters,            // Pass other filters as strings
    });
  }, [id, currentPage, selectedMonth, filters]);
  
  
  // MonthFilter callbacks
  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
    setCurrentPage(1); // reset page
  };
  const handleClearMonth = () => {
    setSelectedMonth('');
  };

  // SelectFilterBox already gives you key/value pairs
  const handleFilterChange = (newFilters: { [k: string]: string }) =>
    setFilters(
      Object.fromEntries(
        Object.entries(newFilters).filter(([, v]) => v?.trim())
      )
    );

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
      <Flex justify="space-between" align="center" mt={4}>
        <Text variant={'md'}>
          Transaction History
        </Text>
        <MonthFilter
          onMonthSelect={handleMonthSelect}
          onClearMonth={handleClearMonth}
        />
      </Flex>

      {/* YOUR TABLE */}
      <CustomerTransactionTable
        data={transactions?.data ?? []}
        isLoading={isLoading}
        currentPage={transactions?.pagination.currentPage}
        totalPages={transactions?.pagination.lastPage}
        onPageChange={() => setCurrentPage}
      />
    </Stack>
  );
};

export default TransactionTemplate;

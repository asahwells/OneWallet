import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Stack,
  SimpleGrid,
  useBreakpointValue,
  Spinner,
} from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useFetchAllTransactions } from 'api-services/business-services';
import CustomerTransactionTable from '../../../../../organisms/table/CustomerTransactionTable/index';
import MonthFilter from '../../../../../organisms/filter/MonthFilters/index';
import AnalyticsCard from '../../../../../molecules/card/AnalyticsCard/index';
import TransactionVolumeIcon from '../../../../../atoms/icons/TransactionVolumeIcon/index';
import TransactionValueIcon from '../../../../../atoms/icons/TransactionValueIcon/index';
import PaginationComponent from 'components/organisms/pagination/PaginationComponent';

const TransactionTemplate = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { id } = useParams() as { id: string };

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filter states
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const { mutateAsync: fetchTransactions, data: transactions, isPending: isFetchingTransactions } = useFetchAllTransactions(id);

  useEffect(() => {
    fetchTransactions({ page: currentPage, month: selectedMonth || '' });
  }, [currentPage, selectedMonth]);
  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
  };

  const handleClearMonth = () => {
    setSelectedMonth(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Stack bg="white" spacing={5} p={{ base: 0, md: 4 }}>
      {/* Transaction Summary Cards */}
      <SimpleGrid columns={{ base: 2, md: 2 }} spacing={4} maxW={{ base: '100%', md: '600px' }}>
        <AnalyticsCard
          title="Transaction Volume"
          value={`0`}
          icon={<TransactionVolumeIcon />}
        />
        <AnalyticsCard
          title="Transaction Value"
          value={`₦${0}`}
          icon={<TransactionValueIcon />}
        />
      </SimpleGrid>

      {/* Transaction History */}
      <Flex justifyContent="space-between" alignItems="center" mt={4} direction={{ base: 'row', md: 'row' }} gap={{ base: 4, md: 0 }} w="full">
        <Text variant={'md'} letterSpacing={'-1.2%'}>Transaction History</Text>
        <MonthFilter onMonthSelect={handleMonthSelect} onClearMonth={handleClearMonth} />
      </Flex>

      {/* Transaction Table */}
      <Box mt={4}>
        {isFetchingTransactions ? (
          <Box w={'full'} h={'350px'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Spinner size={'lg'} />
          </Box>
        ) : (
          <>
            <CustomerTransactionTable data={transactions?.data || []} isFetchingTransactions={isFetchingTransactions} />
            <PaginationComponent
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </Box>
    </Stack>
  );
};

export default TransactionTemplate;

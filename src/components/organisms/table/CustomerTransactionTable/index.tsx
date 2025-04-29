import React, { useEffect } from 'react';
import {
  TableContainer,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  Table,
  Box,
  Tooltip,
  Text,
  Stack,
  HStack,
  useBreakpointValue,
  Spinner,
} from '@chakra-ui/react';
import TableCell from 'components/atoms/tableDetails/TableCell';
import TableHeaderCell from 'components/atoms/tableDetails/TableHeaderCell';
import TableRow from 'components/atoms/tableDetails/TableRow';
import PaginationComponent from '../../pagination/PaginationComponent';
import EmptyTaskIcon from 'components/atoms/icons/EmptyTasksIcon';
import { useParams, useRouter } from 'next/navigation';
import { useFetchAllTransactions } from 'api-services/business-services';
import moment from 'moment';

const CustomerTransactionTable = ({ data, isFetchingTransactions }: { data: any[]; isFetchingTransactions: boolean }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const router = useRouter();
  const { id } = useParams() as { id: string };

  // Handle empty state
  if (!data?.length) {
    return (
      <Stack align="center" py={16} spacing={4} w="100%">
        <EmptyTaskIcon />
        <Text fontSize="16px" fontWeight="500">
          You do not have any result at this time
        </Text>
      </Stack>
    );
  }

  // MOBILE VIEW: Display list
  if (isMobile) {
    return (
      isFetchingTransactions ? (
        <Box w="full" h="350px" display="flex" justifyContent="center" alignItems="center">
          <Spinner size="lg" />
        </Box>
      ) : (
        <Stack spacing={4} mt={4}>
          {data.map((row, index) => (
            <Box
              key={index}
              borderBottom="1px solid #E2E8F0"
              pb={3}
              pt={3}
              style={{ cursor: 'pointer' }}
              onClick={() => { router.push(`/admin/dashboard/business/customer-onboarding/manage-business/${id}/transaction-detail/${row?.id}`); }}
            >
              <HStack alignItems="flex-start" spacing={3}>
                <Box
                  bg="green.100"
                  w="40px"
                  h="40px"
                  borderRadius="8px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="lg" color="green.700">📄</Text>
                </Box>

                <Stack spacing={2}>
                  <Text fontWeight="700" fontSize="14px">
                    {row?.type ?? 'N/A'}
                  </Text>
                  <Text fontSize="14px" fontWeight="400">
                    {row?.amount ? `${row?.currency === 'ngn' ? `₦${row?.amount}` : `${row?.amount}`}` : 'N/A'}
                  </Text>
                  <Text fontSize="14px" fontWeight="400">{row?.operation ?? 'N/A'}</Text>
                  <Text
                    fontSize="14px"
                    fontWeight="600"
                    color={row?.status === 'Pending' ? '#C5B27D' : '#22C55E'}
                  >
                    {row?.status ?? 'N/A'}
                  </Text>
                </Stack>
              </HStack>
            </Box>
          ))}
        </Stack>
      )
    );
  }

  // DESKTOP VIEW: Display table
  return (
    isFetchingTransactions ? (
      <Box w="100%" h="350px" display="flex" justifyContent="center" alignItems="center">
        <Spinner size="lg" />
      </Box>
    ) : (
      <TableContainer mt="24px" borderTop="0.5px solid #7C92B0">
        <Table>
          <Thead>
            <TableRow>
              <TableHeaderCell>
                <Text variant="tableHeader">SN</Text>
              </TableHeaderCell>
              <TableHeaderCell>
                <Text variant="tableHeader">Payment Type</Text>
              </TableHeaderCell>
              <TableHeaderCell>
                <Text variant="tableHeader">Amount</Text>
              </TableHeaderCell>
              <TableHeaderCell>
                <Text variant="tableHeader">Date & Time</Text>
              </TableHeaderCell>
              <TableHeaderCell>
                <Text variant="tableHeader">Status</Text>
              </TableHeaderCell>
            </TableRow>
          </Thead>
          <Tbody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                style={{ cursor: 'pointer' }}
                onClick={() => { router.push(`/admin/dashboard/business/customer-onboarding/manage-business/${id}/transaction-detail/${row?.id}`); }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row?.type ?? 'N/A'}</TableCell>
                <TableCell>{row?.amount ?? 'N/A'}</TableCell>
                <TableCell>{moment(row?.createdAt).format('YYYY-MM-DD HH:mm a')}</TableCell>
                <TableCell color={row?.status === 'pending' ? '#C5B27D' : '#22C55E'}>
                  {row?.status ?? 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    )
  );
};

export default CustomerTransactionTable;

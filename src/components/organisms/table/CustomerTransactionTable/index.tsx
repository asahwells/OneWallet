import React, { useEffect, useState } from 'react';
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
    Spinner
} from '@chakra-ui/react';
import TableCell from 'components/atoms/tableDetails/TableCell';
import TableHeaderCell from 'components/atoms/tableDetails/TableHeaderCell';
import TableRow from 'components/atoms/tableDetails/TableRow';
import PaginationComponent from '../../pagination/PaginationComponent';
import EmptyTaskIcon from 'components/atoms/icons/EmptyTasksIcon';
import { useParams, useRouter } from 'next/navigation';
import { useFetchAllTransactions } from 'api-services/business-services';
import { format } from 'date-fns';

const CustomerTransactionTable = ({ data, isLoading, onPageChange }: { data: any[], isLoading: boolean, currentPage: number, totalPages: number, onPageChange: ()=>{} }) => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const router = useRouter()

    const { id } = useParams() as { id: string };
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    
    const { mutateAsync: fetchTransactions, data: transactions, isPending } = useFetchAllTransactions();

    const totalPages = transactions?.pagination?.lastPage;
    const page = transactions?.pagination?.currentPage;

    useEffect(() => {
    fetchTransactions({ id, page: currentPage, pageSize, limit: pageSize });
    }, [id, currentPage]);


    if (!transactions?.data?.length) {
        return (
          <Stack align="center" py={16} spacing={4} w="100%">
            <EmptyTaskIcon />
            <Text fontSize="16px" fontWeight="500">
              You do not have any result at this time
            </Text>
          </Stack>
        );
      }
      

    if (isMobile) {
        // MOBILE LIST VIEW
        return (
            (isPending ? 
                <Box w={'full'} h={'350px'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Spinner size={'lg'}/> 
                </Box>
                :
            <Stack spacing={4} mt={4}>
                {transactions?.data.map((row, index) => (
                    <Box
                        key={index}
                        borderBottom="1px solid #E2E8F0"
                        pb={3}
                        // optional top padding to separate items
                        pt={3}
                        style={{ cursor: 'pointer' }} 
                        onClick={() => {router.push(`/admin/dashboard/business/customer-onboarding/manage-business/${index}/transaction-detail/${index}`)}}
                    >
                        <HStack alignItems="flex-start" spacing={3}>
                            {/* Replace this with any icon you prefer */}
                            <Box
                                bg="green.100"
                                w="40px"
                                h="40px"
                                borderRadius="8px"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                {/* Example: <Icon as={SomeIcon} color="green.500" /> */}
                                <Text fontSize="lg" color="green.700">
                                    📄
                                </Text>
                            </Box>

                            <Stack spacing={2}>
                                <Text fontWeight="700" fontSize="14px">
                                    {row?.type ?? 'N/A'}
                                </Text>
                                <Text fontSize="14px"   fontWeight="400">
                                    {row?.amount ? `₦${row?.amount}`: 'N/A'}
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

                {/* Mobile Pagination */}
                <PaginationComponent
                    totalPages={totalPages}
                    currentPage={page}
                    onPageChange={setCurrentPage}
                />
            </Stack>)
        );
    }

    // DESKTOP TABLE VIEW
    return (
        (isPending ?
                    
            <Box w={'100%'} h={'350px'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Spinner size={'lg'}/> 
            </Box>
            :
        <TableContainer mt="24px" borderTop="0.5px solid #7C92B0">
            <Table>
                <Thead>
                    <TableRow>
                        <TableHeaderCell>
                            <Text variant="tableHeader">SN</Text>
                        </TableHeaderCell>
                        <TableHeaderCell>
                            <Text variant="tableHeader">PMT TYPE</Text>
                        </TableHeaderCell>
                        <TableHeaderCell>
                            <Text variant="tableHeader">AMOUNT</Text>
                        </TableHeaderCell>
                        <TableHeaderCell>
                            <Text variant="tableHeader">TRANS. TYPE</Text>
                        </TableHeaderCell>
                        <TableHeaderCell>
                            <Text variant="tableHeader">Date & TIME</Text>
                        </TableHeaderCell>
                        <TableHeaderCell>
                            <Text variant="tableHeader">Status</Text>
                        </TableHeaderCell>
                    </TableRow>
                </Thead>
                <Tbody>
                    {transactions?.data.map((row, index) => (
                        <TableRow key={index} style={{ cursor: 'pointer' }} onClick={() => {router.push(`/admin/dashboard/business/customer-onboarding/manage-business/${id}/transaction-detail/${row?.id}`)}}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{row?.type ?? 'N/A'}</TableCell>
                            <TableCell>{row?.amount ? `₦${row?.amount}`: 'N/A'}</TableCell>
                            <TableCell>{row?.operation ?? 'N/A'}</TableCell>
                            <TableCell>
                            {row?.createdAt
                                ? format(
                                    new Date(row.createdAt),
                                    'dd/MM/yyyy, hh:mm a'
                                )
                                : 'N/A'}
                            </TableCell>
                            <TableCell
                                color={row?.status === 'pending' ? '#C5B27D' : '#22C55E'}
                            >
                                {row?.status ?? 'N/A'}
                            </TableCell>
                        </TableRow>
                    ))}
                </Tbody>
            </Table>
            <PaginationComponent
                totalPages={totalPages}
                currentPage={page}
                onPageChange={setCurrentPage}
            />
        </TableContainer>)
    );
};

export default CustomerTransactionTable;

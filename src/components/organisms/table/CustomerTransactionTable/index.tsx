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
    Spinner
} from '@chakra-ui/react';
import TableCell from 'components/atoms/tableDetails/TableCell';
import TableHeaderCell from 'components/atoms/tableDetails/TableHeaderCell';
import TableRow from 'components/atoms/tableDetails/TableRow';
import PaginationComponent from '../../pagination/PaginationComponent';
import EmptyTaskIcon from 'components/atoms/icons/EmptyTasksIcon';
import { useParams, useRouter } from 'next/navigation';
import { useFetchAllTransactions } from 'api-services/business-services';
// import { Icon } from '@chakra-ui/icons'; // or your custom icon

const CustomerTransactionTable = ({ data }: { data: any[] }) => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const router = useRouter()

    const { id } = useParams() as { id: string };
    
    const { mutateAsync: fetchTransactions, data: transactions, isPending: isFetchingTransactions } = useFetchAllTransactions(id);

    useEffect(() => {
        fetchTransactions();
    }, []);

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
            (isFetchingTransactions ? 
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
                                    {row?.user?.firstName ?? 'N/A'} {row?.user?.lastName ?? 'N/A'}
                                </Text>
                                <Text fontSize="14px"   fontWeight="400">
                                    {row?.user?.state ? `${row?.user?.state} State` : 'N/A'}
                                </Text>
                                <Text fontSize="14px" fontWeight="400">{row?.user?.tier ?? 'N/A'}</Text>
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
                <PaginationComponent totalPages={10} currentPage={1} onPageChange={console.log} />
            </Stack>)
        );
    }

    // DESKTOP TABLE VIEW
    return (
        (isFetchingTransactions ?
                    
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
                            <Text variant="tableHeader">Name</Text>
                        </TableHeaderCell>
                        <TableHeaderCell>
                            <Text variant="tableHeader">Account Number</Text>
                        </TableHeaderCell>
                        <TableHeaderCell>
                            <Text variant="tableHeader">State</Text>
                        </TableHeaderCell>
                        <TableHeaderCell>
                            <Text variant="tableHeader">Tier</Text>
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
                            <TableCell>{row?.user?.firstName ?? 'N/A'} {row?.user?.lastName ?? 'N/A'}</TableCell>
                            <TableCell>{row?.user?.accountNumber ?? 'N/A'}</TableCell>
                            <TableCell>{row?.user?.state ?? 'N/A'}</TableCell>
                            <TableCell>{row?.user?.tier ?? 'N/A'}</TableCell>
                            <TableCell
                                color={row?.status === 'pending' ? '#C5B27D' : '#22C55E'}
                            >
                                {row?.status ?? 'N/A'}
                            </TableCell>
                        </TableRow>
                    ))}
                </Tbody>
            </Table>
            <PaginationComponent totalPages={10} currentPage={1} onPageChange={console.log} />
        </TableContainer>)
    );
};

export default CustomerTransactionTable;

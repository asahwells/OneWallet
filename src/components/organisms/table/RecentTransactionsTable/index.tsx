import {Flex, Box, Table, Tbody, Td, Text, Tooltip, Tr, useColorModeValue, Spinner} from '@chakra-ui/react';
import * as React from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import MoreIcon from "../../../atoms/icons/MoreIcon";
import SuccessPill from "../../../molecules/pills/SuccessPill";
import FailedPill from "../../../molecules/pills/FailedPill";
import PendingPill from "../../../molecules/pills/PendingPill";
import Card from '../../../../components/molecules/card/Card';
import { useRouter } from 'next/navigation';
import {TransactionTableProps} from "../interfaces";
import {formatToNaira} from "../../../../helpers/currencyHelper";

// Define Transaction type to align with your API response
interface Transaction {
    createdAt: string;
    amount: string;
    type: string;
    status: string;
    balanceAfter: string;
    reference: string;
    phone: string;
}

interface RecentTransactionsTableProps {
    transactions: Transaction[]; // Data will be passed as props
}

const columnHelper = createColumnHelper<Transaction>();

const RecentTransactionsTable = ({transactions, isLoading, }: TransactionTableProps) => {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const router = useRouter();

    // Define columns based on API response
    const columns = [
        columnHelper.accessor('reference', {
            id: 'reference',
            header: () => (
                <Text justifyContent='space-between' align='center' variant={'tableSubHeader'}>
                    Reference
                </Text>
            ),
            cell: (info: any) => (
                <Flex align='center'>
                    <Text variant={'tableSubHeader'}>{info.getValue()}</Text>
                </Flex>
            ),
        }),
        columnHelper.accessor('type', {
            id: 'type',
            header: () => (
                <Text justifyContent='space-between' align='center' fontSize={{ sm: '10px', lg: '12px' }} color='gray.400'>
                    Type
                </Text>
            ),
            cell: (info) => <Text variant={'tableSubHeader'}>{info.getValue()}</Text>,
        }),
        columnHelper.accessor('createdAt', {
            id: 'createdAt',
            header: () => (
                <Text justifyContent='space-between' align='center' fontSize={{ sm: '10px', lg: '12px' }} color='gray.400'>
                    Date
                </Text>
            ),
            cell: (info) => <Text variant={'tableSubHeader'}>{new Date(info.getValue()).toLocaleDateString()}</Text>,
        }),
        columnHelper.accessor('amount', {
            id: 'amount',
            header: () => (
                <Text justifyContent='space-between' align='center' fontSize={{ sm: '10px', lg: '12px' }} color='gray.400'>
                    Amount
                </Text>
            ),
            cell: (info) => <Text variant={'tableSubHeader'}>{formatToNaira(info.getValue())}</Text>,
        }),
        columnHelper.accessor('status', {
            id: 'status',
            header: () => (
                <Text justifyContent='space-between' align='center' fontSize={{ sm: '10px', lg: '12px' }} color='gray.400'>
                    Status
                </Text>
            ),
            cell: (info) => {
                const status = info.getValue();
                if (status === 'successful') {
                    return <SuccessPill />;
                } 
                if (status === 'failed') {
                    return <FailedPill />;
                } 
                if (status === 'pending') {
                    return <PendingPill />;
                }
                return null;
            },
        }),
        columnHelper.accessor('reference', {
            id: 'action',
            header: () => (
                <Text justifyContent='space-between' align='center' fontSize={{ sm: '10px', lg: '12px' }} color='gray.400'>
                    Action
                </Text>
            ),
            cell: () => (
                <Box cursor={'pointer'}>
                    <MoreIcon />
                </Box>
            ),
        }),
    ];

    // Initialize table instance
    const table = useReactTable({
        // @ts-ignore
        data: transactions ?? [], // Safeguard to ensure transactions is always an array
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
    });

    const getTableBody = () => {
        if (isLoading) {
            return (
                <Tbody>
                    <Tr>
                        <Td textAlign='center' colSpan={6}>
                            <Spinner size={'md'} />
                        </Td>
                    </Tr>
                </Tbody>
            );
        }

        if(!transactions?.length) {
            return (
                <Tbody>
                    <Tr>
                        <Td textAlign='center' colSpan={6}>
                            <Text variant={'tableSubHeader'} color={textColor}>
                                No transactions available
                            </Text>
                        </Td>
                    </Tr>
                </Tbody>
            );
        }

        return (
            <Tbody>
                {table.getRowModel().rows.slice(0, 8).map((row) => (
                    <Tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <Tooltip key={cell.id} label='View' bg={'#E4E4E7'} variant="base" mt={-7} mr={7} borderBottomRadius={'12px'}>
                                <Td
                                    fontSize={{ sm: '14px' }}
                                    minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                                    borderBottom={'0.88px solid #E4E4E7'}
                                    onClick={() => {
                                        // @ts-ignore
                                        router.push(`/admin/transaction/${row.original.id}`)
                                    }}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </Td>
                            </Tooltip>
                        ))}
                    </Tr>
                ))}
            </Tbody>
        );
    }


    return (
        <Card borderRadius={8} border={'0.88px solid #E4E4E7'} flexDirection='column' w='100%' h='300px' overflowY="auto" px='0px' overflowX={{ sm: 'scroll', lg: 'scroll' }}>
            <Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
                <Text lineHeight='100%' variant={'tableHeader'}>
                    Recent Transactions
                </Text>
                <Box cursor={'pointer'}>
                    <Text variant={'tableLabel'} letterSpacing={2}>
                        {'View All  >'}
                    </Text>
                </Box>
            </Flex>

            <Box>
                <Table variant='simple' color='gray.500' mb='24px' mt="12px">

                    {getTableBody()}
                </Table>
            </Box>
        </Card>
    );
};

export default RecentTransactionsTable;

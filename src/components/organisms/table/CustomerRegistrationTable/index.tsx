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
    Spinner,
    Center,
    Flex
} from '@chakra-ui/react';
import TableCell from 'components/atoms/tableDetails/TableCell';
import TableHeaderCell from 'components/atoms/tableDetails/TableHeaderCell';
import TableRow from 'components/atoms/tableDetails/TableRow';
import PaginationComponent from '../../pagination/PaginationComponent';
import EmptyTaskIcon from 'components/atoms/icons/EmptyTasksIcon';
import { useRouter } from 'next/navigation';
import { useFetchAllCustomers } from 'api-services/business-services';
import { CustomerRegistrationTableProps } from '../interfaces';
import FailedRegIcon from 'components/atoms/icons/FailedRegIcon';
import ApprovedRegIcon from 'components/atoms/icons/ApprovedRegIcon';
import PendingRegIcon from 'components/atoms/icons/PendingRegIcon';

const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <PendingRegIcon />;
      case 'active':
        return <ApprovedRegIcon />;
      default:
        return <FailedRegIcon />;
    }
  };
  
const CustomerRegistrationTable = ({
    data,
    isLoading,
    currentPage = 1,
    totalPages = 1,
    onPageChange = () => {},
  }: CustomerRegistrationTableProps) => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const router = useRouter();
  
    // 1. Show spinner if loading
    if (isLoading) {
      return (
        <Center h="350px">
          <Spinner size="lg" />
        </Center>
      );
    }

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

    if (isMobile) {
        // MOBILE LIST VIEW
        return (
            (isLoading ?
            
            <Box w={'full'} h={'350px'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Spinner size={'lg'}/> 
            </Box>
            :
            <Stack spacing={0} mt={4} p={0}>
                {data.map((row, index) => (
                    <Box
                        key={index}
                        borderBottom="1px solid #E2E8F0"
                        pb={3}
                        // optional top padding to separate items
                        pt={3}
                        bg={'white'}
                        style={{ cursor: 'pointer' }} 
                        onClick={() => {router.push(`/admin/dashboard/business/customer-onboarding/manage-business/${row?.id}`)}}
                    >
                        <HStack alignItems="flex-start" spacing={3} px={4}>
                            {/* Replace this with any icon you prefer */}
                            <Flex alignItems={'center'} gap={8}>
                            <Box
                                bg="green.100"
                                w="20px"
                                h="20px"
                                borderRadius="8px"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                              {getStatusIcon(row?.status)}
                            </Box>

                            <Stack spacing={2}>
                                <Text fontWeight="700" fontSize="14px">
                                    {row?.fullName ?? 'N/A'}
                                </Text>
                                <Text fontSize="14px"   fontWeight="400">
                                    {row?.state ? `${row?.state} State` : 'N/A'}
                                </Text>
                                <Text fontSize="14px" fontWeight="400">{row?.tier ?? 'N/A'}</Text>
                                <Text
                                    fontSize="14px"
                                    fontWeight="600"
                                    color={row?.status === 'Pending' ? '#C5B27D' : '#22C55E'}
                                >
                                    {row?.status ?? 'N/A'}
                                </Text>
                            </Stack>
                            </Flex>
                        </HStack>
                    </Box>
                ))}
                  {/* Mobile Pagination */}
             <PaginationComponent
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                />
            </Stack>)
        );
    }

    // DESKTOP TABLE VIEW
    return (
        (isLoading ?
            
            <Box w={'100%'} h={'350px'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Spinner size={'lg'}/> 
            </Box>
            :
            <Box >
        <TableContainer bg={'white'}  borderTop="0.5px solid #7C92B0">
            <Table pt={6}>
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
                    {data.map((row, index) => (
                        <TableRow key={index} style={{ cursor: 'pointer' }} onClick={() => {router.push(`/admin/dashboard/business/customer-onboarding/manage-business/${row?.id}`)}}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{row?.fullName ?? 'N/A'}</TableCell>
                            <TableCell>{row?.accountNumber ?? 'N/A'}</TableCell>
                            <TableCell>{row?.state ?? 'N/A'}</TableCell>
                            <TableCell>{row?.tier ?? 'N/A'}</TableCell>
                            <TableCell
                                color={row?.status === 'Pending' ? '#C5B27D' : '#22C55E'}
                            >
                                {row?.status ?? 'N/A'}
                            </TableCell>
                        </TableRow>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
        <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={onPageChange}
            />
        </Box>)
    );
};

export default CustomerRegistrationTable;

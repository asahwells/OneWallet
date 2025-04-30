'use client';

import React, { useEffect } from 'react';
import {
  Box, Container, Flex, Grid, Heading, Text, Badge,
  IconButton, useBreakpointValue,
} from '@chakra-ui/react';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import { useParams, useRouter } from 'next/navigation';
import HeaderBackButton from 'components/molecules/buttons/HeaderBackButton';
import { TransactionData } from '../../../../../mockData';
import Status from '../../../../../../molecules/badge/Status/status';
import { TransactionStatus } from 'components/molecules/badge/Status/status.enum';
import { useFetchSingleTransaction } from 'api-services/business-services';
import moment from 'moment';

const TransactionDetailTemplate = () => {
  const statusOptions = ['Successful', 'Pending', 'Failed'];
  const { id } = useParams() as { id: string };
  const { transactionId } = useParams() as { transactionId: string };

  const router = useRouter();

  //const transaction = { ...TransactionData };
  const { mutateAsync: fetchTransaction, data: transaction, isPending: isFetchingTransactionDetails } = useFetchSingleTransaction(id, transactionId);
  
  useEffect(() => {
    fetchTransaction();
  }, []);
  // Status badge styling
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Successful':
        return {
          color: '#22C55E',
          bg: '#DCFCE7',
        };
      case 'Pending':
        return {
          color: '#C5B27D',
          bg: '#F3F0E5',
        };
      case 'Failed':
        return {
          color: '#EF4444',
          bg: '#FEE2E2',
        };
      default:
        return {
          color: 'gray.500',
          bg: 'gray.100',
        };
    }
  };

  //const statusStyles = getStatusStyles(transaction.status);

  const capitalizeFirstLetter = (str: string | undefined): string => {
    if (!str) return ''; 
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  

  return (
    <Box bg="#FAFAFB" minH="100vh">
        <Box w={'fit-content'} >
          <HeaderBackButton header='Business' onBack={()=> router.back()}/>
        </Box>
      <Container maxW="container.md" py={4} bg="white">
        {/* Header */}
        <Flex align="center" mb={6}>
          <Heading size="md" color="#344256">
            Transaction ID: {transaction?.data?.id}
          </Heading>
        </Flex>

        {/* Main content */}
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="sm"
        >
          {/* Transaction Details Header */}
          <Box py={6} px={4} borderBottom="1px solid" borderColor="gray.200">
            <Flex justify="space-between" gap={2} align="center">
              <Text variant={'md'}>
                Transaction Details
              </Text>
              <Status status={capitalizeFirstLetter(transaction?.data?.status as string) as TransactionStatus} />
            </Flex>
          </Box>

          {/* Transaction Overview */}
          <Box p={6} borderBottom="1px solid" borderColor="gray.200">
            <Text fontSize="sm" fontWeight="medium" color="#C5B27D" mb={4}>
              Transaction Overview
            </Text>

            <Grid templateColumns="1fr 1fr" gap={4}>
              <Box>
                <Text fontSize="sm" color="#6B7280" mb={1}>
                  Transaction ID
                </Text>
              </Box>
              <Box textAlign="right">
                <Text fontSize="sm" fontWeight="medium" color="#344256">
                  {transaction?.data?.id || 'N/A'}
                </Text>
              </Box>

              <Box>
                <Text fontSize="sm" color="#6B7280" mb={1}>
                  Transaction Status
                </Text>
              </Box>
              <Box textAlign="right">
                <Text fontSize="sm" fontWeight="medium" color="#344256">
                  {transaction?.data?.status ? transaction?.data?.status : 'N/A'}
                </Text>
              </Box>

              <Box>
                <Text fontSize="sm" color="#6B7280" mb={1}>
                  Transaction Type
                </Text>
              </Box>
              <Box textAlign="right">
                <Text fontSize="sm" fontWeight="medium" color="#344256">
                  {transaction?.data?.operation || 'N/A'}
                </Text>
              </Box>

              <Box>
                <Text fontSize="sm" color="#6B7280" mb={1}>
                  Payment Type
                </Text>
              </Box>
              <Box textAlign="right">
                <Text fontSize="sm" fontWeight="medium" color="#344256">
                  {transaction?.data?.type || 'N/A'}
                </Text>
              </Box>

              <Box>
                <Text fontSize="sm" color="#6B7280" mb={1}>
                  Amount
                </Text>
              </Box>
              <Box textAlign="right">
                <Text fontSize="sm" fontWeight="medium" color="#344256">
                  {transaction?.data?.amount ? `₦${transaction?.data?.amount}` : 'N/A'}
                </Text>
              </Box>

              <Box>
                <Text fontSize="sm" color="#6B7280" mb={1}>
                  Transaction Date & Time
                </Text>
              </Box>
              <Box textAlign="right">
                <Text fontSize="sm" fontWeight="medium" color="#344256">
                  {transaction?.data?.createdAt ? moment(transaction?.data?.createdAt).format('YYYY-MM-DD HH:mm a') : 'N/A'}
                </Text>
              </Box>
            </Grid>
          </Box>

          {/* Sender Information */}
          <Box p={6} borderBottom="1px solid" borderColor="gray.200">
            <Text fontSize="sm" fontWeight="medium" color="#C5B27D" mb={4}>
              Sender Information
            </Text>

            <Grid templateColumns="1fr 1fr" gap={4}>
              <Box>
                <Text fontSize="sm" color="#6B7280" mb={1}>
                  Bank Name
                </Text>
              </Box>
              <Box textAlign="right">
                <Text fontSize="sm" fontWeight="medium" color="#344256">
                  {transaction?.data?.senderBankName || 'N/A'}
                </Text>
              </Box>

              <Box>
                <Text fontSize="sm" color="#6B7280" mb={1}>
                  Account Number
                </Text>
              </Box>
              <Box textAlign="right">
                <Text fontSize="sm" fontWeight="medium" color="#344256">
                  {transaction?.data?.senderSourceAccountNo || 'N/A'}
                </Text>
              </Box>

              <Box>
                <Text fontSize="sm" color="#6B7280" mb={1}>
                  Account Name
                </Text>
              </Box>
              <Box textAlign="right">
                <Text fontSize="sm" fontWeight="medium" color="#344256">
                  {transaction?.data?.senderAccountName || 'N/A'}
                </Text>
              </Box>
            </Grid>
          </Box>

          {/* Recipient Information */}
          <Box p={6} borderBottom="1px solid" borderColor="gray.200">
            <Text fontSize="sm" fontWeight="medium" color="#C5B27D" mb={4}>
              Recipient Information
            </Text>

            <Grid templateColumns="1fr 1fr" gap={4}>
              <Box>
                <Text fontSize="sm" color="#6B7280" mb={1}>
                  Bank Name
                </Text>
              </Box>
              <Box textAlign="right">
                <Text fontSize="sm" fontWeight="medium" color="#344256">
                  {transaction?.data?.recipientBankName || 'N/A'}
                </Text>
              </Box>

              <Box>
                <Text fontSize="sm" color="#6B7280" mb={1}>
                  Account Name
                </Text>
              </Box>
              <Box textAlign="right">
                <Text fontSize="sm" fontWeight="medium" color="#344256">
                  {transaction?.data?.recipientAccountName || 'N/A'}
                </Text>
              </Box>

              <Box>
                <Text fontSize="sm" color="#6B7280" mb={1}>
                  Account Number
                </Text>
              </Box>
              <Box textAlign="right">
                <Text fontSize="sm" fontWeight="medium" color="#344256">
                  {transaction?.data?.recipientAccountNumber || 'N/A'}
                </Text>
              </Box>
            </Grid>
          </Box>

          {/* Note */}
          {transaction?.data?.narration && (
            <Box p={6}>
              <Grid templateColumns="1fr 1fr" gap={4}>
                <Box>
                  <Text fontSize="sm" color="#6B7280" mb={1}>
                    Note
                  </Text>
                </Box>
                <Box textAlign="right">
                  <Text fontSize="sm" fontWeight="medium" color="#344256">
                    {transaction?.data?.narration }
                  </Text>
                </Box>
              </Grid>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default TransactionDetailTemplate;
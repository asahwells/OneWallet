'use client';

import React from 'react';
import { Badge, Box } from '@chakra-ui/react';
import { StatusBadgeProps } from '../interfaces/index';
import { TransactionStatus } from './status.enum';

// Status badge styling
const getStatusStyles = (status: string) => {
switch (status) {
    case TransactionStatus.Successful:
    return {
        color: '#22C55E',
        bg: '#DCFCE7',
    };
    case TransactionStatus.Pending:
    return {
        color: '#C5B27D',
        bg: '#F3F0E5',
    };
    case TransactionStatus.Failed:
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

const Status = ({ status }: StatusBadgeProps) => {
const statusStyles = getStatusStyles(status);

  return (
    <Badge
      px={3}
      py={1}
      borderRadius="full"
      bg={statusStyles.bg}
      color={statusStyles.color}
      fontWeight="medium"
      display="flex"
      alignItems="center"
      gap={2}
    >
      <Box
        w="8px"
        h="8px"
        borderRadius="full"
        bg={statusStyles.color}
      />
      {status}
    </Badge>
  );
};

export default Status;

import React from 'react';
import { Th as ChakraTh } from '@chakra-ui/react';
import { ITableHeaderCellProps } from '../interfaces';

const TableHeaderCell = ({ children, ...props }: ITableHeaderCellProps) => {
  return (
    <ChakraTh borderBottom="1px solid #E5E9EB" fontWeight={600} color="#84919A" fontSize="12px" lineHeight="16px" letterSpacing="-1.8%" {...props}>
      {children}
    </ChakraTh>
  );
};

export default TableHeaderCell;

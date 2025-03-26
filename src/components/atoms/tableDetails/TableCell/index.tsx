import React from 'react';
import { Td as ChakraTd } from '@chakra-ui/react';
import { ITableCellProps } from '../interfaces';

const TableCell = ({ children, ...props }: ITableCellProps) => {
  return (
    <ChakraTd borderBottom="1px solid #E5E9EB" fontWeight={400} fontSize="16px" lineHeight="24px" letterSpacing="-1.2%" color="#344256"  {...props}>
      {children}
    </ChakraTd>
  );
};

export default TableCell;

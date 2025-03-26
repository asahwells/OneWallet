import React from 'react';
import { Tr as ChakraTr } from '@chakra-ui/react';
import { ITableRowProps } from '../interfaces';

const TableRow = ({ children, ...props }: ITableRowProps) => {
  return (
    <ChakraTr {...props}>
      {children}
    </ChakraTr>
  );
};

export default TableRow;

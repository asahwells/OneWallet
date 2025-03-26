import React from 'react';
import { Table as ChakraTable } from '@chakra-ui/react';
import { ITableProps } from '../interfaces';

const Table = ({ children, ...props }: ITableProps) => {
  return (
    <ChakraTable variant="simple" {...props}>
      {children}
    </ChakraTable>
  );
};

export default Table;

import {TableContainer, Tbody, Thead, Tr, Th, Td, Table, Box, Tooltip} from '@chakra-ui/react';
import TableCell from 'components/atoms/tableDetails/TableCell';
import TableHeaderCell from 'components/atoms/tableDetails/TableHeaderCell';
import TableRow from 'components/atoms/tableDetails/TableRow';
import React from 'react';
import { PendingTableProps } from '../interfaces';
import { format } from "date-fns"
import { useRouter } from 'next/navigation';
import { IPendingUserRes } from 'api-services/user-services/interfaces';

const TableComponent = ({data}: IPendingUserRes) => {
  const router = useRouter();

  const handleView = () => {
    router.push(`/admin/user-information/${'id'}`);
  };
  return (
<TableContainer mt="24px">
      <Table>
        <Thead>
          <TableRow>
            <TableHeaderCell>SN</TableHeaderCell>
            <TableHeaderCell>ACCT. NAME</TableHeaderCell>
            <TableHeaderCell>TIER LEVEL</TableHeaderCell>
            <TableHeaderCell>ACCOUNT NUMBER</TableHeaderCell>
            <TableHeaderCell>APPROVAL TYPE</TableHeaderCell>
            <TableHeaderCell>DATE OF SUBMISSION</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </Thead>
        <Tbody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row?.accountName ? row?.accountName : 'N/A'}</TableCell>
              <TableCell>{row?.tier ? row?.tier : 'N/A'}</TableCell>
              <TableCell>{row?.accountNumber ? row?.accountNumber : 'N/A'}</TableCell>
              <TableCell>{row?.approvalType ? row?.approvalType : 'N/A'}</TableCell>
              <TableCell>{format(row?.dateOfSubmission, "yyyy-dd-MM HH:mm a")}</TableCell>
              <TableCell >
                <Box cursor={'pointer'} >
                  ...
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;

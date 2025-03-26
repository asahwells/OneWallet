import {TableContainer, Tbody, Thead, Tr, Th, Td, Table, Box, Tooltip} from '@chakra-ui/react';
import TableCell from 'components/atoms/tableDetails/TableCell';
import TableHeaderCell from 'components/atoms/tableDetails/TableHeaderCell';
import TableRow from 'components/atoms/tableDetails/TableRow';
import React from 'react';
import { PendingTableProps } from '../interfaces';
import { useRouter } from 'next/navigation';
import { ISuspendedMerchantRes, ISuspendedUserRes } from 'api-services/user-services/interfaces';
import { format } from 'date-fns';

const SuspendedMerchantsTableComponent = ({data}: ISuspendedMerchantRes) => {
  const router = useRouter();

  const handleView = (id: string) => {
    router.push(`/admin/user-information/${id}`);
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
            <TableHeaderCell>Reason</TableHeaderCell>
            <TableHeaderCell>DATE OF SUBMISSION</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </Thead>
        <Tbody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row?.fullName ? row?.fullName : 'N/A'}</TableCell>
              <TableCell>{row?.tier ? row?.tier : 'N/A'}</TableCell>
              <TableCell>{row?.accountNumber ? row?.accountNumber : 'N/A'}</TableCell>
              <TableCell>{row?.category ? row?.category : 'N/A'}</TableCell>
              <TableCell>{row?.createdAt ? format(row?.createdAt, "yyyy-dd-MM HH:mm a") : "N/A"}</TableCell>
              <TableCell >
                <Tooltip label='View' bg={'#E4E4E7'} variant="base" mt={-3} mr={5} borderBottomRadius={'12px'}>
                  <Box onClick={()=>handleView(row?.id)} cursor={'pointer'} >
                    ...
                  </Box>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default SuspendedMerchantsTableComponent;

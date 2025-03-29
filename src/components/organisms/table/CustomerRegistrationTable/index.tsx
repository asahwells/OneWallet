import {TableContainer, Tbody, Thead, Tr, Th, Td, Table, Box, Tooltip, Text, Stack} from '@chakra-ui/react';
import TableCell from 'components/atoms/tableDetails/TableCell';
import TableHeaderCell from 'components/atoms/tableDetails/TableHeaderCell';
import TableRow from 'components/atoms/tableDetails/TableRow';
import React from 'react';
import { PendingTableProps } from '../interfaces';
import { useRouter } from 'next/navigation';
import { ISuspendedUserRes } from 'api-services/user-services/interfaces';
import { format } from 'date-fns';
import EmptyTaskIcon from "../../../atoms/icons/EmptyTasksIcon";
import PaginationComponent from "../../pagination/PaginationComponent";

const CustomerRegistrationTable = ({data}: any) => {
  const router = useRouter();

  const handleView = (id: string) => {
    router.push(`/admin/user-information/${id}`);
  };

  const getDataTable = () => {

    if(!data?.length){
      return (
          <Stack alignSelf={'center'} py={16} spacing={4} w={'100%'} alignItems={'center'} justifyContent={'center'}>
            <EmptyTaskIcon />

            <Text fontSize={'16px'} fontWeight={'500'}>
                You do not have any result at this time
            </Text>
          </Stack>
      )
    }

    return (
        <>
          {data.map((row, index) => (
              <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                <TableCell>{row?.fullName ? row?.fullName : 'N/A'}</TableCell>

                <TableCell>{row?.accountNumber ? row?.accountNumber : 'N/A'}</TableCell>
                  <TableCell>{row?.state ? row?.state : 'N/A'}</TableCell>
                <TableCell>{row?.tier ? row?.tier : 'N/A'}</TableCell>
                <TableCell color={row?.status == 'Pending' ?  '#C5B27D' : '#22C55E'}>{row?.status}</TableCell>
                <TableCell >
                  <Tooltip label='View' bg={'#E4E4E7'} variant="base" mt={-3} mr={5} borderBottomRadius={'12px'}>
                    <Box onClick={()=>handleView(row?.id)} cursor={'pointer'} >
                      ...
                    </Box>
                  </Tooltip>
                </TableCell>
              </TableRow>
          ))}
        </>
    )

  }


  return (
<TableContainer mt="24px" borderTop={'0.5px solid #7C92B0'}>
      <Table>
        <Thead>
          <TableRow>
              <TableHeaderCell>
                  <Text variant={'tableHeader'}>
                      SN
                  </Text>
              </TableHeaderCell>
              <TableHeaderCell>
                  <Text variant={'tableHeader'}>
                      Name
                  </Text>
              </TableHeaderCell>
              <TableHeaderCell>

                  <Text variant={'tableHeader'}>Account Number
                  </Text>
              </TableHeaderCell>
              <TableHeaderCell>
                  <Text variant={'tableHeader'}>State </Text></TableHeaderCell>
              <TableHeaderCell>
                  <Text variant={'tableHeader'}>
                      Tier
                  </Text>
              </TableHeaderCell>
              <TableHeaderCell>

                  <Text variant={'tableHeader'}>Status
                  </Text>
              </TableHeaderCell>
          </TableRow>
        </Thead>
        <Tbody >

            {getDataTable()}
        </Tbody>
      </Table>
    <PaginationComponent totalPages={10} currentPage={1} onPageChange={console.log} />
    </TableContainer>
  );
};

export default CustomerRegistrationTable;

import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdDashboard,
  MdLock,
  MdOutlineShoppingCart,
} from 'react-icons/md';
import { IoIosPeople } from "react-icons/io";

import { IRoute } from 'types/navigation';
import TransactionsIcon from 'components/atoms/icons/TransactionsIcon';

const routes: IRoute[] = [
  {
    name: 'Dashboard',
    layout: '/admin',
    path: '/dashboard',
    icon: <Icon as={MdDashboard} width="20px" height="20px" />,
  },
  {
    name: 'All Users',
    layout: '/admin',
    path: '/suspended-users',
    icon: (
      <Icon
        as={IoIosPeople}
        width="20px"
        height="20px"
      />
    ),
    secondary: true,
  },
  {
    name: 'All Transactions',
    layout: '/admin',
    icon: <Icon as={TransactionsIcon} width="20px" height="20px" color="#3F6A72"/>,
    path: '/dashboard/transactions',
  }
];

export default routes;

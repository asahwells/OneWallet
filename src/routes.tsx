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
import {BusinessIcon} from "./components/atoms/icons/BusinessIcon";
import {DeviceManagerIcon} from "./components/atoms/icons/DeviceManagerIcon";

const routes: IRoute[] = [
  {
    name: 'Dashboard',
    layout: '/admin',
    path: '/dashboard',
    icon: <Icon as={MdDashboard} width="20px" height="20px" />,
  },
  {
    name: 'Business',
    layout: '/admin',
    path: '/dashboard/business/customer-onboarding',
    icon: (
      <Icon
        as={BusinessIcon}
        width="20px"
        height="20px"
      />
    ),
    secondary: true,
  },
  {
    name: 'Device Manager',
    layout: '/admin',
    icon: <Icon as={DeviceManagerIcon} width="20px" height="20px"/>,
    path: '/dashboard/device-manager',
  }
];

export default routes;
'use client';


import {
    Box, HStack, Radio, RadioGroup, Show,
    SimpleGrid, Spinner, Stack, Text,
} from '@chakra-ui/react';

import AnalyticsCard from "../../../molecules/card/AnalyticsCard";
import TransactionVolumeChart from "../../../molecules/charts/TransactionVolumeChart";
import KycComplianceCard from "../../../organisms/cards/KycComplianceCard";
import RecentTransactionsTable from "../../../organisms/table/RecentTransactionsTable";
import TransactionReportChart from "../../../molecules/charts/TransactionReportChart";
import OutlineButton from "../../../molecules/buttons/OutlineButton";
import {useEffect, useState} from "react";
import MerchantKycComplianceCard from 'components/organisms/cards/MerchantKycComplianceCard';

import {IDurationFilter} from "../../../../api-services/interfaces";
import {getPieChartData, getPieChartLabels} from "../../../../helpers/chartHelpers";
import {formatToNaira} from "../../../../helpers/currencyHelper";
import TotalApplicationIcon from "../../../atoms/icons/TotalApplicationIcon";
import TotalDevicesSoldIcon from "../../../atoms/icons/TotalDevicesSoldIcon";
import QuickActionCard from "../../../organisms/cards/QuickActionCard";
import CommissionCard from "../../../organisms/cards/CommissionCard";
import PendingTasksCard from "../../../organisms/cards/PendingTasksCard";
import {MockPendingTasks} from "../../../../mock/PendingTasks";
import {barChartDataDailyTraffic, barChartOptionsDailyTraffic, pieChartData} from "../../../../variables/charts";
import BarChart from "../../../molecules/charts/BarChart";
import ExpectedPaymentChart from "../../../molecules/charts/ExpectedPaymentChart";
import { useFetchDashboard, useFetchDashboardGraph, useFetchLoggedInUser } from 'api-services/dashboard-services';
import { useAppSelector } from '../../../../redux/store'; 
// Assets

const UserDashboardTemplate = () =>  {
    const { userDetails } = useAppSelector(state => state.user)
    //const { mutateAsync: fetchUser, data: user, isPending: isFetchingUser } = useFetchLoggedInUser();
    const { mutateAsync: fetchDashboardInfo, data: dashboard, isPending: isFetchingDashboard } = useFetchDashboard();
    const { mutateAsync: fetchDashboardGraph, data: dashboardGraph, isPending: isFetchingDashboardGraph } = useFetchDashboardGraph();

    useEffect(() => {
        //fetchUser();
        fetchDashboardInfo();
        fetchDashboardGraph();
    }, []);

        return (
        <Stack pt={{ base: '60px', md: '60px', xl: '10px' }} pl={6} gap={5} pr={5} >

            <Stack>
                <Text variant={'base'}>
                {userDetails?.firstName ? `Welcome, ${userDetails.firstName}` : 'No name available'}
                </Text>
            </Stack>

            <Show below={'md'}>
                <CommissionCard commission={dashboard?.data?.totalCommissions} isLoading={isFetchingDashboard}/>
            </Show>

            <Stack
                direction={{ base: 'column', md: 'row' }} // Responsive layout: column on mobile, row on desktop
                w="full"
                gap={10}
                align="stretch" // Ensures children stacks stretch to equal height
            >
                {/* Left Hand Side */}
                <Stack spacing={5} flex={1}>
                    <SimpleGrid columns={{ base: 2, md: 2 }} gap={["20px", '8px']}>
                        <AnalyticsCard
                            title="Total Application"
                            value={dashboard ? `${dashboard.data?.totalApplications}`: 'N/A'}    
                            isLoading={isFetchingDashboard}
                            icon={<TotalApplicationIcon />}
                        />
                        <AnalyticsCard
                            title="Total Devices Sold"
                            value={dashboard ? `${dashboard.data?.totalDevicesSold}`: 'N/A'}    
                            isLoading={isFetchingDashboard}
                            icon={<TotalDevicesSoldIcon />}
                        />
                    </SimpleGrid>
                    <QuickActionCard />
                </Stack>

                {/* Right Hand Side */}
                <Stack spacing={5} flex={1}>
                   <Show above={'md'}>
                       <CommissionCard commission={dashboard?.data?.totalCommissions} isLoading={isFetchingDashboard}/>
                   </Show>
                    <PendingTasksCard pendingTasks={MockPendingTasks} />
                </Stack>

            </Stack>


            <Stack
                direction={{base: 'column', md: 'row'}} // Responsive layout: column on mobile, row on desktop
                w="full"
                spacing={8}
                align="stretch" // Ensures children stacks stretch to equal height
            >

               <Show above={'md'}>
                   <Box w={{
                          base: 'full',
                          md: '35%'
                   }} h={'full'} borderRadius={'4px'}>
                       <TransactionReportChart totalTransactionValue={''} rawData={pieChartData} data={getPieChartData([])}
                                               labels={[
                                                   'Active Devices',
                                                   'Inactive Devices'
                                               ]}/>
                   </Box>

               </Show>
                <Box w={{
                    base: 'full',
                    md: '65%'
                }} borderRadius={'4px'}>
                    <ExpectedPaymentChart/>

                </Box>
            </Stack>



        </Stack>


    );
}
export  default UserDashboardTemplate;
'use client';


import {
    Box, HStack, Radio, RadioGroup, Show,
    SimpleGrid, Stack, Text,
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
// Assets

const UserDashboardTemplate = () =>  {

    const [activeFilter, setActiveFilter] = useState<IDurationFilter>()


    const [value, setValue] = useState('User')


    const handleFilterChange = (filter : IDurationFilter) => {

        setActiveFilter(filter)
    }


        return (
        <Stack pt={{ base: '60px', md: '60px', xl: '10px' }} pl={6} gap={5} >

            <Stack  >
                <Text variant={'base'}>
                    Welcome, Emmanuel
                </Text>
            </Stack>

            <Show below={'md'}>
                <CommissionCard />
            </Show>

            <Stack
                direction={{ base: 'column', md: 'row' }} // Responsive layout: column on mobile, row on desktop
                w="full"
                gap={10}
                align="stretch" // Ensures children stacks stretch to equal height
            >
                {/* Left Hand Side */}
                <Stack spacing={5} flex={1}>
                    <SimpleGrid columns={{ base: 2, md: 2 }} gap="20px">
                        <AnalyticsCard
                            title="Total Application"
                            value="743"
                            isLoading={false}
                            icon={<TotalApplicationIcon />}
                        />
                        <AnalyticsCard
                            title="Total Devices Sold"
                            value="204"
                            isLoading={false}
                            icon={<TotalDevicesSoldIcon />}
                        />
                    </SimpleGrid>
                    <QuickActionCard />
                </Stack>

                {/* Right Hand Side */}
                <Stack spacing={5} flex={1}>
                   <Show above={'md'}>
                       <CommissionCard />
                   </Show>
                    <PendingTasksCard pendingTasks={MockPendingTasks} />
                </Stack>

            </Stack>




            {/*<Stack*/}
            {/*    direction={{ base: 'column', md: 'row' }} // Responsive layout: column on mobile, row on desktop*/}
            {/*    w="full"*/}
            {/*    gap={10}*/}
            {/*    align="stretch" // Ensures children stacks stretch to equal height*/}
            {/*>*/}
            {/*    <TransactionVolumeChart data={[]} />*/}
            {/*    <TransactionReportChart totalTransactionValue={'1242'} rawData={[]} data={getPieChartData([])} labels={getPieChartLabels([])} />*/}

            {/*</Stack>*/}



        </Stack>


    );
}
export  default UserDashboardTemplate;
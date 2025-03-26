'use client';


import {
    Box, HStack, Radio, RadioGroup,
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
// Assets

const UserDashboardTemplate = () =>  {

    const [activeFilter, setActiveFilter] = useState<IDurationFilter>()


    const [value, setValue] = useState('User')


    const handleFilterChange = (filter : IDurationFilter) => {

        setActiveFilter(filter)
    }


        return (
        <Box pt={{ base: '60px', md: '60px', xl: '10px' }} pl={6} >

            <Stack spacing={5}>
                <Text variant={'headerXl'}>
                    Dashboard
                </Text>

                <Text variant={'base'}>
                    Hello, Emmanuel
                </Text>
            </Stack>

            <HStack my={6} w={'full'} alignItems={'center'} justifyContent={'space-between'} borderBottom={'1px solid #E5E9EB'} borderTop={'1px solid #E5E9EB'} py={6}>

                <Box>
                    <RadioGroup onChange={setValue} value={value}>
                        <Stack direction='row' spacing={8}>
                            <Radio value='User' variant={'primary'}>
                                <Text variant={'radioText'}>
                                    User
                                </Text>
                            </Radio>
                            <Radio value='Merchant' variant={'primary'}>
                                <Text variant={'radioText'} >
                                    Merchant
                                </Text>
                            </Radio>
                        </Stack>
                    </RadioGroup>
                </Box>

                <HStack spacing={4}>
                    <OutlineButton h={'26px'}
                                   minH={'26px'}
                                   py={0}
                                   textVariant={'xsBold'}
                                   border={'1px solid #C5B27D'} onClick={() => console.log('')} />

                </HStack>

            </HStack>


            { value === 'User' ? <>
            <SimpleGrid
                columns={{ base: 1, md: 2, lg:5, '2xl': 5 }}
                gap="20px"
                mb="20px"
            >
                <AnalyticsCard title={"REGISTERED USERS"} value={"0"} isLoading={false} />
                <AnalyticsCard title={"ACTIVE USERS"} value={"200,485"} isLoading={false} />

                <AnalyticsCard title={"NEW ACCOUNT OPENED"} value={"0"} isLoading={false} />
                <AnalyticsCard title={"TOTAL TRANSACTION VALUE"} value={formatToNaira("0")} isLoading={false} />
                <AnalyticsCard title={"TOTAL TRANSACTION VOLUME"} value={formatToNaira("0")} isLoading={false} />

            </SimpleGrid>

            <Stack w={'full'} direction={['column', 'row']}>
                <TransactionVolumeChart data={[]} />
                <KycComplianceCard pendingApproval={""} suspendedUsers={""} />
            </Stack>

            <Stack  w={'full'} direction={['column', 'row']} mt={6} >
                {/*@ts-ignore*/}
                {/*<RecentTransactionsTable transactions={transactionsData?.data || []} isLoading={isFetchingUserTransactions} />*/}

                <Box>
                 <TransactionReportChart totalTransactionValue={'1242'} rawData={[]} data={getPieChartData([])} labels={getPieChartLabels([])} />
                </Box>


            </Stack>
            </>
            : 
            <>
            <SimpleGrid
                columns={{ base: 1, md: 2, lg:5, '2xl': 5 }}
                gap="20px"
                mb="20px"
            >
                <AnalyticsCard title={"REGISTERED MERCHANTS"} value={"0"} isLoading={false} />
                <AnalyticsCard title={"ACTIVE MERCHANTS"} value={"0"} isLoading={false} />

                <AnalyticsCard title={"NEW ACCOUNT OPENED"} value={"0"} isLoading={false} />
                <AnalyticsCard title={"TOTAL TRANSACTION VALUE"} value={formatToNaira("0")} isLoading={false} />
                <AnalyticsCard title={"TOTAL TRANSACTION VOLUME"} value={"0"} isLoading={false} />

            </SimpleGrid>

            <Stack w={'full'} direction={['column', 'row']}>
                <TransactionVolumeChart data={[]} />
                {/*@ts-ignore*/}
                <MerchantKycComplianceCard pendingApproval={merchantMetrics?.pendingApproval} suspendedUsers={merchantMetrics?.suspendedMerchants} />
            </Stack>

            <Stack  w={'full'} direction={['column', 'row']} mt={6} >

                {/*@ts-ignore*/}
                <RecentTransactionsTable transactions={merchantTransactionsData?.data || []} isLoading={isFetchingMerchantTransactions} />


            </Stack>
            </>}
        </Box>
    );
}
export  default UserDashboardTemplate;
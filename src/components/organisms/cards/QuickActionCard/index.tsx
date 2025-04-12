"use client"

import {Box, Hide, HStack, Stack, Text, useBreakpointValue, VStack} from "@chakra-ui/react";
import RegisterCustomerIcon from "../../../atoms/icons/RegisterCustomerIcon";
import BaseButton from "../../../molecules/buttons/BaseButton";
import DeviceInventoryIcon from "../../../atoms/icons/DeviceInventoryIcon";
import {useRouter} from "next/navigation";
import DashboardDownloadIcon from "components/atoms/icons/DashboardDownloadIcon";

const QuickActionCard = () => {

    const router = useRouter()
    const isMobile = useBreakpointValue({ base: true, md: false });
    const navigateToRegisterCustomer = () => {
        router.push('/admin/dashboard/business/customer-onboarding/registration')
    }
    return (
        <Stack h={'full'} spacing={8} py={'11px'} px={4} border={'0.5px'} borderColor={'#E2E8F0'} borderRadius={'8px'} w={'full'}
               bg={'white'}>

            <Text color={'#C5B27D'} fontWeight={'600'} fontSize={'14px'}>Quick Actions</Text>

            <Stack w={'full'} spacing={5} bg={'white'}>

                <HStack w={'full'} alignItems={'center'} justifyContent={'center'} spacing={4}>
                    <Hide below={'md'}>

                    <RegisterCustomerIcon/>
                    </Hide>

                    <VStack w={'full'} spacing={3}>
                        <Stack w={'full'} spacing={2} color={'#344256'}>

                            <Text fontWeight={'500'} fontSize={'16px'} letterSpacing={'-1.2%'}>Register a customer</Text>
                            <Text opacity={'80%'} letterSpacing={0} fontWeight={'400'} fontSize={'14px'}>Register a Customer on OneWallet</Text>
                        </Stack>

                        <Box w={'full'}>
                            <BaseButton onClick={navigateToRegisterCustomer} w={'full'} borderRadius={'4px'} color={'white'} bg={'#0F454F'} text={'Register a Customer'}/>
                        </Box>

                    </VStack>

                </HStack>

                <HStack w={'full'} alignItems={'center'} justifyContent={'center'} spacing={4}>

                   <Hide below={'md'}>
                       <DeviceInventoryIcon/>
                   </Hide>

                    <VStack w={'full'} spacing={3}>
                        <Stack w={'full'} spacing={2} color={'#344256'}>

                            <Text fontWeight={'500'} fontSize={'16px'} letterSpacing={'-1.2%'}>Device Inventory</Text>
                            <Text opacity={'80%'} letterSpacing={0} fontWeight={'400'} fontSize={'14px'}>View Your Devices</Text>
                        </Stack>

                        <Box w={'full'}>
                            <BaseButton variant={'outline'} bg={'#FFFFFF'} w={'full'}  text={'View My Devices'}/>
                        </Box>

                    </VStack>

                </HStack>


                <HStack w={'full'} alignItems={'center'} justifyContent={'center'} spacing={4}>
                    <Hide  below={'md'}>
                    <DashboardDownloadIcon/>
                    </Hide>

                    <VStack w={'full'} spacing={3}>
                        <Stack w={'full'} spacing={2} color={'#344256'}>

                            <Text fontWeight={'500'} fontSize={'16px'} letterSpacing={'-1.2%'}>Report</Text>
                            <Text opacity={'80%'} letterSpacing={0} fontWeight={'400'} fontSize={'14px'}>View and Download Report</Text>
                        </Stack>

                        <Box w={'full'}>
                            <BaseButton variant={'outline'} bg={'#FFFFFF' } w={'full'}  text={'Download Report'}/>
                        </Box>

                    </VStack>

                </HStack>

            </Stack>

        </Stack>
    )
}

export default QuickActionCard
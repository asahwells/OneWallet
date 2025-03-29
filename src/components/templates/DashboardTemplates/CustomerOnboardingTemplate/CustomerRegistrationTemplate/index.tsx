'use client';


import {
    Box, HStack, Radio, RadioGroup, Show,
    SimpleGrid, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure,
} from '@chakra-ui/react';
import BaseInput from "../../../../molecules/inputs/BaseInput";
import SearchInput from "../../../../molecules/inputs/SearchInput";
import FilterButton from "../../../../molecules/buttons/FilterButton";
import SelectFilterBox from "../../../../organisms/filter/SelectFilterBox";
import BaseButton from "../../../../molecules/buttons/BaseButton";
import CustomerRegistrationTable from "../../../../organisms/table/CustomerRegistrationTable";
import {MockCustomerRegistration} from "../../../../organisms/table/mockData";


const CustomerRegistrationTemplate = () =>  {
    const {isOpen: isOpenOne, onClose: onCloseOne, onToggle: onToggleOne} =  useDisclosure();

    return (
        <Stack bg={'white'} spacing={5}>

            <HStack w={'full'} justifyContent={'space-between'} alignItems={'center'} spacing={24} >

                <HStack w={'full'} mt={2} spacing={4} >
                    <SearchInput placeholder={'Search by Customer Name'} onChange={console.log} />
                    <Box position="relative">
                        <FilterButton onClick={onToggleOne} />
                        {isOpenOne && (
                            <Box position="absolute" top="0" right="5px" zIndex="10">
                                <SelectFilterBox type={'tier3'} onFilterChange={console.log} onClose={onCloseOne} />
                            </Box>
                        )}
                    </Box>
                </HStack>

                <BaseButton px={12} py={2} variant={'brand'} text={'Register a Customer'} onClick={console.log} />

            </HStack>

            <Text fontWeight={'600'} fontSize={'14px'} color={'#C5B27D'}>
                Customer Registration
            </Text>

            <Box bg={'#CBD5E1'} px={8} py={3} borderRadius={'4px'} w={'fit-content'}>
                <Text  fontWeight={'500'} fontSize={'18px'}>
                    Total Number: 0
                </Text>
            </Box>

            <CustomerRegistrationTable data={MockCustomerRegistration} />

        </Stack>


    );
}
export  default CustomerRegistrationTemplate;
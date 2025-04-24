'use client';


import {
    Box, HStack, Radio, RadioGroup, Show,
    SimpleGrid, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text,
} from '@chakra-ui/react';
import BusinessInformationTemplate from './BusinessInformationTemplate';
import HeaderBackButton from 'components/molecules/buttons/HeaderBackButton';
import TransactionTemplate from './TransactionTemplate/index';
import { useRouter } from 'next/navigation';


const ManageBusinessTemplate = () =>  {

    const router = useRouter()
    return (
        <Stack bg={'#F8FAFC'} px={{base:0, lg:5}}>
            <HeaderBackButton header='Business' onBack={()=> router.back()}/>

            <Tabs mx={{base:0, lg:5}} bg={'white'} py={4} px={{base:0, lg:2}} borderRadius={'8px'}>
                <TabList  borderBottomColor={'#E5E9EB'}>
                    <Tab>
                        <Text variant={'chartLabel'}>
                            Business Information
                        </Text>
                    </Tab>
                    <Tab>
                        <Text variant={'chartLabel'}>
                            Device
                        </Text>
                    </Tab>
                    <Tab>
                        <Text variant={'chartLabel'}>
                            Transaction
                        </Text>
                    </Tab>
                </TabList>

                <TabPanels >


                    <TabPanel>
                        <BusinessInformationTemplate />
                    </TabPanel>

                    <TabPanel>
                        <p>two!</p>
                    </TabPanel>

                    <TabPanel>
                        <TransactionTemplate />
                    </TabPanel>
                </TabPanels>
            </Tabs>


        </Stack>


    );
}
export  default ManageBusinessTemplate;
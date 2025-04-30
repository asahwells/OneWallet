'use client';


import {
    Box, HStack, Radio, RadioGroup, Show,
    SimpleGrid, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text,
} from '@chakra-ui/react';
import CustomerRegistrationDashboardTemplate from "./CustomerRegistrationDashboardTemplate";


const CustomerOnboardingTemplate = () =>  {


    return (
        <Stack w='full' p={{base: 0,  md: 6}} gap={5} bg={'#F8FAFC'}>

            <Tabs mx={{base:0, lg:5}} py={4} px={{base:0, lg:2}} borderRadius={'8px'}>
                <TabList bg={'white'} pb={4} borderBottomColor={'#E5E9EB'} borderRadius={'8px'} >
                    <Tab>
                        <Text variant={'chartLabel'}>
                            Customer Registration
                        </Text>
                    </Tab>
                    <Tab>
                        <Text variant={'chartLabel'}>
                            Device Application
                        </Text>
                    </Tab>
                </TabList>

                <TabPanels bg={'white'}  p={0} pb={4}>
                    <TabPanel p={0} pb={4}>
                    <CustomerRegistrationDashboardTemplate />
                    </TabPanel>




                    <TabPanel p={0} pb={4}>
                        <p>two!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>


        </Stack>


    );
}
export  default CustomerOnboardingTemplate;
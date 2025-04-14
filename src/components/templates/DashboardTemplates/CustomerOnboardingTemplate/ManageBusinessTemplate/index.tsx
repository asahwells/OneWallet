'use client';


import {
    Box, HStack, Radio, RadioGroup, Show,
    SimpleGrid, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text,
} from '@chakra-ui/react';
import BusinessInformationTemplate from './BusinessInformationTemplate';


const ManageBusinessTemplate = () =>  {


    return (
        <Stack pt={{ base: '60px', md: '60px', xl: '10px' }}  gap={5} bg={'white'}>

            <Tabs>
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
                        <p>three!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>


        </Stack>


    );
}
export  default ManageBusinessTemplate;
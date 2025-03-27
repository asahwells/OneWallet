'use client';


import {
    Box, HStack, Radio, RadioGroup, Show,
    SimpleGrid, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text,
} from '@chakra-ui/react';
import CustomerRegistrationTemplate from "./CustomerRegistrationTemplate";


const CustomerOnboardingTemplate = () =>  {


    return (
        <Stack pt={{ base: '60px', md: '60px', xl: '10px' }}  gap={5} bg={'white'}>

            <Tabs>
                <TabList borderBottomColor={'#E5E9EB'}>
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

                <TabPanels >


                    <TabPanel>
                    <CustomerRegistrationTemplate />
                    </TabPanel>




                    <TabPanel>
                        <p>two!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>


        </Stack>


    );
}
export  default CustomerOnboardingTemplate;
'use client';

import React from 'react';
import {
    Box,
    Flex,
    Text,
    useBreakpointValue,
    Grid,
    Avatar,
} from '@chakra-ui/react';
import BaseButton from 'components/molecules/buttons/BaseButton';
import CopyIcon from 'components/atoms/icons/CopyIcon';
import { SuccessTemplateProps } from '../interface';
import Tier2Icon from 'components/atoms/icons/Tier2Icon';

const SuccessTemplate = ({ 
    onDone, 
    onViewQR, 
    onUpgrade, 
    userData = {
        name: "Charles Peters",
        accountNumber: "8165748911",
        profileImage: "/placeholder.svg",
        tier: 2,
        dailyLimit: "₦200,000.00",
        maxBalance: "₦500,000.00"
    }
}: SuccessTemplateProps) => {

    const isMobile = useBreakpointValue({ base: true, md: false });

    const handleCopy = () => {
        navigator.clipboard.writeText(userData.accountNumber);
    };

    return (
        <Flex 
            direction="column" 
            bg="#F8FAFC" 
            w={'full'} 
            minH="100vh"
            align="center"
        >
            {/* Mobile Top Bar */}
            {isMobile && (
                <Flex
                    as="header"
                    alignItems="center"
                    justifyContent="center"
                    h="60px"
                    borderBottom="1px solid #E2E8F0"
                    position="relative"
                    bg="white"
                    w={'full'}
                >
                    <Text fontSize="16px" fontWeight="600">
                        Account Upgrade - Tier 2
                    </Text>
                </Flex>
            )}

            {/* Main Content */}
            <Flex 
                direction="column" 
                align="center" 
                maxW="600px" 
                w="full" 
                px={4} 
                py={8}
            >

                {/* User Account Info Card */}
                <Box 
                    bg="#F1F5F9" 
                    w="full" 
                    borderRadius="8px" 
                    p={6} 
                    my={4}
                >
                    <Flex direction="column" align="center" mb={4}>
                        <Avatar 
                            src={userData.profileImage} 
                            name={userData.name} 
                            size="lg" 
                            mb={4}
                        />
                        <Grid templateColumns="repeat(2, 1fr)" w="full" gap={{xs:4, lg:20}}>
                            <Box>
                                <Text variant={'sm2'} mb={2.5}>
                                    Account Name
                                </Text>

                                <Text variant={'sma'}>
                                    {userData.name}
                                </Text>
                            </Box>
                            <Box display={'flex'} flexDir={'column'} justifyContent={'center'} alignItems={'end'}>
                                <Box>
                                    <Text variant={'sm2'} mb={1}>
                                        Account Number
                                    </Text>
                                    <Flex align="center">

                                            <Text variant={'sma'}>
                                                {userData.accountNumber}
                                            </Text>
                                        <Box 
                                            as="button" 
                                            onClick={handleCopy} 
                                            p={1} 
                                            borderRadius="4px" 
                                            //bg="#0F454F"
                                        >
                                            <CopyIcon />
                                        </Box>
                                    </Flex>
                                </Box>
                            </Box>
                        </Grid>
                    </Flex>
                </Box>

                {/* Tier Info Card */}
                <Box 
                    bg="#F1F5F9" 
                    w="full" 
                    borderRadius="8px" 
                    py={6}
                    px={3} 
                    mb={6}
                >
                    <Flex align="center" mb={4}>
                        
                            <Box position="relative">
                                <Tier2Icon />
                            </Box>
                        <Text fontSize="16px" fontWeight="500" color={'#222B38'}>
                            Tier {userData.tier}
                        </Text>
                    </Flex>
                    <Grid templateColumns="repeat(2, 1fr)" gap={5}>
                        <Box>
                            <Text variant={'base2'} mb={2}>
                                Daily Transaction limit
                            </Text>
                            <Text variant={'md3'}>
                                {userData.dailyLimit}
                            </Text>
                        </Box>
                        <Box display={'flex'} flexDir={'column'} justifyContent={'center'} alignItems={'end'}>
                            <Box>
                                <Text variant={'base2'} mb={2}>
                                    Maximum Balance
                                </Text>
                                <Text variant={'md3'}>
                                    {userData.maxBalance}
                                </Text>
                            </Box>
                        </Box>
                    </Grid>
                </Box>

                {/* Action Buttons */}
                <BaseButton
                    text='Done'
                    w="full"
                    h="48px"
                    bg="#0F454F"
                    color="white"
                    borderRadius="8px"
                    fontSize="16px"
                    fontWeight="600"
                    _hover={{ bg: "#0D3A42" }}
                    onClick={onDone}
                    mb={4}
                />
                
                <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                    <BaseButton
                        text={`Generate User's QR`}
                        h="48px"
                        bg="white"
                        color="#0F454F"
                        borderRadius="8px"
                        fontSize="16px"
                        fontWeight="600"
                        border="1px solid #0F454F"
                        _hover={{ bg: "#F8FAFC" }}
                        onClick={onViewQR}
                    />
                    <BaseButton
                        text={'Upgrade to Tier 2'}
                        h="48px"
                        bg="white"
                        color="#0F454F"
                        borderRadius="8px"
                        fontSize="16px"
                        fontWeight="600"
                        border="1px solid #0F454F"
                        _hover={{ bg: "#F8FAFC" }}
                        onClick={onUpgrade}
                    />
                </Grid>
            </Flex>
        </Flex>
    );
};

export default SuccessTemplate;
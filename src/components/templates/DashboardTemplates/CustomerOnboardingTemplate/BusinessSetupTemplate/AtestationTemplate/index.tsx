'use client';

import React, { useState } from 'react';
import {
    Box,
    Flex,
    IconButton,
    Text,
    useBreakpointValue,
    HStack,
    Heading,
    Grid,
    GridItem,
    Checkbox,
    Image,
    Button
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import BaseButton from 'components/molecules/buttons/BaseButton';
import EditIcon from 'components/atoms/icons/EditIcon';
import EditButton from 'components/molecules/buttons/EditButton';
import StarIcon from 'components/atoms/icons/StarIcon';
import { AttestationTemplateProps } from '../interfaces';
import GoBack from 'components/molecules/buttons/BackBotton';



const AttestationTemplate = ({ onNext, onBack }: AttestationTemplateProps) => {
    const [isAttested, setIsAttested] = useState(false);
    const isMobile = useBreakpointValue({ base: true, md: false });

    const handleContinue = () => {
        if (isAttested) {
            onNext();
        }
    };

    // Sample data - in a real app, this would come from your state management or API
    const businessData = {
        geoLocation: {
            coordinates: '6.4310, Longitude: 3.4522',
            timestamp: '2025-03-12 14:30 GMT+1'
        },
        nationality: {
            country: 'Nigeria'
        },
        businessDetails: {
            storeName: 'Mama Nkechi Foods',
            industryCategory: 'Construction',
            numberOfStores: '2',
            numberOfEmployees: '10'
        },
        businessAddress: {
            isInMarket: 'Yes',
            state: 'Abuja',
            lga: 'Garki',
            marketName: '10',
            storeLineNumber: '10',
            shopAddressDescription: 'No. 5 Beaver Crescent, Sunnyvale Estate, off Maitama bridge, Galadinmawa, Abuja',
            shopImage: '/placeholder.svg?height=100&width=150'
        },
        pepStatus: {
            isPep: 'No'
        },
        sourceOfIncome: {
            expectedGrossAnnualRevenue: 'N1 million - Less than N5 million',
            hasOtherSources: 'Yes',
            otherSourceOfRevenue: 'Savings',
            expectedAnnualRevenueFromOtherSources: 'N1 million - Less than N5 million'
        }
    };

    return (
        <Flex direction="column" bg="#F8FAFC" w={'full'}>
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
                        Business Setup
                    </Text>
                    <GoBack onClick={onBack} />
                </Flex>
            )}

            {/* Desktop "Back" outside the card */}
            {!isMobile && (
                <HStack as="header" p={4} color={'#344256'} cursor={'pointer'} onClick={onBack}>
                    <ArrowBackIcon w={5} h={5} />
                    <Text fontSize={'16px'} fontWeight={'500'}>
                        Back
                    </Text>
                </HStack>
            )}

            {/* Main Content */}
            <Box px={4} pt={4} pb={8} maxW={isMobile ? "100%" : "800px"} mx="auto">
                <Box mb={6} display={'flex'} flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
                    <Heading
                        as="h1"
                        variant={'head'}
                        mb={2}
                    >
                        Attestation
                    </Heading>
                    <Text variant={'sm'}>
                        Please review the information below and confirm.
                    </Text>
                </Box>

                {/* Geo-Location Section */}
                <Box 
                    bg="#F1F5F9" 
                    borderRadius="8px" 
                    p={4} 
                    mb={4}
                >
                    <Flex align="center" justify={'center'} mb={4}>
                        <Box mr={2}>
                            <StarIcon color="#10B981" />
                        </Box>
                        <Text variant={'sm'}>Geo-Location</Text>
                    </Flex>
                    
                    <Grid templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"} gap={4}>
                        <Box>
                            <Text variant={'sm'} my={2}>Coordinates</Text>
                            <Text variant={'md2'} fontWeight="500">{businessData.geoLocation.coordinates}</Text>
                        </Box>
                        <Box ml={{lg:40}}>
                            <Text variant={'sm'} my={2}>Timestamp</Text>
                            <Text variant={'md2'} fontWeight="500">{businessData.geoLocation.timestamp}</Text>
                        </Box>
                    </Grid>
                </Box>

                {/* Nationality Section */}
                <Box 
                    bg="#F1F5F9" 
                    borderRadius="8px" 
                    p={4} 
                    mb={4}
                >
                    <Flex align="center" justify="space-between" mb={4}>
                        <Box></Box>
                        <Flex align="center">
                            <Box mr={2}>
                                <StarIcon color="#3B82F6" />
                            </Box>
                            <Text variant={'sm'} my={2}>Nationality</Text>
                        </Flex>
                        <EditButton />
                    </Flex>
                    
                    <Box>
                        <Text variant={'sm'} my={2}>Country</Text>
                        <Text variant={'md2'} fontWeight="500">{businessData.nationality.country}</Text>
                    </Box>
                </Box>

                {/* Business Details Section */}
                <Box 
                    bg="#F1F5F9" 
                    borderRadius="8px" 
                    p={4} 
                    mb={4}
                >
                    <Flex align="center" justify="space-between" mb={4}>
                        <Box></Box>
                        <Flex align="center">
                            <Box mr={2}>
                                <StarIcon color="#10B981" />
                            </Box>
                            <Text variant={'sm'} my={2}>Business Details</Text>
                        </Flex>
                        <EditButton />
                    </Flex>
                    
                    <Grid templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"} gap={4}>
                        <Box mb={3}>
                            <Text variant={'sm'} my={2}>Store Name</Text>
                            <Text variant={'md2'} fontWeight="500">{businessData.businessDetails.storeName}</Text>
                        </Box>
                        <Box mb={3} ml={{lg:40}}>
                            <Text variant={'sm'} my={2}>Industry Category</Text>
                            <Text variant={'md2'} fontWeight="500">{businessData.businessDetails.industryCategory}</Text>
                        </Box>
                        <Box>
                            <Text variant={'sm'} my={2}>Number of Stores</Text>
                            <Text variant={'md2'} fontWeight="500">{businessData.businessDetails.numberOfStores}</Text>
                        </Box>
                        <Box ml={{lg:40}}>
                            <Text variant={'sm'} my={2}>Number of Employees</Text>
                            <Text variant={'md2'} fontWeight="500">{businessData.businessDetails.numberOfEmployees}</Text>
                        </Box>
                    </Grid>
                </Box>

                {/* Business Address Section */}
                <Box 
                    bg="#F1F5F9" 
                    borderRadius="8px" 
                    p={4} 
                    mb={4}
                >
                    <Flex align="center" justify="space-between" mb={4}>
                        <Box></Box>
                        <Flex align="center">
                            <Box mr={2}>
                                <StarIcon color="#EC4899" />
                            </Box>
                            <Text variant={'sm'} my={2}>Business Address</Text>
                        </Flex>
                        <EditButton />
                    </Flex>
                    
                    <Grid templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"} gap={4}>
                        <Box mb={3}>
                            <Text variant={'sm'} my={2}>Is the Customer Business Address located in a market?</Text>
                            <Text variant={'md2'} fontWeight="500">{businessData.businessAddress.isInMarket}</Text>
                        </Box>
                        <Box mb={3} ml={{lg:40}}>
                            <Text variant={'sm'} my={2}>State</Text>
                            <Text variant={'md2'} fontWeight="500">{businessData.businessAddress.state}</Text>
                        </Box>
                        <Box mb={3}>
                            <Text variant={'sm'} my={2}>LGA</Text>
                            <Text variant={'md2'} fontWeight="500">{businessData.businessAddress.lga}</Text>
                        </Box>
                        <Box mb={3} ml={{lg:40}}>
                            <Text variant={'sm'} my={2}>Market Name</Text>
                            <Text variant={'md2'} fontWeight="500">{businessData.businessAddress.marketName}</Text>
                        </Box>
                        <Box mb={3}>
                            <Text variant={'sm'} my={2}>Store Line/Number</Text>
                            <Text variant={'md2'} fontWeight="500">{businessData.businessAddress.storeLineNumber}</Text>
                        </Box>
                        <Box mb={3} ml={{lg:40}}>
                            <Text variant={'sm'} my={2}>Shop Address Description</Text>
                            <Text variant={'md2'} fontWeight="500">{businessData.businessAddress.shopAddressDescription}</Text>
                        </Box>
                    </Grid>
                    
                    <Box mt={2}>
                        <Text variant={'sm'} my={2}>Live picture of your shop</Text>
                        <Image 
                            src={businessData.businessAddress.shopImage || "/placeholder.svg"} 
                            alt="Shop" 
                            borderRadius="4px"
                            maxW="150px"
                            h="auto"
                        />
                    </Box>
                </Box>

                {/* PEP Status Section */}
                <Box 
                    bg="#F1F5F9" 
                    borderRadius="8px" 
                    p={4} 
                    mb={4}
                >
                    <Flex align="center" justify="space-between" mb={4}>
                        <Box></Box>
                        <Flex align="center">
                            <Box color="#8B5CF6" mr={2}>
                                <StarIcon color="#EC4899" />
                            </Box>
                            <Text variant={'sm'} my={2}>PEP Status</Text>
                        </Flex>
                        <EditButton />
                    </Flex>
                    
                    <Box>
                        <Text variant={'sm'} my={2} >Is the customer a Politically Exposed Person?</Text>
                        <Text variant={'md2'} fontWeight="500">{businessData.pepStatus.isPep}</Text>
                    </Box>
                </Box>

                {/* Source of Income Section */}
                <Box 
                    bg="#F1F5F9" 
                    borderRadius="8px" 
                    p={4} 
                    mb={6}
                >
                    <Flex align="center" justify="space-between" mb={4}>
                        <Box></Box>
                        <Flex align="center">
                            <Box mr={2}>
                                <StarIcon color="#F59E0B" />
                            </Box>
                            <Text variant={'sm'} my={2}>Source of Income</Text>
                        </Flex>
                        <EditButton />
                    </Flex>
                    
                    <Box mb={3}>
                        <Text variant={'sm'} my={2} mb={1}>What is your expected gross annual revenue</Text>
                        <Text variant={'md2'} fontWeight="500">{businessData.sourceOfIncome.expectedGrossAnnualRevenue}</Text>
                    </Box>
                    
                    <Box mb={3}>
                        <Text variant={'sm'} my={2} mb={1}>Does the customer have other sources of funds?</Text>
                        <Text variant={'md2'} fontWeight="500">{businessData.sourceOfIncome.hasOtherSources}</Text>
                    </Box>
                    
                    {businessData.sourceOfIncome.hasOtherSources === 'Yes' && (
                        <>
                            <Box mb={3}>
                                <Text variant={'sm'} my={2} mb={1}>Other source of revenue</Text>
                                <Text variant={'md2'} fontWeight="500">{businessData.sourceOfIncome.otherSourceOfRevenue}</Text>
                            </Box>
                            
                            <Box>
                                <Text variant={'sm'} my={2} mb={1}>Expected annual revenue from other sources</Text>
                                <Text variant={'md2'} fontWeight="500">{businessData.sourceOfIncome.expectedAnnualRevenueFromOtherSources}</Text>
                            </Box>
                        </>
                    )}
                </Box>

                {/* Attestation Checkbox */}
                <Box mb={6}>
                    <Checkbox 
                        isChecked={isAttested} 
                        onChange={(e) => setIsAttested(e.target.checked)}
                        colorScheme="teal"
                        borderColor="#CBD5E1"
                    >
                        <Text variant={'sm'}>I attest that all the information provided is correct</Text>
                    </Checkbox>
                </Box>

                {/* Continue Button */}
                <BaseButton
                    w="full"
                    borderRadius="8px"
                    bg={isAttested ? "#0F454F" : "#E2E8F0"}
                    color={isAttested ? "white" : "#94A3B8"}
                    fontWeight="600"
                    onClick={handleContinue}
                    isDisabled={!isAttested}
                    text="Continue"
                />
            </Box>
        </Flex>
    );
};

export default AttestationTemplate;

/**
 * 'use client';

import React, { useState } from 'react';
import {
    Box,
    Flex,
    IconButton,
    Text,
    useBreakpointValue,
    HStack,
    Heading,
    Grid,
    GridItem,
    Checkbox,
    Image,
    Button
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import BaseButton from 'components/molecules/buttons/BaseButton';
import EditIcon from 'components/atoms/icons/EditIcon';
import EditButton from 'components/molecules/buttons/EditButton';
import StarIcon from 'components/atoms/icons/StarIcon';
import LocationStar from "public/assets/svg/location-star.svg";
import NationalityStar from "public/svgs/nationality.svg"
import BusinessDetailStar from "public/svgs/business-detail.svg"
import BusinessAddressStar from "public/svgs/business-address.svg"
import PEPStar from "public/svgs/pep.svg"
import SourceStar from "public/svgs/source.svg"

interface AttestationTemplateProps {
    onNext: () => void;
    onBack: () => void;
}

const AttestationTemplate = ({ onNext, onBack }: AttestationTemplateProps) => {
    const [isAttested, setIsAttested] = useState(false);
    const isMobile = useBreakpointValue({ base: true, md: false });

    const handleContinue = () => {
        if (isAttested) {
            onNext();
        }
    };

    // Sample data - in a real app, this would come from your state management or API
    const businessData = {
        geoLocation: {
            coordinates: '6.4310, Longitude: 3.4522',
            timestamp: '2025-03-12 14:30 GMT+1'
        },
        nationality: {
            country: 'Nigeria'
        },
        businessDetails: {
            storeName: 'Mama Nkechi Foods',
            industryCategory: 'Construction',
            numberOfStores: '2',
            numberOfEmployees: '10'
        },
        businessAddress: {
            isInMarket: 'Yes',
            state: 'Abuja',
            lga: 'Garki',
            marketName: '10',
            storeLineNumber: '10',
            shopAddressDescription: 'No. 5 Beaver Crescent, Sunnyvale Estate, off Maitama bridge, Galadinmawa, Abuja',
            shopImage: '/placeholder.svg?height=100&width=150'
        },
        pepStatus: {
            isPep: 'No'
        },
        sourceOfIncome: {
            expectedGrossAnnualRevenue: 'N1 million - Less than N5 million',
            hasOtherSources: 'Yes',
            otherSourceOfRevenue: 'Savings',
            expectedAnnualRevenueFromOtherSources: 'N1 million - Less than N5 million'
        }
    };

    return (
        <Flex direction="column" bg="#F8FAFC" w={'full'}>
            {/* Mobile Top Bar }
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
                        Business Setup
                    </Text>
                    <IconButton
                        aria-label="Go back"
                        icon={<ArrowBackIcon />}
                        variant="ghost"
                        position="absolute"
                        left="16px"
                        onClick={onBack}
                    />
                </Flex>
            )}

            {/* Desktop "Back" outside the card }
            {!isMobile && (
                <HStack as="header" p={4} color={'#344256'} cursor={'pointer'} onClick={onBack}>
                    <ArrowBackIcon w={5} h={5} />
                    <Text fontSize={'16px'} fontWeight={'500'}>
                        Back
                    </Text>
                </HStack>
            )}

            {/* Main Content }
            <Box px={4} pt={4} pb={8} maxW={isMobile ? "100%" : "800px"} mx="auto">
                <Box mb={6}>
                    <Heading
                        as="h1"
                        fontSize={isMobile ? "20px" : "24px"}
                        mb={2}
                    >
                        Attestation
                    </Heading>
                    <Text fontSize="14px" color="#475569">
                        Please review the information below and confirm.
                    </Text>
                </Box>

                {/* Geo-Location Section }
                <Box 
                    bg="#F1F5F9" 
                    borderRadius="8px" 
                    p={4} 
                    mb={4}
                >
                    <Flex align="center" mb={4}>
                        <Box mr={2}>
                            <LocationStar />
                        </Box>
                        <Text fontWeight="500">Geo-Location</Text>
                    </Flex>
                    
                    <Grid templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"} gap={4}>
                        <Box>
                            <Text fontSize="12px" color="#64748B" mb={1}>Coordinates</Text>
                            <Text fontSize="14px" fontWeight="500">{businessData.geoLocation.coordinates}</Text>
                        </Box>
                        <Box>
                            <Text fontSize="12px" color="#64748B" mb={1}>Timestamp</Text>
                            <Text fontSize="14px" fontWeight="500">{businessData.geoLocation.timestamp}</Text>
                        </Box>
                    </Grid>
                </Box>

                {/* Nationality Section }
                <Box 
                    bg="#F1F5F9" 
                    borderRadius="8px" 
                    p={4} 
                    mb={4}
                >
                    <Flex align="center" justify="space-between" mb={4}>
                        <Flex align="center">
                            <Box mr={2}>
                                <NationalityStar />
                            </Box>
                            <Text fontWeight="500">Nationality</Text>
                        </Flex>
                        <EditButton />
                    </Flex>
                    
                    <Box>
                        <Text fontSize="12px" color="#64748B" mb={1}>Country</Text>
                        <Text fontSize="14px" fontWeight="500">{businessData.nationality.country}</Text>
                    </Box>
                </Box>

                {/* Business Details Section }
                <Box 
                    bg="#F1F5F9" 
                    borderRadius="8px" 
                    p={4} 
                    mb={4}
                >
                    <Flex align="center" justify="space-between" mb={4}>
                        <Flex align="center">
                            <Box mr={2}>
                                <BusinessDetailStar />
                            </Box>
                            <Text fontWeight="500">Business Details</Text>
                        </Flex>
                        <EditButton />
                    </Flex>
                    
                    <Grid templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"} gap={4}>
                        <Box mb={3}>
                            <Text fontSize="12px" color="#64748B" mb={1}>Store Name</Text>
                            <Text fontSize="14px" fontWeight="500">{businessData.businessDetails.storeName}</Text>
                        </Box>
                        <Box mb={3}>
                            <Text fontSize="12px" color="#64748B" mb={1}>Industry Category</Text>
                            <Text fontSize="14px" fontWeight="500">{businessData.businessDetails.industryCategory}</Text>
                        </Box>
                        <Box>
                            <Text fontSize="12px" color="#64748B" mb={1}>Number of Stores</Text>
                            <Text fontSize="14px" fontWeight="500">{businessData.businessDetails.numberOfStores}</Text>
                        </Box>
                        <Box>
                            <Text fontSize="12px" color="#64748B" mb={1}>Number of Employees</Text>
                            <Text fontSize="14px" fontWeight="500">{businessData.businessDetails.numberOfEmployees}</Text>
                        </Box>
                    </Grid>
                </Box>

                {/* Business Address Section }
                <Box 
                    bg="#F1F5F9" 
                    borderRadius="8px" 
                    p={4} 
                    mb={4}
                >
                    <Flex align="center" justify="space-between" mb={4}>
                        <Flex align="center">
                            <Box mr={2}>
                                <BusinessAddressStar/>
                            </Box>
                            <Text fontWeight="500">Business Address</Text>
                        </Flex>
                        <EditButton />
                    </Flex>
                    
                    <Grid templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"} gap={4}>
                        <Box mb={3}>
                            <Text fontSize="12px" color="#64748B" mb={1}>Is the Customer Business Address located in a market?</Text>
                            <Text fontSize="14px" fontWeight="500">{businessData.businessAddress.isInMarket}</Text>
                        </Box>
                        <Box mb={3}>
                            <Text fontSize="12px" color="#64748B" mb={1}>State</Text>
                            <Text fontSize="14px" fontWeight="500">{businessData.businessAddress.state}</Text>
                        </Box>
                        <Box mb={3}>
                            <Text fontSize="12px" color="#64748B" mb={1}>LGA</Text>
                            <Text fontSize="14px" fontWeight="500">{businessData.businessAddress.lga}</Text>
                        </Box>
                        <Box mb={3}>
                            <Text fontSize="12px" color="#64748B" mb={1}>Market Name</Text>
                            <Text fontSize="14px" fontWeight="500">{businessData.businessAddress.marketName}</Text>
                        </Box>
                        <Box mb={3}>
                            <Text fontSize="12px" color="#64748B" mb={1}>Store Line/Number</Text>
                            <Text fontSize="14px" fontWeight="500">{businessData.businessAddress.storeLineNumber}</Text>
                        </Box>
                        <Box mb={3}>
                            <Text fontSize="12px" color="#64748B" mb={1}>Shop Address Description</Text>
                            <Text fontSize="14px" fontWeight="500">{businessData.businessAddress.shopAddressDescription}</Text>
                        </Box>
                    </Grid>
                    
                    <Box mt={2}>
                        <Text fontSize="12px" color="#64748B" mb={2}>Live picture of your shop</Text>
                        <Image 
                            src={businessData.businessAddress.shopImage || "/placeholder.svg"} 
                            alt="Shop" 
                            borderRadius="4px"
                            maxW="150px"
                            h="auto"
                        />
                    </Box>
                </Box>

                {/* PEP Status Section }
                <Box 
                    bg="#F1F5F9" 
                    borderRadius="8px" 
                    p={4} 
                    mb={4}
                >
                    <Flex align="center" justify="space-between" mb={4}>
                        <Flex align="center">
                            <Box color="#8B5CF6" mr={2}>
                                <Text fontSize="18px">★</Text>
                            </Box>
                            <Text fontWeight="500">PEP Status</Text>
                        </Flex>
                        <EditButton />
                    </Flex>
                    
                    <Box>
                        <Text fontSize="12px" color="#64748B" mb={1}>Is the customer a Politically Exposed Person?</Text>
                        <Text fontSize="14px" fontWeight="500">{businessData.pepStatus.isPep}</Text>
                    </Box>
                </Box>

                {/* Source of Income Section}
                <Box 
                    bg="#F1F5F9" 
                    borderRadius="8px" 
                    p={4} 
                    mb={6}
                >
                    <Flex align="center" justify="space-between" mb={4}>
                        <Flex align="center">
                            <Box mr={2}>
                                <StarIcon color="#F59E0B" />
                            </Box>
                            <Text fontWeight="500">Source of Income</Text>
                        </Flex>
                        <EditButton />
                    </Flex>
                    
                    <Box mb={3}>
                        <Text fontSize="12px" color="#64748B" mb={1}>What is your expected gross annual revenue</Text>
                        <Text fontSize="14px" fontWeight="500">{businessData.sourceOfIncome.expectedGrossAnnualRevenue}</Text>
                    </Box>
                    
                    <Box mb={3}>
                        <Text fontSize="12px" color="#64748B" mb={1}>Does the customer have other sources of funds?</Text>
                        <Text fontSize="14px" fontWeight="500">{businessData.sourceOfIncome.hasOtherSources}</Text>
                    </Box>
                    
                    {businessData.sourceOfIncome.hasOtherSources === 'Yes' && (
                        <>
                            <Box mb={3}>
                                <Text fontSize="12px" color="#64748B" mb={1}>Other source of revenue</Text>
                                <Text fontSize="14px" fontWeight="500">{businessData.sourceOfIncome.otherSourceOfRevenue}</Text>
                            </Box>
                            
                            <Box>
                                <Text fontSize="12px" color="#64748B" mb={1}>Expected annual revenue from other sources</Text>
                                <Text fontSize="14px" fontWeight="500">{businessData.sourceOfIncome.expectedAnnualRevenueFromOtherSources}</Text>
                            </Box>
                        </>
                    )}
                </Box>

                {/* Attestation Checkbox }
                <Box mb={6}>
                    <Checkbox 
                        isChecked={isAttested} 
                        onChange={(e) => setIsAttested(e.target.checked)}
                        colorScheme="teal"
                        borderColor="#CBD5E1"
                    >
                        <Text fontSize="14px">I attest that all the information provided is correct</Text>
                    </Checkbox>
                </Box>

                {/* Continue Button }
                <BaseButton
                    w="full"
                    borderRadius="8px"
                    bg={isAttested ? "#0F454F" : "#E2E8F0"}
                    color={isAttested ? "white" : "#94A3B8"}
                    fontWeight="600"
                    onClick={handleContinue}
                    isDisabled={!isAttested}
                    text="Continue"
                />
            </Box>
        </Flex>
    );
};

export default AttestationTemplate;
 */
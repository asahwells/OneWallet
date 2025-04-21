'use client';

import React, { useEffect, useState } from 'react';
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
import BaseButton from 'components/molecules/buttons/BaseButton';
import EditButton from 'components/molecules/buttons/EditButton';
import StarIcon from 'components/atoms/icons/StarIcon';
import { AttestationTemplateProps } from '../interfaces';
import HeaderBackButton from 'components/molecules/buttons/HeaderBackButton';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/store';
import { useSetupBusiness } from 'api-services/business-registration-services';


const AttestationTemplate = ({ onNext, onBack }: AttestationTemplateProps) => {
    const [isAttested, setIsAttested] = useState(false);
    const isMobile = useBreakpointValue({ base: true, md: false });

    const { customerDetails } = useAppSelector(state => state.customer)
    const [geoData, setGeoData] = useState({
        coordinates: 'Fetching...',
        timestamp: 'Fetching...',
      });

    const { businessDetails } = useAppSelector((state) => state.business);
    const { mutateAsync: setUpBusiness, isPending } = useSetupBusiness();
    console.log({isAttested})
    const handleContinue = async() => {
        if (isAttested) {
            const payload ={
                nationality: businessDetails?.nationality,
                hasCac: false,
                isResidentialAddress: false,
                timestamp: geoData.timestamp,
                userId: customerDetails?.id,
                coordinates: geoData.coordinates,
                businessName: businessDetails?.businessName,
                industryCategoryId: businessDetails?.industryCategoryId,
                industrySubCategory: businessDetails?.industrySubCategory,
                locatedInMarket: businessDetails?.locatedInMarket === 'yes',
                businessState: businessDetails?.businessState,
                businessLga: businessDetails?.businessLga,
                marketName: businessDetails?.marketName,
                storeNumber: businessDetails?.storeNumber,
                fullShopAddress: businessDetails?.fullShopAddress,
                photoUrl:businessDetails?.photoUrl,
                politicalExposed: businessDetails?.politicalExposed,
                annualIncome: businessDetails?.annualIncome,
                otherSourceOfIncome: businessDetails?.otherSourceOfIncome,
                otherSourceAnnualIncome: businessDetails?.otherSourceAnnualIncome,
            };
    
            try {
                console.log("hit!!!")
                await setUpBusiness(payload);
                onNext();
            } catch (error) {
                console.error('Error adding address:', error);
            }
        }
    };


    const businessData = {
        geoLocation: {
            coordinates: '6.4310, Longitude: 3.4522',
            timestamp: '2025-03-12 14:30 GMT+1'
        },
    };

    useEffect(() => {
        if (!navigator.geolocation) {
          setGeoData({
            coordinates: 'Geolocation not supported',
            timestamp: new Date().toLocaleString(),
          });
          return;
        }
      
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // rounding to 4 decimals
            const lat = position.coords.latitude.toFixed(4);
            const lng = position.coords.longitude.toFixed(4);
      
            const now = new Date().toLocaleString();
      
            setGeoData({
              coordinates: `${lat}, ${lng}`,
              timestamp: now,
            });
          },
          (error) => {
            console.error('Geolocation error:', error);
            setGeoData({
              coordinates: 'Unable to fetch location',
              timestamp: new Date().toLocaleString(),
            });
          }
        );
      }, []);
      

    return (
        <Flex direction="column" bg="#F8FAFC" w={'full'}>
            <HeaderBackButton onBack={onBack} header='Business Setup' />

            {/* Main Content */}
            <Box px={4} pt={4} pb={8} maxW={isMobile ? "100%" : "800px"} mx="auto">
                <Text
                    letterSpacing={'-1.2%'}
                    variant={'head'}
                    textAlign={{
                        base: 'left',
                        md: 'center',
                    }}
                    mb={2}
                >
                    Attestation
                </Text>
                <Text
                    variant={'sm'}
                    mb={6}
                    textAlign={{
                        base: 'left',
                        md: 'center',
                    }}
                >
                    Please review the information below and confirm.
                </Text>

                {/* Geo-Location Section */}
                <Box 
                    bg="#F1F5F9" 
                    borderRadius="8px" 
                    p={4} 
                    mb={4}
                >
                    <Flex align="center" justify={'center'} mb={4}>
                        <Box mr={2}>
                            <StarIcon color="#411CAC" />
                        </Box>
                        <Text variant={'sm'}>Geo-Location</Text>
                    </Flex>
                    
                    <Grid templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"} gap={4}>
                        <Box>
                            <Text variant={'sm'} my={2}>Coordinates</Text>
                            <Text variant={'md2'} fontWeight="500">{geoData.coordinates}</Text>
                        </Box>
                        <Box ml={{lg:40}}>
                            <Text variant={'sm'} my={2}>Timestamp</Text>
                            <Text variant={'md2'} fontWeight="500">{geoData.timestamp}</Text>
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
                                <StarIcon color="#1C5CAC" />
                            </Box>
                            <Text variant={'sm'} my={2}>Nationality</Text>
                        </Flex>
                        <EditButton />
                    </Flex>
                    
                    <Box>
                        <Text variant={'sm'} my={2}>Country</Text>
                        <Text variant={'md2'} fontWeight="500">{businessDetails?.nationality ?? "N/A"}</Text>
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
                            <Box mr={2} color="#10B981">
                                <StarIcon color="#1CAC97" />
                            </Box>
                            <Text variant={'sm'} my={2}>Business Details</Text>
                        </Flex>
                        <EditButton />
                    </Flex>
                    
                    <Grid templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"} gap={4}>
                        <Box mb={3}>
                            <Text variant={'sm'} my={2}>Store Name</Text>
                            <Text variant={'md2'} fontWeight="500">{businessDetails?.businessName ?? "N/A"}</Text>
                        </Box>
                        <Box mb={3} ml={{lg:40}}>
                            <Text variant={'sm'} my={2}>Industry Category</Text>
                            <Text variant={'md2'} fontWeight="500">{businessDetails?.industryCategory ?? "N/A"}</Text>
                        </Box>
                        <Box>
                            <Text variant={'sm'} my={2}>Industry Sub Category</Text>
                            <Text variant={'md2'} fontWeight="500">{businessDetails?.industrySubCategory ?? "N/A"}</Text>
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
                                <StarIcon color="#AC1C87" />
                            </Box>
                            <Text variant={'sm'} my={2}>Business Address</Text>
                        </Flex>
                        <EditButton />
                    </Flex>
                    
                    <Grid templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"} gap={4}>
                        <Box mb={3}>
                            <Text variant={'sm'} my={2}>Is the Customer Business Address located in a market?</Text>
                            <Text variant={'md2'} fontWeight="500">{businessDetails?.locatedInMarket ? 'Yes' : "No"}</Text>
                        </Box>
                        <Box mb={3} ml={{lg:40}}>
                            <Text variant={'sm'} my={2}>State</Text>
                            <Text variant={'md2'} fontWeight="500">{businessDetails?.businessState ?? "N/A"}</Text>
                        </Box>
                        <Box mb={3}>
                            <Text variant={'sm'} my={2}>LGA</Text>
                            <Text variant={'md2'} fontWeight="500">{businessDetails?.businessLga ?? "N/A"}</Text>
                        </Box>
                        <Box mb={3} ml={{lg:40}}>
                            <Text variant={'sm'} my={2}>Market Name</Text>
                            <Text variant={'md2'} fontWeight="500">{businessDetails?.marketName ?? "N/A"}</Text>
                        </Box>
                        <Box mb={3}>
                            <Text variant={'sm'} my={2}>Store Line/Number</Text>
                            <Text variant={'md2'} fontWeight="500">{businessDetails?.storeNumber ?? "N/A"}</Text>
                        </Box>
                        <Box mb={3} ml={{lg:40}}>
                            <Text variant={'sm'} my={2}>Shop Address Description</Text>
                            <Text variant={'md2'} fontWeight="500">{businessDetails?.fullShopAddress ?? "N/A"}</Text>
                        </Box>
                    </Grid>
                    
                    <Box mt={2}>
                        <Text variant={'sm'} my={2}>Live picture of your shop</Text>
                        <Image 
                            src={businessDetails?.photoUrl || "/placeholder.svg"} 
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
                                <StarIcon color="#6C1CAC" />
                            </Box>
                            <Text variant={'sm'} my={2}>PEP Status</Text>
                        </Flex>
                        <EditButton />
                    </Flex>
                    
                    <Box>
                        <Text variant={'sm'} my={2} >Is the customer a Politically Exposed Person?</Text>
                        <Text variant={'md2'} fontWeight="500">{businessDetails?.politicalExposed ? "Yes" : "No"}</Text>
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
                                <StarIcon color="#AC891C" />
                            </Box>
                            <Text variant={'sm'} my={2}>Source of Income</Text>
                        </Flex>
                        <EditButton />
                    </Flex>
                    
                    <Box mb={3}>
                        <Text variant={'sm'} my={2} mb={1}>What is your expected gross annual revenue</Text>
                        <Text variant={'md2'} fontWeight="500">{businessDetails?.annualIncome ?? "N/A"}</Text>
                    </Box>
                    
                    <Box mb={3}>
                        <Text variant={'sm'} my={2} mb={1}>Does the customer have other sources of funds?</Text>
                        <Text variant={'md2'} fontWeight="500">{businessDetails?.hasOtherSources ?? "N/A"}</Text>
                    </Box>
                    
                    {businessDetails?.hasOtherSources === "Yes" && (
                        <>
                            <Box mb={3}>
                                <Text variant={'sm'} my={2} mb={1}>Other source of revenue</Text>
                                <Text variant={'md2'} fontWeight="500">{businessDetails?.otherSourceOfIncome ?? "N/A"}</Text>
                            </Box>
                            
                            <Box>
                                <Text variant={'sm'} my={2} mb={1}>Expected annual revenue from other sources</Text>
                                <Text variant={'md2'} fontWeight="500">{businessDetails?.otherSourceAnnualIncome ?? "N/A"}</Text>
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
                    isLoading={isPending}
                    onClick={handleContinue}
                    isDisabled={!isAttested}
                    text="Continue"
                />
            </Box>
        </Flex>
    );
};

export default AttestationTemplate;


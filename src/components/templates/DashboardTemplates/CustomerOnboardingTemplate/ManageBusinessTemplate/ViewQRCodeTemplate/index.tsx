'use client';

import React, {useEffect} from 'react';
import {
    Box,
    Flex,
    Text,
    Image,
    Table,
    Tbody,
    Tr,
    Td,
    VStack, Spinner,
    useDisclosure
} from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import BaseButton from 'components/molecules/buttons/BaseButton';
import CardTypeIcons from 'components/atoms/icons/CardTypeIcons';
import LogoIcon from 'components/atoms/icons/LogoIcon';
import HeaderBackButton from 'components/molecules/buttons/HeaderBackButton';
import {useGetCustomerInformation} from "../../../../../../api-services/business-registration-services";
import { useParams, useRouter } from 'next/navigation';
import { QrCodeTemplateProps } from '../../BusinessSetupTemplate/interfaces';
import QrcodeIcon from 'components/atoms/icons/QrcodeIcon';
import DownloadOptionsModal from 'components/molecules/modals/DownloadOptionsModal';

const ViewQrCodeTemplate = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const router = useRouter()
    useEffect(() => {
        fetchCustomerInfo()
    }, []);

    const params = useParams();
    const id = params?.id as string;

    const {
        data: customerInfo,
        mutateAsync: fetchCustomerInfo,
        isPending
    } = useGetCustomerInformation(id);

    const handleConfirm = (option: string) => {
        console.log('Selected option:', option);
    };

    return (
        <Flex direction="column" bg="#F8FAFC" w={'full'} minH="100vh">
            <Box w={{base:'full', lg:'fit-content'}}>
                <HeaderBackButton onBack={()=> router.back()} header='QR Codes' />
            </Box>
            

            {/* Main Content */}
            <Flex 
                direction="column" 
                align="center" 
                justify="center" 
                flex="1" 
                px={4} 
                py={6}
            >
                {/* QR Code Card */}
                <Box 
                    bg="#0F454F" 
                    //borderRadius="8px" 
                    px={6}
                    pt={4}
                    pb={2}
                    maxW="500px" 
                    w="full" 
                    color="white"
                    textAlign="center"
                    mb={6}
                >
                    {/* OneWallet Logo */}
                    <Flex direction="column" align="center" mb={4}>
                        <LogoIcon />
                    </Flex>

                    {/* Scan Text */}
                    <Text 
                        fontSize="18px" 
                        fontWeight="700" 
                        color={'#FFFFFF'}
                        mb={4}
                    >
                        OYA SCAN HERE TO PAY
                    </Text>

                    {/* QR Code */}
                    <Box 
                        bg="white" 
                        p={2} 
                        borderRadius="8px" 
                        maxW="300px" 
                        mx="auto" 
                        position="relative"
                        mb={6}
                    >
                        <Image
                            src={`https://api.qrserver.com/v1/create-qr-code/?data=${customerInfo?.data?.accountNumber}&size=200x200`}
                            alt="QR Code" 
                            w="full" 
                            h="auto"
                        />
                          <Box
                            position="absolute"
                            top="50%"
                            left="50%"
                            transform="translate(-50%, -50%)"
                            zIndex={1}
                        >
                            <QrcodeIcon /> 
                        </Box>

                    </Box>

                    {/* Can't Scan Text */}
                    <Text 
                        fontSize="13px" 
                        fontWeight="600" 
                        color={'#FFFFFF'}
                        mb={4}
                        align={'left'}
                    >
                        {`Can't Scan ? - Transfer`}
                    </Text>

                    {/* Account Details */}
                    <Box 
                        bg="white" 
                        borderRadius="8px" 
                        color="#0F454F" 
                        position="relative" 
                        mb={6}
                    >
                        {/* Gold Accents */}
                        <Box 
                            position="absolute" 
                            left="-5px" 
                            top="50%" 
                            transform="translateY(-50%)" 
                            w="10px" 
                            h="70%" 
                            bg="#D4B36E" 
                            borderRightRadius="4px"
                        />
                        <Box 
                            position="absolute" 
                            right="-5px" 
                            top="50%" 
                            transform="translateY(-50%)" 
                            w="10px" 
                            h="70%" 
                            bg="#D4B36E" 
                            borderLeftRadius="4px"
                        />

                        {/* Account Info Table */}
                        <Table variant="unstyled" size="sm">
                            <Tbody>
                                <Tr>
                                    <Td fontWeight="600" pl={6} py={2} textAlign="left">Account Name:</Td>
                                    {isPending ? < Spinner/> :

                                        <Td py={2}
                                            textAlign="left">{customerInfo?.data?.accountName || 'not generated'}</Td>
                                    }
                                </Tr>
                                <Tr>
                                    <Td fontWeight="600" pl={6} py={2} textAlign="left">Account Number:</Td>
                                    {isPending ? < Spinner/> :
                                        <Td py={2}
                                            textAlign="left">{customerInfo?.data?.accountNumber || 'not generated'}</Td>

                                    }
                                </Tr>
                                <Tr>
                                    <Td fontWeight="600" pl={6} py={2} textAlign="left">Bank Name:</Td>
                                    {isPending ? < Spinner/> :
                                        <Td py={2}
                                            textAlign="left">{customerInfo?.data?.bankName || 'not generated'}</Td>
                                    }
                                </Tr>
                            </Tbody>
                        </Table>
                    </Box>

                    <Flex align="center" justify="center">
                        <Text mr={2} variant={'radioText'} color={'#FFFFFF'}>We accept all bank payments and</Text>
                        <Flex>
                            <CardTypeIcons />
                        </Flex>
                    </Flex>
                </Box>

                {/* Action Buttons */}
                <VStack spacing={4} w="full" maxW="500px">
                    <BaseButton
                        text='Download'
                        w="full"
                        h="48px"
                        bg="#0F454F"
                        color="white"
                        borderRadius="8px"
                        fontSize="16px"
                        fontWeight="600"
                        leftIcon={<DownloadIcon />}
                        _hover={{ bg: "#0D3A42" }}
                        onClick={onOpen}
                    />
                    
                    <BaseButton
                        text='Okay'
                        w="full"
                        h="48px"
                        bg="white"
                        color="#0F454F"
                        borderRadius="8px"
                        fontSize="16px"
                        fontWeight="600"
                        border="1px solid #0F454F"
                        _hover={{ bg: "#F8FAFC" }}
                        onClick={() => {router.back() }}
                    />
                </VStack>

            </Flex>

            {isOpen && <DownloadOptionsModal
                isOpen={isOpen}
                onClose={onClose}
                onConfirm={handleConfirm}
            />}
        </Flex>
    );
};

export default ViewQrCodeTemplate;
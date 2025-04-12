'use client';

import React, {useEffect, useState} from 'react';
import {
    Box,
    Flex,
    IconButton,
    Text,
    useBreakpointValue,
    useToast,
    HStack,
    Heading,
    Input,
    useDisclosure
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import BaseButton from '../../../../../molecules/buttons/BaseButton';
import HeaderBackButton from "../../../../../molecules/buttons/HeaderBackButton";
import { useSendPhoneOTP } from 'api-services/business-registration-services';
import FailedModal from 'components/molecules/modals/FailedModal';
import {useDispatch} from "react-redux";
import {useAppDispatch, useAppSelector} from "../../../../../../redux/store";
import {setCustomer} from "../../../../../../redux/slices/customer";

interface EnterPhoneTemplateProps {
    onNext: () => void;
    onBack: () => void;
}

const EnterPhoneTemplate = ({ onNext, onBack }: EnterPhoneTemplateProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [errorMessage, setErrorMessage] = useState('')


    const isMobile = useBreakpointValue({ base: true, md: false });

    const toast = useToast();

    const dispatch = useAppDispatch()
    const { customerDetails } = useAppSelector(state => state.customer)

    const { mutateAsync: sendPhoneOTP, isPending: isSendingOTP } = useSendPhoneOTP();
    const [phoneNumber, setPhoneNumber] = useState(customerDetails?.phone || '');


    const handleContinue = async() => {
        try {
            if (phoneNumber?.length !== 11) {
                toast({
                    title: 'Invalid phone number',
                    description: 'Phone number must be 11 digits',
                    status: 'error',
                    duration: 3000,
                    isClosable: true
                });
                return;
            }

            const resp = await sendPhoneOTP({ phone: phoneNumber });

            dispatch(setCustomer({ ...customerDetails,
                phone: phoneNumber,
                id: resp?.data?.userId,
            }))

            onNext();
          } catch (error: any) {
            // Show the error modal
            setErrorMessage((error as Error)?.message)
            onOpen();
          }
    };

    return (
        <Flex direction="column"  bg="#F8FAFC"  w={'full'}>
           <HeaderBackButton onBack={onBack} />

            {/* Main Content (Card near the top, not centered vertically) */}
            <Box px={4} pt={4} pb={8}>
                <Box
                    bg="white"
                    width={isMobile ? '100%' : '600px'}
                    mx="auto" /* Centers horizontally */
                    borderRadius="8px"
                    p={isMobile ? 4 : 8}
                    border={'0.5px solid #E2E8F0'}
                >
                    <Text
                        letterSpacing={'-1.2%'}
                        variant={'head'}
                        textAlign={{
                            base: 'left',
                            md: 'center',
                        }}
                        mb={2}
                    >
                        Enter Phone Number of User
                    </Text>

                    <Text
                        variant={'sm'}
                        mb={6}
                        textAlign={{
                            base: 'left',
                            md: 'center',
                        }}
                    >
                        We will send an OTP to this number
                    </Text>

                    <Box position="relative" mb={2}>
                        <Input
                            placeholder="Enter customer's phone number"
                            maxLength={11}
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            borderRadius="8px"
                            borderColor="#E2E8F0"
                            focusBorderColor="#CBD5E1"
                            height="48px"
                            fontSize="16px"
                        />
                    </Box>

                    <HStack justifyContent="flex-end" mb={6}>
                        <Text fontSize="12px" color="#475569">
                            {phoneNumber.length}/11
                        </Text>
                    </HStack>

                    <BaseButton
                        w="full"
                        borderRadius="8px"
                        bg={phoneNumber.length === 11 ? '#0F454F' : '#E2E8F0'}
                        color={phoneNumber.length === 11 ? 'white' : '#94A3B8'}
                        fontWeight="600"
                        isLoading={isSendingOTP}
                        onClick={handleContinue}
                        isDisabled={phoneNumber.length !== 11}
                        text="Continue"
                    />
                </Box>
            </Box>
            
            {/* Failed Modal */}
            {isOpen && <FailedModal
                isOpen={isOpen}
                onClose={onClose}
                title="Error Message:"
                title2={errorMessage  || "Something went wrong. Please try again."}
                //width={{ xs: "95%", lg: "843px" }}
                height="auto"
                borderRadius="8px"
                padding="24px"
                borderTopRadius={'26.81px'}
                borderBottomRadius={'26.81px'}
            />}
        </Flex>
    );
};

export default EnterPhoneTemplate;

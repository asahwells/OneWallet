'use client';

import React, {useState} from 'react';
import {
    Box,
    Flex,
    Heading,
    Text,
    Button,
    Textarea,
    useBreakpointValue, IconButton, VStack
} from '@chakra-ui/react';
import FloatingLabelSelect from 'components/molecules/inputs/FloatingLabelSelect';
// or wherever your floating label select is located
import BaseInput from 'components/molecules/inputs/BaseInput';
import BaseButton from "../../../../../molecules/buttons/BaseButton";
import {ArrowBackIcon} from "@chakra-ui/icons";
import HeaderBackButton from "../../../../../molecules/buttons/HeaderBackButton";
import { useAddAddress } from 'api-services/business-registration-services';
import { useAppSelector } from '../../../../../../redux/store'; 

// or your normal input component

interface IHouseDetailsTemplateProps {
    onNext: () => void;
    onBack: () => void;
}

const HouseDetailsTemplate = ({
        onNext,
        onBack
    }: IHouseDetailsTemplateProps) => {
    const { userDetails } = useAppSelector(state => state.user)
    const isMobile = useBreakpointValue({base: true, md: false});
    const [stateValue, setStateValue] = useState('');
    const [lgaValue, setLgaValue] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [streetName, setStreetName] = useState('');
    const [landmark, setLandmark] = useState('');

    const { mutateAsync: addAddress, isPending } = useAddAddress();

    const handleContinue = async() => {
        console.log('House Number:', houseNumber);

        const payload ={
            state: stateValue,
            lga: lgaValue,
            address: houseNumber,
            streetName,
            landmark,
            userId: userDetails?.id,
        };

        try {
            await addAddress(payload);
            //onNext(); // Proceed to the next step
        } catch (error) {
            console.error('Error adding address:', error);
        }
    };

    return (

        <>

            <HeaderBackButton onBack={onBack} />
            <Flex
                direction="column"
                bg="white"
                p={isMobile ? 4 : 8}
                borderRadius="8px"
                boxShadow={isMobile ? 'none' : 'md'}
                w={isMobile ? '100%' : '60vw'}
                mx="auto"
                mt={4}
            >
                {/* Heading */}
                <Heading
                    as="h1"
                    variant={'headerBold'}
                    fontSize={'18px'}
                    textAlign={isMobile ? 'left' : 'center'}
                    mb={2}
                >
                    Enter House Address
                </Heading>

                <Text
                    variant={'sm'}
                    mb={6}
                    textAlign={isMobile ? 'left' : 'center'}
                    lineHeight={'22px'}
                >
                    Enter user&apos;s house address. Ensure the address they are using match same on their Utility Bill.
                </Text>

                <VStack spacing={6} w={'full'}>
                    <FloatingLabelSelect
                        label="State"
                        placeholder="Select State"
                        options={[
                            {label: 'Lagos', value: 'lagos'},
                            {label: 'Abuja', value: 'abuja'},
                            {label: 'Rivers', value: 'rivers'}
                        ]}
                        value={stateValue}
                        onChange={(e: any) => setStateValue(e.target.value)}
                    />


                    <FloatingLabelSelect
                        label="LGA"
                        placeholder="Select LGA"
                        options={[
                            {label: 'Eti-Osa', value: 'eti-osa'},
                            {label: 'Ikeja', value: 'ikeja'},
                            {label: 'Wuse', value: 'wuse'}
                        ]}
                        value={lgaValue}
                        onChange={(e: any) => setLgaValue(e.target.value)}
                    />

                    <BaseInput
                        h={'56px'}
                        placeholder="Enter House Number"
                        value={houseNumber}
                        onChange={(e: any) => setHouseNumber(e.target.value)}
                    />


                    {/* Street Name - normal input */}
                    <BaseInput
                        h={'56px'}
                        placeholder="Enter Street Name"
                        value={streetName}
                        onChange={(e: any) => setStreetName(e.target.value)}
                    />

                    {/* Landmark/Description - Textarea */}
                    <Box w={'full'}>
                        <Text
                            mb="8px"
                            color="#344256"
                            fontWeight="600"
                            fontSize="14px"
                            lineHeight="20px"
                        >
                            Landmark / Description
                        </Text>
                        <Textarea
                            placeholder="E.g. Near Landmark or Additional Description"
                            value={landmark}
                            onChange={(e) => setLandmark(e.target.value)}
                            borderColor="#E2E8F0"
                            focusBorderColor="#CBD5E1"
                            borderRadius="8px"
                            fontSize="14px"
                            resize="none"
                            h="100px"
                        />
                    </Box>
                </VStack>


                <Button
                    mt={9}
                    variant={'brand'}
                    w={'full'}
                    isLoading={isPending}
                    onClick={handleContinue}
                >
                    Continue
                </Button>

            </Flex>
        </>
    );
};

export default HouseDetailsTemplate;
